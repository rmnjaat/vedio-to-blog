=== PAGE: lecture overview ===

Lecture 4 · two builds: what non-relational databases give up, then Slack’s real-time chat

# Slack in real time

Your team is about to store every message of a chat app, and someone in the design review says “Use NoSQL, it scales.” Learn what to ask back, family by family. Then put a message on the screen of every member of a Slack channel the moment it is sent, even when they sit on different servers, and keep it there after a refresh.

- Two builds, one story

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1“Use NoSQL. It scales.” What do you ask back?A slogan in a design review, the database it hides, why dropping relations lets data spread, and which consistency gets traded.4 sections · §1.1–1.4

- 2Get a value by its key, or ask inside it?Two families that differ in how you may touch the data, and how far that one restriction lets the data be split.4 sections · §2.1–2.4

- 3One average over 10,000 rows. How much does the disk read?One analytics query, two ways to lay the same table on disk, and why warehouses pick one and applications the other.4 sections · §3.1–3.4

- 4Who follows whom, and where would Slack keep its messages?A follow list, a cohort and a fraud check in 200 ms; then SQL or not, and the first Slack decision.5 sections · §4.1–4.5

- 5“Design Slack.” Where do you even start?Cut Slack down to real-time text chat and build its tables: membership, direct messages, unread counts, the shard key.5 sections · §5.1–5.5

- 6You press send. Which road does the message take?The WebSocket is open. Should the send use it? What a Slack-like app should promise about a sent message, and two other promises.4 sections · §6.1–6.4

- 7E is on another server. How does the message get there?Five members, servers that hold four connections each: reach the one on another server, then count the cost.3 sections · §7.1–7.3

- 8A hundred servers, 99 links each. Now what?Replace the links between servers, send each message only where needed, choose where users connect, survive a dead server.4 sections · §8.1–8.4

- 9WS2 blinked while A posted. Where is the message?A lost push, a database node that dies mid-write, a server on the open internet, a client that lies.4 sections · §9.1–9.4

- 10Step back, then try to break it: delete and reorderThe whole system on one page, then two features it wasn’t designed for, and what comes next.6 sections · §10.1–10.6

Your team is about to store every message of a Slack-like chat app. In the design review someone says: “Use NoSQL. Messaging systems always do. It scales.” Everyone nods. By the end of the first half of this lecture you won’t. You’ll ask which database, for what workload, and what it gave up to scale, and you’ll have your own answer for the messages.

Then a harder problem. Five people are in a Slack channel. A types “standup in 5” and presses Enter. B, C, D and E must see it at once, without refreshing, even though E’s app happens to be connected to a different server from the other four. And if anyone refreshes the page a second later, the message must still be there.

### Where you are #

Lecture 3 ended on a key-value store you built on one MySQL table and then split by key range, keys A to M on one database and N to Z on another. It also ended on a question: Redis keeps everything in memory, DynamoDB isn’t relational at all, so what did stores like these give up to be fast and big, and when is that trade worth it?

You have the pieces for the second problem too. Lecture 2 kept a WebSocket open so a reader saw new claps without refreshing, and warned that the hard part of WebSockets is knowing which server holds which reader. It also introduced Kafka, the stream that keeps messages and lets each consumer read them at its own pace. Lecture 1’s green dot pointed here as well: production presence systems keep a persistent connection open, and this lecture builds Slack’s messaging on connections like that.

### What you’ll build #

Build 1, a field guide to the database families (chapters 1–4). Take the slogan apart: why dropping relations lets data spread, and which of two “consistencies” gets traded away. Then meet document, key-value, column-oriented and graph databases, each through the one thing it does well and the one thing it gives up for it, and end with a rule for choosing SQL or not.

Build 2, Slack’s real-time text chat (chapters 5–10). The guide’s last question is the first Slack decision: which database holds the messages. Then the problem changes. Storing messages is the easy part; the hard part is moving one message to every member of a channel in a blink when the members sit on different servers. You build the tables, decide how a message is sent and what Slack promises about it, then connect the servers, first in the simplest way that works and then in a way that survives a hundred of them.

What carries over from the first build is the habit it drills: before you accept a design, ask what it gives up, and choose by the guarantee you owe, not by the tool you happen to like.

### What you’ll be able to do #

- Answer “NoSQL scales” with the right questions, and say what each family gives up.

- Choose SQL or not for a workload, and shard by the key every operation uses.

- Design a chat schema where direct messages and unread counts need no extra machinery.

- Decide how a message is sent and stored from the guarantee the product owes.

- Scale real-time delivery past one server without wasting the connections it exists to serve.

- Name what can still go wrong, and what covers each failure.

### Before you start #

You need SQL basics, sharding from Lecture 3, and what a WebSocket is from Lecture 2. Every box in the Slack design runs on a laptop. Each chapter opens with a small map of the design so far. When a “Pause and think” box asks you something, commit to an answer before you open it.

Lecture 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-what-to-ask-back ===

# Slack in real time, chapter 1: “Use NoSQL. It scales.” What do you ask back?

Lecture 4 · Slack in real time · chapter 1 of 10

§ 1

## “Use NoSQL. It scales.” What do you ask back?

About 5 min

Your team is about to store every message of a Slack-like chat app: every channel, every direct message, all of it scrollable forever. In the design review someone says: “Use NoSQL. Messaging systems always do. It scales.” Is that an answer?

You will often hear that you should always use a NoSQL database. It isn’t true. Most databases were built to solve a very specific problem, and the useful thing to learn about each one is where it fits and, more importantly, where it doesn’t. Keep the message store in mind; chapter 4 comes back to decide it.

[figure title] The field guide so far

[figure description] The field guide so far: five kinds of store, relational, document, key-value, column and graph, with a question mark where each one’s strength and its price will go.

[figure labels] family · good at · gives up · relational · ? · ? · document · ? · ? · key-value · ? · ? · column layout · ? · ? · graph · ? · ? · the field guide so far

[caption] Fig 1·aWhere the field guide starts: five kinds of store, nothing filled in yet.

§ 1.1

## Which database, and for what?

Start with the word. “NoSQL” throws everything that isn’t MySQL, Postgres or Oracle under one blanket, a bit like sorting people into “technical” and “non-technical”. All the stores under it share is that they aren’t relationally structured, and even that is loose. So name the type, and better, the database.

Once you do, the slogan falls apart. As a blanket statement, “NoSQL databases scale” is wrong: you can build a non-relational database that doesn’t scale at all. The ones that do scale, scale for something. Cassandra scales for a very specific workload, a flood of writes; DynamoDB for lookups by key; MongoDB for its own.

That gives you the first question to ask back: which database, for what workload? The second question needs a reason. Why would the ones that scale scale at all?

§ 1.2

## Why would dropping relations help anything scale?

The usual answer is “because there are no relations”. To see why that matters, look at what a relation costs the database.

A foreign key is a promise the database keeps for you. Take the chat app’s own tables. If messages.channel_id references channels.id, a message for a channel that doesn’t exist is refused, and by default so is deleting a channel that still has messages. That is how a relational database keeps the data correct, moving from one consistent state to the next.

[figure title] What a foreign key checks

[figure description] Insert: a messages row with channel_id 9 is rejected because channel 9 doesn't exist. Delete: deleting channel 1 is blocked because two messages rows still point at it. Both checks need the related rows in one place: with channels on shard 1 and messages on shard 2, the check would have to cross machines. Drop the foreign key and the data partitions like any other store.

[figure labels] channels · id · 1 · 2 · messages · channel_id · 1 · 2 · insert · channel_id = 9 · no channel 9: rejected · insert · channels · id · 1 · 2 · messages · channel_id · 1 · 1 · delete · channel 1 · children exist: blocked · delete · shard 1 · channels · shard 2 · messages · the check would · cross machines · drop the FK → · it partitions like any store · on two shards

[caption] Fig 1·bA foreign key from messages.channel_id to channels.id rejects a message for a missing channel and blocks deleting a channel that has messages. Split the tables across machines and each check crosses machines.

Every one of those checks needs the related rows where the database can see them. That is the restricting factor: the guarantees work best when all the related data sits in one place. A non-relational store takes the opposite attitude. It doesn’t care what you insert or whether the key you point at exists, so nothing ties one piece of data to another, and the data can be denormalized and spread across as many machines as you like.

Why build a database the first way, then? As Lecture 3 put it, relational databases grew up around money, so they chose correctness over a very high rate of writes: a different trade, not a worse one. Every database has a backstory like this.

§ 1.3

## Can a relational database spread out too?

If the checks are what pin the data down, the fix is simple: don’t use foreign keys. Without them, you can partition a relational database exactly the way a non-relational one partitions its data.

You have already done it. The key-value store in Lecture 3 lived on MySQL, and when one server ran out you split it by key range: A to M on one database, N to Z on the other. That bought horizontal scale and a store that keeps serving when one shard fails, and it cost consistency across the shards. That is exactly the move non-relational databases make.

[figure title] Anything that shards, scales

[figure description] Lecture 3’s key-value store on MySQL: a router sends keys from A to M to one MySQL database and keys from N to Z to another, for example the key mango to the first and pear to the second. It gave up cross-shard consistency and got horizontal scale, the same move non-relational databases make. The note under it: NoSQL databases scaling does not mean SQL does not; anything that shards, scales.

[figure labels] router · relational DBs · don’t scale? · "mango" · "pear" · mysql · A–M · mysql · N–Z · gave up cross-shard consistency, · got horizontal scale · NoSQL DBs scale does not mean · SQL does not → anything · that shards, scales

[caption] Fig 1·cLecture 3’s store: a router sends keys A–M to one MySQL and N–Z to another. No foreign key crosses the split.

So “relational databases don’t scale” is a very big misconception. You need to know how to use them, and the rule underneath is short: anything that shards, scales.

§ 1.4

## Then what did they give up?

The usual one-line answer is “consistency”. Non-relational databases, as a very broad rule that is not always true, give up consistency to get scalability and availability. The trouble is the word. Computer scientists are bad at naming things, and there are two different consistencies.

Pause and think

A store spread over several nodes “gives up consistency”. Which of these does it give up?

The C in ACID is about correctness: every transaction moves the data from one valid state to another. The C in the CAP theorem is about visibility: once a write completes, every read, from any node, returns it or something newer. A store can keep the first and drop the second.

The precise name for CAP’s consistency is linearizability, and a database can be ACID without being linearizable martin.kleppmann.com ↗. Strong consistency is the one most non-relational stores give up.

[figure title] Two consistencies

[figure description] Panel a, ACID consistency: each transaction moves the data from one correct state to the next, state 1 to state 2 to state 3, each ticked. Panel b, CAP consistency: a writer writes x = 2 to node 1 while a reader reads x from node 2, which pulls from node 1 to catch up later. A strongly consistent store returns 2 right away; an eventually consistent one may return the old value 1 for a while. Same word, two meanings.

[figure labels] correct → correct → correct · state 1 · state 2 · state 3 · txn · txn · the data stays correct · a · ACID consistency · write x = 2 · read x · node 1 · node 2 · node 2 pulls, · catches up · the read returns: · 2 · strong: visible right away · 1 · eventual: old value for a while · b · CAP consistency · same word, two meanings

