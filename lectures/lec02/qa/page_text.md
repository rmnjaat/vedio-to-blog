=== PAGE: lecture overview ===

Lecture 04 · week 2, day 2 · running case: Slack

# Slack in real time

Tour the non-relational database families by what each gives up, then design how Slack gets one message to everyone in a channel in real time.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1“NoSQL” is not one thingName the database, not the family. The two meanings of consistency, what non-relational stores give up to scale, and why relational databases scale too.3 sections · §1.1–1.3

- 2Documents and key-value storesTwo families defined by how you may touch the data: query inside a document, or only ever get and put by key, and what each restriction buys.4 sections · §2.1–2.4

- 3Column-oriented databasesSame table, two layouts on disk. Why an analytics query reads two files instead of every row, why warehouses compress so well, and why they are never the primary copy.4 sections · §3.1–3.4

- 4Graph databasesThe most misunderstood family. Not for anything you can draw as a graph, but for real graph algorithms: recommendations and fraud checks inside 200 ms.4 sections · §4.1–4.4

- 5Why they scale, and when to pick SQLNo relations means no checks, so data can spread out. Every database has a backstory, and a broad rule for choosing between correctness and ingestion.3 sections · §5.1–5.3

- 6Slack: the problem and the schemaCut “design Slack” down to real-time text chat, then build the tables: a membership noun, direct messages as two-person channels, and a checkpoint for unread counts.5 sections · §6.1–6.5

- 7Sending a message: guarantees firstWhere messages live, and how one gets there. Send over HTTP or the open WebSocket? Three ways to persist a message, Slack, WhatsApp and Zoom, and why the edge server stays dumb.5 sections · §7.1–7.5

- 8Scaling WebSocket serversOne channel's members land on different servers. A TCP link, then a mesh that eats each server's connections, then a real-time Pub/Sub and a balancer that keeps an organisation together.6 sections · §8.1–8.6

- 9The whole systemOne WebSocket per product, the overall architecture, what happens when a real-time message is lost, how exposed the edge servers can be, and how a write survives a dead node.5 sections · §9.1–9.5

- 10Deleting, ordering, and what to keepTwo follow-up features answered with the same blocks: deleting a message and putting messages in order. Then the habits to keep and where this lecture stops.3 sections · §10.1–10.3

[summary] About this class where this page sits in the course

This is day 2 of week 2, and the class has two halves. The first, about an hour and five to an hour and ten minutes, is a brief overview of the non-relational databases: where to use each type and, with more weight, where not to use it.

That tour only scratches the surface. The families lay the foundation for what comes later, and each one is used again, in more granular detail, in the weeks ahead. comes in Lectures 09 and 10 Lecture 09 builds a Redis-like cache, and Lecture 10 builds storage from files and column formats.

The second half is a long design of Slack’s real-time communication, limited to text. Its promise: in this one design you can switch from one message delivery model to another and get something like Slack, something like WhatsApp or something like Zoom chat. Once Slack is done, those are a piece of cake.

How to use this page. Each chapter is its own page, and the ten of them follow the class’s order. Chapters 1 to 5 are the database tour; chapters 6 to 10 are the Slack design, built up one decision at a time.

### Slack so far #

Slack is new to the course, but most of what this page builds on is not. In Lecture 02 (§5) Medium learned the real-time channels: short polling, long polling, server-sent events and WebSockets. Two questions were left for this session there: how to scale WebSockets properly, and how a real-time product like Slack builds its messaging on them. Lecture 01’s online/offline indicator points here too: real presence indicators ride a persistent connection, the way Slack does it.

Two more pieces come back. Lecture 02 (§3.5–3.7) introduced Kafka, the message stream whose consumers pull, and Lecture 02 (§2.4) scaled a database with read replicas and sharding. Lecture 03 built a key-value store on MySQL and sharded it by key range, keys A to M on one database and N to Z on another (Lecture 03, §5.3). This page uses that store twice: as proof that relational databases scale too (§1.3), and as the key-value store with JSON values that makes document databases make sense (§2.1). Lecture 01 (§3) already weighed Redis against DynamoDB; both return as key-value stores in §2.4.

So, as the class starts, Slack has nothing: no tables, no servers. Chapter 6 begins with the requirements card, and every box after it is added for a reason.

Lecture 04 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-nosql-is-not-one-thing ===

# Slack in real time, chapter 1: “NoSQL” is not one thing

Lecture 04 · Slack in real time · chapter 1 of 10

§ 1

## “NoSQL” is not one thing

Before choosing where Slack’s messages live, stop saying “NoSQL”. What the label hides, the two meanings of consistency, and why “relational databases don’t scale” is a myth.

About 8 min · class 00:02–00:08

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

[figure title] This lecture’s marks

[figure description] Notation for this lecture: three cylinders marked ×N are a sharded database; a sheet with a folded corner is one file per column (chapter 3); two circles and a line are a graph node and an edge (chapter 4); a box with a two-prong plug is an edge server holding users’ WebSockets; a double thin line marked WS is a WebSocket connection; a single line marked tcp is a server-to-server link; a pipe with dotted lanes and a broadcast mark is the real-time redis pub/sub, which pushes and keeps nothing; a pipe holding message squares is kafka, which keeps messages for consumers to pull; a box with a compass is the balancer, which tells a client where to connect.

[figure labels] ×N · shards · a sharded database · price.col · one file per column (ch. 3) · node · edge · a graph node and an edge (ch. 4) · ws1 · edge server · holds users’ WebSockets · WS · WS · a WebSocket connection · tcp · tcp · server to server · redis pub/sub · pushes, keeps nothing · kafka · keeps messages, consumers pull · balancer · tells a client where to connect

[caption] This lecture’s own marks, on top of the course notation above. Chapters 1–5 use the first three; the Slack design in chapters 6–10 uses the rest. Kafka stays the pipe from Lecture 02; in these figures a cylinder always means a database.

Slack keeps every message every employee ever sends, in every channel, for years. In a design review someone says: “Use NoSQL. It scales.” Is that an answer?

This page frames the first half of the lecture with that question. The class didn’t ask it about Slack. It asked it about databases in general, and the next five chapters answer it with the lecture’s own examples. The short answer is no. It is a label and a slogan, and the rest of this chapter takes both apart.

§ 1.1

## Name the database, not the family

Replace “NoSQL” with the name of a database and the workload it was built for.

About 3 min · class 00:02–00:04 and 00:07

“Always use a NoSQL database” is advice you will hear a lot. It isn’t true. Plenty of people promote their non-relational database as a challenger to the relational one, but most of the databases out there were built to solve very specific problems.

So the first habit of this lecture is about words. There shouldn’t really be a term like “non-relational” or “NoSQL” at all. It puts everything that isn’t MySQL, Postgres or Oracle under one blanket, a bit like sorting people into “technical” and “non-technical”, which is unfair to the second group. Name the specific type of database you mean.

The blanket hides real differences. Take the slogan from the design review: “NoSQL databases scale.” As a blanket statement it is wrong. You can build a non-relational database that doesn’t scale at all; that is entirely possible. And the ones that do scale, scale for something. Cassandra scales, but for a very specific workload. MongoDB scales for a very specific workload. DynamoDB scales for a very specific workload.

That is why it is worth learning the types beyond the famous MySQL and Postgres: so you know where a particular type should be used, and where it shouldn’t.

What do these databases have in common, then? The very general distinction is that they are not relationally structured. Nothing stops anyone from structuring them relationally, and people do, which is why the space is messy.

This page follows the class’s own rule. “NoSQL” and “non-relational” appear in this introduction, because that is how people talk. After it, every database is named by its exact type.

§ 1.2

## Two meanings of consistency

“They give up consistency” is the usual one-line answer. Which consistency?

About 3 min · class 00:04–00:07

Ask what non-relational databases trade away and the usual answer is one line. As a very broad separation, and one that is not always true, non-relational databases typically give up consistency to give you scalability.

The catch is the word “consistency”. There are two of them: consistency in the CAP theorem is different from consistency in ACID. Computer scientists are bad at naming things.

[figure title] Two consistencies

[figure description] Panel a, ACID consistency: each transaction moves the data from one correct state to the next, state 1 to state 2 to state 3, each ticked. Panel b, CAP consistency: a writer writes x = 2 to node 1 while a reader reads x from node 2, which catches up from node 1 later. A strongly consistent store returns 2 right away; an eventually consistent one may return the old value 1 for a while. Same word, two meanings.

[figure labels] correct → correct → correct · state 1 · state 2 · state 3 · txn · txn · the data stays correct · a · ACID consistency · write x = 2 · read x · node 1 · node 2 · catches up · the read returns: · 2 · strong: visible right away · 1 · eventual: old value for a while · b · CAP consistency · same word, two meanings

[caption] Fig 1·aLeft: ACID’s consistency is about correctness; every transaction leaves the data in a correct state. Right: CAP’s consistency is about visibility; a read from another node right after a write either sees it (strong) or doesn’t yet (eventual). The replica catches up by pulling.

Consistency in ACID is about the data being correct. You don’t mess with it: the database moves from one correct state to another.

Consistency in the CAP theorem is about visibility: once you write data, it is available to query right away. That is strong consistency, and it is the consistency non-relational databases give up. The precise name for CAP’s consistency is linearizability: if a read starts after a write has completed, it must see that write or a newer one. A database can be ACID and still not be linearizable martin.kleppmann.com ↗.

What do they get in return? The class board put it like this: “In most cases, NoSQL databases provide scalability and availability by compromising consistency.” With multiple nodes, you can scale the system horizontally and stay highly available.

[figure title] One instance vs spread out

[figure description] Panel a: all the data sits in one relational database instance; when it fails, the requests of users A, B and C all fail and everything is down (a standby replica can keep one primary available). Panel b: the data is spread over three nodes; node 2 fails, and the requests go to nodes 1 and 3, which still serve.

[figure labels] A · B · C · db · everything down · a standby replica can keep · one primary available · a · relational, one instance · A · B · C · node 1 · node 2 · node 3 · others still serve · b · spread over nodes

[caption] Fig 1·bLeft: one database instance holds everything, so one failure takes every request down with it. Right: the data is spread over nodes, and when one fails the others keep serving.

Relational databases wanted all the data in one place, in one database instance. If that instance goes down, the system is down: it is no longer highly available. In practice a relational primary can have standby replicas that take over when it fails. PostgreSQL’s streaming replication is asynchronous by default, so a commit the standby hasn’t received yet can be lost when the primary crashes; synchronous replication makes each commit wait for the standby to confirm postgresql.org ↗.

Non-relational databases, in the general classification, spread the data out horizontally. If one node goes down, other nodes still serve the data, so there is almost never a complete downtime.

The price is strong consistency. They become eventually consistent: a write shows up everywhere, but not at once. Most non-relational databases are eventually consistent, but you will always find exceptions, because nothing here is standardised. DynamoDB is a good example of an exception. Its reads are eventually consistent by default, and a read that sets ConsistentRead=true returns the latest committed data, at twice the read cost docs.aws.amazon.com ↗. Reads from its global secondary indexes are always eventually consistent.

§ 1.3

## Relational databases scale too

Is the review comment’s premise, “SQL doesn’t scale”, at least right? No: anything that shards, scales.

About 2 min · class 00:07–00:08

So is the review comment at least right about relational databases? It is a very big misconception that relational databases don’t scale. You need to know how to use them. The class board boxed it: “NoSQL DBs scale does not mean SQL does not → anything that shards, scales.” Vitess is a real example. It is an open-source system that shards MySQL across many instances while applications query it as one database, and it served all of YouTube’s database traffic for over five years vitess.io ↗.

You have already seen it done. In Lecture 03 (§5.3, range shards) the key-value store on MySQL was split across databases: one held the keys from A to M, the other the keys from N to Z. That gave an almost highly available, horizontally scalable system, and the cost was consistency. That is exactly the move non-relational databases make.

[figure title] Anything that shards, scales

[figure description] Lecture 03’s key-value store on MySQL: a router sends keys from A to M to one MySQL database and keys from N to Z to another, for example the key mango to the first and pear to the second. It gave up cross-shard consistency and got horizontal scale, the same move non-relational databases make. The board’s box: NoSQL databases scaling does not mean SQL does not; anything that shards, scales.

[figure labels] router · relational DBs · don’t scale? · "mango" · "pear" · mysql · A–M · mysql · N–Z · gave up cross-shard consistency, · got horizontal scale · NoSQL DBs scale does not mean · SQL does not → anything · that shards, scales

[caption] Fig 1·cLecture 03’s router, redrawn small: keys A–M go to one MySQL database, N–Z to another. The keys are examples; the ranges are Lecture 03’s. The box at the bottom is the class board’s wording.

So it is crude to say that only non-relational databases scale. Give up the constraints that stop a relational database from scaling horizontally, and you have a truly horizontally scalable relational database. Chapter 5 comes back to which constraints those are, and why dropping them is what lets the data spread (§5.1).

The rule for this whole chapter

Never believe a generic statement at face value, not even this one.

Whenever you hear a generic statement, from the teacher or from anyone, don’t take it at face value. Ask for it to be specific and contextual, and ask why it is being said, because you can always find a counter-example. That habit is what makes you a better engineer.

[figure title] Never believe a generic statement

[figure description] A speech bubble says X scales! Beside it a large question mark asks: for what workload? An arrow points at the question mark: find the counter-example.

[figure labels] X scales! · ? · for what workload? · find the counter-example

Back to the design review. “Use NoSQL, it scales” names no database, no workload and no trade-off. If the label isn’t the point, what is? The next chapter starts with how each family lets you touch the data.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Which “consistency” do non-relational databases usually give up, and how is it different from the C in ACID?

[summary] Show answer

CAP’s consistency: a write is visible to every read right away (strong consistency, precisely linearizability). Most non-relational stores relax it to eventual consistency, where another node may return the old value for a while. ACID’s C is a different thing: every transaction moves the data from one correct state to another. A database can keep ACID and still not be linearizable.

Give the class’s counter-example to “relational databases don’t scale”.

[summary] Show answer

Lecture 03’s key-value store on MySQL, sharded by key range: A–M on one database, N–Z on another. Giving up consistency across shards bought an almost highly available, horizontally scalable system, which is exactly what non-relational databases do. Anything that shards, scales; drop the constraints that stop horizontal scale and a relational database scales too.

Someone says “Cassandra scales”. What question should you ask back?

[summary] Show answer

For what workload? Cassandra, MongoDB and DynamoDB each scale for a specific workload, not for everything. A generic statement always has a counter-example, so ask for the context it holds in.

Concepts in this section: name the type · ACID consistency · CAP consistency · eventual consistency · anything that shards, scales

Contents of this lecture ↑

Lecture 04, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-documents-and-key-value ===

# Slack in real time, chapter 2: Documents and key-value stores

Lecture 04 · Slack in real time · chapter 2 of 10

§ 2

## Documents and key-value stores

Two families defined by how you may touch the data: query inside a document, or only ever get and put by key. The restriction is what buys scale.

About 12 min · class 00:08–00:15, Q&A 00:47–00:53

Every Slack user has a small settings blob: a theme, a time zone, notification rules. Do you store it as a document you can query and patch one field at a time, or as one opaque value under the key user_id?

That is this page’s framing; the class answered the same question in general. The two families in this chapter differ in exactly one thing, how you are allowed to touch the data, and that one restriction decides how far each can be spread over machines.

§ 2.1

## Document databases

The family closest to relational: JSON you can query inside and update one field at a time.

About 3 min · class 00:08–00:11

Lecture 03’s key-value store kept its value as JSON, and the wish that came up next was to query inside that JSON. That is exactly what a document database gives you.

Of the non-relational families, document databases are the one closest to the relational world, in the lecture’s view. The famous examples are MongoDB and Elasticsearch. They are mostly JSON-based. There is no hard and fast rule about that, but mostly JSON.

They support complex queries: aggregations in MongoDB, faceted queries in Elasticsearch. The key feature is that you can query on the attributes of a document: “give me all the documents that have this attribute set to this value”. You can do the same in Elasticsearch.

// all users whose theme is dark: a query on an attribute inside the document db.users.find({ "settings.theme": "dark" }) // change one field of one document, in place db.users.updateOne({ _id: 7 }, { $set: { "settings.tz": "IST" } })

And you can make partial updates: in this document, update just this one attribute.

[figure title] Partial update

[figure description] Panel a: a document database holds a JSON document with _id 7 and settings, theme dark and tz UTC. The query $set settings.tz = "IST" changes that one field in place; nothing else in the document is touched.

[figure labels] $set settings.tz = "IST" · { } · _id: 7 · settings: { · theme: "dark" · tz: "IST" · } · "UTC" · only this field changes · a · document: partial update

[caption] Fig 2·aA partial update: the $set from the snippet above rewrites one field of the document, and nothing else in it moves. Section 2.3 puts the key-value version beside it.

None of this is quite as powerful as a relational database, but it is close. So when a team moves a generic relational schema off SQL, it typically adopts a document database, because that gives it almost the features the relational database gave. You will almost never see a team jump straight to a key-value store.

§ 2.2

## The lines are blurry

Where does “document” end and “key-value” begin? Nowhere in particular, so choose by features.

About 3 min · class 00:11–00:12, Q&A 00:50–00:51

Where does “document” end and “key-value” begin? There is no rule that a document database can’t give you what a key-value store gives, or the other way round. DynamoDB is a key-value store, not a document database, yet it still lets you query within the document. More exactly, DynamoDB supports both the key-value and the document model docs.aws.amazon.com ↗. You can filter on nested attributes, but the filter runs after the items have been read and costs the same read capacity, so an efficient query needs the key or a secondary index docs.aws.amazon.com ↗.

That is why no line separates document databases, key-value stores, columnar storage and the rest. The lines are very blurry, because the people building these databases keep entering each other’s space. So understand the access pattern and the features, such as complex queries and partial updates, which is why the previous part listed features rather than labels.

What you need to know as an engineer is which features you want from a database and which database gives you them. Generic statements about databases don’t work, because something true today can be completely false later.

MongoDB is the example. It started out saying “we are BASE, not ACID”. Now MongoDB is ACID compliant, maybe not as optimally as the SQL world, but compliant.

Asked in class: so does MongoDB now do everything a relational database does? Its official documentation, as the class paraphrased it, says to use ACID sparingly. Across shards, ACID is implemented with distributed transactions, which slow down throughput. If you need it, use it, but only when you need it. MongoDB’s own wording is that a distributed transaction “incurs a greater performance cost over single document writes” and should not replace good schema design; single-document operations are always atomic, so keeping related data in one document often avoids a transaction at all mongodb.com ↗.

The general rule behind it: ACID within one shard, anyone can guarantee. ACID across shards is only done through distributed transactions, which slow the throughput down, so you avoid them when you need high throughput. The instructor recalls finding the same advice in WiredTiger’s documentation as well.

§ 2.3

## Key-value stores: one key at a time

Every operation names one key. That restriction is exactly what lets a key-value store split into thousands of partitions.

About 4 min · class 00:12–00:15

Now store the same settings blob under the key user_id in a key-value store. Examples are Redis, DynamoDB and Aerospike.

Key-value stores are more restrictive than document databases. Every operation you make, reads, writes, deletes, all of them, is key-wise: get a key, put a key, delete a key, insert a key, insert a value into the set at a key.

GET k # get the value at a key PUT k v # put a value at a key DEL k # delete a key SET k v # insert a key SADD k member # insert a value into the set at a key

That is very restrictive, because you never peek into the value. A key-value store is no use unless your use case fits exactly that access pattern. The value is a blob. If you want to update it, you read it, update it and write it back. No partial update is possible, while document databases typically give you one. Some key-value stores do have one: Redis hashes let HSET set individual fields of the hash stored at a key without rewriting the others redis.io ↗.

[figure title] Partial update vs read, change, write back

[figure description] Panel a: a document database holds a JSON document with _id 7 and settings, theme dark and tz UTC. The query $set settings.tz = "IST" changes that one field in place; nothing else in the document is touched. Panel b: a key-value store holds an opaque 2 KB value under the key user:7. To change one field the API server (1) gets the whole value, (2) changes one field itself, and (3) puts the whole value back. Redis hashes are an exception: HSET changes one field.

[figure labels] $set settings.tz = "IST" · { } · _id: 7 · settings: { · theme: "dark" · tz: "IST" · } · "UTC" · only this field changes · a · document: partial update · api · user:7 · kv · { … } · 2 KB · 1 · GET user:7 · whole value · 3 · PUT user:7 · {…} · 2 · change one field · the whole value travels out and back · Redis hashes allow HSET on one field · b · key-value: read, change, write back

[caption] Fig 2·aLeft: the document database changes one field in place. Right: the key-value store only knows whole values, so the API server gets the value, changes it and puts it all back.

The restriction buys something big. Because everything is key-wise, you can shard the database very easily: you never have to make a cross-shard query. Redis Cluster shows the mechanics. It splits keys over 16,384 hash slots and implements every single-key command, but a multi-key operation works only when all its keys hash to the same slot redis.io ↗.

Cross-shard queries come from range operations and the IN operator. Ask for “all documents where id in 1, 2, 3”, and if 1 is on one database, 2 on another and 3 on a third, you have a cross-shard query, which is very expensive.

[figure title] One key vs IN (1, 2, 3)

[figure description] Top: GET 2 names one key, so the API server sends it to shard 2 only, and one shard answers. Bottom: WHERE id IN (1, 2, 3) may touch shards 1, 2 and 3, and the API server must wait for all three answers: a cross-shard query, very expensive. Every key-value operation names one key, which is why a key-value store can run thousands of partitions without hiccups.

[figure labels] GET 2 · api · shard 1 · id 1 · shard 2 · id 2 · shard 3 · id 3 · one shard answers · WHERE id IN (1, 2, 3) · api · shard 1 · id 1 · shard 2 · id 2 · shard 3 · id 3 · and waits for all three answers · cross-shard: very expensive · every op names one key → · thousands of partitions, no hiccups

[caption] Fig 2·bA get by key touches one shard. An IN over three ids may touch three, and the caller waits for the slowest. Ids 1, 2 and 3 are placed one per shard for the example.

A key-value store rules that out: all it offers is “here is a key, give me the value”, one key per operation. So you can partition it very heavily, thousands and thousands of partitions, without any hiccups.

The rule for this whole chapter

The more complex the queries, the less you can distribute the data.

Complex queries cross shards, and cross-shard queries are expensive. Key-wise access never crosses a shard, so the data can be split thousands of ways.

[figure title] The more complex the query, the less you can distribute

[figure description] Left: GET k goes to exactly one of three shards. Right: IN (1, 2, 3) fans out to all three shards.

[figure labels] GET k · IN (1,2,3)

Document databases sit further along. They typically do support cross-partition operations, but those get really expensive. A key-value store is the other extreme: by limiting access, you get massive parallelism. With many databases, each one answers its own queries in parallel without waiting for the others. You get the best performance, and you pay for it with restricted access.

