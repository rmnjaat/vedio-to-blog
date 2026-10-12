# Lecture 05 - Relational databases, pessimistic locking (airline check-in demo) and a key-value store on a relational database

| | |
|---|---|
| **Source** | lec05.merged.json |
| **Duration** | 03:21:42 |
| **Speakers** | Teacher (TEACHER; some STUDENT_8 / STUDENT_13 / STUDENT_17 turns relabelled, logged); Student N (STUDENT_N, N = 1-16, 19, 20; names only on turns right after the teacher calls them: Student 1 (Rahul), Student 6 (Anamol), Student 9 (Rajiv), Student 10 (Mohit)); `Student?` / `Teacher?` = uncertain. Diarization labels STUDENT_1, STUDENT_2 and STUDENT_6 appear to mix several students. |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 363 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 190 (TERM? 74, UNCLEAR 52, CHECK 48, SPEAKER? 14, MISSING 2) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS, retention 99.49%, additions 0.40% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:02] Agenda and relational databases
   - [00:02:02] Relational databases and finance
2. [~00:05:47] Pessimistic locking
   - [00:07:18] Shared lock and exclusive lock - why we need locking
   - [00:09:08] Deadlocks
   - [00:14:43] Shared lock and exclusive lock in databases
   - [00:21:57] Skip locked
   - [~00:24:03] No wait
3. [00:27:32] Airline check-in system demo
   - [00:32:35] Approach 0 - basic booking
   - [00:35:48] Approach 1 - random seat
   - [00:37:20] Approach 2 - 120 goroutines, random seat
   - [~00:40:24] Approach 3 - order by ID limit one
   - [00:49:38] Approach 4 - pessimistic locking with for update
   - [01:00:02] Running approach 4
   - [01:05:01] Approach 5 - skip lock
4. [01:08:25] Fixed inventory plus contention equal to locking
   - [01:09:07] Examples - COVID portal, IRCTC, BookMyShow, flash sale
5. [01:11:00] Questions - how locking is implemented, holding a seat during payment
6. [01:26:52] Break *(admin)*
7. [01:33:31] Distributed key-value store on a relational database
   - [01:35:40] Storage - schema
   - [~01:41:15] TTL and expired at
   - [01:46:12] Delete
   - [01:50:50] Insert
   - [01:52:10] Put and insert conflicts
   - [01:55:37] Upsert
   - [~01:58:25] Get and key expiration
8. [02:02:59] Implementation on a single MySQL node
   - [02:04:38] Put - upsert and concurrent puts
   - [02:06:29] TTL - batch deletion with cron job
   - [02:08:02] Lazy deletion - in-memory databases
   - [02:11:57] Redis expiry - sampling algorithm
   - [02:19:43] Delete micro-optimization
   - [02:22:17] Questions on TTL and delete
9. [02:27:36] High-level architecture - KV API, replicas, sharding by range
10. [02:36:55] Q&A
   - [02:51:57] ORMs
   - [02:56:39] Java vs Golang (JVM)
   - [03:01:30] Upsert vs select top 1 1
   - [03:04:48] Lock wait timeout exceeded
   - [03:06:18] Soft delete vs hard delete, B+ tree rebalancing
   - [03:07:36] Redis lazy expiry vs cron job
   - [03:09:28] Online/offline indicator - push vs pull, WhatsApp Web heartbeat
   - [03:12:00] Real KV stores vs KV store on a relational DB
   - [03:15:29] Why databases do not provide soft deletion
   - [03:19:11] Tomorrow - scaling WebSockets *(admin)*
   - [03:19:38] Implementing the previous week's assignment

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

<!-- chunk_01 00:00:02-00:11:34 -->

## [00:00:02] Agenda and relational databases

**[00:00:02] Teacher:** Great. Week second, day first. Today, we'll be discussing a ton about relational databases because they are the heart and soul of entire business. No matter how many NoSQL comes in, no matter how many MongoDBs, Cassandras, and DynamoDBs come out, relational databases hold a really special place. Really special place because they form the raw foundation of how data is. Databases should be structured, what kind of guarantees they can provide, like they are world strictest databases out there. So the agenda for today is relational databases. We understand briefly and we all have used it, so would not spend a lot of time, but where we would be spending a lot of time is around understanding locking, especially pessimistic locking. This is one of the most neglected topics, if I may put it, of all time, and when it comes to databases, I don't know why people scared of this. It's one of the best things out there, it's one of the best features out there, it helps you understand so many things.

[00:01:04] Now we'll first cover a bunch of theory around locking, then we'll see a live demo of how you implement it, how you get benefits out of it. So [unclear: "by and we"] in order to understand it, we'll build an airline check-in system, right? We'll actually code it out, we'll actually see it in action, we'll actually see how locking impacts everything and what kind of... and how they actually do it. This will be the first half. Then we take a break for five, six minutes and then a huge discussion around key-value store on top of relational DB. So the entire focus will be on relational databases only. So we'll build a key-value store on relational DB, which means that we want to have a key-value store like thing, but on the backend, we will be having a relational DB. So it would help us solidify our understanding around relational DB and key-value store in general. Okay, so that's the agenda for today. Let's start.

### [00:02:02] Relational databases and finance

[00:02:02] Relational databases, you all know that. It's stored and represented in rows and columns. And the key highlight of that is relations, because of which they are called relational databases. Now these relational databases are special because they started, like they made everything what we see today possible. Because relational databases were so good, they were so reliable, everyone started using it. People found different applications to build on top of that. And they are right now the backbone of our entire internet.

[00:02:41] So always remember, whenever a new thing comes up, a new revolutionary technology comes up, it would always find its first set of application in the domain of finance. Always, always. For example, when computers first came up, they, like, people used it for what? Computation. That's what it's called computers. People, the first set of applications that were ported on computers, but what? Spreadsheets. Right? Spreadsheet was one of the first, basically it was called ledger. And I used to, like, my father used to do a black and white screen. There's a tool called TW, which was for typewriter. And then one was for ledger. I basically forgot the short form of that. And he used to punch in numbers onto that and just do the accounting part. So you'll always see this.

[00:03:35] Then now if you see last year when there was hype of blockchain, or rather since 2012 when blockchain was introduced, the first set of applications that it found was around money. Whenever something new comes up, you'll always find, whenever something new foundational comes up, you'll always find the first set of applications being adopted as financial applications, accounting and whatnot. Relational databases are also meant to do that exact same thing. That's why you see rows and columns as the structure. So keep an eye on those. Whenever something foundational comes up, you would always see this pattern. There is nothing magical about it because humans, because our entire society runs on money, we can't help it. Okay.

[00:04:19] Given that relational databases were were conceptualized to make financial applications possible, they had to provide very strong guarantees because it was dealing with money, which is why ACID became the core part of this database. Because what it led to was the fact that we cannot lose our data. You cannot lose a transaction. Whatever you write has to be correct. You should never get corrupted. Multiple people should be able to update it, are, which is exactly what transaction becomes the part and parcel, the core component of relational databases. Because they were the first ones to deal with financial data.

[00:05:04] So in the pre-reads, I shared four articles written by me on A, C, I and D. If you have not read it, you should read. Pre-reads are meant to read. I spend a lot of time doing that, curation and all. In most cases, I have written it. Read that if you haven't, in case you don't know about them. Apart from that, in a pre-read, I also shared a video how indexes make database read faster. Watch that if you haven't already. Tomorrow, a new video will come up. It is members-only video on YouTube on why databases use B+ tree. So in case you are interested, go for that. But all in all, relational databases are really important for you to know and understand and use it well. And I'll make you fall in love with relational databases by end of today. 100 percent.

## [~00:05:47] Pessimistic locking

[~00:05:47] Okay, so enough of this background, let's jump into pessimistic locking. Now this is where it gets really interesting, because database column column everyone can create, the crux part is how to do locking, why do you do locking, why do we need locking. So relational databases, most, most, name all relational databases, MySQL, Postgres, Oracle, pick your favorite, right? What they do is they give you those constructs that allow you to ensure that your data does not look corrupt. One of the ways to do it is with database locking, which is pessimistic implementation.

[00:06:26] Now a pessimistic implementation always goes something like this. Whenever you are updating a critical section, you want to do a critical thing. For example, updations. You want to update a row. So while you are updating a row, you have to ensure that other transaction is not updating the row at the same time, because it's a critical row, count plus plus is not atomic operation. So when you are doing it, when you are updating a certain row, you don't want any other transaction to do anything with that row. Classic case, classic locking case. So what do you do? You wrap it with locking, right? So you, all the transaction would have to wait to acquire the lock, then do the critical action and then release the lock. Once the lock is released, other transaction would be allowed to do this operation. So this is a classic pessimistic locking implementation. Very classic. Okay.

### [00:07:18] Shared lock and exclusive lock - why we need locking

[00:07:18] There are two types of locking strategies. Pessimistic locking strategies. First is shared lock. Second is exclusive lock. Now here, before we jump into shared lock and exclusive lock and see them in detail, we need locking, like, first we need to ask this question: why do we even need locking? It's just that, is it only because I don't want, only I want only one transaction to do something at a time? So then wouldn't it slow down the throughput and all? Yes, it does affect, right? So when you are having a row that two transactions would want to update at the same time, for example, clap count on Medium, two people clapped at the same time, right? You want [?at the end | asr: "at then"] to be count equal to... How do you ensure two transactions both doing count plus plus? If both read the same old value, both updated, then the final value would be count plus one and not count plus two. You want that to be count plus two.

[00:08:14] So this is where you need to have the correctness of data is more important than throughput. That's where locking comes in. You cannot have an incorrect data in your database because not all use cases need that. By the way, some use cases do need this. So where you have to protect the sanity of the data, where you have to protect the correctness of the data, that's where you have to take locks before you update a particular row. As simple as that. And in some cases, where correctness may not be important, skip it. It's okay to skip it. But where the correctness of data is important, you have to ensure that you are taking the necessary locks that allow you to have your database moving from one consistent state to, or one correct state to another correct state. Okay.

### [00:09:08] Deadlocks

[00:09:08] Whenever you hear pessimistic locking, a very interesting side effect of it that comes out of the box, that comes unannounced, is deadlock. A classic case where transaction T1 wants a lock on row one. Row one is locked by transaction T2. Transaction T2 wants a lock on row 2, but row 2 is acquired by T1. Now this way, no one moves forward, because this is a transactional deadlock. You would have [?studied | asr: "started"] in operating system. That same thing comes over here. So pessimistic locking is great. But always know this fact that whenever you add pessimistic locking, you are risking a deadlock. Always. Always. You never know how threads are scheduled. You never know who is waiting on what.

[00:10:01] So whenever you write a code, whenever you write a SQL query, whenever you're taking locks, be it [unclear: "here"], Java, pick your favorite language, wherever, see a potential case, wherever you're locking something, where you are blocked on something, always see a case where, hey, can it lead to a deadlock? Try to arrange your statements, try to arrange your lock, acquisition and release such that it can really enter a deadlock or not. If it does, then ensure that you are protected against it. Like we will spend some time talking about that as well. But transactional deadlocks are killers. They stall your database.

[00:10:42] If your database goes into a deadlock state and your database cannot recover, because of which what most databases do, and most as in most popular databases, MySQL, Postgres, Oracle, is they do not let the database enter a deadlock state, which means that, let's say, if it saw that transaction, if it saw the transaction T1 wants a lock on row 1, row 1 is locked by transaction T2, transaction T2 wants a lock on row 2, and now let's say row 2 is now acquired by transaction T1. Transaction T1 just fired a statement where it said, hey, I want to acquire lock on row 2.

<!-- chunk_02 00:11:34-00:24:53 -->

**[00:11:34] Teacher:** Whenever your database assigns, like locks a row for a particular transaction, it runs a deadlock detection algorithm. So every time you're locking a particular row, your database would run a deadlock detection algorithm. Out there it would run a deadlock detection algorithm whose job is to see that, hey, if I acquire this, if I let this transaction even acquire a lock on row 2, would my database go in and go into a deadlock? Deadlock detection is simple: whenever you have a cyclic path in it, it's a deadlock. So here what would happen is, as soon as the database would see that if I make transaction T1 get lock on row 2, what would happen? My database would go in a deadlock state. I don't want that to happen. So whenever such situation comes up and your database detects that in case it allows this transaction to acquire a lock on this particular row it would go in a deadlock. So then the transaction, in this case your transaction T1 is acquiring a lock on row 2, your transaction will kill itself.

[00:12:48] So the transaction that is firing the query, because of which, or when a transaction is trying to acquire the lock because of which your database can go in and can enter into a deadlock state, that transaction will be killed by the database engine. This way, your database engine ensures that there is never a cyclic dependency formed in the system. It would never let this edge pop up. Never. So you can very easily mimic this locally, very easily. Just start two transactions, have two rows, acquiring lock, acquiring lock. And you would see that when you fire the final SQL query, when you are trying to acquire the lock by other transaction, that transaction, that fire that query would be killed. Right? As simple as this. So this is how your database protects itself from entering into a deadlock state. Because as soon as a database, if your database enters the deadlock state, everything is stalled. Nothing would move forward. The only way to recover from that is to reboot the database, which means downtime. So your database would never let that happen. So what it does, it never lets this edge form at all.

[00:14:00] So this is where deadlock detection algorithm, what we studied in computer science, all of that come handy. Core computer science is not going anywhere. No matter how many React comes out, core computer science is core computer science. This is not just for databases. This is for operating system threads. This is for distributed transactions. Everything you pick. Deadlock detection, deadlock prevention, [?super critical | asr: "supercritic"]. So this is how your database behaves when there is deadlock, or like how it protects deadlock. When we look at demo, you would automatically understand how to mimic this locally in case you are not dead [check: "not dead" - possibly misheard]. Okay.

### [00:14:43] Shared lock and exclusive lock in databases

[00:14:43] Now let's talk about the locking strategies that we're talking about, shared lock and exclusive lock. Now here in most databases, you would find two types of locks. First are shared locks, but they are also called as read locks. And there are exclusive locks, also called as write locks. So what shared locks do is, first let me directly jump into the SQL query. So if you are writing a SQL query where you want to, let's say you want to acquire a shared lock on a particular row. What do you do? You write your normal select statement and just end it with for share. As soon as you end your statement with for share, what a database engine would do is whichever row matched here in this SQL query, your transaction will get a shared lock on those set of rows. So for example, if let's say I have this six rows and what I want is I want transaction one to take a lock, shared lock on one, two and six. I would [missing ~00:15:45-00:15:53] executes successfully, transaction T1 would have shared locks on row 1, 2 and 6. Right. Okay.

[00:16:02] Then let's say I have another transaction who wants to acquire lock on rows 3, 4 and 6. Now here what would happen? But fire the statement, select where user ID in 3, 4, 6 for share. Right. So now here it would also get a shared lock. But it would get shared lock of 3, 4, 6. But now what's the behavior? Now what's, like, why would we want to do that? So shared lock. Shared locks are read locks, which means that it reserves. So when a transaction acquires a shared lock on a particular row, the transaction having that lock, it would be allowed to read the row. Similarly, if it's a shared lock, other transactions are also allowed to read the same row. So this, which means that when one transaction is having a read lock on it, other transactions are allowed to read them. But if other transaction is trying to modify this row, it would not be allowed to do so.

[00:17:09] So for example, if my transaction 1 came first and it acquired the lock on 1, 2, 6, then transaction T2 came, it acquired, it tried to acquire a lock on 3, 4, 6, and if it tries, if the transaction T2 tries to update these rows, it would have to wait, because row 6, the read lock on row 6 is with transaction 1. So transaction 1 has the right to modify. Transaction 1 is allowed to read and modify the row, while transaction 2 is allowed to read the row but it cannot modify. So if it tries to modify, it would have to wait until transaction 1 is either complete, or it is either committed or aborted. This way you get very high read throughput, because for a read-only use case you don't want, if one transaction has acquired the lock on one row, they are not even allowing read to happen. This allows other transactions to read the data and not modify it. So when you are using shared lock, you get very high read throughput. Given that you don't want other transactions to modify it. So this is what happens when you are taking a shared lock on a particular set of rows.

[00:18:32] Okay, now what happens when a transaction tries to modify it? Let's say, let's say transaction one is having the read lock on row one, two and six, so this command completed successfully, transaction one has read lock on one, two and six. Now what would happen if my transaction one itself tries to modify those rows? So in that case, read lock gets elevated to an exclusive lock and then only modification happens. So whenever a transaction wants to update a particular row, it has to take an exclusive lock. So here elevation from shared lock to exclusive lock happens implicitly. You don't have to do anything, it happens implicitly, right? But in any case it has to do that. We'll see action, you'll, you'll basically get what I say.

[00:19:28] Okay, so this is about read locks or shared locks. Then there are other class of locks, which are exclusive locks. Now exclusive lock is the, is really strict, where it does not even allow other transactions to even read the locked rows. So for example, if now, how do you take that? Select star from, for update. When you end your SQL query with for update, it [missing ~00:19:53-00:19:56] are selected as an output of the select query take an exclusive lock on that. Now this means that if I have the same query with for update, row 1, 2, 6, 1, 2, 6, and if this are completed successfully, I'll get the exclusive lock on rows 1, 2 and 6. This way what happens is, transaction, any other transaction is not even allowed to read row one, two and six, let alone, like, do anything with that. It is not even allowed to read the rows, let alone modify, right?

[00:20:30] So if at the same time, or even after sometime, until the lock is released, there is another transaction that came in that tries to read the row, but three, four and six, this SQL query would not complete. Why? Because it is wanting to read a row 6 which is locked by transaction 1 at this moment. So this SQL query would not complete. It would wait and wait and wait until my first transaction either commits or aborts. Now this gives you exclusivity on the set of rows. So 1, 2 and 6, transaction 1 has exclusive rights on that. If I would not have passed 6 over here, then this statement would have completed and would have three and four. But because there is six over here, now what is happening is, because of this six, this SQL query execution would have to wait until the first transaction either commits or aborts. This gives you [?exclusivity | asr: "exclusive error"]. Because you are not even allowed, this statement would not even complete, which means you cannot even read the rows or modify the row. It severely impacts the throughput, but where you need exclusivity, you have to do it. So SQL queries, or rather SQL, they give you shared locks and exclusive locks out of the box, and they help you ensure the correctness of your system in case of concurrent transactions. Okay.

### [00:21:57] Skip locked

[00:21:57] Just an extension through that. Skip locked. So for example, there is a chance where, for example, here, take a look at this. I want lock on rows 1, 2 and 6. Transaction 1 fired. It got locks on rows 1, 2 and 6. When transaction two came in, it wanted lock three, four and six. Now what if, now here I can, if I would have just passed three and four, I would have completed the SQL query and would have moved forward in this transaction. But because of this six, I'm not able to move forward. Now there might be use cases, which we'll see in some time, where it is okay for you to skip the locked rows. For example, if my transaction 1 wants 1, 2 and 6, transaction 2 wants 3, 4 and 6. But it is okay if I don't get all these three rows. I just want these two rows. Like, whichever rows that are not locked, I wanted. I want to skip the locked rows. Then I have this construct where I can say, select for update, skip lock.

[00:23:09] So when I say skip lock, it means that whatever rows I'm trying to get over here, if any of those rows are locked by some other transaction, skip them. Which means that on a best effort basis, it, this command, if I would have written skip locked over here, this transaction would have moved forward and I would have gotten only rows three and four. If that's okay for my use case, that's okay for my use case. So you may not have to wait every time for every single row to be available. But there are some cases where you have to wait, where you need all these three rows there. So then you have to wait. There is no other option. But in some use cases, it is okay for you to skip the locked rows and work with whatever you have. In that case, you can just write skip lock and move forward.

### [~00:24:03] No wait

