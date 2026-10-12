**[01:57:49] Teacher:** Yes, Rajiv.

> **Student Question [01:57:51] - Student 1 (Rajiv):** Arpit, that graph which you showed us, how did you come to know that the disk is throttling there?

**[01:57:59] Teacher (answer):** I happened to have Prometheus running at that point of time, which was exporting my node metrics into somewhere. I happened to have that happened. It was all luck. So what I saw was my disk IO. I was continuously monitoring my disk IO. Actually the node was monitoring it. I had those metrics being exported somewhere else. On, all that was done on my local machine, but I was capturing those metrics for some other thing. I was writing a Wikipedia. I was writing a search engine on Wikipedia. I wanted to capture a bunch of metrics and I happened to have node exporter running and it captured it. It showed my disk IO utilization, as part of my node exporter, you get this disk IO utilization metric. That's how I got to know. It was a hundred percent.

> **Student Question [01:58:42] - Student 1 (Rajiv):** That thing. Okay. One more thing that you told about this pagination logic works for all DB. You talked about B+ tree of MySQL or SQL based thing, but then when it comes to NoSQL part, primary key, reading is the same for both people.

**[01:59:03] Teacher (answer):** Depends on the storage engine. MongoDB, it works well. You saw it in MongoDB. MongoDB is a NoSQL data. Correct. Okay. Anyone that gives you sequential scanning, this would that the DynamoDB also, but if you're having completely decentralized hash based thing, then you cannot. If you're, if you have data locality, then you get this benefit. If your data is completely de localized, then you would never get this performance benefit.

[01:59:30] So understand how your database stores your data on the disk, which is why knowing database internals is essential for you to build performances. Otherwise you would have like, otherwise limit offset, everyone would have done. So how your database is actually storing the data, you can make those performance optimizations without having to worry about is this true or not? Because you know it is how it is stored. But MongoDB, it works.

[01:59:56] And just one more example to that. We saw in that graph that for smaller value, it is okay. Elasticsearch, Elasticsearch gives you two ways to [?paginate | asr: "page in it"], exact same thing. Elasticsearch is also NoSQL. It's also [?sharded | asr: "Charlotte"] partitioned work part. Elasticsearch puts a limit of 10,000 documents in a limit offset based pagination. You cannot go beyond 10,000. It's a hard-coded limit. Try spinning up Elasticsearch server. Try firing a query with offset, with skip. I'm not sure what they call it. I think they call it offset only. 10,000, more than 10,000. It gives you an error that you cannot go beyond this. Please use cursor API to go beyond this. Classic example where you are iterating through almost all the documents. They're more than 10,000. It's better to go for a cursor based approach versus going for a limit offset based approach. For smaller values, it does not matter, but as you go deeper, deeper, deeper, that's where these things starts to creep up. Okay. Yeah.

**[02:01:01] Student 5:** Yeah.

> **Student Question [02:01:02] - Student 5:** So what is counter here in this Snowflake approach in static counter?

**[02:01:06] Teacher (answer):** Atomically increment. Every time you generate ID.

**[02:01:10] Student 5:** Okay. Per server counter.

**[02:01:12] Teacher:** Per server.

**[02:01:13] Student 5:** Alright. Yeah.

**[02:01:15] Teacher:** Which is exactly why I stress so much in the first time when we're discussing this. It all comes together in all of these discussions. Yeah. Yeah.

> **Student Question [02:01:25] - Student 4:** I didn't understand like how in Discord, epoch is just a number, right? So even if we start from today's date, how is it like saving us? Okay.

**[02:01:37] Teacher (answer):** What is epoch? Let's say I'm starting with the current epoch. The current epoch is 1676784716. This is the current epoch second. If I add three zero, it becomes current epoch millisecond. This is the current epoch millisecond. If I start, if I'm starting my company at this moment, I'm losing out on this [unclear: "big operate"] because this is my first 41 bits of it. Right. So now because I have 41 bits only the maximum value that I can store in those 41 bits is. Correct. [?Two to the power 41 | asr: "No, do the power 41"]. It will get exhausted pretty quickly because now I'm not starting from zero. I'm starting from this one. Correct. I could have caught up that big of a range if I start from 0 from this moment and let my time move forward from here 1, 2, 3, 4, 5, 6, on and so forth.