This is the beauty of computer science: every single thing is a trade-off. You get something, you lose something.

Document vs key-value: what each lets you ask, and what each gives up

|

| Document (MongoDB, Elasticsearch)

| Key-value (Redis, DynamoDB, Aerospike)

| What you can ask

| Queries on attributes, aggregations, faceted search

| Only by key, never inside the value

| Update one field?

| Yes, a partial update

| Read, update, write back the whole value

| Cross-partition queries

| Supported, but really expensive

| Never needed

| How many partitions

| Can’t have thousands and thousands

| Thousands and thousands, no hiccups

| What you give up

| Massive partitioning

| The power of complex queries; you gain parallelism and availability

§ 2.4

## Key-value is an access pattern

“Key-value” describes how you use a store, not how it stores. Two key-value stores can behave nothing alike.

About 3 min · class Q&A 00:47–00:48, 00:51–00:53

Asked in class: Lecture 03 built a key-value store on a relational database, and key-value stores have no relations. Is that what decides whether a key-value store goes on SQL or on a non-relational database? No. Key-value stores are databases in their own league. Key-value is an access pattern, and it does not define the store underneath.

DynamoDB and Redis are both key-value stores, with different storage engines: Redis keeps the data in memory, DynamoDB on disk. What changes is the storage layer under the same access pattern. Memory doesn’t have to mean volatile. Redis can persist with RDB snapshots, on by default, or an append-only file; with the AOF’s default policy of syncing every second you can lose about one second of writes in a crash redis.io ↗. Lecture 01 (§3, “Redis or DynamoDB?”) compared the two for the online indicator.

So for a key-value use case, once correctness is settled, you can pick a specialised store such as DynamoDB or Redis if its features fit. Understand the features you need, because you may not need to build a key-value store from scratch the way Lecture 03 (§3) did.

Would a key-value store on a relational database, DynamoDB and Redis then all scale the same? No. It depends on what you store, how you access it, the throughput, and how you partition and shard the data, among a ton of other factors. You can’t use a database as a black box. For example, store massive blob values, say 4 MB each, and relational databases would “cry their heart out”, while DynamoDB would work better.

More precisely

A single DynamoDB item is capped at 400 KB, attribute names included, so a 4 MB value can’t be stored in DynamoDB at all, and neither DynamoDB nor a relational database is a good blob store. Keep large values in object storage and store the key or pointer in the database; AWS suggests S3 for this docs.aws.amazon.com ↗.

docs.aws.amazon.com (DynamoDB quotas) ↗

The class’s point stands: the performance characteristics vary with what you store and how you query it. Store small values and the picture changes again.

[summary] The NAND gate of databases skip unless you like first principles

A question about graph databases (chapter 4) ended here. Suggested in class: if a graph database stores each node’s neighbours as a list of ids, then it is basically a key-value store. The instructor agreed, and went further: you can model every database on a key-value store.

The key-value store is the NAND gate of databases. Just as AND, OR, NOT and every other gate can be built from NAND gates, every database in the world can be modelled on top of a key-value store, though maybe not as performantly. CockroachDB is a working example: its SQL layer turns SQL statements into key-value operations on a sorted key-value map split into ranges cockroachlabs.com ↗.

Back to the settings blob. If the app only ever loads and saves it whole, one value under user_id in a key-value store fits, and it spreads over as many partitions as you like. If you want to ask “which users chose the dark theme?” or patch one field, a document database fits. Documents and key-value stores differ in how you address the data. The next family keeps the table and changes how it sits on disk.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why can a key-value store run thousands of partitions when a document store struggles to?

[summary] Show answer

Every key-value operation names exactly one key, so it lands on exactly one shard and never needs a cross-shard query. Document stores allow ranges, IN and other complex queries that can touch many shards and wait for all of them, which gets really expensive as the partitions multiply. The more complex the queries, the less you can distribute the data.

A teammate wants to update one field of a 2 KB value in a plain key-value store. What actually happens?

[summary] Show answer

The store sees the value as an opaque blob, so there is no partial update: the application reads the whole 2 KB value, changes the field, and writes the whole value back. A document database could change the one field in place. (Some key-value stores add structure for this, such as Redis hashes with HSET.)

“Redis and DynamoDB are both key-value stores, so they behave the same.” What’s wrong with that?

[summary] Show answer

Key-value is only the access pattern. Underneath, the storage engines differ: Redis keeps data in memory, DynamoDB on disk. How each performs and scales depends on what you store, how you access it, the throughput and how it is partitioned, so you can’t treat either as a black box.

Concepts in this section: document database · partial update · access pattern · distributed transaction · key-value store · cross-shard query · storage engine

Contents of this lecture ↑

Lecture 04, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-column-stores ===

# Slack in real time, chapter 3: Column-oriented databases

Lecture 04 · Slack in real time · chapter 3 of 10

§ 3

## Column-oriented databases

Same table, two layouts on disk. Why an analytics query reads two files instead of every row, why warehouses compress so well, and why they are never the primary copy.

About 15 min · class 00:15–00:30

Slack’s data team wants one number over billions of message rows, say the average message length per day. Every row also carries ids, the text and a handful of flags that this question never touches. How much of each row does the database have to read to answer it?

That is this page’s framing. The class asked the same question of a table with the same shape, a stock-market table, so this chapter uses the class’s example from here on.

§ 3.1

## Rows and columns on disk

The same table can sit on disk row by row or column by column.

About 3 min · class 00:15–00:18

Column-oriented databases exploit how people query the system. They are a type the teacher is personally a fan of. Strictly, “column-oriented” is a storage layout rather than a separate non-relational family: BigQuery cloud.google.com ↗ and Redshift docs.aws.amazon.com ↗ are SQL warehouses that store each column separately. “Wide-column” stores such as Cassandra are a different idea.

Start with the layout you already know. When we draw a table, we draw one row together, with all its columns side by side. In a row-oriented database that is also how it is stored: all the columns, the attributes, of a row sit together.

The running example is a table called stock_ticks that records the price of every listed stock, with the columns symbol, price, name, exchange and timestamp. Every tick adds an entry.

[figure title] Row-oriented vs column-oriented on disk

[figure description] The table stock_ticks has five columns: symbol, price, name, exchange, timestamp. In a row store, the five values of each row, R1, R2 and R3, are stored next to each other as one long strip. In a column store, the values of each column are stored together, c1 symbol through c5 timestamp, so row 1 is one cell in every column block.

[figure labels] stock_ticks · symbol · price · name · exchange · timestamp · R1 · R2 · R3 · a row’s columns sit together · row-oriented · R1 · R2 · R3 · c1 symbol · c2 price · c3 name · c4 exchange · c5 timestamp · one column’s values sit together · column-oriented

[caption] Fig 3·aLeft: a row store keeps each row’s five values in one strip. Right: a column store keeps each column’s values together, so the lines R1, R2 and R3 cross every column block. On a phone the header says ts for timestamp. Redrawn from the class board at 00:18.

In a row-oriented database, all five columns of a row are stacked one after another and persisted on disk as one row. So when you read, you read the complete row. Write a SELECT that names just two columns instead of a star, and the disk still reads the entire row; the engine then filters out what you need and serves it.

A column-oriented database does the opposite: it stacks the values of one column across many rows together. With three rows, the three values of column 1 sit together, then the three values of column 2, and so on.

A very crude, very naive way to picture it, and only a picture: one separate file per column. Line 1 of each file holds that column’s value for row 1, line 2 holds row 2, and so on. The file for column 1 has three lines for three rows, then there is a file for column 2 with its three values, and so on.

[figure title] One file per column

[figure description] As a naive mental model, a column store keeps one file per column: symbol.col, price.col, name.col, exchange.col and ts.col. Line n of every file holds row n’s value, so row 2 is line 2 of every file. symbol.col holds AAPL, GOOG, AAPL.

[figure labels] 1 · AAPL · 2 · GOOG · 3 · AAPL · symbol.col · 1 · 2 · 3 · price.col · 1 · 2 · 3 · name.col · 1 · 2 · 3 · exchange.col · 1 · 2 · 3 · ts.col · row 2 = line 2 of every file · a very crude, very naive model

[caption] Fig 3·bThe naive model: one file per column. The values of row 2 are line 2 of every file. Real column stores are smarter than this, but it is enough to reason about which files a query must open.

§ 3.2

## One query, two layouts

One day’s average price: the row store reads every column of every row; the column store opens two files.

About 4 min · class 00:18–00:22, Q&A 00:26

Now a question for the table: the average price of the entire stock market for one day. The board framed it as a table with 100 columns on which you want to run analytics, with the query written like this:

SELECT avg(price) WHERE ts = '___';

Say about 10,000 companies are listed, so the date has about 10,000 entries. In a row store, the engine goes through each of those rows: it reads the row, sees all five columns, picks out the two it needs, timestamp and price, and averages them.

Pause and think

stock_ticks has five columns (symbol, price, name, exchange, ts) and about 10,000 rows for today. You run SELECT avg(price) for today and name only those two columns. Does naming them make a row store read less from disk?

No. A row store keeps each row’s five values side by side, so it reads the whole row and only then picks out price and ts. It can’t jump to the next row’s price without passing over this row’s symbol, name and exchange. A column store opens two files, price and ts, and does no IO at all for the other three. With a hundred columns, the row store reads all hundred to use two.

Five columns, 10,000 rows. How much does each layout read to answer one average?

[caption] Clip 3·1SELECT avg(price) on 10,000 rows: the row store reads every row whole and discards three columns; the column store opens two files. With 100 columns it is 100 against 2.

[summary] The clip as text 0:34

- One query: avg(price) for one day, about 10,000 rows.

- Row store: every row is read whole, symbol, name and exchange too.

- It can't jump to the next price: it must find where the row ends.

- Column store: open two files, price and ts. No IO for the other three.

- 100 columns: a row store reads 100 to use 2. A column store: 2 files.

- Same data, same query: the layout decides how much is read.

The query SELECT avg(price) WHERE ts = '…' runs over about 10,000 rows of stock_ticks, whose columns are symbol, price, name, exchange and ts. In a row store each row's five columns are stored together, so the read head passes over every cell of every row: price and ts are used, while symbol, name and exchange are read for nothing, 5 columns read to use 2. It cannot jump to the next row's price; it has to pass over the rest of the row to find where the row ends. In a column store, drawn as the naive one file per column, only the price file and the ts file are read, and the other three files get no IO. With 100 columns the row store reads all 100 to use 2, discarding 98 of them, while the column store still reads 2 files.

So the row store reads symbol, name and exchange for nothing, and wastes disk IO on them. You didn’t project them in the SELECT, but the engine still has to skim through them to get to the next row. The board put the 100-column version bluntly: a row database “will go row by row reading all columns & discarding 98 of them”. Redshift’s documentation gives the same arithmetic: in a 100-column table, a query that uses five columns reads only about five percent of the data in a column store, while a row-wise database would also read the blocks holding the other 95 docs.aws.amazon.com ↗.

Why can’t it just skip them? Because the row is the unit on disk. Unless the engine knows where this row ends, it can’t pick out the corresponding columns of the next one.

And real tables are far wider than five columns. Data warehouses have thousands of columns, and the teacher stressed that he was not exaggerating.

On a column store the same query reads exactly two files, price and timestamp. It does no disk IO at all for symbol, name and exchange. That is extremely efficient.

This was also asked in class: when a SELECT names specific columns, does the database still read all of them? In a row-oriented database, yes. The disk reads all the columns and the engine picks out the ones you need. In a column-oriented database it doesn’t: think of separate files, and you never spend time reading the columns you don’t need.

§ 3.3

## Analytics, never the primary copy

So why isn’t every database columnar? Because most applications read whole rows.

About 5 min · class 00:21–00:27

So why isn’t every database columnar? Look at what the query did. If your use case is very likely to touch only a few of many columns, which is the classic analytics query, column-oriented databases work well.

That is where they thrive, on a few columns out of hundreds or thousands, and it is why they power data warehouses such as Amazon Redshift and Google BigQuery. In data engineering, file formats such as Parquet use the same column-oriented layout, so that you read the bare minimum to get things done.

The other direction fails. You can build a transactional application such as a blogging site on a column-oriented database, but you shouldn’t, because you are very likely to read the entire row. Rendering a user’s profile reads all of its 10 or 15 columns together, almost always: in most cases it is a SELECT *.

The rule for this whole chapter

Transactional reads whole rows: store by row. Analytics reads a few of many columns: store by column.

The query decides the layout. A transactional app almost always wants every column of a row. An analytics query is very picky about columns: two, three or 10 out of a thousand.

[figure title] The query decides the layout

[figure description] For SELECT avg(price) by ts, a row store reads all five cells of every row, marked red, to use two of them. A column store reads only the price and ts blocks, marked blue. Rows suit transactional work; columns suit analytics.

[figure labels] SELECT avg(price) … ts · rows → transactional · price · ts · columns → analytics

Notice what changed. Only the way the data is stored on disk, and that alone gives a massive performance boost without touching the layers above. That is the beauty of having abstractions in the right place.

It isn’t free. Suggested in class: inserts would be too heavy in a column-oriented database. The teacher agreed: you get some, you lose some, and given the benefits it is fine. ClickHouse, for example, recommends inserting in batches of at least 1,000 rows, ideally 10,000 to 100,000, because each synchronous insert creates a new storage part on disk clickhouse.com ↗.

That is also why you never see column-oriented databases used as the primary database. They serve analytics workloads, and the data warehouse is never the primary copy of the data. More exactly, a column-oriented warehouse is usually not the primary copy of transactional data: it is fed from the operational databases for analytics clickhouse.com ↗.

The primary copy lives in the traditional databases: MySQL, PostgreSQL, MongoDB, DynamoDB and the rest. From there a job ingests the data into the column-oriented warehouse, just to power the analytics.

[figure title] Primary store → job → warehouse

[figure description] Applications write to their primary databases, such as MySQL behind an API server and another service’s DynamoDB: transactional work that reads whole rows. An ingest job copies the data asynchronously into a column-oriented warehouse such as BigQuery or Redshift, just for analytics. An analyst’s SELECT avg(price) query reads only the warehouse, which is usually not the primary copy.

[figure labels] api · mysql · dynamodb · ingest job · just for analytics · warehouse · bigquery / redshift · SELECT · avg(price) … · usually not the primary copy · transactional: whole rows · primary copy · warehouse

[caption] Fig 3·cApplications read and write whole rows in their primary databases. A job copies the data into the warehouse asynchronously (dashed), and analysts query only the warehouse.

Row store vs column store, by what the workload does

|

| Row store

| Column store

| Typical query

| SELECT * over a row: render a profile

| Two, three or 10 columns out of a thousand: analytics

| Reads per query

| Every column of every row it touches

| Only the files of the columns it needs

| Inserts

| One row, written together

| Heavy; worth it for the reads

| Compression

| Less: a row mixes types

| Very heavy: each column is homogeneous

| Role

| The primary copy

| Never the primary copy; fed by an ingest job

| Examples

| MySQL, PostgreSQL

| Redshift, BigQuery; Parquet files

[summary] See it yourself skip if you live in a warehouse already

Every company has a data warehouse, every single one, and most likely it is BigQuery or Redshift: people don’t typically build their own. Go and find out which one your company uses. Or, if you have a data engineer friend, ask them about the Parquet format and see how beautifully it optimises storage.

[summary] Read the C-Store paper skip unless you read papers

“C-Store: A Column-oriented DBMS” was the sixth paper the instructor ever read, from the reference reading of a databases course in his master’s, and the one that made him fall in love with research. He couldn’t recommend it strongly enough: read it to see how its authors conceptualised a column-oriented database and got the performance they needed. It is brilliantly written and a breezy read; you can finish it in about four days. It shows how deep researchers go into a problem: big ideas are conveyed in a single line.

Find it yourself. Don’t build the habit of being spoon-fed; just search for the title.

§ 3.4

## Compression and cost

A column of one kind of value compresses very well. What you pay for depends on the product.

About 3 min · class Q&A 00:27–00:30

Asked in class: does a column store take more space than a row store, or less? Much less. Each column holds one kind of value, so it can be compressed very heavily. Timestamps, for example, are almost discrete values rather than continuous ones. A row store’s data is heterogeneous, so compression still helps, but nowhere near as much. In the instructor’s experience, a 29x gain is normal.

How can the data shrink that much? Take the symbol column: Apple, Google and so on, a small set of discrete values repeated over and over. Instead of storing the full string each time, the store can represent each value with a small fixed-size code (the class said one byte, then corrected it to four). Because there is so little variation, the compression is very heavy. Parquet does exactly this with dictionary encoding: it builds a dictionary of the values in a column and stores small codes instead, then packs repeated codes with run-length encoding and bit-packing parquet.apache.org ↗.

[figure title] Why columns compress

[figure description] A column holds one kind of value. The symbol column AAPL AAPL GOOG GOOG GOOG AAPL is homogeneous; a small dictionary maps AAPL to 0 and GOOG to 1, so the column becomes the small codes 0 0 1 1 1 0, and then the runs 0 twice, 1 three times, 0 once. A row mixes strings, numbers and times, which compresses less.

[figure labels] symbol · AAPL · AAPL · GOOG · GOOG · GOOG · AAPL · homogeneous · AAPL → 0 · GOOG → 1 · a small code · 0 · 0 · 1 · 1 · 1 · 0 · a few distinct values fit in one byte · 0×2 1×3 0×1 · run-length encoding: read about it · Huffman, Snappy, LZ work well here · one row · AAPL · — · Apple · … · 09:15 · a row mixes types: · compresses less

[caption] Fig 3·dTop: a homogeneous column becomes small codes, then runs. Bottom: a row mixes a symbol, a price, a name, an exchange and a time, which compresses less. Values are illustrative.

General-purpose compression works really well on such data too: Huffman, Snappy and LZ compression, because the data is so homogeneous. It isn’t a string here, an integer there and a huge string after that; it is all very similar data.

You don’t have to do any of this yourself. You pass the normal strings, and the engine compresses them internally. A column with five or six distinct values can be represented in one byte per value. Read about run-length encoding once.

Asked in class: cloud providers charge non-relational databases per read and write operation. Are column-oriented databases priced the same way? The class’s answer was no: column-oriented databases run continuously, so you pre-provision the capacity you need and pay for the servers you run. You are charged for IOPS, but it isn’t on-demand pricing per operation.

More precisely

It depends on the product. Provisioned warehouses do charge for reserved servers, but BigQuery’s on-demand model bills each query by the bytes it reads, with capacity (slot) pricing as the reserved alternative. Redshift Serverless bills for compute actually used, per second, with optional reservations docs.aws.amazon.com ↗.

cloud.google.com (BigQuery pricing) ↗

Summed up in class as “reserved capacity”, and the teacher agreed it was put better that way. Reserved capacity is one pricing option, not the only one: as the note above says, BigQuery on demand bills per bytes read cloud.google.com ↗.

Back to Slack’s data team. The average message length per day touches two columns, the length and the date, out of many. It belongs in a column-oriented warehouse fed from the message store, not in the message store itself. Columns changed how one table sits on disk. The next family stores something else entirely: edges.

### Check yourself #

Answer in your head, or out loud, before opening each one.

A table has 100 columns and the query touches 2. Roughly how much does a row store read compared with a column store, and why can’t the row store skip?

[summary] Show answer

The row store reads all 100 columns of every row it scans and discards 98; the column store reads only the two columns’ files, about 2 of 100. The row store can’t skip because a row is stored as one unit on disk: without passing over the row it doesn’t know where it ends, so it can’t reach the next row’s columns.

Why should a blogging app not run on BigQuery, even though BigQuery speaks SQL?

[summary] Show answer

A blogging app is transactional: rendering a profile or a post reads all of a row’s 10–15 columns, a SELECT *, which is exactly what a column layout is bad at; inserts are heavy too. Column stores are for analytics and are never the primary copy; the app’s data lives in MySQL, PostgreSQL and the like, and a job copies it into the warehouse.

Why do column files compress so much better than rows?

[summary] Show answer

Each column holds one kind of value, often from a small set (stock symbols, near-discrete timestamps), so repeated values become small codes and runs. A row mixes strings, numbers and times, which compresses far less. The engine does this internally; you pass normal values.

Concepts in this section: row-oriented · column-oriented · projection · data warehouse · Parquet · dictionary encoding · run-length encoding

Contents of this lecture ↑

Lecture 04, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-graph-databases ===

# Slack in real time, chapter 4: Graph databases

Lecture 04 · Slack in real time · chapter 4 of 10

§ 4

## Graph databases

The most misunderstood family. Not for anything you can draw as a graph, but for real graph algorithms: recommendations, and fraud checks inside 200 ms.

About 14 min · class 00:30–00:40, Q&A 00:47–00:50, 02:49

Slack’s membership is users joined to channels, and you can draw it as a graph: people on one side, channels on the other, an edge for every join. So should it live in a graph database? That is this page’s question. The class asked the same thing about Twitter’s follow/following, and the answer it gave applies to both.

This chapter covers what a graph database actually is, the two jobs it does well (recommendations, and fraud detection under a hard time limit), and why a relational database struggles with those jobs.

§ 4.1

## What a graph database is, and the wrong instinct

Drawable as a graph is not the same as needing a graph database. What one actually stores, and what it is for.

About 4 min · class 00:30–00:33, 00:38

Build Twitter’s follow/following relationship. There is a user node, there are relations between users, and you can draw the whole thing as a graph. So the instinct is to reach for a graph database. Graph databases are among the most misunderstood databases out there, and this is where the misunderstanding starts: they might not be the best choice here.

Pause and think

Follow/following is literally a graph: people are nodes, follows are edges. Is that a good reason to store it in a graph database?

No. A follow list is a lookup by user, and anything can be drawn as a graph. Graph databases are memory hungry and hard to scale, so in the lecture’s words this “could be catastrophic”, meaning really expensive: the Hulk opening a glass jar. Reach for one when you need core graph algorithms: 2nd- and 3rd-degree connections, recommendations by cohort, or a fraud check that spots a new edge outside someone’s usual cluster inside 200 ms.

Start with what one is. A graph database is the graph data structure from the data-structures course in college, nothing more exotic. Take the adjacency-list representation you studied, store it as is, expose data APIs on top of it, and that became the graph database. Nothing special.

[figure title] An adjacency list is the whole idea

[figure description] Four nodes A, B, C and D with edges A–B, A–C, B–D and C–D. Below, the same graph as an adjacency list: A: B, C; B: A, D; C: A, D; D: B, C. A graph database stores each node's adjacency list as is and puts data APIs on top. Using one only to store follow lists is the Hulk opening a glass jar.

[figure labels] A · B · C · D · + data APIs on top · A: B, C · B: A, D · C: A, D · D: B, C · stored · as is · the Hulk opening · a glass jar