[~00:24:03] Another extreme of skip lock is no wait. But for example, your use case dictates that, hey, when you are firing a query, in case any of the row is locked by any other transaction, kill myself. You don't want to wait. If you wait, your throughput would go down. It's your use case. You don't want to wait. If, like, for example, if you know that some transaction has picked that row, it would process that. And you don't have to do it. So you can kill yourself. Because now you have no reason to exist. Like, that transaction is going into existential crisis. That, hey, someone else is doing it. Why should I do it? So you kill yourself. So in that case, you do no wait. So where do you say that? If for your use case, if some other transaction has locked the rows that you were interested in

<!-- chunk_03 00:24:53-00:37:03 -->

**[00:24:53] Teacher:** To, and you don't want to wait, you kill yourself and then maybe retry and all, depending on your business. But this is that hardcore construct that you need to know, where you, it's okay for you to crash yourself just because someone else took that, right? A classic weird mentality, but how, there are use cases where you need to do no wait. And why this is, like, why this even exists? Because, because it helps you ensure that you are not waiting, because if you don't give anything, a transaction T2 will wait for you to acquire the lock. And then waiting, let's say your SQL query timeout is, let's say, 10 seconds. So it would wait for 10 seconds unnecessarily. That would choke down entire performance of the database for that thread. Plus your client would have to wait unnecessarily. If your use case says that, hey, if the row is locked, I don't care. Kill yourself. Right. So then you do that.

[00:25:51] So these are basic constructs. Theory, now we look at practical to understand all of them in detail. So in order to do that, what we'll do is we'll build, or rather, more importantly, we'll implement the airline check-in system. Now the core takeaway from this is how I did not build entire airline check-in system. We build the part that we are most interested in, the database. Right, because the idea for this system is not to build at high level fancy boxes, but to understand database lock, right? Similarly, you can do it with every other system out there. Understand the core of the system and implement it. That's how you learn. You don't have to write [?CRUD | asr: "crowd"] and all for every single thing out there, right? Be smart, the way you'd want to write hello worlds or small prototypes of everything.

[00:26:40] I was so happy to see folks trying out all the four, like short polling, long polling, [?SSEs | asr: "SSCs"] and WebSockets. Do that. When you actually implement, you learn the most. And this is not just some random stuff that I did. All of these things that I'm talking about, 85% of them is something that I've built myself. That's why I have deep understanding of that, rather than just mugging up some blogs and research papers to regurgitate over here. No, I build those systems. I know where they falter, what happens in production. Because of which I can add a ton of value. Which is why I am highly recommending you to implement what we study. That's where you get these deep insights about it. [unclear: "Heretical dappa dappa"], everyone can do it. Like [unclear: "heretical"] boxes, everyone can draw. Knowing those details is what makes you better [?architect | asr: "achieve"].

## [00:27:32] Airline check-in system demo

[00:27:32] Right, okay. So let's briefly talk about airline check-in system. I'll show you a demo, then we'll take questions. So this airline check-in system is just a small prototype, just a small prototype for us to understand database lock. So we have multiple airlines, [?Air India, Indigo | asr: "air indigo"], Go Air and whatnot. Every airline has multiple planes or flights. Each flight has 120 seats, I'm just oversimplifying it, each flight has 120 seats. Every flight has multiple trips. Users book a seat in one trip of a flight. Usually how we all travel. Now here, what we have to do is we have to handle multiple people trying to pick the same seat. We will go step by step to understand where locking would come into the picture over here.

[00:28:23] So a simple database schema for that would look something like this. You have airlines table, you have all unique airlines listed over here. For each airline, there are multiple flights. So flight ID, airline ID and flight name, Air India 101, Air India 279, Indigo 60, 101 something. Each flight has a trip. So where you say that, hey, this is the trip ID. This is for this flight. It would fly at this time, land at this time and whatnot. Some random information, right? So you have that as trip. Then you have a user's table, as in the people who are there in your system, and a seats table, where you are saying that, hey, on this trip, this seat is occupied by this user. Initially, for a particular trip, all this will be null and it's our responsibility to fill that out. This is what we are doing. Now, this is where locking would be required. We'll talk about that.

[00:29:24] Okay, a simple high level stuff for that, just to get all bases covered, is you have your check-in service, you have a database. Let's say I pick MySQL to do this, relational database, no brainer, because we're talking about relational databases here, and an admin service. So the role of the admin service is that for every flight, for every trip, creating entries for all the seats out there. So for example, let's say Indigo scheduled a particular flight that, hey, now this flight available for booking. In the backend, for all the seats in that, you would have one entry for each seat with user ID set to null and some trip ID set [unclear: "away"], right? This is the job of admin service. It creates, adds new flights, trips and keeps the things updated, right? Now here the interesting part is, assuming different situation, 120 people, like, each flight has 120 seat, I want that 120 seat to be filled in best way possible, which is what we'll take a look at. Right, okay, let me share my entire your screen now.

[00:30:39] Okay. We'll start with the schema that we just discussed. Okay. So I just simplified it. I just kept it simple. I have users table. User ID one, name is Maurya Harmon [check: name spelling]. User ID two is Rene Jacobi. User ID three is Makina Sveta, some random names.

> **Student Question [00:30:57] - Student 8:** Faker library, right?

**[00:30:59] Teacher:** I have 120 names. Then I have trips. Trip ID 1, name Air India 1 or something, and I have seats. Now here I have set some user ID. Initially it would be null. Here some random values are set at the moment. So seat ID 1A for this trip is booked by user 4. So this is what we would have to do. Now here one thing to note is, what we are not doing is we are not reservation system. People have already booked the flight. Now they are here to pick a seat.

[00:31:36] So now what we'll do is we'll walk through different approaches. Approach 0 to approach 5. Take mini steps to understand database locking, pessimistic locking, in depth. Now here what we would have is, here people have made the payment. Now imagine all 120 people of a particular flight all reach the airport at the exact same moment. They all have purchased the flight. Now they entered the airport. There are 120 kiosks in which you have to just go and pick your seat. You have to go and pick your seat. Now here imagine all 120 people of that same 120 flight, they're trying to pick a particular seat. That's all we have to do. We are not here to payment. We are here to just pick a seat.

### [00:32:35] Approach 0 - basic booking

[00:32:35] Now here, let me start really small and then we'll go into the advancements of [?locking | asr: "lockup"]. Okay. So let's start small. Let's see a very basic case over here. We saw the database schema. Now here what I have, this code is written in Golang. I love Golang because of its simplicity, because of its elegance, because of easy concurrency. This written Golang, you can implement it in any language you want, so long as it supports concurrency. So otherwise you would need multiple code bases, someplace, rather, multiple processes to mimic them. Doing it with threads is much easier. So I picked Golang, but it's easy to understand. Nothing fancy about it. Okay.

[00:33:12] So first approach is very simple, just to see if everything is working or not. What I did is I am accepting an argument, a command and argument, that I am this user, and my system asked me, which seat do you want to book? And it would try to book the seat. So it would get the user. So let's say I have user. So whatever user I pass in, it would get the seat and book that seat for me and return. So for example, I'll just run and show you. Run approach 0 main. In command and argument, I have to pass the user ID. Let's say I pass in 1. So which means that, hey, hello, Maurya Harman. [?Which seat | asr: "Wait"], do you want to book? Let's say I want to book seat 3. And it would now book the seat 3.

[~00:33:57] Now here you can see seat 1C is booked by Moria Harman. And in the seat layout, this is how typically your plane sitting looks like: 1A, 1B, 1C, 1D, 1E, 1F, 2A, 2B, 2C, 2D, 2E, 2F, right? So here seat 1C is booked by Moria Harman, right? This shows that basic [?stuff | asr: "stop"] is working just fine. Now let's see what book function looks like. Where is my book function? This. So book function accepts a user, a seat, and it starts a transaction in which it does select ID from seats where ID is equal to this, that's it. [?Transaction | asr: "transition"] got the seat. Update seats set user ID equal to question mark where user ID is this and ID equal to this, user ID, seat ID, right? Just simply [?pass | asr: "pause"] it and you do transaction.commit.

[~00:34:54] Now here, if you look at this implementation, here what we are doing is we are just starting a transaction, we are literally updating seats set user ID equal to this where seat ID is equal to this. No, no checks are there. There are zero here, right? Which means that tomorrow I can have another user coming in and can book the exact same seat, and my system would not prevent that, because there are no checks that we have applied yet. We are not checking if the seat is already booked or what. We are just doing is we are picking and updating. A very naive implementation, but at least we have the foundation, right? Okay, so we did it. This is approach zero, where we just see everything is working or not. It's working.

### [00:35:48] Approach 1 - random seat

[00:35:48] Now, let me do something different. Now, instead of, given that here we can allow people to block every, like, to just provide a random seat ID and we just book that, it leads to people booking the same, like, two people booking the same seat, and then both of their boarding passes getting printed and there's a chaos in the plane. Now, in order to reduce this, let's say what we do is, instead of asking user to pick a seat, let's say we pick a seat at random. There's a natural progression to that. So now what we do is we get all the seats of the airplane. We pick one seat at random, like literally random choice from this array. We are picking all the seats. So if you look here, airline.seats gives me all the seats of the airplane, not all the available seats, all the seats of the airplane. I'm just picking one seat at random and I'm just giving that user that particular seat. So still update seat set user ID equal to this where ID equal to this. So again, no checks, but I'm now just relying on a random function

<!-- chunk_04 00:37:03-00:50:00 -->

**[00:37:03] Teacher:** This is also where it is very much possible for two people getting the same seat, because it's just a random function that is invoking. It's very likely for this random function to pick the same seat in two different iterations. Problem, right?

### [00:37:20] Approach 2 - 120 goroutines, random seat

[00:37:20] So that's where what we do is, this is where now I'll start taking your opinions on this. Now, now let's mimic all 120 people trying to book the exact, like trying to book or trying to pick seats at the same time. So what I do is I'm mimicking concurrency over here. So for example, look at this: when my main function starts, I'm simulating all 120 users coming into my system at the exact same time and trying to book a seat. So what we are doing is, for all the users that I have, I'm triggering a goroutine. Goroutine is like a thread, like a thread which is running in its own space, and it is like every 120 user, 120 goroutine, they're all trying to book, they're all trying to pick a seat, right? Not the same seat, but pick a seat. So for all 120 users, we're trying to call book. Book just accepts now user and not seat, because book now picks a seat at random and assigns it to a user, right? And then if error condition, and done, right? So now if I look at the book function, what book function does is exact same thing: all the seats of the airplane, picks one seat at random, transaction start, update and transaction commit, right?

[~00:38:37] Now when I run this code, go run approach two. Now what would happen? Any guesses what would happen at this stage? All 120 users coming onto this platform, [unclear: "added access and time"], trying to pick a seat. All we do is pick all the seats in one shot, all the seats of the airplane. We literally pick one at random of it, start a transaction, update the seat and commit it. Sandeep, what would happen?

**[00:39:18] Student 1:** So some users will get the same seats, as you said, and most of them would be getting, like, there will be some users would be getting same seats. I think that's the issue with this.

**[00:39:27] Teacher:** So will all seats be filled?

**[00:39:29] Student 1:** No. Okay.

**[00:39:31] Teacher:** Even any particular pattern in which seats will be filled?

**[00:39:36] Student 1:** It depends on the random function that we are selecting, right? It depends on how the RAND function is working. If the RAND function is designed in such a way that you'll always get a unique value between 0 to 120, then everything will go smoothly, but we are not sure what the RAND function is implemented under the hood.

**[~00:39:51] Teacher:** Correct. So now if we do this, we see that not all seats are filled, because this clearly shows that [?rand | asr: "RANDUP"] function, because RANDUP function was hit 120 times, we see that RANDUP function did not pick 120 unique values, it repick some of the values because it's a RANDUP function, right? And here we clearly see that not all seats are filled, which means there will be multiple people who would have the same seats, with like, for example, this, this Dr. Lizzie Richie [check: name spelling] and Liana Kessler will fight in the air when both claiming "we both have [?7C | asr: "seven easy"]", right? And that's the problem.

### [~00:40:24] Approach 3 - order by ID limit one

[~00:40:24] So now let's come to solution. Now we understand, now we have mimicked everything, now we just have to play around with SQL queries, right? Okay, now what we do next? We know, definitely know that just picking one seat at random wouldn't work. We have to pick one seat, like we have to pick the first seat which is not occupied or not booked by someone else. So what do we do? We write SQL. So in SQL query, when my transaction begins, we pick a seat: select id, name, trip id, user id from seats where trip id is one, user id is null, where seat is not occupied, which means when user id is set to null, order by id limit one. I'm picking the first seat that I can find which is not occupied by anyone, right, because user id is set to null. Everything else remains the same. I update the seat, whatever I got, and then I commit a transaction, right? And I'm doing it again for that same 120 user, mimicking this exact same thing [?in parallel | asr: "in pavl"]. What would happen when I run this?

[00:41:32] Look at this query: select id, named, trip id, user id from seats with trip id equal to one and user ID set to null. Order by ID limit one. When I run this thing, approach three, will all the seats be filled? If yes, why? If no, why? Maverick, please use your phone. Yeah, Maverick, go on. You are inaudible. I'll move to the next one. Yes, Devashish?

**[00:42:06] Student 1:** No, I don't expect them to be filled because there might be the same seat that is offered to people.

**[00:42:13] Teacher:** Why? I'm basically checking user ID as well.

**[00:42:19] Student 1:** But, okay, unless there's some locking mechanism that is already in place, which would book the seat for me.

**[00:42:31] Teacher:** We did not write that code yet, right? So now, what would be the behavior over here?

**[00:42:37] Student 1:** So like if there are two concurrent threads accessing, like which are offered the same seat.

**[00:42:43] Teacher:** Why would they be offered the same seat?

**[00:42:45] Student 1:** Because for both of them it will be null, right?

**[00:42:48] Teacher:** Why?

**[00:42:51] Student 1:** Because nobody has booked it yet. Booked that seat yet.

**[00:42:56] Teacher:** Why? Like why is it? Why would they both see null?

**[00:43:04] Student 1:** Because, because they're concurrent, right? So both of them are accessing at the exact same time and, yeah, the database is giving the same value to both of them, unless there is some locking in place.

**[~00:43:17] Teacher:** Yeah, this is exactly why we need locking, right? Because both the transactions running at that exact same time might see the exact same value and operate with that. Okay, what will be the pattern of, like, will there be a pattern of booking? Will you see a pattern in which the seats are booked?

**[00:43:43] Student 1:** Hard to predict, I guess.

**[~00:43:43] Teacher:** Why? Look at this query, see what we are doing.

**[~00:43:51] Student 1:** Yeah, yeah, so yeah, yeah, like it's just limiting one, so yeah, people will get the same seat. So the pattern would be that, like, all of the co-routines trying to book the same first seat, and I guess the last one will, or like, yeah, I don't know which one will get it, so...

**[00:44:12] Teacher:** Which one? So which, which seat will be picked? Which seat will be booked? Look at this query.

**[00:44:17] Student 1:** Yeah, the first, the first seat, like...

**[~00:44:17] Teacher:** Why, why first seat?

**[~00:44:17] Student 1:** Because that is the one being offered to everyone.

**[~00:44:25] Teacher:** Why?

**[00:44:27] Student 1:** Because there's a limit one here. Order by, order by...

**[00:44:30] Student 8:** Order by ID limit one.

**[00:44:32] Teacher:** Order by is the reason. Because of order by, everyone will get seat one, two, three in that order. So when SQL query fires for all of them, they would all see order by ID, which will, seat ID one will be given to all of them, and everyone would be booking that same seat. Okay. Will there be only one seat that will be booked?

**[00:44:56] Student 8:** I think so. Okay.

**[00:44:59] Teacher:** You are on yes side. Harsh. Will there be only one seat that is booked? Yes. Will there be multiple? One seat?

**[00:45:07] Student 20:** One seat.

**[00:45:08] Teacher:** Okay. Next one is Maverick. Will there be one seat that will be booked or multiple seats that will be booked?

**[00:45:15] Student 1:** So again, I'm not sure exactly how the internals work in this particular DB space, but in case every single thread fired is reading the first order itself, which means everything is concurrently being fired, or basically the execution is happening in parallel in one way, then every single read will return 1A by default because of the way query is written. And because we have read that particular row, every entry that is done will be against that particular row seat itself. [~00:45:51] Case multiple seats will be booked only if update has happened and after which another read is happening, so basically there is some delay, so once update, some update has happened, some transaction has committed, then you do it.

**[~00:46:08] Teacher:** Okay. For, for others, let me run it and show it. Now when we run this, you see seats are getting filled, and you can very beautifully see seat one, 2 and seat 3 are filled. If I rerun it again, hopefully now you see four seats are getting filled. And so there is no guarantee that exactly n seats will be filled, because now what happened here is, this is the beauty of [?relational DBs | asr: "relationship"], it makes us understand locking so easily. So what we are doing over here is we are selecting one seat order by id, because of which you see two, three, four, like seats getting filled in this order. Like here in the logs also you can see 1C, 1C, 1C, before which you see 1B, 1A, right? You see them in printed in almost that same order.

[00:47:03] Now here what we are doing is we are selecting a seat for a particular trip where user ID is null, order by ID limit one. So every transaction is coming. It's trying to pick the first seat where user ID is null. Now the best case possible was all 120 were scheduled, or when, well, all 120 transactions started, that seat, the first seat was free. In that case everyone would see only one seat, like everyone would be booking that one seat. Hopefully I'm able to mimic that. Four, four, three. I'll give it one more shot. See, now there is just two seats that are getting booked. Now here you can see, like, there's no one way that this system is read.

[~00:47:48] Now here what is happening behind the scene is, when my transactions are coming up, out of those 120 transactions, when my 120th thread, let's say, spun up, my first coroutine ran, found the first row available, wrote to the data and committed the transaction. So when my 128th ran, when my 128th [check: "128th" - teacher is describing 120 coroutines] coroutine ran the transaction, when it started, the first one was already committed, when this was already committed, when, when, so which means that the row that it got would be the second row. This is why commit is so important. As soon as your... Any other transaction that started after that, when it tried to read, it would read the next row because you are doing user id is null, because of that, not because of transaction. But because that one committed, that row, for that particular seat, user id was set to something, which means when my 120th coroutine ran, when it fired this, it saw that id one, like seat id one, user id is not null. Seat id two, user id is not null. And then the user id is null, so it read that particular thing. This is why commit is so important. When someone committed and then the next read happened, it got the next row because of this condition, not because this is how we wrote the code. Right? Okay.

[00:49:19] So here what we did is we saw why locking is important. Right? How we thought we built a system where all 120 seats should be filled, but they are not, because everyone is reading that same old row. This is exactly why pessimistic locking is needed.

### [00:49:38] Approach 4 - pessimistic locking with for update

[00:49:38] So now let's do this. Let's add pessimistic locking to this and see how it benefits us. So now here entire code is same as [?approach three | asr: "approach read"]. I just added two words at the end: for update. That's it. Now what would happen? Amrik?

<!-- chunk_05 00:50:00-01:01:25 -->

**[00:50:00] Student 2:** Deadlock.

**[~00:50:01] Student 8:** Why deadlock?

**[00:50:04] Student 2:** Because the first user who is coming in, if he is acquiring a seat, okay. And the second one is also waiting for it. So maybe the second one who is waiting, his transaction may got cancelled.

**[00:50:17] Teacher:** Waiting is not equal to deadlock. You know it, right? Deadlock happens when you are waiting on row, which is locked by someone else. And that is waiting for row that you are holding up.

**[00:50:28] Student 2:** Okay. Maybe his transaction may get cancelled at that time.

**[00:50:32] Teacher:** No. Okay. Let me pull in, Sandeep. Think more about it. We basically covered it. Like think about the flow. What we are doing is let us take an exclusive lock on that.

**[00:50:43] Student 1:** I think there'll be starvation for some threads. The threads will be starved some because even though both of them will be getting access to the same row, one of them is getting updated. So the other thread will be waiting on it and that is getting updated. So there'll be a starvation that takes place.

**[00:50:59] Teacher:** Okay. So will all 120 seats be filled?

