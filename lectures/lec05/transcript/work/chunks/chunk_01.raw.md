# chunk_01  OWNS 00:00:02 -> 00:11:34  (segments #0-#159, 1875 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: Great. Week second, day first. Today, we'll be discussing a ton about relational databases because they are the heart and soul of entire business. No matter how many NoSQL comes in, no matter how many MongoDBs, Cassandras, and DynamoDBs come out, relational databases hold a really special place. Really special place because they form the raw foundation of how data is.   {#0}
[00:00:30] TEACHER: databases should be structured what kind of guarantees they can provide like they are world   {#1}
[00:00:35] TEACHER: strictest databases out there so the agenda for today is relational databases we understand   {#2}
[00:00:41] TEACHER: briefly and we all have used it so would not spend a lot of time but where we would be spending a lot   {#3}
[00:00:46] TEACHER: of time is around understanding locking especially pessimistic locking this is one of the most   {#4}
[00:00:53] TEACHER: neglected topics if i may put it off all time and when it comes to databases i don't know why people   {#5}
[00:01:00] TEACHER: scared of this it's one of the best things out there it's one of the best features out there   {#6}
[00:01:04] TEACHER: it helps you understand so many things now we'll first cover a bunch of theory around locking then   {#7}
[00:01:10] TEACHER: we'll see a live demo of how you implement it how you get benefits out of it so by and we in order   {#8}
[00:01:19] TEACHER: to understand it we'll build an airline checking system right we'll actually code it out we'll   {#9}
[00:01:24] TEACHER: actually see it in action we'll actually see how locking impacts everything and what kind of   {#10}
[00:01:30] TEACHER: and how they actually do it.   {#11}
[00:01:31] TEACHER: This will be the first half.   {#12}
[00:01:33] TEACHER: Then we take a break for five, six minutes   {#13}
[00:01:35] TEACHER: and then a huge discussion around key value store   {#14}
[00:01:39] TEACHER: on top of relational DB.   {#15}
[00:01:40] TEACHER: So the entire focus will be on relational databases only.   {#16}
[00:01:44] TEACHER: So we'll build a key value store on relational DB,   {#17}
[00:01:47] TEACHER: which means that we want to have a key value store like thing,   {#18}
[00:01:50] TEACHER: but on the backend, we will be having a relational DB.   {#19}
[00:01:53] TEACHER: So it would help us solidify our understanding   {#20}
[00:01:55] TEACHER: around relational DB and key value store in general.   {#21}
[00:01:58] TEACHER: Okay, so that's the agenda for today.   {#22}
[00:02:01] TEACHER: Let's start.   {#23}
[00:02:02] TEACHER: Relational databases, you all know that.   {#24}
[00:02:06] TEACHER: It's stored and represented in rows and columns.   {#25}
[00:02:08] TEACHER: And the key highlight of that is relations because of which they are called relational   {#26}
[00:02:12] TEACHER: databases.   {#27}
[00:02:13] TEACHER: Now these relational databases are special because they started, like they made everything   {#28}
[00:02:23] TEACHER: what we see today possible.   {#29}
[00:02:25] TEACHER: Because relational databases were so good, they were so reliable, everyone started using it.   {#30}
[00:02:31] TEACHER: People found different applications to build on top of that.   {#31}
[00:02:35] TEACHER: And they are right now the backbone of our entire internet.   {#32}
[00:02:41] TEACHER: So always remember, whenever a new thing comes up, a new revolutionary technology comes up,   {#33}
[00:02:47] TEACHER: it would always find its first set of application in the domain of finance.   {#34}
[00:02:55] TEACHER: Always, always.   {#35}
[00:02:56] TEACHER: For example, when computers first came up, they like people used it for what?   {#36}
[00:03:05] TEACHER: Computation.   {#37}
[00:03:05] TEACHER: That's what it's called computers.   {#38}
[00:03:07] TEACHER: People, the first set of applications that were ported on computers, but what?   {#39}
[00:03:10] TEACHER: Spreadsheets.   {#40}
[00:03:12] TEACHER: Right?   {#41}
[00:03:12] TEACHER: Spreadsheet was one of the first, basically it was called ledger.   {#42}
[00:03:15] TEACHER: And I used to like, my father used to do a black and white screen.   {#43}
[00:03:19] TEACHER: There's a tool called TW, which was for typewriter.   {#44}
[00:03:22] TEACHER: And then one was for ledger.   {#45}
[00:03:25] TEACHER: I basically forgot the short form of that.   {#46}
[00:03:28] TEACHER: And he used to punch in numbers onto that and just do the accounting part.   {#47}
[00:03:33] TEACHER: So you'll always see this.   {#48}
[00:03:35] TEACHER: Then now if you see last year when there was hype of blockchain or rather since 2012 when blockchain was introduced,   {#49}
[00:03:43] TEACHER: the first set of applications that it found was around money.   {#50}
[00:03:46] TEACHER: Whenever something new comes up, you'll always find, whenever something new foundational comes up,   {#51}
[00:03:52] TEACHER: you'll always find the first set of applications being adopted.   {#52}
[00:03:55] TEACHER: as financial applications, accounting and whatnot.   {#53}
[00:03:59] TEACHER: Relational databases are also meant to do that exact same thing.   {#54}
[00:04:02] TEACHER: That's why you see rows and columns as the structure.   {#55}
[00:04:06] TEACHER: So keep an eye on those.   {#56}
[00:04:08] TEACHER: Whenever something foundational comes up, you would always see this pattern.   {#57}
[00:04:11] TEACHER: There is nothing magical about it because humans,   {#58}
[00:04:13] TEACHER: because our entire society runs on money, we can't help it.   {#59}
[00:04:17] TEACHER: Okay.   {#60}
[00:04:19] TEACHER: Given that relational databases were   {#61}
[00:04:21] TEACHER: were conceptualized to make financial applications possible,   {#62}
[00:04:26] TEACHER: they had to provide very strong guarantees   {#63}
[00:04:29] TEACHER: because it was dealing with money,   {#64}
[00:04:31] TEACHER: which is why ACID became the core part of this database.   {#65}
[00:04:35] TEACHER: Because what it led to was the fact that we cannot lose our data.   {#66}
[00:04:41] TEACHER: You cannot lose a transaction.   {#67}
[00:04:43] TEACHER: Whatever you write has to be correct.   {#68}
[00:04:45] TEACHER: You should never get corrupted.   {#69}
[00:04:47] TEACHER: Multiple people should be able to update it,   {#70}
[00:04:52] TEACHER: are, which is exactly what transaction becomes the part and parcel, the core component of   {#71}
[00:04:58] TEACHER: relational databases.   {#72}
[00:04:59] TEACHER: Because they were the first ones to deal with financial data.   {#73}
[00:05:04] TEACHER: So in the pre-reads, I shared four articles written by me on AC, I and D. If you have   {#74}
[00:05:10] TEACHER: not read it, you should read.   {#75}
[00:05:12] TEACHER: Pre-reads are meant to read.   {#76}
[00:05:13] TEACHER: I spend a lot of time doing that, curation and all.   {#77}
[00:05:16] TEACHER: In most cases, I have written it.   {#78}
[00:05:18] TEACHER: read that if you haven't in case you don't know about them.   {#79}
[00:05:21] TEACHER: Apart from that, in a pre-read, I also shared a video   {#80}
[00:05:25] TEACHER: how indexes make database read faster.   {#81}
[00:05:28] TEACHER: Watch that if you haven't already.   {#82}
[00:05:31] TEACHER: Tomorrow, a new video will come up.   {#83}
[00:05:32] TEACHER: It is members-only video on YouTube on why databases use B plus 3.   {#84}
[00:05:36] TEACHER: So in case you are interested, go for that.   {#85}
[00:05:39] TEACHER: But all in all, relational databases are really important for you   {#86}
[00:05:42] TEACHER: to know and understand and use it well.   {#87}
[00:05:45] TEACHER: And I'll make you fall in love with relational databases by end of today.   {#88}
[00:05:47] TEACHER: 100 percent okay so enough of this background let's jump into pessimistic locking now this   {#89}
[00:05:56] TEACHER: is where it gets really interesting because database column column everyone can create   {#90}
[00:06:01] TEACHER: the crux part is how to do locking why do you do locking why do we need locking so relational   {#91}
[00:06:07] TEACHER: databases most most name all relational databases mysql postgres oracle pick your favorite right   {#92}
[00:06:14] TEACHER: What they do is they give you those constructs that allow you to ensure that your data does not   {#93}
[00:06:20] TEACHER: look corrupt. One of the ways to do it is with database locking which is pessimistic implementation.   {#94}
[00:06:26] TEACHER: Now a pessimistic implementation always goes something like this. Whenever you are updating   {#95}
[00:06:30] TEACHER: a critical section you want to do a critical thing. For example, updations. You want to update a row.   {#96}
[00:06:36] TEACHER: So while you are updating a row you have to ensure that other transaction is not updating the row at   {#97}
[00:06:40] TEACHER: the same time because it's a critical row count plus plus is not atomic operation so when you   {#98}
[00:06:46] TEACHER: are doing it when you are updating a certain row you don't want any other transaction to do anything   {#99}
[00:06:52] TEACHER: with that row classic case classic locking case so what do you do you wrap it with locking right   {#100}
[00:07:01] TEACHER: so you all the transaction would have to wait to acquire the lock then do the critical action and   {#101}
[00:07:07] TEACHER: then release the lock. Once the lock is released, other transaction would be allowed to do this   {#102}
[00:07:11] TEACHER: operation. So this is a classic pessimistic locking implementation. Very classic. Okay.   {#103}
[00:07:18] TEACHER: There are two types of locking strategies. Pessimistic locking strategies. First is shared   {#104}
[00:07:23] TEACHER: lock. Second is exclusive lock. Now here, before we jump into shared lock and exclusive lock and   {#105}
[00:07:32] TEACHER: see them in detail we need locking like first we need to ask this question why do we even need   {#106}
[00:07:38] TEACHER: locking it's just that is it only because i don't want only i want only one transaction to do   {#107}
[00:07:43] TEACHER: something at a time so then wouldn't it slow down the throughput and all yes it does affect right   {#108}
[00:07:48] TEACHER: so when you are having a row that two transactions would want to update at the same time for example   {#109}
[00:07:55] TEACHER: clap count on medium two people clapped at the same time right you want at then to be count equal to   {#110}
[00:08:02] TEACHER: How do you ensure two transitions both doing count plus plus?   {#111}
[00:08:06] TEACHER: If both read the same old value, both updated, then the final value would be count plus one   {#112}
[00:08:10] TEACHER: and not count plus two.   {#113}
[00:08:12] TEACHER: You want that to be count plus two.   {#114}
[00:08:14] TEACHER: So this is where you need to have the correctness of data is more important than throughput.   {#115}
[00:08:22] TEACHER: That's where locking comes in.   {#116}
[00:08:24] TEACHER: You cannot have an incorrect data in your database because not all use cases need that.   {#117}
[00:08:28] TEACHER: By the way, some use cases do need this.   {#118}
[00:08:30] TEACHER: So where you have to protect the sanity of the data, where you have to protect the correctness   {#119}
[00:08:36] TEACHER: of the data, that's where you have to take locks before you update a particular rule.   {#120}
[00:08:43] TEACHER: As simple as that.   {#121}
[00:08:45] TEACHER: And in some cases, where correctness may not be important, skip it.   {#122}
[00:08:50] TEACHER: It's okay to skip it.   {#123}
[00:08:51] TEACHER: But where the correctness of data is important, you have to ensure that you are taking the   {#124}
[00:08:57] TEACHER: necessary locks that allow you to have your database moving from one consistent state   {#125}
[00:09:02] TEACHER: to or one correct state to another correct state.   {#126}
[00:09:05] TEACHER: Okay.   {#127}
[00:09:08] TEACHER: Whenever you hear pessimistic locking, a very interesting side effect of it that comes out   {#128}
[00:09:13] TEACHER: of the box, that comes unannounced is deadlock.   {#129}
[00:09:17] TEACHER: A classic case where transaction T1 wants a lock on row one.   {#130}
[00:09:23] TEACHER: Row one is locked by transaction T2.   {#131}
[00:09:27] TEACHER: Transaction T2 wants a lock on row 2, but row 2 is acquired by T1.   {#132}
[00:09:34] TEACHER: Now this way, no one moves forward because this is a transactional deadlock.   {#133}
[00:09:40] TEACHER: You would have started in operating system.   {#134}
[00:09:41] TEACHER: That same thing comes over here.   {#135}
[00:09:43] TEACHER: So pessimistic locking is great.   {#136}
[00:09:46] TEACHER: But always know this fact that whenever you add pessimistic locking, you are risking a deadlock.   {#137}
[00:09:54] TEACHER: Always.   {#138}
[00:09:55] TEACHER: Always.   {#139}
[00:09:57] TEACHER: You never know how threads are scheduled.   {#140}
[00:09:58] TEACHER: You never know who is waiting on what.   {#141}
[00:10:01] TEACHER: So whenever you write a code, whenever you write a SQL query, whenever you're taking   {#142}
[00:10:05] TEACHER: logs, be it here, Java, pick your favorite language, wherever.   {#143}
[00:10:10] TEACHER: See a potential case, wherever you're locking something, where you are blocked on something,   {#144}
[00:10:15] TEACHER: always see a case where, Hey, can it lead to a deadlock?   {#145}
[00:10:19] TEACHER: Try to arrange your statements, try to arrange your lock, acquisition and release such that   {#146}
[00:10:27] TEACHER: It can really enter a deadlock or not.   {#147}
[00:10:29] TEACHER: If it does, then ensure that you are protected against it.   {#148}
[00:10:33] TEACHER: Like we will spend some time talking about that as well.   {#149}
[00:10:37] TEACHER: But transactional deadlocks are killers.   {#150}
[00:10:40] TEACHER: They stall your database.   {#151}
[00:10:42] TEACHER: If your database goes into a deadlock state and your database cannot recover   {#152}
[00:10:46] TEACHER: because of which what most databases do and most as in most popular databases,   {#153}
[00:10:52] TEACHER: MySQL Postgres Oracle is they do not let the database enter a deadlock state which means   {#154}
[00:11:01] TEACHER: that let's say if it saw that transaction if it saw the transaction T1 wants a lock on row 1,   {#155}
[00:11:13] TEACHER: row 1 is locked by transaction T2, transaction T2 wants a lock on row 2 and now let's say   {#156}
[00:11:22] TEACHER: Row 2 is now acquired by TransitionT1.   {#157}
[00:11:26] TEACHER: TransitionT1 just fired a statement where it said,   {#158}
[00:11:29] TEACHER: Hey, I want to acquire lock on Row 2.   {#159}
---- OWNED SEGMENTS END ----

CTX| [00:11:34] TEACHER: Whenever your database assigns,   {#160}
CTX| [00:11:37] TEACHER: like locks a row for a particular transaction,   {#161}
CTX| [00:11:40] TEACHER: it runs a deadlock detection algorithm.   {#162}
CTX| [00:11:43] TEACHER: So every time you're locking a particular row,   {#163}
CTX| [00:11:46] TEACHER: your database would run a deadlock detection algorithm.   {#164}
CTX| [00:11:52] TEACHER: out there it would run a deadlock detection algorithm whose job is to see that hey if I   {#165}
CTX| [00:12:00] TEACHER: acquire this if I let this transition even acquire a lock on row 2 would my database go in and go   {#166}
CTX| [00:12:07] TEACHER: into a deadlock deadlock detection is simple whenever you have a cyclic path in it it's a   {#167}
CTX| [00:12:15] TEACHER: deadlock. So here what would happen is as soon as the database would see that if I make transaction   {#168}
CTX| [00:12:23] TEACHER: T1 get lock on row 2 what would happen? My database would go in a deadlock state. I don't   {#169}
CTX| [00:12:30] TEACHER: want that to happen. So whenever such situation comes up and your database detects that in case   {#170}
