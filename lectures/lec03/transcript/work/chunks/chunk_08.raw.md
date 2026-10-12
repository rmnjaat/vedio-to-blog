# chunk_08  OWNS 01:21:59 -> 01:33:59  (segments #1229-#1470, 2100 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:20:59] TEACHER: But understand the beauty of this design.   {#1209}
CTX| [01:21:01] TEACHER: That's what matters.   {#1210}
CTX| [01:21:02] TEACHER: As an engineer, focus on the beauty of design rather than pointing out the faults.   {#1211}
CTX| [01:21:07] TEACHER: It's okay to point out the faults, but pick the good parts of it.   {#1212}
CTX| [01:21:12] TEACHER: Because it was their decision.   {#1213}
CTX| [01:21:13] TEACHER: We can't interfere.   {#1214}
CTX| [01:21:14] TEACHER: It's like your neighbors are fighting.   {#1215}
CTX| [01:21:17] TEACHER: You know that both of them are wrong, but you should not say anything to them.   {#1216}
CTX| [01:21:20] TEACHER: It's their life.   {#1217}
CTX| [01:21:21] TEACHER: Whatever they want to do it, let them do it.   {#1218}
CTX| [01:21:23] TEACHER: But pick the best parts of it.   {#1219}
CTX| [01:21:25] TEACHER: So what they did is they created a table called tickets.   {#1220}
CTX| [01:21:29] TEACHER: In this table, they added a column called id, big integer, unsigned, not null and auto   {#1221}
CTX| [01:21:36] TEACHER: increment.   {#1222}
CTX| [01:21:37] TEACHER: Right?   {#1223}
CTX| [01:21:38] TEACHER: You clearly see big integer 2 raise to 64.   {#1224}
CTX| [01:21:41] TEACHER: They added a column called stub will come to this what stub is all about.   {#1225}
CTX| [01:21:45] TEACHER: They have made id the primary key, unique key to stub.   {#1226}
CTX| [01:21:48] TEACHER: The idea is that if MySQL already gives me auto increment ids, why can't MySQL be my   {#1227}
CTX| [01:21:56] TEACHER: id generation service?   {#1228}

---- OWNED SEGMENTS START ----
[01:21:59] TEACHER: sometime back right someone asked that but i think shriya was that that asked that part right why   {#1229}
[01:22:04] TEACHER: can't we just use my existing id generation i can't use my database as my id generation service   {#1230}
[01:22:10] TEACHER: that's exactly what they are doing they are using database itself as id so it's a separate database   {#1231}
[01:22:15] TEACHER: photos are being stored in other sharded database your id generation itself is a separate database   {#1232}
[01:22:20] TEACHER: in which you are leveraging the auto incrementedness of the database as your id generation   {#1233}
[01:22:26] TEACHER: So what happens if let's say you want to naively use a database as that, you know,   {#1234}
[01:22:32] TEACHER: database gives you auto increment.   {#1235}
[01:22:34] TEACHER: Whenever someone needs an ID, it talks to this database and you want ID from that.   {#1236}
[01:22:38] TEACHER: Basically, what would you do?   {#1237}
[01:22:39] TEACHER: You have this column, ID auto increment ID.   {#1238}
[01:22:42] TEACHER: You would delete this and add a new row.   {#1239}
[01:22:45] TEACHER: When you add a new row, what would you get?   {#1240}
[01:22:47] TEACHER: It would be the next ID.   {#1241}
[01:22:49] TEACHER: Then when you need one, you delete one and you add one, it would get the next ID.   {#1242}
[01:22:53] TEACHER: right but for you to add one you can just cannot insert a row with nothing you need to pass some   {#1243}
[01:23:00] TEACHER: values to them so you had another column called stuff it's a normal column name seems fancy just   {#1244}
[01:23:05] TEACHER: a normal dummy column some dummy value nothing special about it right but what we are effectively   {#1245}
[01:23:10] TEACHER: doing is we are just inserting this row we are deleting and reinserting deleting and reinserting   {#1246}
[01:23:16] TEACHER: deleting and reinserting this way whenever you're inserting into this table without providing the id   {#1247}
[01:23:23] TEACHER: increment the id and would use that as a default value while inserting and then the next one and   {#1248}
[01:23:28] TEACHER: then the next one and then the next classic auto increment id use case right so either we delete   {#1249}
[01:23:33] TEACHER: or increment uh delete and insert in one transaction or we can use upsert because   {#1250}
[01:23:40] TEACHER: delete plus insert is equal to upsert right so because they were using mysql i'm talking a bit   {#1251}
[01:23:47] TEACHER: about mysql here but mysql because they're using mysql mysql provides two ways to do it   {#1252}
[01:23:53] TEACHER: is insert on duplicate key update.   {#1253}
[01:23:56] TEACHER: So it's very simple.   {#1254}
[01:23:58] TEACHER: What it does is it tries to insert whatever you provided over here,   {#1255}
[01:24:03] TEACHER: insert into this, this, this values, this, this, this, it tries to insert that.   {#1256}
[01:24:07] TEACHER: But if it fails due to unique key constraint, then it triggers the update   {#1257}
[01:24:12] TEACHER: that you pass it.   {#1258}
[01:24:13] TEACHER: That is classic upset.   {#1259}
[01:24:15] TEACHER: So you're trying to insert.   {#1260}
[01:24:16] TEACHER: So how, what is upset?   {#1261}
[01:24:18] TEACHER: You're trying to insert something.   {#1262}
[01:24:19] TEACHER: If it exists, then update.   {#1263}
[01:24:21] TEACHER: If it does not exist, then insert.   {#1264}
[01:24:23] TEACHER: This is an absurd state for MySQL.   {#1265}
[01:24:28] TEACHER: So there are two ways to do absurd.   {#1266}
[01:24:30] TEACHER: First is this.   {#1267}
[01:24:31] TEACHER: The second one is replaceInto.   {#1268}
[01:24:34] TEACHER: Similar to how we have insertInto, there is replaceInto.   {#1269}
[01:24:37] TEACHER: We saw this in key value store on relational database.   {#1270}
[01:24:40] TEACHER: This replaceInto.   {#1271}
[01:24:42] TEACHER: So replaceInto does absurd, but what replaceInto does internally, it actually deletes and inserts   {#1272}
[01:24:51] TEACHER: the new row. So you can   {#1273}
[01:24:53] TEACHER: very clearly see it is slower. It is   {#1274}
[01:24:55] TEACHER: basically 32 times slower than on duplicate   {#1275}
[01:24:57] TEACHER: key update. So you can use   {#1276}
[01:24:59] TEACHER: either replace into or insert but replace   {#1277}
[01:25:01] TEACHER: into is 32 times slower than this. I personally   {#1278}
[01:25:03] TEACHER: benchmarked this. That's why I am   {#1279}
[01:25:05] TEACHER: quoting this number 32x slower. I personally benchmarked   {#1280}
[01:25:07] TEACHER: it on a MySQL server to see   {#1281}
[01:25:09] TEACHER: the performance difference between the two.   {#1282}
[01:25:11] TEACHER: So it is 32 times slower   {#1283}
[01:25:13] TEACHER: over here. So pick one.   {#1284}
[01:25:15] TEACHER: Anyway, what matters is doing   {#1285}
[01:25:17] TEACHER: absurd. So what you are actually doing   {#1286}
[01:25:21] TEACHER: like this whenever whenever a server a server wants an id so they can insert a photo in photos   {#1287}
[01:25:28] TEACHER: database what it does is it fires a sql query on the central id service the tickets something like   {#1288}
[01:25:33] TEACHER: this insert into tickets stub values a because you have to pass some value so you use stub a   {#1289}
[01:25:39] TEACHER: random value nothing no no nothing matters that you put any value there but it is the constant   {#1290}
[01:25:45] TEACHER: well insert into ticket stub a on duplicate key update id equal to id plus one simple   {#1291}
[01:25:53] TEACHER: this day what happens is it would try to insert this a but it would see key array but this already   {#1292}
[01:25:58] TEACHER: exists so on duplicate key update so it would update 74 to 75 and would return that right   {#1293}
[01:26:06] TEACHER: Then next time the querifiers 76, 77, 78 and so on and so forth.   {#1294}
[01:26:13] TEACHER: So you get IDs like this.   {#1295}
[01:26:16] TEACHER: You are leveraging MySQL transaction, MySQL atomicity in order to get the IDs that you want.   {#1296}
[01:26:24] TEACHER: So this is what Flickr does as part of like implementation logic.   {#1297}
[01:26:29] TEACHER: But now what you see is like something like this.   {#1298}
[01:26:31] TEACHER: So these are your photo service servers.   {#1299}
[01:26:33] TEACHER: This would make it clear.   {#1300}
[01:26:34] TEACHER: This is your ID generation server, my SQL that is different and photos database is different   {#1301}
[01:26:38] TEACHER: which is sharded.   {#1302}
[01:26:39] TEACHER: So what they're doing is whenever there is a request to post a photo request comes to   {#1303}
[01:26:43] TEACHER: this API server, API server fires the request to this my SQL to get the ID.   {#1304}
[01:26:47] TEACHER: You get the ID, then you store it in photos.   {#1305}
[01:26:51] TEACHER: Right.   {#1306}
[01:26:51] TEACHER: This is what is happening.   {#1307}
[01:26:52] TEACHER: But if you look carefully, this is a single point of failure because there is one server.   {#1308}
[01:26:59] TEACHER: If this server goes down then gone.   {#1309}
[01:27:02] TEACHER: Right.   {#1310}
[01:27:02] TEACHER: Now to solve it.   {#1311}
[01:27:04] TEACHER: You put two servers.   {#1312}
[01:27:06] TEACHER: But this is very similar to that problem now.   {#1313}
[01:27:09] TEACHER: Cossip, gossip, monotonicity and whatnot.   {#1314}
[01:27:11] TEACHER: Here we don't care about monotonicity.   {#1315}
[01:27:13] TEACHER: So what we do, we put both databases behind a load balancer   {#1316}
[01:27:19] TEACHER: and make one, someone also recommended this approach.   {#1317}
[01:27:23] TEACHER: This is exactly what we are doing.   {#1318}
[01:27:24] TEACHER: So what we do is we have two databases.   {#1319}
[01:27:26] TEACHER: Now, even if one of the databases goes on,   {#1320}
[01:27:28] TEACHER: other databases can handle the load.   {#1321}
[01:27:29] TEACHER: But how do you ensure uniqueness?   {#1322}
[01:27:31] TEACHER: tests. How do you ensure that they don't conflict? What we do is let's say I have two databases.   {#1323}
[01:27:38] TEACHER: I'll have instead of doing increment plus plus I do increment plus equal to two. Let's say   {#1324}
[01:27:43] TEACHER: one database generates odd IDs, other database generates even IDs. So how you can configure   {#1325}
[01:27:50] TEACHER: this is auto increment underscore increment. These are actual configuration that you can   {#1326}
[01:27:56] TEACHER: provide in your MySQL server.   {#1327}
[01:27:58] TEACHER: Auto increment increment is set to 2   {#1328}
[01:28:00] TEACHER: and auto increment offset is set to 1.   {#1329}
[01:28:03] TEACHER: So increment increment   {#1330}
[01:28:04] TEACHER: this means by how much you would want to   {#1331}
[01:28:06] TEACHER: increment every time.   {#1332}
[01:28:08] TEACHER: And increment offset is what's the starting point   {#1333}
[01:28:10] TEACHER: of it.   {#1334}
[01:28:11] TEACHER: So this is what you would configure.   {#1335}
[01:28:13] TEACHER: And now the load valancer that you put over here   {#1336}
[01:28:15] TEACHER: is configured in round robin port.   {#1337}
[01:28:17] TEACHER: So first request goes over here.   {#1338}
[01:28:20] TEACHER: It generates ID 1.   {#1339}
[01:28:21] TEACHER: Second request goes to other server.   {#1340}
[01:28:24] TEACHER: Third request comes to first server.   {#1341}
[01:28:26] TEACHER: auto increment plus equal to 2   {#1342}
[01:28:28] TEACHER: 1 plus 2 is 3 so you get ID 3   {#1343}
[01:28:30] TEACHER: next request goes over your 2   {#1344}
[01:28:32] TEACHER: plus auto increment increment is 2   {#1345}
[01:28:33] TEACHER: so 4 5   {#1346}
[01:28:36] TEACHER: 6 7 8   {#1347}
[01:28:38] TEACHER: because you are doing it in round   {#1348}
[01:28:39] TEACHER: you will always see positive request 2 year, 2nd year, 3rd year   {#1349}
[01:28:42] TEACHER: 4th year, 5th year, 6th year, 7th year, 8th year   {#1350}
[01:28:44] TEACHER: you almost get   {#1351}
[01:28:46] TEACHER: more authenticity   {#1352}
[01:28:48] TEACHER: you have solved problem   {#1353}
[01:28:50] TEACHER: of   {#1354}
[01:28:52] TEACHER: single point of failure now you have 2 servers   {#1355}
[01:28:54] TEACHER: if one of the server goes down   {#1356}
[01:28:56] TEACHER: fine for you because your ID generation is still continuing to work without any hiccups.   {#1357}
[01:29:01] TEACHER: But what happens when it goes down? What do you do? If one server goes down, let's say my   {#1358}
[01:29:07] TEACHER: odd server went down due to some reason. Now all of my requests will go to even server.   {#1359}
[01:29:13] TEACHER: So the IDs that would spit out would be 2, 4, 6, 8, 10, 12, etc. Now assume that after 202   {#1360}
[01:29:21] TEACHER: ID was generated, my server, my odd server came back up.   {#1361}
[01:29:26] TEACHER: Now when my odd server came back up, either it can start from the point where it left   {#1362}
[01:29:31] TEACHER: up because my SQL is a persistent source.   {#1363}
[01:29:33] TEACHER: It's not storing in memory.   {#1364}
[01:29:34] TEACHER: So let's say generated ID till five, it would generate seven, 204, nine, 206, 11, 208.   {#1365}
[01:29:46] TEACHER: Right?   {#1366}
[01:29:46] TEACHER: Here you see a huge discrepancy in IDs.   {#1367}
[01:29:49] TEACHER: It's not that it's a constraint that you are playing with.   {#1368}
[01:29:52] TEACHER: It just does not look aesthetically pleasing.   {#1369}
[01:29:54] TEACHER: Much more for aesthetics rather than correctness.   {#1370}
[01:29:57] TEACHER: You are still getting unique ID, but there seems to be very massive parity between.   {#1371}
[01:30:01] TEACHER: So it's optional to just reset the one that you just spun up to the ID.   {#1372}
[01:30:09] TEACHER: Let's say this generated ID to 202.   {#1373}
[01:30:12] TEACHER: You will add some buffer, let's say 240 and you set here 241 and 242.   {#1374}
[01:30:17] TEACHER: And then it resumes from that.   {#1375}
[01:30:19] TEACHER: 242, 243, 244, 245, 246 and so on and so forth.   {#1376}
[01:30:23] TEACHER: It's just for aesthetics, nothing about correctness, nothing about strict monotonicity.   {#1377}
[01:30:26] TEACHER: Because we're still not guarantee strict monotonicity.   {#1378}
[01:30:29] TEACHER: But you still have that as like nearly similar.   {#1379}
[01:30:35] TEACHER: So it's good.   {#1380}
[01:30:36] TEACHER: It's a good byproduct to have.   {#1381}
[01:30:38] TEACHER: So this is how Flickr does it.   {#1382}
[01:30:41] TEACHER: It's a really simple approach that we right now looked at.   {#1383}
[01:30:44] TEACHER: It's pretty simple, but it's pretty brilliant in its own sense.   {#1384}
[01:30:49] TEACHER: Ordin event and results back up.   {#1385}
[01:30:52] TEACHER: That's one thing.   {#1386}
[01:30:53] TEACHER: You would say who would do this?   {#1387}
[01:30:55] TEACHER: Who would do this configuring?   {#1388}
[01:30:56] TEACHER: Who would find this max buffer and then start page?   {#1389}
[01:30:58] TEACHER: So we are starting with the safest value, right?   {#1390}
[01:31:00] TEACHER: Who would do this?   {#1391}
[01:31:01] TEACHER: Obviously when a server goes down SRE engineer, DevOps engineer,   {#1392}
[01:31:04] TEACHER: you know, they would fix it.   {#1393}
[01:31:06] TEACHER: They can configure it.   {#1394}
[01:31:07] TEACHER: They can change it.   {#1395}
[01:31:08] TEACHER: You can write an automated script, but typically database going down is a big thing.   {#1396}
[01:31:13] TEACHER: There will be an engineer looking into it.   {#1397}
[01:31:14] TEACHER: He or she will do this.   {#1398}
[01:31:16] TEACHER: It's fine.   {#1399}
[01:31:17] TEACHER: Right.   {#1400}
[01:31:19] TEACHER: You can also, in case you want to automate, you can automate.   {#1401}
[01:31:22] TEACHER: You just need to find the active server, find the max IDs, add some buffer to that, and   {#1402}
[01:31:26] TEACHER: then set the values and then just do a quick process reboot on each server.   {#1403}
[01:31:30] TEACHER: You are done.   {#1404}
[01:31:31] TEACHER: Right?   {#1405}
[01:31:32] TEACHER: Okay.   {#1406}
[01:31:32] TEACHER: Any questions on this approach?   {#1407}
[01:31:39] STUDENT_9: Yeah, man.   {#1408}
[01:31:41] STUDENT_3: Yeah.   {#1409}
[01:31:41] STUDENT_3: Can you just go back to the previous page where you have created that query?   {#1410}
[01:31:46] STUDENT_3: I'm not able to understand how it's creating the unique value at this one.   {#1411}
[01:31:50] STUDENT_3: Can you just elaborate maybe one more time?   {#1412}
[01:31:52] TEACHER: This is 75, 76.   {#1413}
[01:31:55] TEACHER: Insert into ticket stub values A.   {#1414}
[01:31:58] TEACHER: So what we are trying to do, we are trying to insert a value.   {#1415}
[01:32:00] TEACHER: Something we have not provided ID.   {#1416}
[01:32:02] TEACHER: So we're trying to insert this value.   {#1417}
[01:32:04] TEACHER: Right?   {#1418}
[01:32:05] TEACHER: But stub is having what?   {#1419}
[01:32:09] TEACHER: Unique key.   {#1420}
[01:32:10] TEACHER: Correct?   {#1421}
[01:32:12] TEACHER: What would happen?   {#1422}
[01:32:13] TEACHER: This insert would fail.   {#1423}
[01:32:16] TEACHER: have two same values over here in this column. Correct. So on duplicate key update, update to   {#1424}
[01:32:22] STUDENT_3: what id equal to id plus one. That I understood. Step part where it is coming, not able to make   {#1425}
[01:32:28] TEACHER: sense of that. It's just a common value. It's just a random value that you chose.   {#1426}
[01:32:34] TEACHER: It's a hard coded value in your query. Hard coded. Oh. Right. It's a hard code. It can be literally   {#1427}
[01:32:40] TEACHER: any string that you would want to keep.   {#1428}
[01:32:42] TEACHER: It's just that you want to trigger this.   {#1429}
[01:32:45] TEACHER: You want to break the unique constraint.   {#1430}
[01:32:48] TEACHER: Correct?   {#1431}
[01:32:49] TEACHER: You are just trying.   {#1432}
[01:32:51] TEACHER: You are making your database   {#1433}
[01:32:53] TEACHER: break the unique constraint   {#1434}
[01:32:54] TEACHER: so that you can trigger an update atomic.   {#1435}
[01:32:58] STUDENT_3: Oh, so for that purpose only stuff exists.   {#1436}
[01:33:01] TEACHER: That's it.   {#1437}
[01:33:01] TEACHER: That's it.   {#1438}
[01:33:02] TEACHER: There is no other reason for stuff.   {#1439}
[01:33:04] STUDENT_3: Okay.   {#1440}
[01:33:05] STUDENT_3: Got it.   {#1441}
[01:33:06] TEACHER: DK?   {#1442}
[01:33:08] STUDENT_3: Yep.   {#1443}
[01:33:09] STUDENT_3: if you can go to the last page,   {#1444}
[01:33:11] STUDENT_3: I am not able to understand how   {#1445}
[01:33:13] STUDENT_3: when the server comes back,   {#1446}
[01:33:15] STUDENT_3: how you are resetting the values   {#1447}
[01:33:17] STUDENT_3: with the buffer value.   {#1448}
[01:33:18] TEACHER: This one, I said,   {#1449}
[01:33:19] TEACHER: no, one engineer will do that.   {#1450}
[01:33:22] TEACHER: This configuration,   {#1451}
[01:33:24] TEACHER: these configurations,   {#1452}
[01:33:25] TEACHER: it's MySQL specific.   {#1453}
[01:33:27] TEACHER: Check how you can change   {#1454}
[01:33:28] TEACHER: auto increment offset on the platform.   {#1455}
[01:33:30] TEACHER: But why do we need to do that?   {#1456}
[01:33:32] TEACHER: Because let's say one server comes back.   {#1457}
[01:33:33] TEACHER: I said aesthetics.   {#1458}
[01:33:35] TEACHER: I said it's for aesthetics.   {#1459}
[01:33:36] TEACHER: Nothing more.   {#1460}
[01:33:38] TEACHER: it, your system is still running correctly.   {#1461}
[01:33:40] TEACHER: It would just look a bit.   {#1462}
[01:33:41] STUDENT_3: The last value only will keep on updating it.   {#1463}
[01:33:43] STUDENT_3: Right.   {#1464}
[01:33:44] STUDENT_3: Or it doesn't work.   {#1465}
[01:33:45] TEACHER: But that's what I said.   {#1466}
[01:33:47] TEACHER: Let's say it died off at five.   {#1467}
[01:33:49] TEACHER: Okay.   {#1468}
[01:33:50] TEACHER: This value is 202 right now.   {#1469}
[01:33:53] TEACHER: If odd server comes back up, what would be the next idea that would be generated?   {#1470}
---- OWNED SEGMENTS END ----

CTX| [01:33:59] STUDENT_3: But this is an event server.   {#1471}
CTX| [01:34:01] TEACHER: This event page 202 odd server came back up.   {#1472}
CTX| [01:34:05] TEACHER: What is the ID generated on the odd server now?   {#1473}
CTX| [01:34:08] STUDENT_3: whatever value was.   {#1474}
CTX| [01:34:10] TEACHER: I have three,   {#1475}
CTX| [01:34:10] TEACHER: one,   {#1476}
CTX| [01:34:11] TEACHER: three,   {#1477}
CTX| [01:34:11] TEACHER: five.   {#1478}
CTX| [01:34:11] TEACHER: What's the next value that would be generated?   {#1479}
CTX| [01:34:13] TEACHER: One,   {#1480}
CTX| [01:34:13] TEACHER: three,   {#1481}
CTX| [01:34:14] TEACHER: seven,   {#1482}
CTX| [01:34:15] STUDENT_3: seven.   {#1483}
CTX| [01:34:15] TEACHER: And on the event server.   {#1484}
CTX| [01:34:18] TEACHER: Okay.   {#1485}
CTX| [01:34:19] TEACHER: Two,   {#1486}
CTX| [01:34:19] TEACHER: zero,   {#1487}
CTX| [01:34:19] TEACHER: four.   {#1488}
CTX| [01:34:20] TEACHER: So just to maintain that.   {#1489}
CTX| [01:34:22] TEACHER: Correct.   {#1490}
CTX| [01:34:22] TEACHER: Right.   {#1491}
CTX| [01:34:23] TEACHER: Just for aesthetics.   {#1492}
CTX| [01:34:24] TEACHER: That's what I'm saying.   {#1493}
CTX| [01:34:24] TEACHER: Just for aesthetics.   {#1494}
CTX| [01:34:26] TEACHER: Okay.   {#1495}
CTX| [01:34:27] TEACHER: There's nothing special.   {#1496}
CTX| [01:34:27] TEACHER: Even if you don't do it,   {#1497}
CTX| [01:34:28] TEACHER: your system would still function correctly.   {#1498}
CTX| [01:34:30] TEACHER: It just for aesthetics.   {#1499}
CTX| [01:34:31] TEACHER: You can just reset the value on both sides and make it look better.   {#1500}
CTX| [01:34:36] TEACHER: That's it.   {#1501}
CTX| [01:34:38] STUDENT_3: Okay, so after reset, what will be the right value according to you?   {#1502}
CTX| [01:34:43] TEACHER: Start with 240, 239 and then let it round robin.   {#1503}
CTX| [01:34:49] STUDENT_3: Got it.   {#1504}
CTX| [01:34:50] TEACHER: Pick some value.   {#1505}
CTX| [01:34:51] TEACHER: It's up to you.   {#1506}
CTX| [01:34:52] TEACHER: You are the desire.   {#1507}
CTX| [01:34:53] TEACHER: You are the architect of the system.   {#1508}
CTX| [01:34:54] TEACHER: It's up to you where you want to reset.   {#1509}
CTX| [01:34:57] TEACHER: You reset it to the safest value of that.   {#1510}