[caption] Fig 4·aThe graph on top is stored as the adjacency list underneath: each node with the list of nodes it connects to. A graph database keeps that list as is and puts data APIs on top. Bottom right: using one only to keep follow lists.

What these databases specialise in is graph algorithms, the sophisticated ones. Open a person’s profile on LinkedIn and it tells you how far away they are: a 1st, 2nd, 3rd or 4th connection. That is a sophisticated graph algorithm. Modelling social behaviour is another, and recommendations are a third (4.2).

So a lot of people think that whenever a use case can be visualised as a graph, it belongs in a graph database. In the lecture’s view that is the worst way to think about it. Modelling follow/following on a graph database “could be catastrophic”: a strong word, the instructor admitted, but meaning really expensive. Follow/following is a trivial use case. Twitter’s own history fits the point: it kept who-follows-whom in FlockDB, a store built for adjacency lists, and listed multi-hop graph-walking queries as an explicit non-goal FlockDB ↗.

There is also the cost of running one. Scaling a graph database is very difficult. They are extremely memory intensive, most of them are built on a legacy stack (the lecture’s word), and even the ones written in a modern language are not very optimal.

That doesn’t mean you should avoid them. What they offer is the core graph algorithms, and whenever you need those, a graph database is the tool:

The rule for this whole chapter

Use a graph database when you need core graph algorithms, not because the data looks like a graph.

If you can picture something as a graph, more often than not that is not where a graph database belongs. Where you need the actual graph algorithms (degrees of connection, cohorts, a new edge outside a cluster), use one.

[figure title] Graph algorithms, not graph-shaped data

[figure description] Left: the Hulk next to a glass jar, crossed out: it looks like a graph is not a reason. Right: a three-hop path A to B to C to D with a green tick: graph algorithms are.

[figure labels] “it looks like a graph” ✗ · A · B · C · D · graph algorithms ✓

Storing follow lists in one is like using the Hulk to open a glass jar. It gives you so much more than this tiny, trivial use case needs.

§ 4.2

## Recommendations

Where graph databases thrive: everyone who bought the same thing is a cohort, and what one of them buys next is a suggestion for the rest.

About 3 min · class 00:33–00:35

So where should you use one? Recommendations. Basic collaborative filtering is one of the applications where graph databases thrive, and in the lecture’s view recommendations are the most common use. watch · the instructor's YouTube channel: a detailed video on recommendations with graph databases; the class covered more than the video

Collaborative filtering is a popular way to drive recommendations. Say you bought something on Amazon, and you and I are similar users. Then Amazon should recommend what you bought to me.

The hard part is knowing who is similar, and in a graph that becomes simple. An e-commerce company first builds cohorts of users who buy similar things. Take a product node, say iPhone: everyone who bought an iPhone is a similar set of people. Now if one of them buys AirPods, Amazon can recommend AirPods to everyone else in the cohort.

[figure title] A cohort

[figure description] A product node, iPhone, with five buyers u1 to u5 joined to it by 'bought' edges: everyone who bought one is a set of similar users. Buyer u3 gains a blue edge to a new product node, AirPods. Dashed arrows from AirPods to u1, u2, u4 and u5 show AirPods being recommended to the rest of the cohort. This is one level; real cohorts go two or three levels deep.

[figure labels] bought · recommend · AirPods · iPhone · u1 · u2 · u3 · u4 · u5 · similar users = everyone who bought one · one level here; · real cohorts go 2–3 levels deep

[caption] Fig 4·bEveryone joined to the iPhone node is one cohort. When u3 buys AirPods (blue), the dashed arrows recommend AirPods to the other four. One level deep, as in class.

That is one level, kept simple to picture. Real cohort building goes two or three levels deep, and that becomes really difficult to model. As the class put it, most machine-learning teams and organisations do exactly this, and recommendations are a classic case driven through graph databases because they need these capabilities. Some teams do. Many large recommenders compute offline without a graph database: Amazon’s own moved to item-to-item collaborative filtering, where item B is related to item A if buyers of A are unusually likely to buy B, and the related-item lists for every product are recomputed daily amazon.science ↗.

§ 4.3

## Fraud detection in 200 ms

A card payment confirmed by phone before the instructor put his phone down. A new edge outside a closely knit cluster, checked inside a 200 ms SLA.

About 3 min · class 00:35–00:38

The use case that shows a graph database’s true power is a more important and more interesting one: fraud detection, in the lecture’s words the best use case for graph databases.

[summary] From the instructor: a call from the bank the story behind the example

About a year and a half before the class, the instructor bought a Grammarly subscription. He entered his credit card details and triggered the OTP, and immediately got a call from HDFC Bank: was he trying to make this transaction? He said yes, the person on the call allowed it, and the payment went through. When the call ended he wondered how they had worked it out so quickly.

The bank had worked it out quickly, right after the OTP and before the payment went through (the instructor’s own story, in the note above). Here is how a graph makes that fast. Suppose someone has made every one of their transactions in the domestic space, and suddenly one is international. It is the odd one out: it sits outside their closely knit circle of transactions. In graph terms it is a new edge forming outside the cluster you already have, and a graph database can tell very quickly that this new edge is suspicious.

[figure title] A new edge outside the cluster

[figure description] A customer's history forms a tight cluster of domestic merchants: grocery, fuel, rent, telecom and pharmacy. A sudden international transaction is a new red edge to an overseas merchant outside that cluster. On the timeline the card payment and OTP lead to a graph check, a decision and routing to an executive, all inside a red 200 ms SLA as relayed in class; the executive's call asking 'is this you?' comes after the decision.

[figure labels] domestic: a closely knit cluster · fuel · grocery · pharmacy · telecom · rent · you · overseas merchant · a new edge: · suspicious · 50–60 parameters per transaction, · by the instructor's account · card · + OTP · graph · check · decide · route to · executive · call · “is this you?” · 200 ms SLA · as relayed in class

[caption] Fig 4·cLeft: one customer's history as a tight cluster of domestic merchants, and a sudden overseas transaction as a new red edge outside it. Right: the check runs between the OTP and the decision, inside the 200 ms SLA described in class; the executive's call comes after the decision.

As the instructor describes it, this is what financial companies do every day. Every transaction you make is categorised along something like 50 or 60 parameters that he knows of: country, region, the type of products you buy, the type of things you interact with, and much more. They ingest all of it into a graph, so almost every person has their own independent graph ready. Whenever a new edge appears outside that graph, they compute a degree of suspicion and predict whether the transaction is suspicious.

All of this has to happen within a 200 millisecond SLA. In the instructor’s account, within those 200 ms the bank makes its decision and redirects the case to a customer executive. The executive then calls you to confirm that you are the one making the transaction, and once you approve, you can proceed. The 200 ms covers the automated decision; the call comes after it. In his telling, the whole system is powered by graph analysis.

[summary] Where the 200 ms comes from skip unless you need the provenance

The instructor said he was sure of the number because of where it came from: a VP of engineering at JP Morgan Chase, a participant in an earlier cohort of this course, explained this use case. The details are sensitive, and he couldn’t share them. Treat the figure as relayed from one bank’s engineering lead, not as a published number.

§ 4.4

## Graphs versus joins, and where a graph database sits

Why not do all this on a relational database? Self-joins per level, where a graph database usually sits in a system, and the products you will hear about.

About 4 min · class 00:39–00:40, Q&A 00:47–00:50, 02:49

A fair question, asked in class: why not just do this on a relational database? How would you power fraud detection on top of one?

The class answer had three parts. First: to find something three levels deep in a graph database, one simple graph query, a traversal, gives you the answer. In a relational database, going N levels deep takes N self-joins, and it can’t be one generic query: depending on the depth, you write or rewrite the query and then fire it. That is painful.

More precisely

One join per level is true for a hand-written query of fixed depth. SQL can walk any depth in one query with a recursive CTE: PostgreSQL’s WITH RECURSIVE lets a query refer to its own output and is “typically used to deal with hierarchical or tree-structured data”. Graph databases make deep traversals simpler to write and often faster. The same applies to the hierarchy in the practice note below.

postgresql.org ↗

[figure title] Three hops in a graph: one traversal

[figure description] Nodes A, B, C and D in a chain. The path from A to D, three levels deep, is drawn in blue: in a graph database it is one traversal.

[figure labels] A · B · C · D · hop 1 · hop 2 · hop 3 · one · traversal · graph

[figure title] Three hops in SQL: self-joins, rewritten per depth

[figure description] Three copies of the same edges(from_id, to_id) table, aliased e1, e2 and e3, chained by joins on e1.to_id = e2.from_id and e2.to_id = e3.from_id. N levels take N self-joins and the query is rewritten for every depth; ten levels means nine self-joins, which is messy. SQL can also recurse: see the note below the figure.

[figure labels] edges(from_id, to_id) · e1 · e2 · e3 · JOIN · e1.to_id = e2.from_id · JOIN · e2.to_id = e3.from_id · N levels = N self-joins, · rewrite per depth · 10 levels → 9 self-joins: messy · SQL can also recurse: see “More precisely” · relational

[caption] Fig 4·dThe same three hops, A to D. In a graph it is one traversal. Written level by level in SQL it takes one copy of the edges table per hop, joined in a chain, and the query changes with the depth.

Second, N self-joins on a table may not be very optimal when the data is huge. Third, as the class put it, a relational database keeps your data on one data node: sharding exists, but graph databases give it to you out of the box.

More precisely

Most graph databases scale reads with replicas but keep a single writer per graph. Amazon Neptune has one primary instance that performs all writes, plus up to 15 read replicas, and in Neo4j only primaries can be the writer neo4j.com ↗. Partitioning one graph across shards is hard; Neo4j has recently added sharded property databases, but that is not the standard setup.

docs.aws.amazon.com ↗

[summary] From practice: a multi-level-marketing hierarchy a learner's case of the same problem

One learner’s work modelled a multi-level-marketing hierarchy that was getting painful in a relational database, and suggested a graph database. The instructor agreed: if it is painful and you need to find the 3rd, 5th or 10th level of the tree, a graph database makes much more sense, because joins, queries and self-joins become a pain. Querying 10 levels deep means nine self-joins on the database, which is messy, and something you typically don’t want to do. (The recursive-query note above applies here too.)

How does a graph database store adjacency lists when every node has a different number of neighbours? Through its storage engine, as a separate layer. The lists are not kept in memory but serialized on disk, stored in a simple way. It depends on the database, but think of it, bluntly, as a comma-separated list of IDs. That makes a graph database basically a key-value store, as was suggested in class, and the instructor agreed: every database can be modelled on top of a key-value store, the point of the “NAND gate” note in 2.4.

### Where it sits in a system #

Can a user-facing application use a graph database as its live store? In class the answer was no: you can’t use it transactionally. You ingest the data into it asynchronously, and then derive something out of it.

More precisely

Feeding a graph database asynchronously for analytics is common, but it is not a rule. Transactional graph databases such as Neo4j (“Transactions comply with the ACID consistency model”) and Amazon Neptune serve online, user-facing queries over billions of relationships in milliseconds docs.aws.amazon.com ↗.

neo4j.com ↗

It was added in class that applications typically build those models on top of relational or non-relational databases, and the instructor said “Correct”.

### The products you will hear about #

The board listed a few:

- Neo4j, one of the first graph databases to come out. One of the first, the instructor stressed, not the best.

- Neptune, AWS’s own managed graph database offering. Like always, in the instructor’s words, “AWS copies everything”.

- Dgraph, written in Go. In the instructor’s experience it works very well up to a moderate scale and falters a bit at high scale. He used it very extensively, and it was one of the first projects he went through to understand Go.

- BadgerDB, an embedded database from the Dgraph team.

- TigerGraph, a proprietary graph database. A lot of financial companies use it rather than rely on open-source software for this.

[summary] Further reading skip unless you're evaluating one

For real-world write-ups, search for “fraud detection graph databases” or “graph databases in recommendation engine”: there are plenty of articles.

That completes the four families, each defined by what it gives up. The next chapter asks why giving up relations lets data spread out so easily, and when you shouldn’t give them up.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is follow/following a poor reason to adopt a graph database?

[summary] Show answer

Being drawable as a graph isn’t a need for graph algorithms. A follow list is a trivial lookup, and graph databases are memory hungry and hard to scale, so the lecture calls it potentially “catastrophic”, meaning really expensive: the Hulk opening a glass jar. Twitter kept its follow graph in FlockDB, which deliberately didn’t do multi-hop queries. Use a graph database when you need core graph algorithms.

What makes fraud detection a graph problem rather than a lookup?

[summary] Show answer

The question is not “what is this card’s record?” but “is this transaction a new edge outside the customer’s usual cluster?”. A customer with only domestic transactions who suddenly pays an overseas merchant forms an edge outside a closely knit graph, and the graph can flag that quickly enough for the bank’s 200 ms SLA described in class.

Name two ways to get a 5-levels-deep answer from a relational database, and their costs.

[summary] Show answer

Write it level by level: five self-joins (one per level, as taught), with the query rewritten for every depth, and costly on huge data. Or use a recursive CTE (WITH RECURSIVE), which walks any depth in one query but is still usually slower and harder to write than a graph traversal.

Concepts in this section: adjacency list · graph algorithms · collaborative filtering · cohort · fraud detection · self-join · recursive CTE

Contents of this lecture ↑

Lecture 04, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-sql-or-nosql ===

# Slack in real time, chapter 5: Why they scale, and when to pick SQL

Lecture 04 · Slack in real time · chapter 5 of 10

§ 5

## Why they scale, and when to pick SQL

No relations means no checks, so the data can spread out. Every database has a backstory, and there is a broad rule for choosing between correctness and ingestion.

About 7 min · class 00:40–00:47

Slack’s tables, the ones chapter 6 builds (users, channels, membership, messages), are relational in shape: a message belongs to a channel, a membership row joins a user to a channel. People say non-relational databases scale. Why do they, and does that mean Slack needs one?

The class asked the first half of that question itself, as the more fundamental question behind the four families: why do people say that non-relational databases scale? This short chapter answers it, then gives the lecture’s broad rule for choosing.

§ 5.1

## No relations, no checks

What a foreign key makes the database check on every insert and delete, and why those checks tie the data to one place.

About 3 min · class 00:40–00:42

Non-relational databases scale because there are no relations. The board added two more reasons that weren’t spoken: in a non-relational store the data can be denormalized, and it is modelled to be sharded.

What relational databases are good at comes from those relations: the foreign-key constraints ensure the data is correct. If a table has a non-null foreign key to another table, you are not allowed to insert a row whose referenced row doesn’t exist. The database needs that other row to exist before it lets you insert this one. Deletion works the same way in reverse: until all the child entries are deleted, the parent entry can’t be deleted.

[figure title] What a foreign key checks

[figure description] Insert: a messages row with channel_id 9 is rejected because channel 9 doesn't exist. Delete: deleting channel 1 is blocked because two messages rows still point at it. Both checks need the related rows in one place: with channels on shard 1 and messages on shard 2, the check would have to cross machines. Drop the foreign key and the data partitions like any other store.

[figure labels] channels · id · 1 · 2 · messages · channel_id · 1 · 2 · insert · channel_id = 9 · no channel 9: rejected · insert · channels · id · 1 · 2 · messages · channel_id · 1 · 1 · delete · channel 1 · children exist: blocked · delete · shard 1 · channels · shard 2 · messages · the check would · cross machines · drop the FK → · it partitions like any store · on two shards

[caption] Fig 5·aA foreign key from messages.channel_id to channels.id. It rejects a message for a channel that doesn't exist and blocks deleting a channel that still has messages. Split the two tables across machines and every such check becomes a cross-machine call.

This is how a relational database keeps the system correct and the data strongly consistent: the system moves from one consistent state to another, and the database ensures it by enforcing relations and constraints on the data. Non-relational databases give up on that. Their attitude is: I don’t care what you insert, I don’t care whether that key exists or not, just insert the data you want.

That is the restricting factor for scaling a relational database: its relations and consistency guarantees need all the related data to be in one place. Non-relational databases typically don’t give you those features, so they aren’t bound by it. Which means the fix is simple if you want to scale a relational database this way: don’t use foreign keys. Without constraints and foreign keys, you can partition a relational database exactly the way a non-relational database partitions its data, the point 1.3 made with Lecture 03’s sharded key-value store.

§ 5.2

## Every database has a backstory

Relational databases didn't choose wrong. They chose correctness for the jobs they were first built for, and every other database made its own trade.

About 2 min · class 00:41–00:43, 00:46

So did relational databases make the wrong choice? Not as the lecture tells their backstory. They went for correctness because the first set of use cases they were built for were financial, where the correctness of the data mattered more than performing at scale. They chose data consistency and strong consistency over a high ingestion rate. That doesn’t make them worse than non-relational databases.

Every database has a backstory like this, one that explains its design decisions, and you should be aware of it.

That leads to a habit worth keeping. When a database claims to be great at something, understand why it is great at it and what it gives up to get there. Then see whether you can mimic the same thing on the database you already know, and that need not be a SQL database: it can be a non-relational one too.

And never get stuck on one technology: “I only use this database, every other database sucks.” Be flexible. Every database is unique in its own flavour. Look beneath the first layers of fancy UI and see why it gets the performance it gets. Throughout the course, every database decision weighs all these factors, so don’t be rigid about a particular database, and don’t decide to use NoSQL everywhere.

§ 5.3

## SQL or NoSQL?

“The biggest question of all time”, answered broadly: correctness and its tooling on one side, gigantic fast ingestion and sharding on the other.

About 3 min · class 00:43–00:47, 00:53

Now the biggest question of all time: SQL or NoSQL?

SQL’s strength is data correctness, or consistency: strong consistency. When the correctness of the data is the most important feature of your application, you need ACID, and if you need ACID, go for SQL; don’t look beyond it. The board’s “when to use SQL?” list: ACID; relations and constraints; a fixed schema. SQL gives you the tooling to make sure your data never reaches an inconsistent or incorrect state: foreign-key checks, check constraints and the like. But it doesn’t apply them for you. You have to apply them.

When should you use a non-relational database? A very simple way to look at it: when you have gigantic data to ingest at a fast pace. A huge influx of messages on Instagram, huge numbers of posts being written, logs being dumped, metrics. Those use cases don’t optimise for correctness. It’s okay if a piece of data is here or there, if an attribute is missing, if some data is lost: metrics ingestion, log ingestion, message ingestion. More exactly, such workloads relax constraints and cross-node consistency, but durability is still expected, especially for user messages. Cassandra, for example, records every write in an append-only commit log on disk, which keeps writes durable even after an unexpected shutdown cassandra.apache.org ↗.

Cassandra is the class’s example of a store built for this. It gives you sharding out of the box and drops those constraints, so it is very light on the database and heavily partitioned, or sharded. That is why messaging systems, live interactions, polls and the like typically keep their data in non-relational databases: sharding and partitioning come out of the box, and constraints are dropped. With SQL you would have to build those yourself.

The board’s “when to use NoSQL?” list: there are no relations, the data can be denormalized, and the data can be sharded. Put together, as a very broad rule:

The rule for this whole chapter

When correctness and consistency matter and you want the tooling out of the box, pick SQL. For a very high ingestion rate and sharding out of the box, pick a non-relational store.

The class gave this as “a very broad sense in which I’m putting it out”, not a law. Over the course, every database choice weighs all of these factors.

[figure title] Correctness to SQL, ingestion to a non-relational store

[figure description] A hand-drawn balance. On the left pan, one database marked ACID with a tick. On the right pan, a fire-hose of writes pouring into three small sharded databases. Under it: a very broad rule.

[figure labels] ACID ✓ · ×N · ingestion ↓ · a very broad rule

SQL or a non-relational store: what each guarantees, what it gives you out of the box, and when the board says to use it

|

| SQL

| Non-relational

| What it guarantees

| ACID: correct data, strong consistency, enforced relations

| No relations enforced; usually eventual

| Tooling out of the box

| Foreign keys, check constraints (you must apply them)

| Sharding and partitioning; constraints dropped

| Sharding

| Possible, but you build it yourself (drop the foreign keys first)

| Out of the box (Cassandra, for example)

| Good for

| Data whose correctness is the product, as in the financial backstory

| Gigantic, fast ingestion: messages, posts, logs, metrics

| Board: use when

| ACID; relations and constraints; a fixed schema

| No relations; data can be denormalized; data can be sharded

The families were only scratched in this half of the class. Every one of them is used somewhere later in the course, and one is used right away, in the Slack design. From here on every decision comes with a “how” and a “why” before it.

used right away · Slack's message store: which database holds Slack’s messages, and why, in 7.1

Enough families. The next chapter starts the design.

### Check yourself #

Answer in your head, or out loud, before opening each one.

What exactly does a foreign key force the database to do on insert and on delete, and why does that tie the data to one place?

[summary] Show answer

On insert, it rejects a row whose referenced (parent) row doesn’t exist. On delete, it refuses to delete a parent while child rows still point at it. Both checks need the related rows where the database can see them, so the guarantees need all the data in one place. Drop the foreign keys and a relational database can be partitioned like any non-relational store.

Give the class's broad rule for SQL vs a non-relational store, and one example workload on each side.

[summary] Show answer

When correctness and consistency matter and you want the tooling out of the box, SQL: data whose correctness is the whole point, like the financial use cases relational databases were built for. For a very high ingestion rate with sharding out of the box, a non-relational store: a huge influx of messages, logs or metrics. It is “a very broad” rule.

What is the “backstory” of relational databases, and how should it change how you judge them?

[summary] Show answer

As the lecture tells it, their first use cases were financial, where correct data mattered more than scale, so they chose consistency over a high ingestion rate. That makes them different, not worse. Every database has such a backstory: when one claims to be great at something, ask what it gave up, and whether you could mimic it on the database you know.

Concepts in this section: foreign key checks · strong consistency · a database’s backstory · ACID · high ingestion rate · denormalize

Contents of this lecture ↑

Lecture 04, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-slack-schema ===

# Slack in real time, chapter 6: Slack: the problem and the schema

Lecture 04 · Slack in real time · chapter 6 of 10

§ 6

## Slack: the problem and the schema

Cut “design Slack” down to real-time text chat, then build the tables. Membership is a noun, a direct message is a two-person channel, and a checkpoint drives unread counts.

About 18 min · class 01:00–01:17, Q&A 03:07–03:09, 03:12–03:13

“Design Slack” is the whole product, every feature of it. Where do you even start?

The second half of the class starts by cutting that down to one part, then builds the tables for it before anything travels over a network. This chapter is that first step: the scope, the requirements, and a schema that turns out to carry more of the design than it seems.

§ 6.1

## One part of Slack, done well

Not the whole product: real-time text chat in one organisation, with the decisions explained, and the schema first.

About 4 min · class 01:00–01:03, 00:01