**[00:51:03] Student 1:** I think so because you have clearly mentioned for update, right. Which is a pessimistic lock. So yeah, I think so, but at the expense of time, so it won't be a concurrent, but the time will increase for, for few of the threads.

**[00:51:21] Teacher:** Few of the threads. How, how many transactions the time will increase?

**[00:51:26] Student 1:** As the, I think, as you increase, like as you progress, the time increases, like for example the 10th transaction might have to wait for 10 seconds, let's assume, let's, let's just simplify this.

**[~00:51:38] Teacher?:** Let's say wait is equal to one second, okay? So first transaction came in, okay, it will

**[00:51:46] Student 1:** instantly it will get it. The second transaction will also get it, but because other thread is updating on it, so it needs to, it needs to get the second row and update it, so because but it needs the second row.

**[~00:52:04] Teacher?:** Why would it wait on the first one? Why would it wait on the first row?

**[00:52:10] Student 1:** Because all of them are querying the same row at the first end, because all of them are fired concurrently, right? So parallelly all the 120 threads will be accessing the first row, but the first row will go to the first thread. So the second row, the second thread is seeing that the first row is getting updated. So that's why the second thread will go and query the second row and then it will try to update.

**[~00:52:31] Teacher:** But why? Because if you look at the query, okay, let me not dive into that. It would go, we'll go to another rabbit hole in, in, in sometime, we will anyway hit that.

[00:52:50] First transaction came in, it executed this query, it got the first row, it took an exclusive lock on that, right? Yeah. Now when my second transaction came in, it fires this exact same query. Now would it wait on the first row? Would it not just move to the second row?

**[00:53:13] Student 1:** Because I don't think it, it will wait, right? Because if the user ID is null, if it is not yet updated, then for that second goroutine it will sting, it will still think that, okay, it will read it, okay, this is my row, but it is locked, so I need to wait. So then how is it jumping to the second row? Then there should be a mechanism that will, yeah, then there should be a verification before you write it, right? So the moment you get the lock is removed, it needs to make sure that the user ID is still null and then you need to write. Only then we'll have that sequential update of rows. Otherwise, they'll be rewritten every time.

**[~00:53:52] Teacher:** Not entirely true. Let me cover that.

> **Student Question [~00:53:56] - Student 1:** But one question I have here, Arpit. Don't you think ACID properties are given by default? Why do I need to do all this?

**[00:54:05] Teacher (answer):** ACID properties is at transaction level. This is within transaction. These are concurrent transactions. It's not guaranteeing is as just atomicity, consistency, isolation, durability. So durability, when you commit, it gets flushed. We saw it in action. Isolation, which means two transactions that running, they are independent of each other. Now, when it comes to isolation, depending on the isolation level of the database, read committed, read uncommitted, serializable, and read repeated, right? Or rather basically repeatable read. Or depending on the isolation level, the transactions will be scheduled as per that, right? But this is within the transaction. transaction where you are locking some rows to get something done. Right.

[00:54:49] So if your transaction isolation level was serializable, serializable isolation level says that when one transaction is executing, my database would not even execute other transaction, which means your transactions are literally one transaction, then another transaction, then another transaction, another transaction. So it's pathetically slow. Right. But then you would not face this issue at all. transaction isolation level was serialized. But because the default isolation level is not serializable and you don't do it for practical reasons, because you need to support high throughput, you just cannot say, I'll just wait.

**[00:55:28] Student 1:** Okay, you're saying ACID property, we can configure it. In typical use case, we don't configure it for high throughput.

**[00:55:35] Teacher:** Yeah, yeah, yeah. So if you configure isolation level to serializable, you don't need to do all this stuff. But you don't do it because you need high throughput. Just imagine if two users, one user is updating row one, other users updating row hundred, why should one updating row hundred should wait for row one to get updated? No, right. That's why you don't do it. Right. So that you can accept parallel writes.

**[00:55:58] Student 6:** Right.

**[00:55:59] Teacher:** Okay. Let me walk you through on what exactly. So first let's run. Okay. Wait, wait, wait, wait, wait. I've totally forgot. I'll pick in Rahul. Rahul, will all 120 seats be filled?

**[00:56:13] Student 1 (Rahul):** I don't think so, like it depends on, like, if skip lock, skip lock is like enabled by default or like we need, it's not enabled by default anyway, it's not, so, so the result, so what will happen is like this query will try to get the first row that this transaction will have, and like every transaction will try to do the same, so it will be kind of like a deadlock, not like deadlock, but

**[00:56:43] Teacher:** use the proper, so you are saying that, so that only one row is filled? Yeah.

**[00:56:48] Student 1 (Rahul):** I think so, because like skip lock is not available right now, so it won't move to second. Okay, okay.

**[00:56:58] Teacher:** Will all 120 rows be filled?

**[00:57:00] Student 10:** Not all 120, but somewhere between 1 to 120, I think. This will depend on scheduling of the goroutines. So imagine there are two goroutines and the first one picked it.

**[00:57:16] Teacher:** No, no, that's right. We anyway discussed that. So you are saying that it would not be one, it would be somewhere between one to one 20, but definitely not one 20. Is it? Yes.

**[00:57:25] Student 8:** Okay.

**[00:57:26] Student 2:** Got it. Got it. [?All 120 seats | asr: "All one 26 feet."] I think so because it's a for update. I think it was exclusive lock, exclusive lock. So let's T1 comes. [unclear: "It's the rover."] It won't even let it pick R1 because we have an exclusive lock on that. So it will wait until R1 gets free. Now when one has completed execution at some point of time, T2 and all the subsequent threads, which were waiting for R1 to get free, to get, they would get, they would get R1, see that they are, it's not null down. They will move to subsequent row R2.

**[00:58:03] Teacher:** Why would they move to, why would they like, how would they automatically move to subsequent row?

**[00:58:07] Student?:** How? How?

**[00:58:08] Student 2:** Because it has to complete this query where it has to find user ID. None.

**[00:58:13] Teacher:** But imagine you as database engineer, you are writing that code. You implemented this database. How would you write it? How to write that code where it says that, hey, this row is not, you move to the next row. Like with this, like basically I'm not talking about skip lock yet. Think about it. Like you are the creator of the database. You have to implement this logic. How would you do it?

[00:58:37] Like for example, if I don't have query like this, if I have query, but I'm just updating where trip ID one and user ID is none. And let's say seat ID is equal to 67. Like people are picking that particular seat, in that case, how would you do it? There has to be a uniform way to handle both types of queries, right? Here I'm doing a pointed lookup. I'm doing a pointed row lock here. It would not move to the next row. Correct.

**[00:59:05] Student 16:** Yeah.

**[00:59:07] Teacher:** It is moving to the next row because like, because it saw that row is locked, right? So there has to be a uniform way to handle it by the database. Correct? Yeah. Okay. But still you are in the favor of all 120 seats getting filled. All the reasoning, almost 90 correct, but still 120 when what I, I got for one 20. I'll pick one more. All one 20 is getting filled or not?

**[00:59:37] Student 2:** No, I don't think that all 120 will get filled. I think it will be something like the previous one only, where if the, if the a hundred thread is firing and if something is committed till now, it will then picks like some other row. Otherwise, everybody will wait on 1A and they will see it got filled out and they will cancel.

### [01:00:02] Running approach 4

**[01:00:02] Teacher:** Got it. Let's run and see. So first thing, if we are adding two words to our query and it's still not making any difference, something might be wrong. So let's see. Let's run and see what happens. Approach 4, we ran it. Oh, all [?120 | asr: "26"] filled out. If I run it again, all 120 seats are filled up. If I run it again, all 120 seats are filled up. [check: possible ASR duplicate of 01:00:23 - or teacher re-ran the program] This is the beauty of this implementation.

[01:00:34] So what is happening behind the scenes? Let me walk you through that. And this is the most critical part that people skip. This is where the magic happens. Now, first of all, what we did is we are trying to book a seat order by ID. So here you can very clearly see how seats are getting booked: 1C, 1D, 1E, 1F, 2A, 2B, 2C, 2D, 2F, all are in order, hold true, right? So users are coming, they're taking an exclusive lock, and while that exclusive lock is taken, other transactions wait. Once this exclusive lock is released, but then most of you thought that they are all, and it's very natural to think that way, and which is where I would tell you how database actually do that.

<!-- chunk_06 01:01:25-01:13:43 -->

**[01:01:25] Teacher:** So a lot of you thought that, let's say there are 120 seats, 120 transactions came in, they all fired the query, the same query, hypothetically let's say that exact same time. They came to it, like the database, all [?120 | asr: "one-minute"] transactions are active at the very same time. They are all fired the same query. They all got first row, but they didn't actually get the first row. Database is not returning the first row unless they get it. So transaction does not have a lock on that row anyway. But when transaction fired this query, they saw, or rather the database engine saw, that the rows on which they are trying to iterate. Because what we did is we are just iterating on this. The row on which they are trying to iterate is locked by someone. So other transaction waits. When the lock, when the first transaction commits, in our case commits, [unclear: "I'm not going to about state"]. But when the first transaction commits, the other transactions waiting on it are signaled to re-execute and re-evaluate the query.

[01:02:37] So what happens? First transaction came, it acquired the lock, other transactions were waiting, first transaction committed, other transactions would re-evaluate the query. So which means this query will be re-evaluated. It does not mean you have to re-fire the query. When a transaction gets signal, it re-evaluates the query and tries to acquire. In that case, because first transaction committed, now the second transaction that runs would see the second row, because it just fires the same statement again. It just re-evaluates the same statement. It. This way it would not mean user one gets row one, user two gets row two, user three gets row three. Here you can see in the assignment the way seats are assigned, you would not see in the exact same order. This is why I love databases so much. See, 1A, user ID one was Maria Harmon. Here some how well Daniel 4 got it. Second was Jamaica something. Here you have, is this somewhere, Barkas get it. [check: name spelling] So it's not that user 1 is getting seat 1, user 2 is getting seat 2. It's that whichever transaction got scheduled first is getting it. So here the transaction that was run by this particular user got scheduled, and so on and so forth.

[01:04:06] Now here one key thing that you should know is what is happening behind the scene, is that first transaction came in, it acquired the lock, other transactions were waiting. When first transaction committed or aborted, other transactions are signaled by the operating system to move on, or rather database engine to move on. They would re-evaluate the query. And when they do it, now they see second row. Then when second transaction, then one of those 119 transactions acquires the lock on this. Then they are signal, when this commits, they are signal third seat, fourth seat, fifth seat, sixth seat, and so on and so forth. This is why you see it's so painful for the database to do this much of operation. But we are still guaranteeing the correctness of the system. Right? Okay.

### [01:05:01] Approach 5 - skip lock

[01:05:01] Now let me move to the fifth approach. I need to take your question. Wait, I'll take your question. Now let's move to the fifth approach, where we clearly see why our database has to unnecessarily wait on it, because we clearly see when a transaction is locking a particular row, it's okay for us to move on. So which is where the only two word change I'll do: at the end, I'll just add skip lock. Everything else remains the same. Now what would happen? Will all 120 seats get filled? Yes, no. Anamol?

**[01:05:46] Student 6 (Anamol):** [check: name spelling] Yes, it would get filled. Only the busy waiting that were happening last time. That's a great word.

**[01:05:53] Teacher:** Busy waiting time. So now what would we get out of this? What advantage would we get?

**[01:05:59] Student 6:** The time of the execution of the transaction would be less.

**[01:06:04] Teacher:** The total execution time would be less. Yeah. Okay. So now let's see that in action. So the approach four, when we ran, it took 1.7 seconds to do it. Now let me run approach five. I have everything same. I just added skip lock at the end. And if I run it, approach five, it just completed in 147 milliseconds. One 10th of the time, and still got all [?120 | asr: "126"] filled. This is why skip lock.

[01:06:36] So this still, we are still taking exclusive lock. Now here, when we are doing skip lock, now what is happening behind the scenes at the database side is: first transaction came in, took exclusive lock. Second transaction came in, fired the query, saw this row is locked because we passed in skip lock. It quickly revalued, or rather database engine quickly revaluated, saw this row is locked. It saw other rows that matches my where clause. It found the next row. Lock to the second transaction, then the third person, then the fourth person. None of the other transaction wait for the first one to complete, and the rows were continuously locked by other transactions, right? So this way your database maximized on the performance, and this is why you need to know [?database locking | asr: "database login"]. You just made your system 10x faster just by adding skip lock, as simple as that. This is why you need to know how your database actually do things, because when... Relational databases don't scale. They don't know the real power of relational databases. Trust me on that. Relational databases scale beautifully well. They cannot handle big data, I agree to that. But scaling, handling high QPS, relational databases are champ at that. You just need to know the performance tuning. And this is not even very nitty-gritty performance tuning. It's just normal SQL query constructs that you need to know. This is the best part of it.

[01:08:06] This is why, and now here we saw, from approach zero to approach five, how we evolved our system just by adding two, three words here and there, and we were getting all we needed. Like, first we ensure the correct test. First we ensure that system fails. Then we ensure the correctness in the exclusive lock. Then we added skip lock to get the performance. Okay.

## [01:08:25] Fixed inventory plus contention equal to locking

[01:08:25] One thing that I want to talk about over here is, there is a phrase that I use very often. Remember it for the rest of your life. Fixed inventory plus contention equal to locking. Here you see fixed inventory: 120 seats. Contention: 120 people trying to book 120 seats. Locking: you have to take locks to ensure the correctness of your system. Always. You imagine any system in the world where there is fixed inventory, there is contention happening for that, you would apply locking to do that.

### [01:09:07] Examples - COVID portal, IRCTC, BookMyShow, flash sale

[01:09:07] For example, I'll give you examples. First example, COVID portal. Remember COVID-19, in the year 2020, when in India, a government launched a portal, COVID portal, in which we booked appointments at hospitals. Every hospital had limited seating. We all, when the slots opened up, we all jumped onto the platform at that exact same moment, trying to book that seat. Because there were limited seats, let's say 100 seats on that hospital, people got that particular slot. Fixed inventory, contention, how would they have implemented? Locking. May not be pessimistic, may be optimistic, may be atomic instructions, but the idea was to do that. So if you are building COVID portal on relational database, you would do something like this. Exactly like this, rather. Right?

[01:09:51] Second example, IRCTC, which is train booking system of [?Indian government | asr: "internet government"]. Now what would happen? People are coming, a lot of people trying to book the same, like book the seat at the same train. This is how you ensure high throughput. If they would not have taken skip lock, entire throughput would be [unclear: "stored on there"]. Then their code base would be filled with skip locks, right? And exclusive locks, obviously. Then BookMyShow, movie ticketing system. You have limited sitting area in a movie screen, you are all trying to book that same thing. Exclusive lock: one who gets it moves it forward, otherwise people wait for the transaction to complete and then other one jumps in, right? Wherever you see fixed inventory, you see contention, the first thing that should come to your mind is a locking. Fixed inventory, contention, locking. And more importantly, flash sale. Flash sale is very similar to this. When we discuss flash sale, you'll see this in action. You'll see how beautifully flash sale is designed by this, right? Okay, this is this.

## [01:11:00] Questions - how locking is implemented, holding a seat during payment

[01:11:00] Now let me take some questions and then we go on a break. Yeah, so there are two questions.

> **Student Question [01:11:08] - Student 2:** First question is, so how this locking is getting implemented or executed deep in the disk level? So obviously every data is stored in the disk in some format, like, okay, there will be some offset. Okay. [unclear: "From a row is stored in some portion of the day."] Yeah. So how OS and disk is handling this locking thing over there?

**[01:11:32] Teacher (answer):** It's not happening at disk level. Not at all. It's happening at the engine level, CPU side. So your mutex does not let it move forward, as simple as that.

**[01:11:44] Student 2:** Okay. So it is implemented using the mutex?

**[01:11:47] Teacher:** Yeah. Everything. Okay. See, at that, mutex or semaphores are the only two constructs that you have. Implemented, it has to be implemented by that. There is no third way to do it. Mutex, the semaphores, in some cases, monitors as well. But apart from these three constructs, there is nothing else. You have to have this. Otherwise, you go for atomic instructions.

**[01:12:10] Student 2:** Okay.

> **Student Question [01:12:12] - Student 2:** And my second question is, let's say if we want this thing to be locked for, let's say, 10 minutes of duration.

**[01:12:20] Teacher?:** You would never want to do that.

**[01:12:21] Teacher:** Why?

**[01:12:22] Student 2:** No, no, no. Maybe I chose the wrong words to say. So you go to this flight booking place and then you try to book a seat and then you proceed with the payment part, right?

**[01:12:35] Teacher (answer):** No, it's different. It's not SQL locking. It's not implemented. Your database transaction does not go for that one. It's different. Yes, yes.

**[01:12:44] Student 2:** Yeah, so but how are we looking into it?

**[01:12:49] Teacher:** Let's discuss it with flash sale. When we design flash sale.

**[01:12:51] Student 16:** Okay, okay, okay.

**[01:12:52] Teacher:** So seventh week, Sunday, because there it would be very clear. And because before that also I have to cover three different concepts for us to build [?flash sales | asr: "classes"]. So all of that would come in third week, fifth week and sixth week. We'll talk about that. Okay. But those are very different systems. This is SQL level constructs. Those where you are, and that's actually, you say it's locked, but it's not locked. It's on hold. So hold is the better word to do to talk about it, because when you hear lock, MySQL is blocking it. It's not SQL, it's just kept on hold, and that's a better word to model it.

**[01:13:31] Student 2:** Okay.

**[01:13:32] Teacher:** Okay. Yeah. Yeah. Thank you. I'm just picking few people at random because I would just want to be fair to people who have not spoken before. Yes, Chandan. [check: name spelling]

<!-- chunk_07 01:13:43-01:26:19 -->

> **Student Question [01:13:43] - Student 2:** Hey, hi. My question was like, here when we select trip ID equals one and user ID is null there we skip lock means if the user is not choosing a seat, right, rather we are letting, right, what in BookMyShow or airline system, right, we choose which seat is there, so there we cannot afford to give them other, any other seat which he or she has not chosen, right? In that case would we afford to have skip locked or not?

**[01:14:21] Teacher (answer):** No, we would not have skip locked. We would have just this.

**[01:14:24] Student 2:** So for update also, right? It will wait and re-evaluate for that seat, right?

**[01:14:30] Teacher:** Correct.

**[01:14:30] Student 2:** And it will try to get another seat.

**[01:14:33] Teacher:** No, why would it get another seat? Your SQL query does not allow you to do that.

**[01:14:36] Student 2:** Yeah, yeah, yeah. When we write ID equals to 67, it will never get the same.

**[01:14:42] Teacher?:** Correct.

**[01:14:42] Student 2:** So it will fail for error.

**[01:14:45] Teacher?:** Exactly.

**[01:14:45] Student 2:** Error will come for them.

**[01:14:47] Teacher?:** Exactly.

**[01:14:48] Teacher:** It would say no row found over here. Basically no rows matched.

**[01:14:53] Student 2:** Yeah. This is what I. Yeah.

**[01:14:55] Teacher:** Thanks for asking. We got it covered. Thanks because of that. But yeah, when you are booking a pointed, like when you're locking a pointed thing, like in this case, when you are there to like, let's say you're building BookMyShow or ticket booking or anything like that, when you are allowed to granularly pick your favorite seat and you pick that particular [?seat | asr: "set"] in your [?transaction | asr: "triangle"], update and then you would update it, two transaction cannot take that same seat there, so they would, so one would succeed, other would see no rows found, or it would wait and then you would find no rows match and you would print on the front end, seat's gone, right? And this is how you would do it, but everything else remains the same, right? Thanks for asking that. Yes, Aditi.

> **Student Question [~01:15:35] - Student 6:** Yeah, so when we are using for share, suppose there are two transactions and first, first transaction has taken the lock, the for share one, so when the second transaction it reads the row, but and meanwhile the first transaction after that it updates that rows, so then how won't it affect the second transaction?

