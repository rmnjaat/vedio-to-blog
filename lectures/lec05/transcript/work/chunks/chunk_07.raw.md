# chunk_07  OWNS 01:13:43 -> 01:26:19  (segments #1115-#1374, 2237 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:12:44] STUDENT_2: Yeah, so but how are we looking into it?   {#1086}
CTX| [01:12:49] TEACHER: Let's discuss it with Plastil.   {#1087}
CTX| [01:12:50] TEACHER: When we design Plastil.   {#1088}
CTX| [01:12:51] STUDENT_16: Okay, okay, okay.   {#1089}
CTX| [01:12:52] TEACHER: So seventh week, Sunday.   {#1090}
CTX| [01:12:54] TEACHER: because there it would be very clear.   {#1091}
CTX| [01:12:56] TEACHER: And because before that also I have to cover   {#1092}
CTX| [01:12:58] TEACHER: three different concepts for us to build classes.   {#1093}
CTX| [01:13:00] TEACHER: So all of that would come in third week,   {#1094}
CTX| [01:13:03] TEACHER: fifth week and sixth week.   {#1095}
CTX| [01:13:05] TEACHER: We'll talk about that.   {#1096}
CTX| [01:13:06] TEACHER: Okay.   {#1097}
CTX| [01:13:08] TEACHER: But those are very different systems.   {#1098}
CTX| [01:13:10] TEACHER: This is SQL level constructs.   {#1099}
CTX| [01:13:12] TEACHER: Those where you are, and that's actually,   {#1100}
CTX| [01:13:14] TEACHER: you say it's locked, but it's not locked.   {#1101}
CTX| [01:13:17] TEACHER: It's on hold.   {#1102}
CTX| [01:13:18] TEACHER: So hold is the better word to do to talk about it   {#1103}
CTX| [01:13:21] TEACHER: because when you hear lock,   {#1104}
CTX| [01:13:24] TEACHER: My SQL is blocking it.   {#1105}
CTX| [01:13:26] TEACHER: It's not SQL, it's just kept on hold and that's a better word to model it.   {#1106}
CTX| [01:13:31] STUDENT_2: Okay.   {#1107}
CTX| [01:13:32] TEACHER: Okay.   {#1108}
CTX| [01:13:32] TEACHER: Yeah.   {#1109}
CTX| [01:13:33] TEACHER: Yeah.   {#1110}
CTX| [01:13:33] TEACHER: Thank you.   {#1111}
CTX| [01:13:34] TEACHER: Uh, I'm just picking few people at random because I would just want to be fair to   {#1112}
CTX| [01:13:38] TEACHER: people who have not spoken before.   {#1113}
CTX| [01:13:40] TEACHER: Uh, yes, Chandan.   {#1114}

---- OWNED SEGMENTS START ----
[01:13:43] STUDENT_2: Hey, hi.   {#1115}
[01:13:45] STUDENT_2: My question was like, uh, here when we select trip ID equals one and user ID is   {#1116}
[01:13:51] STUDENT_2: null there we skip lock means if the user is not choosing a seat right rather we are letting   {#1117}
[01:14:00] STUDENT_2: right what in book my show or airline system right we choose which seat is there so there   {#1118}
[01:14:09] STUDENT_2: we cannot afford to give them other any other seat which he or she has not chosen right in that case   {#1119}
[01:14:18] STUDENT_2: would we afford to have skip logged or not?   {#1120}
[01:14:21] TEACHER: No, we would not have skip logged.   {#1121}
[01:14:23] TEACHER: We would have just this.   {#1122}
[01:14:24] STUDENT_2: So for update also, right?   {#1123}
[01:14:26] STUDENT_2: It will wait and re-evaluate for that seat, right?   {#1124}
[01:14:30] STUDENT_2: Correct.   {#1125}
[01:14:30] STUDENT_2: And it will try to get another seat.   {#1126}
[01:14:33] TEACHER: No, why would it get another seat?   {#1127}
[01:14:35] TEACHER: Your SQL query does not allow you to do that.   {#1128}
[01:14:36] STUDENT_2: Yeah, yeah, yeah.   {#1129}
[01:14:38] STUDENT_2: When we write ID equals to 67,   {#1130}
[01:14:40] STUDENT_2: it will never get the same.   {#1131}
[01:14:42] STUDENT_2: Correct.   {#1132}
[01:14:42] STUDENT_2: So it will fail for error.   {#1133}
[01:14:45] STUDENT_2: Exactly.   {#1134}
[01:14:45] STUDENT_2: Error will come for them.   {#1135}
[01:14:47] STUDENT_2: Exactly.   {#1136}
[01:14:48] TEACHER: It would say no row found over here.   {#1137}
[01:14:51] TEACHER: Basically no rows matched.   {#1138}
[01:14:53] STUDENT_2: Yeah.   {#1139}
[01:14:53] STUDENT_2: This is what I.   {#1140}
[01:14:54] STUDENT_2: Yeah.   {#1141}
[01:14:55] TEACHER: Thanks for asking.   {#1142}
[01:14:56] TEACHER: We got it covered.   {#1143}
[01:14:58] TEACHER: Thanks because of that.   {#1144}
[01:14:59] TEACHER: But yeah, when you are booking a pointed,   {#1145}
[01:15:02] TEACHER: like when you're locking a pointed thing,   {#1146}
[01:15:04] TEACHER: like in this case,   {#1147}
[01:15:05] TEACHER: when you are there to like,   {#1148}
[01:15:07] TEACHER: let's say you're building book my show   {#1149}
[01:15:08] TEACHER: or ticket booking or anything like that,   {#1150}
[01:15:10] TEACHER: when you are allowed to granularly pick your favorite seed   {#1151}
[01:15:14] TEACHER: and you pick that particular set in your triangle,   {#1152}
[01:15:18] TEACHER: update and then you would update it two transaction cannot take that same seed there so they would so   {#1153}
[01:15:25] TEACHER: one would succeed other would see no rose found or it would wait and then you would find no rose match   {#1154}
[01:15:29] TEACHER: and you would print on the front end uh seeds gone right and this is how you would do it but   {#1155}
[01:15:35] TEACHER: everything else remains the same right thanks for asking that yes aditi yeah so when we are using   {#1156}
[01:15:44] STUDENT_6: four share suppose there are two transactions and first first transaction has taken the lock   {#1157}
[01:15:50] STUDENT_6: the four share one so when the second transaction it reads the row but and meanwhile the first   {#1158}
[01:15:57] STUDENT_6: transaction after that it updates that rows so then how won't it affect the second transaction   {#1159}
[01:16:02] TEACHER: when it I would highly recommend you to code it out it's very easy to code it out I would highly   {#1160}
[01:16:07] TEACHER: recommend you to code it out and see the behavior because what would happen is something really   {#1161}
[01:16:14] TEACHER: because if I go into those details, I would have to write, draw that entire   {#1162}
[01:16:19] TEACHER: chart on how that log would go on.   {#1163}
[01:16:21] TEACHER: It would take up another half an hour, right?   {#1164}
[01:16:23] TEACHER: Okay.   {#1165}
[01:16:23] TEACHER: More than happy to discuss, but I would want you to, you know,   {#1166}
[01:16:26] TEACHER: code it out once.   {#1167}
[01:16:27] TEACHER: It's very easy to mimic it.   {#1168}
[01:16:28] TEACHER: You don't have to even write the code for that.   {#1169}
[01:16:30] TEACHER: Just start to like, just connect, like just start a MySQL server on two   {#1170}
[01:16:36] TEACHER: different terminals connected on the same server and then set auto commit   {#1171}
[01:16:44] TEACHER: or set auto commit to zero.   {#1172}
[01:16:46] TEACHER: So that, and then you typically start transaction.   {#1173}
[01:16:48] TEACHER: You typically basically begin transaction, begin transaction, then write your code   {#1174}
[01:16:51] TEACHER: and then end transaction, end transaction.   {#1175}
[01:16:52] TEACHER: While you are acquiring those shared lock and exclusive lock, you see how your   {#1176}
[01:16:56] TEACHER: database reacts to that because it's very interesting.   {#1177}
[01:16:59] TEACHER: What would happen when you fire it, it would halt at one place and move at other.   {#1178}
[01:17:04] TEACHER: But yeah, you'll, you'll basically get it.   {#1179}
[01:17:06] TEACHER: Right.   {#1180}
[01:17:07] TEACHER: And it is going to be because that's where you would also discover deadlocks.   {#1181}
[01:17:11] TEACHER: Your code would fail.   {#1182}
[01:17:12] TEACHER: A lot of, a lot of funny things would happen.   {#1183}
[01:17:15] TEACHER: Right.   {#1184}
[01:17:16] TEACHER: Do that, right.   {#1185}
[01:17:16] TEACHER: More than happy to answer it.   {#1186}
[01:17:18] TEACHER: Okay.   {#1187}
[01:17:20] STUDENT_20: Thanks.   {#1188}
[01:17:21] STUDENT_9: Okay.   {#1189}
[01:17:22] STUDENT_9: Yeah, Rajiv.   {#1190}
[01:17:24] STUDENT_9: Arpit, regarding this skip lock thing, the question that came to my mind is this, whether   {#1191}
[01:17:31] STUDENT_9: let's say you, the first row was, I mean, was locked by a transaction.   {#1192}
[01:17:38] STUDENT_9: second transition came in at saw the second one is free and then bypass skip block it took it   {#1193}
[01:17:44] STUDENT_9: but somehow that second version failed right about it right now this third transition which   {#1194}
[01:17:50] STUDENT_9: is coming in sequentially at the same time let's say now would database engine give him this because   {#1195}
[01:17:55] STUDENT_9: transition obviously was in some place so it actually skipped for the third row right because   {#1196}
[01:18:00] STUDENT_9: everything is happening parallely but would for some reason that the seat number two would be   {#1197}
[01:18:04] TEACHER: reused somewhere because your queries, what the trip ID is one and user ID is null order   {#1198}
[01:18:10] TEACHER: by ID.   {#1199}
[01:18:11] STUDENT_9: So, so it will be re-evaluated.   {#1200}
[01:18:13] STUDENT_9: Okay.   {#1201}
[01:18:13] TEACHER: Second transaction.   {#1202}
[01:18:14] TEACHER: No, when the second transaction failed, when the next read would happen by some other transaction,   {#1203}
[01:18:18] TEACHER: it would get a second row because that would match this, right?   {#1204}
[01:18:23] TEACHER: That would match this.   {#1205}
[01:18:24] STUDENT_9: All right.   {#1206}
[01:18:25] STUDENT_9: But, but if the third transaction came in the same time at transition to, right?   {#1207}
[01:18:29] TEACHER: It's not that first transaction is getting first row.   {#1208}
[01:18:31] TEACHER: Second transaction is getting second row.   {#1209}
[01:18:32] TEACHER: It's not like that.   {#1210}
[01:18:34] TEACHER: It's when you're adding the failure scenarios, whichever transaction executed it would get this.   {#1211}
[01:18:43] TEACHER: So for example, when one of the row locked row, when a transaction, when some transactions   {#1212}
[01:18:48] TEACHER: were waiting on a particular row that was locked, it failed.   {#1213}
[01:18:53] TEACHER: When any of the transactions that revaluates that would get that row again.   {#1214}
[01:18:58] STUDENT_9: Right, right.   {#1215}
[01:18:58] STUDENT_9: Yes.   {#1216}
[01:18:58] TEACHER: Right.   {#1217}
[01:18:59] TEACHER: Even if you do skip log, let's say a bunch of them were added.   {#1218}
[01:19:04] TEACHER: it re-evaluated statement now it would get the first row because we are ordering by id even if   {#1219}
[01:19:09] TEACHER: we would not have done it it would match some rows there right it's not that a draw would be skipped   {#1220}
[01:19:13] STUDENT_9: all together right okay because sql right yeah i thought that everything is evaluated for the   {#1221}
[01:19:22] TEACHER: first time and then they just no no no no no no no no no no which is exactly why it's the evaluation   {#1222}
[01:19:27] TEACHER: is retrickered when a block transaction gets a signal it's retrickered if you go through my   {#1223}
[01:19:34] TEACHER: sql's code base you will find these exact words which is why i'm using those terms signals and   {#1224}
[01:19:39] TEACHER: all you will find those exact terms when you go through my sql source code it's very easy c cc++   {#1225}
[01:19:43] TEACHER: code just go through that it might feel overwhelmed at first but go through that and for me i built   {#1226}
[01:19:50] TEACHER: this understanding because i went through the code i exactly know how transactions are implemented   {#1227}
[01:19:54] TEACHER: and why they are implemented a certain way, how that would behave and why it is not a   {#1228}
[01:19:58] TEACHER: disk level, all of those things.   {#1229}
[01:20:00] TEACHER: Hardly one week, dedicate one week of your time into going through MySQL source code.   {#1230}
[01:20:04] TEACHER: You'll not regret it at all, at all.   {#1231}
[01:20:07] TEACHER: Because you'll have very deep understanding of how database analysis works and   {#1232}
[01:20:11] TEACHER: TrustMeet has helped me build much performance systems.   {#1233}
[01:20:14] TEACHER: I've scaled SQL systems massively because of this and performance tuning.   {#1234}
[01:20:19] TEACHER: Do that correct.   {#1235}
[01:20:20] TEACHER: Do that correct.   {#1236}
[01:20:22] STUDENT_9: and you would refer   {#1237}
[01:20:24] STUDENT_9: mysql documentation right   {#1238}
[01:20:25] TEACHER: official documentation always rules   {#1239}
[01:20:27] TEACHER: why would any youtuber create video on that   {#1240}
[01:20:29] TEACHER: excellent no one would   {#1241}
[01:20:31] TEACHER: do it right no one would do it   {#1242}
[01:20:33] TEACHER: that's it you'd never find   {#1243}
[01:20:35] TEACHER: you'd always find a ton of content   {#1244}
[01:20:37] TEACHER: on mediocre stuff not on advanced stuff   {#1245}
[01:20:39] TEACHER: because no one wants to read that   {#1246}
[01:20:41] STUDENT_13: thank you   {#1247}
[01:20:43] TEACHER: yeah   {#1248}
[01:20:44] TEACHER: we'll take questions till 10.25 we have 5 more   {#1249}
[01:20:47] TEACHER: minutes then because then we'll go on a break   {#1250}
[01:20:52] STUDENT_2: Yeah, so when we write this skip log, right?   {#1251}
[01:20:56] STUDENT_2: I mean the approach five.   {#1252}
[01:20:57] STUDENT_2: So a total, total number of times this query will be executed.   {#1253}
[01:21:01] STUDENT_2: We'll be 120, right?   {#1254}
[01:21:03] STUDENT_2: Across all the threads.   {#1255}
[01:21:04] STUDENT_8: No, much more than that.   {#1256}
[01:21:06] STUDENT_8: But yeah.   {#1257}
[01:21:06] STUDENT_2: Uh, yeah.   {#1258}
[01:21:09] TEACHER: So I was good.   {#1259}
[01:21:10] TEACHER: Oh no, no, no.   {#1260}
[01:21:11] TEACHER: Watch out on approach five.   {#1261}
[01:21:11] TEACHER: When you're doing skip log.   {#1262}
[01:21:12] TEACHER: Yeah.   {#1263}
[01:21:13] TEACHER: It will be 120 days.   {#1264}
[01:21:14] STUDENT_2: Right.   {#1265}
[01:21:15] STUDENT_2: And when we don't write skip log, when we just write for a bit,   {#1266}
[01:21:19] STUDENT_2: we don't know how we're evaluating.   {#1267}
[01:21:21] TEACHER: Locking revaluating worst cases, any to it plus one by two.   {#1268}
[01:21:26] TEACHER: And into any plus one by two is waiting for the other one.   {#1269}
[01:21:30] TEACHER: So all of them would be revaluating.   {#1270}
[01:21:32] TEACHER: Then one would succeed.   {#1271}
[01:21:33] TEACHER: Then all of them would be evaluated.   {#1272}
[01:21:34] TEACHER: That one would succeed.   {#1273}
[01:21:35] TEACHER: Then all of them would be revaluating.   {#1274}
[01:21:36] TEACHER: The one would succeed.   {#1275}
[01:21:37] TEACHER: So N plus N minus one plus N minus two plus N minus three plus N minus four equal to N   {#1276}
[01:21:41] TEACHER: into n plus one by two.   {#1277}
[01:21:42] STUDENT_2: Got it.   {#1278}
[01:21:43] STUDENT_2: Got it.   {#1279}
[01:21:43] STUDENT_2: Yeah.   {#1280}
[01:21:44] STUDENT_2: Thanks.   {#1281}
[01:21:48] STUDENT_1: So my question.   {#1282}
[01:21:49] STUDENT_1: Hello.   {#1283}
[01:21:51] STUDENT_1: So my question is basically, uh, this queuing, uh, queuing behavior of like queries.   {#1284}
[01:21:57] STUDENT_1: Is it happen in every, uh, is this happens in every case?   {#1285}
[01:22:02] STUDENT_1: Let's just say we remove, select read query and we just, uh, do this query with the,   {#1286}
[01:22:09] STUDENT_1: remove skip logged.   {#1287}
[01:22:10] STUDENT_1: Also, we do this query with update.   {#1288}
[01:22:14] STUDENT_1: Okay.   {#1289}
[01:22:15] STUDENT_1: So like, uh, will the transactions will get.   {#1290}
[01:22:20] TEACHER: Isolation level kicks in.   {#1291}
[01:22:22] STUDENT_1: So,   {#1292}
[01:22:23] STUDENT_1: it will get canceled.   {#1293}
[01:22:25] TEACHER: No,   {#1294}
[01:22:26] TEACHER: isolation level,   {#1295}
[01:22:26] TEACHER: whatever the isolation level says,   {#1296}
[01:22:28] TEACHER: that thing,   {#1297}
[01:22:29] TEACHER: your transition would do.   {#1298}
[01:22:32] STUDENT_1: Okay.   {#1299}
[01:22:32] STUDENT_1: So like,   {#1300}
[01:22:33] STUDENT_1: so it can go both ways.   {#1301}
[01:22:35] STUDENT_1: It can go into queuing also.   {#1302}
[01:22:38] TEACHER: And what do you mean when you say queuing?   {#1303}
[01:22:39] TEACHER: What is queuing?   {#1304}
[01:22:40] STUDENT_1: Like in the sense,   {#1305}
[01:22:41] STUDENT_1: like in the approach for like,   {#1306}
[01:22:45] STUDENT_1: like transaction was waiting,   {#1307}
[01:22:48] STUDENT_1: certain time and when the lock opened up.   {#1308}
[01:22:51] TEACHER: Why was that waiting?   {#1309}
[01:22:52] TEACHER: Because you wanted to acquire a lock.   {#1310}
[01:22:55] TEACHER: That's why it was waiting.   {#1311}
[01:22:57] STUDENT_1: Yeah.   {#1312}
[01:22:57] TEACHER: If you don't, in update, you cannot do for update.   {#1313}
[01:23:00] TEACHER: In update, you can just pass update this particular row.   {#1314}
[01:23:02] TEACHER: That's it.   {#1315}
[01:23:03] TEACHER: It's a one line command that you're passing.   {#1316}
[01:23:06] TEACHER: Right?   {#1317}
[01:23:07] TEACHER: Update this, this, this, this.   {#1318}
[01:23:09] TEACHER: So you have never acquired a lock on any row.   {#1319}
[01:23:11] TEACHER: You are directly firing an update on the database.   {#1320}
[01:23:14] TEACHER: There is no, there is, so that's why I said,   {#1321}
[01:23:18] TEACHER: the isolation level of the transaction is. If it's serializable, it would run one after   {#1322}
[01:23:22] TEACHER: another. If it is repeatable, it would have a certain way. Read committed would have a certain.   {#1323}
[01:23:27] STUDENT_1: So is it like, uh, we need to force, uh, run select for update first.   {#1324}
[01:23:34] STUDENT_1: If you want to take a lock, select, then update. Okay. Got it. Also, can you, can you show that   {#1325}
[01:23:42] STUDENT_1: part of the code where you are unlocking that loop? Like we are never unlocking. We are just   {#1326}
[01:23:46] TEACHER: committing the transaction.   {#1327}
[01:23:47] TEACHER: Why would we unlock commit itself?   {#1328}
[01:23:49] TEACHER: Means release all the locks.   {#1329}
[01:23:52] STUDENT_1: Okay.   {#1330}
[01:23:53] STUDENT_1: Sure.   {#1331}
[01:23:53] STUDENT_1: Got it.   {#1332}
[01:23:55] STUDENT_1: I didn't do that.   {#1333}
[01:23:56] STUDENT_1: Yeah.   {#1334}
[01:23:58] STUDENT_2: Got it.   {#1335}
[01:23:59] STUDENT_2: Uh, I did in the follow-up question that you answered to Chandan where, uh,   {#1336}
[01:24:03] STUDENT_2: rather than order by ID limit one, you put and ID is equal to 67.   {#1337}
[01:24:09] STUDENT_2: I think in my opinion, what should happen is let's say there are just three   {#1338}
[01:24:12] STUDENT_2: threads T1, T2, T3, T1 gets and requires the lock.   {#1339}
[01:24:16] STUDENT_2: wait until right so uh in a practical scenario like i think you gave the example of book my show   {#1340}
[01:24:23] STUDENT_2: for that i don't think it would work would it because uh let's say i booked i picked the seat   {#1341}
[01:24:28] STUDENT_2: went to payment section section and never made any payment for let's say 10 minutes   {#1342}
[01:24:33] TEACHER: no that is different that's what i said that is different that's on hold and not log although you   {#1343}
[01:24:39] TEACHER: see the word blog because it's easy for people to understand it but your transaction cannot be 10   {#1344}
[01:24:46] TEACHER: your throughput of a SQL server would go down drastically.   {#1345}
[01:24:51] TEACHER: Which is where you never implemented that way.   {#1346}
[01:24:54] TEACHER: You just acquire the lock for that moment and say that this seat is put on hold.   {#1347}
[01:24:58] TEACHER: That's it. That's it.   {#1348}
[01:25:00] TEACHER: You never span your transaction for 10 minutes until the payment is done.   {#1349}
[01:25:04] TEACHER: It's not that you start a transaction, wait for the payment to complete   {#1350}
[01:25:06] TEACHER: and then commit a transaction.   {#1351}
[01:25:08] TEACHER: Right? So you split this into multiple phases.   {#1352}
[01:25:12] STUDENT_2: And when the lock released, sorry, sorry.   {#1353}
[01:25:16] STUDENT_2: When the log gets released, the OS signals the other transactions, right?   {#1354}
[01:25:20] STUDENT_2: I, what I always thought was transaction weights and checks the log.   {#1355}
[01:25:24] STUDENT_2: So when you say wait, what do you mean?   {#1356}
[01:25:27] TEACHER: Is it an infinite for loop that it is checking, checking, checking, checking?   {#1357}
[01:25:30] TEACHER: I always thought so.   {#1358}
[01:25:31] TEACHER: So that is very, so that's why your thread signaling comes in where you have a thread   {#1359}
[01:25:36] TEACHER: wait queue and it signals on that.   {#1360}
[01:25:38] TEACHER: So OS level constructs, they all come in handy, which is why we were taught all of this in   {#1361}
[01:25:44] TEACHER: college, right?   {#1362}
[01:25:46] TEACHER: This, all these fundamentals are all there.   {#1363}
[01:25:49] TEACHER: We're all there.   {#1364}
[01:25:49] TEACHER: We just never paid attention to that.   {#1365}
[01:25:51] TEACHER: Right?   {#1366}
[01:25:51] TEACHER: Thread signaling, disk IOS and whatnot.   {#1367}
[01:25:54] TEACHER: We all studied all of this in college.   {#1368}
[01:25:56] TEACHER: I'm a, I'm a, I'm a big supporter of formal education.   {#1369}
[01:26:00] TEACHER: Big supporter.   {#1370}
[01:26:01] TEACHER: Because I, because when I have spent enough time, I, I see all of this being taught in college.   {#1371}
[01:26:06] TEACHER: I just that they did not know how it is used.   {#1372}
[01:26:09] TEACHER: We know it better.   {#1373}
[01:26:11] TEACHER: Ideally, we should go and teach in college, but money is not there.   {#1374}
---- OWNED SEGMENTS END ----

CTX| [01:26:19] TEACHER: I'll take a question at the end.   {#1375}
CTX| [01:26:22] TEACHER: We'll take a quick break because we spent hour and a half talking about it.   {#1376}
CTX| [01:26:26] TEACHER: Now, I hope I made you fall in love with relational databases.   {#1377}
CTX| [01:26:30] TEACHER: Explore them.   {#1378}
CTX| [01:26:31] TEACHER: Explore them.   {#1379}
CTX| [01:26:32] TEACHER: And next time, whenever someone asks relational databases, don't scale.   {#1380}
CTX| [01:26:37] TEACHER: And I'll just show them relational databases scale.   {#1381}
CTX| [01:26:39] TEACHER: You just need to know how to do it as simple as.   {#1382}
CTX| [01:26:43] TEACHER: Right?   {#1383}
CTX| [01:26:44] TEACHER: never believe any generic string right relation databases don't scale non-relational database   {#1384}
CTX| [01:26:48] TEACHER: scale relation database you can't do partitioning or you can do partitioning sharding everything on   {#1385}
CTX| [01:26:52] TEACHER: relational data right okay great so we'll take a quick break we'll take a quick break for five   {#1386}
CTX| [01:26:58] TEACHER: minutes uh we'll come back at 10 33 uh and next one are we'll discuss distributed key values right   {#1387}
CTX| [01:27:07] TEACHER: we'll go in depth on the implementation side of it we'll build a distributed key value store   {#1388}
CTX| [01:27:14] TEACHER: databases. That's it. So this would again help us understand the core of a relational database,   {#1389}
