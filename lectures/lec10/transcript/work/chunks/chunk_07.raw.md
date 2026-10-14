# chunk_07  OWNS 01:13:48 -> 01:26:15  (segments #1285-#1497, 2075 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:12:50] TEACHER: Yeah.   {#1264}
CTX| [01:12:50] STUDENT_2: Jodhinda, how would you solve this problem?   {#1265}
CTX| [01:12:53] STUDENT_3: Can we have sort of like graveyard entries, which sort of replace the   {#1266}
CTX| [01:12:57] STUDENT_3: currently existing entries there?   {#1267}
CTX| [01:12:59] STUDENT_3: For example, if we have a new meaning for Apple, we append it to the end of   {#1268}
CTX| [01:13:03] STUDENT_3: the file and the previous.   {#1269}
CTX| [01:13:04] TEACHER: No repetitive entries.   {#1270}
CTX| [01:13:07] STUDENT_3: Uh, okay.   {#1271}
CTX| [01:13:09] STUDENT_3: Well, okay.   {#1272}
CTX| [01:13:10] STUDENT_3: So I was thinking like you just, uh, sort of, uh, waste, waste, that space for some   {#1273}
CTX| [01:13:14] STUDENT_3: time and, uh, later run some sort of compaction process after.   {#1274}
CTX| [01:13:19] TEACHER: No, but we don't see it would work well when you are doing live updates.   {#1275}
CTX| [01:13:23] TEACHER: This is an even weekly update.   {#1276}
CTX| [01:13:24] TEACHER: So have it very clean up it directly.   {#1277}
CTX| [01:13:27] TEACHER: Right.   {#1278}
CTX| [01:13:27] STUDENT_2: Yeah.   {#1279}
CTX| [01:13:29] STUDENT_2: Uh, Shreya.   {#1280}
CTX| [01:13:33] STUDENT_9: Hello.   {#1281}
CTX| [01:13:34] STUDENT_9: Yeah.   {#1282}
CTX| [01:13:35] STUDENT_9: Um, yeah.   {#1283}
CTX| [01:13:36] STUDENT_9: approach would be to just a very naive approach would be to look for every word.   {#1284}

---- OWNED SEGMENTS START ----
[01:13:48] STUDENT_9: Get the byte where we are supposed to like enter it. And then so we what we are doing is we are   {#1285}
[01:13:55] STUDENT_9: creating a new file. Now, add that change in that file. And then append all the rest file to it.   {#1286}
[01:14:03] STUDENT_9: and then I mean it would be a very naive approach no no it's not naive it's not naive it's kind of   {#1287}
[01:14:09] TEACHER: like merge of merge sort correct yeah yeah and that's exactly why you should do it that's what   {#1288}
[01:14:14] TEACHER: the best approach is I'm not even kidding it's not a naive approach to be honest it's not a   {#1289}
[01:14:19] TEACHER: approach given the design that we have we're not using fancy b plus trees over here we're going   {#1290}
[01:14:23] TEACHER: with very simple approach but that's how it works right you think of a simple approach and that's   {#1291}
[01:14:29] TEACHER: what is going to be really efficient when you make things complex.   {#1292}
[01:14:32] TEACHER: It has its own set of disadvantages.   {#1293}
[01:14:34] TEACHER: Right.   {#1294}
[01:14:35] TEACHER: Okay.   {#1295}
[01:14:35] TEACHER: So this is why and the requirement to do that merge of merge sort to be to be efficient   {#1296}
[01:14:43] TEACHER: is that your file needs to be sorted.   {#1297}
[01:14:46] TEACHER: I'll just quickly walk you through on what this is all about.   {#1298}
[01:14:48] TEACHER: So what we'll do is we'll create a new file out of the existing file.   {#1299}
[01:14:54] TEACHER: How?   {#1300}
[01:14:55] TEACHER: By merging the two files.   {#1301}
[01:14:56] TEACHER: So we got a change log.   {#1302}
[01:14:59] TEACHER: will be a very short file.   {#1303}
[01:15:01] TEACHER: Assume it is sorted.   {#1304}
[01:15:02] TEACHER: Even if it is not sorted,   {#1305}
[01:15:04] TEACHER: you load it in memory,   {#1306}
[01:15:04] TEACHER: sort it and dump it   {#1307}
[01:15:05] TEACHER: because it's going to be very small.   {#1308}
[01:15:06] TEACHER: It is changelog.   {#1309}
[01:15:07] TEACHER: It's not going to be a gigantic file anyway.   {#1310}
[01:15:10] TEACHER: So that becomes your changelog.   {#1311}
[01:15:12] TEACHER: Then you have an entire dictionary   {#1312}
[01:15:13] TEACHER: that you just downloaded   {#1313}
[01:15:15] TEACHER: right now on that new server   {#1314}
[01:15:16] TEACHER: that you spin up.   {#1315}
[01:15:18] TEACHER: Now what do you do?   {#1316}
[01:15:19] TEACHER: This is sorted.   {#1317}
[01:15:20] TEACHER: This is sorted.   {#1318}
[01:15:22] TEACHER: You create a new dictionary out of this,   {#1319}
[01:15:24] TEACHER: a new file out of this   {#1320}
[01:15:25] TEACHER: by iterating the two,   {#1321}
[01:15:30] TEACHER: linked list problem, merge two linked list, merge two sorted linked list into third sorted,   {#1322}
[01:15:34] TEACHER: sorry, merge two sorted arrays into third new sorted array.   {#1323}
[01:15:38] TEACHER: This is that.   {#1324}
[01:15:39] TEACHER: This is merge of merge sorted.   {#1325}
[01:15:40] TEACHER: How you are merging two sorted arrays together is you have a pointer over here, you have   {#1326}
[01:15:46] TEACHER: a pointer over here.   {#1327}
[01:15:47] TEACHER: You iterate both files line by line.   {#1328}
[01:15:49] TEACHER: You see the first entry is AA'.   {#1329}
[01:15:51] TEACHER: So these are words and these are meanings.   {#1330}
[01:15:54] TEACHER: I'm just simplifying it over here.   {#1331}
[01:15:55] TEACHER: So these are not sections like A, B, C, D, but these are words.   {#1332}
[01:15:58] TEACHER: A, B, C, D, F, J.   {#1333}
[01:15:59] TEACHER: I just explain Karna, it's easy.   {#1334}
[01:16:02] TEACHER: So these are words, these are meanings.   {#1335}
[01:16:04] TEACHER: These are words, these are updated meanings.   {#1336}
[01:16:06] TEACHER: So what we do, we have two pointers.   {#1337}
[01:16:09] TEACHER: We iterate both the files line by line.   {#1338}
[01:16:12] TEACHER: And then we say it's A, A dash, C, C dash, A is small.   {#1339}
[01:16:15] TEACHER: I'll write A, A dash over here.   {#1340}
[01:16:17] TEACHER: Then I move this pointer down.   {#1341}
[01:16:19] TEACHER: B, B dash, C, C dash, B is small than C.   {#1342}
[01:16:22] TEACHER: I add B, B dash over here.   {#1343}
[01:16:24] TEACHER: I move this pointer over here.   {#1344}
[01:16:25] TEACHER: CC dash CC double dash.   {#1345}
[01:16:28] TEACHER: This is the updated one.   {#1346}
[01:16:29] TEACHER: Both matches.   {#1347}
[01:16:30] TEACHER: This is the updated one.   {#1348}
[01:16:31] TEACHER: So I write CC double dash.   {#1349}
[01:16:33] TEACHER: And I move both of them forward.   {#1350}
[01:16:35] TEACHER: Then DD dash EE dash.   {#1351}
[01:16:37] TEACHER: DD dash rotten over here.   {#1352}
[01:16:39] TEACHER: Because that is small one.   {#1353}
[01:16:40] TEACHER: Then FF dash EE dash.   {#1354}
[01:16:43] TEACHER: E small one.   {#1355}
[01:16:43] TEACHER: I write EE dash.   {#1356}
[01:16:45] TEACHER: And then move forward.   {#1357}
[01:16:46] TEACHER: FF dash FF double dash.   {#1358}
[01:16:48] TEACHER: I pick the updated meaning.   {#1359}
[01:16:49] TEACHER: Right over here.   {#1360}
[01:16:50] TEACHER: I completed my.   {#1361}
[01:16:52] TEACHER: I exhausted my change log.   {#1362}
[01:16:53] TEACHER: So every entry after this.   {#1363}
[01:16:56] TEACHER: A classic merge of merge sort.   {#1364}
[01:16:59] TEACHER: Nothing like merging two sorted arrays into third big sorted array.   {#1365}
[01:17:03] TEACHER: This is literally that.   {#1366}
[01:17:06] TEACHER: But here, one point, you don't have to load this entire file in memory.   {#1367}
[01:17:11] TEACHER: All them referring to merge of sorted array.   {#1368}
[01:17:14] TEACHER: Here you don't have to load it in an array.   {#1369}
[01:17:17] TEACHER: You are literally iterating file line by line and creating a third file out of it.   {#1370}
[01:17:23] TEACHER: Given that the way file IO works is when you write it may start to override the next line   {#1371}
[01:17:28] TEACHER: if you go beyond that range.   {#1372}
[01:17:30] TEACHER: You have to always ensure that you are creating new entries over there.   {#1373}
[01:17:34] TEACHER: So we created a new file from the existing dictionary plus the change law.   {#1374}
[01:17:42] TEACHER: Now this puts a constraint on us that because this dictionary is one terabyte big, this   {#1375}
[01:17:47] TEACHER: dictionary will also be one terabyte big.   {#1376}
[01:17:49] TEACHER: the disk of that server that we just pin up to run this job should be at least two terabyte at   {#1377}
[01:17:54] TEACHER: least two terabyte right but that is just one server that we are doing that right okay so this   {#1378}
[01:18:01] TEACHER: is what we will do to create a third file over here okay so let's say in this server itself   {#1379}
[01:18:10] TEACHER: Now we created the third file.   {#1380}
[01:18:15] TEACHER: This is the new file that we have.   {#1381}
[01:18:17] TEACHER: Now what?   {#1382}
[01:18:18] TEACHER: Now how would the changes that are there in this server go to S3   {#1383}
[01:18:24] TEACHER: and what could happen because of this?   {#1384}
[01:18:26] TEACHER: Hey, man.   {#1385}
[01:18:29] STUDENT_1: Okay.   {#1386}
[01:18:30] STUDENT_1: So now we have to start from, we have the merged file available.   {#1387}
[01:18:39] TEACHER: And now just a bit, which means that now that we have this, we also have headers,   {#1388}
[01:18:44] TEACHER: headers, index, all sorted for this file.   {#1389}
[01:18:47] TEACHER: So this is the new dictionary that we are ready to upload to S3.   {#1390}
[01:18:52] STUDENT_1: So now the critical path, critical thing is that we have to tell the clients who are using this   {#1391}
[01:19:00] STUDENT_1: thing that we have a new file from where they have to read it.   {#1392}
[01:19:04] STUDENT_1: So it's like you have to swap the existing file, which was supporting to this new file,   {#1393}
[01:19:12] STUDENT_1: considering this new file has previous data plus the data that came from change log.   {#1394}
[01:19:19] STUDENT_1: Correct.   {#1395}
[01:19:20] STUDENT_1: So what it means is we have to simply change the pointer.   {#1396}
[01:19:25] STUDENT_1: What looks like it will have a downturn because the time and you will say, okay, this is the   {#1397}
[01:19:31] STUDENT_1: URL that was available when you put a new S3 file, it will be a new URL.   {#1398}
[01:19:40] STUDENT_1: So the API service which were hitting NAS or anything where we are doing this thing,   {#1399}
[01:19:49] STUDENT_1: we have to figure it out a deployment process, how we have to upgrade.   {#1400}
[01:19:56] STUDENT_1: Now, the deployment process, which we know is either you simply say, I will change everything in one go.   {#1401}
[01:20:06] STUDENT_1: Or we have to say a rolling upgrade, we will say, okay, I will change few of the files in few places, but it is a single place.   {#1402}
[01:20:15] STUDENT_1: So I don't think that that kind of a deployment will work.   {#1403}
[01:20:20] STUDENT_1: what it looks like a completely A to B where you are there,   {#1404}
[01:20:28] STUDENT_1: you can have the new file updated, having a new S3 URL created.   {#1405}
[01:20:35] STUDENT_1: And once it is ready, this has to be given to the API servers   {#1406}
[01:20:42] STUDENT_1: saying this is the new URL or new address you have to consume it.   {#1407}
[01:20:51] STUDENT_1: Now, API server has to change that point and they can do the normal deployment either they   {#1408}
[01:20:59] STUDENT_1: can do a first a canary where one server only does a change and sees everything working   {#1409}
[01:21:04] STUDENT_1: fine and then only moves to others.   {#1410}
[01:21:08] STUDENT_1: I think these are all things I am getting in my mind to solve it.   {#1411}
[01:21:12] TEACHER: Okay.   {#1412}
[01:21:13] TEACHER: Let me prove you on this one point.   {#1413}
[01:21:14] TEACHER: Why do you want to upload it to a new S3 path?   {#1414}
[01:21:16] TEACHER: What would happen if you upload to the same path?   {#1415}
[01:21:19] TEACHER: Won't it simplify your solution?   {#1416}
[01:21:23] STUDENT_1: Okay.   {#1417}
[01:21:24] STUDENT_1: Then for the time when we are uploading,   {#1418}
[01:21:28] STUDENT_1: I mean the short period of time,   {#1419}
[01:21:31] STUDENT_1: maybe we are not able to serve it.   {#1420}
[01:21:33] STUDENT_1: I do not know how S3 internally works.   {#1421}
[01:21:36] TEACHER: So let's say you updated the file at the same location   {#1422}
[01:21:39] TEACHER: because the things that were making your system complex   {#1423}
[01:21:43] TEACHER: were where you were adding it to a new path.   {#1424}
[01:21:45] TEACHER: Then you have to tell API servers to go and update a configuration   {#1425}
[01:21:48] TEACHER: whatnot, right?   {#1426}
[01:21:49] TEACHER: What if you have graduated to the same path?   {#1427}
[01:21:52] TEACHER: What could go wrong?   {#1428}
[01:21:54] STUDENT_1: Yeah.   {#1429}
[01:21:54] STUDENT_1: So the first thing is always when you think about a deployment,   {#1430}
[01:21:58] STUDENT_1: you need to think about the rollback part.   {#1431}
[01:22:00] STUDENT_1: You are going ahead.   {#1432}
[01:22:02] STUDENT_1: You need to worry about what will be the my process.   {#1433}
[01:22:05] STUDENT_1: If let's say that deployment fails.   {#1434}
[01:22:09] STUDENT_1: So if in a same path I'm changing and during the uploading of the file on network,   {#1435}
[01:22:15] STUDENT_1: let's say the file got corrupted or something like this.   {#1436}
[01:22:18] STUDENT_1: I have to proactively observe it using some observability monitoring and then immediately   {#1437}
[01:22:24] STUDENT_1: will provide it. Okay, go to the previous file only.   {#1438}
[01:22:29] STUDENT_1: And that can be one critical thing to take care.   {#1439}
[01:22:35] STUDENT_1: Other than that, I'm not able to think anything that we have to worry about, but definitely making sure that the transition,   {#1440}
[01:22:43] STUDENT_1: I mean, this file transfer goes properly.   {#1441}
[01:22:47] STUDENT_1: and if it does not goes we have to roll back and provide the previous file is necessary so having   {#1442}
[01:22:53] STUDENT_1: a temp file I mean having a temporary storage where you put this file and then upload it check   {#1443}
[01:23:00] STUDENT_1: it it is working fine and then then mark it successful that's that's an important thing I   {#1444}
[01:23:07] TEACHER: think required thanks thanks for adding all those points but now we see like you as it everyone now   {#1445}
[01:23:12] TEACHER: everyone sees that again, as I said, drawing boxes is easy.   {#1446}
[01:23:17] TEACHER: When you go into these details, this is where things become really interesting.   {#1447}
[01:23:21] TEACHER: We need to solve this problem where you are, where it's, it's easy for us to say,   {#1448}
[01:23:27] TEACHER: yeah, we'll just upload it on S3.   {#1449}
[01:23:29] TEACHER: Right.   {#1450}
[01:23:30] TEACHER: But where and how, and what challenges would be encounter, uh, will the   {#1451}
[01:23:35] TEACHER: transition be smooth enough?   {#1452}
[01:23:36] TEACHER: Are we serving garbage data to a user?   {#1453}
[01:23:38] TEACHER: These all details are super critical.   {#1454}
[01:23:42] TEACHER: an actual system which is i'm just proving you all to think on those lines it's already one and a half   {#1455}
[01:23:48] TEACHER: but it's still not convergence such the problem statement looks very simple i'm sure when we   {#1456}
[01:23:54] TEACHER: started with this is what kind of stupid problem statement is this but when we go into these   {#1457}
[01:23:59] TEACHER: details and again as i say these are all building blocks you can apply to other systems that you   {#1458}
[01:24:05] TEACHER: are designed it's not just it's just limited to this one system right so be very open to how you   {#1459}
[01:24:12] TEACHER: what problem we had and how we solved it.   {#1460}
[01:24:15] TEACHER: Okay, let me pull in.   {#1461}
[01:24:17] TEACHER: Okay, so but before I pull in the next person,   {#1462}
[01:24:22] TEACHER: let me just converge to what Heyman said in a simple order.   {#1463}
[01:24:27] TEACHER: So uploading to the same path on S3 had a lot of problems.   {#1464}
[01:24:34] TEACHER: First, what if upload fails?   {#1465}
[01:24:36] TEACHER: What if there is file corruption?   {#1466}
[01:24:38] TEACHER: When we are uploading to the same path on S3,   {#1467}
[01:24:42] TEACHER: One more challenge that now that the file that was uploaded onto the same path.   {#1468}
[01:24:48] TEACHER: Now we have to tell this server to reload the index.   {#1469}
[01:24:52] TEACHER: Why?   {#1470}
[01:24:52] TEACHER: Because offsets would be mismatched.   {#1471}
[01:24:55] TEACHER: I'll give a quick example for that.   {#1472}
[01:24:57] TEACHER: Where is it?   {#1473}
[01:24:58] TEACHER: This.   {#1474}
[01:24:59] TEACHER: So for example, if we upload it to the same path on S3, this is what is going to happen.   {#1475}
[01:25:05] TEACHER: So let's say in the index index is loaded in memory on the API server, right?   {#1476}
[01:25:12] TEACHER: first made call to S3 loaded the index already.   {#1477}
[01:25:15] TEACHER: And then all the requests that are coming into that API server   {#1478}
[01:25:19] TEACHER: is just from index.   {#1479}
[01:25:20] TEACHER: It is checking the offset, going to that location,   {#1480}
[01:25:22] TEACHER: reading the meeting and sending it back to the user.   {#1481}
[01:25:24] TEACHER: Now here what would happen is the old data file,   {#1482}
[01:25:27] TEACHER: it had that index.   {#1483}
[01:25:29] TEACHER: Index was read from that particular thing.   {#1484}
[01:25:32] TEACHER: API server has this loaded in memory.   {#1485}
[01:25:35] TEACHER: So Apple is let's say offset 100 with byte 1024.   {#1486}
[01:25:40] TEACHER: This is there.   {#1487}
[01:25:42] TEACHER: You uploaded a new file, assuming everything went well,   {#1488}
[01:25:45] TEACHER: uploaded a new file at the exact same location.   {#1489}
[01:25:48] TEACHER: Now if someone queries Apple,   {#1490}
[01:25:51] TEACHER: it will go to byte offset 100 and read 1024 bytes,   {#1491}
[01:25:56] TEACHER: which might be some other random word,   {#1492}
[01:25:58] TEACHER: like the word before Apple,   {#1493}
[01:26:00] TEACHER: that too starting in the middle or somewhere.   {#1494}
[01:26:02] TEACHER: So what user would see is some garbage.   {#1495}
[01:26:06] TEACHER: Because the real offset of Apple in this new file,   {#1496}
[01:26:09] TEACHER: which is uploaded at the same path, is different.   {#1497}
---- OWNED SEGMENTS END ----

CTX| [01:26:15] TEACHER: So when you upload it to the same path on S3, you have to immediately tell API servers   {#1498}
CTX| [01:26:21] TEACHER: to reload their index.   {#1499}
CTX| [01:26:22] TEACHER: But for that duration, your users will see garbage data.   {#1500}
CTX| [01:26:29] TEACHER: Very poor user experience.   {#1501}
CTX| [01:26:30] TEACHER: Right?   {#1502}
CTX| [01:26:31] TEACHER: Okay.   {#1503}
CTX| [01:26:32] TEACHER: So these are the things that I'm basically trying to prove you on.   {#1504}
CTX| [01:26:36] TEACHER: Think of these lines.   {#1505}
CTX| [01:26:38] TEACHER: So that is one problem.   {#1506}
CTX| [01:26:39] TEACHER: Now you would think, hey, let me, so uploading to the same path on S3, this is one of the   {#1507}
CTX| [01:26:46] TEACHER: problems.   {#1508}
CTX| [01:26:47] TEACHER: So now it looks like it makes sense for us to upload it to a new path.   {#1509}
CTX| [01:26:50] TEACHER: Now when we do it, when we upload it to a new path, what would happen?   {#1510}
CTX| [01:26:54] TEACHER: I'm just going back to brainstorm.   {#1511}
CTX| [01:26:57] TEACHER: So now let's say we uploaded to a new path on S3.   {#1512}
CTX| [01:26:59] TEACHER: Let's say my path one on S3 was S3 colon slash slash word dictionary slash dictionary one dot dictionary something.   {#1513}
CTX| [01:27:10] TEACHER: Right.   {#1514}
CTX| [01:27:10] TEACHER: Let's say this was first path.   {#1515}
CTX| [01:27:12] TEACHER: Now let's say when you upload this, you upload it to the new path.   {#1516}