**[01:16:02] Teacher (answer):** When it, I would highly recommend you to code it out, it's very easy to code it out. I would highly recommend you to code it out and see the behavior because what would happen is something really, because if I go into those details, I would have to write, draw that entire chart on how that [?lock | asr: "log"] would go on. It would take up another half an hour, right? Okay. More than happy to discuss, but I would want you to, you know, code it out once. It's very easy to mimic it. You don't have to even write the code for that. Just start to like, just connect, like just start a MySQL server on two different terminals connected on the same server and then set auto commit or set auto commit to zero. So that, and then you typically start transaction. You typically basically begin transaction, begin transaction, then write your code and then end transaction, end transaction. While you are acquiring those shared lock and exclusive lock, you see how your database reacts to that because it's very interesting. What would happen when you fire it, it would halt at one place and move at other. But yeah, you'll, you'll basically get it. Right. And it is going to be because that's where you would also discover deadlocks. Your code would fail. A lot of, a lot of funny things would happen. Right. Do that, right. More than happy to answer it. Okay.

**[01:17:20] Student 20:** Thanks.

**[01:17:21] Student 9:** Okay.

**[01:17:22] Teacher:** Yeah, Rajiv.

> **Student Question [01:17:24] - Student 9 (Rajiv):** Arpit, regarding this skip lock thing, the question that came to my mind is this, whether, let's say you, the first row was, I mean, was locked by a transaction. Second transaction came in at, saw the second one is free and then bypass skip lock, it took it, but somehow that second [?transaction | asr: "version"] failed, right, about it, right? Now this third transaction which is coming in sequentially at the same time, let's say, now would database engine give him this, because transaction obviously was in some place, so it actually skipped for the third row, right, because everything is happening parallely, but would for some reason that the seat number two would be

