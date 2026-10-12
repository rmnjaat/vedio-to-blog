**[00:37:03] Teacher:** This is also where it is very much possible for two people getting the same seat, because it's just a random function that is invoking. It's very likely for this random function to pick the same seat in two different iterations. Problem, right?

<!-- topic-candidate [00:37:20]: Approach two - mimicking concurrency, random seat with 120 goroutines -->

[00:37:20] So that's where what we do is, this is where now I'll start taking your opinions on this. Now, now let's mimic all 120 people trying to book the exact, like trying to book or trying to pick seats at the same time. So what I do is I'm mimicking concurrency over here. So for example, look at this: when my main function starts, I'm simulating all 120 users coming into my system at the exact same time and trying to book a seat. So what we are doing is, for all the users that I have, I'm triggering a goroutine. Goroutine is like a thread, like a thread which is running in its own space, and it is like every 120 user, 120 goroutine, they're all trying to book, they're all trying to pick a seat, right? Not the same seat, but pick a seat. So for all 120 users, we're trying to call book. Book just accepts now user and not seat, because book now picks a seat at random and assigns it to a user, right? And then if error condition, and done, right? So now if I look at the book function, what book function does is exact same thing: all the seats of the airplane, picks one seat at random, transaction start, update and transaction commit, right?

[~00:38:37] Now when I run this code, go run approach two. Now what would happen? Any guesses what would happen at this stage? All 120 users coming onto this platform, [unclear: "added access and time"], trying to pick a seat. All we do is pick all the seats in one shot, all the seats of the airplane. We literally pick one at random of it, start a transaction, update the seat and commit it. Sandeep, what would happen?

**[00:39:18] Student 1:** So some users will get the same seats, as you said, and most of them would be getting, like, there will be some users would be getting same seats. I think that's the issue with this.

**[00:39:27] Teacher:** So will all seats be filled?

**[00:39:29] Student 1:** No. Okay.

**[00:39:31] Teacher:** Even any particular pattern in which seats will be filled?

**[00:39:36] Student 1:** It depends on the random function that we are selecting, right? It depends on how the RAND function is working. If the RAND function is designed in such a way that you'll always get a unique value between 0 to 120, then everything will go smoothly, but we are not sure what the RAND function is implemented under the hood.

**[~00:39:51] Teacher:** Correct. So now if we do this, we see that not all seats are filled, because this clearly shows that [?rand | asr: "RANDUP"] function, because RANDUP function was hit 120 times, we see that RANDUP function did not pick 120 unique values, it repick some of the values because it's a RANDUP function, right? And here we clearly see that not all seats are filled, which means there will be multiple people who would have the same seats, with like, for example, this, this Dr. Lizzie Richie [check: name spelling] and Liana Kessler will fight in the air when both claiming "we both have [?7C | asr: "seven easy"]", right? And that's the problem.

<!-- topic-candidate [00:40:24]: Approach three - first unoccupied seat, order by ID limit one -->

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

<!-- topic-candidate [00:49:38]: Approach four - adding pessimistic locking, for update -->

[00:49:38] So now let's do this. Let's add pessimistic locking to this and see how it benefits us. So now here entire code is same as [?approach three | asr: "approach read"]. I just added two words at the end: for update. That's it. Now what would happen? Amrik?
