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