[caption] Fig 1·dLeft: ACID’s consistency, every transaction leaving the data correct. Right: CAP’s consistency, whether a read from another node right after a write sees it (strong) or not yet (eventual).

In exchange you get availability. A single relational primary without a standby takes everything down when it fails; data spread over replicated nodes keeps serving when one node fails. The price is that a write shows up everywhere, but not at once: the store is eventually consistent. Even that is a default, not a law; DynamoDB, for one, gives you a strongly consistent read when you ask for it.

The habit to keep

Never believe a generic statement at face value, not even this one.

Whenever you hear one, ask for it to be specific and contextual, and ask why it is being said. You can always find a counter-example, and looking for it is what makes you a better engineer.

So the review comment named no database, no workload and no trade-off, and those are your three questions about the message store. The rest of this build answers them family by family, starting with the trade that separates the two most common ones: how you may touch the data.

Lecture 4, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-key-or-inside ===

# Slack in real time, chapter 2: Get a value by its key, or ask inside it?

Lecture 4 · Slack in real time · chapter 2 of 10

§ 2

## Get a value by its key, or ask inside it?

About 5 min

The store you built in Lecture 3 treated a value as something it stores and returns without looking inside. The wish that comes up next is natural: put JSON in that value and query inside it. Two families of database sit on either side of that wish, and the side you pick decides how far your data can be split.

[figure title] The field guide so far

[figure description] The field guide so far. Relational: good at correct data, through foreign-key checks and ACID; gives up spreading for free, so you shard it yourself, because the checks want related data in one place. Marked new. The other four families are still question marks.

[figure labels] new · family · good at · gives up · relational · correct data: FK checks, ACID · spreading for free: shard it yourself · document · ? · ? · key-value · ? · ? · column layout · ? · ? · graph · ? · ? · the field guide so far

[caption] Fig 2·aThe field guide so far. Marked new: relational databases.

§ 2.1

## What if you could query inside the value?

Then you have a document database, MongoDB being the famous example. Documents are mostly JSON, and you can query on their attributes: “give me every document whose theme is dark”. You can run aggregations too, and you can make partial updates, changing one attribute of one document and nothing else.

// every user whose theme is dark: a query on an attribute inside the document db.users.find({ "settings.theme": "dark" }) // change one field of one document, in place db.users.updateOne({ _id: 7 }, { $set: { "settings.tz": "IST" } })

That is not quite as powerful as a relational database, but it is close, which is why a team moving a general relational schema off SQL typically lands on a document database. You will almost never see one jump straight to a key-value store.

§ 2.2

## What if every operation named one key?

Then you have a key-value store: Redis, DynamoDB, Aerospike. Every operation is key-wise, whether it reads, writes or deletes: get a key, put a key, delete a key, add a member to the set at a key. You never peek into the value.

That is restrictive. To change one field, you read the whole value, change it in your code and write the whole value back; a plain key-value store has no partial update. Some add structure for it: a Redis hash lets HSET set one field without rewriting the others redis.io ↗.

[figure title] Partial update vs read, change, write back

[figure description] Panel a: a document database holds a JSON document with _id 7 and settings, theme dark and tz UTC. The query $set settings.tz = "IST" changes that one field in place; nothing else in the document is touched. Panel b: a key-value store holds an opaque 2 KB value under the key user:7. To change one field the API server (1) gets the whole value, (2) changes one field itself, and (3) puts the whole value back. Redis hashes are an exception: HSET changes one field.

[figure labels] $set settings.tz = "IST" · { } · _id: 7 · settings: { · theme: "dark" · tz: "IST" · } · "UTC" · only this field changes · a · document: partial update · api · user:7 · kv · { … } · 2 KB · 1 · GET user:7 · whole value · 3 · PUT user:7 · {…} · 2 · change one field · the whole value travels out and back · Redis hashes allow HSET on one field · b · key-value: read, change, write back

[caption] Fig 2·bLeft: the document database changes one field in place. Right: the key-value store only knows whole values, so the API server gets the value, changes it and puts it all back.

A key-value store is no use unless your use case fits that access pattern exactly. So why would anyone accept the restriction?

§ 2.3

## What does one key per operation buy?

Pause and think

Your data is split over three databases. A query asks for WHERE id IN (1, 2, 3), and the three ids live on three different databases. What does that cost, and could a key-value store ever be asked it?

A query that can touch many shards has to ask them all and wait for the slowest. A key-value store only ever offers “here is a key, give me the value”, so every operation lands on exactly one shard.

Cross-shard queries come from range operations and IN, and they are very expensive. A key-value store rules them out, which is the whole point: you can partition it heavily, thousands of partitions, and no query ever waits on two machines. Redis Cluster splits keys over 16,384 hash slots and runs every single-key command, while a multi-key command works only when all its keys hash to the same slot redis.io ↗.

[figure title] One key vs IN (1, 2, 3)

[figure description] Top: GET 2 names one key, so the API server sends it to shard 2 only, and one shard answers. Bottom: WHERE id IN (1, 2, 3) may touch shards 1, 2 and 3, and the API server must wait for all three answers: a cross-shard query, very expensive. Every key-value operation names one key, which is why a key-value store can run thousands of partitions without hiccups.

[figure labels] GET 2 · api · shard 1 · id 1 · shard 2 · id 2 · shard 3 · id 3 · one shard answers · WHERE id IN (1, 2, 3) · api · shard 1 · id 1 · shard 2 · id 2 · shard 3 · id 3 · and waits for all three answers · cross-shard: very expensive · every op names one key → · thousands of partitions, no hiccups

[caption] Fig 2·cA get by key touches one shard. An IN over three ids may touch three, and the caller waits for the slowest. The ids are placed one per shard for the example.

Document databases support cross-partition operations, but those get really expensive, so they can’t run thousands of partitions the same way. A key-value store is the other extreme: by limiting access, it gets massive parallelism, every database answering its own queries without waiting for the others. Every single thing is a trade-off.

So that is the core of what Redis and DynamoDB gave up, the question Lecture 3 ended on: questions about the inside of a value, which each bends a little (2.4). What they got back is that every operation lands on one shard.

The rule to keep

The more complex the queries, the less you can distribute the data.

Complex queries cross shards, and cross-shard queries are expensive. Key-wise access never crosses a shard, so the data can be split thousands of ways.

§ 2.4

## Where does one family end and the next begin?

Nowhere in particular. The people building these databases keep entering each other’s space. DynamoDB is a key-value store that also supports a document model: you can filter on nested attributes, though the filter runs after the items are read, so an efficient query still needs the key or an index docs.aws.amazon.com ↗. Pick by the features you need, such as complex queries or partial updates, and the database that gives them.

Generic statements also expire: MongoDB started out “BASE, not ACID” and now supports ACID transactions, though across shards they are distributed transactions that cost throughput, so use them only when you need them mongodb.com ↗.

And “key-value” describes how you use a store, not how it stores. Redis keeps its data in memory, DynamoDB on disk: same access pattern, different storage engines, as Lecture 1 found when it weighed the two. So they don’t scale the same; it depends on what you store, how you access it and how you partition, and no database is a black box.

[summary] Go deeper: the NAND gate of databases skip unless you like first principles

Every logic gate can be built from NAND gates. In the same way, every database can be modelled on top of a key-value store, though maybe not as performantly. CockroachDB is a working example: its SQL layer turns statements into key-value operations on a sorted map split into ranges cockroachlabs.com ↗.

Documents and key-value stores differ in how you address a row. The next family keeps the table exactly as it is and changes something else: how the table sits on the disk.

Lecture 4, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-how-much-is-read ===

# Slack in real time, chapter 3: One average over 10,000 rows. How much does the disk read?

Lecture 4 · Slack in real time · chapter 3 of 10

§ 3

## One average over 10,000 rows. How much does the disk read?

About 4 min

Take a table called stock_ticks that records the price of every listed stock: symbol, price, name, exchange and ts, the timestamp. Keep it small: one row per company per day. You want one number from it, the average price of the whole market for one day. About 10,000 companies are listed, so that day has about 10,000 rows.

[figure title] The field guide so far

[figure description] The field guide so far. Relational: correct data, gives up spreading out. Marked new: document, good at queries inside a value and one-field updates, gives up thousands of partitions; key-value, one key per operation and thousands of shards, gives up any query inside the value. Column and graph are still question marks.

[figure labels] new · family · good at · gives up · relational · correct data: FK checks, ACID · spreading for free: shard it yourself · document · queries inside, one-field updates · thousands of partitions · key-value · one key per op: 1,000s of shards · any query inside the value · column layout · ? · ? · graph · ? · ? · the field guide so far

[caption] Fig 3·aThe field guide so far. Marked new: document and key-value stores.

§ 3.1

## How does a table sit on disk?

In a row-oriented database a row is stored the way you draw it: its five values sit one after another and are persisted as one row. A column-oriented database stacks the other way: the values of one column, across many rows, sit together. A crude, naive picture is one file per column, line 1 of every file holding row 1’s value. Real column stores are smarter, but the picture is enough to see which files a query must open.

[figure title] Row-oriented vs column-oriented on disk

[figure description] The table stock_ticks has five columns: symbol, price, name, exchange, ts. In a row store, the five values of each row, R1, R2 and R3, are stored next to each other as one long strip. In a column store, the values of each column are stored together, c1 symbol through c5 ts, so row 1 is one cell in every column block.

[figure labels] stock_ticks · symbol · price · name · exchange · ts · R1 · R2 · R3 · a row’s columns sit together · row-oriented · R1 · R2 · R3 · c1 symbol · c2 price · c3 name · c4 exchange · c5 ts · one column’s values sit together · column-oriented

[caption] Fig 3·bLeft: a row store keeps each row’s five values in one strip. Right: a column store keeps each column’s values together.

§ 3.2

## Does naming two columns make the read smaller?

The query only needs two of the five columns:

SELECT avg(price) FROM stock_ticks WHERE ts >= '2026-10-27' AND ts < '2026-10-28';

Pause and think

The query names only price and ts. Does that make a row store read less from disk?

The row is the unit on disk. To reach the next row’s price, the engine has to pass over this row’s symbol, name and exchange, because it can’t know where the row ends without reading it. It reads everything and then picks out the two columns you asked for.

Five columns, 10,000 rows. How much does each layout read to answer one average?

[caption] Clip 3·1SELECT avg(price) on 10,000 rows: the row store reads every row whole and discards three columns; the column store opens two files. With 100 columns it is 100 against 2.

[summary] The clip as text 0:34

- One query: avg(price) for one day, about 10,000 rows.

- Row store: every row is read whole, symbol, name and exchange too.

- It can't jump to the next price: it must find where the row ends.

- Column store: open two files, price and ts. No IO for the other three.

- 100 columns: a row store reads 100 to use 2. A column store: 2 files.

- Same data, same query: the layout decides how much is read.

The query SELECT avg(price), with ts on one day, runs over about 10,000 rows of stock_ticks, whose columns are symbol, price, name, exchange and ts. In a row store each row's five columns are stored together, so the read head passes over every cell of every row: price and ts are used, while symbol, name and exchange are read for nothing, 5 columns read to use 2. It cannot jump to the next row's price; it has to pass over the rest of the row to find where the row ends. In a column store, drawn as the naive one file per column, only the price file and the ts file are read, and the other three files get no IO. With 100 columns the row store reads all 100 to use 2, discarding 98 of them, while the column store still reads 2 files.