**[02:02:41] Student 4:** Got it? So we are essentially subtracting the start time. [check: speaker boundary - "Got it?" may be the Teacher's]

**[02:02:46] Teacher:** So this way we get a massive range handy because the rate at which your time is moving forward is exactly the rate at which the time is moving forward. So this time and the actual time. So you get 35 years of time. If you start today, you get 45 years of time. Right. Right. So it would take more 45 years for you to exhaust that range of 41 [?bits | asr: "minutes"].

**[02:03:11] Student 2:** Right.

**[02:03:13] Teacher:** So you're just gaining that particular. Right. Okay. Okay.

<!-- topic-candidate [02:03:18]: Instagram IDs -->

[02:03:18] Now let's go into how Instagram does it. And this is why you should love early engineers, not current, early engineers of Instagram. You should like, they deserve to be millionaires, like multi-millionaires. They deserve. Look at this beautiful. When I first read that blog, I started cursing because this is such a brilliant piece of optimization. It just boggled my mind how someone having a deep knowledge of data, not really deep, someone having decent knowledge of database can do this much out of it.

[02:03:51] So what Instagram did is Instagram wanted to use Snowflake. But what they did is they did Snowflake while inserting in DB. So Twitter did Snowflake at API servers. Instagram does it over here. API server does not have Snowflake logic. Database has it. See the beauty of their implementation. So what Instagram needed? They wanted ID sortable by time. Same use case as Twitter. They wanted to process, find trending hashtags, push it to feeds of the users and whatnot. Like do processing on the recent item. So they needed ID sortable by time. 64 ID so that they are efficient on indexes. And they did not want to build a new service.

[02:04:39] Look carefully. How good companies, they are trying, continuously trying to not have microservices. We on the other hand are told to build microservices every now and then. That's why I always say good engineers never think in microservices. They think in problems and solutions. They did not go for a building microservice for every single thing out there. That's an overkill for most organizations.

[02:05:03] So they had these requirements. So what they went with, they tweaked Snowflake a bit. What they did, they put first 41 bits at epoch millisecond, but from 1st January 2011. So they get massive range to play with now. Then the next 13 bits is DB shard ID. Was already sharded, we'll talk about the sharding structure also in a couple of minutes. So what Snowflake for Twitter did, 41, 10 for machine ID and 12 for this. What Instagram did, 41 bits, 13 and 10. So 13 for DB shard ID and 10 is per shard sequence number, static counter, right? Okay.

<!-- topic-candidate [~02:05:42]: Logical shards and physical servers -->

[~02:05:42] Let's first go into and understand what logical shards and physical servers are for Instagram. So what we do is in- I hope you, like, it was shared in the period, but I hope you saw that video on sharding and partitioning that I put on my YouTube and shared in the readings. If not, do watch it. I'll give you a glimpse of it. So what Instagram does, Instagram uses, Instagram uses Postgres as a database, right? [unclear: "at 10"] what Instagram had is Instagram created bunch of logical shards also called as partitions and physical DB servers. Physical DB servers is actual physical servers on which your database is running. Right. Which means your MySQL servers that you are spinning up. Right. Within the MySQL server, you create database by firing create database command. Right. That create database is a logical partition. Right.

[02:06:36] So what you do is you create logical shard, which is thousands of them at max 2 raise to 13, which is 8192 at max. And you have fewer physical servers, let's say 10 or 15. So on each server, you create create database Instagram 1, create database Instagram 2, create database Instagram 3. Other server create database Instagram 2000, create database Instagram 5000. So creating multiple logical partitions in your database, every partition will have the exact same tables with the exact same schemas. So this is one database in which you have four tables. Database but different data, table same, schema same, data different. So this is logical partition, this is physical server, right?

[02:07:23] So MySQL server that you spin up is a physical server within which you, when you do create database, that is a logical partition. So when you run a migration to add a column, you have to run it on all the databases that you have, all the physical database servers against which all the logical databases that you have. When you do create database, we always when database and your company name, and you create users table, [unclear: "odd table"] and this. They do this multiple times, like 8,000 times. But advantage that they get because of this is that now they can take a dump of a database and put it into some other database. For example, let's say one of my database is hot. One of my databases is hot. It can literally, we'll go into this one more time in the fifth week, right? But I'm just giving you a glimpse on what this is all about. They can literally take this small database, logical partition, and move it over here. SQL dump commands, they do this, they dump it, and they load it in different place, right? This way they can balance.

[02:08:33] So for them, horizontally scaling a database is easy. They spin up a new physical server, take this logical partition, and move it there. Why is logical partition? Because now they can literally dump it very quickly and load it very quickly. If they were not having this logical partitions, they had to go through every single row and then extract the row that needs to be moved and then move it. Instead, they just create separate logical partitions, making their movement very easy. So this is what Instagram has as their structure. So they have 10 MySQL servers within each one of them, thousand, thousand, thousand MySQL databases, which is create database command that you fire, that are being created, which has logical partition and physical database server. Now this database shard ID that here we are talking about is this.
