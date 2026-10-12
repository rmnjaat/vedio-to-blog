# chunk_04  OWNS 00:37:03 -> 00:50:00  (segments #501-#683, 2023 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:36:05] TEACHER: same seat and then both of their boarding passes getting printed and there's a chaos in the plane.   {#489}
CTX| [00:36:09] TEACHER: Now, in order to reduce this, let's say what we do is instead of asking user to pick a seat,   {#490}
CTX| [00:36:16] TEACHER: let's say we pick a seat at random.   {#491}
CTX| [00:36:20] TEACHER: There's a natural progression to that.   {#492}
CTX| [00:36:22] TEACHER: So now what we do is we get all the seats of the airplane.   {#493}
CTX| [00:36:26] TEACHER: We pick one seat at random, like literally random choice from this array.   {#494}
CTX| [00:36:32] TEACHER: We are picking all the seats.   {#495}
CTX| [00:36:33] TEACHER: So if you look here, airline.seats gives me all the seats of the airplane,   {#496}
CTX| [00:36:41] TEACHER: not all the available seats, all the seats of the airplane.   {#497}
CTX| [00:36:44] TEACHER: I'm just picking one seat at random and I'm just giving that user that particular seat.   {#498}
CTX| [00:36:50] TEACHER: So still update seat set, user id equal to this, where id equal to this.   {#499}
CTX| [00:36:56] TEACHER: So again, no checks, but I'm now just relying on a random function   {#500}

---- OWNED SEGMENTS START ----
[00:37:03] TEACHER: This is also where it is very much possible for two people getting the same seat because   {#501}
[00:37:11] TEACHER: it's just a random function that is invoking.   {#502}
[00:37:13] TEACHER: It's very likely for this random function to pick the same seat in two different iterations.   {#503}
[00:37:19] TEACHER: Problem, right?   {#504}
[00:37:20] TEACHER: So that's where what we do is this is where now I'll start taking your opinions on this.   {#505}
[00:37:26] TEACHER: now now let's mimic all 120 people trying to book the exact like trying to book or trying to pick   {#506}
[00:37:38] TEACHER: seats at the same time so what i do is i'm mimicking concurrency over here so for example   {#507}
[00:37:46] TEACHER: look at this when my main function starts i'm simulating all 120 users coming into my system   {#508}
[00:37:54] TEACHER: at the exact same time and trying to book a seat. So what we are doing is for all the users that I   {#509}
[00:37:59] TEACHER: have, I'm triggering a goroutine. Goroutine is like a thread, like a thread which is running in its own   {#510}
[00:38:06] TEACHER: space and it is like every 120 user, 120 goroutine, they're all trying to book, they're all trying to   {#511}
[00:38:12] TEACHER: pick a seat, right? Not the same seat but pick a seat. So for all 120 users, we're trying to call   {#512}
[00:38:18] TEACHER: book just accepts now user and not seat because book now picks a seat at random and assigns it to   {#513}
[00:38:24] TEACHER: a user right and then if error condition and done right so now if i look at the book function what   {#514}
[00:38:32] TEACHER: book function does is exact same thing all the seats of the airplane picks one seat at random   {#515}
[00:38:37] TEACHER: transaction start update and transaction commit right now when i run this code go run approach to   {#516}
[00:38:49] TEACHER: Now what would happen?   {#517}
[00:38:52] TEACHER: Any guesses what would happen at this stage?   {#518}
[00:38:56] TEACHER: All 120 users coming onto this platform, added access and time, trying to pick a seat.   {#519}
[00:39:02] TEACHER: All we do is pick all the seats in one shot, all the seats of the airplane.   {#520}
[00:39:07] TEACHER: We literally pick one at random of it, start a transaction, update the seat and commit   {#521}
[00:39:14] TEACHER: it.   {#522}
[00:39:15] TEACHER: Sandeep, what would happen?   {#523}
[00:39:18] STUDENT_1: So some users will get the same seats, as you said, and most of them would be getting   {#524}
[00:39:22] STUDENT_1: like, there will be some users would be getting same seats.   {#525}
[00:39:26] STUDENT_1: I think that's the issue with this.   {#526}
[00:39:27] TEACHER: So will all seats be filled?   {#527}
[00:39:29] STUDENT_1: No.   {#528}
[00:39:31] STUDENT_1: Okay.   {#529}
[00:39:31] TEACHER: Even any particular pattern in which seats will be filled?   {#530}
[00:39:36] STUDENT_1: It depends on the random function that we are selecting, right?   {#531}
[00:39:38] STUDENT_1: It depends on how the RAND function is working.   {#532}
[00:39:41] STUDENT_1: If the RAND function is designed in such a way that you'll always get a unique value   {#533}
[00:39:45] STUDENT_1: between 0 to 120 then everything will go smoothly but we are not sure what the RAND function is   {#534}
[00:39:51] TEACHER: implemented under the hood. Correct so now if we do this we see that not all seats are filled   {#535}
[00:39:57] TEACHER: because this clearly shows that RANDUP function because RANDUP function was hit 120 times we see   {#536}
[00:40:02] TEACHER: that RANDUP function did not pick 120 unique values it repick some of the values because it's   {#537}
[00:40:08] TEACHER: a RANDUP function right and here we clearly see that not all seats are filled which means there   {#538}
[00:40:13] TEACHER: will be multiple people who would have the same seats with like for example this this dr lizzie   {#539}
[00:40:18] TEACHER: richie and liana kessler will fight in the air when both claiming we both have seven easy   {#540}
[00:40:24] TEACHER: right and that's the problem so now let's come to solution now we understand now we have mimicked   {#541}
[00:40:31] TEACHER: everything now we just have to play around with sql queries right okay now what we do next we   {#542}
[00:40:38] TEACHER: know definitely know that just picking one seat at random wouldn't work we have to pick   {#543}
[00:40:43] TEACHER: one seat like we have to pick the first seat which is not occupied or not booked by someone else.   {#544}
[00:40:49] TEACHER: So what do we do? We write SQL. So in SQL query when my transaction begins   {#545}
[00:40:56] TEACHER: we pick a seat, select id name trip id user id from seats where trip id is one user id is null   {#546}
[00:41:02] TEACHER: where seat is not occupied which means when user id is set to null order by id limit one. I'm   {#547}
[00:41:09] TEACHER: picking the first seed that I can find which is not occupied by anyone right because user id is   {#548}
[00:41:16] TEACHER: set to null everything else remains the same I update the seed whatever I got and then I commit   {#549}
[00:41:21] TEACHER: a transaction right and I'm doing it again for that same 120 user mimicking this exact same thing   {#550}
[00:41:27] TEACHER: in pavl what would happen when I run this   {#551}
[00:41:32] TEACHER: look at this query select id named trip id user id from seeds with trip id equal to one and user   {#552}
[00:41:36] TEACHER: ID set to null. Order by ID   {#553}
[00:41:39] TEACHER: limit one.   {#554}
[00:41:40] TEACHER: When I run this thing, approach   {#555}
[00:41:42] TEACHER: three, will   {#556}
[00:41:44] TEACHER: all the seats be filled?   {#557}
[00:41:46] TEACHER: If yes, why? If no, why?   {#558}
[00:41:52] TEACHER: Maverick, please   {#559}
[00:41:53] TEACHER: use your phone. Yeah, Maverick,   {#560}
[00:41:55] TEACHER: go on.   {#561}
[00:42:01] TEACHER: You are in   {#562}
[00:42:02] TEACHER: audible. I'll move to the next one. Yes,   {#563}
[00:42:04] TEACHER: Devashish?   {#564}
[00:42:06] STUDENT_1: No, I don't expect them to be filled because there might be the same seat that is offered to people.   {#565}
[00:42:13] STUDENT_1: Why?   {#566}
[00:42:15] TEACHER: I'm basically checking user ID as well.   {#567}
[00:42:19] STUDENT_1: But, okay, unless there's some locking mechanism that is already in place,   {#568}
[00:42:27] STUDENT_1: which would book the seat for me.   {#569}
[00:42:31] TEACHER: We did not write that code yet, right?   {#570}
[00:42:33] TEACHER: So now, what would be the behavior over here?   {#571}
[00:42:37] STUDENT_1: So like if there are two concurrent threads accessing like which are offered the same seat.   {#572}
[00:42:43] STUDENT_1: Why would they be offered the same seat?   {#573}
[00:42:45] STUDENT_1: Because for both of them it will be null right?   {#574}
[00:42:48] STUDENT_1: Why?   {#575}
[00:42:51] STUDENT_1: Because nobody has booked it yet.   {#576}
[00:42:54] STUDENT_1: Booked that seat yet.   {#577}
[00:42:56] TEACHER: Why?   {#578}
[00:42:58] TEACHER: Like why is it?   {#579}
[00:42:59] TEACHER: Why would they both see null?   {#580}
[00:43:04] STUDENT_1: because uh because they're concurrent right so both of them are accessing at the exact same time   {#581}
[00:43:10] STUDENT_1: and um yeah the database is giving the same value to both of them unless there is some   {#582}
[00:43:17] TEACHER: locking in place yeah this is exactly why we need locking right because both the transactions   {#583}
[00:43:23] TEACHER: running at that exact same time might see the exact same value and operate with that okay   {#584}
[00:43:32] TEACHER: what will be the pattern of like will there be a pattern of booking   {#585}
[00:43:36] TEACHER: will you see a pattern in which the seats are booked   {#586}
[00:43:43] STUDENT_1: um hard to predict i guess why look at this query   {#587}
[00:43:51] STUDENT_1: see what we are doing yeah yeah so yeah yeah like it's just limiting one so yeah uh people will   {#588}
[00:43:58] STUDENT_1: get the same seat so the pattern would be that like all of the co-routines trying to book the   {#589}
[00:44:06] STUDENT_1: same first seat and i guess the last one will or like yeah i don't know which one will get it so   {#590}
[00:44:12] TEACHER: which one so which which seat will be picked which seat will be booked look at this query   {#591}
[00:44:17] STUDENT_1: yeah the first the first uh seat like why why first seat because that is the one being offered   {#592}
[00:44:25] STUDENT_1: to everyone. Why?   {#593}
[00:44:27] STUDENT_1: Because there's a limit one here.   {#594}
[00:44:29] STUDENT_1: Order by   {#595}
[00:44:29] STUDENT_1: order by   {#596}
[00:44:30] STUDENT_8: order by ID limit one.   {#597}
[00:44:32] TEACHER: Order by is the reason.   {#598}
[00:44:34] TEACHER: Because of order by everyone will get   {#599}
[00:44:37] TEACHER: seat one, two, three in that order.   {#600}
[00:44:38] TEACHER: So when SQL query fires for all of them   {#601}
[00:44:41] TEACHER: they would all see order by ID   {#602}
[00:44:43] TEACHER: which will seat ID one will be   {#603}
[00:44:44] TEACHER: given to all of them and   {#604}
[00:44:46] TEACHER: everyone would be booking that same seat.   {#605}
[00:44:49] TEACHER: Okay. Will there be   {#606}
[00:44:50] TEACHER: only one seat that will be booked?   {#607}
[00:44:56] STUDENT_8: I think so.   {#608}
[00:44:57] STUDENT_8: Okay.   {#609}
[00:44:59] TEACHER: You are on yes side.   {#610}
[00:45:01] TEACHER: Harsh.   {#611}
[00:45:02] TEACHER: Will there be only one seat that is booked?   {#612}
[00:45:04] TEACHER: Yes.   {#613}
[00:45:05] TEACHER: Will there be multiple?   {#614}
[00:45:06] TEACHER: One seat?   {#615}
[00:45:07] STUDENT_20: One seat.   {#616}
[00:45:08] TEACHER: Okay.   {#617}
[00:45:10] TEACHER: Next one is Maverick.   {#618}
[00:45:11] TEACHER: Will there be one seat that will be booked or multiple seats that will be booked?   {#619}
[00:45:15] STUDENT_1: So again, I'm not sure exactly how the internals work in this particular DB space, but in case   {#620}
[00:45:21] TEACHER: every single thread fired is reading the first order itself,   {#621}
[00:45:26] TEACHER: which means everything is concurrently being fired.   {#622}
[00:45:30] TEACHER: Or basically the execution is happening in parallel in one way.   {#623}
[00:45:35] TEACHER: Then every single read will return 1A by default   {#624}
[00:45:39] TEACHER: because of the way query is written.   {#625}
[00:45:42] TEACHER: And because we have read that particular row,   {#626}
[00:45:45] TEACHER: every entry that is done will be against that particular row seat itself.   {#627}
[00:45:51] TEACHER: case multiple seats will be booked only if update has happened and after which another   {#628}
[00:46:01] TEACHER: read is happening so basically there is some delay so once update some update has happened   {#629}
[00:46:08] TEACHER: some transaction has committed then you do it okay for for others let me run it and show it   {#630}
[00:46:14] TEACHER: now when we run this you see seats are getting filled and you can very beautifully see seat one   {#631}
[00:46:21] TEACHER: 2 and seed 3 are filled. If I rerun it again hopefully now you see four seeds are getting   {#632}
[00:46:29] TEACHER: filled and so there is no guarantee that exactly n seeds will be filled because now what happened   {#633}
[00:46:37] TEACHER: here is this is the beauty of relationship it makes us understand locking so easily.   {#634}
[00:46:44] TEACHER: So what we are doing over here is we are selecting one seed order by id because of which you see   {#635}
[00:46:51] TEACHER: two, three, four, like seats getting filled in this order.   {#636}
[00:46:54] TEACHER: Like here in the logs also you can see 1C, 1C, 1C,   {#637}
[00:46:57] TEACHER: before which you see 1B, 1A, right?   {#638}
[00:46:59] TEACHER: You see them in printed in almost that same order.   {#639}
[00:47:03] TEACHER: Now here what we are doing is we are selecting a seat   {#640}
[00:47:06] TEACHER: for a particular trip where user ID is null,   {#641}
[00:47:09] TEACHER: order by ID limit one.   {#642}
[00:47:11] TEACHER: So every transaction is coming.   {#643}
[00:47:14] TEACHER: It's trying to pick the first seat where user ID is null.   {#644}
[00:47:17] TEACHER: now the best case possible was all 120 were scheduled or when well all 120 transactions   {#645}
[00:47:25] TEACHER: started that seat the first seat was free in that case everyone would see only one seat like   {#646}
[00:47:32] TEACHER: everyone would be booking that one seat hopefully i'm able to mimic that four four three i'll give   {#647}
[00:47:42] TEACHER: it one more shot. See now there is just two seats that are getting booked. Now here you can see   {#648}
[00:47:48] TEACHER: like there's no one way that this system is read. Now here what is happening behind the scene is   {#649}
[00:47:56] TEACHER: when my transactions are coming up out of those 120 transactions when my 120th thread let's say   {#650}
[00:48:04] TEACHER: spun up my first coroutine ran found the first row available wrote to the data and committed   {#651}
[00:48:13] TEACHER: the transaction so when my 128th ran when my 128th coroutine ran the transaction when it started   {#652}
[00:48:21] TEACHER: the first one was already committed when this was already committed when when so which means that   {#653}
[00:48:26] TEACHER: the row that it got would be the second row this is why commit is so important as soon as your   {#654}
[00:48:34] TEACHER: Any other transaction that started after that,   {#655}
[00:48:37] TEACHER: when it tried to read, it would read the next row   {#656}
[00:48:39] TEACHER: because you are doing user id is null because of that,   {#657}
[00:48:43] TEACHER: not because of transaction.   {#658}
[00:48:44] TEACHER: But because that one committed,   {#659}
[00:48:46] TEACHER: that row for that particular seat user id was set to something,   {#660}
[00:48:50] TEACHER: which means when my 120th coroutine ran,   {#661}
[00:48:54] TEACHER: when it fired this, it saw that id one,   {#662}
[00:48:57] TEACHER: like seat id one, user id is not null.   {#663}
[00:48:59] TEACHER: Seat id two, user id is not null.   {#664}
[00:49:00] TEACHER: And then the user id is null, so it read that particular thing.   {#665}
[00:49:04] TEACHER: This is why commit is so important.   {#666}
[00:49:07] TEACHER: When someone committed and then the next read happened,   {#667}
[00:49:11] TEACHER: it got the next row because of this condition,   {#668}
[00:49:15] TEACHER: not because this is how we wrote the code.   {#669}
[00:49:18] TEACHER: Right?   {#670}
[00:49:18] TEACHER: Okay.   {#671}
[00:49:19] TEACHER: So here what we did is we saw why locking is important.   {#672}
[00:49:27] TEACHER: Right?   {#673}
[00:49:27] TEACHER: How we thought we built a system where all 120 seats should be filled,   {#674}
[00:49:32] TEACHER: but they are not because everyone is reading that same old row.   {#675}
[00:49:35] TEACHER: This is exactly why pessimistic locking is needed.   {#676}
[00:49:38] TEACHER: So now let's do this.   {#677}
[00:49:39] TEACHER: Let's add pessimistic locking to this and see how it benefits us.   {#678}
[00:49:45] TEACHER: So now here entire code is same as approach read.   {#679}
[00:49:49] TEACHER: I just added two words at the end for update.   {#680}
[00:49:54] TEACHER: That's it.   {#681}
[00:49:55] TEACHER: Now what would happen?   {#682}
[00:49:57] TEACHER: Amrik?   {#683}
---- OWNED SEGMENTS END ----

CTX| [00:50:00] STUDENT_2: Deadlock.   {#684}
CTX| [00:50:02] STUDENT_8: Why deadlock?   {#685}
CTX| [00:50:04] STUDENT_2: Because the first user who is coming in, if he is acquiring a seed, okay.   {#686}
CTX| [00:50:09] STUDENT_2: And the second one is also waiting for it.   {#687}
CTX| [00:50:12] STUDENT_2: So maybe the second one who is waiting his transaction may got cancelled.   {#688}
CTX| [00:50:17] TEACHER: Waiting is not equal to deadlock.   {#689}
CTX| [00:50:19] TEACHER: You know it, right?   {#690}
CTX| [00:50:20] TEACHER: Deadlock happens when you are waiting on row, which is logged by someone else.   {#691}
CTX| [00:50:24] TEACHER: And that is waiting for row that you are holding up.   {#692}
CTX| [00:50:28] STUDENT_2: Okay.   {#693}
CTX| [00:50:28] STUDENT_2: Maybe his transaction may get cancelled at that time.   {#694}
CTX| [00:50:32] TEACHER: No.   {#695}
CTX| [00:50:34] TEACHER: Okay.   {#696}
CTX| [00:50:34] TEACHER: Let me pull in, Sandeep.   {#697}
CTX| [00:50:36] TEACHER: Think more about it.   {#698}
CTX| [00:50:36] TEACHER: We basically covered it.   {#699}
CTX| [00:50:38] TEACHER: Like think about the flow.   {#700}
CTX| [00:50:40] TEACHER: What we are doing is let us take an exclusive lock on that.   {#701}
CTX| [00:50:43] STUDENT_1: I think there'll be starvation for some threads.   {#702}
CTX| [00:50:46] STUDENT_1: The threads will be starved some because even though both of them will be getting access to the same row, one of them is getting updated.   {#703}
CTX| [00:50:53] STUDENT_1: So the other thread will be waiting on it and that is getting updated.   {#704}
CTX| [00:50:57] STUDENT_1: So there'll be a starvation that takes place.   {#705}
CTX| [00:50:59] TEACHER: Okay.   {#706}
CTX| [00:51:00] TEACHER: So will all 120 seats be filled?   {#707}