So the row store reads all 50,000 values to use 20,000; the column store reads exactly those 20,000. Real analytics tables are far wider than five columns. Redshift’s documentation gives the arithmetic: a query that uses 5 of 100 columns reads only about 5% of the data in a column store docs.aws.amazon.com ↗.

Only the way the data sits on disk changed, and that alone gives a massive speed-up without touching any layer above it. That is what an abstraction in the right place buys you.

§ 3.3

## Then why isn’t every database columnar?

Because most applications read whole rows. You could build a blogging site on a column store, but you shouldn’t: rendering a profile reads all 10 or 15 of its columns together, almost always a SELECT *. Column stores thrive when a query touches a few columns out of hundreds, which is the typical analytics query, and that is why they power warehouses such as Amazon Redshift and Google BigQuery. File formats like Parquet use the same layout so that a job reads the bare minimum.

Notice those are SQL warehouses. Column orientation is a way of laying a table on disk, not a separate non-relational family, and it is a different idea from the “wide-column” stores such as Cassandra.

Writes are where it costs: inserts are heavy. ClickHouse, for example, creates a new storage part on disk for every insert, so it recommends inserting in batches of at least 1,000 rows clickhouse.com ↗. You get some, you lose some, and for analytics the trade is fine.

That is also why a column store is never the primary copy of an application’s data. The primary copy lives in MySQL, PostgreSQL, MongoDB, DynamoDB and the like, and a job copies it into the warehouse just to power the analytics.

[figure title] Primary store → job → warehouse

[figure description] Applications write to their primary databases, such as MySQL behind an API server and another service’s DynamoDB: transactional work that reads whole rows. An ingest job copies the data asynchronously into a column-oriented warehouse such as BigQuery or Redshift, just for analytics. An analyst’s SELECT avg(price) query reads only the warehouse, which is never the primary copy.

[figure labels] api · mysql · dynamodb · ingest job · just for analytics · warehouse · bigquery / redshift · SELECT · avg(price) … · never the primary copy · transactional: whole rows · primary copy · warehouse

[caption] Fig 3·cApplications read and write whole rows in their primary databases. A job copies the data into the warehouse asynchronously (dashed), and analysts query only the warehouse.

§ 3.4

## Why do column files get so small?

Because each column holds one kind of value, often from a small set. The symbol column repeats AAPL and GOOG over and over, so the store can keep a dictionary and write a small code for each value instead of the string, then collapse runs of the same code. Parquet does exactly this with dictionary and run-length encoding parquet.apache.org ↗. You pass ordinary strings; the engine compresses them for you.

[figure title] Why columns compress

[figure description] A column holds one kind of value. The symbol column AAPL AAPL GOOG GOOG GOOG AAPL is homogeneous; a small dictionary maps AAPL to 0 and GOOG to 1, so the column becomes the small codes 0 0 1 1 1 0, and then the runs 0 twice, 1 three times, 0 once. A row mixes strings, numbers and times, which compresses less.

[figure labels] symbol · AAPL · AAPL · GOOG · GOOG · GOOG · AAPL · homogeneous · AAPL → 0 · GOOG → 1 · a small code · 0 · 0 · 1 · 1 · 1 · 0 · a few distinct values fit in one byte · 0×2 1×3 0×1 · run-length encoding: read about it · Huffman, Snappy, LZ work well here · one row · AAPL · — · Apple · … · 09:15 · a row mixes types: · compresses less

[caption] Fig 3·dTop: a homogeneous column becomes small codes, then runs. Bottom: a row mixes a symbol, a price, a name, an exchange and a time, which compresses less. Values are illustrative.

A row mixes strings, numbers and timestamps, so it compresses far less. How much a column shrinks depends heavily on the data; someone who runs these warehouses reports gains of around 29 times as normal for his data. Three trades down. The next one is the most misunderstood of all, and it starts with a mistake almost everyone makes.

Lecture 4, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-graphs-and-the-choice ===

# Slack in real time, chapter 4: Who follows whom, and where would Slack keep its messages?

Lecture 4 · Slack in real time · chapter 4 of 10

§ 4

## Who follows whom, and where would Slack keep its messages?

About 6 min

Build Twitter’s follow/following. There are users, there are edges between them, and you can draw the whole thing as a graph. So the instinct is to reach for a graph database.

[figure title] The field guide so far

[figure description] The field guide so far. Relational: correct data, gives up spreading out. Document: queries inside, gives up thousands of partitions. Key-value: one key per operation, gives up queries inside the value. Marked new: column, good at reading 2 of 100 columns, gives up whole-row reads and cheap inserts. Graph is still a question mark.

[figure labels] new · family · good at · gives up · relational · correct data: FK checks, ACID · spreading for free: shard it yourself · document · queries inside, one-field updates · thousands of partitions · key-value · one key per op: 1,000s of shards · any query inside the value · column layout · reading 2 of 100 columns · whole-row reads, cheap inserts · graph · ? · ? · the field guide so far

[caption] Fig 4·aThe field guide so far. Marked new: column-oriented storage.

§ 4.1

## It can be drawn as a graph. Is that the reason?

Pause and think

Follow/following is literally a graph: people are nodes, follows are edges. Is that a good reason to store it in a graph database?

A follow list is a lookup by user. Being drawable as a graph doesn’t mean you need what a graph database is built for, and you pay a lot for it.

Graph databases are among the most misunderstood databases, and this instinct is where it starts. At its core, one takes the adjacency list from your data-structures course, stores it as is, and puts data APIs on top.

[figure title] An adjacency list is the whole idea

[figure description] Four nodes A, B, C and D with edges A–B, A–C, B–D and C–D. Below, the same graph as an adjacency list: A: B, C; B: A, D; C: A, D; D: B, C. A graph database stores each node's adjacency list as is and puts data APIs on top. Using one only to store follow lists is the Hulk opening a glass jar.

[figure labels] A · B · C · D · + data APIs on top · A: B, C · B: A, D · C: A, D · D: B, C · stored · as is · the Hulk opening · a glass jar

[caption] Fig 4·bThe graph on top is stored as the adjacency list underneath: each node with the list of nodes it connects to. Bottom right: using a graph database only to keep follow lists.

What they specialise in is sophisticated graph algorithms, and a follow list needs none. Graph databases tend to be memory hungry and hard to scale, so using one here works but costs far more than it should: the Hulk opening a glass jar. Twitter kept who-follows-whom in FlockDB, a store for plain adjacency lists that listed multi-hop queries as an explicit non-goal FlockDB ↗.

§ 4.2

## Then what is a graph database for?

For questions about the shape of the graph itself. Open someone’s profile on LinkedIn and it tells you whether they are a 1st, 2nd or 3rd connection: that is a graph algorithm.

Recommendations are another. Collaborative filtering starts from cohorts: everyone who bought an iPhone is a set of similar buyers, so when one buys AirPods, the rest are a good audience for AirPods. Real cohorts go two or three levels deep, which is hard to model without a graph. Not every recommender works this way: Amazon’s moved to item-to-item filtering, recomputed daily, offline amazon.science ↗.

[figure title] A cohort

[figure description] A product node, iPhone, with five buyers u1 to u5 joined to it by 'bought' edges: everyone who bought one is a set of similar users. Buyer u3 gains a blue edge to a new product node, AirPods. Dashed arrows from AirPods to u1, u2, u4 and u5 show AirPods being recommended to the rest of the cohort. This is one level; real cohorts go two or three levels deep.

[figure labels] bought · recommend · AirPods · iPhone · u1 · u2 · u3 · u4 · u5 · similar users = everyone who bought one · one level here; · real cohorts go 2–3 levels deep

[caption] Fig 4·cEveryone joined to the iPhone node is one cohort. When u3 buys AirPods (blue), the dashed arrows suggest AirPods to the other four. One level deep; real cohorts go further.

The use that shows a graph database’s real power is fraud detection. A card holder buying a software subscription triggered the one-time password, and right away his bank called to ask whether it was him; only after he said yes did the payment go through. How did they work it out so fast?

Suppose every transaction a customer has ever made was domestic, and suddenly one is international. In graph terms it is a new edge outside the closely knit cluster of their history, and a graph database can tell very quickly that it is suspicious. As one bank’s engineering lead described it, each transaction is categorised along some 50 or 60 parameters into a graph per customer, and the automated decision to hold the payment and route it to a person must come within 200 milliseconds; the call comes after that decision.

[figure title] A new edge outside the cluster

[figure description] A customer's history forms a tight cluster of domestic merchants: grocery, fuel, rent, telecom and pharmacy. A sudden international transaction is a new red edge to an overseas merchant outside that cluster. On the timeline the card payment and OTP lead to a graph check, a decision and routing to an executive, all inside a red 200 ms budget, as one bank's engineering lead described it; the executive's call asking 'is this you?' comes after the decision.

[figure labels] domestic: a closely knit cluster · fuel · grocery · pharmacy · telecom · rent · you · overseas merchant · a new edge: · suspicious · 50–60 parameters per transaction · card · + OTP · graph · check · decide · route to · executive · call · “is this you?” · 200 ms SLA

[caption] Fig 4·dA sudden overseas payment is a new red edge outside a tight cluster of domestic merchants. The check runs between the one-time password and the decision, inside one bank’s 200 ms budget; the call comes after.

The rule to keep

Use a graph database when you need core graph algorithms, not because the data looks like a graph.

Degrees of connection, cohorts, a new edge outside a cluster: those are graph algorithms. A list of who follows whom is not.

§ 4.3

## Why not do it with joins?

How would you walk that cohort two or three levels deep on a relational database? In a graph database it is one traversal. In SQL you have two options. Written level by level, it is a self-join per level, rewritten whenever the depth changes and slow on huge tables. Or one recursive query, WITH RECURSIVE, which walks any depth postgresql.org ↗ and is the first thing to try for a tree, such as a multi-level-marketing hierarchy ten levels deep.

[figure title] Three hops in a graph: one traversal

[figure description] Nodes A, B, C and D in a chain. The path from A to D, three levels deep, is drawn in blue: in a graph database it is one traversal.

[figure labels] A · B · C · D · hop 1 · hop 2 · hop 3 · one · traversal · graph

[figure title] Three hops in SQL: self-joins, rewritten per depth

[figure description] Three copies of the same edges(from_id, to_id) table, aliased e1, e2 and e3, chained by joins on e1.to_id = e2.from_id and e2.to_id = e3.from_id. Each level adds a self-join and the query is rewritten for every depth; ten levels means nine self-joins, which is messy. SQL can also recurse, with a recursive common table expression.

[figure labels] edges(from_id, to_id) · e1 · e2 · e3 · JOIN · e1.to_id = e2.from_id · JOIN · e2.to_id = e3.from_id · one more self-join per level, · rewrite per depth · 10 levels → 9 self-joins · or one query: WITH RECURSIVE · relational

[caption] Fig 4·eThe same three hops, A to D: one traversal in a graph; in SQL written level by level, one copy of the edges table per hop, joined in a chain.

Graph databases make deep traversals simpler to write and often faster. They don’t make writes easier to spread, though: most keep a single writer per graph and scale reads with replicas, as Amazon Neptune does docs.aws.amazon.com ↗.

§ 4.4

## So, SQL or not?

