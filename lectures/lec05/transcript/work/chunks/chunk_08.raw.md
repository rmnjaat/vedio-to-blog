# chunk_08  OWNS 01:26:19 -> 01:39:05  (segments #1375-#1498, 1204 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:25:20] STUDENT_2: I, what I always thought was transaction weights and checks the log.   {#1355}
CTX| [01:25:24] STUDENT_2: So when you say wait, what do you mean?   {#1356}
CTX| [01:25:27] TEACHER: Is it an infinite for loop that it is checking, checking, checking, checking?   {#1357}
CTX| [01:25:30] TEACHER: I always thought so.   {#1358}
CTX| [01:25:31] TEACHER: So that is very, so that's why your thread signaling comes in where you have a thread   {#1359}
CTX| [01:25:36] TEACHER: wait queue and it signals on that.   {#1360}
CTX| [01:25:38] TEACHER: So OS level constructs, they all come in handy, which is why we were taught all of this in   {#1361}
CTX| [01:25:44] TEACHER: college, right?   {#1362}
CTX| [01:25:46] TEACHER: This, all these fundamentals are all there.   {#1363}
CTX| [01:25:49] TEACHER: We're all there.   {#1364}
CTX| [01:25:49] TEACHER: We just never paid attention to that.   {#1365}
CTX| [01:25:51] TEACHER: Right?   {#1366}
CTX| [01:25:51] TEACHER: Thread signaling, disk IOS and whatnot.   {#1367}
CTX| [01:25:54] TEACHER: We all studied all of this in college.   {#1368}
CTX| [01:25:56] TEACHER: I'm a, I'm a, I'm a big supporter of formal education.   {#1369}
CTX| [01:26:00] TEACHER: Big supporter.   {#1370}
CTX| [01:26:01] TEACHER: Because I, because when I have spent enough time, I, I see all of this being taught in college.   {#1371}
CTX| [01:26:06] TEACHER: I just that they did not know how it is used.   {#1372}
CTX| [01:26:09] TEACHER: We know it better.   {#1373}
CTX| [01:26:11] TEACHER: Ideally, we should go and teach in college, but money is not there.   {#1374}

---- OWNED SEGMENTS START ----
[01:26:19] TEACHER: I'll take a question at the end.   {#1375}
[01:26:22] TEACHER: We'll take a quick break because we spent hour and a half talking about it.   {#1376}
[01:26:26] TEACHER: Now, I hope I made you fall in love with relational databases.   {#1377}
[01:26:30] TEACHER: Explore them.   {#1378}
[01:26:31] TEACHER: Explore them.   {#1379}
[01:26:32] TEACHER: And next time, whenever someone asks relational databases, don't scale.   {#1380}
[01:26:37] TEACHER: And I'll just show them relational databases scale.   {#1381}
[01:26:39] TEACHER: You just need to know how to do it as simple as.   {#1382}
[01:26:43] TEACHER: Right?   {#1383}
[01:26:44] TEACHER: never believe any generic string right relation databases don't scale non-relational database   {#1384}
[01:26:48] TEACHER: scale relation database you can't do partitioning or you can do partitioning sharding everything on   {#1385}
[01:26:52] TEACHER: relational data right okay great so we'll take a quick break we'll take a quick break for five   {#1386}
[01:26:58] TEACHER: minutes uh we'll come back at 10 33 uh and next one are we'll discuss distributed key values right   {#1387}
[01:27:07] TEACHER: we'll go in depth on the implementation side of it we'll build a distributed key value store   {#1388}
[01:27:14] TEACHER: databases. That's it. So this would again help us understand the core of a relational database,   {#1389}
[01:27:21] TEACHER: few interesting things about it, some things that we'd never think about when we designing,   {#1390}
[01:27:26] TEACHER: we never think about implementation. Here we'll pick up those nitty gritties on performance   {#1391}
[01:27:30] TEACHER: improvement of relational database, how to write, like how to do what and when and why,   {#1392}
[01:27:36] TEACHER: and more importantly, how, right? We'll go all of that. And a lot of interesting detours around   {#1393}
[01:27:42] TEACHER: how redis does it i just sprinkling it over here right we'll go we'll touch upon a lot of stuff   {#1394}
[01:27:47] TEACHER: we'll take a break till 10 33 in next uh five minutes we'll come back and we'll talk about   {#1395}
[01:27:52] TEACHER: distribute key value store thanks folks see you folks in five minutes   {#1396}
[01:33:13] TEACHER: Thank you.   {#1397}
[01:33:31] TEACHER: Now, on the second half, now we'll have nice brainstorming.   {#1398}
[01:33:37] TEACHER: We did discuss that, but now from now almost for every system that we covered, we'll have   {#1399}
[01:33:44] TEACHER: a detailed brainstorming rather than me just rambling about solution.   {#1400}
[01:33:48] TEACHER: We'll go into why we are making those decisions.   {#1401}
[01:33:50] TEACHER: Okay.   {#1402}
[01:33:51] TEACHER: So now what we'll do is we'll build a distributed key value store on relational database.   {#1403}
[01:33:55] TEACHER: First let's whenever you hear, I've deliberately added the term distributed over here because   {#1404}
[01:34:01] TEACHER: Folks love it.   {#1405}
[01:34:02] TEACHER: Number one, number two, that I want to emphasize on this fact that when you are thrown into   {#1406}
[01:34:09] TEACHER: a situation where you want to design something distributed and it's okay on day zero, you   {#1407}
[01:34:14] TEACHER: don't design it to be distributed.   {#1408}
[01:34:18] TEACHER: The way you should approach is just first implement a single node thing and then think   {#1409}
[01:34:24] TEACHER: about distributed.   {#1410}
[01:34:24] TEACHER: A lot of people like directly jump into yeah, leader election and this and back source and   {#1411}
[01:34:29] TEACHER: draft and whatnot.   {#1412}
[01:34:31] TEACHER: No, don't confuse.   {#1413}
[01:34:33] TEACHER: Don't get confused at all.   {#1414}
[01:34:35] TEACHER: Start simple and then scale out.   {#1415}
[01:34:38] TEACHER: Okay.   {#1416}
[01:34:39] TEACHER: So the requirement for this is we need infinitely scalable.   {#1417}
[01:34:44] TEACHER: By default, everything needs to be infinitely scalable.   {#1418}
[01:34:47] TEACHER: And the core operations that we support are get, put, delete and TTL.   {#1419}
[01:34:52] TEACHER: Getting a key, putting a key, deleting a key and TTL,   {#1420}
[01:34:57] TEACHER: expiration on it, auto expiration.   {#1421}
[01:35:00] TEACHER: And   {#1422}
[01:35:01] TEACHER: this is not some made up statement   {#1423}
[01:35:03] TEACHER: or some made up design.   {#1424}
[01:35:06] TEACHER: Apache Ignite, one of the   {#1425}
[01:35:07] TEACHER: most popular key value   {#1426}
[01:35:10] TEACHER: store built on top of relational DB.   {#1427}
[01:35:12] TEACHER: It uses this,   {#1428}
[01:35:13] TEACHER: supports this and for   {#1429}
[01:35:15] TEACHER: me to understand the system in depth, went   {#1430}
[01:35:18] TEACHER: through their source code.   {#1431}
[01:35:19] TEACHER: As simple as that.   {#1432}
[01:35:22] TEACHER: But the best part of this is   {#1433}
[01:35:24] TEACHER: we'll not just restrain ourselves   {#1434}
[01:35:28] TEACHER: will also take small detours onto understanding how redis also do few of these things right that   {#1435}
[01:35:33] TEACHER: will be quite interesting for you to know okay the brainstorming that we'll do we'll do it in   {#1436}
[01:35:40] TEACHER: five parts storage optimization of storage inserts update and ttl this what will bring someone so   {#1437}
[01:35:47] TEACHER: let's start with storage how would you store the data raise your hands i'll pull you in   {#1438}
[01:35:53] TEACHER: How will you store this data?   {#1439}
[01:35:55] TEACHER: Single load?   {#1440}
[01:35:56] TEACHER: What would be the schema?   {#1441}
[01:35:57] TEACHER: Sandeep?   {#1442}
[01:35:58] STUDENT_1: I would store it in an array.   {#1443}
[01:36:00] STUDENT_1: That would be my first option.   {#1444}
[01:36:02] STUDENT_1: Array of some...   {#1445}
[01:36:03] STUDENT_1: Sandeep, inaudible.   {#1446}
[01:36:05] STUDENT_1: Hello?   {#1447}
[01:36:05] STUDENT_1: Are you able to hear me now, Arpit?   {#1448}
[01:36:10] STUDENT_1: Hello?   {#1449}
[01:36:10] STUDENT_8: I'll move on.   {#1450}
[01:36:11] TEACHER: Rahul, go on.   {#1451}
[01:36:14] STUDENT_12: Hey, are you able to hear me now?   {#1452}
[01:36:16] TEACHER: Okay.   {#1453}
[01:36:16] TEACHER: Oh, sorry.   {#1454}
[01:36:16] TEACHER: It's my headphone or something.   {#1455}
[01:36:18] TEACHER: Wait, wait, wait, wait.   {#1456}
[01:36:21] TEACHER: No.   {#1457}
[01:36:22] STUDENT_1: my headset is working let me quickly test sorry i'm i'm able to hear uh here then no yeah right   {#1458}
[01:36:28] STUDENT_1: it's working fine i've gone sorry yeah yeah so basically the schema would be a primary key   {#1459}
[01:36:37] STUDENT_1: which would be our key and there for the value part we can have some array or like some kind   {#1460}
[01:36:44] STUDENT_1: of our dynamic structure basically. Relational data is what? Ahre? Okay. So I guess string would   {#1461}
[01:36:52] STUDENT_1: be the better choice if that's the case. Like key is basically primary key, which will be,   {#1462}
[01:37:02] STUDENT_1: which will be indexed and values will be strings, I guess. Yeah. So key is a string or an integer or   {#1463}
[01:37:11] STUDENT_1: what he can be, uh, let's just say like, uh, key can be string also.   {#1464}
[01:37:18] STUDENT_1: Like we are like, if we are not concerned about, uh, like if we are not concerned about   {#1465}
[01:37:25] TEACHER: storage size, why we should not be, it's a database.   {#1466}
[01:37:31] TEACHER: We should always be concerned about it.   {#1467}
[01:37:33] TEACHER: Right.   {#1468}
[01:37:33] TEACHER: So always you would see, uh, key primary key is fine, but, uh, uh, picking the right type,   {#1469}
[01:37:41] TEACHER: for any database is really important.   {#1470}
[01:37:43] TEACHER: So you have, when you're designing a key value store,   {#1471}
[01:37:45] TEACHER: and let's say you design it, let's say you pick key to be a primary key.   {#1472}
[01:37:49] TEACHER: But when you're designing a type, you cannot just have any type   {#1473}
[01:37:52] TEACHER: because this is what would determine what kind of keys   {#1474}
[01:37:56] TEACHER: are you supporting in the system?   {#1475}
[01:37:58] TEACHER: Like if you would only want to support integer keys,   {#1476}
[01:38:00] TEACHER: then well, you can have a key as integer.   {#1477}
[01:38:02] TEACHER: If you're saying that, Hey, I would support strings,   {#1478}
[01:38:05] TEACHER: then how big of a string would that be?   {#1479}
[01:38:07] TEACHER: So as a database engineer or as a database designer, you need to know how big your key would be.   {#1480}
[01:38:14] TEACHER: So let's say you pick where can I say 16.   {#1481}
[01:38:17] TEACHER: I'm picking a smaller size.   {#1482}
[01:38:18] TEACHER: You might go for 24, 30 to 60.   {#1483}
[01:38:21] STUDENT_1: Based on the requirements.   {#1484}
[01:38:22] STUDENT_1: Based on the requirements.   {#1485}
[01:38:23] TEACHER: But once you fix it, you cannot change it.   {#1486}
[01:38:26] TEACHER: So ensure that you are, you like, whenever you are designing a database, you know your requirements really well.   {#1487}
[01:38:33] TEACHER: Okay.   {#1488}
[01:38:34] TEACHER: What's the type of the value?   {#1489}
[01:38:35] TEACHER: You said string.   {#1490}
[01:38:36] STUDENT_1: Yeah.   {#1491}
[01:38:37] STUDENT_1: the string, like if we are storing Jason in that, it depends like what we are storing.   {#1492}
[01:38:42] STUDENT_1: Okay.   {#1493}
[01:38:43] STUDENT_1: If we are like storing some values, simple values, then we can, we can use integer.   {#1494}
[01:38:48] STUDENT_1: But like, if you are storing Jason objects or something like that, we will need a bigger,   {#1495}
[01:38:53] STUDENT_1: bigger string, more than 200, 300 words, maybe.   {#1496}
[01:38:57] STUDENT_1: So yeah, it actually depends on the use case.   {#1497}
[01:39:00] TEACHER: No, but then you have to pick something that works for all.   {#1498}
---- OWNED SEGMENTS END ----

CTX| [01:39:05] STUDENT_1: I guess   {#1499}
CTX| [01:39:07] STUDENT_1: or this also I will choose   {#1500}
CTX| [01:39:08] STUDENT_1: worker but I guess   {#1501}
CTX| [01:39:11] STUDENT_8: instead   {#1502}
CTX| [01:39:12] STUDENT_8: pick block   {#1503}
CTX| [01:39:14] STUDENT_1: by very large objects   {#1504}
CTX| [01:39:16] TEACHER: you can literally store anything in that   {#1505}
CTX| [01:39:18] TEACHER: now what you said is   {#1506}
CTX| [01:39:20] TEACHER: partially true what you said it depends on   {#1507}
CTX| [01:39:22] TEACHER: what we are storing no it does not depend   {#1508}
CTX| [01:39:24] TEACHER: on what we are storing but how we   {#1509}
CTX| [01:39:26] TEACHER: are accessing it   {#1510}
CTX| [01:39:28] TEACHER: for example in   {#1511}
CTX| [01:39:30] TEACHER: MongoDB   {#1512}
CTX| [01:39:31] TEACHER: MongoDB is also key value store.   {#1513}
CTX| [01:39:34] TEACHER: So in MongoDB, when you are storing, you are storing JSONs   {#1514}
CTX| [01:39:38] TEACHER: and you are allowed to query on that.   {#1515}
CTX| [01:39:43] TEACHER: So let's say you have some row ID and then against which you store a JSON   {#1516}
CTX| [01:39:46] TEACHER: and if you are allowed to query on a particular attribute within that JSON,   {#1517}
CTX| [01:39:50] TEACHER: which means you need query capability within the value,   {#1518}
CTX| [01:39:54] TEACHER: then you need to have the copyright type over here.   {#1519}
CTX| [01:39:57] TEACHER: But if you are just doing key-based accesses,   {#1520}
CTX| [01:40:01] TEACHER: you are not querying within the value.   {#1521}
CTX| [01:40:03] TEACHER: For example, if you would have stored value as IKT,   {#1522}
