# chunk_05  OWNS 00:50:00 -> 01:01:25  (segments #684-#889, 1908 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:49:00] TEACHER: And then the user id is null, so it read that particular thing.   {#665}
CTX| [00:49:04] TEACHER: This is why commit is so important.   {#666}
CTX| [00:49:07] TEACHER: When someone committed and then the next read happened,   {#667}
CTX| [00:49:11] TEACHER: it got the next row because of this condition,   {#668}
CTX| [00:49:15] TEACHER: not because this is how we wrote the code.   {#669}
CTX| [00:49:18] TEACHER: Right?   {#670}
CTX| [00:49:18] TEACHER: Okay.   {#671}
CTX| [00:49:19] TEACHER: So here what we did is we saw why locking is important.   {#672}
CTX| [00:49:27] TEACHER: Right?   {#673}
CTX| [00:49:27] TEACHER: How we thought we built a system where all 120 seats should be filled,   {#674}
CTX| [00:49:32] TEACHER: but they are not because everyone is reading that same old row.   {#675}
CTX| [00:49:35] TEACHER: This is exactly why pessimistic locking is needed.   {#676}
CTX| [00:49:38] TEACHER: So now let's do this.   {#677}
CTX| [00:49:39] TEACHER: Let's add pessimistic locking to this and see how it benefits us.   {#678}
CTX| [00:49:45] TEACHER: So now here entire code is same as approach read.   {#679}
CTX| [00:49:49] TEACHER: I just added two words at the end for update.   {#680}
CTX| [00:49:54] TEACHER: That's it.   {#681}
CTX| [00:49:55] TEACHER: Now what would happen?   {#682}
CTX| [00:49:57] TEACHER: Amrik?   {#683}

---- OWNED SEGMENTS START ----
[00:50:00] STUDENT_2: Deadlock.   {#684}
[00:50:02] STUDENT_8: Why deadlock?   {#685}
[00:50:04] STUDENT_2: Because the first user who is coming in, if he is acquiring a seed, okay.   {#686}
[00:50:09] STUDENT_2: And the second one is also waiting for it.   {#687}
[00:50:12] STUDENT_2: So maybe the second one who is waiting his transaction may got cancelled.   {#688}
[00:50:17] TEACHER: Waiting is not equal to deadlock.   {#689}
[00:50:19] TEACHER: You know it, right?   {#690}
[00:50:20] TEACHER: Deadlock happens when you are waiting on row, which is logged by someone else.   {#691}
[00:50:24] TEACHER: And that is waiting for row that you are holding up.   {#692}
[00:50:28] STUDENT_2: Okay.   {#693}
[00:50:28] STUDENT_2: Maybe his transaction may get cancelled at that time.   {#694}
[00:50:32] TEACHER: No.   {#695}
[00:50:34] TEACHER: Okay.   {#696}
[00:50:34] TEACHER: Let me pull in, Sandeep.   {#697}
[00:50:36] TEACHER: Think more about it.   {#698}
[00:50:36] TEACHER: We basically covered it.   {#699}
[00:50:38] TEACHER: Like think about the flow.   {#700}
[00:50:40] TEACHER: What we are doing is let us take an exclusive lock on that.   {#701}
[00:50:43] STUDENT_1: I think there'll be starvation for some threads.   {#702}
[00:50:46] STUDENT_1: The threads will be starved some because even though both of them will be getting access to the same row, one of them is getting updated.   {#703}
[00:50:53] STUDENT_1: So the other thread will be waiting on it and that is getting updated.   {#704}
[00:50:57] STUDENT_1: So there'll be a starvation that takes place.   {#705}
[00:50:59] TEACHER: Okay.   {#706}
[00:51:00] TEACHER: So will all 120 seats be filled?   {#707}
[00:51:03] STUDENT_1: Uh, I think so because you have clearly, uh, mentioned, uh, for update, right.   {#708}
[00:51:09] STUDENT_1: Which is a pessimist slot.   {#709}
[00:51:10] STUDENT_1: So yeah, I think so, but at the expense of time, so it won't be a concurrent, but the   {#710}
[00:51:17] STUDENT_1: time will increase for, for few of the threats.   {#711}
[00:51:21] TEACHER: Few of the threats.   {#712}
[00:51:22] TEACHER: How, how many transactions the time will increase?   {#713}
[00:51:26] STUDENT_1: as the i think as you increase like as you progress the time increases like for example   {#714}
[00:51:34] STUDENT_1: the 10th transaction might have to wait for 10 seconds let's assume let's let's just simplify   {#715}
[00:51:38] TEACHER: this let's say uh wait is equal to one second okay so first transaction came in okay it will   {#716}
[00:51:46] STUDENT_1: instantly it will get it the second transaction uh will also get it but because other thread is   {#717}
[00:51:55] STUDENT_1: updating on it so it needs to it needs to get the second row and update it so because but it   {#718}
[00:52:04] TEACHER: needs the second row why would it wait on the first one why would it wait on the first show   {#719}
[00:52:10] STUDENT_1: because all of them are querying the same row at the first end because all of them are fired   {#720}
[00:52:15] STUDENT_1: concurrently right so parallelly all the 120 threads will be accessing the first row but the   {#721}
[00:52:20] STUDENT_1: first row will go to the first thread. So the second row, the second thread is seeing that the   {#722}
[00:52:26] STUDENT_1: first row is getting updated. So that's why the second thread will go and query the second row   {#723}
[00:52:31] TEACHER: and then it will try to update. But why? Because if you look at the query, okay, let me not dive   {#724}
[00:52:44] TEACHER: into that. It would go, we'll go to another rabbit hole in, in, in sometime we will anyway hit that.   {#725}
[00:52:50] TEACHER: first transaction came in it executed this query it got the first row it took an exclusive lock on   {#726}
[00:52:59] TEACHER: that right yeah now when my second transaction came in it fires this exact same query now   {#727}
[00:53:06] TEACHER: would it wait on the first row would it not just move to the second row   {#728}
[00:53:13] STUDENT_1: because i don't think it it will wait right because if the user id is null if it is not   {#729}
[00:53:18] STUDENT_1: yet updated then for that second go routine it will sting it will still think that okay it will   {#730}
[00:53:23] STUDENT_1: read it okay this is my row but it is locked so i need to wait so then how is it jumping to the second   {#731}
[00:53:30] STUDENT_1: row then there should be a mechanism that will uh yeah then there should be a verification before   {#732}
[00:53:38] STUDENT_1: you write it right so the moment you get the lock is removed it needs to make sure that the user id   {#733}
[00:53:44] STUDENT_1: is still null and then you need to write. Only then   {#734}
[00:53:48] STUDENT_1: we'll have that sequential update of rows. Otherwise, they'll be rewritten   {#735}
[00:53:52] TEACHER: every time. Not entirely true. Let me   {#736}
[00:53:56] STUDENT_1: cover that. But one question I have here, Arpej. Don't you think   {#737}
[00:54:00] STUDENT_1: ACID properties are given by default? Why do I need to do all this?   {#738}
[00:54:05] TEACHER: ACID properties is at transaction level. This is   {#739}
[00:54:08] TEACHER: within transaction. These are concurrent transactions. It's not guaranteeing   {#740}
[00:54:14] TEACHER: is as just atomicity, consistency, isolation, durability.   {#741}
[00:54:17] TEACHER: So durability, when you commit, it gets flushed.   {#742}
[00:54:19] TEACHER: We saw it in action.   {#743}
[00:54:20] TEACHER: Isolation, which means two transactions that running,   {#744}
[00:54:23] TEACHER: they are independent of each other.   {#745}
[00:54:25] TEACHER: Now, when it comes to isolation,   {#746}
[00:54:26] TEACHER: depending on the isolation level of the database,   {#747}
[00:54:29] TEACHER: read committed, read uncommitted, serializable,   {#748}
[00:54:32] TEACHER: and read repeated, right?   {#749}
[00:54:33] TEACHER: Or rather basically repeatable read.   {#750}
[00:54:35] TEACHER: Or depending on the isolation level,   {#751}
[00:54:37] TEACHER: the transactions will be scheduled as per that, right?   {#752}
[00:54:41] TEACHER: But this is within the transaction.   {#753}
[00:54:44] TEACHER: transaction where you are locking some rows to get something done.   {#754}
[00:54:49] TEACHER: Right.   {#755}
[00:54:49] TEACHER: So if your transaction isolation level was serializable, serializable isolation level   {#756}
[00:54:55] TEACHER: says that when one transaction is executing, my database would not even execute other   {#757}
[00:55:01] TEACHER: transaction, which means your transactions are literally one transaction, then another   {#758}
[00:55:06] TEACHER: transaction, then another transaction, another transaction.   {#759}
[00:55:08] TEACHER: So it's pathetically slow.   {#760}
[00:55:10] TEACHER: Right.   {#761}
[00:55:11] TEACHER: But then you would not face this issue at all.   {#762}
[00:55:14] TEACHER: transaction isolation level was serialized.   {#763}
[00:55:17] TEACHER: But because the default isolation level is not serializable   {#764}
[00:55:20] TEACHER: and you don't do it for practical reasons   {#765}
[00:55:21] TEACHER: because you need to support high throughput,   {#766}
[00:55:23] TEACHER: you just cannot say,   {#767}
[00:55:25] TEACHER: I'll just wait.   {#768}
[00:55:28] STUDENT_1: Okay, you're saying asset property,   {#769}
[00:55:30] STUDENT_1: we can configure it.   {#770}
[00:55:32] STUDENT_1: In typical use case,   {#771}
[00:55:33] STUDENT_1: we don't configure it for high throughput.   {#772}
[00:55:35] TEACHER: Yeah, yeah, yeah.   {#773}
[00:55:36] TEACHER: So if you configure isolation level to serializable,   {#774}
[00:55:39] TEACHER: you don't need to do all this stuff.   {#775}
[00:55:41] TEACHER: But you don't do it because you need high throughput.   {#776}
[00:55:44] TEACHER: Just imagine if two users, one user is updating row one, other users   {#777}
[00:55:48] TEACHER: updating row hundred, why should one updating row hundred should wait for   {#778}
[00:55:51] TEACHER: row one to get updated?   {#779}
[00:55:52] TEACHER: No, right.   {#780}
[00:55:53] TEACHER: That's why you don't do it.   {#781}
[00:55:55] TEACHER: Right.   {#782}
[00:55:55] TEACHER: So that you can accept parallel rights.   {#783}
[00:55:58] STUDENT_6: Right.   {#784}
[00:55:59] TEACHER: Okay.   {#785}
[00:56:00] TEACHER: Let me walk you through on what exactly.   {#786}
[00:56:03] TEACHER: So first let's run.   {#787}
[00:56:04] TEACHER: Okay.   {#788}
[00:56:04] TEACHER: Wait, wait, wait, wait, wait.   {#789}
[00:56:05] TEACHER: I've totally forgot.   {#790}
[00:56:09] TEACHER: I'll pick in Rahul.   {#791}
[00:56:10] TEACHER: Rahul, will all 120 seats be filled?   {#792}
[00:56:13] STUDENT_1: uh i don't think so like it depends on like if skip lock uh skip lock is like enabled by default   {#793}
[00:56:21] STUDENT_1: or like we need it's not enabled by default anyway it's not so so the result so what will   {#794}
[00:56:28] STUDENT_1: happen is like this query will try to get the first row that this transaction will have and   {#795}
[00:56:34] STUDENT_1: like every transaction will try to do the same so it will be kind of like a deadlock   {#796}
[00:56:40] STUDENT_1: not like deadlock but   {#797}
[00:56:43] TEACHER: use the proper   {#798}
[00:56:44] TEACHER: so you are saying that so that only   {#799}
[00:56:46] TEACHER: one row is filled yeah   {#800}
[00:56:48] STUDENT_1: I think so because like   {#801}
[00:56:50] STUDENT_1: skip lock is not available   {#802}
[00:56:52] STUDENT_1: right now so   {#803}
[00:56:53] STUDENT_1: it won't move to second   {#804}
[00:56:55] STUDENT_1: okay okay   {#805}
[00:56:58] TEACHER: will all 120 rows be filled   {#806}
[00:57:00] STUDENT_10: not all 120 but   {#807}
[00:57:02] STUDENT_10: somewhere between 1 to   {#808}
[00:57:04] STUDENT_10: 120 I think   {#809}
[00:57:06] STUDENT_10: this will depend on scheduling   {#810}
[00:57:07] STUDENT_10: of the go routines so   {#811}
[00:57:11] STUDENT_10: imagine there are two go routines and the first one picked it.   {#812}
[00:57:16] TEACHER: No, no, that's right.   {#813}
[00:57:17] TEACHER: We, we, we, we, we, we anyway discussed that.   {#814}
[00:57:18] TEACHER: So you are saying that it would not be one,   {#815}
[00:57:21] TEACHER: it would be somewhere between one to one 20,   {#816}
[00:57:23] TEACHER: but definitely not one 20.   {#817}
[00:57:24] TEACHER: Is it?   {#818}
[00:57:24] TEACHER: Yes.   {#819}
[00:57:25] STUDENT_8: Okay.   {#820}
[00:57:26] STUDENT_2: Got it.   {#821}
[00:57:26] STUDENT_2: Got it.   {#822}
[00:57:27] STUDENT_2: All one 26 feet.   {#823}
[00:57:29] STUDENT_2: I think so because it's a four update.   {#824}
[00:57:32] STUDENT_2: I think it was exclusive lock, exclusive lock.   {#825}
[00:57:35] STUDENT_2: So let's T1 comes.   {#826}
[00:57:37] STUDENT_2: It's the rover.   {#827}
[00:57:40] STUDENT_2: It won't even let it pick R1 because we have an exclusive lock on that.   {#828}
[00:57:46] STUDENT_2: So it will wait until R1 gets free.   {#829}
[00:57:48] STUDENT_2: Now when one has completed execution at some point of time, T2 and all the subsequent threads,   {#830}
[00:57:53] STUDENT_2: which were waiting for R1 to get free, to get, they would get, they would get R1 see that   {#831}
[00:57:59] STUDENT_2: they are, it's not null down.   {#832}
[00:58:01] STUDENT_2: They will move to subsequent row R2.   {#833}
[00:58:03] TEACHER: Why would they move to, why would they like, how would they automatically move to subsequent   {#834}
[00:58:06] STUDENT_2: row?   {#835}
[00:58:07] STUDENT_2: How?   {#836}
[00:58:07] STUDENT_2: How?   {#837}
[00:58:08] STUDENT_2: Because it has to complete this query where it has to find user ID.   {#838}
[00:58:13] STUDENT_2: None.   {#839}
[00:58:13] STUDENT_2: But imagine you as database engineer, you are writing that code.   {#840}
[00:58:17] TEACHER: You implemented this database.   {#841}
[00:58:18] TEACHER: How would you write it?   {#842}
[00:58:20] TEACHER: How to write that code where it says that, Hey, this row is not, you move to the next   {#843}
[00:58:25] TEACHER: row.   {#844}
[00:58:25] TEACHER: Like with this, like basically I'm not talking about skip log yet.   {#845}
[00:58:29] TEACHER: Think about it.   {#846}
[00:58:30] TEACHER: Like you are the creator of the database.   {#847}
[00:58:33] TEACHER: You have to implement this logic.   {#848}
[00:58:36] TEACHER: How would you do it?   {#849}
[00:58:37] TEACHER: Like for example, if I don't have query like this, if I have query, but I'm just updating   {#850}
[00:58:42] TEACHER: where trip ID one and user ID is none.   {#851}
[00:58:45] TEACHER: And let's say seat ID is equal to 67.   {#852}
[00:58:48] TEACHER: Like people are picking that particular seat in that case, how would you do it?   {#853}
[00:58:53] TEACHER: There has to be a uniform way to handle both types of queries, right?   {#854}
[00:58:58] TEACHER: Here I'm doing a pointed lookup.   {#855}
[00:59:00] TEACHER: I'm doing a pointed row lock here.   {#856}
[00:59:03] TEACHER: It would not move to the next row.   {#857}
[00:59:04] TEACHER: Correct.   {#858}
[00:59:05] STUDENT_16: Yeah.   {#859}
[00:59:07] TEACHER: it is moving to the next row because like because it saw that row is locked right so there has to   {#860}
[00:59:13] TEACHER: be a uniform way to handle it by the database correct yeah okay but still you are in the favor   {#861}
[00:59:21] TEACHER: of all 120 seats getting filled all the reasoning uh almost 90 correct but still 120 when what i   {#862}
[00:59:30] TEACHER: I got for one 20 I'll pick one more, uh, uh, all one 20 is getting filled or not.   {#863}
[00:59:37] STUDENT_2: Uh, no, I don't think that all 120 will get filled.   {#864}
[00:59:41] STUDENT_2: I think it will be something like, uh, the previous one only where if the, if the, uh,   {#865}
[00:59:49] STUDENT_2: a hundred thread is firing and if something is committed till now, it will then picks   {#866}
[00:59:54] STUDENT_2: like some other row.   {#867}
[00:59:55] STUDENT_2: Otherwise, everybody will wait on 1A and they will see it got filled out and they will cancel.   {#868}
[01:00:02] TEACHER: Got it.   {#869}
[01:00:04] TEACHER: Let's run and see.   {#870}
[01:00:06] TEACHER: So first thing, if we are adding two words to our query and it's still not making any   {#871}
[01:00:11] TEACHER: difference, something might be wrong.   {#872}
[01:00:14] TEACHER: So let's see.   {#873}
[01:00:15] TEACHER: Let's run and see what happens.   {#874}
[01:00:17] TEACHER: Uptoch 4, we ran it.   {#875}
[01:00:19] TEACHER: Oh, all 26 filled out.   {#876}
[01:00:23] TEACHER: If I run it again, all 120 sets are filled up.   {#877}
[01:00:28] TEACHER: If I run it again, all 120 sets are filled up.   {#878}
[01:00:32] TEACHER: This is the beauty of this implementation.   {#879}
[01:00:34] TEACHER: So what is happening behind the scenes?   {#880}
[01:00:36] TEACHER: Let me walk you through that.   {#881}
[01:00:36] TEACHER: And this is the most critical part that people skip.   {#882}
[01:00:40] TEACHER: This is where the magic happens.   {#883}
[01:00:42] TEACHER: Now, first of all, what we did is we are trying to book a seat order by ID.   {#884}
[01:00:48] TEACHER: so here you can very clearly see how seats are getting booked 1c 1d 1e 1f 2a 2b 2c 2d 2f all   {#885}
[01:00:59] TEACHER: are in order hold true right so users are coming they're taking an exclusive lock and while that   {#886}
[01:01:07] TEACHER: exclusive lock is taken other transactions wait once this exclusive lock is released   {#887}
[01:01:12] TEACHER: but then most of you thought that they are all and it's very natural to think that way   {#888}
[01:01:20] TEACHER: and which is where I would tell you how database actually do that.   {#889}
---- OWNED SEGMENTS END ----

CTX| [01:01:25] TEACHER: So a lot of you thought that let's say there are 120 seats, 120 transactions came in,   {#890}
CTX| [01:01:32] TEACHER: they all fired the query, the same query hypothetically let's say that exact same time   {#891}
CTX| [01:01:37] TEACHER: They came to it like the database, all one-minute transactions are active at the very same time.   {#892}
CTX| [01:01:44] TEACHER: They are all fired the same query.   {#893}
CTX| [01:01:46] TEACHER: They all got first row, but they didn't actually get the first row.   {#894}
CTX| [01:01:53] TEACHER: Database is not returning the first row unless they get it.   {#895}
CTX| [01:01:57] TEACHER: So transaction does not have a lock on that row anyway.   {#896}
CTX| [01:02:00] TEACHER: But when transaction fired this query, they saw or rather the database engine saw that the rows on which they are trying to iterate.   {#897}
CTX| [01:02:10] TEACHER: Because what we did is we are just iterating on this.   {#898}
CTX| [01:02:14] TEACHER: The row on which they are trying to iterate is locked by someone.   {#899}
CTX| [01:02:18] TEACHER: So other transaction waits.   {#900}
CTX| [01:02:21] TEACHER: When the lock, when the first transaction commits, in our case commits, I'm not going to about state.   {#901}