That completes the guide. Now use it on the biggest question of all, answered in a very broad sense rather than as a law.

When the correctness of your data is the most important feature of the application, you need ACID, so go for SQL and don’t look beyond it. SQL hands you the tooling to keep the data from ever reaching an incorrect state: foreign keys, check constraints and the like. It doesn’t apply them for you; you have to.

When you have gigantic amounts of data to ingest at a fast pace, a flood of chat messages, posts, logs, metrics, a non-relational store built for it fits better. Those workloads can live with a missing attribute or an unchecked row, though not with lost data: Cassandra, a wide-column store and the usual example, shards out of the box, drops the constraints, and still writes every write to an on-disk commit log first cassandra.apache.org ↗. With SQL you would build that sharding yourself.

§ 4.5

## Where would Slack keep its messages?

Back to the design review from chapter 1. Your team stores every message of a chat app; should it be NoSQL?

For Instagram Messenger, where everyone chit-chats all day, a store built for a high ingestion rate such as Cassandra makes sense. Slack is an enterprise product: people are there to work, not everyone sends hundreds and thousands of messages, and the rate stays modest. You store messages and let people scroll back, which a relational database does very well as long as it is sharded, because one node couldn’t hold them all. Any database you can shard will do, even SQL.

That is what Slack runs. MySQL has stored all of Slack’s data from the start, and from 2017 Slack moved it onto Vitess, which shards MySQL; by 2020 Vitess served 99% of Slack’s query load, about 2.3 million queries a second at peak slack.engineering ↗. The choice came from the product, not from an affinity for a stack.

So the review’s question has an easy answer here, and it isn’t “NoSQL because messaging”. What makes Slack hard isn’t where a message is stored. It is that a message has to appear, the moment it is sent, on the screen of every member of a channel, wherever those members happen to be connected. Two things carry over into that build: shard by the key that every operation uses, and choose each piece by the guarantee you owe, not by habit.

Lecture 4, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-slack-rows ===

# Slack in real time, chapter 5: “Design Slack.” Where do you even start?

Lecture 4 · Slack in real time · chapter 5 of 10

§ 5

## “Design Slack.” Where do you even start?

About 6 min

“Design Slack” means the whole product, every feature of it, and that is too much to design well. Pick one part and do it really well: Slack’s real-time communication, text only, the kind of messages you also see on Teams or Instagram. Kept this small, every building block and every decision stays visible.

[figure title] The Slack design so far

[figure description] The Slack design so far: users in one organisation and a sharded store for their messages. How a message travels from one user to the others is still a question mark.

[figure labels] A · A–E · messages · sharded · ? · the Slack design so far

[caption] Fig 5·aWhere Slack starts: users and a sharded message store, and nothing in between yet.

The requirements fit on a card:

[figure title] The requirements card

[figure description] A card with the five requirements: one organisation with many users, many channels, a user can DM another user or post in a channel, chat is real time, and history can be scrolled. A chip says text only. Below it, a small Slack-like sidebar: this one part, done well.

[figure labels] requirements · text only · 1 · one organisation, many users · 2 · many channels · 3 · DM a user or post in a channel · 4 · real time · 5 · scroll history · # general · # standup · user B · user C · this, done well

[caption] Fig 5·bThe whole brief: five requirements, text only.

What you build here also powers multiplayer games and live polls. But don’t start with WebSockets; start with the simplest thing, the schema, for these features only. A schema names entities and attributes; it doesn’t commit you to a relational database.

§ 5.1

## Who is in which channel?

A first sketch has three tables: users with an id, a name and an optional nickname; channels with an id and the organisation it belongs to; and messages, each holding the id of the channel it was sent in. It can’t answer one question yet: which users are part of which channel? That has to be stored somewhere, in a table that joins users to channels.

Most people would call it user_channel. But what is a user channel? And if tomorrow you map three things, is it user_channel_message? Call it membership. A noun gives the table a persona, and a thing with a persona naturally grows attributes: how far this user has read, whether they muted the channel. With user_channel you never think of adding a column. That pays off in 5.4.

§ 5.2

## A message goes to a channel or to one person. What does the row hold?

Who sent it and the text, certainly. The destination is the hard part, because a message goes either to a channel or to a single user.

Pause and think

Give messages both a nullable channel_id and a nullable receiver_id, exactly one of them filled. Is that a sound design?

If either column may be null, nothing stops a row where both are, inserted by some glitch: an orphan message that belongs nowhere. And every query and every piece of business logic now has to ask which column is set.

Draft 1 you just judged. The other obvious drafts each fail for a reason of their own. Step through them:

[figure title] Six drafts of messages

[figure description] Six drafts of the messages table, each rejected for a concrete reason. Draft 1 has channel_id and receiver_id, one always null, so a row with both null is an orphan. Two tables double every migration and a receiver array breaks when someone joins. A to column with CH- or usr- prefixes needs string processing in every query. A type enum still leaves no foreign key on to and fills the code with ifs and elses. A message that doesn't store its destination can't be rendered by channel.

[figure labels] settled: · users · channels · membership · 1 · messages · one is always null · sender_id · channel_id · receiver_id · msg · u1 · null · null · hi · both null = an orphan row · 2 · channel_messages · direct_messages · every new column = two migrations · receiver_ids: [B, C, D] · breaks when someone joins · 3 · from · to · msg · u1 · CH-42 · hi · u2 · usr-7 · yo · string processing · to pick the join · 4 · channels.id ? · from · to · type: ch/u · msg · no foreign key on to; · ifs and elses everywhere · 5 · from · msg · then how do you · render a channel?

- Draft 1, the one you just judged: an orphan row when both columns are null.

- Drafts 2 and 3: two tables, channel_messages and direct_messages, mean every new column is two migrations. A receiver_ids array breaks as soon as someone joins the channel.

- Draft 4: one to column holding CH-42 or usr-7. Every query must parse the id to know which table to join.

- Draft 5: add a type enum, ch or u. Still no foreign key on to, and the business logic fills with ifs and elses.

- Draft 6: the message doesn’t store where it goes, and routing is left to code. Then how do you render a channel?

Keys: ← → to step · link to a step with #fig-5c/step-3

[caption] Fig 5·cSix drafts of the messages table, with the rejected part in red and the reason beside it.

Every draft treats a direct message as a special case, and special cases are where the trouble comes from. Ifs and elses are the worst thing you can build into how data is stored.

Pause and think

Every draft failed by treating a direct message as special. What if it weren’t special at all?

Give the two people a common channel. Every message then has exactly one channel_id, whether it was sent to #general or to one person.

§ 5.3

## What kind of row is a chat between two people?

That piggybacks on what already exists, channels and messages, instead of special-casing anything. (Making that two-person channel a pub/sub topic as well would be an unnecessary complication.)

It is how Slack’s API works: every channel-like thing is a conversation, whether a public channel, a private one or a DM (is_im), and conversations.open opens or resumes a DM and returns its channel ID docs.slack.dev ↗. The UI renders it as a direct message; underneath, it is a channel. A DM and a channel message are both just a message with a sender and a destination. Only the rendering differs.

The rendering is why the channel gets a type: reg, grp or user, the last meaning a DM, which puts channels in the top half of the sidebar and DMs below. Why not call a two-person private channel a DM? Because a private channel can gain members later and a DM can’t, so the UI must tell them apart. Messages also carry created_at, so scrolling a channel means walking its messages in time order.

[figure title] The Slack schema

[figure description] Four tables: users (id, name); channels (id, org, name, type: grp, user or reg); membership (user_id, channel_id, checkpoint); messages (id, from, channel_id, created_at, msg). membership.user_id points at users, and membership.channel_id and messages.channel_id point at channels. A direct message is a channel with two people.

[figure labels] Brainstorm: channels, messages, checkpoints, realtime communication (membership) · users · id · name · channels · id · org · name · + · type : grp/user/reg · membership · user_id · channel_id · + · [ checkpoint ] · messages · id · from · channel_id · created_at · msg · DM = channel with 2 people

[caption] Fig 5·dThe schema: users, channels with a type, membership with a checkpoint, and messages, each with its own id, that always point at one channel. The + marks the two lines added last. membership.user_id references users; membership.channel_id and messages.channel_id reference channels.

§ 5.4

## You open a channel with 100 new messages. Where do you land?

Exactly where you stopped reading. That is the payoff of the noun. Because membership doesn’t restrict you, it can hold a checkpoint: for this user in this channel, how far they have read, as a timestamp or a message id, whichever granularity you choose. Opening a channel moves it to the newest message.

From that one column come the unread badge, the “you last read until here” line and the jump to it. Slack exposes the same thing as a conversation’s last_read, moved by conversations.mark docs.slack.dev ↗. Muted, favourited, notification settings: all describe how one user relates to one channel, so they go on membership too, the key table of the system.

[figure title] The sidebar

[figure description] A Slack-like sidebar. Channels sit in the top half: # general with an unread badge of 12, and # standup. Direct messages sit in the bottom half: user B and user C. The channel type decides the half: reg or grp goes on top, user goes below.

[figure labels] channels · # general · 12 · # standup · direct messages · user B · user C · type = reg / grp · → top half · type = user · → bottom half · the sidebar

[figure title] The open channel

[figure description] The open channel # general with 12 unread. Two messages above a dashed line, you last read until here, then the new messages below it with a jump here marker. The badge and the line both come from one column: membership.checkpoint.

[figure labels] # general · 12 · you last read until here · jump here · membership.checkpoint · the open channel

[caption] Fig 5·eLeft: the type decides the half of the sidebar, and the unread badge comes from the checkpoint. Right: the “last read” line and the jump come from the same column.

It also explains what Slack doesn’t do. Back from a vacation, you see something like 200 unread messages, none replayed over a socket: the app loads them with ordinary API calls, and the checkpoint says where the unread part begins. WhatsApp keeps messages on your phone, so it has to deliver them there.

The rule to keep

Name tables as nouns, and piggyback on what you have instead of writing ifs and elses.

The noun let membership grow a checkpoint, mutes and favourites without a new table. Piggybacking made a DM a channel with two people, so messages need no special case.

§ 5.5

## Which shard does a message go to?

A workspace has many channels and each channel has many messages, so shard by channel_id: a channel’s messages sit in one database, and scrolling never crosses shards. Slack chose the same key for message data when it moved to Vitess, to spread the load more evenly slack.engineering ↗. Because a DM is a channel, that one rule places every message. Now someone presses send.

Lecture 4, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-press-send ===

# Slack in real time, chapter 6: You press send. Which road does the message take?

Lecture 4 · Slack in real time · chapter 6 of 10

§ 6

## You press send. Which road does the message take?

About 6 min

A types “standup in 5” in #general and presses Enter. A’s Slack app already holds an open WebSocket, and every message from everyone else arrives on it. The tempting answer is that this message leaves on it too.

[figure title] The Slack design so far

[figure description] The Slack design so far: users and the messages database, sharded by channel_id. Marked new: four tables, users, channels with a type, membership with a checkpoint, and messages that point at one channel. How a message travels is still a question mark.

[figure labels] new · A · A–E · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · ? · the Slack design so far

[caption] Fig 6·aSlack so far. Marked new: the four tables, sharded by channel_id.

§ 6.1

## The socket is already open. Should the send use it?

