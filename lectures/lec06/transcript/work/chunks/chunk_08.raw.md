# chunk_08  OWNS 01:19:14 -> 01:31:54  (segments #1380-#1640, 2260 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:18:14] TEACHER: like how I specified edge.arkipani.me so any request for edge.arkipani.me goes to CDN   {#1356}
CTX| [01:18:20] TEACHER: Correct?   {#1357}
CTX| [01:18:21] TEACHER: Here, any request to gravita.com goes where?   {#1358}
CTX| [01:18:24] TEACHER: To CDN.   {#1359}
CTX| [01:18:25] TEACHER: API.com.   {#1360}
CTX| [01:18:25] STUDENT_5: Yeah.   {#1361}
CTX| [01:18:26] TEACHER: No, no.   {#1362}
CTX| [01:18:26] TEACHER: So it goes to CDN and CDN's origin is configured to API to gravita.com.   {#1363}
CTX| [01:18:30] TEACHER: So if it does not have it, what it is doing, it's going to API.   {#1364}
CTX| [01:18:34] TEACHER: And because only API server knows here, one common question that ask is why CDN not pointing   {#1365}
CTX| [01:18:40] TEACHER: to S3 directly?   {#1366}
CTX| [01:18:41] TEACHER: Because S3 is not public.   {#1367}
CTX| [01:18:43] TEACHER: Only my database knows which photo is active.   {#1368}
CTX| [01:18:46] TEACHER: S3 doesn't know which photo is active.   {#1369}
CTX| [01:18:47] TEACHER: Right?   {#1370}
CTX| [01:18:47] TEACHER: Only database is a source of truth for it to know which photo is active.   {#1371}
CTX| [01:18:51] TEACHER: So which is why what we have to do is CDN falls back to apatradar.com,   {#1372}
CTX| [01:18:57] TEACHER: reads the database, find active photo, goes to SP, gets the image and sends it to the CD.   {#1373}
CTX| [01:19:02] STUDENT_5: Right.   {#1374}
CTX| [01:19:02] STUDENT_5: Makes sense.   {#1375}
CTX| [01:19:03] STUDENT_5: I was sort of confused.   {#1376}
CTX| [01:19:05] STUDENT_5: Like I was taking it in the reverse order, the mapping that was there.   {#1377}
CTX| [01:19:08] STUDENT_5: Okay.   {#1378}
CTX| [01:19:10] STUDENT_8: DK.   {#1379}

---- OWNED SEGMENTS START ----
[01:19:14] STUDENT_2: Yeah.   {#1380}
[01:19:15] STUDENT_2: Hi Arpit.   {#1381}
[01:19:15] STUDENT_2: So first question is related to the hashing.   {#1382}
[01:19:18] STUDENT_2: So for hashing, you have said that, you know, we cannot do,   {#1383}
[01:19:22] STUDENT_2: we should not do the runtime hashing.   {#1384}
[01:19:24] STUDENT_2: I was not able to understand why it was.   {#1385}
[01:19:28] TEACHER: There we are there.   {#1386}
[01:19:29] TEACHER: We cannot do it because if your query looks like this,   {#1387}
[01:19:32] TEACHER: select start from users where hash of email ID equal to something.   {#1388}
[01:19:36] STUDENT_1: Right.   {#1389}
[01:19:37] TEACHER: Now for your database to evaluate, which email ID it matches to,   {#1390}
[01:19:42] TEACHER: it would have to literally go through every single row.   {#1391}
[01:19:45] TEACHER: compute the hash of the email ID.   {#1392}
[01:19:47] TEACHER: See if it matches with the thing that you passed.   {#1393}
[01:19:49] TEACHER: That is a full table scan.   {#1394}
[01:19:52] STUDENT_2: Got it. Got it.   {#1395}
[01:19:53] STUDENT_2: And in the, in those queries also,   {#1396}
[01:19:55] STUDENT_2: when you are joining, you are joining on the user's ID.   {#1397}
[01:19:59] STUDENT_2: And then you are putting a where clause of hash is equals to this.   {#1398}
[01:20:04] STUDENT_2: So when we are joining on the user ID,   {#1399}
[01:20:06] TEACHER: why can't we just search basis on the user ID itself?   {#1400}
[01:20:09] TEACHER: Why do we need to do it?   {#1401}
[01:20:10] TEACHER: You can do it because the input that we are getting from the URL is the hash.   {#1402}
[01:20:15] TEACHER: That's the input that we are getting.   {#1403}
[01:20:17] TEACHER: Correct.   {#1404}
[01:20:18] TEACHER: But still we are not aware about the user ID then user ID is because the user is locked   {#1405}
[01:20:24] TEACHER: in is the joint key.   {#1406}
[01:20:25] TEACHER: Right.   {#1407}
[01:20:25] TEACHER: So that's what you are joining the two tables on.   {#1408}
[01:20:27] STUDENT_2: So that is our problem.   {#1409}
[01:20:29] STUDENT_2: We are getting the user ID.   {#1410}
[01:20:30] STUDENT_2: We are not aware about the user ID here or we don't need to get a user ID.   {#1411}
[01:20:33] TEACHER: Right.   {#1412}
[01:20:33] TEACHER: We don't need user ID.   {#1413}
[01:20:34] TEACHER: We just a joint criteria because it's a foreign key.   {#1414}
[01:20:39] TEACHER: This is just a joint criteria.   {#1415}
[01:20:42] TEACHER: Okay.   {#1416}
[01:20:42] STUDENT_4: Okay.   {#1417}
[01:20:42] STUDENT_4: Got it.   {#1418}
[01:20:43] TEACHER: This is not filtering.   {#1419}
[01:20:45] TEACHER: We are not filtering on the basis of this.   {#1420}
[01:20:47] TEACHER: It's just a join criteria.   {#1421}
[01:20:48] TEACHER: Here what is happening is we are filtering on this.   {#1422}
[01:20:51] TEACHER: So the first set of filter would be applied on this.   {#1423}
[01:20:53] TEACHER: Then the join would happen.   {#1424}
[01:20:54] TEACHER: It would filter, it would just narrow down.   {#1425}
[01:20:56] TEACHER: So it will be keep on narrowing down.   {#1426}
[01:20:57] TEACHER: First, a huge terror would happen on the hash of the user,   {#1427}
[01:21:00] TEACHER: from which you'll get just one row as candidate match from the users table,   {#1428}
[01:21:04] TEACHER: which would be joined on that one user ID to this photos table.   {#1429}
[01:21:10] TEACHER: From the photos table, it will match 10 photos uploaded,   {#1430}
[01:21:12] TEACHER: it will match 10 rows out of which,   {#1431}
[01:21:15] TEACHER: the buttons, it would return all the 10 rows here because we are making one is active out of the 10,   {#1432}
[01:21:20] TEACHER: it would filter out where which is active. So active photo, this is how your flow would happen   {#1433}
[01:21:24] TEACHER: and your SQL query or in most cases, your database query optimizer takes care of which one to evaluate   {#1434}
[01:21:31] TEACHER: first. Here it would do because it would find there is a unique key on user hash. This is the   {#1435}
[01:21:36] TEACHER: first thing that your SQL query evaluation. What is that? That evaluation tree that it creates,   {#1436}
[01:21:45] TEACHER: to be done as evaluate this.   {#1437}
[01:21:47] TEACHER: Then it would define the joint criteria.   {#1438}
[01:21:49] TEACHER: Then it would do that.   {#1439}
[01:21:50] TEACHER: This is basically called as predict.   {#1440}
[01:21:52] TEACHER: This is called as predicate pushed up.   {#1441}
[01:21:54] TEACHER: If you just Google that predicate pushed up   {#1442}
[01:21:56] TEACHER: is how a SQL query of SQL engines optimizes queries.   {#1443}
[01:22:00] TEACHER: So whatever you need at the bottom of the tree   {#1444}
[01:22:03] TEACHER: because a tree evaluates from the bottom to the top.   {#1445}
[01:22:05] TEACHER: So this is what would be evaluated.   {#1446}
[01:22:08] TEACHER: The first thing it would be at the bottom node   {#1447}
[01:22:11] TEACHER: at the leaf node of your evaluation tree   {#1448}
[01:22:12] TEACHER: and then the joint and then it goes up.   {#1449}
[01:22:15] STUDENT_2: Got it.   {#1450}
[01:22:16] STUDENT_2: And second question would be,   {#1451}
[01:22:18] STUDENT_2: so in the CDN,   {#1452}
[01:22:20] STUDENT_2: if you can go to the CDN diagram,   {#1453}
[01:22:22] STUDENT_2: there,   {#1454}
[01:22:23] STUDENT_2: how you are invalidating the cache   {#1455}
[01:22:24] STUDENT_2: when the image is updating?   {#1456}
[01:22:26] TEACHER: By making an API call to CDN.   {#1457}
[01:22:29] TEACHER: So CDN has APIs exposed.   {#1458}
[01:22:31] TEACHER: Cloudflare, Akamai,   {#1459}
[01:22:33] TEACHER: every CDN has APIs exposed   {#1460}
[01:22:34] TEACHER: to invalidate the cache.   {#1461}
[01:22:36] STUDENT_2: Got it.   {#1462}
[01:22:37] STUDENT_2: So whenever the new image is uploaded,   {#1463}
[01:22:39] STUDENT_2: you are invalidating the cache   {#1464}
[01:22:40] STUDENT_2: directly by calling the CDN.   {#1465}
[01:22:42] TEACHER: Correct.   {#1466}
[01:22:42] TEACHER: Synchronous.   {#1467}
[01:22:43] TEACHER: Yes.   {#1468}
[01:22:45] STUDENT_2: It's like when user is, so we are not depending on the TDL here.   {#1469}
[01:22:49] STUDENT_2: We are just invalidating the cache beforehand.   {#1470}
[01:22:52] TEACHER: Because user experience really matters over here that when the photo is changed,   {#1471}
[01:22:57] TEACHER: I want to immediately see the uploaded photo everywhere.   {#1472}
[01:23:00] STUDENT_4: Got it.   {#1473}
[01:23:00] STUDENT_4: Got it.   {#1474}
[01:23:01] STUDENT_4: That's right.   {#1475}
[01:23:01] TEACHER: Thank you.   {#1476}
[01:23:02] TEACHER: For richer user experience.   {#1477}
[01:23:05] TEACHER: Chandran Anubha, I'll take your question in some time.   {#1478}
[01:23:08] TEACHER: Let's cover a few parts of, by the way, this is what the next part was.   {#1479}
[01:23:12] TEACHER: possible optimizations adding active photo ID over here is covered anyways.   {#1480}
[01:23:16] TEACHER: What we'll do is we'll talk a bit about all demand image optimization   {#1481}
[01:23:20] TEACHER: and then we take questions and then we go on a break.   {#1482}
[01:23:23] TEACHER: So on demand image optimization as a problem statement is very interesting   {#1483}
[01:23:28] TEACHER: and very simple.   {#1484}
[01:23:29] TEACHER: Now that you know how CDN works, you know how Gravatar works,   {#1485}
[01:23:34] TEACHER: all demand image optimization becomes a piece of cake.   {#1486}
[01:23:37] TEACHER: Now let's assume that you have to optimize the images.   {#1487}
[01:23:44] TEACHER: SSHedon does not give you that feature.   {#1488}
[01:23:46] TEACHER: And you have to optimize the images, which means that on typical your Facebook,   {#1489}
[01:23:51] TEACHER: you see profile photo rendered this tiny, teeny dot, 16 cross section,   {#1490}
[01:23:55] TEACHER: 32 cross 32 pixels.   {#1491}
[01:23:56] TEACHER: But on other page, it is like 256 by 256.   {#1492}
[01:23:59] TEACHER: On some other page, it would be 512 by 512, something like that.   {#1493}
[01:24:02] TEACHER: So user can upload image in any resolution,   {#1494}
[01:24:06] TEACHER: the small one or the large one depending on what is requested.   {#1495}
[01:24:10] TEACHER: So now you want to build your own on-demand image optimization.   {#1496}
[01:24:15] TEACHER: This does not mean what we are not talking about is a I'll upload the image,   {#1497}
[01:24:19] TEACHER: I'll post it as a message and have a bunch of servers optimizing it   {#1498}
[01:24:22] TEACHER: and creating multiple variants of it.   {#1499}
[01:24:24] TEACHER: No, we are talking about on-demand image optimization.   {#1500}
[01:24:28] TEACHER: So now in case of on-demand image optimization,   {#1501}
[01:24:31] TEACHER: just like how CDN accepts query parameters,   {#1502}
[01:24:34] TEACHER: we would also accept query parameters like w equal to 32.   {#1503}
[01:24:38] TEACHER: It means that transform the image to a 32 plus 32 pixel, not 32, but 32 width image over here.   {#1504}
[01:24:45] TEACHER: For us to implement it in our gravatar use case, just extending the discussion.   {#1505}
[01:24:50] TEACHER: It is now very simple.   {#1506}
[01:24:52] TEACHER: What we do is just do this.   {#1507}
[01:24:55] TEACHER: We were anyway reading the URL.   {#1508}
[01:24:58] TEACHER: We check if the file exists on this or not.   {#1509}
[01:25:04] TEACHER: would be by bad.   {#1510}
[01:25:05] TEACHER: This is how your CDN flow would be   {#1511}
[01:25:06] TEACHER: where it reads the URL.   {#1512}
[01:25:08] TEACHER: If it has the file, it returns it.   {#1513}
[01:25:10] TEACHER: If not, it reads the file from the origin.   {#1514}
[01:25:12] TEACHER: In the origin, when this request comes to origin,   {#1515}
[01:25:15] TEACHER: this request comes to origin,   {#1516}
[01:25:18] TEACHER: what origin would do?   {#1517}
[01:25:19] TEACHER: Origin would go to S3, read the image.   {#1518}
[01:25:22] TEACHER: In that, it would then apply.transformation.pass   {#1519}
[01:25:25] TEACHER: as the query parameter and send it.   {#1520}
[01:25:27] TEACHER: This is where your libraries come in.   {#1521}
[01:25:30] TEACHER: Your image manipulation or image processing libraries come.   {#1522}
[01:25:35] TEACHER: like ImageMagick. This is the world's most popular image processing library out there.   {#1523}
[01:25:41] TEACHER: Python image library PIL has two bindings. One is native Python binding. Second is ImageMagick.   {#1524}
[01:25:46] TEACHER: ImageMagick is purely written in C++. Because it is written in C++ and almost every single   {#1525}
[01:25:51] TEACHER: language in the world has C++ bindings, which means that you can natively invoke C++ code   {#1526}
[01:25:56] TEACHER: in your preferred language. What you can do is you can actually just use ImageMagick   {#1527}
[01:26:04] TEACHER: APIs to manipulate the image.   {#1528}
[01:26:06] TEACHER: For example, resizing.   {#1529}
[01:26:07] TEACHER: It has a native resize function.   {#1530}
[01:26:09] TEACHER: Image.resize and you pass the new size.   {#1531}
[01:26:11] TEACHER: It would resize and create and give you an in-memory bytes of it.   {#1532}
[01:26:15] TEACHER: Just send it to the user.   {#1533}
[01:26:16] TEACHER: So that's the only thing that you have to do.   {#1534}
[01:26:18] TEACHER: That's the only thing that changes in the flow.   {#1535}
[01:26:21] TEACHER: So now, because you are writing your on-demand image optimization,   {#1536}
[01:26:26] TEACHER: whatever path you get in the query parameter,   {#1537}
[01:26:28] TEACHER: pass the transformation,   {#1538}
[01:26:29] TEACHER: whatever you would want to support,   {#1539}
[01:26:30] TEACHER: grayscale, resizing and whatnot.   {#1540}
[01:26:34] TEACHER: by the explanation, the request would come to our origin server   {#1541}
[01:26:37] TEACHER: with those exact query parameters.   {#1542}
[01:26:39] TEACHER: From that, you see, if you have the image, if not, you go to S3,   {#1543}
[01:26:43] TEACHER: read the image, right?   {#1544}
[01:26:44] TEACHER: From that you then use image magic as a library to resize the image   {#1545}
[01:26:47] TEACHER: and apply the transformations.   {#1546}
[01:26:49] TEACHER: And then you send it as a response.   {#1547}
[01:26:50] TEACHER: This is exactly what CDN also does.   {#1548}
[01:26:53] TEACHER: When we talk, when we spoke about it yesterday, CDN also does this.   {#1549}
[01:26:57] TEACHER: It gives a transformation as logic or transformation is query parameters.   {#1550}
[01:27:01] TEACHER: We are re-implementing the same thing.   {#1551}
[01:27:05] TEACHER: how do you scale the system this one thing always remember image processing encryption   {#1552}
[01:27:12] TEACHER: video processing these are all very heavy cpu based it's very cpu intensive uh uh workloads   {#1553}
[01:27:22] TEACHER: right so what you need is you need very large amount of cpu to get things done so   {#1554}
[01:27:29] TEACHER: So you throw money at your cloud provider, get bulky machines with large number of CPUs   {#1555}
[01:27:34] TEACHER: and done.   {#1556}
[01:27:35] TEACHER: This is what you do.   {#1557}
[01:27:36] TEACHER: Whenever you're doing on-demand, it's not asynchronous processing, it is on-demand processing.   {#1558}
[01:27:40] TEACHER: Whenever you're doing on-demand processing, you need to have bulky machines to do that   {#1559}
[01:27:44] TEACHER: because large number of CPUs, you can parallelize a lot of stuff and get things done very quickly.   {#1560}
[01:27:51] TEACHER: And this is purely how every single on-demand image optimization or on-demand XYZ processing   {#1561}
[01:27:57] TEACHER: is built.   {#1562}
[01:27:59] TEACHER: Nothing fancy over there.   {#1563}
[01:28:00] TEACHER: And because just to highlight it, one thing, it cannot be made async   {#1564}
[01:28:05] TEACHER: because this is a synchronous request.   {#1565}
[01:28:08] TEACHER: Where in right now, when you're given this URL, you're given this query   {#1566}
[01:28:11] TEACHER: parameter, you can say I'll do it processing async and send it to image.   {#1567}
[01:28:14] TEACHER: It's not like that.   {#1568}
[01:28:15] TEACHER: In when this URL is loaded, you have to write there and then send   {#1569}
[01:28:20] TEACHER: the response with 240 pixels image.   {#1570}
[01:28:23] TEACHER: So you cannot do it async.   {#1571}
[01:28:25] TEACHER: So what you do is when the request comes to your origin server, you   {#1572}
[01:28:29] TEACHER: the image and send it and here i'm assuming cdn does not give you this feature so if you are   {#1573}
[01:28:34] TEACHER: building your own cdn this is exactly how you do it cloudflare cloudflare or cloudinary one of them   {#1574}
[01:28:40] TEACHER: has a blog on it right they did exactly the same thing it's literally the shortest blog like one   {#1575}
[01:28:45] TEACHER: of the shortest blog i've read it literally said we use image magic library this and run on massive   {#1576}
[01:28:50] TEACHER: servers 30 32 cores or 64 cores or something like that right we just run on massive servers with   {#1577}
[01:28:56] TEACHER: this, this, this, and that, and we just scale the fleet depending on the   {#1578}
[01:28:59] TEACHER: requests that are coming in.   {#1579}
[01:29:00] TEACHER: Right.   {#1580}
[01:29:01] TEACHER: And we just scale it to a large amount.   {#1581}
[01:29:03] TEACHER: That's it.   {#1582}
[01:29:04] TEACHER: I read it like six or seven years back.   {#1583}
[01:29:05] TEACHER: I just recalled it.   {#1584}
[01:29:06] TEACHER: Right.   {#1585}
[01:29:07] TEACHER: That's it.   {#1586}
[01:29:08] TEACHER: That's all it's all about.   {#1587}
[01:29:09] TEACHER: So handling scale in today's day and age, especially in case of   {#1588}
[01:29:12] TEACHER: synchronous thing, that's no, no brain.   {#1589}
[01:29:15] TEACHER: It's just that you need large servers to handle that particular part.   {#1590}
[01:29:18] TEACHER: There is nothing magic when it comes to on demand image optimization.   {#1591}
[01:29:21] TEACHER: Our synchronous processing will talk seven, we'll talk in six weeks when we discuss video   {#1592}
[01:29:27] TEACHER: streaming a bit of it, right?   {#1593}
[01:29:29] TEACHER: You understand when you do a sync, this is what we talk about image processing synchronous   {#1594}
[01:29:33] TEACHER: on demand image optimization, right?   {#1595}
[01:29:36] TEACHER: So what you can do, trust me on this, build this.   {#1596}
[01:29:41] TEACHER: It's not really difficult.   {#1597}
[01:29:43] TEACHER: It's not very difficult.   {#1598}
[01:29:44] TEACHER: So the sequence in which we spoke until long from 9 AM to 10 30 AM, the sequence in which   {#1599}
[01:29:51] TEACHER: is exactly how take two days of your time   {#1600}
[01:29:55] TEACHER: and implement those exact same things,   {#1601}
[01:29:57] TEACHER: the exact same way, step by step,   {#1602}
[01:29:59] TEACHER: just one local prototype,   {#1603}
[01:30:01] TEACHER: just one local prototype   {#1604}
[01:30:02] TEACHER: and you will learn everything that you have to.   {#1605}
[01:30:05] TEACHER: You will never have any questions about CDNs,   {#1606}
[01:30:09] TEACHER: about image processing,   {#1607}
[01:30:10] TEACHER: about building this synchronous things,   {#1608}
[01:30:12] TEACHER: piece of thing, right?   {#1609}
[01:30:14] TEACHER: Just one, you're just one implementation.   {#1610}
[01:30:16] TEACHER: Right?   {#1611}
[01:30:17] TEACHER: Okay.   {#1612}
[01:30:18] TEACHER: There's nothing much to cover,   {#1613}
[01:30:19] TEACHER: to be honest, in image optimization,   {#1614}
[01:30:21] TEACHER: because it's all about having bulky servers to do that   {#1615}
[01:30:24] TEACHER: and auto scaling them depending on the requests that are coming in.   {#1616}
[01:30:27] TEACHER: Cloud providers give you those facilities anywhere out of the box.   {#1617}
[01:30:31] TEACHER: Very few chances that you and I would be working on a team   {#1618}
[01:30:34] TEACHER: that manages its own app.   {#1619}
[01:30:35] TEACHER: Typically, it is all abstracted out.   {#1620}
[01:30:37] TEACHER: So we typically don't worry about it in day and age.   {#1621}
[01:30:40] TEACHER: We focus more on things that matter.   {#1622}
[01:30:42] TEACHER: Okay.   {#1623}
[01:30:43] TEACHER: Any questions in general around anything that we covered   {#1624}
[01:30:46] TEACHER: from 9 a.m. to 10.30 a.m.?   {#1625}
[01:30:48] TEACHER: We'll take questions for five minutes and then we go on a break.   {#1626}
[01:30:52] TEACHER: You had a question.   {#1627}
[01:30:56] STUDENT_5: Here.   {#1628}
[01:30:58] STUDENT_5: Can you please go back to the page where we had those three update statements in a transaction?   {#1629}
[01:31:04] STUDENT_5: And we did an optimization with active photo ID.   {#1630}
[01:31:08] STUDENT_5: So my verification is that the new query after this active photo ID optimization,   {#1631}
[01:31:14] STUDENT_5: we get the active photo.   {#1632}
[01:31:16] STUDENT_5: So it should be select start from users where hash is equal to hash of email, right?   {#1633}
[01:31:22] TEACHER: Yeah, so that's the exact.   {#1634}
[01:31:24] TEACHER: So let me do that.   {#1635}
[01:31:28] TEACHER: Update users set active photo ID equal to something where hash is equal to something.   {#1636}
[01:31:46] TEACHER: Yes.   {#1637}
[01:31:47] STUDENT_5: Yeah.   {#1638}
[01:31:48] STUDENT_5: What I wanted to clarify.   {#1639}
[01:31:50] STUDENT_5: Thank you.   {#1640}
---- OWNED SEGMENTS END ----

CTX| [01:31:54] STUDENT_4: Yeah, I just wanted to check like whenever we have like requirements like this, should   {#1641}
CTX| [01:32:00] STUDENT_4: we have like Boolean variables like is active or should we generally store them as a type   {#1642}
CTX| [01:32:04] STUDENT_4: and enum as active because that gives us like more flexibility in terms of, you know, changing   {#1643}
CTX| [01:32:11] STUDENT_4: if something comes up in the future, right?   {#1644}
CTX| [01:32:15] TEACHER: So long as you're doing it with tiny int it's fine.   {#1645}
CTX| [01:32:18] TEACHER: So 8 byte integer if you are taking because boolean anyway takes 8 bytes to store the data.   {#1646}
CTX| [01:32:23] TEACHER: And 8 bytes is 1 byte, 8 bits, 8 bits, I wanted to say 8 bits.   {#1647}
CTX| [01:32:28] TEACHER: So you can go for enum and integer based enum that does it for you.   {#1648}
CTX| [01:32:33] TEACHER: There's also fine.   {#1649}
CTX| [01:32:35] TEACHER: And that gives you, as you said, that gives you flexibility on the fact that you can then   {#1650}
CTX| [01:32:40] TEACHER: add one more state.   {#1651}
CTX| [01:32:41] TEACHER: So active and active, you can add a third state if you want to.   {#1652}
CTX| [01:32:44] TEACHER: So that gives you that flexibility.   {#1653}
CTX| [01:32:48] TEACHER: But just go with a tiny end rather than a big one.   {#1654}
CTX| [01:32:51] TEACHER: Don't store string as is in the database.   {#1655}
