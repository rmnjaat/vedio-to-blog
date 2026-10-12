# chunk_02  OWNS 00:11:34 -> 00:24:53  (segments #160-#324, 2098 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:10:37] TEACHER: But transactional deadlocks are killers.   {#150}
CTX| [00:10:40] TEACHER: They stall your database.   {#151}
CTX| [00:10:42] TEACHER: If your database goes into a deadlock state and your database cannot recover   {#152}
CTX| [00:10:46] TEACHER: because of which what most databases do and most as in most popular databases,   {#153}
CTX| [00:10:52] TEACHER: MySQL Postgres Oracle is they do not let the database enter a deadlock state which means   {#154}
CTX| [00:11:01] TEACHER: that let's say if it saw that transaction if it saw the transaction T1 wants a lock on row 1,   {#155}
CTX| [00:11:13] TEACHER: row 1 is locked by transaction T2, transaction T2 wants a lock on row 2 and now let's say   {#156}
CTX| [00:11:22] TEACHER: Row 2 is now acquired by TransitionT1.   {#157}
CTX| [00:11:26] TEACHER: TransitionT1 just fired a statement where it said,   {#158}
CTX| [00:11:29] TEACHER: Hey, I want to acquire lock on Row 2.   {#159}

---- OWNED SEGMENTS START ----
[00:11:34] TEACHER: Whenever your database assigns,   {#160}
[00:11:37] TEACHER: like locks a row for a particular transaction,   {#161}
[00:11:40] TEACHER: it runs a deadlock detection algorithm.   {#162}
[00:11:43] TEACHER: So every time you're locking a particular row,   {#163}
[00:11:46] TEACHER: your database would run a deadlock detection algorithm.   {#164}
[00:11:52] TEACHER: out there it would run a deadlock detection algorithm whose job is to see that hey if I   {#165}
[00:12:00] TEACHER: acquire this if I let this transition even acquire a lock on row 2 would my database go in and go   {#166}
[00:12:07] TEACHER: into a deadlock deadlock detection is simple whenever you have a cyclic path in it it's a   {#167}
[00:12:15] TEACHER: deadlock. So here what would happen is as soon as the database would see that if I make transaction   {#168}
[00:12:23] TEACHER: T1 get lock on row 2 what would happen? My database would go in a deadlock state. I don't   {#169}
[00:12:30] TEACHER: want that to happen. So whenever such situation comes up and your database detects that in case   {#170}
[00:12:36] TEACHER: it allows this transaction to acquire a lock on this particular row it would go in a deadlock.   {#171}
[00:12:41] TEACHER: So then the transaction in this case, your transaction T1 is acquiring a lock on row 2.   {#172}
[00:12:46] TEACHER: Your transaction will kill itself.   {#173}
[00:12:48] TEACHER: So the transaction that is firing the query because of which or when a transaction is trying to acquire the lock because of which your database can go in and can enter into a deadlock state.   {#174}
[00:12:59] TEACHER: That transaction will be killed by the database engine.   {#175}
[00:13:03] TEACHER: This way, your database engine ensures that there is never a cyclic dependency formed in the system.   {#176}
[00:13:11] TEACHER: It would never let this edge pop up.   {#177}
[00:13:15] TEACHER: Never.   {#178}
[00:13:16] TEACHER: So you can very easily mimic this locally, very easily.   {#179}
[00:13:19] TEACHER: Just start two transactions, have two rows, acquiring lock, acquiring lock.   {#180}
[00:13:24] TEACHER: And you would see that when you fire the final SQL query, when you are trying to acquire   {#181}
[00:13:28] TEACHER: the lock by other transaction, that transaction, that fire that query would be killed.   {#182}
[00:13:33] TEACHER: Right?   {#183}
[00:13:34] TEACHER: As simple as this.   {#184}
[00:13:35] TEACHER: So this is how your database protects itself from entering into a deadlock state.   {#185}
[00:13:41] TEACHER: Because as soon as a database, if your database enters the deadlock state, everything is stalled.   {#186}
[00:13:46] TEACHER: Nothing would move forward.   {#187}
[00:13:47] TEACHER: The only way to recover from that is to reboot the database, which means downtime.   {#188}
[00:13:51] TEACHER: So your database would never let that happen.   {#189}
[00:13:54] TEACHER: So what it does, it never lets this edge form at all.   {#190}
[00:14:00] TEACHER: So this is where deadlock detection algorithm,   {#191}
[00:14:03] TEACHER: what we studied in computer science,   {#192}
[00:14:05] TEACHER: all of that come handy.   {#193}
[00:14:07] TEACHER: Core computer science is not going anywhere.   {#194}
[00:14:09] TEACHER: No matter how many React React comes out,   {#195}
[00:14:11] TEACHER: core computer science is core computer science.   {#196}
[00:14:14] TEACHER: This is not just for databases.   {#197}
[00:14:16] TEACHER: This is for operating system threads.   {#198}
[00:14:18] TEACHER: This is for distributed transactions.   {#199}
[00:14:21] TEACHER: Everything you pick.   {#200}
[00:14:23] TEACHER: Deadlock detection, deadlock prevention, supercritic.   {#201}
[00:14:27] TEACHER: So this is how your database behaves when there is deadlock or like how it protects deadlock.   {#202}
[00:14:36] TEACHER: When we look at demo, you would automatically understand how to mimic this locally in case   {#203}
[00:14:40] TEACHER: you are not dead.   {#204}
[00:14:42] TEACHER: Okay.   {#205}
[00:14:43] TEACHER: Now let's talk about the locking strategies that we're talking about, shared lock and   {#206}
[00:14:47] TEACHER: exclusive lock.   {#207}
[00:14:48] TEACHER: Now here in most databases, you would find two types of locks.   {#208}
[00:14:53] TEACHER: First are shared locks, but they are also called as read locks.   {#209}
[00:14:56] TEACHER: And there are exclusive locks also called as write locks.   {#210}
[00:15:00] TEACHER: So what shared locks do is first let me directly jump into the SQL query.   {#211}
[00:15:06] TEACHER: So if you are writing a SQL query where you want to let's say you want to acquire a shared   {#212}
[00:15:12] TEACHER: lock on a particular row. What do you do? You write your normal select statement   {#213}
[00:15:17] TEACHER: and just end it with for share. As soon as you end your statement with for share,   {#214}
[00:15:23] TEACHER: what a database engine would do is whichever row matched here in this equal query your transaction   {#215}
[00:15:30] TEACHER: will get a shared lock on those set of rows. So for example if let's say I have this six rows   {#216}
[00:15:38] TEACHER: and what I want is I want transaction one to take a lock shared lock on one two and six. I would   {#217}
[00:15:53] TEACHER: executes successfully transaction T1 would have shared locks on row 1, 2 and 6.   {#218}
[00:16:00] TEACHER: Right.   {#219}
[00:16:01] TEACHER: Okay.   {#220}
[00:16:02] TEACHER: Then let's say I have another transaction who wants to acquire lock on rows 3, 4 and   {#221}
[00:16:08] TEACHER: 6.   {#222}
[00:16:09] TEACHER: Now here what would happen?   {#223}
[00:16:11] TEACHER: But fire the statement, select where user ID in 346 for share.   {#224}
[00:16:16] TEACHER: Right.   {#225}
[00:16:17] TEACHER: So now here it would also get a shared log.   {#226}
[00:16:21] TEACHER: But it would get shared log of 346.   {#227}
[00:16:24] TEACHER: But now what's the behavior?   {#228}
[00:16:26] TEACHER: Now what's like why would we want to do that?   {#229}
[00:16:29] TEACHER: So shared log.   {#230}
[00:16:30] TEACHER: Shared log are read logs which means that it reserves.   {#231}
[00:16:36] TEACHER: So when a transaction acquires a shared log on a particular row,   {#232}
[00:16:41] TEACHER: the transaction having that log it would be allowed to read the row.   {#233}
[00:16:49] TEACHER: Similarly if it's a shared log other transactions are also allowed to read the same row.   {#234}
[00:16:55] TEACHER: So this which means that when one transaction is having a read log on it other transactions   {#235}
[00:17:01] TEACHER: are allowed to read them. But if other transaction is trying to modify this row   {#236}
[00:17:09] TEACHER: it would not be allowed to do so. So for example if my transaction 1 came first and it acquired the   {#237}
[00:17:15] TEACHER: lock on 1 to 6 then transition t2 came it acquired it tried to acquire a lock on 3 for 6 and if it   {#238}
[00:17:22] TEACHER: tries if the transaction t2 tries to update these rows it would have to wait because row 6   {#239}
[00:17:31] TEACHER: the read lock on row 6 is with transaction 1. So transaction 1 has the right to modify.   {#240}
[00:17:39] TEACHER: transaction 1 is allowed to read and modify the row while transaction 2 is allowed to read the row   {#241}
[00:17:45] TEACHER: but it cannot modify. So if it tries to modify it would have to wait until transaction 1 is either   {#242}
[00:17:53] TEACHER: complete or it is either committed or aborted. This way you get very high read throughput   {#243}
[00:18:01] TEACHER: because for a read only use case you don't want if one transaction has acquired the lock on one   {#244}
[00:18:07] TEACHER: row, they are not even allowing read to happen.   {#245}
[00:18:10] TEACHER: This allows other transactions to read the data and not modify it.   {#246}
[00:18:14] TEACHER: So when you are using shared log, you get very high read throughput.   {#247}
[00:18:20] TEACHER: Given that you don't want other transactions to modify it.   {#248}
[00:18:24] TEACHER: So this is what happens when you are taking a shared log on a particular set of rows.   {#249}
[00:18:32] TEACHER: okay now what happens when a transaction tries to modify it let's say let's say transaction one   {#250}
[00:18:41] TEACHER: is having the read lock on row one two and six so this command completed successfully   {#251}
[00:18:47] TEACHER: transaction one has read lock on one two and six now what would happen if my transaction one itself   {#252}
[00:18:55] TEACHER: tries to modify those rows so in that case read lock gets elevated to an exclusive lock and then   {#253}
[00:19:03] TEACHER: only modification happens so whenever a transaction wants to update a particular row it has to take   {#254}
[00:19:10] TEACHER: an exclusive lock so here elevation from shared lock to exclusive lock happens implicitly you   {#255}
[00:19:18] TEACHER: don't have to do anything it happens implicitly right but in any case it has to do that we'll see   {#256}
[00:19:25] TEACHER: action you'll you'll basically get what I say. Okay so this is about read logs or shared logs then   {#257}
[00:19:32] TEACHER: there are other class of logs which are exclusive logs. Now exclusive log is the is really strict   {#258}
[00:19:39] TEACHER: where it does not even allow other transactions to even read the log rows. So for example if now   {#259}
[00:19:47] TEACHER: how do you take that select start from for update when you end your SQL query with for update it   {#260}
[00:19:57] TEACHER: are selected as an output of the select query take an exclusive lock on that. Now this means that   {#261}
[00:20:03] TEACHER: if I have the same query with for update row 126, 126 and if this are completed successfully   {#262}
[00:20:11] TEACHER: I'll get the exclusive lock on rows 1, 2 and 6. This way what happens is transaction any other   {#263}
[00:20:21] TEACHER: transaction is not even allowed to read row one two and six let alone like do anything with that   {#264}
[00:20:27] TEACHER: it is not even allowed to read the rows let alone modify right so if at the same time or even after   {#265}
[00:20:35] TEACHER: sometime until the lock is released there is another transaction that came in that tries to   {#266}
[00:20:38] TEACHER: read the row but three four and six this sql query would not complete why because it is wanting to   {#267}
[00:20:46] TEACHER: read a row 6 which is locked by transaction 1 at this moment. So this SQL query would not complete.   {#268}
[00:20:53] TEACHER: It would wait and wait and wait until my first transaction either commits or aborts. Now this   {#269}
[00:21:02] TEACHER: gives you exclusivity on the set of rows. So 1, 2 and 6 transaction 1 has exclusive rights on that.   {#270}
[00:21:10] TEACHER: If I would not have passed 6 over here then this statement would have completed and would have   {#271}
[00:21:16] TEACHER: three and four. But because there is six over here, now what is happening is because of this six,   {#272}
[00:21:22] TEACHER: this SQL query execution would have to wait until the first transaction either commits or aborts.   {#273}
[00:21:28] TEACHER: This gives you exclusive error. Because you are not even allowed, this shipment would not even   {#274}
[00:21:32] TEACHER: complete, which means you cannot even read the rows or modify the row. It severely impacts the   {#275}
[00:21:37] TEACHER: throughput, but where you need exclusivity, you have to do it. So SQL queries or rather SQL   {#276}
[00:21:46] TEACHER: They give you shared locks and exclusive locks out of the box and they help you ensure the correctness of your system in case of concurrent transactions.   {#277}
[00:21:55] TEACHER: Okay.   {#278}
[00:21:57] TEACHER: Just an extension through that.   {#279}
[00:21:59] TEACHER: Skip locked.   {#280}
[00:22:00] TEACHER: So for example, there is a chance where, for example, here, take a look at this.   {#281}
[00:22:08] TEACHER: I want lock on rows 1, 2 and 6.   {#282}
[00:22:12] TEACHER: Transaction 1 fired.   {#283}
[00:22:13] TEACHER: It got locks on rows 1, 2 and 6.   {#284}
[00:22:16] TEACHER: When transaction two came in, it wanted log three, four and six.   {#285}
[00:22:20] TEACHER: Now what if, now here I can, if I would have just passed three and four, I would have completed   {#286}
[00:22:27] TEACHER: the SQL query and would have moved forward in this transaction.   {#287}
[00:22:30] TEACHER: But because of this six, I'm not able to move forward.   {#288}
[00:22:34] TEACHER: Now there might be use cases, which we'll see in some time where it is okay for you   {#289}
[00:22:41] TEACHER: to skip the locked rows.   {#290}
[00:22:43] TEACHER: For example, if my transaction 1 wants 1, 2 and 6,   {#291}
[00:22:49] TEACHER: transaction 2 wants 3, 4 and 6.   {#292}
[00:22:51] TEACHER: But it is okay if I don't get all these three rows.   {#293}
[00:22:55] TEACHER: I just want these two rows.   {#294}
[00:22:56] TEACHER: Like whichever rows that are not locked I wanted.   {#295}
[00:22:59] TEACHER: I want to skip the locked rows.   {#296}
[00:23:02] TEACHER: Then I have this construct where I can say,   {#297}
[00:23:05] TEACHER: select for update, skip lock.   {#298}
[00:23:09] TEACHER: So when I say skip lock,   {#299}
[00:23:10] TEACHER: it means that whatever rows I'm trying to get over here if any of those rows are locked by some other   {#300}
[00:23:19] TEACHER: transaction skip them which means that on a best effort basis it this command if I would have written   {#301}
[00:23:28] TEACHER: skip locked over here this transaction would have moved forward and I would have gotten only rows   {#302}
[00:23:34] TEACHER: three and four. If that's okay for my use case, that's okay for my use case. So you may not have   {#303}
[00:23:40] TEACHER: to wait every time for every single row to be available. But there are some cases where you   {#304}
[00:23:46] TEACHER: have to wait, where you need all these three rows there. So then you have to wait. There is no other   {#305}
[00:23:51] TEACHER: option. But in some use cases, it is okay for you to skip the locked rows and work with whatever you   {#306}
[00:23:58] TEACHER: have. In that case, you can just write skip log and move forward. Another extreme of skip log is   {#307}
[00:24:05] TEACHER: no wait. But for example, your use case dictates that, Hey, when you are firing a query in case any   {#308}
[00:24:12] TEACHER: of the row is logged by any other transaction, kill myself. You don't want to wait. If you wait,   {#309}
[00:24:19] TEACHER: your throughput would go down. It's your use case. You don't want to wait. If like, for example,   {#310}
[00:24:23] TEACHER: if you know that some transaction has picked that row,   {#311}
[00:24:26] TEACHER: it would process that.   {#312}
[00:24:28] TEACHER: And you don't have to do it.   {#313}
[00:24:29] TEACHER: So you can kill yourself.   {#314}
[00:24:31] TEACHER: Because now you have no reason to exist.   {#315}
[00:24:34] TEACHER: Like that transaction is going into existential crisis.   {#316}
[00:24:37] TEACHER: That hey, someone else is doing it.   {#317}
[00:24:38] TEACHER: Why should I do it?   {#318}
[00:24:39] TEACHER: So you kill yourself.   {#319}
[00:24:40] TEACHER: So in that case, you do no wait.   {#320}
[00:24:43] TEACHER: So where do you say that?   {#321}
[00:24:45] TEACHER: If for your use case,   {#322}
[00:24:48] TEACHER: if some other transaction has locked the rows   {#323}
[00:24:51] TEACHER: that you were interested in   {#324}
---- OWNED SEGMENTS END ----

CTX| [00:24:53] TEACHER: to and you don't want to wait you kill yourself and then maybe retry and all depending on your   {#325}
CTX| [00:24:57] TEACHER: business but this is that hardcore construct that you need to know where you it's okay for you to   {#326}
CTX| [00:25:04] TEACHER: crash yourself just because someone else took that right a classic weird mentality but how   {#327}
CTX| [00:25:12] TEACHER: there are use cases where you need to do no wait and why this is like why this even exists because   {#328}
CTX| [00:25:19] TEACHER: Because it helps you ensure that you are not waiting because if you don't give anything   {#329}
CTX| [00:25:26] TEACHER: a transaction T2 will wait for you to acquire the lock.   {#330}
CTX| [00:25:30] TEACHER: And then waiting, let's say your SQL query timeout is let's say 10 seconds.   {#331}
CTX| [00:25:33] TEACHER: So it would wait for 10 seconds unnecessarily.   {#332}
CTX| [00:25:36] TEACHER: That would choke down entire performance of the database for that thread.   {#333}
CTX| [00:25:40] TEACHER: Plus your client would have to wait unnecessarily.   {#334}
CTX| [00:25:42] TEACHER: If your use case says that, hey, if the row is locked, I don't care.   {#335}
CTX| [00:25:46] TEACHER: Kill yourself.   {#336}
CTX| [00:25:48] TEACHER: Right.   {#337}
CTX| [00:25:49] TEACHER: So then you do that.   {#338}
CTX| [00:25:51] TEACHER: So these are basic constructs.   {#339}