Separate the two directions first. Receiving has to be pushed: without a channel the server can push on, the client would keep polling and refreshing, which is a poor experience for something as real-time as chat. Lecture 2 covered the push channels; here it is a WebSocket. Sending is a different decision, and having the socket open doesn’t make it for you. Just because you have it doesn’t mean you have to use it.

Every user holds two connections: plain HTTP to the API servers, and a WebSocket to the WebSocket servers. Either could carry the send.

[figure title] Two kinds of connection, one sharded store

[figure description] Users A and B each hold two kinds of connection: HTTP to the API servers (the messaging service, behind a load balancer) and a WebSocket to the WebSocket servers. The API servers write each message to the shard chosen by its channel id, so all of a channel’s messages sit in one shard. The shards can be any database you can shard: MySQL, Cassandra or Mongo.

[figure labels] A · B · messaging service · lb · api · ×3 · HTTP to the API · ws · ×3 · WS to the edge · any DB you can shard · channel_id → shard · mysql / cassandra / mongo · a channel’s messages · all in one shard

[caption] Fig 6·bEvery user holds HTTP to the API servers and a WebSocket to the WebSocket servers; either could carry a send. Messages go to the shard chosen by channel id.

The usual arguments for the socket are about overhead: a REST call costs a handshake, and chat is frequent. Neither holds up. Repeated HTTP/1.1 calls reuse one persistent connection by default, so there is no new handshake per message RFC 9112 §9.3 ↗. And Slack isn’t as chatty as Instagram Messenger. If the WebSocket were always better, nobody would run ordinary API servers.

So look at the product instead of guessing. Send yourself a message on Slack and watch it: it shows grey for a moment, then turns black. Sending is not instant, and it isn’t trying to be.

[figure title] Grey, then black

[figure description] On Slack a sent message first shows grey, marked sending, then turns black, sent, after a short visible delay. That delay hints, without proving it, that sending goes through an ordinary request rather than the open WebSocket.

[figure labels] standup in 5 · sending… · a visible delay · standup in 5 · sent

[caption] Fig 6·cGrey, then black. A message you send on Slack shows grey for a moment, then black.

That delay is a hint, not a proof, about what happens in between. To read it, start from the other end: what does Slack owe you once you press send?

§ 6.2

## What does Slack owe you once you press send?

Slack’s customers are companies, and for them a message being on record matters far more than shaving overhead off each send. A message that reaches people and then turns out never to have been saved is a very bad experience in an enterprise tool. It costs credibility, because now people can misquote each other: “No, I received this message, it was right here.”

So the promise this build makes, and the likeliest reading of Slack’s, is: a message is shown to others only after it is saved. The flow that keeps it is synchronous. A sends over HTTP to an API server; the API server writes the message to its shard; only then does it hand the message, as an event, to the WebSocket server, which pushes it to everyone in the channel. Sending is plain HTTP, receiving is the WebSocket, and nobody ever has to refresh.

Slack’s engineers describe the same two roads: a send is an HTTP call to Slack’s web API, and messages reach clients through servers holding their WebSockets slack.engineering ↗. Slack doesn’t publish whether the save finishes first; this design makes it so, because the promise demands it.

§ 6.3

## What if the app showed it first and saved it later?

Now picture a chat app where every phone keeps its own copy of every message, the way WhatsApp keeps yours on your device, and the backend copy is only a backup. Slack’s road would feel slow there. Call the alternative the phone-first road: the message goes over the open WebSocket to the WebSocket server, which pushes it straight to the other user and drops it onto Kafka; workers pull it from Kafka and store it later, in batches. Nothing waits on the database, and that is safe because the phone already holds a copy.

Pause and think

Now run Slack on the phone-first road. The workers lag ten minutes. B sees “standup in 5” at once, then refreshes the channel. What is on B’s screen?

A Slack refresh loads the channel from the database, and for ten minutes the database doesn’t have it. The message isn’t delivered late; it is delivered now and stored late, so a refresh hides a message B has already seen.

A third app cares only about real time. In Zoom’s in-meeting chat, by default, whoever is in the meeting gets the message and nothing is kept: leave and rejoin, and the earlier messages are gone. (Zoom does offer a continuous meeting chat that persists them, once an admin turns it on zoom.com ↗.)

One message, three roads. Watch what a refresh during the lag shows on each.

[caption] Clip 6·1One message sent three ways: ① saved, then shown; ② shown at once and saved after the Kafka lag, so a refresh inside the lag hides it; ③ shown and never saved.

[summary] The clip as text 0:40

- One message, three paths: when saved, when shown?

- Slack (a hypothesis): over HTTP, saved first, then broadcast to B.

- Phone-first (hypothetical): shown at once, saved later via Kafka.

- Zoom chat: whoever is connected sees it. Rejoin later: no history.

- If B reloads from the DB in the lag (a Slack client can): ① there, ② gone.

- A worker saves it later; then a reload finds it. Stored late.

- Different guarantees, different architecture.

Three paths carry the same message, "standup in 5", from A to B. Path 1, Slack as this build reads it, saving first: A sends it over HTTP to an API server, which saves it in the database and only then tells the edge server (the WebSocket server), which shows it to B: saved, then shown. Path 2, a hypothetical phone-first app whose phones keep their own copy: A sends it over the WebSocket to the edge server, which shows it to B at once and puts it on Kafka; a worker saves it to the database later, after a lag (about 10 minutes in this example). Path 3, Zoom chat by default: the edge server shows it to whoever is connected, nothing is saved, and a user who rejoins sees no history. Then B reloads the channel from the database during the lag, as a Slack client can: on path 1 the database has the message and it is still there; on path 2 the database does not have it yet, so the message B already saw disappears. Later a worker pulls it from Kafka and saves it, and a reload finds it again: the message was delivered at once and only stored late. Different guarantees, different architecture.

Saved then shown, shown then saved, shown only: synchronous storage, asynchronous storage and none. They are three ways to build the same system, and which one is right depends on how critical it is that a message is saved. A bad idea for Slack is fine for a phone-first app.

The rule to keep

Different guarantees, different architecture.

Choose the road by what you promise about a message, not by which connection happens to be open, and pick the store underneath by the product, not by your affinity to a stack.

§ 6.4

## Why not let the WebSocket server save it?

There is one more reason Slack’s send doesn’t go through the WebSocket. If a message arriving on the WebSocket server had to be saved, that server would call the database, and you want to avoid that.

The servers that hold users’ WebSockets have a name: edge servers (not a CDN edge; just the servers everyone connects to). An edge server already holds a ton of TCP connections, so database calls add load right where it hurts. It sits on the internet, so a database connection string on it is almost public, and if it is compromised, you are gone. And if it goes down, all real-time communication goes with it.

So many companies keep the edge server dumb: it relays messages and holds no database connection; database writes belong on a backend server. A WebSocket is a persistent connection, not database persistence.

Sending is settled: HTTP to an API server, saved, then handed to the WebSocket server to push. Receiving goes over the WebSocket. Which raises the question this whole design was really about: the members of #general aren’t all connected to the same WebSocket server.

Lecture 4, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-another-server ===

# Slack in real time, chapter 7: E is on another server. How does the message get there?

Lecture 4 · Slack in real time · chapter 7 of 10

§ 7

## E is on another server. How does the message get there?

About 5 min

E’s app connected a few seconds after the others and landed on a different WebSocket server. A posts. Before you fix that, notice why these servers deserve the care: whatever a company runs over WebSockets, Discord’s chat or video streaming, is among its most critical features, because the expensive TCP connection stays open instead of being set up again for every exchange. If the WebSocket servers go, real-time chat stops.

[figure title] The Slack design so far

[figure description] The Slack design so far: users A to E, the messages database sharded by channel_id, and four tables. Marked new: A sends over HTTP to an API server, which saves the message, then hands it to WebSocket server ws1, which pushes it to the members over their WebSockets.

[figure labels] new · A · A–E · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · send (http) · api · save · then push · ws1 · the Slack design so far

[caption] Fig 7·aSlack so far. Marked new: the send road, saved first, then pushed.

§ 7.1

## What does each server know?

Start with numbers small enough to draw; change them later and you have the real case. Like every server, a WebSocket server can hold only so many connections. Say it has room for four users. Real servers hold far more.

Channel 1, C1, has five members: A, B, C, D and E. A to D connect first and fill WebSocket server 1. When E connects, WS1 is full, so E lands on WS2. When A posts in C1, B, C, D and E must all get it.

[figure title] Four connections, five users

[figure description] Five users in one channel, a four-connection limit: A to D share WS1 and E lands on WS2. WS1 delivers locally to B, C and D, but nothing reaches E. Under the servers, the membership each one keeps: WS1 has A, B, C and D in C1; WS2 has E in C1.

[figure labels] Channel 1 (C1): · A B C D E · ws1 · limit: 4, a toy number · (real: far more) · 1 · B · A · C · D · ws2 · E · 2 · standup in 5 · sender skipped · 3 · ? · like two friends in · another hotel room · 4 · what each server keeps, in memory: · A→C1  B→C1 · C→C1  D→C1 · E→C1 · the client sends its channels after connecting; · kept eventually consistent

- Assume a WebSocket server has room for four users. Real servers hold far more.

- A, B, C and D fill WS1, so E connects to WS2.

- A’s standup in 5 for C1, saved by the API server, reaches WS1. WS1 knows who is in C1, skips the sender and sends it to B, C and D.

- But E is in C1 too, on another server. How does it get the message?

Keys: ← → to step · link to a step with #fig-7b/step-3

[caption] Fig 7·bEach server’s strip is its connection slots, blue when a user holds one, with a red tick at the toy limit of four. Below the line: who each server knows is connected, and in which channels.

How does WS1 know who is in C1? A WebSocket server built with Socket.IO or similar learns who is connected from the handshake and keeps a local pool. But a message is addressed to a channel, so right after connecting the client sends its membership, “I am in C1, C2 and C3”, and the server keeps it in memory, eventually consistent: the client reports every join and leave and resends its list now and then.

So delivery inside one server is a lookup. But nothing has told WS2 anything. Picture a group of friends having fun in one hotel room while two of them sit in another room down the corridor: how do those two get to be part of it?

§ 7.2

## What is the simplest thing that reaches E?

Pause and think

A to D are on WS1, E is on WS2, all in C1. A posts. What is the simplest thing that gets the message to E?

Two machines can simply talk to each other; you open TCP connections all the time. WS1 relays the message over the link, WS2 sees it is for C1, finds E and pushes it on.

Go to first principles. Routing through an API server would be slow; Kafka between the servers slows things too and needs consumers running; a relay server is one more machine between two that can already talk. The bare minimum is a normal TCP connection, not a WebSocket.

[figure title] TCP links between WebSocket servers

[figure description] WS1 reaches E with one plain TCP link to WS2: it delivers to B, C and D itself and relays the message over the link, and WS2 sends it to E. Then F joins C1 on WS3, WS1 opens a second link to WS3, and F gets it too. Each link costs a server one connection on top of its users.

[figure labels] A · B · C · D · ws1 · E · ws2 · tcp · ✓ · we bridge the gap · 1 · ws3 · F · joins C1 · tcp · ✓ · 2

- WS1 opens one plain tcp connection to WS2 and relays the message. WS2 finds E and delivers. Each server spends one slot on the link.