**[01:18:04] Teacher (answer):** reused somewhere [check: "reused somewhere" may end the student's question - diarization boundary] because your queries, what the trip ID is one and user ID is null order by ID.

**[01:18:11] Student 9:** So, so it will be re-evaluated. Okay.

**[01:18:13] Teacher:** Second transaction. No, when the second transaction failed, when the next read would happen by some other transaction, it would get a second row because that would match this, right? That would match this.

**[01:18:24] Student 9:** All right. But, but if the third transaction came in the same time at [?transaction two | asr: "transition to"], right?

**[01:18:29] Teacher:** It's not that first transaction is getting first row. Second transaction is getting second row. It's not like that. It's when you're adding the failure scenarios, whichever transaction executed it would get this. So for example, when one of the row locked row, when a transaction, when some transactions were waiting on a particular row that was locked, it failed. When any of the transactions that revaluates that would get that row again.

**[01:18:58] Student 9:** Right, right. Yes.

**[01:18:58] Teacher:** Right. Even if you do skip lock, let's say a bunch of them were added, it re-evaluated statement, now it would get the first row because we are ordering by ID. Even if we would not have done it, it would match some rows there, right? It's not that a row would be skipped all together, right?

**[~01:19:13] Student 9:** Okay, because SQL, right? Yeah, I thought that everything is evaluated for the first time and then they just

**[~01:19:22] Teacher:** No, no, no, which is exactly why it's the evaluation is retriggered. When a block transaction gets a signal, it's retriggered. If you go through MySQL's code base, you will find these exact words, which is why I'm using those terms, signals and all. You will find those exact terms when you go through MySQL source code. It's very easy [?C, C++ | asr: "c cc++"] code, just go through that. It might feel overwhelmed at first, but go through that. And for me, I built this understanding because I went through the code. I exactly know how transactions are implemented and why they are implemented a certain way, how that would behave and why it is not a disk level, all of those things.

[01:20:00] Hardly one week, dedicate one week of your time into going through MySQL source code. You'll not regret it at all, at all. Because you'll have very deep understanding of how [?database internals | asr: "database analysis"] works and [?trust me, it | asr: "TrustMeet"] has helped me build much performance systems. I've scaled SQL systems massively because of this and performance tuning. Do that, correct. Do that, correct.

> **Student Question [01:20:22] - Student 9:** And you would refer MySQL documentation, right?

**[01:20:25] Teacher (answer):** Official documentation always rules. Why would any YouTuber create video on that? Excellent, no one would do it, right? No one would do it. That's it. You'd never find, you'd always find a ton of content on mediocre stuff, not on advanced stuff, because no one wants to read that.

**[01:20:41] Student 13:** Thank you.

**[01:20:43] Teacher:** Yeah. We'll take questions till 10.25, we have 5 more minutes then, because then we'll go on a break.

> **Student Question [01:20:52] - Student 2:** Yeah, so when we write this skip lock, right? I mean the approach five. So a total, total number of times this query will be executed will be 120, right? Across all the threads.

**[01:21:04] Teacher:** No, much more than that. But yeah.

**[01:21:06] Student 2:** Yeah.

**[01:21:09] Teacher:** So I was good. Oh no, no, no. Watch out on approach five. When you're doing skip lock. Yeah. It will be 120 days [check: "days" possibly mis-heard].

**[01:21:14] Student 2:** Right. And when we don't write skip lock, when we just write [?for update | asr: "for a bit"], we don't know how we're evaluating.

**[01:21:21] Teacher:** Locking, revaluating, worst cases, N into N plus one by two. N into N plus one by two is waiting for the other one. So all of them would be revaluating. Then one would succeed. Then all of them would be evaluated. That one would succeed. Then all of them would be revaluating. The one would succeed. So N plus N minus one plus N minus two plus N minus three plus N minus four equal to N into N plus one by two.

**[01:21:42] Student 2:** Got it. Got it. Yeah. Thanks.

> **Student Question [01:21:48] - Student 1:** So my question. Hello. So my question is basically, this queuing, queuing behavior of like queries. Is it happen in every, is this happens in every case? Let's just say we remove select read query and we just do this query with the, remove skip locked. Also, we do this query with update. Okay. So like, will the transactions will get.

**[01:22:20] Teacher (answer):** Isolation level kicks in.

**[01:22:22] Student 1:** So, it will get canceled.

**[01:22:25] Teacher:** No, isolation level, whatever the isolation level says, that thing, your transaction would do.

**[01:22:32] Student 1:** Okay. So like, so it can go both ways. It can go into queuing also.

**[01:22:38] Teacher:** And what do you mean when you say queuing? What is queuing?

**[01:22:40] Student 1:** Like in the sense, like in the [?approach four | asr: "approach for"] like, like transaction was waiting, certain time and when the lock opened up.

**[01:22:51] Teacher:** Why was that waiting? Because you wanted to acquire a lock. That's why it was waiting.

**[01:22:57] Student 1:** Yeah.

**[01:22:57] Teacher:** If you don't, in update, you cannot do for update. In update, you can just pass update this particular row. That's it. It's a one line command that you're passing. Right? Update this, this, this, this. So you have never acquired a lock on any row. You are directly firing an update on the database. There is no, there is, so that's why I said, the isolation level of the transaction is. If it's serializable, it would run one after another. If it is repeatable, it would have a certain way. Read committed would have a certain.

**[01:23:27] Student 1:** So is it like, we need to force run select for update first, if you want to take a lock? Select, then update. Okay. Got it. Also, can you, can you show that part of the code where you are unlocking that [?lock | asr: "loop"]? Like we are never unlocking. We are just

**[01:23:46] Teacher:** committing the transaction. Why would we unlock? Commit itself means release all the locks.

**[01:23:52] Student 1:** Okay. Sure. Got it. I didn't do that. Yeah.

> **Student Question [01:23:58] - Student 2:** Got it. I did in the follow-up question that you answered to Chandan where, rather than order by ID limit one, you put and ID is equal to 67. [check: STUDENT_2 label may be a different student from the 01:13:43 asker - refers to "Chandan" in third person] I think in my opinion, what should happen is, let's say there are just three threads T1, T2, T3, T1 gets and acquires the lock, wait until, right? So in a practical scenario, like I think you gave the example of BookMyShow, for that I don't think it would work, would it? Because let's say I booked, I picked the seat, went to payment section section and never made any payment for let's say 10 minutes.

**[01:24:33] Teacher (answer):** No, that is different. That's what I said, that is different. That's [unclear: "on hold and not log"], although you see the word [?lock | asr: "blog"] because it's easy for people to understand it, but your transaction cannot be 10, your throughput of a SQL server would go down drastically. Which is where you never implemented that way. You just acquire the lock for that moment and say that this seat is put on hold. That's it. That's it. You never span your transaction for 10 minutes until the payment is done. It's not that you start a transaction, wait for the payment to complete and then commit a transaction. Right? So you split this into multiple phases.

> **Student Question [01:25:12] - Student 2:** And when the lock released, sorry, sorry. When the lock gets released, the OS signals the other transactions, right? I, what I always thought was transaction waits and checks the lock. So when you say wait, what do you mean? Is it an infinite for loop that it is checking, checking, checking, checking? I always thought so.

**[01:25:31] Teacher (answer):** So that is very, so that's why your thread signaling comes in, where you have a thread wait queue and it signals on that. So OS level constructs, they all come in handy, which is why we were taught all of this in college, right? This, all these fundamentals are all there. We're all there. We just never paid attention to that. Right? Thread signaling, disk IOs and whatnot. We all studied all of this in college. I'm a, I'm a, I'm a big supporter of formal education. Big supporter. Because I, because when I have spent enough time, I, I see all of this being taught in college. I just that they did not know how it is used. We know it better. Ideally, we should go and teach in college, but money is not there.

<!-- chunk_08 01:26:19-01:39:05 -->

**[01:26:19] Teacher:** I'll take a question at the end. We'll take a quick break because we spent hour and a half talking about it. Now, I hope I made you fall in love with relational databases. Explore them. Explore them. And next time, whenever someone asks relational databases, don't scale. And I'll just show them relational databases scale. You just need to know how to do it, as simple as. Right? Never believe any generic string, right? Relation databases don't scale, non-relational database scale, relation database you can't do partitioning, or you can do partitioning, sharding, everything on relational data, right?

## [01:26:52] Break *(admin)*

[01:26:52] *(admin)* Okay, great. So we'll take a quick break, we'll take a quick break for five minutes, we'll come back at 10 33, and next one are we'll discuss distributed key values, right? We'll go in depth on the implementation side of it, we'll build a distributed key-value store databases. That's it. So this would again help us understand the core of a relational database, few interesting things about it, some things that we'd never think about when we designing, we never think about implementation. Here we'll pick up those nitty gritties on performance improvement of relational database, how to write, like how to do what and when and why, and more importantly, how, right? We'll go all of that. And a lot of interesting detours around how Redis does it, I just sprinkling it over here, right? We'll go, we'll touch upon a lot of stuff. We'll take a break till 10 33, in next five minutes we'll come back and we'll talk about distribute key-value store. Thanks folks, see you folks in five minutes.

[break ~01:27:55-01:33:13]

## [01:33:31] Distributed key-value store on a relational database

**[01:33:31] Teacher:** Now, on the second half, now we'll have nice brainstorming. We did discuss that, but now from now almost for every system that we covered, we'll have a detailed brainstorming rather than me just rambling about solution. We'll go into why we are making those decisions. Okay. So now what we'll do is we'll build a distributed key-value store on relational database. First let's, whenever you hear, I've deliberately added the term distributed over here because folks love it. Number one. Number two, that I want to emphasize on this fact that when you are thrown into a situation where you want to design something distributed and it's okay on day zero, you don't design it to be distributed. The way you should approach is just first implement a single node thing and then think about distributed. A lot of people like directly jump into, yeah, leader election and this and Paxos and Raft and whatnot. No, don't confuse. Don't get confused at all. Start simple and then scale out. Okay.

[01:34:39] So the requirement for this is we need infinitely scalable. By default, everything needs to be infinitely scalable. And the core operations that we support are get, put, delete and TTL. Getting a key, putting a key, deleting a key and TTL, expiration on it, auto expiration. And this is not some made up statement or some made up design. Apache Ignite, one of the most popular key-value store built on top of relational DB. It uses this, supports this, and for me to understand the system in depth, went through their source code. As simple as that. But the best part of this is we'll not just restrain ourselves, will also take small detours onto understanding how Redis also do few of these things, right? That will be quite interesting for you to know. Okay, the brainstorming that we'll do, we'll do it in five parts: storage, optimization of storage, inserts, update and TTL, [unclear: "this what will bring someone"].

### [01:35:40] Storage - schema

[01:35:40] So let's start with storage. How would you store the data? Raise your hands, I'll pull you in. How will you store this data? [?Single node | asr: "Single load"]? What would be the schema? Sandeep?

**[01:35:58] Student 1:** I would store it in an array. That would be my first option. Array of some...

**[01:36:03] Student?:** Sandeep, inaudible. [check: possibly the Teacher telling Sandeep he is inaudible]

**[01:36:05] Student 1:** *(admin)* Hello? Are you able to hear me now, Arpit? Hello?

**[01:36:10] Teacher:** *(admin)* I'll move on. Rahul, go on.

**[01:36:14] Student 12:** *(admin)* Hey, are you able to hear me now?

**[01:36:16] Teacher:** *(admin)* Okay. Oh, sorry. It's my headphone or something. Wait, wait, wait, wait. No.

**[~01:36:21] Student 1:** My headset is working, let me quickly test. Sorry, I'm, I'm able to hear here then, no? Yeah, right, it's working fine, I've gone. Sorry. Yeah, yeah, so basically the schema would be a primary key, which would be our key, and there for the value part we can have some array or like some kind of our dynamic structure basically. Relational data is what? Ahre? Okay. [check: "Relational data is what? Ahre?" may be a Teacher interjection] So I guess string would be the better choice if that's the case. Like key is basically primary key, which will be, which will be indexed, and values will be strings, I guess. Yeah. So key is a string or an integer or what he can be, let's just say like, key can be string also. Like we are like, if we are not concerned about, like if we are not concerned about

**[01:37:25] Teacher:** [check: "storage size" may end Student 1's sentence] storage size, why we should not be, it's a database. We should always be concerned about it. Right. So always you would see, key, primary key is fine, but picking the right type for any database is really important. So you have, when you're designing a key-value store, and let's say you design it, let's say you pick key to be a primary key. But when you're designing a type, you cannot just have any type, because this is what would determine what kind of keys are you supporting in the system. Like if you would only want to support integer keys, then well, you can have a key as integer. If you're saying that, hey, I would support strings, then how big of a string would that be? So as a database engineer or as a database designer, you need to know how big your key would be. So let's say you pick [?varchar | asr: "where can"] I say 16. I'm picking a smaller size. You might go for 24, 30 to 60. [check: "30 to 60" may be "32, 64"]

**[01:38:21] Student 1:** Based on the requirements. Based on the requirements. [check: possible ASR duplicate, or Teacher echoing]

**[01:38:23] Teacher:** But once you fix it, you cannot change it. So ensure that you are, you like, whenever you are designing a database, you know your requirements really well. Okay. What's the type of the value? You said string.

**[01:38:36] Student 1:** Yeah. The string, like if we are storing JSON in that, it depends like what we are storing. Okay. If we are like storing some values, simple values, then we can, we can use integer. But like, if you are storing JSON objects or something like that, we will need a bigger, bigger string, more than 200, 300 words, maybe. So yeah, it actually depends on the use case.

**[01:39:00] Teacher:** No, but then you have to pick something that works for all.

<!-- chunk_09 01:39:05-01:52:10 -->

**[01:39:05] Student 1:** I guess, or this also I will choose [?varchar | asr: "worker"], but I guess...

**[01:39:11] Student?:** Instead, [unclear: "pick block"].

**[01:39:14] Student 1:** By very large objects.

**[01:39:16] Teacher:** You can literally store anything in that. Now, what you said is partially true. What you said, it depends on what we are storing. No, it does not depend on what we are storing, but how we are accessing it. For example, in MongoDB, MongoDB is also key-value store. So in MongoDB, when you are storing, you are storing JSONs and you are allowed to query on that. So let's say you have some row ID and then against which you store a JSON, and if you are allowed to query on a particular attribute within that JSON, which means you need query capability within the value, then you need to have the [unclear: "copyright type"] over here. But if you are just doing key-based accesses, you are not querying within the value. For example, if you would have stored value as [unclear: "IKT"], then you can do range queries on that if you want to. But if you are not allowing that, so depending on how you are allowing your users to access the value or query the value, if they are even allowed to do so, that would determine the type of.

**[01:40:22] Student 1:** So if we are doing the case you just said, like we are querying the JSON inside that,

**[01:40:32] Teacher:** so then this wouldn't work. Then you would not go for blob. You would go for a type that supports that. For example, JSON plugin of MySQL, or now it is natively supported.

**[01:40:39] Student 1:** I will just like, I will just create rows of that type, like which would be multiple.

**[01:40:46] Teacher:** You can implement it however you want. But the idea is depending. So here, because we are building this key-value store, we would [unclear: "remain as well"] that a query would be on key and not the value. Just use a blob that would allow us to store any type of objects there, or even basically [?varchar | asr: "where it"] would do, or long text would do. But idea is that we are not penetrating within the value to support some functionality, like we are just using values as black box. Okay? Okay, so that said, so that's good enough schema to start with.

### [~01:41:15] TTL and expired at

[~01:41:15] Now, apart from that, look at this option. [?I'll pull in | asr: "i'll pull it"] Sandeep. Sandeep, we want to implement insert, we'll add it, update, we'll update it, TTL. So any other column that you would need over here?

**[01:41:33] Student 1:** [check: teacher called "Sandeep"; label STUDENT_1 may be a different student] The naive approach would be to have another column that will specify the time where the start time or when the insert a time. And accordingly, we can have another job that will check this time and accordingly it will flush it out.

**[01:41:49] Teacher:** Wait, wait, wait. So you are adding a created at?

**[01:41:52] Student 1:** Yes, that's correct.

**[01:41:54] Teacher:** Okay. And then?

**[01:41:56] Student 1:** Yeah. So this created at, based on the created at, we can deduce how much time it can live. For example, if my TTL is key specific.

**[01:42:05] Teacher:** So every key will have, can have a separate TTL.

**[01:42:09] Student 1:** Okay. Then in that case, I don't think, then we need to have another column, right? Because now it is key specific. We need to have created at and the TTL together.

**[01:42:20] Teacher:** Okay. You'll store. Yes, okay. So let's say we operate a granularity of seconds. Okay. And then we should [check: speaker change mid-sentence; "And then we should" may be Student 1]

**[01:42:28] Student 1:** also have another job that is running in this particular, in, in this particular key-value store that checks, it would take created at plus TT-, plus TTL second should be less than the current time. What will the query look like? My query, okay, mike, can I say it in plain English? Delete something something. Yeah, so delete key if current time minus created at, if current time minus created at is greater than or equal to TTL, is actually equal to TTL.

**[01:43:12] Teacher:** Actually not even greater than, why not equal to, [unclear: "his worst source your job did not try"], yeah, yeah.

**[01:43:20] Student 1:** I think this should be some job of, you know, clearing out records.

**[01:43:25] Teacher:** This is the worst query that you can write. Why? Tell me this.

**[01:43:34] Student 1:** Because you're scanning through each and every row.

**[01:43:38] Teacher:** Exactly. You cannot leverage index because this is a dynamic computation. Correct? You do this subtraction, you would never know it is greater than or less than TTL or not, so you would have to literally go through every single row every single time and then delete it.

**[01:43:58] Student 1:** So what's a better way to decide? Maybe we see the better way would be, we see the problem is that computation, right? So what if we get rid of the computation and you can somehow figure out that this has crossed your TTL.

**[01:44:13] Teacher:** So how?

**[01:44:15] Student 1:** Yeah, so that means we need to have a mechanism that will tell me that this is expired. So this particular entity has expired. So how do I get that? That's what I'm thinking. But do you have any pointers? Maybe I can segue into that.

**[01:44:36] Teacher:** You don't need created at at all.

**[01:44:39] Student 1:** But how do I know that, but I, but I also need to know from the measuring time, right? The start time from when it is inserted.

**[~01:44:44] Teacher:** Okay, let me pull in someone else. Think about, think about it, you don't need created at all. Okay, I'm just picking someone at random. Yes, Simran, what would you do?

**[~01:44:58] Student? (Simran):** Yeah, I was thinking to add a valid till rather than adding a created at, so we can have a separate table for TTL seconds and just add here the valid till time and based on that. Yeah, and we can index on that and that would be faster than what we have currently.

**[01:45:19] Teacher:** [unclear: "till it"] store where expired at is greater than equal to TTL, is greater than equal to the TTL. Oh, sorry, not even TTL is greater than equal to now. Oh, sorry. Where expired at is less than equal to now. Right? So this way, all we can do is when we are storing the key, if, if let's say someone has specified a TTL to that key, instead of storing created at and TTL, we directly store the expired at time. Assuming we don't need created at, in case you need to just store it. With this, you can just need one index on expired at and this becomes a really efficient query. Delete store where, basically delete from store where expired at is less than equal to now. This would be really efficient operation.

### [01:46:12] Delete

[01:46:12] That being said, we have another operation called delete. How would you do delete? Jodhinder [check: name spelling]?

**[01:46:20] Student 4:** Okay. So I didn't think about the delete one. I was sort of... Think about it. [check: "Think about it." possibly Teacher]

**[01:46:25] Student?:** Brain stop. Think about it. [check: possible ASR duplicate of 01:46:24]

**[01:46:27] Student 4:** Can be like two ways. We can probably have a soft delete where we just mark it like as deleted. And we can run like sort of like a background job, which like deletes it because again, you'll need to probably like balance some internal data structures once you delete something. So yeah, so soft delete can be there.

**[01:46:53] Teacher:** So soft delete, you'll add a column.

**[01:46:56] Student 4:** Yeah. Or you can just maybe like change expired at to some negative value.

**[01:47:03] Teacher:** Okay. Let's say I add a new column. What happens with that? Let's add is deleted.

**[01:47:09] Student 4:** Yeah. So you can just set it to true and you could have another job that sort of runs periodically and clears out all these deleted rows.

**[01:47:19] Teacher:** That would do delete from store where is deleted equal to true.

**[01:47:27] Student 16:** Yeah.

**[01:47:28] Teacher:** So now you have two background jobs to, one that deletes. One that deletes the expired entries, another one that deletes the soft deleted ones. Now what you also said is you'd want to piggyback it on expired. Yeah. Okay. With this, what, what are you proposing?

**[01:47:50] Student 4:** Yeah, just set it to some negative value, which would always be like smaller than time.now or something.

**[01:47:58] Teacher:** So your delete is equal to update. So it will be like update store set expired at. Yeah. Equal to minus one. Yeah. Where something, something, something, where key is equal to something. Yeah. What, what does this save us? This saves us from.

**[01:48:18] Student 4:** Having two background jobs. Perfect. [check: "Perfect." possibly Teacher]

**[01:48:21] Teacher:** Now you just have one? You just have one.

**[01:48:24] Student 4:** So like obviously CPU is being used less. And there's less load on the disk also. Less reads are happening. Yeah, I guess. And storage.

[01:48:37] Storage. [check: repeated "Storage" may be crosstalk with Teacher]

[01:48:37] Storage obviously, yeah. Storage obviously. And yeah, once you have the job also and you have to like probably implement it read path as well. That when you read something, if the job has not yet run, you probably want to filter there as well. That once you're reading, just check if the key is expired. It's possible that the job is not run at that point.

**[01:48:57] Teacher:** Yeah, we'll, we'll come to that when we do get. But just one question. Now, what is your SQL query of your job? Given that you are storing minus one in expired at for the values that are deleted.

**[01:49:09] Student 4:** Yeah.

**[01:49:11] Teacher:** What's the SQL query for the background job?

**[01:49:13] Student 4:** Yeah. So it will probably be like delete, from store where expired at is less than like now.

**[01:49:28] Teacher:** That's it, right? Yeah. Now this matches both the things.

**[01:49:32] Student 4:** Yeah.

**[01:49:33] Teacher:** This not only matches the rows that are expired, but also the negative values. So it's been soft deleted also. So this is such an elegant solution that solves both the things in one SQL query itself. You don't have to have one thread that is deleting the time based of and another thread that is deleting the soft deleted value. What you are doing over here is you are simply writing this one query that beautifully absorbs both the cases. It's such an elegant implementation. Okay, and this just puts minimal load whenever, because you would have expired at index, solves a ton of problem for you. Okay? So up until now we talked about delete. So our delete is basically an update operation, so update store set expired at equal to minus one where key is equal to K, that is delete. So we did soft delete and we triggered a background. So we have, we talked about schema. We talked about background job that would run. We talked about delete. Now let's talk about, and we also optimize the storage. Right.

### [01:50:50] Insert

[01:50:50] Now let's talk about insert. What's your insertion query? Ashish.

**[01:50:56] Student 2:** I just wanted to add. Hello. I'm audible. I just wanted to add this thing in the schema. Type, because we picked the value to be a [?varchar | asr: "worker"], right?

**[01:51:06] Teacher:** So we can put a serialized YML. That's okay. That you can make, those are the fancy things. And you can do for value type and what are you, you can build another Redis on top of this. And that's okay. That's why we are not defining [unclear: "very country"]. What we want to get the best out of this is to understand these key design decision, right? But you can have value type when you're supporting multiple values. Let's say you're just supporting string type. Then you don't need that, or just one homogeneous type. You don't need that. That's why I didn't cover.

**[01:51:33] Student 14:** Okay. Okay.

**[01:51:34] Teacher:** Yeah. How, how would insert work?

**[01:51:38] Student 2:** As we have the index on the key, so we can simply do like insert where the key is this and we can put the value over there.

**[01:51:46] Teacher:** Okay. So what are insert query would look like?

**[01:51:50] Student 2:** It will be like insert into, and it will be the value and then where the key is equals to this, whatever the key we are putting over there.

**[01:51:59] Teacher:** So key, value and expired at, you would pass all three to do it. Okay. Yes. Is this robust enough solution?

<!-- chunk_10 01:52:10-02:02:46 -->

### [01:52:10] Put and insert conflicts

**[01:52:10] Teacher:** Now think of it. When you are exposing a key-value store, you fire put operations. Right. Yes. Put K1 V1. When you do put, it would trigger an insert. Correct. Right. It would fire K1, V1 and some expiration that you pass in over there. Then let's say another operation came in, which is put K1 V2. Now what would happen? It would fire the same insert again and it would fail. Correct? Yep. Because key already exists.

**[01:52:43] Student 2:** Already existing. So, so we should also add a where clause where the value is, but the value is [?null | asr: "nailed"] expired basically. What?

**[01:52:57] Teacher:** [unclear: "Will you not up like"] how will, when you do put operation, you expect this to replace this value. Correct. When you do first put, you expect what?

**[01:53:10] Student 2:** When you do put the key to set that value. And then when we are using the, yeah, yeah, yeah. Right. Okay. Got it. Correct. For the next one, we will update the value.

**[01:53:17] Teacher:** Huh? So how will you handle this? So then your put operation or insert operation is something different because now when you fire the same query again it would throw the error the second time. So now you can do get every time, check if the key exists, if it exists then you fire update. If not then you fire insert. Insert. So now for every put operation results into a get and a put. Correct? Yes. Yes, expensive because you are unnecessarily getting it. Right. So how do you make it better?

[01:54:07] So what you typically want to do is you'd want to insert if the key does not exist and you want to update if the key exists. Correct.

**[01:54:18] Teacher:** How do you do it without getting the key explicitly?

**[01:54:27] Student 2:** Maybe we can do this thing key. We can simply mark the previous key to be expired and create a new entry with a new same key.

**[01:54:34] Teacher:** You're still getting it, right? You're still getting it. Yeah. What you want to have to do, you would want typically this. If you're marking that is done, but this is your primary key. You cannot have two entries with that. Anyway, right.

[01:54:55] The devil lies in the details, right? When we, we never think about implementation, we just think our drawing boxes. This, this, this is what I want all of you to think about implementation. This is where you need to know when you think about the implementation use use. You know that get and insert or get or update is so costly. We have to make it better. So let me pull in Mohit. Mohit, go on. How will you do it?

**[01:55:23] Student 10 (Mohit):** Yeah. So like you could write a query like insert into store value K1 V1. If exist, do update. Basically we are trying to do an upsert query at the database level.

### [01:55:37] Upsert

**[01:55:37] Teacher:** Correct. So what you are trying to do is upsert. And so depending on the database you choose to implement this, see if they support upsert operations. Upserts are atomic, wrapped in transaction and just one SQL query. So you don't have to get it from the database, check if it exists and then write it in a transaction. You can just fire an upsert statement that does it for you. So your query, in case you are using, in case you are using Postgres, you just replace insert with upsert. That's it. If you replace insert with upsert, you get upsert behavior.

[01:56:16] Now what upsert does, if the key exists, let's say if you fire key K1, V1 and some expiration, you get K1, V1 and some expiration. Let's say another put came in, K1 V2 expiration. It would automatically just do replace this V2. So if it exists, it updates. Does not exist, it inserts. It automatically does that. Now, how is it more performant? You are anyway getting it now, but you are not doing that network IO to bring the data to your API servers. You are firing an Upsert. Let your database read it, exist, update, if not create. So you are saving that network IO, one network trip of firing this one query and getting it back and not having a gigantic transaction wrapped around. And it's much, much, much, much more efficient.

[01:57:00] So Upsert, if you are using Postgres, you can use Upsert. Otherwise you can use replace into. These are all clauses, by the way, or on duplicate key update. On duplicate key update. So Google search, Google search about them. You'll learn them. And in any case, we would be covering it. Today or maybe next week, somewhere. But you would have to, oh no, today only in this discussion itself, we'll be covering it.

[01:57:30] Pick your favorite, like depending on the database that you're using you'll be picking that up to implement it, right? This is how your insert would be [unclear: "full put"], your put operations will be [unclear: "full put"]. So if the key exists, it fetches it, like automatically does that. You don't have to make that network call or that network round trip to get the key and then check it and then wrap it in the transaction. That would slow down your throughput. This would keep your database throughput really high when you're using native upsert statements. Every database supports that because standard, every database has a different clause for it. Postgres calls it upsert, MySQL has a replace into or on duplicate key update, right? So depending on the database you would pick the favorite implementation there, right? So depending on the database, just find what they support, you would do that. So this way you keep the load on your database to a bare minimum by leveraging the upsert operation.

### [~01:58:25] Get and key expiration

[~01:58:25] So get, put, then delete that. Now what else? What else is remaining? Nothing. Storage, optimization, storage, insert. Update is straightforward. You just go and directly update. So put and this are same. TTL we talked about. Oh, TTL, TTL. TTL is remaining. How would you do key expirations?

**[~01:58:45] Student 1:** So for key expirations we can just to have this logic in server actually. So if we check the time right now and the time exp, if it is already and compared with expired, so if the time is definite, time now is definitely more than expired, we will just send like this key does not exist.

**[01:59:14] Teacher:** So you are still fetching the key from the database. So what is your get query looks like? Like your SQL query to get a particular key?

**[01:59:22] Student 1:** So basically select star from database where key equals to k1.

**[01:59:31] Teacher:** Okay. And then you would fetch the key on the API side, check if the key is expired or not and then return the corresponding response. Correct? Yeah. It's wasteful. You are reading, let's say the value was 10 MB big. You are making the 10 MB data transfer to your API eventually to realize that he is expired.

**[01:59:55] Student 1:** So I can also add and expired at, is expired at is greater than now. Correct.

**[02:00:05] Teacher:** And what we [?save | asr: "say"] with this one clause is that heavy network IO. Yeah. Right. Micro decisions, right? Please make your, your database performance. Right. For sure. Everyone would have done with this insert, right? Everyone would have written insert queries. But when you think about the devils, you realize [unclear: "absurdly wanted here"]. Also everyone would just, it's simple. Now, select a, the key equal to this. This is the real deal where you are not even reading that from the database. So if your values are gigantic, you are saving a ton of network IO. That's the beauty of this. Like go into those details. I just want all of you to have that curiosity. How to get like, you know, every single line that you want to get a performance out of. This is how you get. Okay.

[02:00:57] So we just implemented get and added this check. Now, also there is one more performance optimization on the similar lines. Not here but at, wait, I'll just talk about it, it will be much more fun when I cover it later, right?

**[~02:01:17] Student 1:** Okay, there is one more thing actually, what, so, it's about upsert actually. Okay, so let's just say like this key-value store or key-value store stores are transactional data. Okay, and somehow some, like some newbie came to the company and he misfired this, misfired this execution, basically he ran [?an upsert | asr: "an episode"]. Okay, so like there is a case, like there is a case like, when like when he's running put query he's accidentally updating the value which does not need to be, should not be updated, let's just say transaction ID and the whatever value it holds. Okay.

**[02:02:06] Teacher:** So why would that even happen?

**[02:02:09] Student 1:** Like you're firing Upsert.

**[02:02:11] Teacher:** You anyway have to support Upsert for high throughput. Why would you fire a random insert in your database?

**[02:02:17] Student 1:** No, let's just say like there was...

**[02:02:20] Teacher:** That's very specific use case, Rahul. Let's take it at the end. It's very extremely specific use case that you're talking about. Right. And in most cases, if it's human error, the team lead should be sacked. Simple as that, right? They should do very thorough reviews of every single thing that they are doing. [unclear: "UB"] should not operate on such things, as simple as that, unless it's thoroughly verified. But I'm happy to take it at the end.

<!-- chunk_11 02:02:46-02:14:38 -->

**[02:02:46] Teacher:** Let me basically cover a few of these details. I still have a bunch of things to cover in this. We are still here to touch upon high level and make it distributed and how Redis does that. I just want to spend more time on explaining that. So that's why.

## [02:02:59] Implementation on a single MySQL node

[02:02:59] Just bear with me for next 10-15 minutes. Okay, so what we do with this is we start with a simple MySQL with storage, we start a [?single node | asr: "single load"], no, don't think about distributed on day zero, it's that simple, and then think about distribute first, cover all the devils, sort it out, make things forward and then scale. So we add a simple schema called store: we have key, we have value, we store the TTL, we store is deleted. Like, this comes so naturally to us that, hey, we store the absolute expiration time and we store soft [unclear: "built it"]. But when we do this, let's think about storage. Do we really need every single column that we added? We are habituated, and I'm not even kidding, we are habituated into having an ID column, auto increment, for some reason. People are obsessed by it, and I know why: ORMs. ORM sucks, I hate them. But people are having because ORMs, because ID column makes [?ORM's life | asr: "orm slight"] simple, so they have to do it. And but you don't really always need ID column, but in case you need it, you add it.

[~02:03:55] So you add key, you add value, you add TTL. Now here, instead of doing soft delete having a separate column, you use a special value minus one in expiration, in TTL, in the absolute expiration time. That solves that problem for you. So this way you save space by not having that extra column, and you make your hard delete simpler. So now what you do: whenever someone deletes it, your delete is actually an update, and then you have a periodic job that deletes that, just batches it and deletes it. This is where your database has to do minimal B+ tree rebalancing. Makes our life simple, right?

### [02:04:38] Put - upsert and concurrent puts

[02:04:38] Okay, now inserting a new key here or doing a put operation. You expect when same key is put twice, the second value replaces the first, which means you are inserting a new value, cannot be an insert, it has to be an upsert. Because instead of getting the value and putting it, and like getting a value, that is inserting or updating, is pathetic, right? It would slow down your system by a massive [?margin | asr: "barge"]. So that's not what you do. Is depending on the database you pick that, so you typically write insert into store values, replace insert with replace, that is upsert in MySQL, and replace insert with upsert, that is upsert in Postgres. Depending on which database you are picking, you would either use insert into or upsert set, because you want upserts there.

[02:05:25] Then when you are having multiple put requests you are doing it, locks that we just studied. If you are having to support that, you do something like this, or play with isolation. This way, handling multiple concurrent put requests, because SQL database already gives you these guarantees, you can just leverage them. You don't have to reimplement a bunch of stuff. So if you need it, just take exclusive lock for update no wait, because I don't want to wait, I just want to kill myself in case someone else is updating it. Hypothetically, hypothetically. There is no right way to do it, it depends on the guarantees that you want your database to provide. I say I use no wait just for fancy, right, but there's no specific reason. Depending on, when you're designing a database, is what kind of guarantees you want to provide. That would determine what you put over here. Would you put skip lock? Would you put no wait? Would you not put anything and just keep on waiting stuff? And then you do an update, whatever you want to do. Okay.

### [02:06:29] TTL - batch deletion with cron job

[02:06:29] Now talking about TTL. TTL, we'll talk about multiple approaches. First one, batch, cron job, straightforward, and then we'll talk about how Redis does it. Very interesting algorithm. So approach one, we do batch deletion with cron job. So every 10 minutes we trigger a hard deletion that fires a query that looks something like this. Select star from store where key equal to k. Oh, sorry. Oh, sorry. [check: possible ASR duplicate] It would just do hard delete where we would just fire delete queries, delete from table and deleting it. Right. So delete from table where expired at is less than now, and it would do that hard delete for you.

[02:07:09] But now here what would happen is a case where before the next hard deletion job ran, what if you read it over here? The key would still be existing. So your get needs to be handled. So you're getting a key should not be as simple as select star from store where key equal to k. It should be select star from store where key equal to k and expired at [?or | asr: "our"] TTL is greater than now. So this way, what we get is, we get this beautiful thing where we save an expensive network IO by not having to move the value to the user and filtering it out there. It saves the network bandwidth of the server. It saves the network bandwidth of the database. It saves the disk IO time that your database spent to read that humongous value. All of that is saved. And this micro-optimizations make your database far more [?performant | asr: "proper"].

### [02:08:02] Lazy deletion - in-memory databases

[02:08:02] Right. Okay, this is about disk-based. Now again, if, if I was doing an in-memory database, not disk-based database, in-memory database, warning, I'm [?reiterating | asr: "re-hydrating"], if it was in-memory, then you could do lazy deletions. Now what is lazy deletion? And almost all in-memory databases do that. Here, in this case, we were going to DB and fetching it, but with in-memory database, where your data resides in memory, for example Redis, right? When you fire a request to Redis, that key, if a key that is get or accessed, if Redis finds it to be expired, it immediately deletes it. Redis does not have to rebalance the binary tree [unclear: "and what are."] hash table, right, because it is in memory. You can very quickly, there and then, you can delete the key. How? By firing a delete. Delete as in your malloc delete, [unclear: "while i delete"], right? You malloc, you free [?stuff | asr: "stop"], right? So malloc, free, new, delete, C, C++, that.

[~02:09:10] So here what would happen is you can literally delete a key from the hash table without having to pay any network IO penalty. This way, what you get is, when someone accesses, let's say a user accesses a particular key in Redis, Redis checked its in-memory hash table, found that key to be expired, it immediately deletes that particular key from there. This is called lazy deletion. So it may not have to proactively go and delete it. If it found [unclear: "the side"] to be expired, it can immediately delete it. For on-disk database, I'm iterating it 100 times, not for on-disk database, because it would make things really slow for that, right? Because every micro delete operations requires rebalancing of B+ tree, pathetically slow. So that's why you do batch deletion when you are on disk. When you are in memory, you can do pointed deletions or staggered deletions, right? Okay.

[~02:10:10] So Redis does this. By the way, Redis does lazy deletion. So if you have a key in Redis and that key has some TTL set, Redis has a, not a thread, but a kind of, kind of a synchronicity. I cannot reveal the details because I cover it in my course, but still, and obviously it's out of scope for this. Redis has a kind of thread, assume it as a thread, that when it runs this part, before it runs this part, what if someone get that particular key? That key would still be there in the hash table. When the key is there in the hash table and it wants to, it's accessing that, it cannot return that key to the user, so it tells to the user that key does not exist. But because it found the key that is expired, it goes out and deletes the key right there and then, because it doesn't have to restructure. It's not an expensive operation for it, is, it can just delete it right there. Okay.

[02:11:11] Okay. So now what about the keys that I never accessed? Because what if I do not have this job that deletes it, right? I took an approach of doing just lazy deletion. That's it. Which means I have my in-memory database like Redis. And now what my Redis says is, I would delete a key, hard delete a key, either when user tells me to hard delete a key; second, if I access a key that is expired but not deleted yet. That is where lazy deletion comes in. Now what Redis does as part of this regular job is that it does not do hard deletes of all the keys.

### [02:11:57] Redis expiry - sampling algorithm

[02:11:57] Now this is where a bit of Redis internals kicks in. So now this is a very beautiful algorithm. Very simple. Uses math a bit. You cannot run away from math [unclear: "fii"], but you need to know how Redis does it. So what Redis does internally, it takes up two approaches and merges it. So you may think that this approach is great, it runs periodically, does this deletion. Natural way to think of it is, when I'm running this particular job at every periodic interval, I will delete all the keys that are expired, but not yet deleted. Correct. If you do that, then it takes up, let's say there are millions of keys like that, it takes up a lot of time to delete those large number of keys. Right. So what Redis says is, I would do lazy deletion. With lazy deletion, if someone accesses a key, I would delete that key immediately. So that solves 90% of the problem. Because there is very high chance you are accessing a key that is expired. You are hard deleting it. So you are anyway freeing up the memory. That is one.

[02:13:16] But now this leads us to an edge case where what we are stuck with is, what if a key is expired but never accessed? So which means we have to rely on a job like this. What does this regular periodic job does in case of Redis? Not our database, but I'm just leveraging this to discuss a bit of Redis [?internals | asr: "interface"]. So what Redis does is it does not delete all the expired keys. It samples and then deletes some of them. So the idea is, again, not suitable for disk-based database, only for in-memory database you can do this. So what Redis does in this periodic jobs that we just spoke about, in periodic job, Redis samples exactly 20 keys that has some expiration set. So out of all the keys that are there in Redis, it samples, randomly picks 20 keys. Out of those 20 keys, it sees how many of them are expired. It first deletes all the keys that are expired from that sample. It will be out of this 20. All the keys that are expired, it deletes that. It sees that if the number of deleted keys from the sample are more than 25%, then you repeat the process. So which means... Now here a bit of statistics comes in.

<!-- chunk_12 02:14:38-02:25:36 -->

**[02:14:38] Teacher:** Population is what you have, your entire Redis key set, with some expiration set. If you randomly pick 20 out of it, this is a sample. The distribution of population and distribution of sample, so sample should be representative of population. That's a normal statistical concept, right, that if you randomly sample something, it would represent the distribution of your population, right? So you pick 20 keys at random. So if out of this 20 keys, let's say 50 percent of keys are expired, which means that in your population there would be roughly 50% of keys that are expired, right? So what Redis does is, it, instead of saying I would go ahead and delete all of them, it's take this sample, sees if in this sample there are how many keys are expired. If it is less than 25, it stops the process. If it is more than 25, it repeats this process continuously.

[~02:15:33] So this is what it ensures, is that it does not have to spend a lot of time doing the entire deletion, because number one, it is very likely for someone to access an expired key and then Redis finding it out to be deleted. So this takes care of 90% of cleanup, while for remaining 10 it says, I don't really have to worry about it, because eventually that could be triggered. Even if that does not trigger, I'd find those keys, I would take a sample, out of those 20 I would pick up the keys that are, that are expired, delete them. If they are more than 25 percent of the sample, I would repeat this process. This way. And this process stops when in my sample of 20 the number of keys that I'm deleting is less than 25 percent. Which means out of 20, if, let's say, in one of the iteration I found out that out of this 20 only three keys are expired, right? So you delete those three keys, and now because this only three keys, which means only 15 percent, only 15 percent of keys were expired, which means that in your population 15 percent of keys would be expired but not deleted, and it is okay.

[~02:16:47] So what it is, that Redis optimizes for speed and not completeness of the system, because if it spends a lot of time doing it, it would have less time to do other part, which is except like read and writes and all, because Redis is single threaded. There is no multiple threads in Redis running anywhere. Because it is single threaded, it has to leverage that. So now, which means that there is a chance, there is a chance where there are keys in memory of Redis which are expired but not deleted. They would eat up the space. Statistically speaking, it would consume only 20-25% of the total consumption of the memory. And that's the worst case, because you are anyway doing lazy deletion. It's not that Redis is only relying on that. So bulk of the deletion will be done by this anyway, because you are very likely to access a key, finding out to be expired, and Redis automatically deleting it when it accesses that.

[02:17:58] So in combination, approach 2 and approach 3, what Redis gets is, Redis gets the speed. It spends very minimal time in doing that cleanup, in running that job, because Redis is single threaded. It does not have other thread to do that. It cannot do it, it cannot have other threads to do it, because it is single thread. It had to do this in order to take out time to do actual stuff that matters, get, put, delete and other part, like handling actual commands. That's why it does that. And why 20 keys? Exactly 20 keys, not 21, not 22, not 20, 30, not 15? Because of central limit theorem. Now the proof of it is there in a paper, Google search, you'll find it. It's also tagged in the Redis's website, is in the paper. If you like math, go and explore that. Otherwise just remember it's exactly 20 keys that it samples. It works for up until 5 million keys, which is pretty decent amount, right? But this is such a brilliant implementation.

[~02:18:52] So now here, what this tells us, this tells us that there is no one way to build a system. Whatever works for you, works for you. And so Redis does not go for correctness, or rather the completeness of the system, that hey, whenever my job runs, have to clear up every single thing out there, right? It just went for speed. Redis is optimizing for speed by trading off a bit of memory leak, assuming that eventually that would be clean up. How? Because lazy deletion and random sampling. This way Redis spends bare minimum amount of time while it runs this periodic job. And this is how Redis actually does this.

### [02:19:43] Delete micro-optimization

[02:19:43] Apart from that, delete, when you are deleting, this is where one more micro optimization comes in. When a user is deleting a key, what we do? We update, we set TTL equal to minus one. So our query looks something like this: update store set TTL equal to minus one when key equal to K1. We just think this much. Now here, what you can also do is add this. So set, or delete a key, only when it is not expired. Why? Why this statement? Why this clause? This clause would help us save [?disk IO | asr: "discalpe"]. How? For example, if a key is already expired, right, which means it's TTL, it's expired at, it's already expired. So if you are deleting it, which means you are setting the TTL of a key which is already expired. When you do that, you are updating that particular row. But if it is already expired, you don't need to update that row. You can save that disk IO. So what you do is, although you fire this update, this update would not do a disk IO if the key is already expired, because of this clause.

[02:21:08] Is on the disk IO. And not just one, but two, because you would have index on TTL anyway. So you are saving two disk IOs by adding this one clause. Micro optimization. You would be very happy to do this much. But adding this one clause helps you reduce the load on the disk, subload on the disk. This is micro optimization. This is what I found in Apache Ignite. I was just wondering, why would you do that? Why would you do that? Then I mimic the load. And then it struck me. Oh God, this is such a nice optimization. TTL is greater than now. You set it over here. So you update. So you basically, what it says, suggest is, you do the disk IO only when it is needed. Otherwise you don't do it. This one clause ensures that. Right. Okay.

[02:21:57] Now batch cleanup would be just this, that we just discussed: delete from store where TTL is less than equal to now. And get also: select star from store where key equal to K1 and TTL is greater than now. You never make an IO, that network IO, for something that is already expired. Right. Okay. Now, okay.

### [02:22:17] Questions on TTL and delete

[02:22:17] Let me take questions on this and we'll go into high level architecture. Okay. I'll take a few questions and then we move forward. Rahul, go on.

> **Student Question [02:22:23] - Student 1 (Rahul):** So basically my question is about like, why do we need to set like TTL to minus one? We can just like a delete and batch job when we have.

**[02:22:35] Teacher (answer):** How, how would you delete it?

**[02:22:38] Student 1:** [check: speaker boundary - "deleting it how would you do it" may be the Teacher] Deleting it, how would you do it? So basically, normally the TTL will be in date time format, right? No absolute epoch time, by date time. [check: speaker boundary - "okay so that can cause issues ... even if you're doing" may be the Teacher] Okay, so that can cause issues like that, even if you're doing

**[02:22:52] Teacher:** date time, you set a time which is earlier, let's say before first January 1970, or maybe 000, right? You said something like that.

**[02:23:02] Student 1:** No, basically like a TTL, not like, I am thinking about expired at case basically.

**[02:23:11] Teacher:** Yeah. This is expired at. Yes.

**[02:23:13] Student 1:** Yeah. So basically, at expert, like expired at will have all the information about even about the date and even about the time also. Okay. Okay. So like setting it to minus one is, I think it's kind of like adding a one more step when you like, when you're like, just check the delete, batch delete query. Okay. So yeah, it will compare it with now. Okay. [check: speaker boundary - "Don't go into details now that" may be the Teacher] Don't go into details now that

**[02:23:46] Teacher:** now this, assume this is not minus, this can be an epoch timestamp. Correct. Okay. Yeah. The problem? Yeah. I'm writing it now. Should I write the actual time there? No, right? [check: speaker boundary - "I'm writing it now. Should I write the actual time there?" may be the student] Yeah. Okay. Think about it. And if not this, change this minus one to some magic value,

**[02:24:07] Student 1:** [check: speaker boundary - "let's say first January 1970. That works." may be the Teacher] let's say first January 1970. That works. No, I mean, I am saying like, we even don't need to update that value. We will have like the time at which it will expire, right? So [?batch job | asr: "bad job"] or job comes, it will automatically compare those times. Right?

**[02:24:30] Student 19:** Yeah. Because of this lesser equal to now.

**[02:24:33] Student 1:** Yeah. So like, I don't see a point of like setting.

**[02:24:37] Teacher:** What if TTL is not set for a key, then key was never expired. If you'd be a user specifically hard delete a key, or if you don't delete a particular key, then what would you do? You'll not do anything.

**[02:24:49] Student 1:** Okay. In that case we will have to say that implement delete.

**[02:24:52] Teacher:** You are explicitly deleting a key. How will you do it? You have to do something in the database, right? When you're deleting it.

**[02:24:59] Student 12:** Yeah.

**[02:25:00] Teacher:** Right. Pankaj.

> **Student Question [02:25:03] - Student?:** [check: Teacher called "Pankaj" just before; name spelling] Just to confirm. So when you say when we are saving on disk IO, when we do select star and all, it is happening because we have indexed TTL and databases into the TTL table. Right. And if, if we, if we do not index it, then we'll anyways be reading that value also because [unclear: "edit out"], it's expired and then we skip that.

**[02:25:27] Teacher (answer):** Yeah. You'd have that index. Yes. Sampath.

<!-- chunk_13 02:25:36-02:38:15 -->

**[02:25:36] Teacher:** *(admin)* Your voice is breaking, Sampath. I'll just loop you in again. D Agrawal. Yeah, please, please write your first name. It makes me easy.

> **Student Question [02:25:51] - Student 7:** Hi, Arpit. This is DPA [check: name spelling]. So my question is, yeah. So you talked about reducing the network cost, right? Trip to database, right? When we were talking about inserts, I had an idea around the similar concept for insertions, right? For optimizing insertions. That let's say when we are trying to insert a key-value pair, right? And if there is, if the key already exists, right? Can we have something like, so we have on this database, we want to reduce the IO, you know, this IO. So what if we have an in-memory layer, right? In front of it. So when a key-value pair comes in, you kind of maintain sort of an append-only structure in memory, right?

**[02:26:43] Teacher (answer):** [check: reply starts mid-sentence] Design, but you can do all sorts of files. You are just adding a cache in front of it. Kind of. Where you are just keeping track of all the keys.

**[02:26:50] Student 7:** Right. And then kind of, you know, Bloom filter. Well, that and also I was thinking it will also reduce the disk I.O. Right. Because you are just having it in memory. Key one, value one, key one, value two.

**[02:27:05] Teacher:** But then you are limited by memory where all the keys needs to fit in memory.

**[02:27:09] Student 7:** Correct. Yeah. Yeah. I mean, we would need to flush it.

**[02:27:13] Teacher:** From time to time, sure, yeah. But yeah, you can do that, you can do all sorts of ads, but that's not your core transactional database per se, right? So those are all, those are the performance of recommendations that you can prepare, right? We'll be touching upon two of those in fifth and sixth week. Anything? Sure, thank you. Yeah, somebody, I'll just pull you in in some time, okay? We'll...

## [02:27:36] High-level architecture - KV API, replicas, sharding by range

[02:27:36] Let me quickly cover high level [?arch | asr: "arc"] of that. So up until now, we spoke about those implementation on single node, MySQL DB, but obviously we want a distributed key-value store. So what we do is we have, which means that we have massive data, which one node may not be able to handle. When I say handle, as I spoke about in last week, it does not be just query or just storage. It can be any high network IO, high disk or rather large amount of data being stored or large amount of query being fired. Anything. One node is not able to handle the load of it. That's what we have to make it distributed.

[02:28:15] So a basic one node architecture would look something like this. User, load balancer, API servers. Anyone who wants to talk to the database will be talking via this API server. Maybe a user, maybe a client, anyone. This is our database. In this we have bunch of API servers whose responsibility is to talk to this MySQL and fire the queries that we just discussed. We would have a separate job that is continuously running on and basically firing queries on MySQL to do this batch cleanup. This is what we have right now.

[02:28:49] Now for us to handle the load, let's say our database is, our MySQL server is able to handle the incoming requests that are coming in. So for us to handle the request, the large number of requests, all we have to just add more API servers that could do the job, right? Assuming that your MySQL is able to sustain, but what happens when you are not able to sustain it? When you are not able to sustain it, what you do is you create, you first go through the access pattern that, hey, do we have huge read requests or huge update requests? For example, in our key-value store, you would have those metrics that which queries are being fired more, select or update or upsert or delete.

[02:29:28] If you see that there are large number of read requests being fired, what you do is you spin up replicas of this DB. And when you do replicas, you are allowing some staleness in the data. It's okay for you to serve stale data for some use case. And in case you need consistent reads, you have to go to master. If you want inconsistent read or little stale is okay, your API server can directly talk to replica and get it done. Which is where if consistent reads go to master, updates go to master, delete go to master, data asynchronously replicates on the replica, KV API server can either talk to master for the key operations or can directly talk to replica. Exactly what we discussed last week.

[02:30:16] So KV API will have connection with master and replicas, and depending on what kind of read the client is requesting, you would either fire it on master or you fire it on replica. So KV API will have connections with masters as well as replicas. Simplest way to implement it, not adding central proxy, nothing complication, we will add a complication later. Keeping it really simple, your API servers will create connections with master as well as replica and get it done.

[02:30:48] But now there would come a time where your one master will not be able to handle the write flow. Which is where what you do, you first try to vertically scale up. When you cannot do that, then you shard your database. When we say sharding, it's literally having exclusive copy of data across databases. For example, if my key-value store, let's say support string A to Z. So what you have is you have one master that handles A to M and another master that handles N to Z. Each master may have a set of replica to support it. Each master will have its own batch cleanup job independently running. That is cleaning up over here.

[02:31:30] KV API will have connections with masters and replicas. Depending on how you can do intelligent balancing and whatnot in order to not have connections, connections to all these databases, you can minimize that, that's a different problem, that's intelligent balancing that you may want to do. But the idea here is, so your KV API knows now, here KV API knows which database holds what range of data. So KV API knows that, hey, if Arpit is requesting data for Google, let's say stock prices something, right? Arpit is requesting to see the stock prices of Google, the current stock price of Google. Google starts with a G, I would have to fire a query on master one to get it. If someone fires app stocks for Zomato, request would go over here.

[02:32:24] Now who would have this information? Routing information, if we call it the KV API. Right? Here what we are doing is we are keeping this information, the routing information at the API server side itself, which knows which database connection to choose to fire which request. This is a simplistic implementation of it. Now obviously hot partition problem and scaling up and adding your replica on the fly, all of this would come and we would discuss fifth week, sixth week and seventh week a lot in depth, how to handle hot partitions and scaling up dynamically and whatnot. We'll talk about that in depth. For now keep it simple, let's see if we just have fixed...

[02:33:06] Each database is a master having a set of replicas to that. KV API is establishing connection to all of them. Routing information is with KV API. When the request comes in for a particular key, KV API knows where to forward it to because it's just a range that it stores. It knows which range I'm requesting. It goes and talks to the particular connection, through that connection to the database, [unclear: "pars"] the query, gets the response, sends it back to the user. Dead simple.

[02:33:32] But this is how most, in most cases, like 90% of sharded databases work like this, because it's very unlikely for you to just have, like, dynamically add a number of shards to your system. Very unlikely. Very few databases, very few real world use cases need that, to dynamically increase the number of shards and reduce the shards. It's typically in one-time activity, happening once every quarter, so you can explicitly do it and not over complicated, which is why I'm starting simple. When we enter fifth week, we'll see how to do it dynamically, where consistent hashing comes in, how hot partition problems are addressed. We'll talk all of them. Fifth, sixth, seventh week is all about that. But for now, we'll just keep it simple.

[02:34:15] Now, if let's say tomorrow we have another thing to handle, let's say two nodes are not able to handle it. We add one more and we split this range into three parts and then do that. It's very simple. So this way, what we get is, we now have a distributed database setup, each having its own replica, handling the corresponding load, read load, while writes and critical reads go to the master and a batch cleanup job that takes care of cleaning up stuff. And all the routing information is with KV API. Nothing more, nothing like, keeping it really simple. Right. So not over complicating the problem at first. Keep it really simple.

[02:34:58] But what I would recommend all of you to do once, at least once, implement this. It's a local setup. You don't even need cloud for that. Just spin up a MySQL server, two MySQL servers, local machine, right? Have one API server running that is creating connection with both of them. Write that routing logic once, expose an HTTP endpoint, and then route the request. This system, right? And as a stretch, create a replica that listens to this. How do you do it? MySQL binlog if you're using MySQL, Postgres has [?commit log | asr: "commit blog"], see how they're configured, right? But this should be the last step that you're doing. Once you have that setup, then on the KV API create a connection with this replica running locally on your machine. You don't need fancy cloud for this, right? And then just see the routing information that, hey, this is a critical read, I have to forward here, and [unclear: "what right"] do that. Implement it. When you implement it, with understand it much better, right? Okay, so this is all what I wanted to cover as part of distributed key-value store on top of relational DB. We'll get to talk about hot partition problem, we have to talk about dynamic scaling, dynamic partitioning, all of that fifth week will touch upon, when we cover enough for us to understand that, right? There is a lot of prerequisite for us to even understand that, right? We'll talk about consistent hashing, we'll see where consistent hashing sucks big time, where it is very good, where it is very bad, hot partition problem, three ways to handle it, all of that, right? But for now we'll just keep it simple. But what I would really request and recommend, rather, implement this. It's not difficult, not at all. Just implement one small [?component | asr: "company"], you don't need [?batch job | asr: "bad job"] now. Just implement this replica once, routing layer once, like things will be so clear in them.

## [02:36:55] Q&A

[02:36:55] Okay, folks who may want to drop off will be to drop off. *(admin)* I'll upload the recording by three. Now I'll take questions first, or on the second part that we covered, and then we'll move to the [~02:37:03] other question that you might have, something.

> **Student Question [~02:37:03] - Student 1:** Hey Arpit, so my question is on the delete thing. Can you, can you please go to that slide where you said implementing delete? Yeah, here. So the implementing delete, right, basically you will delete something which has already been expired, so that means it should be less than now, right? But here you said TTL is greater than now, so that...

**[02:37:27] Teacher (answer):** No, this is not batch delete, this is delete operation by a user.

**[~02:37:27] Student 1:** Yeah, even by a user, it, the TTL should be less than now, right? If TTL is less than now, which means it is already expired.

**[02:37:40] Teacher:** Why would you delete something? Like, it's deleted by a user.

**[02:37:47] Student 1:** Yeah, so if it is, if now is one and TTL is, then, then you won't delete. Wait, wait, wait, just a minute.

<!-- chunk_14 02:38:15-02:49:59 -->

**[02:38:15] Student 1:** Huh, yeah, go on. [check: "huh yeah go on" may be the Teacher letting the student continue] So, so my point is, imagine TTL is two second and now is one second, so the time to live is still two seconds, right?

**[~02:38:23] Teacher:** But now is only, TTL is expired at, the absolute time of expiration.

**[02:38:31] Student 1:** Sorry, I just, maybe just, I'm not getting, TTL as, TTL is expired, absolute time of expiration?

**[02:38:37] Teacher:** When your time needs to, when your key needs to be expired, it would be like 12 o'clock. Okay. On this particular day.

**[02:38:44] Student 12:** Okay.

**[02:38:45] Teacher:** So then when you're setting, you, what you have to do is you have to set it to a magical value. That's a minus one. Right. If you had expired at is greater than now, then only you set it, other than you don't set it. Correct. If the keys get to expire, then only you are deleting it. Otherwise why would you delete it? Correct. Okay. Batch delete is different. That is clean up. Where you are doing TTL is less than now, where keys that are already expired, delete them. Here we are updating soft deletes. Okay. Correct. Okay. Okay. Yeah. Right. Updating, setting TTL to a magical value, to a magic number, where it is not yet expired. You are hard deleting when it is expired.

**[02:39:37] Student 1:** Oh, okay. So these are yet to be deleted of the first one, this is user delete operation.

**[02:39:42] Teacher:** User triggered a delete of a key, okay? You are not going ahead and deleting the key, hard deleting every time, otherwise it would require rebalancing of binary trees, correct? Oh sorry, B plus, right? You're not doing, you're doing batch delete afterwards, okay?

**[~02:39:54] Student 1:** And that's why you said that reducing the load on disk, only if it, TTL is greater than now, because anything less than equal to that is anyways taken care by the batch, so you don't want to worry about that, correct?

**[02:40:09] Teacher:** So you would save on disk IO by not having to write it to the disk, because this update would fail, because this would not let it match to the keys, right? Okay. So even though you are firing an update, it would not lead to any disk IO for expired keys, okay?

**[~02:40:20] Student 1:** So basically heads you win, tails also you win kind of a mechanism, because it's greater than now, so you will do it, if it less than now... Okay. Thank you very much.

> **Student Question [02:40:34] - Student 2:** Sidesh? [check: "Sidesh?" may be the Teacher calling on a student; name spelling] Hey, I have a question on high-level architecture diagram, like clearing my understanding. So assuming that the background MySQL provides all ACID guarantees, if we design it as it is without any partitioning, we guarantee the same ACID properties in the KV that we design.

**[02:40:55] Teacher (answer):** Yes, we do. Sure.

**[02:40:57] Student 2:** Yeah. But when we partition it, I, my understanding says we lose atomicity because we do not...

**[~02:41:01] Teacher:** It's a key based operation.

**[02:41:10] Student 2:** No, no, yeah, I agree. Like, what I'm trying to say is, for key based yes, but the original store gave you an additional way of saying for atomicity in a transaction. If I have four keys, like take the airline example, right, all of them will be satisfied. Now if your four keys, in the partition database, three lie in one and one lies in the second one, you can guarantee only three...

**[02:41:36] Teacher:** Value databases don't do that. Key value databases give you operation on a key based, right? No, no, I agree, I agree. So if you're doing cross partition, then you cannot have ACID, as simple as that. You cannot have ACID guarantees across partitions.

**[~02:41:48] Student 2:** Got it, got it. So basically when we say this, we will, we still have ACID with the interfaces that we have provided.

**[02:41:57] Teacher:** Correct. Correct. But so distributed transactions, they reduce your performance by a huge margin. You typically don't do that. So which is where you still guarantee ACID, but within a shard. You may still get it. For example, for all the keys, I can still guarantee ACID. Let's say here I can still guarantee ACID so long as all the keys that I'm performing operations on lie on the same node. So in this range, I can still guarantee [?ACID | asr: "us"]. Yeah.

**[02:42:27] Student 8:** Thanks. Yeah.

> **Student Question [02:42:34] - Student 6:** Hi, Arpit. So my question is like, I mean, there was a time sometime some years back a person from IIT Delhi created an app where he, for the booking, I think he had created an app which made faster booking. So do you have an idea on how he has done that?

**[02:42:53] Teacher (answer):** No idea about it.

> **Student Question [02:42:55] - Student 6:** Okay. The second question was with respect to mocking of the distributed system in local machines. Like, I mean, you mentioned about the MySQL server having, for the data side, but how can we mock? I mean, the application app servers and all that, you need one app server.

**[02:43:11] Teacher (answer):** [unclear: "Why do you read?"] I've been with the entire [unclear: "Atlantic and"] system local. Correct. Yes. Just focus on the things that matter. Don't go into, I want autoscaling and multiple large requests. What you want is granular details, [unclear: "devils"], you want to know that, you don't want to do that same stupid CRUD operation again and again, correct? What you want to, what you should focus more on this part and not other part, right? Just your local machine, one database running locally, one replica running locally, that's it. Focus on that. Focus on things that matter.

**[~02:43:40] Student 6:** Sure, thanks.

**[~02:43:40] Teacher:** Yeah, Amrik. [check: name spelling]

> **Student Question [02:43:49] - Student 2:** Yeah, I have a question on that random sampling and deletion. There was one point that if the deleted ones are greater than 25, then repeat the process. Shouldn't it be expired ones?

**[02:44:06] Teacher (answer):** Are they expired? They are deleted. These deleted keys, delete from the sample. So if the number of deleted keys from the sample are greater than 25%, it would not know expired keys count. [unclear: "or knows expert is counted."] And that's already slow operation. Out of this 20 keys at a sample, [unclear: "It is finding good folks. Not listen."] Yeah. 20 keys. I take sample of 20 keys. Out of this 20 keys, I find which one are expired. The ones that are expired, I delete them. If this deleted keys are more than 25%, I repeat the entire process. These deleted keys. That's what I said, right? Delete all the keys that are expired from the sample, and you deleted keys are more than 25%, you repeat the process.

[02:44:51] So it's only doing it on the sample, not on the database, because having to do it on database is a huge operation. At a given stage there might be millions of keys that are expired but not deleted. Here it's doing just small operations very quickly. So what it is trading off, it is trading off that there might be some keys deleted in population, but it's okay, there would not be more than 25 percent of that, because sample represents the population. Okay?

**[~02:45:21] Student 2:** Okay, thanks.

> **Student Question [~02:45:21] - Student 1:** Yeah, so question around the sampling thing only. I wanted to ask that we can't do this in [?disk-backed | asr: "this backed"] DB because, first thing what I can think of is, like, we will be getting all the records and then filtering out top N number of records, and we have to do a [unclear: "complete trade"], and secondly, I think the, we are, if we are deleting that, we have to do a rebalancing. Or here, do you think, like, any other thing which would be hampering us?

**[~02:45:59] Teacher (answer):** That the first, first thing that you said, it's not that you, because, so you may not have to pick up entire set of rows and then pick 20 out of it. You may pick 20 random rows, but it would require you to do 20 random disk IOs, very slow, right? Because 20 random disk IOs, your data may be present anywhere in the disk, you're reading disk pages randomly, that is very slow. You cannot just read random rows from the database efficiently, right? In memory you can very, very easily do that. On disk you cannot do it, right? So picking up 20 keys from an on disk database is a costly operation, because of which you cannot do it, or rather you should not do it, because it be very slow. It would be much better if you just skim through the rows and delete what you, at this point, delete what is expired, rather than doing this optimization. In memory, it would work just fine.

**[02:46:54] Student 12:** Okay.

**[02:46:56] Teacher:** But what you said, I just elaborated on the first point. Right. And that is like, it's not like you can still pick, but picking up random 20 keys from it is expensive, rather than, you don't have to pick all the rows and then sample it. You can just pick 20 at random, but picking those 20 at random is an expensive operation, because 20 random disk reads, very expensive. So you typically avoid. Any other question, anyone?

**[02:47:26] Student 2:** I have a bunch of them on the last classes.

**[02:47:30] Teacher:** Okay. Let me ask someone, anyone from this class? Ajay. [check: name spelling]

> **Student Question [02:47:35] - Student 1:** Yeah, hi. So I have question regarding, we do that start transaction and then we are doing that for update and then we commit it. So in database, by default, auto commit is true. So will it work without we do start transaction, like we do for update?

**[~02:47:49] Teacher (answer):** No, auto commit is true for shell. If you do auto commit, it's on. Yeah, it's on transaction level. On transaction level also there to take locks and do it exactly how we did it. Right. Okay. So even if auto commit is false or true, so auto commit is true. When you say auto commit is true, it means when the transaction is committing, it is committing, it is not that every single line it is committing. When you start begin transaction and then write and then end transaction, that is actually a transaction. But if you just fire one standalone SQL statement, that would be committed. That's what auto commit true means. Okay. Right. So if you just tried one random statement, they're not wrapping it in a transaction, that is where your auto commit true comes in. But if you're wrapping it in a transaction, it would anyway not do it. Thanks.

**[02:48:41] Student 8:** Okay.

**[02:48:42] Teacher:** Rahul.

> **Student Question [02:48:43] - Student 3:** Yeah. Hi, Arpit. So my question is on the first discussion that we had on locking. So we discussed two approaches, for update and for update, skip locked. So you told that for the, for update thing, we'll run N into N plus one by two queries.

**[02:48:59] Teacher (answer):** Not queries, evaluation of queries. Evaluation of queries. [unclear: "from RN would still fire inquiries"], internally database will evaluate those.

**[02:49:08] Student 3:** Yeah. So basically what happened is, suppose 120 threads and all of them at the same time got the seat one. And you told us that the, that one of the thread will get the execution, where we'll, we'll be faster than the others, and it will get the first seat, and the database will then trigger the other thread that the row one is filled, because they were waiting for the seat one, and then the database will trigger that the row one is filled. Now they will reevaluate the query. The database internally will reevaluate the query. And that is why you said that N into N plus one by two queries. Correct. Correct. Because for the next 119 seats, now the locking will happen on the seat two. And then all the, all of them will wait for the seat two, and then 118 will wait.

**[02:49:50] Student 8:** One would move forward. Yeah. [check: possibly the Teacher interjecting]

**[02:49:52] Student 3:** So on and so forth for the subsequent queries. But for the for update, skip locked...

<!-- chunk_15 02:49:59-03:02:13 -->

> **Student Question [02:49:59] - Student 3:** Suppose 120 threads, they went at the same time and for the first query, everybody will, but the database will, everybody will first wait for the first seat, right?

**[02:50:10] Teacher (answer):** Because that's what your database would not have to do it. Your database internally, when it reads, it does not just read one row. It reads one disk page, when this page may contain hundred rows. If it sees that first row is locked by someone, it can immediately move it. It doesn't have to do revaluate the query again.

**[02:50:26] Student 3:** Okay. So, so what I understand is the query that we wrote was limit one, right? Order by limit one. So when the, the, that, that read will happen, it will have only one row.

**[02:50:37] Teacher:** No, that's what I'm saying. That's what database internals is all about. It would not just read one row. Anytime when you read from the database, it does not just read one row. It reads one disk page, that one disk page, one B+ tree node may contain hundreds of rows.

**[02:50:51] Student 6:** Okay.

**[02:50:52] Teacher:** So it does not really have, it can just move to the next one. That's the beauty of it.

**[02:50:57] Student 3:** Then, then I could, we can say that only 120 evaluations will be triggered. Right. Yeah. And then I can, can I also say that I'm not sure about the internals, but can I also say that then the limit one that occurs in any query that we write, whenever we use the limit keyword, that occurs after the disk, we have read something.

**[02:51:19] Student?:** Perfect. [check: STUDENT_8 label (mixed); may be the Teacher evaluating the answer]

**[02:51:19] Teacher:** It happens at the last step when you are filtering it out.

**[02:51:23] Student 6:** Okay. Okay. Got it.

**[02:51:24] Teacher:** So it does not happen before, it happens at the end.

> **Student Question [02:51:28] - Student 3:** So ideally in case of skip locking, whenever we skip locking and we are using a limit, so we should not consider that as a part of the query. We should understand that the first where clause will read the entire disk page, whatever you're saying, and then the limit operation will occur and then it will enable us to limit

**[02:51:47] Teacher (answer):** [unclear: "operation Everest."] So limit and offset. So basically limit operation happens at the end, right? After that, so when you're, when he's accumulating the results, that's where limit operations comes in.

### [02:51:57] ORMs

> **Student Question [02:51:57] - Student 3:** Okay. Got it. Got it. Also one small thing on the, you just mentioned that you don't like ORMs. So could you give me a nudge about like, where to read why?

**[02:52:09] Teacher (answer):** Just Google search. Why ORMs are, why ORM sucks. You'll find tons of articles about it. Tons of articles. ORM does not generate. First of all, ORM does not generate optimal queries. [check: words may be lost before "hard you try"] Hard you try, ORM sucks at doing advanced SQL queries, they don't always generate optimal queries. Then third, it assumes a lot of stuff, it gives, makes your life simple, it gives you speed, but it takes away a lot of stuff, a lot of stuff. For example, if you'd want to just make a procedure call, you did an optimized query, you put it in a stored procedure, you want to invoke it. ORM, if you're writing SQL query, normal SQL query, firing it every time, that's how you do it with ORM. But you'd want to do an optimization and put it into a stored procedure and then invoke it. ORMs do not have a great support for that.

[02:52:56] It just, so ORMs handle, like ORMs are good for mid-scale. When you operate at high scale, when you want that micro-optimizations, when you want to take control of your SQL query creation, ORMs are the worst. So just Google about it, why ORMs sucks or why ORMs, why you should not use ORMs, you'll find tons of Hacker News articles about it. Like why you should not do that.

**[02:53:20] Student 6:** Okay.

**[02:53:20] Teacher:** And it's, and it saw that if you're a startup, you should use ORM. I use ORM day in and day out. But if I work at scale, I would not do that.

**[02:53:29] Student 3:** That is why I was asking because the, my company uses ORM heavily.

**[02:53:34] Teacher:** Startups have to use it, right? You cannot rely because people write stupid queries, but when you are talking about raw performance, ORM. [?Deprives | asr: "Devoits"] you from getting the raw performance because it cannot always create optimized queries. For example, it always has to select all the columns by default. Right. But then you have to explicitly write project and pick the columns that you need. The kind of complexity you get when you start getting performance out of ORM, that code itself becomes unreadable.

**[02:54:02] Student 3:** Yeah, that is true. Yeah.

**[02:54:03] Teacher:** You would feel like SQL query is more readable than your ORM junk. Well, if you're using Django, you'd heard [?prefetch related | asr: "prefetch reload"] and auto prefetch and whatnot, utter mess, same thing with [?Hibernate | asr: "hybrid"]. Right. You would be so much more comfortable when you look at a SQL query, doing that exact same thing. And plus you can use, plus ORMs are meant for specialized, like, sorry, they are meant for that particular database. Now, sorry, ORMs are meant for general use cases. Like you can use that same ORM for MySQL also, Postgres also and whatnot. But now, for example, if I want to leverage a particular query construct that only MySQL offers, ORM might not have support for that.

**[02:54:46] Student 6:** Yes.

**[02:54:46] Teacher:** Then I have to write a [?raw query | asr: "rock very far"] and then fire it. So that's a prepared statement works better when you want those special stuff. Out of it. It is.

**[02:54:55] Student 12:** Okay. Okay. Thank you. Thank you so much.

**[02:54:57] Teacher:** Plus one more point, connection pooling, or plus basically connection to use ORM. Suck at that also. [?I've had | asr: "I'm behind"] my fair share of problems with ORM.

**[02:55:07] Student 6:** Okay.

**[02:55:08] Teacher:** But I've been there, but a startup, early stage company, you have to do it. Don't over optimize on that because it would slow you down. Like they increase the shipping velocity that you need when you're at a early stage startup.

**[02:55:22] Student 12:** Okay. Thank you.

**[02:55:23] Teacher:** Hello.

**[02:55:27] Student 5:** Yeah. Hi.

> **Student Question [02:55:28] - Student?:** I have this question on this ORM thing. So if we are writing native queries in ORM when we need the bigger queries, so that sounds like a good compromise. [check: labelled STUDENT_1, but follows Student 5's "Hi" and Student 5 repeats the question at 02:55:44]

**[02:55:40] Teacher:** Yeah. So you said we are writing native queries. Yeah.

> **Student Question [02:55:44] - Student 5:** So does that sound like a good compromise?

**[02:55:47] Teacher (answer):** Yeah, 100%. Because when you want raw performance, ORMs don't give you raw performance. ORMs are not at scale. And when you need something very specific to a database, ORM gives you general operations. They don't give you specific operations. Plus readability takes a hit when you're writing complex queries. And imagine writing very complex queries requiring joins of 10 or 15 tables, doing bunch of aggregations there, normal transactional requirement. It's not, I'm not talking about even a data warehouse, you'd need that, you'd need that. So when you write an ORM based query of that, it becomes so unreadable, no one will be able to understand. But if you just write a normal SQL, it is so elegant, so simple to understand what exactly are you doing with that. So that's why.

**[~02:56:32] Student?:** Thanks, so this is also what I saw in

### [02:56:39] Java vs Golang (JVM)

**[02:56:39] Student 5:** And yeah, again, it is sensible. And I have a separate question on this Java and Golang, but I will park it at the end.

**[02:56:46] Teacher?:** No, no, go on, go on. Let the other questions. Go on, go on. [check: labelled STUDENT_5; reads like the Teacher telling the student to go ahead]

> **Student Question [02:56:49] - Student 5:** So you say you're not happy with Java, and I see you're writing Golang, and I do not know Golang, but I use Kotlin. In Kotlin, we have coroutines. We write suspend functions in them. They're a little bit different from Java synchronization. I was just curious. Do you know about this Kotlin coroutines and Golang coroutines? Are they similar?

**[02:57:09] Teacher (answer):** Idea about JVM stack. I'm far away from JVM. I just write bare minimum that I have to. Sorry. I just write bare minimum that I have to at my job in Java. Otherwise everything is Python, Golang. That's it. Or C++.

> **Student Question [02:57:25] - Student 5:** I'm very interested in knowing about that. Why are you not interested in JVM and favoring Golang and Python? I might have some idea, but then I still want to.

**[02:57:35] Teacher (answer):** I feel people have abused Java. Unfortunately, just abstracting out every day and I'm, I have very strong opinions about it because I like readable code. Java gives me zero readability, automatically things happen in that, [?bean injection | asr: "being injection"] and this and that. I like sequential flow of code. C++, Golang, Python gives me that. Golang gives me concurrency much better than what Java gives me. I'm more happy with Golang any day. I, if you throw in Java code base, it's like, it's like a labyrinth for me, which I can never solve.

**[02:58:09] Student 5:** So for you, the problem is that the more verbosity and the boilerplate kind of code, which this Spring like frameworks generate.

**[02:58:21] Teacher:** Yeah. Unnecessary like dynamic injection, singleton injection and whatnot. Why just write a SQL in it, like just invoke the function. Now I don't want to automatically inject everything. So I don't like that. I don't like that.

**[02:58:34] Student 5:** So we have basically a microservice-based setup. And in this, so in one project, we were using Vert.x instead of Spring. And there the reasoning was really simple that Vert.x will give you very fine-grained control as compared to Spring Boot, which again gives you a high velocity in starting up, but then later on it becomes boilerplate-y. And yeah, so I get the same discussion. Your reason of favoring Golang in Python is because of this leanness.

**[02:59:10] Teacher:** Plus speed also, plus concurrency benefits. Golang concurrency is so much better than Java, plus garbage collection. Golang spends bare minimum amount in garbage collection. It's so optimized. Java JVM, you spin up something, it takes up 200 MB, either 200 MB, I can run an entire startup. Right.

**[02:59:31] Student 1:** Huge difference. Old language.

**[02:59:33] Teacher:** So I have had very poor experience with Java. I know people say a lot, like when I posted something similar on LinkedIn, people jumped on me. Just look at FizzBuzz test Enterprise Edition. GitHub search. Just search. By the way, folks, if you are not aware, just search FizzBuzz test Enterprise Edition and you will see what I mean there. It's a simple code and you have to write FizzBuzz test.

**[~03:00:01] Student 5:** Fizz, Buzz.

**[03:00:03] Teacher:** Yeah, Fizz, Buzz. FizzBuzz test, Enterprise Edition. You'll see how people mess up with Java. Unnecessary classes and this and that. Assuming everything will be extended. Nothing. You'd never need it. You'd think, oh my God, I need to change my database. Oh my God, I'll need to change this logic. You'd never need it. But you just be yourself prepared. But I know where it comes from. Years where you make something survive for more than two decades, this is what gonna happen. Same thing will happen with Golang. I'm not saying Golang is the best. Same thing will happen with, 10 years [unclear: "from the run"] I'll still be dreaming about Golang then, right? Same thing will happen with Rust.

**[03:00:42] Student 5:** Also, I'm, I'm currently personally very happy with Kotlin because it, this improves on Java conciseness.

**[03:00:52] Student 1:** But yeah, again, so this is, see.

**[03:00:55] Teacher:** So everyone starts with something fresh, then over time it messes up, people move to something new. Same thing happened with JavaScript, TypeScript. People move to TypeScript. After something, TypeScript will also become messy, then something new will come up.

**[03:01:08] Student 15:** Right, it's already getting messy. Yeah.

**[03:01:12] Teacher:** So that's, that's the circle of life when it comes to programming languages. Either a language die as a hero or live long enough to become an enterprise version of code. I think that's a good one. Okay, thanks. Yeah, so, Simran?

### [03:01:30] Upsert vs select top 1 1

> **Student Question [03:01:30] - Student 1:** Yeah, so, I have a question regarding upsert. So, there we were saying that we have to use it because we don't have to do two operations, first to read and then to update. But I have seen in some of the production system that we use top 1 1 and basically check the records and then do a update kind of a thing if that satisfies the condition. So does top 1 1 also, like, what is top 1 1? Like, it returns one if the record is present, else it returns false. Top 1 1, yeah, select top 1 1. [check: Teacher calls "Simran" just before; STUDENT_1 is Rahul elsewhere - diarization may mix students]

<!-- chunk_16 03:02:13-03:14:31 -->

**[03:02:13] Teacher:** [unclear: "belt"] and select top one, one in SQL. Oh, depends between top one, one select one. Okay. Uh, I've never, so select top one. It is. Do you also provide a where clause in that? Fair. Okay. Select top one, one. Oh, okay.

[03:02:32] Okay.

[03:02:32] Okay. So it just picking me selecting the very first record in the results. That means one. Oh, okay. The result, the row, you are just resulting, you are just returning one in case the row exists, kind of stuff. Yeah, yeah, okay. So with that, what you'll achieve? So select top one one from this table where some condition. So this way you check for the existence, right? And then if it exists, you do something, if it doesn't exist, you do something else. [check: teacher and Student 1 alternate in this exchange under one TEACHER label; some short lines here may be the student]

**[~03:02:58] Student 1:** Yeah, yeah, basically update operation after just checking that. So I was thinking like, like what, why upsert was not used there and why we are

**[03:03:09] Teacher (answer):** That is, that to your developer, your, your engineers might tell you better, but one disadvantage that I'll tell you of doing a select top one, one is you're still making one select query. Now imagine on raw TCP layer, a connection is established between a server and a database. First you fire select top one, one, you get a response one or zeros or something like that, right? You get that response. Then you do either insert or update. So one network call request, one network call response, then one either insert or update query and then one response. Right. Now here, the amount of time your database spends in evaluating that top one one is very minimum. Amount of time your database would require to do insert or update is also very small, very small. But so bulk of your time is going where? On the network. And now how many trips you are making? One, two, three, four.

[03:04:00] Four trips. If you would have done it with upsert, it would have just become one, two, done. Right? So you are still saving one round trip of your time, even though top one, one seems very optimal that you are not yet. Like you are basically solving the problem that I induced of reading huge value on the client side. You are saving that, but you're still spending time over network. With upsert you can say that. Yeah, yeah, got it. Right, but I'm not sure why they did not do it, but most probably a lot of people forget about upsert, to be honest. I've seen a bunch of production systems where people do get and set, but they forgot about upsert. So quite possible, right? Yeah. [check: the "got it ... not sure why" part may be Student 1]

### [03:04:48] Lock wait timeout exceeded

> **Student Question [03:04:48] - Student 1:** Yeah, I have one more question. So, with that exclusive locks for update. So we face this lock wait timeout exceeded, try restarting transaction. Yes. So yeah, basically when first transaction use that lock and it did not commit, then only this issue comes.

**[03:05:16] Teacher (answer):** Not really. It just about timeout. Right. When the transaction was waiting for a long time for other transaction to commit or abort, it did not happen. So you're just waiting and then your timeout exceeded.

**[03:05:28] Student 5:** Okay.

**[03:05:29] Teacher:** Because it is about that your first transaction who acquired a lock, it neither committed nor aborted in the stipulated time.

**[03:05:36] Student 1:** Okay. In our system, a lot of time we see this, this error like lock wait timeout exceeded.

**[03:05:44] Student 14:** Hmm.

**[03:05:45] Teacher:** So which means you should have fired commit or abort, which you are not. Right. That's the reason for that. So either your processing is happening for a very long time. So two reasons: either the processing is happening, like you are really doing a huge amount of processing and it has to be done for that long of a time. So which means that you need to increase your time. Otherwise it's very much possible that you, your processing is done, but you forgot to commit or abort it.

**[03:06:13] Student 1:** Okay.

**[03:06:14] Teacher:** Either one of these two.

**[03:06:16] Student 1:** Oh, fine. Thanks.

### [03:06:18] Soft delete vs hard delete, B+ tree rebalancing

> **Student Question [03:06:18] - Student 11:** Ashu. [check: name spelling; may be the teacher calling the student] Hi, so in soft delete, we are updating minus one, we are not hitting the entry because batch cleanup is doing that for us, but like within one operation, [unclear: "just accept delete update"], we can delete the entry right here if you delete

**[03:06:37] Teacher (answer):** B+ rebalancing. Every time you delete, your B+ tree may go out of shape, it needs to rebalance. It's a very expensive operation. That's fine. If you do hard delete over here, if you do delete instead [unclear: "I delete"], what would happen is B+ tree rebalancing. That's the problem. B+ tree rebalancing is an expensive operation. Deletes on data, pointed deletes on database is a very expensive operation. That's why. We spoke about it last week also. Okay. So read about B+ tree rebalancing. That's exactly what my video is about, but read about B+ tree rebalancing. Why that happens and what problem would it lead to when you are talking about databases. That's the root cause of it. That pointed deletions are expensive for almost all databases. So almost all databases do soft deletes and then do batch cleanups.

**[03:07:32] Student 11:** Got it. Okay. Thank you.

**[03:07:34] Teacher:** So yeah, you had questions.

### [03:07:36] Redis lazy expiry vs cron job

> **Student Question [03:07:36] - Student 2:** Yeah. Continue to ask you this question first. So what Redis does is that every time a read is made on an expired record, it deletes it. So why can't we delegate it to a cron job? And I mean the third approach, because it is single thread.

**[03:07:52] Teacher (answer):** Oh, cron job. Okay. Why would you want to delegate it to? Because invoking a free on an object is very lightweight. It's not an expensive operation, right? We are not doing any [?B+ tree | asr: "deep list"]. Rebalancing. It's just a delete of the things. Right. And you are just marking the, in that hash table, the actual array based implementation of hash table, you are just marking that as free space. It's a very lightweight. It literally happens in microseconds. Right. You don't even have to worry about it. [check: next sentence starts mid-phrase] Enough, then you may think of delegating. Otherwise you don't need to, it is that small of a, because delegating it might itself be much more expensive than not, then basically doing it right there and then, especially in case of in-memory databases. Okay.

**[03:08:38] Student 2:** But how, I mean by delegating, I mean, we don't do anything.

**[03:08:42] Teacher:** Huh? So in case you don't do anything versus you spend time hard deleting it. Spending two or three microseconds into deleting sounds much better because you are freeing up memory right there and then. Now you can add more data to it. If you delegate it to be done after some time, now what would happen is your memory is still there consumed. So in, let's say if your Redis is operating at full capacity and you delete bunch of keys and it is waiting for the next cycle to come in, you are not allowing to insert new data which you could have inserted, which would have been successful if you would have immediately deleted the data when you are [unclear: "a heartache."]

**[03:09:26] Student 2:** Yeah.

### [03:09:28] Online/offline indicator - push vs pull, WhatsApp Web heartbeat

> **Student Question [03:09:28] - Student 2:** And in the last week's class, we'll be discussed online, offline indicator. Within that we chose pull-based model rather than push-based model, stating that the [?drawback | asr: "drop"] of a push-based model is that API server would we have to make an HTTP connection, which is based out of on top of TCP connection. Every few seconds, but at every time interval, right?

**[03:09:49] Teacher (answer):** No, push-based for online offline, which means that. Who is pushing where? User pushing to API server, right?

**[03:09:59] Student 2:** No, I meant API server asking the user. How would that happen?

**[03:10:03] Teacher (answer):** Does Facebook know your IP address if the HTTP connection is not established? No, right? Can you connect to user? No, right? No. You cannot. Because user's IP address you don't know unless user establishes the connection with you. Correct? Yeah. You cannot establish a TCP connection unless you don't know the IP address of the machine. So server doesn't know user's IP address to connect you user, [?knows | asr: "no"] server IP address to connect. Right.

**[03:10:30] Student 2:** Okay. That's why. That is why we went through this. And secondly, I opened WhatsApp Web and I, what I expected was that it would make a heartbeat message, every few, a heartbeat request every few seconds. Even though I know that it's, the actual implementation is based on top of WebSockets, but it should have made some call. Shouldn't it?

**[03:10:49] Teacher (answer):** [unclear: "In the next time."] It should not. Unless your WebSocket. A plugin, I'm not sure if it's a native setup or not, which disables WebSocket connection on your tab, on your browser tab. Try connecting web, WhatsApp Web over that, see, you might find something, you might see explicit heartbeat calls. Okay, try that, try that. I'm, I, I'm not done it, I'm not sure, but there should be something that exists like this. Like browser gives you support to throttle your request, where it can mimic the network speed, it can slow that thing down for you, right? Similarly there might be way to disable WebSockets and then see how WhatsApp Web reacts to that, because then you would see something. But given that WebSocket exists now, the connection, you don't have to send heartbeat ever, because if the connection is established, then user is there, if the connection terminates, user is offline, right? So you don't need an explicit heartbeat in that case if you [check: words may be missing here] existence of connection. So if you are doing that, then you would never see heartbeat messages flowing here and there.

**[03:11:58] Student 2:** Correct. Okay. Yeah.

### [03:12:00] Real KV stores vs KV store on a relational DB

> **Student Question [03:12:00] - Student 2:** And the last section that we discussed today, building a KV store, KV value stored on top of relational databases. I hope that's not how actual KV stores are built.

**[03:12:09] Teacher (answer):** No, no. What, which KV store are you talking about?

**[03:12:12] Student 2:** Let's say Redis and DynamoDB.

**[03:12:14] Teacher (answer):** Redis is different. Redis is in-memory store. I have a full course on Redis internal, like full course. Redis internals, how that happens. So that I feel definitely does not happen like that. Apache Ignite has been something like this. If you go through Apache Ignite source code, you'll find something very similar. But if you're talking about other DynamoDB, DynamoDB, obviously they don't, they don't use relational DB per se, right? I just use relational DB so as to help you all understand this micro optimizations, relation, how they slow down, how you get max performance out of your DB and whatnot. On. Right. So I just leverage this key-value store in order for us to be able to discuss in a simple terms these micro optimizations that you all should be aware of. Right. Much more than anything else. Right.

[03:12:58] We'll also discuss one more thing. Distributed cache, fifth week. There we'll build an in-memory distributed cache. Then we'll not use relational database at all, but we'll go into in-memory details and we'll see other specifics that you should be aware of. Then we'll just, we'll simplify the storage side by just storing data in an in-memory hash table, but we'll discuss all other peripheral details around it, right? Which transport to choose, why to choose, how locking would happen. Mutex, a bunch of stuff would be there, low level and high level stuff. Right? So that will cover that.

[03:13:35] Now on this persistent key-value store, relational databases makes it simple to understand. For everything else, just replace relational database and write your own storage layer. That's all it differs. We'll discuss that. Something very similar in sixth... I've got so much thing covered, man. So in sixth week, we'll cover two databases that do it. One with LSM tree and one with other implementation. Then we'll see different kind of storage engine for key values. God, I've covered that also. We have much of thing covered. Don't worry.

> **Student Question [03:14:12] - Student 2:** Small request, if we could share the code snippets, let's say for the designing of

**[03:14:15] Teacher (answer):** [?Arre | asr: "air"], no, write it, write it, write it. Why? I want you to make mistakes. If I share it, you just run it, done. No, when you write it, right, you make mistakes. I want you all to make mistakes.

<!-- chunk_17 03:14:31-03:21:45 -->

**[03:14:31] Student 2:** But we just want, I at least personally want my expertise and code to be [unclear: "as far as with you"].

**[03:14:36] Teacher:** No, no, make mistakes. See, the day when I, the day when I built it the first time, the kind of joy I experienced, the kind of things that I faced, like the transactional deadlock. What happens in a deadlock? I had a bunch of deadlocks in my code when I was writing it. Right. I, when I knew, then I thought, okay, this also can happen. Now, how do I fix it? Oh, this also happened now, but I'm not getting enough throughput. So now what do I do? Those mistakes make you a better engine, you know, makes a better engineer. It's what you, what mistakes you made, what you learned from them makes you better. Okay. Go through that. Go through that. Right. Go through that.

**[03:15:14] Student 13:** Thank you so much.

**[03:15:16] Teacher:** Best feeling ever. Right. When we discuss load balancer, I'll ask you to implement a load balancer. We'll go through the source code of that as well. Ask you to implement a load balancer also. Right.

**[03:15:25] Student 13:** Thank you so much.

**[03:15:27] Teacher?:** Prashant.

### [03:15:29] Why databases do not provide soft deletion

> **Student Question [03:15:29] - Student 10:** Yeah. Hi, so we talked about soft deletion. So since it improves performance by a lot, so why don't database engine provide this capability out of the box? Why user have to create this additional column and keep track of...

**[03:15:48] Teacher (answer):** Great question. Now, I'll give you the answer why. Why database does not give you this out of the box? Because it seems logical, especially in case of relational databases. Now, databases, why they don't give you this out of the box? Is because database is a very fundamental layer. It gives you all the necessary building blocks. It does not try to intervene in your space. It just wants to keep things simple. That's why you see it does not give you fancy stuff. It just gives you for update, for share, skip lock, no wait. It's so foundational. If it gives you, if it reaches into your space, then you don't know where to draw that line. Like, which one should I implement? Which one should I not? So it just keeps things simple. It just gives you what is foundational for you and not intervene in someone else's.

[03:16:36] Number one. Number two, specifically when I talk about soft deletes, then your database would need to have a separate process that does batch clean up. Now this puts a lot of load into developers cognition, on developers head. What if my data is not deleted? What if I read it? Do I need to use this column or not? How do I, how do I handle this? I'm talking in terms of relational database. You might find other databases like Redis and DynamoDB that when you delete, it does soft deletion. Redis and DynamoDB both deletes, sorry, DynamoDB does soft deletion. When you delete a key in DynamoDB, it does not hard delete. It always soft deletes. And, but it does that. So they, for them, because it's a key value store, for them it's foundational, right? So they give you that. But for relational databases, it is not. Relational databases operates on the core foundational layer and they don't try to intervene.

[03:17:28] A ton of, you'll find, 2012 or 13, I, 12, 12, I was in my final year, 2012, there was a thread on MySQL where someone proposed this very [?thing | asr: "chain"]. There is a MySQL forum or something, you'll find it there, 2012 [unclear: "card"] thread where, where you'll find. And I suddenly remembered, it was my final year, I was just doing some random stuff and I stumbled upon that soft deletion. So that's what I got to do. Someone proposed it, and I kind of recall, not the exact same line, but it was in the essence that when your database evolves, it is more important to know what you don't want to do versus what you want to do, because anything is infinitely buildable. You can build as complex features as you want, as simple features as you want, but do you really want to do that? Are you entering into users space per se? Right. So that's why they just prevent that from happening and then give you a raw construct to build on top of.

**[03:18:30] Student 10:** Okay. Yeah.

**[03:18:32] Teacher:** 2012, MySQL forum. Yeah. 2012, should be in 2012, very high chance, 20 or maybe 2011. Also I was in my final year, so it should be 2011, 2012, around those. You'll find that. So that's what I found it. And which is what struck with me, that, hey, when I'm ever designing a database, I'll always keep in mind that, hey, what I definitely don't want to do, where I don't want to go into [unclear: "pitch space"]. Thanks. Thanks for asking.

[03:19:00] Avishek [check: name spelling].

### [03:19:11] Tomorrow - scaling WebSockets *(admin)*

[03:19:11] *(admin)* We are not audible, but. Please [unclear: "be to"] drop me a DM with a question. More than happy to answer that. So tomorrow, one day, tomorrow we'll discuss, we'll scale WebSockets. That's an interesting detour we'll take. Oh, tomorrow? Yeah, tomorrow we'll build Slack's real-time communication and see how WebSockets are actually scaled. So that's the second half for today. But first up, we'll look at NoSQL database, non-relational databases. Rahul?

### [03:19:38] Implementing the previous week's assignment

> **Student Question [03:19:38] - Student 1 (Rahul):** So my question is about the previous, previous week, actually, previous week implementation for blogging platform, actually. Okay, so the thing actually I got confused for was like, the thing I got confused for was like implementation, do we need to implement any front end or anything like that for that thing? Like I am like, I am like kind of like unable to see, like, unable to see that implementation being made without an UI as per se. So yeah.

**[03:20:22] Teacher (answer):** Implement if you want. Like, we wanted to cover more on the database, caching, delegation, concurrency side of things, right? If you want to implement frontend, you don't. [unclear: "What's the happen?"]

**[03:20:37] Student 1:** Like I am not able to see, like, anyway, like I am not expert in frontend or anything like that.

**[03:20:45] Teacher:** Don't implement that. You just, what you want to understand, just implement that part of it. You don't have to implement entire stuff. Exposed bunch of APIs, do short polling, long polling. That's the key part, right? Right. Spin up a Kafka. Just put some messages and consume them, right? Or [?RabbitMQ | asr: "rapid time"] you push some messages and consume them. Just focus on those things. Do things that matter. Sure, sure. Don't go into front-end and no one, like, no, don't waste time. In case you do, you are not a front-end expert, don't waste time learning that path. Do things, like, look at example airline tickets. Did I build full-fledged front-end, back-end? No. I just did what I wanted to learn, [unclear: "it up is lock it"]. I just simulated that. Done. Right? Got two things that matter.

[03:21:32] Okay, okay. Sure, sure. Superb. Thanks folks for tuning in. Tomorrow will be huge discussion once again. We'll go very deep into scaling WebSockets. Thanks folks, I'll upload a recording by three. Bye.

<!-- BODY END -->