System design, as the class framed it at the very start, is about recognising patterns, the Lego blocks, and assembling them into a running system. The second half of the class puts that to work: it designs Slack’s real-time communication.

[summary] Patterns, like people skip unless you like the analogy

The instructor’s aside: computer science mirrors how people operate. We work on patterns, learn from them and iterate, and in his telling the von Neumann architecture of the first CPUs has many similarities to how the brain functions.

The instructor dislikes the framing “design Slack”, the entire product. Pick one part of it instead, and do it really well. The part is Slack’s real-time communication, text only and nothing more: the kind of messages you see on Teams, Instagram or Facebook. It is kept simple on purpose, so the foundational building blocks, the small nitty-gritty details and the way each design decision gets made stay visible.

The requirements are short. There is one organisation on Slack, with multiple users (its employees) and multiple channels. A user can direct-message another user or post a message in a channel. The chat has to be real time. And historical messages can be scrolled: open a channel and scroll back through its older messages.

[figure title] The requirements card

[figure description] A card with the five requirements: one organisation with many users, many channels, a user can DM another user or post in a channel, chat is real time, and history can be scrolled. A chip says text only. Below it, a small Slack-like sidebar: this one part, done well.

[figure labels] requirements · text only · 1 · one organisation, many users · 2 · many channels · 3 · DM a user or post in a channel · 4 · real time · 5 · scroll history · # general · # standup · user B · user C · this, done well

[caption] Fig 6·aThe whole brief: five requirements, text only. Everything in chapters 6 to 10 serves this card.

The same architecture builds a lot more than chat: multiplayer games, real-time interactions, real-time polls, creator tools. The plan is to brainstorm channels, messages, checkpoints and real-time communication, reach WebSockets, and then scale them. The highlight is how each decision gets made, not a diagram of boxes.

Jumping straight to WebSockets is not a good idea. Cover the basics first, then WebSockets, then their scaling. So start with the simplest thing, the schema, and design it for these features only, nothing else.

One clarification before any tables. Designing a schema means naming the entities and their attributes. It does not mean you are using a relational database. The database is picked afterwards, by the guarantees you want to give, and 7.1 picks it.

§ 6.2

## Who is in which channel: membership

A first schema, the question it can't answer, and why the table that answers it should be called a noun.

About 2 min · class 01:03–01:06

A first schema, suggested in class: a users table with an ID, a name and an optional nickname; a channels table with an organisation ID and a channel ID; and a messages table that holds the channel ID the message was sent in. That’s okay, the reply went. What else?

There is a question it can’t answer yet: how do you know which users are part of which channel? That has to be stored somewhere. The answer suggested in class was a membership table, and the name was praised: the person who suggested it hadn’t seen the board, which already used that word.

[figure title] Users, channels, and a membership table

[figure description] Three tables so far: users, channels and membership. Membership is written over a struck-through user_channel: a noun gets a persona.

[figure labels] who is in which channel? · users · channels · membership · user_channel · a noun gets a persona

[caption] Fig 6·b, so farThree tables so far. The join table gets a noun, membership, rather than the easy name user_channel. The board first wrote user.channel and renamed it.

A lot of people would name that table user_channel, and the instructor is against it. It’s the easy way to name things, but what is a user channel? If tomorrow you store a mapping of three things, will you call the table user_channel_message? The board itself first wrote user.channel before renaming it Membership.

The rule behind it: when you design a schema, everything should be an entity, named as a noun wherever possible. A noun gives the table a persona of its own. membership stores membership information, such as “this user is part of this channel”.

And a noun makes extension natural. Call it membership and adding columns comes easily: how far this user has read, whether they’re active, how they interact with the channel. Call it user_channel and you don’t think of adding another attribute at all. That pays off in 6.5.

§ 6.3

## Where do direct messages go?

A message goes to a channel or to one person. Five drafts of the messages table, each rejected for a concrete reason.

About 6 min · class 01:05–01:12

A message goes either to a channel or to one person. So what does the messages table hold? It holds who sent the message and the text. The class worked through the destination in a sequence of drafts, and the board keeps their order.

Pause and think

A message goes either to a channel or to one person, so messages gets both a nullable channel_id and a nullable receiver_id, exactly one filled. Is that a sound design?

No. Nothing stops a row where both are null: an orphan message that belongs nowhere. Every query and every piece of business logic must then ask which column is set, which is the ifs and elses the class kept meeting in the other drafts (two tables, a receiver array, prefixed ids, a type enum). The way out is to stop treating a DM as special: a DM is a channel with two people, so every message has one channel_id. 6.4 builds it.

The first draft, suggested in class, put both a channel ID and a receiver (user) ID on the message, one of them always null: channel messages fill one, direct messages the other. What is the disadvantage? If you allow either column to be null, you also allow a row where both are null, inserted because of some glitch. That row belongs nowhere: an orphan row problem. If you do keep two either/or columns, the database can still forbid that row: PostgreSQL’s num_nonnulls() lets a check constraint require exactly one of them to be set postgresql.org ↗. The final design avoids the problem altogether.

-- exactly one destination per row: no orphan messages CHECK (num_nonnulls(channel_id, receiver_id) = 1)

Here are the drafts in order. Step through with the buttons or the arrow keys:

[figure title] Five drafts of messages

[figure description] Six steps through the class's drafts of the messages table, each rejected for a concrete reason, ending with one channel_id per message. Draft 1 has channel_id and receiver_id, one always null, so a row with both null is an orphan. Two tables double every migration and a receiver array breaks when someone joins. A to column with CH- or usr- prefixes needs string processing in every query. A type enum still leaves no foreign key on to and fills the code with ifs and elses. A message that doesn't know its destination can't be rendered by channel; a common channel for two people works, the pub/sub topic is unnecessary. What survives: from, channel_id, msg.

[figure labels] settled: · users · channels · membership · 1 · messages · one is always null · sender_id · channel_id · receiver_id · msg · u1 · null · null · hi · both null = an orphan row · 2 · channel_messages · direct_messages · every new column = two migrations · receiver_ids: [B, C, D] · breaks when someone joins · 3 · from · to · msg · u1 · CH-42 · hi · u2 · usr-7 · yo · string processing · to pick the join · 4 · channels.id ? · from · to · type: ch/u · msg · no foreign key on to; · ifs and elses everywhere · 5 · from · msg · then how do you · render a channel? · channel {A, B} · give two people a common channel · + pub/sub topic · unnecessary complication · 6 · from · channel_id · msg · one channel_id, always

- Draft 1: sender_id, channel_id, receiver_id, msg. One of the two destination columns is always null, and nothing stops a row where both are null: an orphan row.

- Drafts 2 and 3: two tables, channel_messages and direct_messages, mean every new column is two migrations. A receiver_ids array breaks as soon as someone joins the channel.

- Draft 4: one to column holding CH-42 or usr-7. Every query must parse the id to know which table to join.

- Draft 5: add a type enum, ch or u. Still no foreign key on to, and the business logic fills with ifs and elses.

- Two last ideas. A message that doesn’t know where it goes can’t be rendered by channel. Giving two people a common channel works; making it a pub/sub topic too is an unnecessary complication.

- What survives: from, channel_id, msg. Every message has one channel_id. 6.4 makes a DM a channel.

Keys: ← → to step · link to a step with #fig-6b/step-3

[caption] Fig 6·cTime runs down. Each step is one draft of messages, with the rejected part in red and the reason beside it. Redrawn from the class board, 01:06–01:12; drafts 2, 3 and 5 were spoken, not drawn.

The drafts, with the reason each one fails:

- Two tables, one for channel messages and one for direct messages, suggested in class. Then migrations get difficult: add a new attribute to messages and you have to add it to both tables.

- A receiver array: store the receiver as an array of every receiving user. It was raised and dropped in the same breath, because it breaks as soon as users are added to the channel. There has to be a better way.

- from and to, where to is a channel ID or a user ID told apart by a prefix such as CH- or usr-. Now every query needs string processing to decide whether to join with channels or with users. That is a poor implementation, and you can’t write efficient queries on it.

- A receiver-type enum next to to, channel or user. It filters a little better than parsing prefixes, but it is a variation of the same thing: to can no longer have a foreign-key check saying it references channels, because it may point at a user. A polymorphic to also forces ifs and elses into the business logic (if this, then that; else the other), and the code gets complicated.

- The message shouldn’t know where it is going: treat routing as control information, handled in code rather than in the database. But without the destination stored, how do you render all the messages of a channel? You still need that.

- A common channel for the two people in a DM, also used as a pub/sub topic. The first half of that is the answer, and the class kept it. The publisher-subscriber part is an unnecessary complication: focus on the first part.

§ 6.4

## A DM is a channel with two people

The last draft's good half. Piggyback on channels, give the channel a type, and the whole schema fits on one board.

About 3 min · class 01:12–01:14, 02:19, Q&A 03:07–03:09

So the way to model it: a direct message is a channel with two people. This piggybacks on what already exists, channels and messages, instead of special-casing DMs.

This isn’t made up: it is how Slack’s API works. If you use the Slack API to DM a particular user, you first create a channel with that user and then write on it. The UI renders it as a direct message, but behind the scenes it is a channel. Slack’s documentation puts it this way: every channel-like thing is a conversation, whether a public channel, a private channel, a DM (is_im) or a multi-person DM (is_mpim). conversations.open opens or resumes a DM and returns its channel ID, and chat.postMessage can also take a user ID and open the DM if needed docs.slack.dev ↗.

In the end a DM and a channel message are both a message, with a sender and a receiver. Only the rendering differs, on the UI side; the way you store it doesn’t. Always look for a general way to store things rather than specific cases: if this, go here; if that, go there. Ifs and elses are the worst when it comes to databases.

The channel gets a type: a group, a user (a DM) or a regular channel. Every message carries a channel_id pointing at its channel, so DMs need nothing extra, and the type is what lets the UI put direct messages in the bottom half of the sidebar and channels in the top half. Messages also carry a timestamp of when they were created, created_at, so you scroll a channel’s history by iterating through that channel’s messages.

[figure title] The Slack schema

[figure description] Four tables: users (id, name); channels (id, org, name, type: grp, user or reg); membership (user_id, channel_id, checkpoint); messages (from, channel_id, created_at, msg). membership.user_id points at users, and membership.channel_id and messages.channel_id point at channels. A direct message is a channel with two people. Redrawn from the class board at 01:17.

[figure labels] Brainstorm: channels, messages, checkpoints, realtime communication (membership) · users · id · name · channels · id · org · name · + · type : grp/user/reg · membership · user_id · channel_id · + · [ checkpoint ] · messages · from · channel_id · created_at · msg · DM = channel with 2 people

[caption] Fig 6·bThe schema as the board left it: users, channels with a type, membership with a checkpoint, and messages that always point at one channel. The + marks the two lines added last. membership.user_id references users; membership.channel_id and messages.channel_id reference channels. Redrawn from the class board at 01:17.

That is the whole schema: users; channels with their type; membership information in membership; and messages that point at a channel. When the class recapped the design later, the first point on the board was this one: DMs are channels with two people, so only channels need modelling well. The channel row has a small type field saying whether it is a DM so the UI can render it accordingly, and messages simply reference the channel. The recap’s version of the schema adds a workspace table and a message timestamp, ts.

[figure title] The sidebar

[figure description] A Slack-like sidebar. Channels sit in the top half: # general with an unread badge of 12, and # standup. Direct messages sit in the bottom half: user B and user C. The channel type decides the half: reg or grp goes on top, user goes below.

[figure labels] channels · # general · 12 · # standup · direct messages · user B · user C · type = reg / grp · → top half · type = user · → bottom half · the sidebar

[caption] Fig 6·dThe type decides the half: regular and group channels on top, two-person DMs below. The unread badge is drawn in graphite here; red on this page means failure.

### Why a type, and not private/public? #

Asked in class: why store a channel type at all? Why not just mark a channel private or public, and treat a DM as a private channel with two members? Because then you can’t tell a channel with two people from a DM, and the two render differently. A private channel created with two people can get more members later. A DM can’t: you can’t add people to it. That is why the UI needs the type.

Every combination can exist: a private channel with two people, a public channel with two people, a DM between two people. And tomorrow a DM might be allowed to become private or public. An explicit type keeps the schema extensible.

§ 6.5

## The checkpoint

Because the table is a noun, it can hold how far each user has read each channel. That one column drives unread counts, and Slack never replays old messages over the socket.

About 3 min · class 01:14–01:17, Q&A 03:12–03:14

You open a channel with a hundred new messages. Where does Slack take you?

Here is the payoff of naming the table membership. A noun doesn’t restrict you, so it can hold a checkpoint: for this user in this channel, the point up to which they have read. Slack exposes exactly this: the conversation object’s last_read is “the timestamp for the last message the calling user has read in this channel”, and conversations.mark moves that read cursor to a given message docs.slack.dev ↗.

The checkpoint is what you see in the UI. The unread message count. The “you last read until here” line. And when you click a channel with a hundred new messages, being taken to that point.

[figure title] The sidebar

[figure description] A Slack-like sidebar. Channels sit in the top half: # general with an unread badge of 12, and # standup. Direct messages sit in the bottom half: user B and user C. The channel type decides the half: reg or grp goes on top, user goes below.

[figure labels] channels · # general · 12 · # standup · direct messages · user B · user C · type = reg / grp · → top half · type = user · → bottom half · the sidebar

[figure title] The open channel

[figure description] The open channel # general with 12 unread. Two messages above a dashed line, you last read until here, then the new messages below it with a jump here marker. The badge and the line both come from one column: membership.checkpoint.

[figure labels] # general · 12 · you last read until here · jump here · membership.checkpoint · the open channel

[caption] Fig 6·d, continuedThe badge, the “last read” line and the jump all come from one column, membership.checkpoint. Opening the channel moves it to the newest message.

Whenever you open a channel, the checkpoint moves to its bottom, to the last message read. It can store a timestamp or a message ID; that depends on the implementation. The granularity is a choice: time-level, “I read till this time”, or message-level, “I read till this message”.

The same goes for everything else about how a user relates to a channel. Muted the channel? Store it on membership. Favourited it? Store it on membership: there’s no need for a separate favourites table. Notification settings, the same. Because it holds every interaction a user has with a channel, membership becomes the key table of the system.

The rule for this whole chapter

Name things as nouns, and piggyback on what you already have instead of writing ifs and elses.

The two takeaways of the schema. A noun gives a table a persona and room to grow (membership gained a checkpoint, mutes and favourites without a new table). Piggybacking made a DM a channel with two people, so messages need no special case.

[figure title] Nouns, and piggyback

[figure description] A struck-through user_channel with membership written over it, and a new checkpoint column sprouting from membership with a plus. Under it: no ifs and elses.

[figure labels] membership · user_channel · + checkpoint · no ifs and elses

### Old messages don’t come over the socket #

That closes a loop raised at the very end of the class. WhatsApp keeps your messages on your device; Slack keeps them in its backend database. So it was suggested that Slack should load old messages with API calls, not over the WebSocket, and the instructor agreed. On Slack you never see old messages replayed to you. Come back from a vacation, log in, and you just see something like 200 unread messages to go through; none of them were relayed over the WebSocket. The checkpoint on membership is what makes that work. WhatsApp is different: it has to deliver those messages to your device, because that is where they are stored.

coming later · Lecture 08: the membership table again, behind the unread-message indicator

The tables are settled. Next, a user presses send.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is membership a better name than user_channel, beyond style?

[summary] Show answer

A noun gives the table a persona, so you think of it as a thing that can have attributes. That is how membership gained a checkpoint, mutes, favourites and notification settings without new tables. user_channel only says “a mapping of two ids”: you never think of adding a column, and a three-way mapping would need user_channel_message.

What breaks if messages has a nullable channel_id and a nullable receiver_id?

[summary] Show answer

Nothing stops a row where both are null, an orphan message (unless you add a check constraint). Every query and every piece of business logic has to ask which column is set, so the code fills with ifs and elses. Modelling a DM as a channel with two people gives every message exactly one channel_id instead.

Where does Slack's unread count come from, and why doesn't it need the WebSocket?

[summary] Show answer

From the checkpoint on membership: how far this user has read this channel. Slack’s messages live in its backend, so on login it loads them by API and counts what lies past the checkpoint. Nothing is replayed over the WebSocket. WhatsApp, which stores messages on the device, has to deliver them there.

Concepts in this section: scope a design · nouns for entities · orphan row · DM as a channel · channel type · checkpoint

Contents of this lecture ↑

Lecture 04, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-sending-a-message ===

# Slack in real time, chapter 7: Sending a message: guarantees first

Lecture 04 · Slack in real time · chapter 7 of 10

§ 7

## Sending a message: guarantees first

Where messages live, and how one gets there. Send over HTTP or the open WebSocket? Three ways to persist a message (Slack, WhatsApp, Zoom), and why the edge server stays dumb.

About 30 min · class 01:17–01:46, recap 02:19–02:21, Q&A 02:46–02:49

A user types “standup in 5” in #general and hits send. Their Slack app already holds an open WebSocket, and every message from everyone else arrives on it. Should this message leave on it too? This chapter first settles where the message has to end up. Then one question drives the rest: what does Slack promise about a message once you have sent it?

§ 7.1

## Which database holds the messages

A sharded store, chosen by the product: why Slack needs nothing fancy, and why the shard key is the channel.

About 6 min · class 01:17–01:21, recap 02:19–02:20

Chapter 5 ended on picking a database by what the product needs (5.3). Here is that rule applied to Slack’s messages. The design assumes the messages are stored in a relational database that is sharded.

Why not a non-relational store? For Slack you don’t typically need one, because messages don’t arrive at a very high rate. All you do is store the messages that come in and let people scroll through them, and a relational database does a very good job of that, as long as it is partitioned and sharded. It is also what Slack runs: MySQL has been the storage engine for all of Slack’s data from the beginning, and from 2017 Slack moved to Vitess, which shards MySQL. By 2020 Vitess served 99% of Slack’s query load, about 2.3 million queries a second at peak. slack.engineering ↗

That is not a ban on the alternatives. You can also store the messages in a non-relational database such as MongoDB or Cassandra; no one stops you.

The volume stays modest because of who uses Slack. An enterprise application is a different use case: no huge amount of messages is exchanged. People chit-chat sometimes, but not everyone sends hundreds and thousands of messages, because they are there to work. That is why picking a database depends on the product and the requirement, not on your affinity to a particular stack. Whenever you pick something, understand why you are picking it: what use case are you solving?

For enterprise chat there is no hard and fast rule. The board listed MySQL, Cassandra and Mongo, and any of them will do, because the scale is not huge. What you definitely need is sharding and partitioning: add more partitions, and put a bunch of enterprise customers on each database. No fancy NoSQL database is needed.

[figure title] Two kinds of connection, one sharded store

[figure description] Users A and B each hold two kinds of connection: HTTP to the API servers (the messaging service, behind a load balancer) and a WebSocket to the WebSocket servers. The API servers write each message to the shard chosen by its channel id, so all of a channel’s messages sit in one shard. The shards can be any database you can shard: MySQL, Cassandra or Mongo.

[figure labels] A · B · messaging service · lb · api · ×3 · REST · send_message(from_user, · to_channel, text) · ws · ×3 · WS · any DB you can shard · channel_id → shard · mysql / cassandra / mongo · a channel’s messages · all in one shard

[caption] Fig 7·aTwo kinds of connection, one sharded store. The send is one REST call, send_message(from_user, to_channel, text), to the messaging service; its API servers write each message to the shard chosen by its channel id. Redrawn from the class board at 01:22–01:46, with the 02:20 recap’s REST flow folded in.

Compare Instagram Messenger. There everyone is chit-chatting, and all the users are in one database, so for that product the instructor would go for Cassandra, a database built for a high ingestion rate. For an enterprise app with formal messaging, even MySQL works, as long as it is partitioned and sharded (Cassandra is still allowed). Discord’s chat is a real example of the Cassandra choice: it stored its messages in Cassandra (12 nodes and billions of messages in 2017) and in May 2022 moved them to ScyllaDB, a Cassandra-compatible database. Its messages are partitioned by channel plus a time bucket. discord.com ↗

Whichever database you pick, MongoDB, MySQL or Cassandra, the class’s point is that the overall schema looks very similar to the one from chapter 6 (6.5). The entities do stay the same. The physical layout shifts with Cassandra, though: its modelling is query-driven, it has no joins, data is denormalised into one table per query, and a partition key decides which node holds each row. cassandra.apache.org ↗

The class came back to this decision in the recap at 02:19, and the board put it in a few lines.

There will be a large number of messages, so they go into a sharded store, and nothing more complicated: “pick any DB that you can shard … even SQL works!”, as the board says. For chat, and for Slack, you typically don’t need NoSQL; any database you can partition will work. One database node definitely could not handle the message load, which is why the store is sharded at all.

The shard key follows from the shape of the data. A workspace has many channels, and each channel has many messages. So the messages are sharded by channel_id, into mutually exclusive shards: all the messages of one channel sit in one database. Slack wanted the same key. Its original databases were sharded by workspace, and in the move to Vitess the team wanted to shard message data by channel id, to spread the load more evenly. slack.engineering ↗

The payoff is scrolling. With all of a channel’s messages on one shard, scrolling is simple, and it never needs a cross-shard query.

Sending, in its basic form, is then one REST call to the messaging service:

send_message(from_user, to_channel, text) # REST call # API server: shard = route(channel_id); insert

The API server finds the right shard from channel_id and stores the message there. Since a DM is a channel with two people (6.4), this one flow sends DMs and channel messages alike.

§ 7.2

## Send over HTTP or over the WebSocket?

The socket is open, but receiving and sending are separate decisions. What Slack’s grey-then-black shows.

About 7 min · class 01:21–01:29, recap 02:20

Back to “standup in 5”. The store is settled; now the route. When a user sends a message to a channel, how should it reach the database and get persisted: through the normal API servers, or through a WebSocket?

Pause and think

A WebSocket to Slack is already open, and every incoming message arrives on it. You send “standup in 5”: it shows grey for a moment, then turns black. Should the send go over that open WebSocket?

Not necessarily. Receiving needs the WebSocket; sending is a separate decision. For enterprise customers, a message being saved matters more than per-message overhead, and Slack isn’t as chatty as Instagram Messenger. The grey-then-black delay is a hint, not proof, that Slack sends with an ordinary API call and only then shows the message as sent. Think of the guarantees you owe the customer, and the architecture follows.

Both routes are open to the client. A user holds connections to the normal API servers and to the WebSocket servers, so a message could go out on either.

[figure title] Two kinds of connection, one sharded store

[figure description] Users A and B each hold two kinds of connection: HTTP to the API servers (the messaging service, behind a load balancer) and a WebSocket to the WebSocket servers. The API servers write each message to the shard chosen by its channel id, so all of a channel’s messages sit in one shard. The shards can be any database you can shard: MySQL, Cassandra or Mongo.