- F joins C1 on WS3. WS1 opens a second link, and everyone in C1 gets the message.

Keys: ← → to step · link to a step with #fig-7c/step-3

[caption] Fig 7·cBlue is the message, green a delivery; the red slot after a server’s cap tick is a connection it spends on another server.

The rule to keep

Start with the problem, solve it with basic fundamentals, then make it better.

A TCP link between two machines is the bare minimum. Add nothing until the problem demands it.

§ 7.3

## Every server linked to every other. What does that cost?

Keep adding servers and keep linking. Any server may have a member of any channel, so every WebSocket server ends up linked to every other one, however many there are. That is a mesh.

[figure title] Four servers, every one linked to every other

[figure description] Four WebSocket servers in a two by two grid, joined pairwise by six TCP links: the four sides and both diagonals. Every server now spends three connections on its peers, drawn as three red slots after its four user slots.

[figure labels] A B C D · E · F · tcp · ws1 · ws2 · ws3 · ws4 · every server ↔ every other

[caption] Fig 7·dFour servers, every pair linked: six links, the four sides and both diagonals.

Pause and think

Four servers in a mesh, each with four users. What is the real cost of the mesh?

A WebSocket server exists to serve users, and every link in the mesh takes one of its limited connections to talk to another server instead.

You might also suspect latency, fault tolerance or handshakes. None of them is the cost. E and F do get the message a moment later, but it is still real time. A server going down is a fault-tolerance problem, not the cost of the mesh. And each link’s handshake happens once; after that, messages just flow over it.

[figure title] Where WS1’s seven connections go

[figure description] In a four-server mesh, a server with four users holds seven connections, and three of them only talk to other servers. At 100 servers, each one would spend 99 links on its peers.

[figure labels] ws1 · A · B · C · D · ws2 · ws3 · ws4 · the job: serve users · 3 serve no user · just 3 links… · 4 users + 3 peers = 7 · 100 servers → 99 links each

[caption] Fig 7·eWhere WS1’s seven connections go: four serve users, three only reach other servers; under a real cap, that is three users it can’t take.

Why do connections matter so much? Each one costs the server a file descriptor, memory and CPU, so it can keep only a finite number open; they all arrive on one listening port, so the port isn’t the limit, the machine is. You might object that a real server can hold something like a million connections, so a few links are nothing, and on capacity alone you would be right. The point is what they are for. Every new server needs a link to every existing one: 1 link for two servers, 6 for four, 4,950 for a hundred, 99 on each server. All of them are persistent connections held open purely so servers can talk among themselves, none of them serves a user, which is the server’s whole job, and the count grows with every server you add.

It is easy to chase small costs while the big one stands in plain view, like worrying about a small mouse while a dinosaur stands behind you, staring at you. Saying “overhead” isn’t enough: before you jump to a fix, say exactly what the overhead is. Here it is connections. So how do a hundred servers reach each other without spending 99 connections each?

Lecture 4, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-hundred-servers ===

# Slack in real time, chapter 8: A hundred servers, 99 links each. Now what?

Lecture 4 · Slack in real time · chapter 8 of 10

§ 8

## A hundred servers, 99 links each. Now what?

About 6 min

The link from WS1 to WS2 was the right first step: it solved the problem with nothing but a TCP connection. Now make it better.

[figure title] The Slack design so far

[figure description] The Slack design so far: the send road from A over HTTP to the API server, saved, then pushed by ws1 to A to D. Marked new: E is connected to a second WebSocket server, ws2, which ws1 reaches over a plain TCP link.

[figure labels] new · A · A–D · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · send (http) · api · save · then push · ws1 · E · ws2 · tcp · the Slack design so far

[caption] Fig 8·aSlack so far. Marked new: E on a second server, reached over a TCP link.

§ 8.1

## What if each server kept just one link?

Then it needs something in the middle to link to. Drop the links between servers and put a Pub/Sub in the middle; every WebSocket server connects to it instead of to every other server. WS1 is back to its four users plus one link to the middle (in practice a connection or two, 8.2), however many servers there are.

Add a fifth server. How many new links does the mesh need, and how many does the Pub/Sub need?

[caption] Clip 8·1Each new server must link to every other, so the links and each server’s wasted slots climb; a real-time Pub/Sub in the middle leaves one link per server and keeps nothing.

[summary] The clip as text 0:39

- Two servers, one TCP link. WS1: four users plus one link.

- A third server must link to both others: 3 links.

- Four servers: 6 links. 3 of WS1's 7 connections serve no user.

- A fifth server needs 4 more links. Every server links to every other.

- Put a real-time Pub/Sub in the middle: one link per server.

- WS1 publishes once. The Pub/Sub pushes it on and keeps nothing.

WebSocket servers joined in a mesh, then through a real-time Pub/Sub. WS1 holds four users, A to D, and one TCP link to WS2, which holds E. A third server must open a TCP link to both others (3 links), a fourth to all three (6 links), and an illustrative fifth to all four (10 links): every server links to every other. Each link also takes one of the server's connections: with four servers WS1 holds 7, and 3 of them serve no user; with five, 4 of 8. Then all the links are replaced by one real-time Pub/Sub (Redis) in the middle, and each server keeps a single connection to it, so WS1 holds its 4 users plus 1 link. When A’s message arrives (saved by the API server), WS1 delivers it to B, C and D, publishes it once to the Pub/Sub, and the Pub/Sub pushes it to every server connected right now, which hand it to E and F. The Pub/Sub keeps nothing.

It has to be a real-time Pub/Sub, and the idea is very simple: send this message to everyone subscribed right now. It stores nothing; it pushes the message to the subscribers and forgets it, so a server that isn’t connected at that moment doesn’t get it. Redis Pub/Sub is the best-known example, and its documentation says it plainly: delivery is at most once, and a subscriber that drops misses the message for good redis.io ↗.

Why not Kafka? Kafka keeps messages for a retention period and lets consumers pull them at their own pace, which is right for saving messages later. Between edge servers you want the opposite, a push to whoever is connected now, and Kafka would slow that path down. For real time, Redis; for persistence, Kafka. The requirement is real-time Pub/Sub, not Redis itself; any tool that offers it would do.

§ 8.2

## Why should WS3 hear about channel 1 at all?

It shouldn’t. Broadcasting every message to every server wastes work; a message for C1 should reach only the servers that have members of C1.

Redis Pub/Sub has channels of its own, and Slack has channels, so from here on the words are always Slack channel and Redis channel. Give every Slack channel its own Redis channel. When a user connects and says “I am in C1”, its server subscribes to the Redis channel c1. It is the server that subscribes, not the user: the user holds a WebSocket to the server, and the server holds a connection or two to Redis, however many servers there are (a subscribed connection can’t publish, so in practice each server keeps a second one for PUBLISH).

# WS1's subscriber connection, when A connects and says "I'm in C1" SUBSCRIBE c1 # WS1's publisher connection, after pushing to B, C and D itself PUBLISH c1 "standup in 5"

WS1 is subscribed to c1 too, so Redis hands the message back to it. Tag every published message with the id of the server that sent it and have each server skip messages carrying its own id, or have each server remember the ids of the messages it has just delivered and skip those. When A creates a new channel with D, the servers learn about it the same way: a notice through Redis, then a SUBSCRIBE.

[figure title] One message through Redis, then a new channel

[figure description] Lanes for user A, WS1, the Redis Pub/Sub, WS2, WS3 and the API server, time running down. A message for C1 is delivered locally by WS1, published once to Redis channel c1 and pushed to WS2 (and back to WS1, which skips its own message), and WS2 delivers to E and F; WS3, subscribed to c2 only, gets nothing. The message arrives at WS1 from the API server, which saved it. Then A creates channel c3 with D through the API, a new-channel notice goes through Redis to the edge servers, and WS1 subscribes to c3.

[figure labels] A · ws1 · A–D · sub c1 · redis · ws2 · E F · sub c1 · ws3 · G H · sub c2 · api · POST (http) · saved: standup in 5 · 1 · B C D · 2 · PUBLISH c1 · own echo: skipped · pushed, not pulled · c2 only: · nothing · 3 · E F ✓ · 4 · create channel c3 (A, D) · db updated ✓ · 5 · new channel c3: A, D · 6 · I’m in c3 · SUBSCRIBE c3 · ws1: c1, c3 · also: a periodic meta call listing my channels · 7

- A posts in Slack channel C1 over HTTP. The API server saves it and hands it to WS1.

- WS1 delivers to its own C1 members first: B, C and D.

- WS1 publishes on Redis channel c1. Redis pushes it to every server subscribed to c1: WS2, and WS1 itself, which drops its own copy because it already delivered it. WS3 is subscribed to c2 only and gets nothing.

- WS2 delivers to E and F. Minimal connections, and only the servers that need it.

- A creates channel c3 with D: an API call updates the database.

- A “new channel” notice goes through Redis to the WebSocket servers, and A and D see the channel appear in real time.

- The clients tell WS1 they are in c3. WS1 updates its memory and subscribes to c3.

Keys: ← → to step · link to a step with #fig-8b/step-3

[caption] Fig 8·bTime runs down. Lanes: user A, three WebSocket servers with their Slack channels, the Redis Pub/Sub and the API server. Blue is the message, green a delivery; dashed means nobody waits for it.

To carry every organisation on Slack, run a Redis cluster with sharded Pub/Sub (Redis 7.0 and later), which keeps each channel inside one shard; a classic PUBLISH is copied to every node redis.io ↗.

§ 8.3

## How did A get WS1’s address?

One step has been skipped all along. When A opened the Slack app, it connected to WS1. Who chose WS1?

Pause and think

Organisations on Slack have 200, 500, even 20,000 employees. If you could choose which WebSocket server every user connects to, what would you aim for?

Twenty thousand connections are nothing for one WebSocket server. If everyone in an organisation is on the same server, their messages never need Redis at all: the server delivers them among its own users.

So add a small service on top. When a user opens the Slack app, the client asks it “where do I connect?” and gets back the address of a WebSocket server, then connects there. It is a bit like DNS, but it isn’t DNS; it is an ordinary service whose job is to balance connections. Call it the Balancer. It is not a load balancer; it only hands out addresses. Ask it “I am in this organisation, where should I connect?” and it always answers with the same server for that organisation, which keeps the I/O on Redis down to the cases that really cross servers. Those still happen: a user whose organisation’s server was full, as E’s was, and users spread out after a server dies (8.4). That is what Redis stays for.

[figure title] Ask the Balancer, then connect

[figure description] Before connecting, the Slack client asks the Balancer which edge server to use and gets an address back, ws1, then opens its WebSocket to that server. The Balancer keeps an organisation’s users on one server, so their messages rarely touch Redis. The other servers are shown faded.

[figure labels] A · where do I connect? · balancer · 1 · ws1 · 2 · balance connections · like DNS, not DNS · not a load balancer · same org → same server: · Redis only for the worst case · 3 · ws1 · ws2 · ws3 · ws4 · redis

[caption] Fig 8·c① A asks where to connect, ② the Balancer answers with an address, ③ A opens its WebSocket to that server. The other servers are faded.

You might ask: why not a service that tells each server where every message goes? Because a network call per message is far too expensive for real time, and the server can hold that information itself.

§ 8.4

## WS1 dies. Now what?

