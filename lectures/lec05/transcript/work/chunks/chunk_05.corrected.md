**[00:50:00] Student 2:** Deadlock.

**[00:50:02] Student 8:** Why deadlock?

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

<!-- topic-candidate [00:54:05]: ACID properties vs locking, isolation levels -->

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

<!-- topic-candidate [01:00:02]: Running approach 4 (for update) -->

**[01:00:02] Teacher:** Got it. Let's run and see. So first thing, if we are adding two words to our query and it's still not making any difference, something might be wrong. So let's see. Let's run and see what happens. Approach 4, we ran it. Oh, all [?120 | asr: "26"] filled out. If I run it again, all 120 seats are filled up. If I run it again, all 120 seats are filled up. [check: possible ASR duplicate of 01:00:23 - or teacher re-ran the program] This is the beauty of this implementation.

[01:00:34] So what is happening behind the scenes? Let me walk you through that. And this is the most critical part that people skip. This is where the magic happens. Now, first of all, what we did is we are trying to book a seat order by ID. So here you can very clearly see how seats are getting booked: 1C, 1D, 1E, 1F, 2A, 2B, 2C, 2D, 2F, all are in order, hold true, right? So users are coming, they're taking an exclusive lock, and while that exclusive lock is taken, other transactions wait. Once this exclusive lock is released, but then most of you thought that they are all, and it's very natural to think that way, and which is where I would tell you how database actually do that.