[figure labels] A · B · messaging service · lb · api · ×3 · HTTP to the API · ws · ×3 · WS to the edge · any DB you can shard · channel_id → shard · mysql / cassandra / mongo · a channel’s messages · all in one shard

[caption] Fig 7·a, againThe same diagram, labelled by connection: every user holds HTTP to the API servers and a WebSocket to the WebSocket servers. Either one could carry a send.

A tempting idea, suggested in class: the server has to push messages to clients anyway, so send over the WebSocket too. The refinement: receiving does need the WebSocket, so that people don’t have to refresh to see new messages. That does not mean sending has to go over it as well. “Just because you have it does not mean you have to use it.” Ask what guarantees you get, or lose, by sending over a WebSocket.

A second suggestion: a WebSocket saves the per-message overhead of a REST call, and chat is frequent communication (the board caught it as “Freq Commⁿ”). The pushback came as two questions. If the WebSocket were always better, why does REST exist at all? And is Slack really as frequent as your Instagram Messenger? You don’t receive that many messages on Slack or Teams. Slack’s customers are enterprises, and for them a message being persisted matters more than saving overhead on each one.

Not everything needs to happen in an instant. Everything has an overhead, and if the WebSocket were always the answer, everyone would use it for everything, which isn’t happening. Choosing between REST and a WebSocket needs better reasoning than “it’s open”.

A third suggestion was about expectations: users expect a sent message to show up for everyone at once. The redirect: not the expectation, but what you actually see as a user. On Slack you don’t see a message get posted immediately. Send yourself one and watch.

And a fourth: “definitely a WebSocket”, because a REST call needs a handshake and a TCP connection. Then the entire world should use only WebSockets for everything, so why run normal API servers or spin up Spring Boot instances at all? The handshake also costs less than it sounds: HTTP/1.1 uses persistent connections by default, so repeated REST calls usually reuse one TCP and TLS connection instead of handshaking each time. RFC 9112 §9.3 ↗

None of this is about the receiving side. Receiving has to happen over the WebSocket; otherwise the client would have to keep short-polling and refreshing the page, and the recap board calls REST-based short polling “a very poor UX for something as realtime as messaging”. Strictly, what receiving needs is a channel the server can push on: a WebSocket here, though server-sent events or long polling also push (Lecture 02, §5). developer.mozilla.org ↗ RFC 6202 ↗ It is short polling that gives the poor real-time experience. The debate is only about sending.

So start from the other end. Think of the guarantees you, as Slack, need to give your customer when a message goes out. The architecture follows from them.

And look at what Slack does. A sent message first shows grey, then turns black. It isn’t sent in an instant: you can see a delay after you hit send, a clear sign that sending isn’t extreme real time.

[figure title] Grey, then black

[figure description] On Slack a sent message first shows grey, marked sending, then turns black, sent, after a short visible delay. That delay hints, without proving it, that sending goes through an ordinary request rather than the open WebSocket.

[figure labels] standup in 5 · sending… · a visible delay · standup in 5 · sent · a hint, not proof

[caption] Fig 7·bGrey, then black. A message you send on Slack shows grey for a moment, then black. New figure.

That delay is one hint, not proof, that Slack most probably doesn’t send messages over the WebSocket. The next section shows what it would be doing instead, and why.

§ 7.3

## Three ways to persist a message

One system, three guarantees: save then show (Slack), show then save (a WhatsApp-like app), show and never save (Zoom chat).

About 10 min · class 01:29–01:38, recap 02:20–02:21, Q&A 02:46–02:47

One system can carry three types of communication. Depending on the guarantee you want to give your users, you pick one over the other, and different guarantees shape the system differently. The products are illustrations. Slack’s path is the instructor’s hypothesis (“I may be wrong”), the WhatsApp path is hypothetical, and Zoom chat is the plain case. What to take away is the three types, not the products.

One thing to know before you start, because the class said it on purpose: Slack is drawn here with the first type, yet the final architecture in chapter 9 (9.2) sends Slack’s messages down the second, Kafka path. The conflict is deliberate, so that you choose by guarantee rather than copy a diagram (7.5).

The parts: databases; users; API servers, which are normal HTTP (REST) servers; an edge server, which is just a fancy name for a WebSocket server, the one holding users’ WebSocket connections; and a broker such as Kafka.

[figure title] 3 ways to persist the message

[figure description] Three ways to persist a message on one system. One, Slack in the instructor’s hypothesis: over HTTP through a load balancer to an API server, which saves it to the sharded database and then tells the edge server to deliver it. Two, a hypothetical WhatsApp-like app: over the WebSocket to the edge server, which delivers it at once and hands it to Kafka; workers pull it from Kafka and save it later. Three, Zoom chat: over the WebSocket, delivered to whoever is connected and never saved. Which one you pick depends on how critical persistence is.

[figure labels] A · B · 1 · Slack (the instructor’s hypothesis) · lb · api · ×3 · then tell the edge · 2 · a WhatsApp-like app (hypothetical) · kafka · worker · worker · worker · pull · edge server · 3 · Zoom chat · WS · the socket’s open, · send on me? · Depending on criticality of “persistence” we pick one over other

[caption] Fig 7·c3 ways to persist the message, numbered as on the board: ① saves through the API servers, then tells the edge server; ② delivers through the edge server and saves later through Kafka; ③ only delivers. On the board the paths were white, green and blue, a match with Slack, WhatsApp and Zoom that the class noticed; here they are numbered, because green and blue already mean saved and request. Redrawn from the class board at 01:36–01:46 and 02:20.

[figure title] Two glyphs in Fig 7·c

[figure description] Reminder of two glyphs. The kafka pipe, as in Lecture 02: it keeps messages and consumers pull from it. The edge server: a box with a small plug mark, meaning a WebSocket server, not a CDN edge.

[figure labels] kafka · keeps messages, consumers pull · edge · edge server · a WebSocket server, not a CDN edge

[caption] KeyTwo glyphs in Fig 7·c. Kafka is the pipe from Lecture 02; the edge server is a WebSocket server, not a CDN edge.

### ① Slack: save, then show #

The first type is the guarantee the class gives Slack: a message is broadcast only after it is persisted. Unless it is saved, it should not be sent to anyone. Broadcasting before saving may be fine for ordinary users chatting on Instagram, but for an enterprise application, where communication is key, it is a very bad experience. It costs credibility, because people can then misquote you: “No, I received this message, see, it’s right here.”

So the flow is synchronous. The user sends the message over HTTP to an API server; the API server persists it in the database; then the API server sends the message, as an event, to the WebSocket server, which delivers it to the users in real time. Slack’s own description has more tiers: the client calls Slack’s Webapp API to send a message, a Channel Server chosen by consistent hashing on the channel fans it out to every Gateway Server subscribed to that channel, and the Gateway Servers, spread over several regions, hold the clients’ WebSockets. slack.engineering ↗ docs.slack.dev ↗ Whether the save finishes before the fan-out isn’t stated there, so persist-then-broadcast stays the instructor’s hypothesis.

Sending goes over normal HTTP and receiving over the WebSocket, so the user never has to refresh. It is a good experience, and it makes sure a message is saved before it reaches anyone. The class added one more reason, as a bridge to the next type: Slack’s users don’t each keep their own separate store of messages, the way a WhatsApp user does on their phone. Read it as a tentative reason; it comes from the flow of the class rather than a statement of its own.

### ② A WhatsApp-like app: show, then save #

When you send a WhatsApp message, it is stored on your own phone, so one copy of every message is always on a user’s device. Now suppose, hypothetically, that WhatsApp also wanted to store messages in a backend. It doesn’t; this is a thought experiment. If it took Slack’s route, an HTTP call, a database write, then back through the WebSocket server to the friend, it would be far too slow. WhatsApp is meant to be very fast real-time chat, not an enterprise application.

So it takes the board’s “green line” instead. The message goes over the WebSocket to the edge server. The edge server sends it straight to the other user, in real time, and pushes it onto Kafka, from where it is stored in the database later, asynchronously. Persistence right away is not what this path guarantees. That is acceptable because a copy already lives on the user’s device; the backend copy can wait. The gain: no synchronous database call, writes that can be batched through the asynchronous medium, and still a real-time experience for the user. The message goes over the WebSocket because it must be real time, and the connection is already open, so it gets used.

Persistence lags ten minutes. On which path does a refresh hide a message you already saw?

[caption] Clip 7·1One message sent three ways: ① saved, then shown; ② shown at once and saved after the Kafka lag, so a refresh inside the lag hides it; ③ shown and never saved.

[summary] The clip as text 0:40

- One message, three paths: when saved, when shown?

- Slack (a hypothesis): over HTTP, saved first, then broadcast to B.

- WhatsApp-like (hypothetical): shown at once, saved later via Kafka.

- Zoom chat: whoever is connected sees it. Rejoin later: no history.

- If B reloads from the DB in the lag (Slack does): ① there, ② gone.

- A worker saves it later; then a reload finds it. Stored late.

- Different guarantees, different architecture.

Three paths carry the same message, "standup in 5", from A to B. Path 1, Slack as the instructor's hypothesis: A sends it over HTTP to an API server, which saves it in the database and only then tells the edge server (the WebSocket server), which shows it to B: saved, then shown. Path 2, a hypothetical WhatsApp-like app: A sends it over the WebSocket to the edge server, which shows it to B at once and puts it on Kafka; a worker saves it to the database later, after a lag (the class's example: about 10 minutes). Path 3, Zoom chat by default: the edge server shows it to whoever is connected, nothing is saved, and a user who rejoins sees no history. Then B reloads the channel from the database during the lag, as a Slack client can: on path 1 the database has the message and it is still there; on path 2 the database does not have it yet, so the message B already saw disappears. Later a worker pulls it from Kafka and saves it, and a reload finds it again: the message was delivered at once and only stored late. Different guarantees, different architecture.

Why not do this for Slack? Because Slack users can refresh a channel and read its messages from the database. Say the asynchronous save takes 10 minutes. You send on the WebSocket, it goes onto Kafka, and the other users are notified at once. They refresh the page, and the message isn’t there, because the page loads from a database that doesn’t have it yet. WhatsApp users don’t read other people’s messages from the backend, so there it works. A bad idea for Slack, fine for WhatsApp: different guarantees, different architecture.

Pause and think

Suppose Slack used the WhatsApp-like path: over the WebSocket, delivered to B at once, pushed to Kafka, and saved later by workers. The workers lag ten minutes. B sees the message, then refreshes the channel. What is on screen?

Not the message. On this path the message isn’t delivered late; it is delivered now and only stored late. But a Slack channel loads from the database, so for ten minutes a refresh hides a message B has already seen. WhatsApp can live with that because the phone keeps its own copy. Slack can’t, which is why the class drew Slack with persist-then-broadcast: different guarantees, different architecture.

A natural worry, raised in class: with asynchronous persistence, if the workers pick the message up from Kafka a day late, could it be delivered a day late? No. On this path the message goes out to users as a real-time notification immediately; only the storage is delayed. “Not delivered, stored.” The real cost is the one above. If processing is delayed, the source of truth doesn’t have the message yet, so a user who refreshes won’t see a message they have already seen in real time.

### ③ Zoom chat: show, never save #

The third type cares only about real time, not about persistence at all. Zoom chat is the classic example: a user sends a message, everyone connected at that moment (everyone in the meeting) gets it, and that’s it. Leave the meeting and come back, and you don’t see the earlier messages; you only see what was sent while you were there. That is plain in-meeting chat, by default: Zoom also offers continuous meeting chat which, once an admin enables it, keeps the meeting’s messages in a persistent Team Chat group before, during and after the meeting. zoom.com ↗

So, depending on the level of persistence you need, you pick one way or the other. That is the intuition to build. Don’t be ingrained that there is only one way to do it, as in “I have a WebSocket, so let me just send over it.”

The rule for this whole chapter

Different guarantees, different architecture.

“Depending on criticality of ‘persistence’ we pick one over other,” as the board put it. Choose the path by how critical it is that a message is saved, not by which connection happens to be open. The same goes for the store underneath it (7.1): pick by the product and the requirement, not by your affinity to a stack.

[figure title] Different guarantees, different architecture

[figure description] One user, three paths for the same message. Path one: saved, then shown. Path two: shown at once, saved later. Path three: shown, never saved. Pick by how critical persistence is.

[figure labels] 1 · 2 · 3 · saved · shown · shown · saved · shown · pick by how critical persistence is

The recap at 02:20 named the three types by their persistence: synchronous storage (Slack), asynchronous storage (the WhatsApp-like app), and non-persistent (Zoom chat). Three ways to build the same system.

### Three ways, side by side #

Three ways to persist a message: synchronous (Slack), asynchronous through Kafka (a WhatsApp-like app), and none (Zoom chat)

|

| ① Slack (sync)

| ② WhatsApp-like (async via Kafka)

| ③ Zoom chat (none)

| Send over

| HTTP, to an API server

| The open WebSocket, to the edge server

| Saved when

| First, before anyone sees it

| Later: workers save it from Kafka, in batches

| Never

| Shown when

| Once it is saved, through the edge server

| At once

| At once, to whoever is connected

| Refresh after a lag shows

| The message: the database already has it

| Nothing, until the workers catch up

| Nothing: there is nothing to load

| Where history lives

| The sharded database

| On the phone first; in the database later

| Nowhere: leave and it’s gone

| Good for

| Enterprise chat, where a message must be on record

| Fast chat whose phones keep their own copy

| Chat that only matters while you are in the meeting

§ 7.4

## Keep the edge server dumb

One more reason not to send through the WebSocket: a database connection on the edge server is load, risk and exposure.

About 4 min · class 01:38–01:40, Q&A 01:42–01:44

There is one more reason not to send through the WebSocket. Persisting a message that arrives on the edge server means the edge server calls the database, and you want to avoid that. It is already handling a ton of TCP connections. It is open on the internet, so holding a connection string to the database there is a security problem. And if it goes down, the entire real-time communication of your platform goes down with it. No one stops you from making a database call there; you avoid it.

Calling the database directly from the WebSocket server puts a lot of load on that server. This is a little on the infrastructure side: you see where it falters once you deploy it and watch it in action. That is why a lot of companies never put any complex logic on the WebSocket server. It just relays messages and events, and at most ingests messages into an asynchronous queue. In Fig 7·c the edge server has no line to the database at all; its only outbound line is the dashed one to Kafka.

A question in class: don’t WebSockets offer persistence? They offer a persistent connection, not database persistence, and database persistence is what matters for Slack. Getting it through the WebSocket means the WebSocket server talks to the database: more load on a server already balancing a lot of TCP connections, security implications, a risk of overwhelming it, and if it goes down, the real-time backbone breaks.

The instructor’s own practice is firm: he never lets the WebSocket server talk to the database. At most it puts a message into Kafka, holding nothing but a Kafka connection string. Edge servers are typically the most vulnerable servers in your infrastructure. Keep your database credentials as secure as possible. An edge server that talks straight to the database exposes those credentials almost on the internet, and if it is compromised, you are gone. With only a Kafka connection string on it, basic security still holds after a breach. Database writes belong on a backend server. Chapter 9 (9.4) comes back to what may sit on an exposed edge server, including how much even a Kafka credential should be allowed to do.

A note on the word. “Edge server” here does not mean a CloudFront edge server. It is the ordinary server on which the WebSocket connections are established; the name is standard terminology.

§ 7.5

## Why not UDP, and ten ways to build it

A lighter transport that pushes the work onto the client, and why the lecture keeps its designs in conflict.

About 5 min · class 01:39–01:42, 01:45–01:46, Q&A 02:48–02:49

A tempting idea, suggested in class: an HTTPS connection is resource-heavy, so send messages over UDP over TLS instead. Keep receiving on the WebSocket, and retry the send until the WebSocket confirms the message reached the server. The answer: the guarantees are very slim, the retries would be much higher, and the client would end up taking care of the broadcast instead of the server. The server should be the one doing the broadcast. If A sends to B over UDP, who tells B that the message is there?

Weigh pros against cons. A micro-optimisation like this saves a little overhead and buys you the complexity of retries and needlessly complex client code. Don’t overcomplicate. In class this was put as seeing gRPC requests fire when you open the app; what Slack’s client actually uses to send are ordinary HTTPS API calls, with no fancy transport. slack.engineering ↗ docs.slack.dev ↗

You would use UDP where it is okay to drop data, not for critical use cases like Slack’s message persistence. UDP itself guarantees nothing, so reliability has to be added on top of it. QUIC, the transport under HTTP/3, does exactly that: it runs over UDP datagrams and builds its own reliable delivery and congestion control. RFC 9000 ↗ RFC 9114 ↗

Keep it simple. Simple systems are harder to build, and simple systems scale. Unnecessary complexity stops a system scaling, makes it harder to debug, harder to onboard engineers onto and harder to change, and kills its extensibility.

### Ten ways to build it #

This chapter drew Slack with synchronous persistence (type ①), and that is the instructor’s preference here. You can also do it with the asynchronous Kafka route, and his final diagram (9.2) does exactly that. Any implementation is possible, depending on the guarantees. The more systems you build, the more you see that every system can be built in 10 different ways, and you pick one depending on the guarantees. That is why the designs in this lecture deliberately conflict and never converge to one: so that you think about every single decision you take.

So is there a best way? No. The lecture laid out three types of persistence, different ways of communicating and different privacy options: an entire buffet. You build your own plate from the guarantees you give your customers.

Receiving is settled: it goes over the WebSocket. But one channel’s members won’t all be connected to the same WebSocket server, and that is chapter 8.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does Slack send messages over HTTP even though a WebSocket is already open? Give the class’s two reasons.

[summary] Show answer

First, the guarantee: Slack broadcasts a message only after it is persisted, so the send goes to an API server that saves it and then tells the edge server to deliver it. Enterprise users need the record, and a refresh reads the database. Second, the edge server should stay dumb: sending through the WebSocket would make the WebSocket server call the database, adding load to a server already holding many connections, exposing database credentials on an internet-facing box, and risking the whole real-time backbone.

In the WhatsApp-like path, a worker lags 10 minutes. What does the recipient see, and what does a refresh show?

[summary] Show answer

The recipient sees the message at once: it is delivered over the WebSocket now, and only its storage is late. A refresh reads the database, which doesn’t have it yet, so for those ten minutes the message the user already saw is missing. Fine where the phone keeps its own copy; not for Slack.

Why should the edge server hold no database credentials, and what does it hold instead?

[summary] Show answer

Edge servers are typically the most vulnerable servers you run, and they face the internet: database credentials on one are almost public, and if it is compromised, you are gone. The edge server holds at most a Kafka connection string to put messages into Kafka, so basic security holds even after a breach. Database writes happen on a backend server.

Concepts in this section: sharding by channel_id · send vs receive · synchronous persistence · asynchronous persistence · no persistence · edge server · simple systems scale

Contents of this lecture ↑

Lecture 04, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 8-scaling-websockets ===

# Slack in real time, chapter 8: Scaling WebSocket servers

Lecture 04 · Slack in real time · chapter 8 of 10

§ 8

## Scaling WebSocket servers

One channel’s members land on different servers. Start with one TCP link, watch a mesh eat each server’s connections, then put a real-time Pub/Sub in the middle and a Balancer in front that keeps an organisation together.

About 33 min · class 01:46–02:19, recap 02:25 and 02:30, Q&A 02:35–02:46

A channel, C1, has five members, A to E. One WebSocket server can hold four connections. A sends “standup in 5”. How does E, connected to another server, get it?

Chapter 7 settled that receiving goes over the WebSocket. This chapter scales the servers that hold those WebSockets. It starts with the simplest thing that works, a TCP link between two servers, and improves it only when the problem demands: first a real-time Pub/Sub in the middle, then a service that decides which server each user connects to.

§ 8.1

## One channel, two servers

Toy numbers: four connections per server, five users in one channel. What each server knows, and the message that can’t reach E.

About 6 min · class 01:46–01:55, recap 02:30

Receiving is settled (7.5): it goes over the WebSocket. Next comes scaling the WebSocket servers, one of the most interesting parts of the design. It starts from very basic assumptions with small numbers. Change the numbers and you get the real-world case.

Why does this part deserve the care? Whenever a company uses WebSockets, or any persistent connection, the features it drives through them are its most critical ones: Discord’s chat, video streaming. If the WebSocket servers are gone, real-time chat stops working. Those features live there because of the connection itself. An expensive TCP connection is kept open between the client and the backend, so it doesn’t have to be re-established every time. That gives low-latency communication and makes the product experience rich.

Like every other server, a WebSocket server has a limit on how many connections it can handle. To keep the explanation small, assume the limit is four. Real servers hold far more.

Now take one channel, channel 1 (C1), with five users: A, B, C, D and E. When A sends a message on C1, B, C, D and E must all receive it. A, B, C and D connect first and fill WebSocket server 1 (WS1). When E connects, WS1 is full, so E connects to a second server, WS2. These are persistent WebSocket connections, there for high-performance, low-latency communication.

Here are the two servers, one step at a time. Step through with the buttons or the arrow keys:

[figure title] Four connections, five users

[figure description] Five users in one channel, a four-connection limit: A to D share WS1 and E lands on WS2. WS1 delivers locally to B, C and D, but nothing reaches E. Under the servers, the membership each one keeps: WS1 has A, B, C and D in C1; WS2 has E in C1.

[figure labels] Channel 1 (C1): · A B C D E · ws1 · limit: 4, a toy number · (real: far more) · 1 · B · A · C · D · ws2 · E · 2 · standup in 5 · sender skipped · 3 · ? · like two friends in · another hotel room · 4 · what each server keeps, in memory: · A→C1  B→C1 · C→C1  D→C1 · E→C1 · the client sends its channels after connecting; · kept eventually consistent

- Assume a WebSocket server can hold four connections. Real servers hold far more.

- A, B, C and D fill WS1, so E connects to WS2.

- A sends standup in 5 to C1. WS1 knows who is in C1, skips the sender and sends it to B, C and D.

- But E is in C1 too, on another server. How does it get the message?

Keys: ← → to step · link to a step with #fig-8a/step-3

[caption] Fig 8·aThe strip inside each server is its connection slots: blue when a user holds one, with a red tick at the toy limit of four. Below the line, always visible, is what each server keeps in memory. Redrawn from the class board at 01:49–02:04 (D-05), with the membership lists from the same board and the 02:30 recap’s local connection pool (D-12) folded in.

How does WS1 know who is connected to it? A WebSocket server built with Socket.io, or any equivalent library, knows which users are connected to it: the handshake tells it. The recap board drew this as a local connection pool inside each edge server, next to the Socket.IO server that manages it.

[summary] Build it: Socket.io skip if you have written one

If you have never written a hello world with Socket.io, do write one. It is the quickest way to see for yourself that the server knows who is connected to it.