Not much. Its users lose their connections, ask the Balancer again, and get another server. Noticing that a server is down and moving its users is the Balancer’s job.

[figure title] A server dies

[figure description] Lanes for one organisation’s users A to D, the Balancer, three edge servers and the Redis Pub/Sub, time running down. WS1 dies; its users ask the Balancer again and are spread over WS2 and WS3, so their messages travel through Redis for a while. Later the Balancer regroups them on WS2 and Redis is out of the path again.

[figure labels] A–D · balancer · ws1 · ws2 · ws3 · redis · one org, one server · ws1 dies · 1 · where do I connect? · ws1 ✕ · 2 · A, B → ws2 · C, D → ws3 · 3 · A posts in C1 · B · PUBLISH c1 · C D · Redis carries it for now: fine · 4 · C, D → ws2 · Redis IO back to the worst case only · 5

- WS1 dies. Its users lose their connections.

- They ask the Balancer again. It notices WS1 is gone.

- It hands out other servers. For a while the organisation is split across WS2 and WS3.

- Their messages now go through Redis: WS2 delivers to B and publishes, Redis pushes to WS3. That’s fine for a while.

- Later the Balancer regroups them on one server, and Redis is out of the path again.

Keys: ← → to step · link to a step with #fig-8d/step-3

[caption] Fig 8·dTime runs down. The lanes are one organisation’s users, the Balancer, three WebSocket servers and the Redis Pub/Sub. Red is the failure, blue the WebSocket connections and the message.

Messages crossing Redis for a while is exactly the case Redis is there for. The Balancer can also rebalance from time to time, moving a user’s traffic to another server, to keep Redis traffic low; be protective of that I/O. That is how WebSockets scale: one link per server, each message only where it is needed, most messages never touching Redis. At every roadblock, the fix was the simplest one that worked.

[summary] Go deeper: how Slack actually does it skip unless you want the production version

Slack’s published design differs in detail. Stateful, in-memory Channel Servers own channels through consistent hashing, about 16 million channels per host at peak. Gateway Servers hold users’ WebSockets and subscribe to those Channel Servers. The client first gets its connection details from the web app backend, then opens a WebSocket to a nearby edge region, where an Envoy proxy hands it to a Gateway Server. Slack reports delivering messages worldwide within 500 ms slack.engineering ↗. The shape is the one you built: something in the middle, and servers subscribing to only the channels their users need.

The design now delivers. What it promises when something misbehaves is the next question, starting with the part that keeps nothing.

Lecture 4, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-what-goes-wrong ===

# Slack in real time, chapter 9: WS2 blinked while A posted. Where is the message?

Lecture 4 · Slack in real time · chapter 9 of 10

§ 9

## WS2 blinked while A posted. Where is the message?

About 5 min

Redis pushes a message to whoever is connected at that moment and keeps nothing. Now suppose WS2’s connection to Redis drops for one second, and that is the second A posts in C1.

[figure title] The Slack design so far

[figure description] The Slack design so far: the send road, ws1 with A to D and ws2 with E. Marked new: the TCP link is gone; both servers are linked to a Redis Pub/Sub instead, and a Balancer tells each client which WebSocket server to connect to.

[figure labels] new · new · A · A–D · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · send (http) · api · save · then push · ws1 · E · ws2 · redis pub/sub · balancer · where to connect · the Slack design so far

[caption] Fig 9·aSlack so far. Marked new: the real-time Pub/Sub and the Balancer.

§ 9.1

## What is promised, and what isn’t?

Split the message’s journey in two. The save happened before anything was pushed, so the message is in the database: once accepted, it will always be persisted. The push is a different matter. Redis sends it to the servers connected at that instant, WS2 isn’t one of them, and nothing is kept to send later. So in this system the message is guaranteed to be stored, and the real-time notification is not. For an enterprise product, guaranteed persistence is the part that matters more.

WS2 blinked for one second while A posted. When does E see the message?

[caption] Clip 9·1The clip draws the save on the phone-first road, through Kafka. On this build’s road the API server saves first; the push through Redis is lost exactly the same way. E’s client catches up with a timed fetch of the last 50.

[summary] The clip as text 0:34

- A posts in C1. E is on WS2, across Redis.

- The message is persisted (here through Kafka).

- WS2 is disconnected right then: Redis pushes to no one, keeps nothing.

- WS2 is back, but nothing replays. E doesn't see it.

- On a timer, E's client fetches the last 50 and renders what it missed.

- Persistence is guaranteed. The real-time push is not.

User A posts 'standup in 5' in channel c1 on edge server ws1; user E is on edge server ws2, across a Redis Pub/Sub. The message is persisted, here through Kafka (chapter 6’s phone-first road): ws1 puts it in Kafka, a worker pulls it and saves it in the database. At the moment ws1 publishes it to Redis, ws2's connection to Redis is broken, so Redis pushes it to no one and, keeping nothing, loses it. ws2 reconnects but nothing is replayed, so E's screen is missing the message. Then a timer on E's client fires, a correction job: it fetches the channel's last 50 messages from the API, which reads the database, and the missing message appears. Persistence is guaranteed; the real-time push is not.

A missing message can’t simply stay missing, and the fix uses what you already have. The channel’s history is one REST call away, the same one that loads it when E clicks the channel. So run a small correction job on the client: every so often, fetch the channel’s last 50 messages, compare them with the screen, and render whatever was missed, as if the push had arrived. Fifty covers a blink; a longer gap is filled when the user opens the channel, which loads from the checkpoint (5.4). When sockets drop for longer, another option is to buffer undelivered pushes in Kafka and replay them once the sockets are back.

[summary] Go deeper: saving the same message twice skip unless you run Kafka consumers

On the road through Kafka, a worker that crashes after saving a batch but before recording its position makes its replacement read the batch again, as Lecture 2 showed. Write each message under its unique id, and the repeat is a harmless overwrite kafka.apache.org ↗.

§ 9.2

## A database node dies mid-write. Is the message gone?

A sharded store by itself has no spare copy: if the one node holding a shard dies, so does its data. Important data is stored with standby nodes, typically a replication factor of three, so each write lands on three data nodes and, if one goes down, the others serve it.

Who makes those copies? Not the API server (or, on the phone-first road, the worker) pushing each message to three database instances itself; that is worse. The database’s storage engine does it: the write arrives at one node and is replicated from there. And the database doesn’t say “done” until the copies it requires have the write. A write lost before that point was never accepted, so nobody was told it succeeded. So whoever writes holds the message and retries until the database says done: on this build’s road the API server answers A only after that ack, and on the phone-first road the worker keeps the message until it commits; if the worker dies, the message is read from Kafka again, and the unique id makes the repeat harmless.

[figure title] Ack after replication

[figure description] The writer sends message m42 to node 1, which sends a copy to nodes 2 and 3. Once the copies the database requires have it (DynamoDB: two of the three), node 1 acknowledges the write to the writer, which waits for that ack. A write lost before that point was never accepted.

[figure labels] writer · 1 · write m42 · ack ✓ · 3 · node 1 · 2 · copied to · the replicas · node 2 · node 3 · waits for · the ack · replication factor 3 · says “done” once enough copies have it · DynamoDB acks at 2 of 3

[caption] Fig 9·bAck after replication. The writer sends the message to one node, which copies it to the others; once the copies the database requires have it, the write is acknowledged. A write lost before that point was never accepted.

How many copies count as enough is the database’s rule: DynamoDB acknowledges once two of its three replicas have the write usenix.org ↗, while asynchronous replication, PostgreSQL’s default, acknowledges earlier and can lose the newest writes on failover postgresql.org ↗. Durability comes from the database’s own replicas, not from re-reading Kafka.

§ 9.3

## What may an internet-facing server hold?

An edge server is nothing exotic, a Node.js process running Socket.IO, say, and users connect to it from the internet. Can clients connect to its address directly? Many people expose edge servers that way. You can also put them behind a load balancer, as Slack does: it terminates WebSocket connections on Envoy proxies in regions close to users slack.engineering ↗.

The trade is latency against attack surface. A load balancer adds a hop, a few milliseconds in one engineer’s experience, which matters for ultra-low-latency uses such as streaming a live class; behind it, each WebSocket still stays on one server for its whole life. If the latency is acceptable, use the load balancer; if not, expose the servers. Both are fine, until private channels need a server-side check (9.4).

[figure title] Exposed: the edge server faces the internet

[figure description] An exposed edge server faces the internet directly. It is hardened, ports hidden and SSH blocked, and holds at most a Kafka credential, only if it feeds Kafka and ideally a write-only one; database credentials never sit on it.

[figure labels] public = unsafe? · WS · edge server · kafka conn string · db creds · never here · hardened: ports hidden, no SSH · exposed

[figure title] Behind a load balancer, with a membership check

[figure description] Behind a load balancer the edge server costs a few milliseconds more per hop, the WebSocket stays sticky, and the private edge server can safely ask a membership API, backed by the database, before serving private channels.

[figure labels] lb · edge server · kafka conn string · +3–5 ms per hop · (one engineer’s estimate) · sticky: one connection to the lb, · one to the server · membership api · db · private channels: check membership here · behind a load balancer

[caption] Fig 9·cLeft: exposed, hardened, holding at most a Kafka credential and never a database one. Right: behind a load balancer, a few milliseconds more, and free to ask a membership API.

An exposed server faces a ton of threats, so it is hardened: route tables changed, ports hidden, SSH blocked. And one rule doesn’t bend: an internet-facing server holds no database credentials. The edge server never talks to the database and doesn’t even know what it is. On this build’s road it needs no credential at all; if it feeds Kafka, as on the phone-first road, the most it holds is a Kafka credential, and that is still a secret, so make it least-privilege: allowed to write to one topic and nothing else, with the consumers checking what they read kafka.apache.org ↗. Losing it is far less damaging than losing a database password.

With nothing valuable on the box, the main risk left is a denial-of-service attack; a rate limiter stops some floods, the big ones must be absorbed upstream docs.aws.amazon.com ↗.

§ 9.4

## Can the edge believe the channels a client claims?

Recall how a server learned which channels its users are in: the users told it, right after connecting. Now private channels exist.

Pause and think

Each WebSocket server learns a user’s channels from what the client sends after connecting. Is that good enough to decide who receives a private channel’s messages?

A malicious user can simply send “I’m in this channel, give me everything” and start receiving messages they should never see. That is an authorisation flaw, what OWASP calls broken access control: the client’s word isn’t proof.

The baseline is to deny by default anything that isn’t public, and check membership on the server side owasp.org ↗. Trusting the client is fine while membership isn’t sensitive. When it is, the edge server asks a backend membership API which channels its users really belong to, and it can only do that as a private server behind a load balancer, because calling an internal API takes credentials an internet-facing server must not hold, which is the right-hand panel of Fig 9·c.

Each failure had an answer built from pieces already on the page: a timed fetch, the database’s own replicas, nothing worth stealing on the edge, and a server-side check. Time to step back and look at the whole thing.

Lecture 4, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 10-whole-system ===

# Slack in real time, chapter 10: Step back, then try to break it: delete and reorder

Lecture 4 · Slack in real time · chapter 10 of 10

§ 10

## Step back, then try to break it: delete and reorder

About 7 min

