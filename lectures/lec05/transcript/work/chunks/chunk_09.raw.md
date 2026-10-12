# chunk_09  OWNS 01:39:05 -> 01:52:10  (segments #1499-#1753, 2059 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:38:05] TEACHER: then how big of a string would that be?   {#1479}
CTX| [01:38:07] TEACHER: So as a database engineer or as a database designer, you need to know how big your key would be.   {#1480}
CTX| [01:38:14] TEACHER: So let's say you pick where can I say 16.   {#1481}
CTX| [01:38:17] TEACHER: I'm picking a smaller size.   {#1482}
CTX| [01:38:18] TEACHER: You might go for 24, 30 to 60.   {#1483}
CTX| [01:38:21] STUDENT_1: Based on the requirements.   {#1484}
CTX| [01:38:22] STUDENT_1: Based on the requirements.   {#1485}
CTX| [01:38:23] TEACHER: But once you fix it, you cannot change it.   {#1486}
CTX| [01:38:26] TEACHER: So ensure that you are, you like, whenever you are designing a database, you know your requirements really well.   {#1487}
CTX| [01:38:33] TEACHER: Okay.   {#1488}
CTX| [01:38:34] TEACHER: What's the type of the value?   {#1489}
CTX| [01:38:35] TEACHER: You said string.   {#1490}
CTX| [01:38:36] STUDENT_1: Yeah.   {#1491}
CTX| [01:38:37] STUDENT_1: the string, like if we are storing Jason in that, it depends like what we are storing.   {#1492}
CTX| [01:38:42] STUDENT_1: Okay.   {#1493}
CTX| [01:38:43] STUDENT_1: If we are like storing some values, simple values, then we can, we can use integer.   {#1494}
CTX| [01:38:48] STUDENT_1: But like, if you are storing Jason objects or something like that, we will need a bigger,   {#1495}
CTX| [01:38:53] STUDENT_1: bigger string, more than 200, 300 words, maybe.   {#1496}
CTX| [01:38:57] STUDENT_1: So yeah, it actually depends on the use case.   {#1497}
CTX| [01:39:00] TEACHER: No, but then you have to pick something that works for all.   {#1498}

---- OWNED SEGMENTS START ----
[01:39:05] STUDENT_1: I guess   {#1499}
[01:39:07] STUDENT_1: or this also I will choose   {#1500}
[01:39:08] STUDENT_1: worker but I guess   {#1501}
[01:39:11] STUDENT_8: instead   {#1502}
[01:39:12] STUDENT_8: pick block   {#1503}
[01:39:14] STUDENT_1: by very large objects   {#1504}
[01:39:16] TEACHER: you can literally store anything in that   {#1505}
[01:39:18] TEACHER: now what you said is   {#1506}
[01:39:20] TEACHER: partially true what you said it depends on   {#1507}
[01:39:22] TEACHER: what we are storing no it does not depend   {#1508}
[01:39:24] TEACHER: on what we are storing but how we   {#1509}
[01:39:26] TEACHER: are accessing it   {#1510}
[01:39:28] TEACHER: for example in   {#1511}
[01:39:30] TEACHER: MongoDB   {#1512}
[01:39:31] TEACHER: MongoDB is also key value store.   {#1513}
[01:39:34] TEACHER: So in MongoDB, when you are storing, you are storing JSONs   {#1514}
[01:39:38] TEACHER: and you are allowed to query on that.   {#1515}
[01:39:43] TEACHER: So let's say you have some row ID and then against which you store a JSON   {#1516}
[01:39:46] TEACHER: and if you are allowed to query on a particular attribute within that JSON,   {#1517}
[01:39:50] TEACHER: which means you need query capability within the value,   {#1518}
[01:39:54] TEACHER: then you need to have the copyright type over here.   {#1519}
[01:39:57] TEACHER: But if you are just doing key-based accesses,   {#1520}
[01:40:01] TEACHER: you are not querying within the value.   {#1521}
[01:40:03] TEACHER: For example, if you would have stored value as IKT,   {#1522}
[01:40:06] TEACHER: then you can do range queries on that if you want to.   {#1523}
[01:40:08] TEACHER: But if you are not allowing that,   {#1524}
[01:40:11] TEACHER: so depending on how you are allowing your users   {#1525}
[01:40:14] TEACHER: to access the value or query the value,   {#1526}
[01:40:17] TEACHER: if they are even allowed to do so,   {#1527}
[01:40:19] TEACHER: that would determine the type of.   {#1528}
[01:40:22] STUDENT_1: So if we are doing the case you just said,   {#1529}
[01:40:27] STUDENT_1: Like we are querying the JSON inside that,   {#1530}
[01:40:32] TEACHER: so then this wouldn't work.   {#1531}
[01:40:33] TEACHER: Then you would not go for blob.   {#1532}
[01:40:34] TEACHER: You would go for a type that supports that.   {#1533}
[01:40:36] TEACHER: For example, JSON plugin of mysql   {#1534}
[01:40:38] TEACHER: or now it is natively supported.   {#1535}
[01:40:39] STUDENT_1: I will just like, I will just create   {#1536}
[01:40:42] STUDENT_1: rows of that type, like which would be   {#1537}
[01:40:45] STUDENT_1: multiple.   {#1538}
[01:40:46] TEACHER: You can implement it however you want.   {#1539}
[01:40:47] TEACHER: But the idea is depending.   {#1540}
[01:40:48] TEACHER: So here, because we are building this key value store,   {#1541}
[01:40:51] TEACHER: we would remain as well that a query would be on key   {#1542}
[01:40:54] TEACHER: and not the value.   {#1543}
[01:40:57] TEACHER: just use a block that would allow us to store any type of objects there or even basically   {#1544}
[01:41:03] TEACHER: where it would do or long text would do but idea is that we are not penetrating within the value to   {#1545}
[01:41:08] TEACHER: support some functionality like we are just using values as black box okay okay so that said so   {#1546}
[01:41:15] TEACHER: that's good enough schema to start with now apart from that look at this option i'll pull it sandeep   {#1547}
[01:41:22] TEACHER: Sandeep, we want to implement insert, we'll add it, update, we'll update it, TTL.   {#1548}
[01:41:29] TEACHER: So any other column that you would need over here?   {#1549}
[01:41:33] STUDENT_1: The naive approach would be to have another column that will specify the time where the start time or when the insert a time.   {#1550}
[01:41:44] STUDENT_1: And accordingly, we can have another job that will check this time and accordingly it will flush it out.   {#1551}
[01:41:49] TEACHER: Wait, wait, wait.   {#1552}
[01:41:50] TEACHER: So you are adding a created add?   {#1553}
[01:41:52] STUDENT_1: Yes, that's correct.   {#1554}
[01:41:54] TEACHER: Okay.   {#1555}
[01:41:55] TEACHER: And then?   {#1556}
[01:41:56] STUDENT_1: Yeah.   {#1557}
[01:41:57] STUDENT_1: So this created at, uh, based on the created at, we can deduce how much time it can live.   {#1558}
[01:42:02] STUDENT_1: For example, if my Ttl is key specific.   {#1559}
[01:42:05] TEACHER: So every key will have, can have a separate Ttl.   {#1560}
[01:42:09] STUDENT_1: Okay.   {#1561}
[01:42:10] STUDENT_1: Then in that case, I don't think, uh, then we need to have another column, right?   {#1562}
[01:42:16] STUDENT_1: Because now it is key specific.   {#1563}
[01:42:17] STUDENT_1: We need to have created at and the Ttl together.   {#1564}
[01:42:20] TEACHER: Okay.   {#1565}
[01:42:22] TEACHER: you'll store yes okay so let's say we operate a granularity of seconds okay and then we should   {#1566}
[01:42:28] STUDENT_1: also have another job that is running in this particular in in this particular key value store   {#1567}
[01:42:34] STUDENT_1: that checks uh it would take created at plus tt uh plus ttl second should be less than the   {#1568}
[01:42:41] STUDENT_1: current time what will the query look like my query okay mike uh can i say it in plain english   {#1569}
[01:42:52] STUDENT_1: delete something something yeah so delete key if current time minus created at   {#1570}
[01:43:02] STUDENT_1: if current time minus created at is greater than or equal to ttl is actually equal to ttl   {#1571}
[01:43:12] TEACHER: actually not even greater than why not equal to his worst source your job did not try yeah yeah   {#1572}
[01:43:20] STUDENT_1: I think this should be some job of, you know, clearing out records.   {#1573}
[01:43:25] TEACHER: This is the worst query that you can write.   {#1574}
[01:43:28] TEACHER: Why?   {#1575}
[01:43:29] TEACHER: Tell me this.   {#1576}
[01:43:34] STUDENT_1: Because you're scanning through each and every row.   {#1577}
[01:43:38] TEACHER: Exactly.   {#1578}
[01:43:39] TEACHER: You cannot leverage index because this is a dynamic computation.   {#1579}
[01:43:45] TEACHER: Correct?   {#1580}
[01:43:48] TEACHER: you do this subtraction you would never know it is greater than or less than ttl or not   {#1581}
[01:43:53] TEACHER: so you would have to literally go through every single row every single time and then delete it   {#1582}
[01:43:58] STUDENT_1: so what's a better way to decide uh maybe we see the better way would be we see the problem   {#1583}
[01:44:06] STUDENT_1: is that computation right so what if we get rid of the computation and you can somehow figure out   {#1584}
[01:44:11] STUDENT_1: that this has crossed your TTL.   {#1585}
[01:44:13] TEACHER: So how?   {#1586}
[01:44:15] STUDENT_1: Yeah, so that means we need to have a mechanism   {#1587}
[01:44:19] STUDENT_1: that will tell me that this is expired.   {#1588}
[01:44:25] STUDENT_1: So this particular entity has expired.   {#1589}
[01:44:27] STUDENT_1: So how do I get that?   {#1590}
[01:44:28] STUDENT_1: That's what I'm thinking.   {#1591}
[01:44:30] STUDENT_1: But do you have any pointers?   {#1592}
[01:44:34] STUDENT_1: Maybe I can segue into that.   {#1593}
[01:44:36] STUDENT_8: You don't need created add at all.   {#1594}
[01:44:39] STUDENT_1: but how do i know that uh but i but i also need to know from the measuring time right   {#1595}
[01:44:44] STUDENT_1: the start time from when it is inserted okay let me pull in someone else think about think   {#1596}
[01:44:51] TEACHER: about it you don't need created at all okay i'm just picking someone at random yes simran   {#1597}
[01:44:58] STUDENT_1: what would you do yeah i was thinking to add a valid tell rather than adding a created ad   {#1598}
[01:45:04] STUDENT_1: so we can have a separate table for TTL seconds and just add here the valid till time and based   {#1599}
[01:45:12] STUDENT_1: on that yeah and we can index on that and that would be faster than what we have currently   {#1600}
[01:45:19] TEACHER: till it store where expired at is greater than equal to TTL is greater than equal to the TTL   {#1601}
[01:45:27] TEACHER: Oh, sorry, not even DTL is greater than equal to now.   {#1602}
[01:45:31] TEACHER: Oh, sorry.   {#1603}
[01:45:34] TEACHER: Where expired at is less than equal to now.   {#1604}
[01:45:40] TEACHER: Right?   {#1605}
[01:45:40] TEACHER: So this way, all we can do is when we are storing the key, if, if let's say someone   {#1606}
[01:45:47] TEACHER: has specified a TTL to that key, instead of storing created at and TTL, we directly   {#1607}
[01:45:52] TEACHER: store the expired at time.   {#1608}
[01:45:54] TEACHER: Assuming we don't need created at in case you need to just store it.   {#1609}
[01:45:57] TEACHER: With this, you can just need one index on expadat and this becomes a really efficient   {#1610}
[01:46:02] TEACHER: query.   {#1611}
[01:46:03] TEACHER: Delete store where basically delete from store where expadat is less than equal to now.   {#1612}
[01:46:08] TEACHER: This would be really efficient operation.   {#1613}
[01:46:12] TEACHER: That being said, we have another operation called delete.   {#1614}
[01:46:15] TEACHER: How would you do delete?   {#1615}
[01:46:17] TEACHER: Jodhinder?   {#1616}
[01:46:20] STUDENT_4: Okay.   {#1617}
[01:46:21] STUDENT_4: So I didn't think about the delete one.   {#1618}
[01:46:22] STUDENT_4: I was sort of...   {#1619}
[01:46:24] STUDENT_4: Think about it.   {#1620}
[01:46:25] STUDENT_17: Brain stop.   {#1621}
[01:46:25] STUDENT_17: Think about it.   {#1622}
[01:46:27] STUDENT_4: can be like two ways. We can probably have a soft delete where we just mark it like as deleted.   {#1623}
[01:46:36] STUDENT_4: And we can run like sort of like a background job, which like deletes it because again, you'll need   {#1624}
[01:46:44] STUDENT_4: to probably like balance some internal data structures once you delete something. So yeah,   {#1625}
[01:46:52] STUDENT_4: So soft delete can be there.   {#1626}
[01:46:53] TEACHER: So soft delete, you'll add a column.   {#1627}
[01:46:56] STUDENT_4: Yeah.   {#1628}
[01:46:57] STUDENT_4: Or you can just maybe like change expired add to some negative value.   {#1629}
[01:47:03] TEACHER: Okay.   {#1630}
[01:47:04] TEACHER: Let's say I add a new column.   {#1631}
[01:47:06] TEACHER: What happens with that?   {#1632}
[01:47:07] TEACHER: Let's add is deleted.   {#1633}
[01:47:09] STUDENT_4: Yeah.   {#1634}
[01:47:10] STUDENT_4: So you can just set it to true and you could have another job that sort of runs periodically   {#1635}
[01:47:16] STUDENT_4: and clears out all these deleted rows.   {#1636}
[01:47:19] TEACHER: That would do delete from store where is deleted equal to true.   {#1637}
[01:47:27] STUDENT_16: Yeah.   {#1638}
[01:47:28] TEACHER: So now you have two background jobs to one that deletes.   {#1639}
[01:47:34] TEACHER: One that deletes the expired entries, another one that deletes the   {#1640}
[01:47:38] TEACHER: soft deleted ones.   {#1641}
[01:47:40] TEACHER: Now what you also said is you'd want to piggyback it on expired.   {#1642}
[01:47:45] TEACHER: Yeah.   {#1643}
[01:47:46] TEACHER: Okay.   {#1644}
[01:47:47] TEACHER: With this, what, what are you proposing?   {#1645}
[01:47:50] STUDENT_4: Yeah, just set it to some negative value, which would always be like smaller than time.now   {#1646}
[01:47:57] STUDENT_4: or something.   {#1647}
[01:47:58] TEACHER: So your delete is equal to update.   {#1648}
[01:48:01] TEACHER: So it will be like update store set expired ad.   {#1649}
[01:48:07] TEACHER: Yeah.   {#1650}
[01:48:08] TEACHER: Equal to minus one.   {#1651}
[01:48:09] TEACHER: Yeah.   {#1652}
[01:48:10] TEACHER: Where something, something, something, where key is equal to something.   {#1653}
[01:48:13] TEACHER: Yeah.   {#1654}
[01:48:13] TEACHER: What, what does this save us?   {#1655}
[01:48:15] TEACHER: This saves us from.   {#1656}
[01:48:18] STUDENT_4: Having two background jobs.   {#1657}
[01:48:20] STUDENT_4: Perfect.   {#1658}
[01:48:21] STUDENT_8: Now you just have one?   {#1659}
[01:48:23] STUDENT_8: You just have one.   {#1660}
[01:48:24] STUDENT_4: So like obviously CPU is being used less.   {#1661}
[01:48:28] STUDENT_4: And there's less load on the disk also.   {#1662}
[01:48:31] STUDENT_4: Less reads are happening.   {#1663}
[01:48:34] STUDENT_4: Yeah, I guess.   {#1664}
[01:48:36] STUDENT_4: And storage.   {#1665}
[01:48:37] STUDENT_4: Storage.   {#1666}
[01:48:37] STUDENT_4: Storage obviously, yeah.   {#1667}
[01:48:38] STUDENT_4: Storage obviously.   {#1668}
[01:48:41] STUDENT_4: And yeah, once you have the job also   {#1669}
[01:48:44] STUDENT_4: and you have to like probably implement it   {#1670}
[01:48:46] STUDENT_4: read path as well.   {#1671}
[01:48:48] STUDENT_4: That when you read something,   {#1672}
[01:48:49] STUDENT_4: if the job has not yet run,   {#1673}
[01:48:50] STUDENT_4: you probably want to filter there as well.   {#1674}
[01:48:51] STUDENT_4: That once you're reading,   {#1675}
[01:48:53] STUDENT_4: just check if the key is expired.   {#1676}
[01:48:55] STUDENT_4: It's possible that the job   {#1677}
[01:48:56] STUDENT_4: is not run at that point.   {#1678}
[01:48:57] TEACHER: Yeah, we'll, we'll, we'll,   {#1679}
[01:48:58] TEACHER: we'll, we'll, we'll,   {#1680}
[01:48:58] TEACHER: we'll, we'll, we'll, we'll,   {#1681}
[01:48:59] TEACHER: we'll, we'll come to that   {#1682}
[01:48:59] TEACHER: when we do get.   {#1683}
[01:49:00] TEACHER: But just one question.   {#1684}
[01:49:01] TEACHER: Now, what is your SQL query of your job?   {#1685}
[01:49:04] TEACHER: Given that you are storing   {#1686}
[01:49:06] TEACHER: minus one in XPathat   {#1687}
[01:49:07] TEACHER: for the values that are deleted.   {#1688}
[01:49:09] STUDENT_4: Yeah.   {#1689}
[01:49:11] TEACHER: What's the SQL query   {#1690}
[01:49:12] TEACHER: for the background job?   {#1691}
[01:49:13] STUDENT_4: Yeah.   {#1692}
[01:49:14] STUDENT_4: So it will probably be like   {#1693}
[01:49:15] STUDENT_4: delete,   {#1694}
[01:49:18] STUDENT_4: from store where expired art is less than like now.   {#1695}
[01:49:28] TEACHER: That's it, right?   {#1696}
[01:49:30] TEACHER: Yeah.   {#1697}
[01:49:30] TEACHER: Now this matches both the things.   {#1698}
[01:49:32] STUDENT_4: Yeah.   {#1699}
[01:49:33] TEACHER: This not only matches the rows that are expired, but also the negative values.   {#1700}
[01:49:38] TEACHER: So it's been soft deleted also.   {#1701}
[01:49:39] TEACHER: So this is such an elegant solution that solves both the things in one SQL query itself.   {#1702}
[01:49:47] TEACHER: You don't have to have one thread that is deleting the time based of   {#1703}
[01:49:53] TEACHER: and another thread that is deleting the soft deleted value.   {#1704}
[01:49:56] TEACHER: What you are doing over here is you are simply writing this one query   {#1705}
[01:50:01] TEACHER: that beautifully absorbs both the cases.   {#1706}
[01:50:04] TEACHER: It's such an elegant implementation.   {#1707}
[01:50:07] TEACHER: okay and this just puts minimal load whenever because you would have expired at index solves   {#1708}
[01:50:14] TEACHER: a ton of problem for you okay so up until now we talked about delete so our delete is basically an   {#1709}
[01:50:22] TEACHER: update operation so update store set expired at equal to minus one where   {#1710}
[01:50:34] TEACHER: key is equal to K that is delete.   {#1711}
[01:50:37] TEACHER: So we did soft delete and we triggered a background.   {#1712}
[01:50:40] TEACHER: So we have, we talked about schema.   {#1713}
[01:50:43] TEACHER: We talked about background job that would run.   {#1714}
[01:50:45] TEACHER: We talked about delete.   {#1715}
[01:50:46] TEACHER: Now let's talk about, and we also optimize the storage.   {#1716}
[01:50:49] TEACHER: Right.   {#1717}
[01:50:50] TEACHER: Now let's talk about insert.   {#1718}
[01:50:53] TEACHER: What's your insertion query?   {#1719}
[01:50:55] TEACHER: Ashish.   {#1720}
[01:50:56] STUDENT_2: I just wanted to add.   {#1721}
[01:50:58] STUDENT_2: Hello.   {#1722}
[01:50:58] STUDENT_2: I'm audible.   {#1723}
[01:50:59] STUDENT_2: I just wanted to add this thing in the schema.   {#1724}
[01:51:02] STUDENT_2: type because we picked the value to be a worker, right?   {#1725}
[01:51:06] TEACHER: So we can put a serialized YML.   {#1726}
[01:51:08] TEACHER: That's okay.   {#1727}
[01:51:09] TEACHER: That you can make those are the fancy things.   {#1728}
[01:51:11] TEACHER: And you can do for value type and what are you, you can build another   {#1729}
[01:51:14] TEACHER: redis on top of this.   {#1730}
[01:51:15] TEACHER: And that's okay.   {#1731}
[01:51:16] TEACHER: That's why we are not defining very country.   {#1732}
[01:51:18] TEACHER: What we want to get the best out of this is to understand these key design   {#1733}
[01:51:22] TEACHER: decision, right?   {#1734}
[01:51:24] TEACHER: But you can have value type when you're supporting multiple values.   {#1735}
[01:51:26] TEACHER: Let's say you're just supporting string type.   {#1736}
[01:51:28] TEACHER: Then you don't need that or just one homogeneous type.   {#1737}
[01:51:30] TEACHER: You don't need that.   {#1738}
[01:51:31] TEACHER: That's why I didn't cover.   {#1739}
[01:51:33] STUDENT_14: Okay.   {#1740}
[01:51:34] STUDENT_14: Okay.   {#1741}
[01:51:34] TEACHER: Yeah.   {#1742}
[01:51:35] TEACHER: How, how would insert work?   {#1743}
[01:51:38] STUDENT_2: As we have the index on the key, so we can simply do like insert where the key is this   {#1744}
[01:51:44] STUDENT_2: and we can put the value over there.   {#1745}
[01:51:46] TEACHER: Okay.   {#1746}
[01:51:47] TEACHER: So what are insert query would look like?   {#1747}
[01:51:50] STUDENT_2: It will be like insert into, and it will be the value and then where the key is equals   {#1748}
[01:51:54] STUDENT_2: to this, whatever the key we are putting over there.   {#1749}
[01:51:59] TEACHER: So key value and expired at you would pass all three to do it.   {#1750}
[01:52:04] TEACHER: Okay.   {#1751}
[01:52:04] TEACHER: Yes.   {#1752}
[01:52:05] TEACHER: Is this robust enough solution?   {#1753}
---- OWNED SEGMENTS END ----

CTX| [01:52:10] TEACHER: Now think of it.   {#1754}
CTX| [01:52:11] TEACHER: When you are exposing a key value store, you fire foot operations.   {#1755}
CTX| [01:52:15] TEACHER: Right.   {#1756}
CTX| [01:52:16] TEACHER: Yes.   {#1757}
CTX| [01:52:17] TEACHER: Put K1 V1.   {#1758}
CTX| [01:52:20] TEACHER: When you do put, it would trigger an insert.   {#1759}
CTX| [01:52:23] TEACHER: Correct.   {#1760}
CTX| [01:52:24] TEACHER: Right.   {#1761}
CTX| [01:52:24] TEACHER: It would fire K1, V1 and some expression that you pass in over there.   {#1762}
CTX| [01:52:28] TEACHER: Then let's say another operation came in, which is put K1 V2.   {#1763}
CTX| [01:52:33] TEACHER: Now what would happen?   {#1764}
CTX| [01:52:34] TEACHER: It would fire the same insert again and it would fail.   {#1765}
CTX| [01:52:39] TEACHER: Correct?   {#1766}
CTX| [01:52:40] TEACHER: Yep.   {#1767}
CTX| [01:52:41] TEACHER: Because key already exists.   {#1768}
CTX| [01:52:43] STUDENT_2: Already existing.   {#1769}
CTX| [01:52:44] STUDENT_2: So, so we should also add a where clause where the value is, but the value is nailed   {#1770}
CTX| [01:52:54] STUDENT_2: expired basically.   {#1771}
CTX| [01:52:55] STUDENT_2: What?   {#1772}
CTX| [01:52:57] TEACHER: Will you not up like how will when you do put operation, you expect this to replace this   {#1773}
CTX| [01:53:02] TEACHER: value.   {#1774}
CTX| [01:53:03] TEACHER: Correct.   {#1775}
CTX| [01:53:05] TEACHER: When you do first put, you expect what?   {#1776}
CTX| [01:53:10] STUDENT_2: When you do put the key to set that value.   {#1777}
