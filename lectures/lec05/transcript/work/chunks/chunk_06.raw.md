# chunk_06  OWNS 01:01:25 -> 01:13:43  (segments #890-#1114, 1946 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:00:28] TEACHER: If I run it again, all 120 sets are filled up.   {#878}
CTX| [01:00:32] TEACHER: This is the beauty of this implementation.   {#879}
CTX| [01:00:34] TEACHER: So what is happening behind the scenes?   {#880}
CTX| [01:00:36] TEACHER: Let me walk you through that.   {#881}
CTX| [01:00:36] TEACHER: And this is the most critical part that people skip.   {#882}
CTX| [01:00:40] TEACHER: This is where the magic happens.   {#883}
CTX| [01:00:42] TEACHER: Now, first of all, what we did is we are trying to book a seat order by ID.   {#884}
CTX| [01:00:48] TEACHER: so here you can very clearly see how seats are getting booked 1c 1d 1e 1f 2a 2b 2c 2d 2f all   {#885}
CTX| [01:00:59] TEACHER: are in order hold true right so users are coming they're taking an exclusive lock and while that   {#886}
CTX| [01:01:07] TEACHER: exclusive lock is taken other transactions wait once this exclusive lock is released   {#887}
CTX| [01:01:12] TEACHER: but then most of you thought that they are all and it's very natural to think that way   {#888}
CTX| [01:01:20] TEACHER: and which is where I would tell you how database actually do that.   {#889}

---- OWNED SEGMENTS START ----
[01:01:25] TEACHER: So a lot of you thought that let's say there are 120 seats, 120 transactions came in,   {#890}
[01:01:32] TEACHER: they all fired the query, the same query hypothetically let's say that exact same time   {#891}
[01:01:37] TEACHER: They came to it like the database, all one-minute transactions are active at the very same time.   {#892}
[01:01:44] TEACHER: They are all fired the same query.   {#893}
[01:01:46] TEACHER: They all got first row, but they didn't actually get the first row.   {#894}
[01:01:53] TEACHER: Database is not returning the first row unless they get it.   {#895}
[01:01:57] TEACHER: So transaction does not have a lock on that row anyway.   {#896}
[01:02:00] TEACHER: But when transaction fired this query, they saw or rather the database engine saw that the rows on which they are trying to iterate.   {#897}
[01:02:10] TEACHER: Because what we did is we are just iterating on this.   {#898}
[01:02:14] TEACHER: The row on which they are trying to iterate is locked by someone.   {#899}
[01:02:18] TEACHER: So other transaction waits.   {#900}
[01:02:21] TEACHER: When the lock, when the first transaction commits, in our case commits, I'm not going to about state.   {#901}
[01:02:26] TEACHER: but when the first transaction commits,   {#902}
[01:02:29] TEACHER: the other transactions waiting on it are signaled   {#903}
[01:02:32] TEACHER: to re-execute and re-evaluate the query.   {#904}
[01:02:37] TEACHER: So what happens?   {#905}
[01:02:38] TEACHER: First transaction came, it acquired the log,   {#906}
[01:02:41] TEACHER: other transactions were waiting,   {#907}
[01:02:43] TEACHER: first transaction committed,   {#908}
[01:02:46] TEACHER: other transactions would re-evaluate the query.   {#909}
[01:02:49] TEACHER: So which means this query will be re-evaluated.   {#910}
[01:02:52] TEACHER: It does not mean you have to re-fire the query.   {#911}
[01:02:56] TEACHER: When a transaction gets signal, it re-evaluates the query and tries to acquire.   {#912}
[01:03:03] TEACHER: In that case, because first transaction committed, now the second transaction that runs would   {#913}
[01:03:11] TEACHER: see the second row because it just fires the same statement again.   {#914}
[01:03:15] TEACHER: It just re-evaluates the same statement.   {#915}
[01:03:16] TEACHER: it. This way it would not mean user one gets row one, user two gets row two, user three gets row   {#916}
[01:03:26] TEACHER: three. Here you can see in the assignment the way seats are assigned you would not see in the exact   {#917}
[01:03:33] TEACHER: same order. This is why I love databases so much. See 1A user ID one was Maria Harmon. Here some   {#918}
[01:03:43] TEACHER: how well Daniel 4 got it.   {#919}
[01:03:46] TEACHER: Second was Jamaica something.   {#920}
[01:03:48] TEACHER: Here you have is this somewhere Barkas get it.   {#921}
[01:03:51] TEACHER: So it's not that user 1 is getting seat 1,   {#922}
[01:03:53] TEACHER: user 2 is getting seat 2.   {#923}
[01:03:55] TEACHER: It's that whichever transaction got scheduled first is getting it.   {#924}
[01:04:00] TEACHER: So here the transaction that was run by this particular user   {#925}
[01:04:03] TEACHER: got scheduled and so on and so forth.   {#926}
[01:04:06] TEACHER: Now here one key thing that you should know   {#927}
[01:04:09] TEACHER: is what is happening behind the scene   {#928}
[01:04:11] TEACHER: is that first transaction came in,   {#929}
[01:04:15] TEACHER: it acquired the lock,   {#930}
[01:04:16] TEACHER: other transactions were waiting.   {#931}
[01:04:19] TEACHER: When first transaction committed or aborted,   {#932}
[01:04:21] TEACHER: other transactions are signaled by the operating system   {#933}
[01:04:25] TEACHER: to move on or rather database engine to move on.   {#934}
[01:04:27] TEACHER: They would re-evaluate the query.   {#935}
[01:04:30] TEACHER: And when they do it, now they see second row.   {#936}
[01:04:33] TEACHER: Then when second transaction,   {#937}
[01:04:35] TEACHER: then one of those 119 transactions acquires the lock on this,   {#938}
[01:04:41] TEACHER: Then they are signal when this commits, they are signal third seed, fourth seed, fifth   {#939}
[01:04:46] TEACHER: seed, sixth seed and so on and so forth.   {#940}
[01:04:49] TEACHER: This is why you see it's so painful for the database to do this much of operation.   {#941}
[01:04:55] TEACHER: But we are still guaranteeing the correctness of the system.   {#942}
[01:05:00] TEACHER: Right?   {#943}
[01:05:01] TEACHER: Okay.   {#944}
[01:05:01] TEACHER: Now let me move to the fifth approach.   {#945}
[01:05:03] TEACHER: I need to take your question.   {#946}
[01:05:05] TEACHER: Wait, I'll take your question.   {#947}
[01:05:06] TEACHER: Now let's move to the fifth approach where we clearly see why our database has to unnecessarily   {#948}
[01:05:16] TEACHER: wait on it because we clearly see when a transaction is locking a particular row, it's okay for   {#949}
[01:05:23] TEACHER: us to move on.   {#950}
[01:05:27] TEACHER: So which is where the only two word change I'll do at the end, I'll just add skip lock.   {#951}
[01:05:32] TEACHER: Everything else remains the same.   {#952}
[01:05:36] TEACHER: Now what would happen?   {#953}
[01:05:38] STUDENT_8: Will all 120 seats get filled?   {#954}
[01:05:41] STUDENT_8: Yes, no.   {#955}
[01:05:42] STUDENT_8: Anamol?   {#956}
[01:05:46] STUDENT_6: Yes, it would get filled.   {#957}
[01:05:48] STUDENT_6: Only the busy waiting that were happening last time.   {#958}
[01:05:52] STUDENT_6: That's a great word.   {#959}
[01:05:53] TEACHER: Busy waiting time.   {#960}
[01:05:54] TEACHER: So now what would we get out of this?   {#961}
[01:05:57] TEACHER: What advantage would we get?   {#962}
[01:05:59] STUDENT_6: The time of the execution of the transaction would be less.   {#963}
[01:06:04] TEACHER: The total execution time would be less.   {#964}
[01:06:06] TEACHER: Yeah.   {#965}
[01:06:07] TEACHER: Okay.   {#966}
[01:06:07] TEACHER: So now let's see that in action.   {#967}
[01:06:09] TEACHER: So the approach for when we ran, it took 1.7 seconds to do it.   {#968}
[01:06:13] TEACHER: Now let me run approach five.   {#969}
[01:06:16] TEACHER: I have everything same.   {#970}
[01:06:18] TEACHER: I just added skip log at the end.   {#971}
[01:06:20] TEACHER: And if I run it approach five, it just completed in 147 milliseconds.   {#972}
[01:06:27] TEACHER: One 10th of the time and still got all 126 filled.   {#973}
[01:06:32] TEACHER: This is why skip log.   {#974}
[01:06:36] TEACHER: So this still, we are still taking exclusive lock.   {#975}
[01:06:39] TEACHER: Now here, when we are doing skip lock,   {#976}
[01:06:41] TEACHER: now what is happening behind the scenes at the database side is   {#977}
[01:06:45] TEACHER: first transaction came in, took exclusive lock.   {#978}
[01:06:48] TEACHER: Second transaction came in, fired the query,   {#979}
[01:06:51] TEACHER: saw this row is locked because we passed in skip lock.   {#980}
[01:06:54] TEACHER: It quickly revalued or rather database engine quickly revaluated,   {#981}
[01:06:59] TEACHER: saw this row is locked.   {#982}
[01:07:00] TEACHER: It saw other rows that matches my where clause.   {#983}
[01:07:03] TEACHER: It found the next row.   {#984}
[01:07:06] TEACHER: log to the second transaction then the third person then the fourth person none of the other   {#985}
[01:07:10] TEACHER: transaction wait for the first one to complete and the rows were continuously logged by other   {#986}
[01:07:14] TEACHER: transactions right so this way your database maximized on the performance and this is why   {#987}
[01:07:23] TEACHER: you need to know database login you just made your system 10x faster just by adding skip log   {#988}
[01:07:29] TEACHER: as simple as that this is why you need to know how your database actually do things because when   {#989}
[01:07:36] TEACHER: Relational databases don't scale.   {#990}
[01:07:37] TEACHER: They don't know the real power of relational databases.   {#991}
[01:07:40] TEACHER: Trust me on that.   {#992}
[01:07:41] TEACHER: Relational databases scale beautifully well.   {#993}
[01:07:44] TEACHER: They cannot handle big data.   {#994}
[01:07:45] TEACHER: I agree to that.   {#995}
[01:07:47] TEACHER: But scaling, handling high QPS, relational databases are champ at that.   {#996}
[01:07:51] TEACHER: You just need to know the performance tuning.   {#997}
[01:07:55] TEACHER: And this is not even very nitty-gritty performance tuning.   {#998}
[01:07:57] TEACHER: It's just normal SQL query constructs that you need to know.   {#999}
[01:08:02] TEACHER: This is the best part of it.   {#1000}
[01:08:06] TEACHER: This is why and now here we saw from approach zero to approach five,   {#1001}
[01:08:10] TEACHER: how we evolved our system just by adding two, three words here and there   {#1002}
[01:08:13] TEACHER: and we were getting all we needed.   {#1003}
[01:08:16] TEACHER: Like first we ensure the correct test.   {#1004}
[01:08:18] TEACHER: First we ensure that system fails.   {#1005}
[01:08:20] TEACHER: Then we ensure the correctness in the explosive lock.   {#1006}
[01:08:21] TEACHER: Then we added skip lock to get the performance.   {#1007}
[01:08:24] TEACHER: Okay.   {#1008}
[01:08:25] TEACHER: One thing that I want to talk about over here is there is a phrase   {#1009}
[01:08:33] TEACHER: that I use very often.   {#1010}
[01:08:36] TEACHER: Remember it for the rest of your life.   {#1011}
[01:08:39] TEACHER: Fixed inventory plus contention equal to locking.   {#1012}
[01:08:43] TEACHER: Here you see fixed inventory.   {#1013}
[01:08:46] TEACHER: 120 seats.   {#1014}
[01:08:48] TEACHER: Contention.   {#1015}
[01:08:49] TEACHER: 120 people trying to book 120 seats.   {#1016}
[01:08:53] TEACHER: Locking.   {#1017}
[01:08:54] TEACHER: You have to take locks to ensure the correctness of your system.   {#1018}
[01:08:58] TEACHER: Always.   {#1019}
[01:08:59] TEACHER: You imagine any system in the world where there is fixed inventory.   {#1020}
[01:09:03] TEACHER: There is contention happening for that.   {#1021}
[01:09:06] TEACHER: you would apply locking to do that.   {#1022}
[01:09:07] TEACHER: For example, I'll give you examples.   {#1023}
[01:09:09] TEACHER: First example, COVID portal.   {#1024}
[01:09:11] TEACHER: Remember COVID-19, in the year 2020,   {#1025}
[01:09:15] TEACHER: when in India, a government launched a portal,   {#1026}
[01:09:17] TEACHER: COVID portal, in which we booked appointments at hospitals.   {#1027}
[01:09:22] TEACHER: Every hospital had limited seating.   {#1028}
[01:09:25] TEACHER: We all, when the slots opened up,   {#1029}
[01:09:28] TEACHER: we all jumped onto the platform at that exact same moment,   {#1030}
[01:09:31] TEACHER: trying to book that seat.   {#1031}
[01:09:32] TEACHER: Because there were limited seats,   {#1032}
[01:09:34] TEACHER: let's say 100 seats on that hospital,   {#1033}
[01:09:36] TEACHER: people got that particular slot. Fixed inventory, contention, how would they have implemented?   {#1034}
[01:09:42] TEACHER: Locking. May not be pessimistic, may be optimistic, may be atomic instructions but the idea was to do   {#1035}
[01:09:47] TEACHER: that. So if you are building COVID portal on relational database, you would do something like   {#1036}
[01:09:51] TEACHER: this. Exactly like this rather. Right? Second example, IRCTC which is train booking system of   {#1037}
[01:09:59] TEACHER: internet government. Now what would happen? People are coming, a lot of people trying to book the   {#1038}
[01:10:04] TEACHER: same like book the seat at the same train this is how you ensure high throughput if they would   {#1039}
[01:10:10] TEACHER: not have taken skip log entire throughput would be stored on there then their code base would be   {#1040}
[01:10:15] TEACHER: filled with skip locks right and exclusive locks obviously then book my show movie ticketing system   {#1041}
[01:10:23] TEACHER: you have limited sitting area in a movie screen you are all trying to book that same thing   {#1042}
[01:10:30] TEACHER: exclusive lock one who gets it moves it forward otherwise people wait for the transaction to   {#1043}
[01:10:36] TEACHER: complete and then other one jumps in right wherever you see fixed inventory you see contention the   {#1044}
[01:10:43] TEACHER: first thing that should come to your mind is a locking fixed inventory contention locking and   {#1045}
[01:10:48] TEACHER: more importantly flash sale flash sale is very similar to this when we discuss flash sale you'll   {#1046}
[01:10:53] TEACHER: see this in action you'll see how beautifully flash sale is designed by this right okay this is   {#1047}
[01:11:00] TEACHER: this now let me take some questions and then we go on a break uh yeah so there are two questions   {#1048}
[01:11:08] STUDENT_2: first question is so how this locking is getting implemented or executed deep in the disk level   {#1049}
[01:11:17] STUDENT_2: so obviously every data is stored in the desk in some format like okay there will be some offset   {#1050}
[01:11:24] STUDENT_2: Okay. From a row is stored in some portion of the day.   {#1051}
[01:11:28] STUDENT_2: Yeah.   {#1052}
[01:11:28] STUDENT_2: So how OS and disk is handling this locking thing over there.   {#1053}
[01:11:32] TEACHER: It's not happening at desk level.   {#1054}
[01:11:34] TEACHER: Not at all.   {#1055}
[01:11:35] TEACHER: It's happening at the engine level CPU side.   {#1056}
[01:11:38] TEACHER: So your mutex does not let it move forward as simple as that.   {#1057}
[01:11:44] STUDENT_2: Okay.   {#1058}
[01:11:44] STUDENT_2: So it is implemented using the mutex.   {#1059}
[01:11:47] TEACHER: Yeah.   {#1060}
[01:11:48] TEACHER: Everything.   {#1061}
[01:11:48] TEACHER: Okay.   {#1062}
[01:11:49] TEACHER: See at that mutex or CMA purse are the only two constructs that you have.   {#1063}
[01:11:54] TEACHER: implemented, it has to be implemented by that.   {#1064}
[01:11:57] TEACHER: There is no third way to do it.   {#1065}
[01:11:58] TEACHER: Mutex, the semaphores, in some cases, monitors as well.   {#1066}
[01:12:02] TEACHER: But apart from these three constructs, there is nothing else.   {#1067}
[01:12:05] TEACHER: You have to have this.   {#1068}
[01:12:07] TEACHER: Otherwise, you go for atomic instructions.   {#1069}
[01:12:10] STUDENT_2: Okay.   {#1070}
[01:12:12] STUDENT_2: And my second question is, let's say if we want this thing to be locked for, let's say,   {#1071}
[01:12:19] STUDENT_2: 10 minutes of duration.   {#1072}
[01:12:20] STUDENT_2: You would never want to do that.   {#1073}
[01:12:21] TEACHER: Why?   {#1074}
[01:12:22] STUDENT_2: No, no, no.   {#1075}
[01:12:24] STUDENT_2: Maybe I chose the wrong words to say.   {#1076}
[01:12:26] STUDENT_2: So you go to this flight booking place   {#1077}
[01:12:31] STUDENT_2: and then you try to book a seat   {#1078}
[01:12:32] STUDENT_2: and then you proceed with the payment part, right?   {#1079}
[01:12:35] TEACHER: No, it's different.   {#1080}
[01:12:36] TEACHER: It's not SQL locking.   {#1081}
[01:12:38] TEACHER: It's not implemented.   {#1082}
[01:12:39] TEACHER: Your database transaction does not go for that one.   {#1083}
[01:12:42] TEACHER: It's different.   {#1084}
[01:12:42] TEACHER: Yes, yes.   {#1085}
[01:12:44] STUDENT_2: Yeah, so but how are we looking into it?   {#1086}
[01:12:49] TEACHER: Let's discuss it with Plastil.   {#1087}
[01:12:50] TEACHER: When we design Plastil.   {#1088}
[01:12:51] STUDENT_16: Okay, okay, okay.   {#1089}
[01:12:52] TEACHER: So seventh week, Sunday.   {#1090}
[01:12:54] TEACHER: because there it would be very clear.   {#1091}
[01:12:56] TEACHER: And because before that also I have to cover   {#1092}
[01:12:58] TEACHER: three different concepts for us to build classes.   {#1093}
[01:13:00] TEACHER: So all of that would come in third week,   {#1094}
[01:13:03] TEACHER: fifth week and sixth week.   {#1095}
[01:13:05] TEACHER: We'll talk about that.   {#1096}
[01:13:06] TEACHER: Okay.   {#1097}
[01:13:08] TEACHER: But those are very different systems.   {#1098}
[01:13:10] TEACHER: This is SQL level constructs.   {#1099}
[01:13:12] TEACHER: Those where you are, and that's actually,   {#1100}
[01:13:14] TEACHER: you say it's locked, but it's not locked.   {#1101}
[01:13:17] TEACHER: It's on hold.   {#1102}
[01:13:18] TEACHER: So hold is the better word to do to talk about it   {#1103}
[01:13:21] TEACHER: because when you hear lock,   {#1104}
[01:13:24] TEACHER: My SQL is blocking it.   {#1105}
[01:13:26] TEACHER: It's not SQL, it's just kept on hold and that's a better word to model it.   {#1106}
[01:13:31] STUDENT_2: Okay.   {#1107}
[01:13:32] TEACHER: Okay.   {#1108}
[01:13:32] TEACHER: Yeah.   {#1109}
[01:13:33] TEACHER: Yeah.   {#1110}
[01:13:33] TEACHER: Thank you.   {#1111}
[01:13:34] TEACHER: Uh, I'm just picking few people at random because I would just want to be fair to   {#1112}
[01:13:38] TEACHER: people who have not spoken before.   {#1113}
[01:13:40] TEACHER: Uh, yes, Chandan.   {#1114}
---- OWNED SEGMENTS END ----

CTX| [01:13:43] STUDENT_2: Hey, hi.   {#1115}
CTX| [01:13:45] STUDENT_2: My question was like, uh, here when we select trip ID equals one and user ID is   {#1116}
CTX| [01:13:51] STUDENT_2: null there we skip lock means if the user is not choosing a seat right rather we are letting   {#1117}
CTX| [01:14:00] STUDENT_2: right what in book my show or airline system right we choose which seat is there so there   {#1118}
CTX| [01:14:09] STUDENT_2: we cannot afford to give them other any other seat which he or she has not chosen right in that case   {#1119}
CTX| [01:14:18] STUDENT_2: would we afford to have skip logged or not?   {#1120}
CTX| [01:14:21] TEACHER: No, we would not have skip logged.   {#1121}
CTX| [01:14:23] TEACHER: We would have just this.   {#1122}
CTX| [01:14:24] STUDENT_2: So for update also, right?   {#1123}
CTX| [01:14:26] STUDENT_2: It will wait and re-evaluate for that seat, right?   {#1124}
CTX| [01:14:30] STUDENT_2: Correct.   {#1125}
CTX| [01:14:30] STUDENT_2: And it will try to get another seat.   {#1126}
CTX| [01:14:33] TEACHER: No, why would it get another seat?   {#1127}
CTX| [01:14:35] TEACHER: Your SQL query does not allow you to do that.   {#1128}
CTX| [01:14:36] STUDENT_2: Yeah, yeah, yeah.   {#1129}
CTX| [01:14:38] STUDENT_2: When we write ID equals to 67,   {#1130}
CTX| [01:14:40] STUDENT_2: it will never get the same.   {#1131}
CTX| [01:14:42] STUDENT_2: Correct.   {#1132}
CTX| [01:14:42] STUDENT_2: So it will fail for error.   {#1133}