Knowing who is connected is not enough, because a message is sent to a channel, not to users. So after the connection is established, the client first sends meta information: its membership, the channels it is part of. A might say “I am part of C1, C2 and C3.” Each WebSocket server keeps this, in memory or maybe on disk, whichever: which users are connected to it and which channels they belong to. WS1 knows that A, B, C and D are in C1, and WS2 knows that E is in C1, as the lists under each server on the board show.

Memberships change, so the server is kept eventually consistent with them. Whenever a user joins or leaves a channel, the information is sent to the server, and users also resend their membership periodically.

With that in place, delivery within one server is a lookup. A sends a message meant for C1 to WS1. WS1 looks up who is in C1, finds A, B, C and D, skips A because A sent it, and sends the message to B, C and D.

Here is the problem. E is also in C1, but E is connected to WS2, and nothing has told WS2 about the message. Somehow it has to reach E. Picture a group of friends having fun in one hotel room while two of their friends sit in another room. How would those two know what the others are doing, and be part of the fun?

§ 8.2

## Start simple: one TCP link

The class’s ideas for reaching E, from the API server to Kafka, and the bare minimum that works: two machines simply talk.

About 5 min · class 01:55–02:02

How will the message reach E? The class tried several ideas before the bare answer. Try it yourself first.

Pause and think

A, B, C and D are on WebSocket server 1, E is on server 2, all in C1. A posts. What is the simplest thing that gets the message to E?

One TCP connection. WS1 already knows its own users. It opens a plain TCP link (not a WebSocket) to WS2 and relays the message. WS2 sees it is for C1, finds E, and sends it on. Kafka would slow a real-time path and need consumers running, and a relay server is another machine for two that can already talk. Start from first principles, and improve only when the problem demands it, which 8.3 does.

The first idea, suggested in class: route the message through the API server, which is connected to both WebSocket servers, though, as the suggestion itself admitted, that would be slow. It wasn’t taken up; the question stayed how the message gets from WS1 to WS2.

Another: cache user information on each WebSocket server. But each server already knows who is connected to it. What else would you cache, and where?

When you are stuck like this, go to first principles. How do you even approach an unknown situation like this one?

A third suggestion was a messaging service, such as Kafka, between the WebSocket servers. Why a messaging service? It slows things down, you need a bunch of consumers running, and each server would be consuming a lot from it. Start simple.

A fourth: another server connecting the two WebSocket servers, relaying a copy of the message. Why do you need another server? These two machines can talk to each other directly. You create TCP connections all the time.

That is the answer. WS1 establishes one TCP connection with WS2: a normal TCP connection, not a WebSocket connection. It sends the message over it. WS2 sees the message is for C1, looks up which of its users want C1’s messages, finds E, and sends it to E.

[figure title] TCP links between WebSocket servers

[figure description] WS1 reaches E with one plain TCP link to WS2: it delivers to B, C and D itself and relays the message over the link, and WS2 sends it to E. Then F joins C1 on WS3, WS1 opens a second link to WS3, and F gets it too. Each link costs a server one connection on top of its users.

[figure labels] A · B · C · D · ws1 · E · ws2 · tcp · ✓ · we bridge the gap · 1 · ws3 · F · joins C1 · tcp · ✓ · 2

- WS1 opens one plain tcp connection to WS2 and relays the message. WS2 finds E and delivers. Each server spends one slot on the link.

- F joins C1 on WS3. WS1 opens a second link, and everyone in C1 gets the message.

Keys: ← → to step · link to a step with #fig-8b/step-3

[caption] Fig 8·bSteps 1–2; the third step is in 8.3. Blue is the message, green a delivery; the red slot after a server’s cap tick is a connection it spends on another server. Redrawn from the class board at 01:57–02:01 (D-05), with the recap’s “we bridge the gap” (D-13) as step 1’s label.

A TCP connection between two machines is the bare minimum when you want them to talk to each other. Why introduce more complexity than that?

Each WebSocket server now holds a WebSocket connection for each of its connected users, plus one TCP connection to talk to the other server. That solves the problem: A’s message for C1 reaches B, C and D directly and E over the link, so everyone in the channel gets it.

Now spice it up. User F joins C1, but for whatever reason establishes the WebSocket connection with a third server, WS3. WS1 builds a TCP connection to WS3 as well. A’s next message goes to B, C and D locally, over one link to WS2 and E, and over the other to WS3 and F. Everyone in C1 gets it.

Look at the order the class worked in. It started with a problem, solved it with basic fundamentals, and only then started thinking about making it better. That is how to approach any problem.

The rule for this whole chapter

Start with the problem, solve it with basic fundamentals, then make it better.

A TCP connection between two machines is the bare minimum, so don’t add anything more until the problem demands it. The rest of this chapter is the “make it better” part: the links become one real-time Pub/Sub (8.4), and a Balancer keeps most messages off even that (8.6).

[figure title] Start simple, then make it better

[figure description] Three steps: two WebSocket servers joined by one TCP link, the bare minimum; then four servers on one real-time Pub/Sub; then a Balancer above them that tells clients where to connect.

[figure labels] ws1 · ws2 · tcp · the bare minimum · then better · then better

§ 8.3

## The mesh, and its real cost

Every server linked to every other. Nine answers about what is wrong with that, and the one that matters: connections meant for users.

About 6 min · class 02:00–02:07

Keep adding servers and keep linking. Connected this way, every WebSocket server has to be connected to every other WebSocket server, no matter how many servers there are. That is a mesh.

[figure title] Four servers, every one linked to every other

[figure description] Four WebSocket servers in a two by two grid, joined pairwise by six TCP links: the four sides and both diagonals. Every server now spends three connections on its peers, drawn as three red slots after its four user slots.

[figure labels] A B C D · E · F · tcp · ws1 · ws2 · ws3 · ws4 · every server ↔ every other

[caption] Fig 8·b, step 3Four servers, every pair linked: six links, the four sides and both diagonals, and three red peer slots on every server. Redrawn from the class board at 02:04 (D-05, final form), where the fourth server was left unlabelled.

What is the disadvantage of this architecture? The class answered one idea at a time. Try it before reading them.

Pause and think

Every WebSocket server now holds a TCP link to every other. A server can hold 4 connections in this toy, and there are 4 servers. What is the real cost of the mesh?

The connections. A server’s job is to serve users, but each one now holds a persistent link to every peer: with 4 users and 3 peers that is 7 connections, 3 of which carry no user. At 100 servers each one spends 99 links on talking among servers. Latency is fine, a server going down is a fault-tolerance problem, and handshakes happen once per link, not per message. Name the overhead before you fix it.

The answers given in class, each with what became of it:

E and F get the message a little later. They do, but it still happens in real time, which is fine.

WS1 has to maintain too many connections: TCP links to the other servers on top of A, B, C and D. The first reply was that you have to do it; there is no other way to communicate. Keep this one in mind. It turns out to be nearest the real answer.

Each server must keep all those connections alive, and re-establish any that die. Why is that an overhead? The question was put back to the class, and the probing went on.

If a server goes down, its connection is gone and its messages are missed. That’s okay, and it is not the overhead in question: a server going down is fault tolerance.

Every message is sent to every server, even ones that don’t need it. That can be minimised and optimised with a global state, and even then a much bigger overhead remains.

Make the inter-server communication asynchronous, so a server that was down can catch up. Again: down is fault tolerance, not the overhead being discussed.

Server discovery, when you scale WebSocket servers horizontally. That’s a different problem, and still not the overhead.

A three-way handshake for every message sent to another server. No: the TCP connection is established once, and messages are just relayed over it. It isn’t re-established for every message.

One connection per server limits horizontal scaling, since a server can’t have infinite connections. The first counter: a server can still have a good amount, say a million connections, and you would never have more than 10,000 servers anyway, so 10,000 connections are created with ease. Then: “you are the closest”.

Chasing these while the real cost sits in plain view is like worrying about a small mouse while a dinosaur stands behind you, staring at you. Notice, too, what went wrong in the hunt: three people used the word “overhead”, and no one explained what the overhead actually was. Before jumping into a solution, understand and explain the problem.

So, the problem. A WebSocket server exists to support WebSocket connections, and in the class’s words every server has a limited number of ports on which it can accept connections, so a WebSocket server can hold only so many.

More precisely

Ports are not the limit: every client connects to the same listening port, and a TCP connection is identified by the pair of sockets, the client’s address and port plus the server’s address and port. What bounds a WebSocket server is its file descriptors, memory and CPU, so it can still hold only a finite number of connections.

rfc-editor.org ↗

With the mesh, every server has to connect to every other, so a lot of each server’s persistent TCP connections are hogged just to stay connected to the other servers. With four users connected to a server and three peer servers, it holds seven connections, and three of them are only for inter-server communication. A WebSocket server’s job is to serve users. The mesh wastes many of its TCP connections on talking among servers.

[figure title] Where WS1’s seven connections go

[figure description] In a four-server mesh, a server with four users holds seven connections, and three of them only talk to other servers. At 100 servers, each one would spend 99 links on its peers.

[figure labels] ws1 · A · B · C · D · ws2 · ws3 · ws4 · the job: serve users · 3 serve no user · just 3 links… · 4 users + 3 peers = 7 · 100 servers → 99 links each

[caption] Fig 8·cWhere WS1’s seven connections go: four serve users, three only reach other servers. The speech bubble is the tempting reading (“you have to do it”); at 100 servers every one would spend 99 links on its peers. New figure.

So how do you make it better? 8.4.

§ 8.4

## A real-time Pub/Sub in the middle

One connection per server instead of one per peer. What “real-time” means here, why it isn’t Kafka, and what a server misses if it isn’t connected.

About 6 min · class 02:07–02:10, Q&A 02:38–02:40 and 02:45–02:46

Now scale the mesh up. With 100 edge servers, does every server connect to every other? The recap board answered its own question: “Not a great idea! Can we do better?”

A way to make it better: don’t keep all these TCP connections between servers. Put a Pub/Sub in the middle instead, and every WebSocket server creates a single connection to it, rather than one to every other server.

It has to be a real-time Pub/Sub, such as Redis, not Kafka. Kafka would slow it down. The TCP connection overhead for inter-server communication is now reduced to just one: in the example, WS1 holds four connections for A, B, C and D and one to the real-time Pub/Sub.

Add a fifth server. How many new links does the mesh need, and how many does the Pub/Sub need?

[caption] Clip 8·1Each new server must link to every other, so the links and each server’s wasted slots climb; a real-time Pub/Sub in the middle leaves one link per server and keeps nothing.

[summary] The clip as text 0:39

- Two servers, one TCP link. WS1: four users plus one link.

- A third server must link to both others: 3 links.

- Four servers: 6 links. 3 of WS1's 7 connections serve no user.

- A fifth server needs 4 more links. Every server links to every other.

- Put a real-time Pub/Sub in the middle: one link per server.

- WS1 publishes once. The Pub/Sub pushes it on and keeps nothing.

WebSocket servers joined in a mesh, then through a real-time Pub/Sub. WS1 holds four users, A to D, and one TCP link to WS2, which holds E. A third server must open a TCP link to both others (3 links), a fourth to all three (6 links), and an illustrative fifth to all four (10 links): every server links to every other. Each link also takes one of the server's connections: with four servers WS1 holds 7, and 3 of them serve no user; with five, 4 of 8. Then all the links are replaced by one real-time Pub/Sub (Redis) in the middle, and each server keeps a single connection to it, so WS1 holds its 4 users plus 1 link. When A sends a message, WS1 delivers it to B, C and D, publishes it once to the Pub/Sub, and the Pub/Sub pushes it to every server connected right now, which hand it to E and F. The Pub/Sub keeps nothing.

[figure title] One Pub/Sub in the middle

[figure description] Four WebSocket servers, each with one connection to a real-time Pub/Sub (Redis) instead of one to every other server. The Pub/Sub pushes each message to the servers subscribed at that moment and stores nothing. Each server’s slots now show its users plus a single Pub/Sub link.

[figure labels] 100 servers, every one · to every other? Not a great · idea! Can we do better? · A · B · C · D · E · F · G · H · ws1 · ws2 · ws3 · ws4 · tcp · 4 users + 1 link · redis · real-time pub/sub · pushes to whoever is · subscribed right now · keeps nothing · real-time, not Kafka

[caption] Fig 8·dOne Pub/Sub in the middle. Each server keeps its user slots plus one graphite slot for its link to Redis; the red peer slots are gone. Redrawn from the class board at 02:08–02:19 (D-06), without the Balancer, which comes in 8.6; the question at the top is the recap board’s at 02:30 (D-13).

[summary] A ready-made version skip unless you are building this on Socket.IO

This is what Socket.IO’s Redis adapter does: it broadcasts packets between multiple Socket.IO servers through Redis Pub/Sub (a sharded variant needs Redis 7.0 or later). The adapter does not sign, encrypt or authenticate these messages, so Redis must stay inside trusted infrastructure. github.com ↗

What is a real-time Pub/Sub? It is very simple. It says: send this message to everyone who is subscribed to it right now. It gives you zero persistence. Unlike Kafka, it doesn’t store the message at the moment it relays it; it just pushes it to the subscribers.

So when A sends a message to Slack channel 1, WS1 first checks which of its own users are in channel 1, finds B, C and D, and delivers to them. Then it sends the message to the real-time Pub/Sub, which pushes it to everyone subscribed.

The message goes to WS2, WS3 and WS4 right there and then. A server that wasn’t connected at that moment doesn’t receive it. A real-time Pub/Sub does not guarantee delivery; its only guarantee is to send the message to everyone connected to it at that moment. Redis’s documentation puts it the same way: Pub/Sub delivery is at-most-once, so if a subscriber errors or disconnects, the message is lost for good. When a missed message matters, Redis Streams persist messages and support at-least-once delivery. redis.io ↗ What Slack does about a lost real-time message is part of chapter 9 (9.3).

Redis is a great example of a real-time Pub/Sub tool. The same kind of real-time Pub/Sub comes back later in the course. coming later · Lecture 05: reactive configuration coming later · Lecture 10: reloading a dictionary on every server

### Why Redis? #

Asked in class: why Redis Pub/Sub, when cloud providers offer other streaming services? Anything that gives real-time Pub/Sub would do. The requirement is real-time Pub/Sub, not Redis: whichever provider, database, tool or framework offers it, or one you build yourself. The instructor picked Redis because he has used Redis to build this exact same system; that is his own experience, not a ranking of tools. Persistence isn’t needed from this Pub/Sub. If a tool gives it, good enough, but what is required is sending messages in real time to everyone subscribed.

Does a message then expire after some time? There is no expiration, because there is no persistence: no one stores the message anywhere. It is received and sent on to everyone subscribed.

### Redis Pub/Sub vs Kafka #

Another question from class: can we conclude that Redis Pub/Sub and Kafka are kind of the same? No. Nor is the difference simply that “Kafka is asynchronous”; that framing wasn’t accepted either. The difference is in who moves the message and what is kept. Kafka is pull-based: consumers pull messages from Kafka. Redis Pub/Sub pushes messages to everyone connected. Kafka gives you persistence of historical messages; Redis gives you zero persistence on Pub/Sub.

So is one of them superior? Nothing is superior and nothing is inferior. For real time, Redis is superior; for persistence, Kafka is. There is no one answer: it is very contextual.

Redis Pub/Sub vs Kafka: who moves the message, what is kept, and what each is used for in this design

|

| Redis Pub/Sub

| Kafka

| Who moves the message

| Redis pushes it to every subscriber connected now

| Consumers pull it from Kafka

| What is kept

| Nothing: zero persistence

| Historical messages, for a retention window (time or size), not forever by default

| A subscriber that was offline

| Misses it: at-most-once

| Reads it later, if it is still within retention

| Speed

| Real time

| Would slow the path between edge servers

| Use here

| Between edge servers (this section)

| Asynchronous persistence (7.3, chapter 9)

Kafka’s history is bounded: messages are not deleted when they are consumed, but they are kept only for a configurable time- or size-based retention period. kafka.apache.org ↗

§ 8.5

## Redis channels for Slack channels

Each server subscribes to the Redis channels of its own users’ Slack channels, so a message reaches only the servers that need it. And what happens when a channel is created.

About 6 min · class 02:10–02:14, recap 02:25, Q&A 02:35–02:38 and 02:43

Look at Fig 8·d again. Why should a message for C1 go to WS3 and WS4 at all? It shouldn’t.

First, a clash of words. Redis Pub/Sub has channels, and Slack has channels. There are very few words to go around, so from here on this page always says Slack channel or Redis channel.

Broadcasting every message to all the WebSocket servers is wasteful. A message for Slack channel 1 should go only to the servers that have members of that channel, such as WS2, where E and F are connected, and not to WS3 or WS4.

Redis channels make that possible; search for “Redis Pub/Sub” to read how they work. When a WebSocket server spins up, it establishes a connection with the Redis Pub/Sub backbone and asks to be subscribed to Redis channels. When a user connects to the server and tells it its membership (“I am part of channel 1”), the server fires a Redis subscribe command and subscribes itself to that channel.

# WS1, when A connects and says "I'm part of C1" SUBSCRIBE c1 # WS1, after delivering to B, C and D itself PUBLISH c1 "standup in 5"

It is the server that subscribes, not the user. The user has a WebSocket connection with the server; the server has one Redis connection, one TCP connection, with Redis.

In the running example, A, B, C and D on WS1 are in Slack channel C1, so WS1 is subscribed to Redis channel C1. WS2, with E and F, also in C1, is subscribed to C1 too. Users G and H, on WS3, belong to Slack channel C2.

End to end: A sends a message to WS1. WS1 sends it to B, C and D. WS1 sends it to Redis Pub/Sub on channel 1. Redis sends it to the server subscribed to channel 1, WS2, and WS2 sends it to its connected members of the channel, E and F. The message is literally pushed to WS2. WS2 does not pull it. This way, with minimal overhead of TCP connections, the WebSocket servers communicate, and each message reaches only the servers that need it.

The recap board stated the idea in two lines: every Slack channel has one Pub/Sub channel, and each edge server subscribes to the Pub/Sub channels for the Slack channels its connected users are part of. Membership information lives with the edge servers, because users tell them which channels they are in when they connect, and the edge servers fire the subscribe commands to Redis. Spoken, WS1 might subscribe to C1, C2 and C3, and WS2 to C2, C3 and C5. On the board, one edge server holds A in c1, c2 and c3, B in c2, c4 and c5, C in c1 and c3, and D in c4, and sends one SUB(c1,c2,c3,c4,c5).

[figure title] One edge server, its users’ Slack channels

[figure description] An edge server collects the Slack channels of all its connected users, A in c1, c2 and c3, B in c2, c4 and c5, C in c1 and c3, D in c4, and subscribes once to the matching Redis channels: c1 to c5.

[figure labels] B · A · C · D · edge server · the server subscribes, · not the user · A (c1, c2, c3) · B (c2, c4, c5) · C (c1, c3) · D (c4) · SUB(c1,c2, · c3,c4,c5) · c1…c5 · real-time pub/sub [redis] · one pub/sub channel for each Slack channel · * can be optimized

[caption] Fig 8·eOne edge server collects its users’ Slack channels and subscribes once to the matching Redis channels. Redrawn from the class recap board at 02:25 (D-10), including its note “* can be optimized”.

In this design the Slack channels the edge servers subscribe to coincide with the Redis channels, one for one, but the board adds “* can be optimized”: the implementation may vary.

What if one Redis Pub/Sub seems like too little? Have a cluster of it, sharded, with intelligent balancing. One thing to know when you do: in a Redis Cluster, a classic PUBLISH goes to every node. Since Redis 7.0, sharded Pub/Sub (SSUBSCRIBE/SPUBLISH) assigns channels to slots the way keys are assigned and keeps each message within its shard, so only sharded Pub/Sub scales by adding shards. redis.io ↗

The same question came up in class from the other side: with lots of users across many organisations, how do you keep track of which servers subscribe to which channels? That is exactly why it isn’t one Redis instance. It is several, a cluster of Redis. (Why most of that traffic never reaches Redis at all is 8.6.)

### How servers learn about channel changes #

Asked in class: how are the servers kept aware of channel changes, when a channel is created or someone joins or leaves? From the user, who is the one taking the action. You always join a channel while you are online, so the client sends an event to its edge server: “now I’m subscribed to this channel.” Does that event have to go to every server? No. Each edge server handles the “I am part of this channel” events of its own users.

Creating a channel shows the whole loop. Say A creates channel 3 with A and D in it. A makes an API call to create channel 3, which updates the database. Then a notification is broadcast through the Redis Pub/Sub to all the edge servers: a new channel has been created for this organisation, and these users are part of it. The newly added users receive it in real time, as the “new channel added” animation in their channel list. Once notified, each added client tells its edge server “I’m now also part of channel 3”. The edge server updates its in-memory store and fires a call to Redis to subscribe to channel 3 as well. The client can also send a periodic meta call to its edge server, listing the channels it is part of: the periodic resend from 8.1.

[figure title] One message through Redis, then a new channel

[figure description] Lanes for user A, WS1, the Redis Pub/Sub, WS2, WS3 and the API server, time running down. A message for C1 is delivered locally by WS1, published once to Redis channel c1 and pushed only to WS2, which delivers to E and F; WS3, subscribed to c2 only, gets nothing. Then A creates channel c3 with D through the API, a new-channel notice goes through Redis to the edge servers, and WS1 subscribes to c3.

[figure labels] A · ws1 · A–D · sub c1 · redis · ws2 · E F · sub c1 · ws3 · G H · sub c2 · api · C1: standup in 5 · 1 · B C D · 2 · PUBLISH c1 · pushed, not pulled · c2 only: · nothing · 3 · E F ✓ · 4 · create channel c3 (A, D) · db updated ✓ · 5 · new channel c3: A, D · 6 · I’m in c3 · SUBSCRIBE c3 · ws1: c1, c3 · also: a periodic meta call listing my channels · 7

- A posts in Slack channel C1. WS1 receives it.

- WS1 delivers to its own C1 members first: B, C and D.

- WS1 publishes on Redis channel c1. Redis pushes it to WS2, the only other server subscribed to c1. WS3 is subscribed to c2 only and gets nothing.

- WS2 delivers to E and F. Minimal connections, and only the servers that need it.

- A creates channel c3 with D: an API call updates the database.

- A “new channel” notification goes through Redis to the edge servers, and A and D see it in real time. Who publishes it wasn’t specified in class; it is drawn from the API server here.

- The clients tell WS1 they are in c3. WS1 updates its memory and subscribes to c3.

Keys: ← → to step · link to a step with #fig-8f/step-3

[caption] Fig 8·fTime runs down. The lanes are user A, three edge servers with the Slack channels they subscribe to, the Redis Pub/Sub and the API server. Blue is the message, green a delivery or a saved write, graphite the channel bookkeeping; dashed means nobody waits for it. New figure, built from the class board at 02:12–02:14 and the Q&A at 02:36–02:38.

