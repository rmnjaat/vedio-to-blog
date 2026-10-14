# chunk_08  OWNS 01:26:15 -> 01:39:09  (segments #1498-#1764, 2070 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:25:15] TEACHER: And then all the requests that are coming into that API server   {#1478}
CTX| [01:25:19] TEACHER: is just from index.   {#1479}
CTX| [01:25:20] TEACHER: It is checking the offset, going to that location,   {#1480}
CTX| [01:25:22] TEACHER: reading the meeting and sending it back to the user.   {#1481}
CTX| [01:25:24] TEACHER: Now here what would happen is the old data file,   {#1482}
CTX| [01:25:27] TEACHER: it had that index.   {#1483}
CTX| [01:25:29] TEACHER: Index was read from that particular thing.   {#1484}
CTX| [01:25:32] TEACHER: API server has this loaded in memory.   {#1485}
CTX| [01:25:35] TEACHER: So Apple is let's say offset 100 with byte 1024.   {#1486}
CTX| [01:25:40] TEACHER: This is there.   {#1487}
CTX| [01:25:42] TEACHER: You uploaded a new file, assuming everything went well,   {#1488}
CTX| [01:25:45] TEACHER: uploaded a new file at the exact same location.   {#1489}
CTX| [01:25:48] TEACHER: Now if someone queries Apple,   {#1490}
CTX| [01:25:51] TEACHER: it will go to byte offset 100 and read 1024 bytes,   {#1491}
CTX| [01:25:56] TEACHER: which might be some other random word,   {#1492}
CTX| [01:25:58] TEACHER: like the word before Apple,   {#1493}
CTX| [01:26:00] TEACHER: that too starting in the middle or somewhere.   {#1494}
CTX| [01:26:02] TEACHER: So what user would see is some garbage.   {#1495}
CTX| [01:26:06] TEACHER: Because the real offset of Apple in this new file,   {#1496}
CTX| [01:26:09] TEACHER: which is uploaded at the same path, is different.   {#1497}

---- OWNED SEGMENTS START ----
[01:26:15] TEACHER: So when you upload it to the same path on S3, you have to immediately tell API servers   {#1498}
[01:26:21] TEACHER: to reload their index.   {#1499}
[01:26:22] TEACHER: But for that duration, your users will see garbage data.   {#1500}
[01:26:29] TEACHER: Very poor user experience.   {#1501}
[01:26:30] TEACHER: Right?   {#1502}
[01:26:31] TEACHER: Okay.   {#1503}
[01:26:32] TEACHER: So these are the things that I'm basically trying to prove you on.   {#1504}
[01:26:36] TEACHER: Think of these lines.   {#1505}
[01:26:38] TEACHER: So that is one problem.   {#1506}
[01:26:39] TEACHER: Now you would think, hey, let me, so uploading to the same path on S3, this is one of the   {#1507}
[01:26:46] TEACHER: problems.   {#1508}
[01:26:47] TEACHER: So now it looks like it makes sense for us to upload it to a new path.   {#1509}
[01:26:50] TEACHER: Now when we do it, when we upload it to a new path, what would happen?   {#1510}
[01:26:54] TEACHER: I'm just going back to brainstorm.   {#1511}
[01:26:57] TEACHER: So now let's say we uploaded to a new path on S3.   {#1512}
[01:26:59] TEACHER: Let's say my path one on S3 was S3 colon slash slash word dictionary slash dictionary one dot dictionary something.   {#1513}
[01:27:10] TEACHER: Right.   {#1514}
[01:27:10] TEACHER: Let's say this was first path.   {#1515}
[01:27:12] TEACHER: Now let's say when you upload this, you upload it to the new path.   {#1516}
[01:27:15] TEACHER: S3 colon slash slash word dictionary.   {#1517}
[01:27:18] TEACHER: And now it is dictionary two dot dictionary.   {#1518}
[01:27:20] TEACHER: Now how do you tell API servers that this is the new path you should start serving?   {#1519}
[01:27:25] TEACHER: How do you communicate this?   {#1520}
[01:27:26] TEACHER: Got it?   {#1521}
[01:27:31] STUDENT_1: Rather than this, what we can try for is rather than dict2.dict, we can have wd1.1 slash the   {#1522}
[01:27:40] STUDENT_1: path.   {#1523}
[01:27:42] STUDENT_1: I mean, we can have the IP address.   {#1524}
[01:27:44] TEACHER: What difference does it mean?   {#1525}
[01:27:44] TEACHER: And then the path has changed, right?   {#1526}
[01:27:46] TEACHER: Yeah.   {#1527}
[01:27:48] TEACHER: Right.   {#1528}
[01:27:48] TEACHER: You have to convey this path, whatever path is, you have to convey this to the API server   {#1529}
[01:27:52] TEACHER: that this is the new path that you need to reload.   {#1530}
[01:27:55] TEACHER: Right.   {#1531}
[01:27:56] TEACHER: How do you tell this to API servers?   {#1532}
[01:27:59] STUDENT_1: their cache.   {#1533}
[01:28:00] STUDENT_1: How?   {#1534}
[01:28:03] STUDENT_1: An interrupt or let's say a command which invalidates the cache.   {#1535}
[01:28:08] STUDENT_1: Everyone would have to tell API servers to do this.   {#1536}
[01:28:11] TEACHER: Like for ping all API servers to invalidate the cache.   {#1537}
[01:28:14] TEACHER: Sounds too complex.   {#1538}
[01:28:15] TEACHER: Isn't it?   {#1539}
[01:28:18] STUDENT_1: So, uh, since we know what time our job will be running, can't we have   {#1540}
[01:28:23] STUDENT_1: That's unreliable.   {#1541}
[01:28:24] STUDENT_1: What if upload fails?   {#1542}
[01:28:27] STUDENT_1: And what if you're not able to successfully do that?   {#1543}
[01:28:30] STUDENT_1: Right?   {#1544}
[01:28:31] STUDENT_1: No.   {#1545}
[01:28:32] STUDENT_1: So what?   {#1546}
[01:28:33] STUDENT_1: What's the harm in that?   {#1547}
[01:28:33] STUDENT_1: Because API servers won't be taking the index from the cache.   {#1548}
[01:28:37] STUDENT_1: It would be going to S3.   {#1549}
[01:28:38] STUDENT_1: It's simply adding the latency, but not at the harm of anything else.   {#1550}
[01:28:45] TEACHER: Why not?   {#1551}
[01:28:46] TEACHER: What if your upload failed completely?   {#1552}
[01:28:48] TEACHER: What if your file was corrupt?   {#1553}
[01:28:49] TEACHER: You didn't check a lot of stuff there.   {#1554}
[01:28:51] TEACHER: Right?   {#1555}
[01:28:52] TEACHER: Because if you do a cron job, no matter what, Sunday at 1 PM, everyone update.   {#1556}
[01:28:58] TEACHER: What if your job ran beyond 1 PM?   {#1557}
[01:29:00] TEACHER: The upload was not handy.   {#1558}
[01:29:02] TEACHER: Now what?   {#1559}
[01:29:03] TEACHER: What if the file that was uploaded was corrupt?   {#1560}
[01:29:05] TEACHER: What if you didn't get time to validate?   {#1561}
[01:29:07] TEACHER: Because now this is an independent mind over here.   {#1562}
[01:29:10] TEACHER: And no matter what, that would run and update it.   {#1563}
[01:29:13] TEACHER: That's wrong.   {#1564}
[01:29:15] TEACHER: Yeah.   {#1565}
[01:29:19] STUDENT_2: No idea beyond that.   {#1566}
[01:29:20] TEACHER: Yeah.   {#1567}
[01:29:22] TEACHER: Okay.   {#1568}
[01:29:22] TEACHER: Uh, yes, Abdur, what will you do?   {#1569}
[01:29:25] STUDENT_8: Um, well, I, I came, uh, in the middle where we, uh, were already set up the   {#1570}
[01:29:31] STUDENT_8: API servers, but, um, I had an idea.   {#1571}
[01:29:36] STUDENT_8: What if we had the each word in, in one file?   {#1572}
[01:29:40] TEACHER: No, we, then we kill portability.   {#1573}
[01:29:42] TEACHER: That's why we are not having each word in one file.   {#1574}
[01:29:44] STUDENT_8: Okay.   {#1575}
[01:29:45] STUDENT_8: Okay.   {#1576}
[01:29:45] STUDENT_8: So I, that was.   {#1577}
[01:29:46] STUDENT_8: Yeah.   {#1578}
[01:29:47] STUDENT_8: Yeah.   {#1579}
[01:29:48] TEACHER: That was a constraint that we're playing with.   {#1580}
[01:29:50] TEACHER: We want portability.   {#1581}
[01:29:52] STUDENT_8: having everything okay i don't have anything okay uh pankaj   {#1582}
[01:30:01] STUDENT_5: yeah so i was thinking that we can have some extra file which will have like a matter data   {#1583}
[01:30:10] STUDENT_5: uh yes that that's the same file again like it will be in s3 again   {#1584}
[01:30:16] STUDENT_5: a new file and file let's say once we know that we have updated our index   {#1585}
[01:30:24] STUDENT_5: updated the new file and uploaded it to s3 like the put request which will make in the success   {#1586}
[01:30:30] STUDENT_5: callback of that we can update this metadata perfect what our api servers will do is like   {#1587}
[01:30:36] STUDENT_5: they will keep on pulling this metadata let's say at some frequency like 5-10 minutes   {#1588}
[01:30:43] STUDENT_5: and they will see that my index path has updated.   {#1589}
[01:30:45] STUDENT_5: So they will start fetching it from the new file   {#1590}
[01:30:47] STUDENT_5: and update their in-memory index also.   {#1591}
[01:30:51] TEACHER: Okay.   {#1592}
[01:30:52] TEACHER: First question, will this path be static or will it be versioned?   {#1593}
[01:30:57] STUDENT_5: So the path of the metadata file will always be static.   {#1594}
[01:31:01] TEACHER: Perfect.   {#1595}
[01:31:01] TEACHER: Okay.   {#1596}
[01:31:01] TEACHER: So that everyone knows that this is the only path where we have to go.   {#1597}
[01:31:04] TEACHER: Okay.   {#1598}
[01:31:05] TEACHER: Perfect.   {#1599}
[01:31:05] TEACHER: Okay.   {#1600}
[01:31:06] TEACHER: Then you are saying that you pull the meta file at let's say 5 minutes, 10 minutes.   {#1601}
[01:31:10] TEACHER: Yeah.   {#1602}
[01:31:12] TEACHER: why would you do that given that your job runs weekly   {#1603}
[01:31:19] STUDENT_5: again the same issue right it's running weekly but we don't know like when it will   {#1604}
[01:31:24] STUDENT_5: get updated and when it is getting you know uploaded to s3 i mean it might happen that   {#1605}
[01:31:31] STUDENT_5: we received updates on sunday but because s3 was down we were not able to update it to the s3   {#1606}
[01:31:36] STUDENT_5: and we uploaded it on Monday.   {#1607}
[01:31:38] STUDENT_5: So then basically API server will not know   {#1608}
[01:31:44] STUDENT_5: that now I have to fetch it on Monday.   {#1609}
[01:31:45] STUDENT_5: So it needs to continuously poll to find out.   {#1610}
[01:31:49] STUDENT_5: Now my index is updated.   {#1611}
[01:31:50] STUDENT_5: So yeah.   {#1612}
[01:31:51] TEACHER: But we studied second week, third week   {#1613}
[01:31:54] TEACHER: that we can make things wherever we have poll,   {#1614}
[01:31:57] TEACHER: we can make things reactive.   {#1615}
[01:32:00] TEACHER: Right?   {#1616}
[01:32:01] TEACHER: So instead of polling,   {#1617}
[01:32:02] TEACHER: we can make things reactive   {#1618}
[01:32:06] TEACHER: Hey, go pull.   {#1619}
[01:32:07] TEACHER: Something has changed.   {#1620}
[01:32:09] TEACHER: Yeah.   {#1621}
[01:32:11] TEACHER: How do we go about it?   {#1622}
[01:32:14] TEACHER: Remember Redis Pubsub?   {#1623}
[01:32:16] TEACHER: Yeah.   {#1624}
[01:32:18] TEACHER: So we can use that Redis Pubsub.   {#1625}
[01:32:21] TEACHER: So all API servers subscribe to this.   {#1626}
[01:32:26] TEACHER: All API servers subscribe to Redis Pubsub and the new server that, sorry, I should have   {#1627}
[01:32:33] TEACHER: used a phone.   {#1628}
[01:32:36] TEACHER: And the new server that would be there, it would push an event into this Redis PubSub   {#1629}
[01:32:43] TEACHER: whenever it is done uploading.   {#1630}
[01:32:44] TEACHER: And now all servers can receive the updates.   {#1631}
[01:32:47] TEACHER: That makes things reactive instead of you polling it.   {#1632}
[01:32:50] TEACHER: So your update is happening once every week.   {#1633}
[01:32:53] TEACHER: Why would you poll 5,000 times before that?   {#1634}
[01:32:56] TEACHER: Unnecessary.   {#1635}
[01:32:57] TEACHER: Right?   {#1636}
[01:32:58] TEACHER: So we can make things reactive.   {#1637}
[01:33:00] TEACHER: But this seems too complex having another infrastructure component running   {#1638}
[01:33:03] TEACHER: and every API server is listening to this.   {#1639}
[01:33:06] STUDENT_5: this. Can we be smart about it? So I had one more thought. So that was to basically I was   {#1640}
[01:33:21] STUDENT_5: initially thinking that in the initial file we can upload in the header itself. We can   {#1641}
[01:33:25] STUDENT_5: have one key like let's say whether it's a latest one or not zero or one. And how would   {#1642}
[01:33:30] TEACHER: you know the latest one? You would never know it's the latest one or not. No. So when we   {#1643}
[01:33:36] STUDENT_5: file we can make the old files header to be latest equal to zero.   {#1644}
[01:33:40] STUDENT_5: But again, that required the API server to pull it and see that.   {#1645}
[01:33:47] TEACHER: So we had polling with changes with reactive. Can we do better than this? Because this requires   {#1646}
[01:33:52] TEACHER: another infra component and persistent connections over here to tell them something changed.   {#1647}
[01:33:57] TEACHER: It, I'll pull in.   {#1648}
[01:33:59] TEACHER: Yes, Amrita.   {#1649}
[01:34:02] STUDENT_3: So in the header, we were keeping a version.   {#1650}
[01:34:06] STUDENT_3: So maybe by indexing, we hold a reference to version and we see if the version is updated.   {#1651}
[01:34:11] STUDENT_3: We invalidate.   {#1652}
[01:34:12] STUDENT_5: But you're still polling for that.   {#1653}
[01:34:15] STUDENT_3: Like not exactly while polling, but when we receive a request and we hit on the indexing   {#1654}
[01:34:22] STUDENT_3: and then we check with the backend when we receive a request.   {#1655}
[01:34:26] TEACHER: but how would you know that something changed unless you poll it?   {#1656}
[01:34:32] STUDENT_10: Okay.   {#1657}
[01:34:37] TEACHER: This is very interesting, right?   {#1658}
[01:34:39] TEACHER: This is, this is what I want all of you to think about.   {#1659}
[01:34:41] TEACHER: Like, can we make it simpler, even more simpler than this?   {#1660}
[01:34:45] TEACHER: Because polling is good.   {#1661}
[01:34:46] TEACHER: I'm not against polling.   {#1662}
[01:34:47] TEACHER: It's just that why to waste, but like why to make 5,000 requests when you can, when you   {#1663}
[01:34:51] TEACHER: but someone can tell you or even someone can trigger something.   {#1664}
[01:34:55] TEACHER: That's a hit.   {#1665}
[01:34:56] TEACHER: Sidesh.   {#1666}
[01:34:59] STUDENT_2: Hey, Arpit.   {#1667}
[01:35:00] STUDENT_2: I would either expose a rest endpoint.   {#1668}
[01:35:05] TEACHER: That's like this.   {#1669}
[01:35:06] TEACHER: You're making it reactor.   {#1670}
[01:35:08] TEACHER: Same thing.   {#1671}
[01:35:08] TEACHER: You expose a rest endpoint and this server calls that.   {#1672}
[01:35:11] STUDENT_2: Yeah, basically because we'll have to do one server at a time, right?   {#1673}
[01:35:14] STUDENT_2: Like basically we are upgrading.   {#1674}
[01:35:18] STUDENT_2: So if we are upgrading, what we will do is,   {#1675}
[01:35:21] STUDENT_2: Like let's choose a API server, ask it, either send an event to it, which you can anyways   {#1676}
[01:35:30] STUDENT_2: do.   {#1677}
[01:35:31] STUDENT_2: Like basically whenever you have a job, first let all the servers register with you, like   {#1678}
[01:35:37] STUDENT_2: basically all the API servers.   {#1679}
[01:35:39] STUDENT_2: So you have a close connectivity with them and send an event.   {#1680}
[01:35:42] STUDENT_2: Like you may have during upgrade, you may have to send them multiple events, tightly   {#1681}
[01:35:45] STUDENT_2: connect.   {#1682}
[01:35:46] STUDENT_2: Now you send the first event wherever you're doing with an API server.   {#1683}
[01:35:51] STUDENT_2: Now, once you send that, that server is going to, so I have two ideas.   {#1684}
[01:35:56] STUDENT_2: Let's go with a simple idea.   {#1685}
[01:35:57] STUDENT_2: First, you have to collect the index, give it the path and create, read that path, create   {#1686}
[01:36:03] STUDENT_2: the index.   {#1687}
[01:36:03] TEACHER: You have meta JSON all now.   {#1688}
[01:36:05] TEACHER: Why would you want to create a path and tell it to the server?   {#1689}
[01:36:08] STUDENT_2: Yeah, that's fine.   {#1690}
[01:36:09] STUDENT_2: Yeah.   {#1691}
[01:36:10] STUDENT_2: You have a meta JSON, just read the path.   {#1692}
[01:36:11] STUDENT_2: But the point is you'll have to first create indexes in memory.   {#1693}
[01:36:16] STUDENT_2: Okay.   {#1694}
[01:36:16] TEACHER: So the API servers would need to load it.   {#1695}
[01:36:18] TEACHER: Yeah.   {#1696}
[01:36:18] TEACHER: That's a normal stage.   {#1697}
[01:36:20] STUDENT_2: Yeah.   {#1698}
[01:36:20] STUDENT_2: Now you will create it.   {#1699}
[01:36:22] STUDENT_2: You will test the API server and everything is fine.   {#1700}
[01:36:25] STUDENT_2: And then you will basically tell your load balancer that this,   {#1701}
[01:36:30] STUDENT_2: like basically if you either give a new port to it   {#1702}
[01:36:33] STUDENT_2: so that that API server changes the port   {#1703}
[01:36:35] STUDENT_2: and the load balancer knows it.   {#1704}
[01:36:37] STUDENT_2: So basically...   {#1705}
[01:36:38] STUDENT_2: Complex, complex, complex, complex, complex, complex.   {#1706}
[01:36:42] TEACHER: You are trying to change port of the servers and this and that.   {#1707}
[01:36:45] TEACHER: This can be done in a very simple way.   {#1708}
[01:36:48] TEACHER: Very simple way.   {#1709}
[01:36:51] TEACHER: I'm see, I'm not against your approach.   {#1710}
[01:36:53] TEACHER: I'm not, I'm just trying to make it utter simple, like something that   {#1711}
[01:36:59] TEACHER: anyone would be able to understand.   {#1712}
[01:37:01] TEACHER: And because that's where the simplicity, like that's where the   {#1713}
[01:37:04] TEACHER: beauty of system design lies.   {#1714}
[01:37:05] TEACHER: Right.   {#1715}
[01:37:06] TEACHER: Okay.   {#1716}
[01:37:06] TEACHER: Let me give a hint so that we can converge a little faster.   {#1717}
[01:37:09] TEACHER: The hint is that given that we now have a static file, meta.json, which contains the   {#1718}
[01:37:16] TEACHER: path of the dictionary that needs to be served, we want all of the servers to read this new   {#1719}
[01:37:24] TEACHER: meta.json file.   {#1720}
[01:37:25] TEACHER: But if you think about it, what happens when this API server boots up?   {#1721}
[01:37:30] TEACHER: When this API server boots up, it by default reads this meta.json file, sees the path,   {#1722}
[01:37:39] TEACHER: reads the dictionary, builds the index and starts serving it.   {#1723}
[01:37:43] TEACHER: So this is literally like a boot up of this API server,   {#1724}
[01:37:47] TEACHER: because that's exactly what it would do.   {#1725}
[01:37:48] TEACHER: So what you're doing is when you're updating this and updating this path,   {#1726}
[01:37:52] TEACHER: you have to trigger a reload of this API server.   {#1727}
[01:37:58] TEACHER: This is the hint.   {#1728}
[01:38:01] TEACHER: Can we do something about it?   {#1729}
[01:38:03] TEACHER: Rahul?   {#1730}
[01:38:05] STUDENT_4: So basically what I was thinking was basically like we can upload to our same path.   {#1731}
[01:38:10] STUDENT_4: Posting.   {#1732}
[01:38:11] TEACHER: No, you cannot upload to the same path.   {#1733}
[01:38:12] TEACHER: That's the wrong thing.   {#1734}
[01:38:14] TEACHER: That we conversion.   {#1735}
[01:38:16] STUDENT_4: Just a second.   {#1736}
[01:38:17] STUDENT_4: Just a second.   {#1737}
[01:38:17] STUDENT_4: Okay.   {#1738}
[01:38:18] STUDENT_4: We can upload to our same path and like there needs to be versioning enabled.   {#1739}
[01:38:23] TEACHER: You are going into S3 specific, right?   {#1740}
[01:38:26] STUDENT_4: That versioning enabled and whatnot.   {#1741}
[01:38:28] STUDENT_4: Any back, like anything that supports backup.   {#1742}
[01:38:33] STUDENT_4: will support versioning.   {#1743}
[01:38:34] TEACHER: Like that's exactly what we did with creating two files separate.   {#1744}
[01:38:38] TEACHER: Yeah.   {#1745}
[01:38:38] TEACHER: That's like,   {#1746}
[01:38:39] TEACHER: right.   {#1747}
[01:38:40] TEACHER: So I'm what I'm,   {#1748}
[01:38:41] TEACHER: I am saying this so that other don't get confused.   {#1749}
[01:38:43] TEACHER: That's fine.   {#1750}
[01:38:44] TEACHER: Right.   {#1751}
[01:38:45] STUDENT_4: Yeah.   {#1752}
[01:38:45] STUDENT_4: Okay.   {#1753}
[01:38:46] STUDENT_4: Let's just say like there is a matter dot Jason.   {#1754}
[01:38:48] STUDENT_4: Okay.   {#1755}
[01:38:49] STUDENT_4: So whenever like there is a update,   {#1756}
[01:38:51] STUDENT_4: we can just update matter dot Jason.   {#1757}
[01:38:53] STUDENT_4: Okay.   {#1758}
[01:38:55] STUDENT_4: And not only the parts we can also have,   {#1759}
[01:38:58] STUDENT_4: like a,   {#1760}
[01:38:59] STUDENT_4: we can also check matter dot Jason attributes,   {#1761}
[01:39:01] STUDENT_4: like a updated at,   {#1762}
[01:39:04] TEACHER: That is still polling.   {#1763}
[01:39:05] TEACHER: That is still polling.   {#1764}
---- OWNED SEGMENTS END ----

CTX| [01:39:09] STUDENT_4: We are doing it on like any request that we are like that we are having.   {#1765}
CTX| [01:39:13] STUDENT_4: Okay.   {#1766}
CTX| [01:39:15] TEACHER: But on every request made making a meta call to meta Jason file expensive.   {#1767}
CTX| [01:39:19] TEACHER: Why, why would you want to do that?   {#1768}
CTX| [01:39:20] TEACHER: That's still polling.   {#1769}
CTX| [01:39:21] STUDENT_4: Okay.   {#1770}
CTX| [01:39:22] STUDENT_4: Let's just say, okay, not meta.json.   {#1771}
CTX| [01:39:24] STUDENT_4: We can talk about like that, our dictionary file, the dictionary file that we are having,   {#1772}
CTX| [01:39:30] STUDENT_4: which shall, which is having all the entries.   {#1773}
CTX| [01:39:33] STUDENT_4: Okay. We can check like anyway, we are reading that file and whenever any request is coming.   {#1774}
CTX| [01:39:39] STUDENT_4: Okay. Before that we can just check updated at or anything like that tag.   {#1775}
CTX| [01:39:44] TEACHER: Like, no, you can't. That's what I said. That's what I said. Right. Because when you are reading   {#1776}
CTX| [01:39:50] TEACHER: that you would get garbage data, then you would make another read, reload the index and whatnot.   {#1777}
CTX| [01:39:54] STUDENT_4: Right. No, like not the garbage data I am talking about, like before, like reading the file itself   {#1778}
CTX| [01:40:02] STUDENT_4: before reading a file itself we are just checking like we have like any any file has like metadata   {#1779}
CTX| [01:40:08] STUDENT_4: like updated at created at and all of those things where is that stored so like   {#1780}
