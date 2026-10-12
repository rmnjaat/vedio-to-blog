# chunk_09  OWNS 01:34:18 -> 01:45:53  (segments #1544-#1643, 1121 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:33:20] STUDENT_1: that you would want to handle,   {#1520}
CTX| [01:33:21] STUDENT_1: you are able to handle that, first of all.   {#1521}
CTX| [01:33:23] STUDENT_1: And then you may have to tune   {#1522}
CTX| [01:33:25] STUDENT_1: your connection pool maximum,   {#1523}
CTX| [01:33:28] TEACHER: may not be minimum,   {#1524}
CTX| [01:33:28] TEACHER: but the maximum size of a connection pool   {#1525}
CTX| [01:33:30] TEACHER: because if you are scaling up   {#1526}
CTX| [01:33:31] TEACHER: your vertical scaling your servers also,   {#1527}
CTX| [01:33:33] TEACHER: it can handle large number of requests.   {#1528}
CTX| [01:33:35] TEACHER: So you will need a bit of tuning on that.   {#1529}
CTX| [01:33:37] TEACHER: Knowing the tech unit economic is very important when you are operating in real world.   {#1530}
CTX| [01:33:44] TEACHER: So have the right set of monitoring tools which helps you make this decision.   {#1531}
CTX| [01:33:51] TEACHER: Okay.   {#1532}
CTX| [01:33:52] TEACHER: Gaurav and Mohit, I'll take your question at the end.   {#1533}
CTX| [01:33:55] TEACHER: Now what we'll do is we'll take a break.   {#1534}
CTX| [01:33:56] TEACHER: And by the way, in every session, we take one break for five to seven minutes.   {#1535}
CTX| [01:34:02] TEACHER: Today we'll take a break for five minutes.   {#1536}
CTX| [01:34:03] TEACHER: We'll sink back at 10.40.   {#1537}
CTX| [01:34:05] STUDENT_1: and then next 20-25 minutes   {#1538}
CTX| [01:34:07] STUDENT_1: we'll discuss database and then   {#1539}
CTX| [01:34:09] STUDENT_1: 20-25 minutes we'll discuss   {#1540}
CTX| [01:34:11] TEACHER: caching and this way by 11.30 we'll have   {#1541}
CTX| [01:34:13] TEACHER: everything done. We'll take 5 minutes break   {#1542}
CTX| [01:34:15] TEACHER: it has been a lot so   {#1543}

---- OWNED SEGMENTS START ----
[01:34:18] TEACHER: spend your time   {#1544}
[01:34:20] TEACHER: having a break   {#1545}
[01:34:21] TEACHER: basically sip some coffee, have some   {#1546}
[01:34:23] TEACHER: water and we'll sink back at   {#1547}
[01:34:25] TEACHER: 10.40 5 minutes from   {#1548}
[01:34:27] TEACHER: now and we'll resume our discussion on   {#1549}
[01:34:29] TEACHER: foundational topics. Database and caching   {#1550}
[01:34:31] TEACHER: is what we'll cover today and other four   {#1551}
[01:34:33] TEACHER: we'll cover at the end. Bye.   {#1552}
[01:34:35] TEACHER: Okay, job.   {#1553}
[01:34:36] TEACHER: Thanks folks.   {#1554}
[01:34:37] TEACHER: See you folks at 10.40 in five minutes.   {#1555}
[01:39:24] STUDENT_1: Thank you.   {#1556}
[01:39:55] STUDENT_1: great we'll start with the second half for today and uh just quickly check on the mic   {#1557}
[01:40:03] TEACHER: okay mic and output fine okay let me start for the second half for today and what we'll do is   {#1558}
[01:40:09] TEACHER: we'll discuss foundation topic so earlier i did not cover uh uh online offline indicator i started   {#1559}
[01:40:15] TEACHER: from here it become too theoretical like now scrap this let me start with online offline and so that   {#1560}
[01:40:20] TEACHER: we basically slowly move into like we are already into the groove of things.   {#1561}
[01:40:24] TEACHER: Okay.   {#1562}
[01:40:25] TEACHER: So foundational topics and system design, these are six core components of most   {#1563}
[01:40:29] TEACHER: of the systems, most, not all, most of the systems, which whenever we're   {#1564}
[01:40:32] TEACHER: designing a system, we have to think of this six components, right?   {#1565}
[01:40:36] TEACHER: Database, caching, scaling, delegation, concurrency, communication.   {#1566}
[01:40:40] TEACHER: We'll talk about two today.   {#1567}
[01:40:42] TEACHER: We'll talk about four tomorrow.   {#1568}
[01:40:44] TEACHER: So any system that you pick would have the six, not just online, offline.   {#1569}
[01:40:48] TEACHER: in online you may also see you'll see this six any system we discuss you'll always see this six   {#1570}
[01:40:53] TEACHER: key components or key design decisions that would have to make okay so we'll understand database   {#1571}
[01:40:59] TEACHER: will start with database and then caching uh caching five minutes seven minutes thing but   {#1572}
[01:41:03] TEACHER: we'll over the course like along the course we'll see a ton of use cases of caching and how to better   {#1573}
[01:41:09] TEACHER: it but still day when we are just keeping things a little simple so we'll talk it in like to get   {#1574}
[01:41:14] TEACHER: deeper understanding we'll talk in terms of uh designing a multi-user blocking application like   {#1575}
[01:41:19] TEACHER: medium right so two things we don't go build fancy medium recommended nothing we'll keep it simple   {#1576}
[01:41:26] TEACHER: and uh one user multiple blocks and multiple users in the system that's it that's all we worry about   {#1577}
[01:41:33] STUDENT_1: right so one user can post multiple blocks and there are multiple users in the system   {#1578}
[01:41:37] STUDENT_1: so now for to do to have this let's see how databases are designed for this and why are we   {#1579}
[01:41:44] STUDENT_1: design decisions. So we'll have two tables. One where we are storing all the users. Second is   {#1580}
[01:41:52] STUDENT_1: where we are storing all the blogs that are there. So users will have ID, name and bio. So ID is the   {#1581}
[01:42:00] STUDENT_1: ID of the user, auto increment ID. Name of the user is what you render there and bio of the user.   {#1582}
[01:42:05] STUDENT_1: A small text, 128 characters something. And then you have blogs. In blogs you have ID, author ID.   {#1583}
[01:42:15] STUDENT_1: This author wrote this blog.   {#1584}
[01:42:17] STUDENT_1: The blog has this particular title.   {#1585}
[01:42:19] STUDENT_1: Blog has this body.   {#1586}
[01:42:20] STUDENT_1: This is the body of the blog.   {#1587}
[01:42:21] STUDENT_1: The blog was published at this date and is deleted as a soft delete column.   {#1588}
[01:42:26] STUDENT_1: Where if user deletes it, you just mark is deleted as true.   {#1589}
[01:42:30] STUDENT_1: Right?   {#1590}
[01:42:31] STUDENT_1: Standard schema.   {#1591}
[01:42:32] STUDENT_1: But now let's go into those details and importance of each of these fields.   {#1592}
[01:42:37] STUDENT_1: First, let's start with is deleted.   {#1593}
[01:42:39] STUDENT_1: Now in a lot of places, even in your organization, you will find a ton of tables having a is deleted column.   {#1594}
[01:42:48] TEACHER: Soft deletes.   {#1595}
[01:42:50] TEACHER: So why do people do soft deletes in database when database gives you delete query, right?   {#1596}
[01:42:55] TEACHER: What's the importance of doing soft deletes?   {#1597}
[01:42:57] TEACHER: Now soft deletes are extremely important to ensure the performance of your database.   {#1598}
[01:43:04] TEACHER: You'll say, are you deleted performance?   {#1599}
[01:43:05] TEACHER: How?   {#1600}
[01:43:07] TEACHER: So when you are deleting your entry, first of all, it's a hard delete.   {#1601}
[01:43:12] TEACHER: When you just file a delete query on your database, it's a hard delete.   {#1602}
[01:43:15] TEACHER: It means you cannot recover that corresponding data again.   {#1603}
[01:43:19] TEACHER: So that's challenge number one.   {#1604}
[01:43:22] TEACHER: What if you'd want to recover what you just deleted?   {#1605}
[01:43:25] TEACHER: How do you do it?   {#1606}
[01:43:26] TEACHER: If you want recoverability in your system, let's say user deleted a blog, but then you   {#1607}
[01:43:30] TEACHER: would want to give them a way to recover it.   {#1608}
[01:43:33] TEACHER: example Google Drive in Google Drive you delete a file it goes into trash and for 30 days it stays   {#1609}
[01:43:39] STUDENT_1: in the trash before and while in 30 days you can go visit the trash and recover it right that is   {#1610}
[01:43:45] STUDENT_1: soft delete so when you need recoverability you use soft first second is archival archival is   {#1611}
[01:43:52] STUDENT_1: important because let's say user put in a ton of effort into generating this content this blog   {#1612}
[01:44:00] STUDENT_1: If user marks it as delete and you hard deleted that rich data is gone.   {#1613}
[01:44:06] STUDENT_1: You could have used to train your machine learning models, build another chat GPT and   {#1614}
[01:44:10] STUDENT_1: whatnot.   {#1615}
[01:44:11] STUDENT_1: And so you, when a user has put in effort, you don't want that to just delete.   {#1616}
[01:44:17] STUDENT_1: When users delete, you just delete and you don't want that to happen.   {#1617}
[01:44:21] STUDENT_1: So what you do is when user says delete, you do a soft delete and run a job that pulls   {#1618}
[01:44:27] STUDENT_1: out this soft deleted rows and puts into S3 or any blob storage so that you can do use it for   {#1619}
[01:44:32] STUDENT_1: machine learning recognition training purposes and whatnot. So when you need archival even the   {#1620}
[01:44:38] STUDENT_1: user has deleted it you're still putting it at different place right. So archival is another   {#1621}
[01:44:43] TEACHER: reason why you would want soft delete. The third one is audit. Like a fancy reason fancy thing for   {#1622}
[01:44:49] TEACHER: I have visited police stations because of this.   {#1623}
[01:44:53] TEACHER: So what happens is, see, when you work at startup, you have to do all of this.   {#1624}
[01:44:59] TEACHER: So what happened is a user registered a complaint against another user.   {#1625}
[01:45:05] STUDENT_1: Because say user A, user B.   {#1626}
[01:45:08] STUDENT_1: User A harassed user B online on the platform.   {#1627}
[01:45:12] STUDENT_1: User A harassed user B.   {#1628}
[01:45:14] STUDENT_1: User B filed a complaint against user A.   {#1629}
[01:45:18] STUDENT_1: complaint went to police station.   {#1630}
[01:45:20] STUDENT_1: Police came to the platform to us asking,   {#1631}
[01:45:23] STUDENT_1: give us all the details of this particular user.   {#1632}
[01:45:26] STUDENT_1: What did this user do?   {#1633}
[01:45:26] STUDENT_1: What was the comment?   {#1634}
[01:45:27] STUDENT_1: What did they do?   {#1635}
[01:45:28] STUDENT_1: And all of that for us,   {#1636}
[01:45:30] STUDENT_1: because we are a consumer platform.   {#1637}
[01:45:33] STUDENT_1: We have to provide this information.   {#1638}
[01:45:35] STUDENT_1: Now imagine user A harassed user B online,   {#1639}
[01:45:40] STUDENT_1: post a very filthy comment.   {#1640}
[01:45:42] STUDENT_1: As soon as user A got to know that B has filed a complaint,   {#1641}
[01:45:45] STUDENT_1: A deleted it.   {#1642}
[01:45:47] STUDENT_1: have not did soft deleted, but hard deleted the data. Evidence is gone.   {#1643}
---- OWNED SEGMENTS END ----

CTX| [01:45:53] TEACHER: Police would not want that government does not want evidence because this was an evidence where   {#1644}
CTX| [01:45:58] TEACHER: it was an evidence of harassment. You cannot, you cannot give it up, which is why soft delete   {#1645}
CTX| [01:46:04] TEACHER: are important. Right? Very vague. You as an engineer would never think of visiting police   {#1646}
CTX| [01:46:10] TEACHER: station to do this. I visited police station giving justifications, printed copy of all the   {#1647}
CTX| [01:46:14] TEACHER: traces, handed it over to police, not even exaggerating a bit.   {#1648}
CTX| [01:46:19] STUDENT_1: And this is true.   {#1649}
CTX| [01:46:22] STUDENT_1: You have, when you are building a system, you need to know if this would require, if   {#1650}
CTX| [01:46:28] STUDENT_1: the entry that you're making in your database, would it require recoverability?   {#1651}
CTX| [01:46:32] STUDENT_1: Would it require archival?   {#1652}
CTX| [01:46:33] TEACHER: Would it require an audit?   {#1653}
CTX| [01:46:34] TEACHER: If yes, you do solve the lead.   {#1654}
CTX| [01:46:36] TEACHER: Otherwise you do hard.   {#1655}
CTX| [01:46:37] TEACHER: Right?   {#1656}
CTX| [01:46:38] TEACHER: So always keep in mind, always, always, always keep in mind.   {#1657}
CTX| [01:46:41] TEACHER: whenever you're designing system think from holistic view rather than just thinking from   {#1658}
CTX| [01:46:45] TEACHER: this very narrow vision of building things right so you need soft deletes to get this to do this   {#1659}
CTX| [01:46:52] TEACHER: three things but one bigger reason not bigger but one more reason to do soft deletes is that it is   {#1660}