Whether an edge server should simply trust the channel list a client sends is a question for chapter 9 (9.4), once private channels exist.

§ 8.6

## The Balancer

A service that tells each client which edge server to connect to, and keeps an organisation on one server so its messages rarely touch Redis.

About 6 min · class 02:14–02:19, recap 02:27–02:29, Q&A 02:41–02:44

One step has been skipped all along. When A opened the Slack app, it connected to WS1. How did A get WS1’s address?

Start from the goal: try to put all the users who are part of the same set of channels on the same WebSocket servers. That takes a layer that sits not between the users and the servers, but on top. When a user opens the Slack app, the client talks to it and asks “where do I connect?”. It answers with the IP address of a WebSocket server, and the client connects to that server. It is like DNS, but it is not DNS. It is a normal service whose job is to balance the connections, which here means telling each client where to connect.

[figure title] Ask the Balancer, then connect

[figure description] Before connecting, the Slack client asks the Balancer which edge server to use and gets an address back, ws1, then opens its WebSocket to that server. The Balancer keeps an organisation’s users on one server, so their messages rarely touch Redis. The other servers are shown faded.

[figure labels] A · where do I connect? · balancer · 1 · ws1 · 2 · balance connections · like DNS, not DNS · not a load balancer · same org → same server: · Redis only for the worst case · 3 · ws1 · ws2 · ws3 · ws4 · redis

[caption] Fig 8·g① A asks where to connect, ② the Balancer answers with an address, ③ A opens its WebSocket to that server. The other servers are faded. Redrawn from the class board at 02:15–02:19 (D-06), where the Balancer was a purple box labelled “Balance Connectn”.

What should it answer? Naively, give each organisation its own WebSocket server. Organisations on Slack have 200, 500, 10,000 or 20,000 employees, and that is nothing for one WebSocket server. If all the users of an organisation connect to the same server, there is no need to send their messages to Redis at all: the server delivers them among themselves. So the service’s job is to hand out the WebSocket server to connect to in a way that reduces the number of messages that must go through the Redis Pub/Sub. A user who logs in or starts the Slack app asks it for a server’s IP address, gets one and connects.

In the recap the class gave it a name: the Balancer. The instructor’s generic name for such a component is “orchestrator”. It is not a load balancer. A user asks it, gets an edge server’s IP address and connects to that edge server. It tries to put all the users of a particular organisation on the same edge server. When a user comes up and says “I’m part of this organisation; where should I connect?”, the Balancer always returns the IP address of the same edge server, so everyone in that organisation connects to that one server. That minimises the IO on Redis, which is left carrying only the worst case.

What if this server goes down? “Oh my God, life ended.” No. Nothing serious happens. Its users talk to the Balancer again and get another server’s IP address to connect to. It is the Balancer’s responsibility to notice that the server is down and move all those users to another server. In the worst case, for some time after that, an organisation’s users are spread across servers and their messages travel through Redis. That is perfectly fine. The Balancer may also rebalance load across the servers periodically, intermittently killing a connection so that all of a particular user’s traffic moves to another server, to minimise the IO over Redis.

[figure title] A server dies

[figure description] Lanes for one organisation’s users A to D, the Balancer, three edge servers and the Redis Pub/Sub, time running down. WS1 dies; its users ask the Balancer again and are spread over WS2 and WS3, so their messages travel through Redis for a while. Later the Balancer regroups them on WS2 and Redis is out of the path again.

[figure labels] A–D · balancer · ws1 · ws2 · ws3 · redis · one org, one server · ws1 dies · 1 · where do I connect? · ws1 ✕ · 2 · A, B → ws2 · C, D → ws3 · 3 · A posts in C1 · B · PUBLISH c1 · C D · Redis carries it for now: fine · 4 · C, D → ws2 · Redis IO back to the worst case only · 5

- WS1 dies. Its users lose their connections.

- They ask the Balancer again. It notices WS1 is gone.

- It hands out other servers. For a while the organisation is split across WS2 and WS3.

- Their messages now go through Redis: WS2 delivers to B and publishes, Redis pushes to WS3. That’s fine for a while.

- Later the Balancer regroups them on one server, and Redis is out of the path again.

Keys: ← → to step · link to a step with #fig-8h/step-3

[caption] Fig 8·hTime runs down. The lanes are one organisation’s users, the Balancer, three edge servers and the Redis Pub/Sub. Red is the failure, blue the WebSocket connections and the message. New figure, built from the class board at 02:16–02:18.

So WebSockets scale without hiccups. A real-time Pub/Sub, like Redis and not Kafka, removes the overhead of maintaining extra TCP connections, and one service hands out the WebSocket server IPs so as to minimise the IO that has to happen over Redis. Be protective of that IO.

[summary] Build it: Redis Pub/Sub skip if you have used it

Write a hello world with Redis Pub/Sub; the class highly recommends it. It only takes a small Redis server running locally and three clients connected to it to see how it behaves, including that a client that isn’t connected misses the message.

[summary] How Slack actually does it skip unless you want the production version

The instructor built this design himself and says this is exactly how people build and scale WebSockets. Slack’s published architecture differs in detail. Stateful, in-memory Channel Servers own channels through consistent hashing, about 16 million channels per host at peak, and Gateway Servers hold users’ WebSocket subscriptions and subscribe to those Channel Servers. The client first gets its token and connection details from the web app backend, then opens a WebSocket to the nearest edge region, where an Envoy proxy forwards it to a Gateway Server, which loads the user’s channels and subscribes to them. Slack reports delivering messages across the world in 500 ms. slack.engineering ↗ coming later · Lecture 09: consistent hashing

### A tempting idea: a routing service #

Suggested in class: a separate service that tells each WebSocket server which client to send each message to. Making a call to that service every time, to find where a message goes, is far too expensive, and then it is not real time any more.

What if that service cached the users’ data? Still slow: it is still a network call every time just to find where to send. It depends; you could build it that way, or even call the database. But for real-time communication the instructor would keep the system very simple and store this routing information on the edge server itself. Adding a service for the sake of it, just to tell you where to forward a message, is overkill when the edge server can hold that information.

That is the method of the whole chapter. Work on the fundamentals: when you hit a problem or a roadblock, find the simplest solution for it. As soon as you add complexity, your system will not scale at all. Keep things simple.

The pieces exist. Chapter 9 puts them on one page, from the browser’s single socket to the database.

### Check yourself #

Answer in your head, or out loud, before opening each one.

With a 4-connection server linked to 3 peers, how many connections serve users, and why is that the mesh’s real cost?

[summary] Show answer

Four of its seven connections serve users; three only talk to other servers. A WebSocket server’s job is to serve users, and every server in a mesh must hold a persistent link to every other one, so the more servers you add, the more of each server’s limited connections go to its peers. Latency and a server going down are not the problem: the first is still real time, the second is fault tolerance.

Why must the inter-server Pub/Sub be real time, and what does a server miss if it is briefly disconnected?

[summary] Show answer

The path between edge servers carries live messages, and Kafka would slow it down: consumers pull from it and it keeps history the path doesn’t need. A real-time Pub/Sub such as Redis pushes each message to everyone subscribed right now and stores nothing. So a server that isn’t connected when a message is published never gets that message: delivery is at most once.

What does the Balancer optimise, and what happens to an organisation’s messages right after a server dies?

[summary] Show answer

It hands out edge servers so that as few messages as possible go through Redis, ideally putting a whole organisation on one server, where messages never touch Redis. When that server dies, its users ask the Balancer again and may be spread over several servers; until the Balancer regroups them, their messages travel through Redis, which is perfectly fine.

Concepts in this section: connection limit · membership on the edge · one TCP link · mesh overhead · real-time Pub/Sub · Redis vs Kafka · Redis channels · the Balancer

Contents of this lecture ↑

Lecture 04, chapter 8 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 9-the-whole-system ===

# Slack in real time, chapter 9: The whole system

Lecture 04 · Slack in real time · chapter 9 of 10

§ 9

## The whole system

One WebSocket per product, the overall architecture, what happens when a real-time message is lost, how exposed the edge servers can be, and how a write survives a dead node.

About 30 min · class 02:19–02:30, Q&A 02:31–02:45, 03:02–03:06, 03:09

Put it together. A user opens Slack in a browser tab. Messages arrive, a badge counts the unread ones, someone starts typing in #general. What does the browser hold open to make all of that live, and which box on the board does what? This chapter draws the whole system on one page, then answers the questions the class asked once it was drawn: what if a real-time message is lost, is it safe to put the edge servers on the internet, and what happens to a message when a database node dies mid-write.

§ 9.1

## One WebSocket per product

Every real-time feature shares one socket, and the fleet that holds those sockets gets a name.

About 7 min · class 02:20–02:25, Q&A 03:09–03:10

A page with a live chat, a notifications badge and a typing indicator: one socket, or three?

The key element of any real-time communication is a socket, a persistent connection, and for text that means WebSockets. The class’s recap put the design decision in one sentence on the board: “Every user will have 1 websocket connection open with our backend infrastructure and that will be used for anything and everything realtime.”

[figure title] One user, one WebSocket

[figure description] Each user keeps one WebSocket open to the backend for everything real-time.

[figure labels] WS · persistent TCP · our infra · 1 websocket for anything · and everything realtime · one user, one socket

[figure title] A fleet of edge servers

[figure description] Those connections land on a fleet of edge servers, and every real-time service, chat or notifications, goes through them.

[figure labels] WS · edge servers · chat, notifications, … · all go through here · a fleet of edge servers

[caption] Fig 9·aLeft: one user, one WebSocket to the backend, a persistent TCP connection that carries everything real-time. Right: those connections land on a fleet of edge servers, and every real-time service goes through them. Redrawn from the class board at 02:20–02:24.

The class gave that fleet a name. The servers every user connects to over a WebSocket are the edge servers: a fancy name, a persona for the servers everyone talks to. (Not a CDN edge; 7.4 made the same point.) Any service that wants to talk to users in real time, chat, notifications or anything else, sends its information through these edge servers.

Why one connection and not one per feature? The reason given in class was a client-side limit. Clients, browsers and Android apps alike, cap how many concurrent TCP connections they open to one backend domain: from a browser, at most six. That figure is the HTTP/1.1 limit per host; over HTTP/2 all of a page’s requests share one multiplexed connection. RFC 9113 ↗ Browsers enforce the limit, the class said, so that people don’t abuse it: without it “you could easily do a DDoS”. The cap is mainly there to be gentle with servers and the network, though, rather than as a DDoS defence. RFC 9112 §9.4 ↗ The class put the number at six or eight: six for Chrome, eight for Firefox.

The argument then ran like this. A WebSocket is a persistent TCP connection, so it permanently takes one of those six, leaving five for every REST call and for loading images, videos and the rest. Take a page with 100 images of the same size. With no WebSocket open, the browser loads six at a time; with one WebSocket, five at a time; with two, four. Each extra WebSocket cuts how fast the page can talk to the backend. And even if the page fires 100 HTTP requests in parallel, the browser sends six, then the next six, and so on. That holds over HTTP/1.1; over HTTP/2 the browser sends them all at once as streams on one connection, up to the server’s advertised limit on concurrent streams. RFC 9113 ↗

More precisely

Chrome and Firefox both allow 6 concurrent HTTP/1.1 connections per host; Firefox’s max-persistent-connections-per-server is 6, not 8. Firefox prefs ↗ WebSockets are counted in a separate pool, 255 per host in Chrome (“WebSocket connections are long-lived, and should be treated differently”) and 200 in Firefox, so an open WebSocket does not take one of the six and does not slow image loading. Over HTTP/2 all requests share one multiplexed connection anyway. RFC 9113 ↗ One WebSocket per product is still the right advice, for other reasons: every extra socket is another long-lived connection the server must hold, and another reconnect the client must handle.

chromium.googlesource.com ↗

So the rule stands, with the reason in the note above: every good product has just one WebSocket connection, and anything and everything real-time goes through it. You can have many; it isn’t recommended. On Instagram, to take the lecture’s illustration, the live chat messages and the heart animation in a live video would all go over that same WebSocket connection. Creating a separate WebSocket for every real-time feature is, in the class’s words, “the worst way to build a system”: as taught, it cuts how many API calls the browser can make in parallel and slows down the product. The note above explains why that particular harm doesn’t hold; the cost on the server and in reconnect handling does.

Asked in class: is the limit per tab, or per domain? It is per host name, the full domain including sub-domains, so chat.google.com, Gmail and Meet each get their own six connections. The limits belong to the browser rather than to a tab, so tabs open to the same host share them.

§ 9.2

## The overall architecture

The final board page: real-time over the edge servers, history over plain APIs, one partitioned database.

About 5 min · class 02:24–02:30

This is the last diagram the class drew. The overall architecture has three kinds of thing: normal API servers, the partitioned database, and clients holding WebSocket connections to edge servers. Between the edge servers sits the real-time Pub/Sub from chapter 8 (8.4), and beside them the Balancer that tells each client where to connect (8.6).

[figure title] The overall architecture

[figure description] Users hold one WebSocket each to the edge servers, which share messages through a clustered Redis Pub/Sub and hand them to Kafka; workers pull from Kafka and write them to a partitioned messages database. A separate load balancer and API servers handle non-real-time requests such as scrolling a channel. A Balancer tells each client which edge server to use. One message from A: 1, the edge server persists it in Kafka; 2, finds B in its local pool; 3, sends it to B.

[figure labels] overall architecture · balancer · A · WS · B · 3 · send to B · C · (membership) · 2 · find B in the · local pool · edge servers · redis pub/sub · [clustered] · tcp · edge servers · D · E · 1 · persist in kafka · kafka · worker · worker · worker · pull · messaging service workers · messages db (partitioned) · lb · api servers · ×3 · non-realtime API · · channel scroll · · muted channels

[caption] Fig 9·bThe overall architecture. Users hold one WebSocket each to the edge servers, which keep their users' channel membership and share messages through a clustered Redis Pub/Sub. The edge server hands each message to Kafka; workers pull and write it to the partitioned messages database. User C's non-real-time requests, the channel scroll and muted channels, go through a load balancer to the API servers, which read the same database. Circled numbers follow one message from A to B. Redrawn from the class board at 02:25–02:30.

Follow one message. With persistence level 2, where asynchronous persistence is acceptable as in a WhatsApp-like app, it travels over the WebSocket to an edge server and into Kafka; consumers persist it in the database asynchronously, and the message also goes straight to the other connected users. The board’s recap lists what the edge server does when A sends to B: “1. Persist message in Kafka 2. Find B in the local pool 3. Send message to B.” For Slack, the message would go the way of 7.3 instead, persisted synchronously first and only then handed to the edge servers for the other users.

There is a clear split. A normal messaging service handles HTTP requests: loading a channel’s messages, scrolling back through history, and on the board, “unimportant messages that are loaded when channel is clicked, eg: Muted channels”, in short “anything related to messaging that is NOT ‘pushed’”. Everything real-time happens over the WebSocket. Behind the API box is the schema from chapter 6, and its first insight still carries the design: a DM is just a channel with two people. The channel row has a small type field so the UI can render a DM as a DM, and messages only ever reference a channel (6.4).

### Why Kafka, when Slack was drawn synchronous? #

Chapter 7 drew Slack with synchronous persistence, type ①, and that is the instructor’s preference here. This diagram uses Kafka, type ②, on purpose. The asynchronous Kafka route is possible for Slack too: any implementation is possible, depending on the guarantees. The lecture deliberately keeps its designs conflicting and never converges on one, so that you think about every single decision you take. There is no one way to build it. Whatever guarantees you have, you build it that way.

The rule for this whole chapter

This architecture covers almost every messaging system: change only the guarantees.

Asynchronous persistence, a storage layer, a partitioned database and a real-time Pub/Sub between the edge servers. For Slack, WhatsApp or Zoom chat, swap the persistence path and keep the rest.

[figure title] Swap the persistence path, keep the rest

[figure description] The overall diagram in miniature: a user, an edge server, the real-time Pub/Sub and the database. The persistence path between the edge server and the database is a dial with three positions, one synchronous, two asynchronous, three none, set here to two. Swap the path and keep the rest.

[figure labels] swap the path, keep the rest · A · edge · 1 · 2 · 3 · db · ① sync · ② async · ③ none

That is how to design an architecture that covers almost all types of messaging systems. Change the guarantees, for WhatsApp or for Zoom, and everything else stays the same. It is the promise from the start of the lecture made concrete: in this one design you can switch from one message delivery model to another, and get something like WhatsApp, something like Slack or something like Zoom chat. Once Slack is done, the others are a piece of cake.

§ 9.3

## When a real-time message is lost

Persistence is guaranteed; the real-time push is not. What the client does about it.

About 4 min · class 02:25–02:30, Q&A 02:42–02:43

Redis Pub/Sub keeps nothing. What if a push doesn’t arrive?

Start with what is promised. The board wrote it under the Kafka path as an insight: “Messages once sent will always be persisted, there will not be any DB level runtime exception like Unique Key failed, etc.” One practical detail keeps that true. A Kafka consumer can see a record twice: if it crashes after processing a batch but before saving its offset, its replacement reads them again. Writing each message keyed by its unique message id turns that redelivery into a harmless overwrite. kafka.apache.org ↗

The real-time half has no such promise. Redis Pub/Sub gives no persistence (8.4): only the servers connected at that moment receive a message, so there is a chance that a message is lost and not delivered in real time.

Asked in class: so in this system the message is guaranteed to be persisted, but the notification to the other users isn’t? Correct. The message might get lost while Redis passes it to an edge server, and the user sees it when they refresh. For an enterprise application, guaranteed persistence is the part that matters more.

WS2 blinked for one second while A posted. When does E see the message?

[caption] Clip 9·1The message is stored through Kafka, but Redis pushes it while WS2 is disconnected and keeps nothing; E's client fetches the last 50 on a timer and the message appears.

[summary] The clip as text 0:34

- A posts in C1. E is on WS2, across Redis.

- The message is persisted through Kafka, as always.

- WS2 is disconnected right then: Redis pushes to no one, keeps nothing.

- WS2 is back, but nothing replays. E doesn't see it.

- On a timer, E's client fetches the last 50 and renders what it missed.

- Persistence is guaranteed. The real-time push is not.

User A posts 'standup in 5' in channel c1 on edge server ws1; user E is on edge server ws2, across a Redis Pub/Sub. The message is persisted as always: ws1 puts it in Kafka, a worker pulls it and saves it in the database. At the moment ws1 publishes it to Redis, ws2's connection to Redis is broken, so Redis pushes it to no one and, keeping nothing, loses it. ws2 reconnects but nothing is replayed, so E's screen is missing the message. Then a timer on E's client fires, a correction job: it fetches the channel's last 50 messages from the API, which reads the database, and the missing message appears. Persistence is guaranteed; the real-time push is not.

A message that wasn’t delivered in real time can’t simply stay missing. The board’s answer is the channel scroll API, the REST one: when the user clicks the channel, the client loads its messages through it, and the missing message is there. For a transient problem, when sockets drop for a moment, the board lists two fixes: “1. Remember we have correction job! … 2. Buffer the messages in another kafka and when sockets are back up, we replay them.”

The correction job can be small. Run periodic background refreshes of the Slack channel: a little JavaScript thread on the client that every so often fetches the channel’s last 50 messages, checks whether any were missed, and renders them, mimicking the notification the user never got. You may have seen WhatsApp say “checking for new messages”. In the lecture’s reading, that is this pattern: a new WebSocket connection was just established, and the client is asking the backend whether there is anything to fetch.

[summary] Build it: three clients skip if you’ve used Redis Pub/Sub

To understand Redis Pub/Sub, write a small hello world. Spin up a small Redis server locally, connect three clients to it, and see how it functions. Then disconnect one, publish, and reconnect it: the message never arrives, because there was nothing to replay.

# clients 1 and 2, one terminal each redis-cli SUBSCRIBE c1 # client 3 redis-cli PUBLISH c1 "standup in 5"

§ 9.4

## Exposing the edge servers

Public IPs or a load balancer, what may live on an exposed box, and why the client's channel list can't be trusted.

About 9 min · class Q&A 02:31–02:45

Asked in class: what exactly is an edge server, and is it okay to hand its IP address to clients?

Edge servers are normal WebSocket servers: a Node.js process running Socket.IO, for example. That’s it.

Can clients connect to their IPs directly? There are multiple ways to do it. A lot of people expose edge servers over the internet, and in the class’s view there is no harm in that; you can also put them behind a load balancer. This lecture’s case study does the second: Slack terminates its WebSocket connections on proxies in several regions close to users, first HAProxy and now Envoy, and forwards them to its backend WebSocket services. slack.engineering ↗

[summary] From practice: the interviewer skip unless an interviewer said so

An interviewer once told a learner that exposing server IPs invites misuse. The instructor’s view was blunt: interviews don’t know real-world systems, big companies publicly expose the IP addresses of their edge servers, and there is nothing wrong with this architecture. That is the lecture’s opinion. Exposing edge servers directly is a legitimate option, but it doesn’t describe the case study, since Slack puts Envoy proxies in front of its WebSocket servers, and the interviewer’s concern is a fair trade-off to talk through.

A load balancer adds a hop. In the instructor’s experience every relay hop adds about three to five milliseconds, so for ultra-low-latency real-time communication, such as streaming a live class, he exposes the IP addresses directly; elsewhere a load balancer is fine. Behind a load balancer, WebSocket connections are always sticky: one connection from the user to the load balancer, and another from the load balancer to a WebSocket server. That is how a proxy that terminates the connection works, Envoy or an L7 balancer. An L4 balancer such as AWS NLB instead forwards the flow: “each individual TCP connection is routed to a single target for the life of the connection”, so the WebSocket stays pinned to one server without being terminated at the balancer. docs.aws.amazon.com ↗

An edge server exposed on the internet faces a ton of security threats, so it is hardened and goes through a very high security review: you change the route tables, hide all the ports, prevent SSH and block a lot of things on the machine. And one rule is fixed: whenever a server is exposed on the internet, you don’t put any credentials on it. The edge server has zero database credentials, never talks to the database directly and has no idea what the database is. The instructor never connected his edge servers to a database, and kept this design that way knowing someone would ask. The only thing it holds is something safe to push with, a Kafka connection string. If the server is compromised, all you lose is that string, and the Kafka is internal to the infrastructure, so no one outside can talk to it.

[figure title] Exposed: the edge server faces the internet

[figure description] An exposed edge server faces the internet directly. It is hardened, ports hidden and SSH blocked, and holds only a write-only Kafka credential; database credentials never sit on it.

[figure labels] public = unsafe? · WS · edge server · kafka: write-only · db creds · never here · hardened: ports hidden, no SSH · exposed

[figure title] Behind a load balancer, with a membership check

