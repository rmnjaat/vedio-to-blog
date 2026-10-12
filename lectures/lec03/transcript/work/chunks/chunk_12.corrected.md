**[02:09:20] Teacher:** Right? They can be at max 2 raise to 13, which is 8192. And per shard sequence number like static count.

<!-- topic-candidate [02:09:26]: Instagram IDs with stored procedures (PL/SQL) -->

[02:09:26] But now what Instagram does is brilliant. What they do? They use stored procedures. Things we neglected in college, PL/SQL, no one studied that. Stored procedures, what are they? We are not going to use it. We write raw SQL queries. What Instagram did is something really fancy, really basic. I did study this in college, but never thought it would be used in this way. PL/SQL. I loved PL/SQL, stored procedures and triggers and whatnot, but see how beautifully they're using it.

[02:09:56] So their photos table. So as I said, there are multiple physical servers in which there are logical partitions or logical databases that you're creating. Each database has same set of tables with same set of schemas. For each partition that it has table photos, it creates something like this. So create database Insta 5, create table Insta 5.photos. Schema of the photos table, other column, whatever you want to put it. But ID column looks something like this. ID, big integer, not null, default. Default value is, when you don't provide any value, the default value is this. This is a function called, a stored procedure, a function. Insta 5.next ID. So, when you are inserting a photo in the table, if you don't provide an ID, invoke this function. That's what it is doing. When you don't provide an ID while inserting the photo in this database or in this table, invoke this function, whatever the output is, use that as the ID.

[02:11:00] Now what this function is? This function is this. Create or replace function insta5.nextID. has its own next ID function because it is on fifth shard. I'm having those five five five suffixed everywhere. So next ID of this data, next ID, oh sorry, next ID of Insta 5, photos table of Insta 5, create database Insta 5. And how I'm defining this function is like this. Insta 5.next ID is the function name which outputs result which is of type big integer and it declares four variables. First is an epoch variable of type big integer and this is the value which is 1st January 2011 epoch timestamp, epoch millisecond, and sequence id something, now millisecond big integer something, shard id is 5. This 5, this 5, this 5, same, right? It's hard coded there. This is for shard id 5. Similarly you have to run the same, you have to create this stored procedure for every single database that you have, right, as an example.

[02:12:09] Now, this is the business logic. This is actually how you create a Snowflake ID. So what you do? Every database has a sequencer. Like how does database generate auto-increment IDs? Behind the scene, there is a sequencer or a sequencing algorithm whose job is to obviously table sequence. There are multiple names for that, but basically sequence is what you hear the general job. So you create a sequence which atomically increments and spits out the ID. Increments, simple. Every time you invoke it, it increments. So you invoke a function called next one, it's a standard function, [?nextval | asr: "next well"] [?insta5 | asr: "insta pi"] dot table id sequence mod mod 1024, by 1024, 2 raise to 10. This is limited by 10 per shard sequence number, right? So no matter how many transactions come in, this will be an atomic increment and you do mod mod 1024, so it restricts it to 10 bits as sequence ID. So it stores it in this sequence ID over here. Right.

[02:13:09] Then you get now millisecond. Now millisecond, you get normal epoch millisecond of your current database. Right. Now you want to create, what you want to create? Snowflake ID. So what do you do in result, which is a big integer? You first 41 bits is what? Epoch millisecond since your custom epoch, which is 1st January 2011. Now millisecond minus epoch left shift by 23. So you compute a time left shift by 23. When you left shift by 23 you would set the first 41 bits to be epoch milliseconds. Then the next is shard id. You have a shard id which is 5. Result equal to result bitwise or shard id left shift 10. So next 13 bits are set to 5, which is shard id. And then you do result equal to result or sequence id.

[02:14:07] And every time you invoke this function, or every time you insert this photo without passing in any id, it triggers this particular function which generates the Snowflake id, returns it as result, which gets inserted in this table. Instagram does Snowflake ID in the database [?stored procedure | asr: "code procedure"]. Highly, highly, highly recommend you to implement this. Don't just look at it in theoretical side. Very easy to implement. Just start your favorite server, MySQL, Postgres, anything, and write this and see how beautiful this implement is. [unclear: "Post on"] the previous batch did it and they found it. They were so amused when it first tried because it's so easy. It's so easy. It's so efficient because now you don't need to have logic on the API side, all offloaded to database. You just do normal insert like you always do without passing an ID. Earlier, [unclear: "if you don't buy you to"] auto increment. Now, instead of auto incrementing, it would invoke this function. Problem solved. This is such a beautiful thing that Instagram does. It still does that. You can still see Insta post having integer IDs, which are Snowflake generated exactly like this. Right. Okay. Any questions on this?

<!-- topic-candidate [02:15:18]: Q&A on Instagram IDs and sequencers -->

[02:15:23] Rajiv.

> **Student Question [02:15:25] - Student 1 (Rajiv):** In this line, [unclear: "under dot table underscore added or sequence"], this should be a column on Insta five, right?

