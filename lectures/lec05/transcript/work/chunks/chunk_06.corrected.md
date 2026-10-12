**[01:01:25] Teacher:** So a lot of you thought that, let's say there are 120 seats, 120 transactions came in, they all fired the query, the same query, hypothetically let's say that exact same time. They came to it, like the database, all [?120 | asr: "one-minute"] transactions are active at the very same time. They are all fired the same query. They all got first row, but they didn't actually get the first row. Database is not returning the first row unless they get it. So transaction does not have a lock on that row anyway. But when transaction fired this query, they saw, or rather the database engine saw, that the rows on which they are trying to iterate. Because what we did is we are just iterating on this. The row on which they are trying to iterate is locked by someone. So other transaction waits. When the lock, when the first transaction commits, in our case commits, [unclear: "I'm not going to about state"]. But when the first transaction commits, the other transactions waiting on it are signaled to re-execute and re-evaluate the query.

[01:02:37] So what happens? First transaction came, it acquired the lock, other transactions were waiting, first transaction committed, other transactions would re-evaluate the query. So which means this query will be re-evaluated. It does not mean you have to re-fire the query. When a transaction gets signal, it re-evaluates the query and tries to acquire. In that case, because first transaction committed, now the second transaction that runs would see the second row, because it just fires the same statement again. It just re-evaluates the same statement. It. This way it would not mean user one gets row one, user two gets row two, user three gets row three. Here you can see in the assignment the way seats are assigned, you would not see in the exact same order. This is why I love databases so much. See, 1A, user ID one was Maria Harmon. Here some how well Daniel 4 got it. Second was Jamaica something. Here you have, is this somewhere, Barkas get it. [check: name spelling] So it's not that user 1 is getting seat 1, user 2 is getting seat 2. It's that whichever transaction got scheduled first is getting it. So here the transaction that was run by this particular user got scheduled, and so on and so forth.

[01:04:06] Now here one key thing that you should know is what is happening behind the scene, is that first transaction came in, it acquired the lock, other transactions were waiting. When first transaction committed or aborted, other transactions are signaled by the operating system to move on, or rather database engine to move on. They would re-evaluate the query. And when they do it, now they see second row. Then when second transaction, then one of those 119 transactions acquires the lock on this. Then they are signal, when this commits, they are signal third seat, fourth seat, fifth seat, sixth seat, and so on and so forth. This is why you see it's so painful for the database to do this much of operation. But we are still guaranteeing the correctness of the system. Right? Okay.

<!-- topic-candidate [01:05:01]: Approach five - skip lock -->

[01:05:01] Now let me move to the fifth approach. I need to take your question. Wait, I'll take your question. Now let's move to the fifth approach, where we clearly see why our database has to unnecessarily wait on it, because we clearly see when a transaction is locking a particular row, it's okay for us to move on. So which is where the only two word change I'll do: at the end, I'll just add skip lock. Everything else remains the same. Now what would happen? Will all 120 seats get filled? Yes, no. Anamol?

**[01:05:46] Student 6 (Anamol):** [check: name spelling] Yes, it would get filled. Only the busy waiting that were happening last time. That's a great word.

**[01:05:53] Teacher:** Busy waiting time. So now what would we get out of this? What advantage would we get?

**[01:05:59] Student 6:** The time of the execution of the transaction would be less.

**[01:06:04] Teacher:** The total execution time would be less. Yeah. Okay. So now let's see that in action. So the approach four, when we ran, it took 1.7 seconds to do it. Now let me run approach five. I have everything same. I just added skip lock at the end. And if I run it, approach five, it just completed in 147 milliseconds. One 10th of the time, and still got all [?120 | asr: "126"] filled. This is why skip lock.

[01:06:36] So this still, we are still taking exclusive lock. Now here, when we are doing skip lock, now what is happening behind the scenes at the database side is: first transaction came in, took exclusive lock. Second transaction came in, fired the query, saw this row is locked because we passed in skip lock. It quickly revalued, or rather database engine quickly revaluated, saw this row is locked. It saw other rows that matches my where clause. It found the next row. Lock to the second transaction, then the third person, then the fourth person. None of the other transaction wait for the first one to complete, and the rows were continuously locked by other transactions, right? So this way your database maximized on the performance, and this is why you need to know [?database locking | asr: "database login"]. You just made your system 10x faster just by adding skip lock, as simple as that. This is why you need to know how your database actually do things, because when... Relational databases don't scale. They don't know the real power of relational databases. Trust me on that. Relational databases scale beautifully well. They cannot handle big data, I agree to that. But scaling, handling high QPS, relational databases are champ at that. You just need to know the performance tuning. And this is not even very nitty-gritty performance tuning. It's just normal SQL query constructs that you need to know. This is the best part of it.

[01:08:06] This is why, and now here we saw, from approach zero to approach five, how we evolved our system just by adding two, three words here and there, and we were getting all we needed. Like, first we ensure the correct test. First we ensure that system fails. Then we ensure the correctness in the exclusive lock. Then we added skip lock to get the performance. Okay.

<!-- topic-candidate [01:08:25]: Fixed inventory plus contention equal to locking -->

[01:08:25] One thing that I want to talk about over here is, there is a phrase that I use very often. Remember it for the rest of your life. Fixed inventory plus contention equal to locking. Here you see fixed inventory: 120 seats. Contention: 120 people trying to book 120 seats. Locking: you have to take locks to ensure the correctness of your system. Always. You imagine any system in the world where there is fixed inventory, there is contention happening for that, you would apply locking to do that.

<!-- topic-candidate [01:09:07]: Examples - COVID portal, IRCTC, BookMyShow, flash sale -->

[01:09:07] For example, I'll give you examples. First example, COVID portal. Remember COVID-19, in the year 2020, when in India, a government launched a portal, COVID portal, in which we booked appointments at hospitals. Every hospital had limited seating. We all, when the slots opened up, we all jumped onto the platform at that exact same moment, trying to book that seat. Because there were limited seats, let's say 100 seats on that hospital, people got that particular slot. Fixed inventory, contention, how would they have implemented? Locking. May not be pessimistic, may be optimistic, may be atomic instructions, but the idea was to do that. So if you are building COVID portal on relational database, you would do something like this. Exactly like this, rather. Right?

[01:09:51] Second example, IRCTC, which is train booking system of [?Indian government | asr: "internet government"]. Now what would happen? People are coming, a lot of people trying to book the same, like book the seat at the same train. This is how you ensure high throughput. If they would not have taken skip lock, entire throughput would be [unclear: "stored on there"]. Then their code base would be filled with skip locks, right? And exclusive locks, obviously. Then BookMyShow, movie ticketing system. You have limited sitting area in a movie screen, you are all trying to book that same thing. Exclusive lock: one who gets it moves it forward, otherwise people wait for the transaction to complete and then other one jumps in, right? Wherever you see fixed inventory, you see contention, the first thing that should come to your mind is a locking. Fixed inventory, contention, locking. And more importantly, flash sale. Flash sale is very similar to this. When we discuss flash sale, you'll see this in action. You'll see how beautifully flash sale is designed by this, right? Okay, this is this.

<!-- topic-candidate [01:11:00]: Questions - how locking is implemented, holding a seat during payment -->

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