[figure description] Behind a load balancer the edge server costs a few milliseconds more per hop, the WebSocket stays sticky, and the private edge server can safely ask a membership API, backed by the database, before serving private channels.

[figure labels] lb · edge server · kafka: write-only · +3–5 ms per hop · (instructor’s estimate) · sticky: one connection to the lb, · one to the server · membership api · db · private channels: check membership here · behind a load balancer

[caption] Fig 9·cTwo ways in. Left: the edge server faces the internet directly, hardened, with a write-only Kafka credential and never a database one. Right: behind a load balancer, a few milliseconds more per hop and a sticky connection; as a private server it can ask a membership API before serving a private channel.

Asked again later: why is it fine to keep the edge servers public? Because there is no sensitive information on them: a route from the Balancer service that hands out IP addresses, a bunch of TCP connections, and one Kafka connection string that, as the class put it, holds no secret and only pushes messages.

More precisely

A Kafka credential is still a secret: a compromised edge server can reach the internal Kafka and inject messages that consumers trust and persist. Kafka can authenticate clients (SSL or SASL) and authorise reads and writes per client, so give the edge a least-privilege credential, for example write-only to one topic, and have the consumers validate what they read. Losing it is far less damaging than losing database credentials.

kafka.apache.org ↗

With nothing critical on the server, the worst an attacker can do is a DDoS. All they get is one machine that tells them the IP addresses of the edge servers, and a simple rate limiter can prevent a DDoS.

More precisely

With nothing sensitive on the edge server, DDoS is indeed the main risk, but a rate limiter handles only some request floods. The most common attacks, UDP reflection and SYN floods, are infrastructure-layer floods. Mitigating them takes network capacity that scales faster than the attack, to absorb or filter it upstream, which an application rate limiter cannot provide.

docs.aws.amazon.com ↗

So there is no rule that a WebSocket server must always sit behind a load balancer. If you can ensure the security of a publicly exposed server, you are fine. There are hundreds of ways to build a system: know which guarantees you are providing, and keep it simple. Put as a trade-off: a public edge server can be attacked, and a load balancer in front of it adds one more hop, about five milliseconds of extra latency by the instructor’s estimate. If that latency is acceptable, use the load balancer; if not, keep it public. Both are fine.

Exposing the edge servers directly or putting them behind a load balancer

|

| Expose the edge

| Behind a load balancer

| Latency

| No extra hop

| One more hop: about 3–5 ms, by the instructor’s estimate

| Attack surface

| Open to the internet: harden it, keep no secrets on it

| Only the load balancer faces the internet

| What must be true

| Nothing sensitive on the box; at most a write-only Kafka credential

| The edge server can be private and call internal APIs

| Stickiness

| One connection, client to server

| Always sticky: the connection stays on one server

| Who uses it

| Ultra-low latency, such as a live class; many companies, in the class’s view

| Most other places; Slack fronts its WebSocket servers with Envoy

Pause and think

Each edge server learns a user's channels from what the client sends after connecting. Private channels now exist. Is the client's list good enough to decide who receives a private channel's messages?

No. A malicious user can claim membership of a channel they’re not in and receive its messages. The instructor built the design this way on purpose to provoke the question, and the flaw is broken access control (the note below). Relying on the client is fine while membership isn’t sensitive. When it is, as with private channels, the edge server checks membership with a backend API (or the database), which means putting it behind a load balancer as a private server rather than a public one.

### Trusting the client’s membership #

In 8.5 each edge server learned which Slack channels its users are in from the users themselves. Since that membership information comes from the end users, the question followed: how do you deal with bad actors, for example once private channels are introduced?

If the edge servers trust the client’s membership claims, a user can falsely claim “I am part of this channel. Give me all the messages.” and start receiving messages they should never see. The instructor called this a man-in-the-middle attack, and said he had designed it this way on purpose, to provoke exactly these questions.

More precisely

A user claiming a channel they are not in is an authorisation flaw, broken access control (A01 in OWASP’s 2021 list and in the current 2025 list ↗), not a man-in-the-middle attack, which intercepts traffic between two parties. The baseline is “except for public resources, deny by default”: check membership on the server side.

owasp.org ↗

Relying on the client to report membership is one way, not the only way. Another is for the edge server itself to call the backend API periodically and pull which of its connected users are in which channels. That can’t be done from a publicly exposed server; it can if the server is private. So if membership is critical, as with private channels, don’t trust the client. Rely on a backend API call for membership: make the edge server private, put it behind a load balancer, and let it talk to the database or call an API for channel information. Panel b of Fig 9·c draws that row.

§ 9.5

## Durability, and a shared database

Who replicates a message, when a write counts as accepted, and why the workers and the API servers can share one database.

About 5 min · class Q&A 03:02–03:06

A database node dies in the middle of a write. Is the message gone?

Asked in class, assuming the message store had master-slave replication: where is replication? This store is just sharded. You can have replicas if you want, but a typical sharded setup works, and the instructor saw no need for replication there. The follow-up changed the answer. To avoid losing a write when a node dies mid-write, important data is stored with standby nodes and a replication factor of three: each write goes to three data nodes, so if one goes down, the others serve the data. DynamoDB does exactly this internally.

Reading Kafka again is not the way back. Once the workers have processed the messages, you can’t recover a lost write by reading from Kafka: those messages are already processed.

More precisely

Kafka does not delete events when they are consumed. A topic keeps them for its retention period, and they can be read as often as needed, so a consumer can rewind and reprocess. The real point stands: the durability of the write should come from the database’s own replication, not from re-reading Kafka.

kafka.apache.org ↗

A tempting idea, suggested in class: let the workers push each message to two or three database instances across regions. That is worse. The worker doesn’t do that; the database’s storage engine does. A write comes to one data node, which replicates it to two others, so if one node goes down, another serves the data.

[figure title] Ack after replication

[figure description] The worker writes message m42 to one node. Nodes 2 and 3 copy it from node 1. Only then does node 1 acknowledge the write to the worker. A write lost before that point was never accepted, and the worker still holds the message until the commit.

[figure labels] worker · 1 · write m42 · ack ✓ · 3 · node 1 · 2 · copy · node 2 · node 3 · holds the message · until the commit · replication factor 3 · never says “done” before the copies · DynamoDB: 2 of 3, see the note below

[caption] Fig 9·dAck after replication. The worker writes to one node, nodes 2 and 3 copy it, and only then is the write acknowledged to the worker. A write lost before that point was never accepted. The note below gives DynamoDB's actual rule, two of three.

A replicated database never acknowledges, never commits, a write until it has been written in three different places. In the class’s words, “your DB would never say that I am done unless it is written in three different places”. A write lost before replication was simply never accepted. When you write to DynamoDB, it is written internally to three storage nodes, and only after all three complete does it say the write is complete.

More precisely

A synchronously replicated database acknowledges a write once the configured replicas, often a majority quorum, have persisted it. DynamoDB keeps three replicas of each partition in different Availability Zones and acknowledges when two of the three have the log record. Asynchronous replication, PostgreSQL’s default, acknowledges earlier and can lose recent writes on failover. postgresql.org ↗ The core lesson stands: the storage engine replicates, not the workers.

usenix.org (DynamoDB, ATC '22) ↗

Also suggested in class: the worker holds the message until the database commits it, retries otherwise, and if the worker goes down, the message is reprocessed. The instructor confirmed only one part of that, that the database acknowledges the write to the worker.

### One database for workers and API servers #

In Fig 9·b the workers write to the same database the API servers read from. Is sharing a database a problem? No, sharing a database is perfectly fine. Making the workers call the API so that the API writes to the database adds an unnecessary network call and needless complication.

The instructor dislikes the anti-pattern in which every microservice needs its own database. He puts performance and cost efficiency first and is happy to share a database. That is the lecture’s opinion. The pattern’s catalogue lists what each side buys: a database per service means one service’s schema changes don’t affect the others and each service can pick the store that suits it, while a shared database brings schema-change coordination and services interfering with each other at runtime. microservices.io ↗ microservices.io ↗ Business and product come first and engineering second: do whatever keeps cost down and gets maximum performance, because the business is what keeps engineers employed.

[summary] Further viewing skip unless you are deciding this now

The instructor’s YouTube series on microservices (17 or 18 videos) covers shared versus separate databases as a pattern, with its advantages and disadvantages. Two of the videos are on this topic.

The pieces are all on the board. Two features the class asked about, deleting a message and putting messages in order, need no new boxes, and that is chapter 10.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Does an open WebSocket slow down a page's image loading? What did the class say, and what is actually true?

[summary] Show answer

The class said yes: a WebSocket takes one of the browser’s six connections per domain, so images load five at a time instead of six. In fact browsers count WebSockets in a separate pool (255 per host in Chrome, 200 in Firefox), so an open WebSocket doesn’t take one of the six, and over HTTP/2 all requests share one connection anyway. One WebSocket per product is still right: each extra socket is another long-lived connection for the server and another reconnect for the client.

What is on an exposed edge server, and what must never be?

[summary] Show answer

A route from the Balancer, a bunch of TCP connections and one Kafka connection string to push messages with, ideally a least-privilege, write-only credential. Never database credentials: the edge server never talks to the database and doesn’t know what it is. The machine itself is hardened, with ports hidden and SSH blocked.

Who should replicate a message for durability, the worker or the database, and when is the write acknowledged?

[summary] Show answer

The database’s storage engine: the write goes to one node, which replicates it to the others. Workers writing to several instances themselves is worse. The write is acknowledged only once it is on the required replicas; the class said all three, and DynamoDB in fact acknowledges at two of three. A write lost before that was never accepted.

Concepts in this section: one WebSocket · edge servers · overall architecture · change only the guarantees · lost real-time messages · exposing the edge · server-side membership · replication factor 3

Contents of this lecture ↑

Lecture 04, chapter 9 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 10-deleting-and-ordering ===

# Slack in real time, chapter 10: Deleting, ordering, and what to keep

Lecture 04 · Slack in real time · chapter 10 of 10

§ 10

## Deleting, ordering, and what to keep

Two follow-up features answered with the same blocks, deleting a message and putting messages in order, then the habits to keep and where this lecture stops.

About 15 min · class Q&A 02:50–03:02, 02:30–02:31, 02:47–02:48, 03:06–03:14

A user deletes a message they regret. Another user sees two messages in the wrong order. Does the design of chapter 9 need new machinery for either? Both questions came up in the class’s late Q&A, and both are answered with the blocks already on the board.

§ 10.1

## Deleting a message

Where the message lives decides how it is deleted.

About 4 min · class Q&A 02:50–02:54

Asked in class: shouldn’t deletion be synchronous with both flows, the real-time one and the refresh, so that nobody sees a deletion notification and then sees the message again after a refresh? The instructor’s first answer was a question: do you really get a deletion notification at all?

Start from where the messages live. WhatsApp, as the class put it, does not store anything. More exactly, WhatsApp deletes a message from its servers once it is delivered; an undelivered message is held encrypted for up to 30 days while delivery is retried. whatsapp.com ↗ So WhatsApp-style deletion is just one more message, “delete this message permanently”, and each side deletes it from the user’s local storage. Slack-style deletion deletes the message in the backend store and tells the users it is deleted; to communicate that in real time, you also notify them that it is now gone.

[figure title] WhatsApp-style delete

[figure description] Where the copies live on the devices, deleting is an event: a delete-permanently message goes from one phone through the edge server to the other, and both phones drop their own copy.

[figure labels] standup · in 5 · standup · in 5 · edge · delete · permanently · the copies live on the devices · WhatsApp-style

[figure title] Slack-style delete

[figure description] Where messages live in the backend, the stored row is deleted first, then a deleted notification goes out over the edge server to every user in real time.

[figure labels] messages · m42 standup in 5 · api · edge · B · C · ✓ · ✓ · deleted: m42 · delete in the store, then tell · everyone in real time · Slack-style

[caption] Fig 10·aTwo ways to delete. Left: the copies live on the devices, so a delete event goes from one phone to the other and each drops its own copy. Right: the message lives in the backend, so the stored row is deleted and then everyone is told in real time over the edge servers.

The same blocks answer any question of this kind: depending on the guarantees, you alter the approach.

Asked in class: if it is that easy, why did WhatsApp take so long to ship deletion? Because doing it at WhatsApp’s scale is humongous. There is the hierarchy, deciding whether it is needed at all and how best to do it, the product decisions and a staggered rollout, all between a product manager’s idea and the implementation. If the requirements are known and the system follows this architecture, deletion is a small change. The instructor’s estimate: about 100–200 lines, at most 200–300 lines of backend code, one event stored and one notification sent.

[summary] From the instructor: 3.5 months skip unless you’re estimating one

Even after doing the whole analysis on this page, it took the instructor’s team of three engineers three and a half months to build a real-time text chat system. Small changes on a known architecture are cheap; the first build takes time.

[summary] Build it: delete skip if you’ve built a chat

Work with WebSockets yourself and mimic a “message deleted” flow: send the event, and watch the message disappear in the UI on the other client.

§ 10.2

## Who said messages arrive in order?

Show messages as they arrive, let the database's order win, and don't re-architect for an edge case.

About 8 min · class Q&A 02:54–03:02

Asked in class: chat needs exactly-once delivery and strict ordering, doesn’t it?

The answer opened with a question back: why add exactly-once semantics at all? Nobody said it is required here. Nor does anyone say messages must arrive on screen strictly in order. The front end can insert a message in the middle; what’s the problem? Ordering matters where messages are processed one after another.

Two cases. Case 1: A sends message 1 and then message 2, and message 2 reaches B first. Render them in the order they arrive. On refresh the order gets fixed, because the order in which messages are stored in the database is the source of truth. Case 2: keep the front-end state, a React array for example, ordered by timestamp. When an older message arrives late, insert it in the middle of the array instead of appending it at the end, and accept a brief flicker if that is okay for the user experience.

[figure title] Two out-of-order cases

[figure description] Lanes for user A, the database and B's screen; time runs down. 1: A sends message 1 then message 2; the database stores them in that order by its own clock, t1 before t2. 2: case 1, message 2 reaches B first and the screen shows them as they arrive. 3: a refresh, or a job that fetches the last 50, reloads them in the database's order. 4: case 2, B keeps its list sorted by timestamp and message 2 arrives first. 5: message 1 arrives late and is inserted in place above 2, with a brief flicker. 6: the order is the database's insertion time, never the client's clock.

[figure labels] A · database · B’s screen · time · 1 · m1 hey · m2 standup in 5 · m1 t1 · m2 t2 · t1 < t2 (db clock) · 2 · case 1 · m2 · m1 · m2 · m1 · shown as they arrive · 3 · refresh · last 50 · m1 · m2 · 4 · case 2 · m2 · m2 · list sorted by timestamp · 5 · m1 late · m1 · m2 · flicker · 6 · 01-01-1970 · never trust the client’s clock · the database’s order is the truth

- A sends 1 then 2. The database stores them in that order, by its own clock: t1 < t2.

- Case 1: message 2 arrives first. Show them in the order they arrive.

- A refresh, or a job that fetches the last 50, puts them in the database’s order.

- Case 2: keep the screen’s list ordered by timestamp. Message 2 arrives first.

- Message 1 arrives late and is inserted in place, above 2, with a brief flicker.

- The order is the database’s insertion time, never a client clock.

Keys: ← → to step · link to a step with #fig-10b/step-3

[caption] Fig 10·bTime runs down. Lanes are user A, the database and B's screen. Messages m1 “hey” and m2 “standup in 5”; t1 and t2 are the database's insertion times.

[summary] From practice: reshuffled messages skip unless you’ve seen this

One learner noticed that on Microsoft Teams the receiver sometimes gets missing, duplicate or out-of-order messages, which later reshuffle themselves into order.

This architecture can explain the duplicates. A system may broadcast to the receiver first and persist later, or it may retry on the WebSocket server when it thinks a message was not delivered although it actually was. In this lecture’s design the message is stored first, and only once storage is certain is the other user told the message exists. Order then fixes itself in one of two ways: on a page refresh, which calls the source-of-truth API, or with a background job. For example, every minute, call the actual HTTP backend for the last 50 messages, check they are all on the screen, and reorder if needed.

### Which clock? #

Asked in class: which parameter decides the order the messages are stored in?

Pause and think

To put a channel's messages in order, should each message carry the sender's device timestamp?

No. A client can set its clock to anything (“I can just change my clock to 1 January 1970”), and real messages are never sent at exactly the same instant anyway. The database’s insertion order is the truth: if latency shows a later message first, a refresh or a background job puts it right. Vector clocks with CRDTs are the heavy way to true ordering, and they cost more than the edge case is worth.

It is always the database insertion time, by whatever clock the database has at the moment of the insert. Slack’s own API has the same shape: a message’s ts value is essentially its ID and is guaranteed unique within a channel or conversation, giving one server-assigned order per channel. docs.slack.dev ↗

A tempting idea, suggested in class: order the messages by a timestamp sent from the client. Why would you send timestamps from the client? You should never rely on them when processing messages in the database, because a user can just change their clock, to 1 January 1970 if they like. Whatever time is on the database is the source of truth. Nor do you need the client’s precision. Messages like “hey”, “hi”, “hello” are never sent at exactly the same time from one client: typing and sending always leave some gap. If network latency makes a later message arrive first, that is fine. Whatever order the database received is the source of truth.

Is there a way to true ordering? The overly complicated way: CRDTs to merge and resolve conflicts, and vector clocks on the client side, each client with its own vector clock persisted in the database. Even then, a vector clock gives only a partial, causal order. It can say that one message happened before another, or that two were concurrent, but it doesn’t order the concurrent ones by itself, so they still need a tie-break. wikipedia.org ↗ It isn’t worth it here. Maintaining vector clocks and doing the merges when you read slows down your entire system, and no one does that: you don’t re-architect a system for one edge case. Vector clocks are the answer if you truly need that guarantee, but a globally consistent vector clock per client is a massive problem; look up an implementation to see how complicated it gets.

The rule for this whole chapter

Design realistic systems.

Theoretically you can find a hundred loopholes in any design; practically there are a few, and it is okay to live with them. For each one, ask how likely it is and whether you really need it. If yes, implement it. Ordering is the example: take the database’s clock as the order, and let a refresh fix the rest.

[figure title] Design realistic systems

[figure description] A hand-ruled list headed 100 loopholes. Six of its eight lines are struck through; two keep a green tick. Ask how likely each case is and whether you need it.

[figure labels] 100 loopholes · ✓ · ✓ · how likely? · do you need it?

Think in realistic terms: do you really need it? If yes, then implement it.

§ 10.3

## What to keep

The habits that recurred, and where this lecture stops.

About 4 min · class 02:30–02:31, 02:47–02:48, 03:06–03:14

All these systems are interconnected. Make a few changes here and there and you get a brand-new system: one pattern fits everywhere.

So write the hello worlds of the WebSocket server, the Balancer and the real-time Pub/Sub. Don’t take this page at face value; implement everything, because the devil lies in the details. Every single thing you see in system design is implementable. The class closed on the same advice: implement everything as a small hello world, especially Redis Pub/Sub, where ten minutes of use shows you how it pushes and that it keeps nothing.

[summary] From the instructor: the happiest day skip unless you need the push

Building a load balancer is superbly simple. The instructor regularly hears from past learners, one of them the evening before this class, that they implemented their own load balancer and it was the happiest day of their lives.

### Ten lines to keep #

One line from each chapter, each linking back to where it was taught:

- Never believe a generic statement at face value, even from the teacher: demand that it be specific and contextual (§1.3).

- The more complex you make the queries, the less you can distribute the data (§2.3).

- Transactional use cases fit row-oriented storage; analytics, which picks a few columns out of many, fits column-oriented storage (§3.3).

- Whenever you need core graph algorithms, go for a graph database (§4.1).

- Very broadly: correctness and consistency out of the box, SQL; a high ingestion rate and sharding out of the box, NoSQL (§5.3).

- Name things as nouns, and piggyback on existing entities rather than writing ifs and elses (§6.5).

- Different guarantees, different architecture: what is a bad idea for Slack is fine for WhatsApp (§7.3).

- Start with the problem, solve it with basic fundamentals, then make it better (§8.2).

- One architecture covers almost every messaging system: change only the guarantees (§9.2).

- Design realistic systems: build a fix for a loophole only if it is likely and you need it (§10.2).

### Where this lecture stops #

Each of these was deferred in class:

- comes in Lecture 05 Next week is about distributed systems. On Saturday, how to approach distributed systems, with load balancers and a code walkthrough of one: Lecture 05. On Sunday, distributed ID generators, with pre-reads shared on the day of this class: Lecture 06.

- comes in Lectures 09 and 10 Today only scratched the surface of the non-relational families; each is used again later. Lecture 09 builds a Redis-like cache, and Lecture 10 builds storage from files and column formats.

- later in the course Live streaming, such as Hotstar, is very different from real-time text chat and out of scope here. A few bits and pieces of it come in week six or seven, past these ten sessions.

- not covered End-to-end encryption. Asked how group members’ public keys would be pushed from the database, the instructor said he has no experience with public-key encryption: he knows the Signal protocol a bit, and WhatsApp uses a variant of it, but he couldn’t say what information it needs. For the record, WhatsApp completed its rollout of the Signal Protocol, covering one-to-one and group chats, attachments, voice notes and calls, in April 2016. signal.org ↗

- not covered WebTransport. Raised in class as an upcoming alternative to WebSocket; the instructor hadn’t heard of it and said he would look into it. It sends data over HTTP/3 with multiple streams and unreliable, UDP-like datagrams, and MDN lists it as Baseline 2026, working across the latest major browsers since March 2026. developer.mozilla.org ↗

### Check yourself #

Answer in your head, or out loud, before opening each one.

How does deleting a message differ between a WhatsApp-like and a Slack-like design, and why?

[summary] Show answer

Where the copies live decides it. WhatsApp keeps no delivered messages on its servers, so deleting is an event, “delete this message permanently”, and each device drops its own copy. Slack keeps messages in the backend, so you delete the stored row and then notify the channel’s users in real time that it is gone.

Two messages reach B out of order. What does the UI do, and what fixes it for good?

[summary] Show answer

Either show them as they arrive, or keep the list sorted by timestamp and insert the late one in place, accepting a brief flicker. What fixes it for good is the database’s order: a refresh calls the source-of-truth API, or a background job fetches the last 50 messages every minute and reorders.

Why should message order come from the database's clock and not the client's?

[summary] Show answer

A client’s clock can be wrong, or deliberately set to 1 January 1970, so client timestamps can’t be trusted. The database’s insertion time is one clock for the whole channel, and whatever order the database received is the source of truth, even if latency showed a later message first.

Concepts in this section: two ways to delete · out-of-order messages · the database clock · design realistic systems · hello worlds

Contents of this lecture ↑

Lecture 04, chapter 10 · written from the class recording and board, with sources linked where a fact comes from outside the class.