**[02:15:32] Teacher (answer):** No, no, no, no, no. This is not a column. This is basically depends on database. It is not need to be a column. It's a sequencer.

**[02:15:39] Student 10:** Okay. Okay.

**[02:15:41] Teacher:** So you can create as many sequence. By default, when you create an ID column with auto increment, it creates a sequence. It basically creates a sequence behind the scene with a unique name and it assigns it internally. You generate new IDs, it just does a [?nextval | asr: "next file"] and gets a new integer and it uses it as the ID for that row that you're inserting. Here we are just replacing the default one with this. So this is what you would basically custom create as a new sequencer. I don't need it. It's an auto incrementing sequence. Like how auto increment IDs are similarly. You don't need this to be a separate column.

> **Student Question [~02:16:14] - Student 1 (Rajiv):** One more question. We just lifted the logic from API server and just substituted and put it in a DB, right? Apart from logical partitioning, we just lifted and placed the logic in DB, which, which means that we are like abstracting the logic inside DB, DB takes care of this.

**[02:16:29] Teacher (answer):** So now you have large number. You can have more than 10,000, 50,000 API servers also.

**[02:16:34] Student 1 (Rajiv):** Okay.

**[02:16:35] Teacher:** There's no limit. Twitter is limited by that now. Twitter can only have two raised to 10 API servers.

**[02:16:42] Student 1 (Rajiv):** Because of machine IDs. Okay. Yeah. Yeah. And we have a lot, we have a lot many partitions. Correct.

**[02:16:51] Teacher:** And here we have [unclear: "bottleneck five"]. We can have at max 8,000 logical databases, which is huge number, 8,000 databases. What can you do?

**[02:16:59] Student 1 (Rajiv):** Yeah. Scaling actually helped you. Okay. I understand. Right.

**[02:17:03] Teacher:** So, Pankaj.

**[02:17:05] Student 3 (Pankaj):** Yeah.

> **Student Question [02:17:06] - Student 3 (Pankaj):** So, across machines, how are we comparing the IDs? It's just that one, if the machine ID 1 and machine ID 2 are generating at the same time, one is given priority.

**[02:17:17] Teacher (answer):** Is that one is smaller, two is larger.

> **Student Question [02:17:19] - Student 3 (Pankaj):** Okay. And that machine ID is like we are giving it by default.

**[02:17:24] Teacher (answer):** Yeah, [unclear: "that any machine that can get separating"]. Another, let's say ZooKeeper is assigning you IDs when your machine spins up.

**[02:17:30] Student 7:** Okay. Okay. Yeah.

<!-- topic-candidate [02:17:34]: Wrap-up of ID generation -->

**[02:17:34] Teacher:** Okay. By the way, that's all what I wanted to cover as part of ID generation. Implement every single thing, [unclear: "that begins easy"] to implement. It's nothing fancy over here, but you can very easily implement and see these things working in action. It's really easy, but do that. You'll have fun implementing all of this, and trust me, because I implemented, I got much deeper understanding of how they are doing what they are doing, what advantages, what disadvantages, logical partition that we discussed, logical databases, why do they need export and dump and load and shard and whatnot. [unclear: "not do that one life"] engineering is all we have, would help us thrive in our careers, [unclear: "but not good"].

<!-- topic-candidate [02:18:14]: Q&A - monotonic IDs, Snowflake vs auto-increment -->

**[02:18:14] Teacher:** Any other questions, anyone? Yeah, rajin [check: name spelling - Rajiv?].

> **Student Question [~02:18:14] - Student 1 (Rajiv):** One more, I just talked, I mean, bit earlier that if we want to number the, number the IDs, we have some logic in which, I know networks are unreliable, the time we insert in database is time we get, right, where the entry call got in. But with this approach, Snowflake and all those things, do we guarantee that the inserts in DB will always be monotonic? I mean, if we have a business case where we want to serve that project.

**[02:18:48] Teacher (answer):** What do you mean monotonic? Snowflake is not monotonically increasing. It does not guarantee strict monotonic. If you need strict monotonic, auto-increment is the way to go. And you can still see something's out of order. That's okay. Social media app like Instagram and all, does it, do you really care about it? Not much, but a financial application where you're listing the transactions. Imagine bank, would bank use Snowflake ID? No. Right. You need strict order in which the transactions have happened. Auto increment is the way to go for them.

**[02:19:22] Student 10:** Okay.

**[02:19:25] Teacher:** Yeah.

> **Student Question [02:19:27] - Student 6:** But I wanted to clarify my understanding of this, which is Insta5.table ID sequence. model. So my understanding is that for every table, we have a sequence ID that is generated

> **Student Question [02:19:43] - Student?:** when we create that table and then we are.

**[02:19:46] Teacher (answer):** No, that is done when you have an auto increment ID column. Then otherwise you can explicitly create any sequencer that you want with any name. With any name.

> **Student Question [02:19:56] - Student 6:** And that sequencer is doing this responsibility of.

**[02:20:01] Teacher (answer):** Atomically increment. It's, it's responsibility. When you invoke [?nextval | asr: "next well"], it atomically increments it and returns with the value.