Every piece is in place: tables, a send road, servers joined through Redis, a Balancer, and an answer for each thing that goes wrong. Step back and put it on one page, then try to break it with two features nobody designed for: deleting a message, and putting messages in order.

[figure title] The Slack design so far

[figure description] The Slack design so far: users, the API server and the sharded messages database, two WebSocket servers joined through a Redis Pub/Sub, and the Balancer. Marked new: the client fetches the last 50 messages on a timer, the database keeps three replicas, and the WebSocket servers hold no database credentials.

[figure labels] new · A · A–D · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · send (http) · api · save · then push · ws1 · E · ws2 · redis pub/sub · balancer · where to connect · client: timed fetch of the last 50 · db: three replicas · ws servers: no db credentials · the Slack design so far

[caption] Fig 10·aSlack so far. Marked new: the timed fetch, three replicas, no credentials on the edge.

§ 10.1

## Chat, a badge and a typing dot: one socket or three?

One. Every user keeps one WebSocket open to the backend, carrying anything and everything real-time: messages, notifications, typing indicators, or a live video’s chat and floating hearts. Any service that wants to reach users sends through the edge servers rather than opening its own socket.

Why not one per feature? Each extra socket is another long-lived connection for the server to hold and another for the client to re-establish when it drops.

§ 10.2

## What does the whole system look like?

Two halves, split by one question: is it pushed? Everything real-time travels over the WebSocket to the edge servers, which share messages through a clustered Redis Pub/Sub, with the Balancer deciding who connects where. Everything not pushed, loading a channel, scrolling history, opening a muted channel, goes over plain HTTP to API servers that read the partitioned database, whose schema still rests on its first idea: a DM is a channel with two people.

[figure title] The whole Slack design

[figure description] The whole Slack design: A sends over HTTP to the API server, which saves the message in the messages database, sharded by channel_id with three replicas, then hands it to WebSocket server ws1, which pushes it to A to D. ws1 and ws2, where E is connected, share messages through a Redis Pub/Sub, and a Balancer tells each client where to connect. Tables: users, channels with a type, membership with a checkpoint, messages. The client fetches the last 50 messages on a timer, and the WebSocket servers hold no database credentials.

[figure labels] A · A–D · messages · by channel_id · users · channels (type) · membership (checkpoint) · messages (channel_id) · send (http) · api · save · then push · ws1 · E · ws2 · redis pub/sub · balancer · where to connect · client: timed fetch of the last 50 · db: three replicas · ws servers: no db credentials · the whole Slack design

[caption] Fig 10·bThe whole design on this build’s road: send over HTTP, save, then push. Everything not pushed (loading or scrolling a channel) goes over HTTP to the same API servers.

Only one part of that picture changes from product to product: how the message gets saved. Turn it to the asynchronous setting and the edge server does three things when A sends to B: it puts the message in Kafka, finds B in its local pool and sends it to B, while workers save it later. That is the phone-first road, and you can build Slack that way too, paying with the refresh gap from 6.3. Zoom chat’s setting skips saving. The real-time Pub/Sub, the Balancer and the database stay exactly as they are; the edge servers only gain a write to Kafka.

The rule to keep

One architecture covers almost every messaging system: change only the guarantees.

Swap the persistence road, synchronous, asynchronous or none, and keep the rest. That is how one design gives you something like Slack, something like a phone-first app such as WhatsApp, or something like Zoom chat. There is no single best version: build your own plate from the guarantees you give your customers.

[figure title] Swap the persistence path, keep the rest

[figure description] The overall diagram in miniature: a user, an edge server, the real-time Pub/Sub and the database. How a message reaches the database is a dial with three positions: one, synchronous, through the API server before the edge server pushes; two, asynchronous, from the edge server through Kafka; three, none. It is set here to one, the setting this build uses for Slack. Swap the path and keep the rest.

[figure labels] swap the path, keep the rest · A · edge · api · 1 · 2 · 3 · db · ① sync · ② async · ③ none

§ 10.3

## A user deletes a message. What has to happen?

Does deletion need new machinery to keep the push and the refresh in step? Start from where the message lives.

WhatsApp deletes a message from its servers once it is delivered; an undelivered one is held, encrypted, for up to 30 days while delivery is retried whatsapp.com ↗. The copies that matter are on the phones, so a delete is just one more message, “delete this message permanently”, and each phone drops its own copy. On Slack the message lives in the backend, so you delete the stored row, then tell the channel’s users in real time that it is gone.

[figure title] WhatsApp-style delete

[figure description] Where the copies live on the devices, deleting is an event: a delete-permanently message goes from one phone through the edge server to the other, and both phones drop their own copy.

[figure labels] standup · in 5 · standup · in 5 · edge · delete · permanently · the copies live on the devices · WhatsApp-style

[figure title] Slack-style delete

[figure description] Where messages live in the backend, the stored row is deleted first, then a deleted notification goes out over the edge server to every user in real time.

[figure labels] messages · m42 standup in 5 · api · edge · B · C · ✓ · ✓ · deleted: m42 · delete in the store, then tell · everyone in real time · Slack-style

[caption] Fig 10·cLeft: the copies live on the phones, so a delete event goes to the other phone and each drops its copy. Right: the row is deleted in the backend, then everyone is told in real time.

No new boxes, only a different guarantee: on this design, deletion is a rough estimate of a few hundred lines of backend. What takes time at WhatsApp’s scale is deciding whether and how to do it and rolling it out.

§ 10.4

## Two messages arrive out of order. Whose clock wins?

A sends “hey”, then “standup in 5”, and network delay brings the second to B first. Do you need strict ordering on screen? Nobody said it is required. Ordering matters where messages are processed one after another; a screen isn’t a pipeline, and it can insert a message in the middle of a list.

Pause and think

Which timestamp should decide the stored order: one the sender’s device attaches, or the database’s own?

The device’s clock belongs to the user, and anyone can set it to 1 January 1970 if they like, so a client timestamp can’t be trusted. You don’t need its precision either: a person never sends two messages at exactly the same instant.

The screen then has two easy options. Show messages in the order they arrive, or keep the list ordered by timestamp and insert a late message in its place, accepting a brief flicker. Either way, the stored order is the truth, and a refresh, or the client’s timed fetch of the last 50, puts the screen right.

[figure title] Two out-of-order cases

[figure description] Lanes for user A, the database and B's screen; time runs down. 1: A sends message 1 then message 2; the database stores them in that order by its own clock, t1 before t2. 2: case 1, message 2 reaches B first and the screen shows them as they arrive. 3: a refresh, or a job that fetches the last 50, reloads them in the database's order. 4: case 2, B keeps its list sorted by timestamp and message 2 arrives first. 5: message 1 arrives late and is inserted in place above 2, with a brief flicker. 6: the order is the database's insertion time, never the client's clock.

[figure labels] A · database · B’s screen · time · 1 · m1 hey · m2 standup in 5 · m1 t1 · m2 t2 · t1 < t2 (db clock) · 2 · case 1 · m2 · m1 · m2 · m1 · shown as they arrive · 3 · refresh · last 50 · m1 · m2 · 4 · case 2 · m2 · m2 · list sorted by timestamp · 5 · m1 late · m1 · m2 · flicker · 6 · 01-01-1970 · never trust the client’s clock · the database’s order is the truth

- A sends 1 then 2. The database stores them in that order, by its own clock: t1 < t2.

- Case 1: message 2 arrives first. Show them in the order they arrive.

- A refresh, or a job that fetches the last 50, puts them in the database’s order.

- Case 2: keep the screen’s list ordered by timestamp. Message 2 arrives first.

- Message 1 arrives late and is inserted in place, above 2, with a brief flicker.

- The order is the database’s insertion time, never a client clock.

Keys: ← → to step · link to a step with #fig-10d/step-3

[caption] Fig 10·dTime runs down. Lanes are user A, the database and B’s screen. Messages m1 “hey” and m2 “standup in 5”; t1 and t2 are the database’s insertion times.

The database’s clock works here for two reasons. On the save-first road the insert happens at send time, not minutes later in a batch. And all of a channel’s messages are written on one shard (chapter 5), so one clock orders them; Slack’s ts is likewise unique within a channel docs.slack.dev ↗. Clocks kept per client and merged (vector clocks) still can’t say which of two messages came first without a tie-break, and they cost every client extra work. You don’t re-architect for one edge case.

Design realistic systems. In theory you can find a hundred loopholes in any design; in practice there are a few, and it is fine to live with them. For each, ask how likely it is and whether you really need it. If yes, build it.

§ 10.5

## What you can now do

- Answer “NoSQL scales”: which database, for what workload, what did it give up? Without foreign keys, relational data spreads the same way. The usual trade is CAP’s consistency, not ACID’s.

- Pick a family, or a layout, by its trade. Key-value: one key per operation, thousands of partitions. Document: queries and partial updates inside, fewer partitions. Column layout: 2 of 100 columns read, analytics only. Graph: real graph algorithms only.

- Choose SQL or not: correctness first, SQL; a gigantic ingestion rate, a store built for it. For Slack’s messages, any database you can shard, sharded by the key every operation uses (channel_id).

- Model chat without special cases: a DM is a channel with two people; membership holds the checkpoint behind unread counts.

- Decide the send road by the guarantee: saved then shown, shown then saved, or shown only. No database credentials on the edge.

- Scale WebSocket servers: one link per server to a real-time Pub/Sub, one Redis channel per Slack channel, a Balancer that keeps an organisation together. A timed fetch covers lost pushes; the database’s clock sets the order.

Why does a key-value store split into thousands of partitions more easily than a document database?

[summary] Show answer

Every key-value operation names one key, so it lands on one shard. A document database allows ranges and IN, which can touch many shards and wait for all of them.

Slack sends a message over HTTP even though a WebSocket is open. Give two reasons.

[summary] Show answer

The guarantee this build gives: a message is shown only after it is saved, since a refresh reads the database and an enterprise needs the record. And the edge server stays dumb: saving through it would put database calls and credentials on a busy, internet-facing server.

Four WebSocket servers in a mesh, four users each. How many of WS1’s connections serve users, and what replaces the mesh?

[summary] Show answer

Four of its seven; at 100 servers the fleet holds 4,950 links. A real-time Pub/Sub in the middle replaces the mesh: one link per server.

WS2 is disconnected from Redis for the second A posts. Is the message lost, and how does E get it?

[summary] Show answer

It is stored, because the save happened first; only the push is lost, since Redis keeps nothing. E’s client catches up on its next timed fetch of the last 50, or when E opens the channel.

§ 10.6

## Build it, then open the load balancer

Don’t take any of this at face value; the devil lies in the details. Write the hello worlds: a Socket.IO server, a Balancer that hands out addresses, and a local Redis with three clients subscribed. Disconnect one, publish, reconnect it, and watch the message never arrive. Every single thing in system design is implementable, though a real first version takes time: one team of three needed three and a half months for its real-time text chat, with this analysis already done.

One box in this design was never opened. Load balancers sat in front of the API servers, and one may sit in front of the edge servers, but each was only ever a rectangle. Building a basic one is surprisingly simple, and satisfying. Lecture 5 opens that box, starting from one process on a laptop that copies bytes between two connections. So what does the program inside that rectangle actually do with each byte, and what happens to your users when the machine running it dies?

Lecture 4, chapter 10 · facts checked against primary sources, linked where they come from outside this lecture.
