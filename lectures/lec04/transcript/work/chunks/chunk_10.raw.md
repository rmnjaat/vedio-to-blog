# chunk_10  OWNS 01:45:53 -> 01:59:17  (segments #1644-#1857, 2336 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:44:59] TEACHER: So what happened is a user registered a complaint against another user.   {#1625}
CTX| [01:45:05] STUDENT_1: Because say user A, user B.   {#1626}
CTX| [01:45:08] STUDENT_1: User A harassed user B online on the platform.   {#1627}
CTX| [01:45:12] STUDENT_1: User A harassed user B.   {#1628}
CTX| [01:45:14] STUDENT_1: User B filed a complaint against user A.   {#1629}
CTX| [01:45:18] STUDENT_1: complaint went to police station.   {#1630}
CTX| [01:45:20] STUDENT_1: Police came to the platform to us asking,   {#1631}
CTX| [01:45:23] STUDENT_1: give us all the details of this particular user.   {#1632}
CTX| [01:45:26] STUDENT_1: What did this user do?   {#1633}
CTX| [01:45:26] STUDENT_1: What was the comment?   {#1634}
CTX| [01:45:27] STUDENT_1: What did they do?   {#1635}
CTX| [01:45:28] STUDENT_1: And all of that for us,   {#1636}
CTX| [01:45:30] STUDENT_1: because we are a consumer platform.   {#1637}
CTX| [01:45:33] STUDENT_1: We have to provide this information.   {#1638}
CTX| [01:45:35] STUDENT_1: Now imagine user A harassed user B online,   {#1639}
CTX| [01:45:40] STUDENT_1: post a very filthy comment.   {#1640}
CTX| [01:45:42] STUDENT_1: As soon as user A got to know that B has filed a complaint,   {#1641}
CTX| [01:45:45] STUDENT_1: A deleted it.   {#1642}
CTX| [01:45:47] STUDENT_1: have not did soft deleted, but hard deleted the data. Evidence is gone.   {#1643}

---- OWNED SEGMENTS START ----
[01:45:53] TEACHER: Police would not want that government does not want evidence because this was an evidence where   {#1644}
[01:45:58] TEACHER: it was an evidence of harassment. You cannot, you cannot give it up, which is why soft delete   {#1645}
[01:46:04] TEACHER: are important. Right? Very vague. You as an engineer would never think of visiting police   {#1646}
[01:46:10] TEACHER: station to do this. I visited police station giving justifications, printed copy of all the   {#1647}
[01:46:14] TEACHER: traces, handed it over to police, not even exaggerating a bit.   {#1648}
[01:46:19] STUDENT_1: And this is true.   {#1649}
[01:46:22] STUDENT_1: You have, when you are building a system, you need to know if this would require, if   {#1650}
[01:46:28] STUDENT_1: the entry that you're making in your database, would it require recoverability?   {#1651}
[01:46:32] STUDENT_1: Would it require archival?   {#1652}
[01:46:33] TEACHER: Would it require an audit?   {#1653}
[01:46:34] TEACHER: If yes, you do solve the lead.   {#1654}
[01:46:36] TEACHER: Otherwise you do hard.   {#1655}
[01:46:37] TEACHER: Right?   {#1656}
[01:46:38] TEACHER: So always keep in mind, always, always, always keep in mind.   {#1657}
[01:46:41] TEACHER: whenever you're designing system think from holistic view rather than just thinking from   {#1658}
[01:46:45] TEACHER: this very narrow vision of building things right so you need soft deletes to get this to do this   {#1659}
[01:46:52] TEACHER: three things but one bigger reason not bigger but one more reason to do soft deletes is that it is   {#1660}
[01:46:59] TEACHER: easy on your database now most storage engines of your database they store the data in a b plus 3   {#1661}
[01:47:06] STUDENT_1: format. Now when you hard delete a row, the entry gets deleted from the B plus 3 node,   {#1662}
[01:47:13] TEACHER: B plus 3 becomes imbalanced, then this entire tree rebalancing needs to happen. And when that   {#1663}
[01:47:19] TEACHER: happens, your database spends a lot of CPU cycles rebalancing the tree rather than handling the   {#1664}
[01:47:23] TEACHER: request. So with soft deletes, your entry gets updated, your B plus 3 node does not have to get   {#1665}
[01:47:30] TEACHER: rebalance because the entry still exists with this updated column.   {#1666}
[01:47:34] TEACHER: So this reduces the load on the database, which is why knowing the database   {#1667}
[01:47:39] TEACHER: internals is really important.   {#1668}
[01:47:40] TEACHER: That how your database is structuring the data, would soft delete help or not?   {#1669}
[01:47:44] TEACHER: You need to know answers of that depending on which you can design the system.   {#1670}
[01:47:48] TEACHER: But in general, you would always see this practice of people doing soft deletes   {#1671}
[01:47:52] TEACHER: in the database or in the tables that they store the user generated information.   {#1672}
[01:47:58] TEACHER: This is the importance of doing soft deletes.   {#1673}
[01:48:00] STUDENT_1: Then the next thing is here you see two columns, bio and body.   {#1674}
[01:48:06] STUDENT_1: So bio is a bio of a user, 140 characters.   {#1675}
[01:48:09] STUDENT_1: Body is a gigantic blog that a user has written.   {#1676}
[01:48:13] STUDENT_1: Now here, what I want to highlight is I want to highlight the column type.   {#1677}
[01:48:19] STUDENT_1: So body is a long text format.   {#1678}
[01:48:22] STUDENT_1: Bio is a short text format.   {#1679}
[01:48:24] STUDENT_1: Now short text format and long text format.   {#1680}
[01:48:27] STUDENT_1: So this is what your database internally, you don't have to do it.   {#1681}
[01:48:30] STUDENT_1: internally does this.   {#1682}
[01:48:32] STUDENT_1: So in a relational database and true for non-relational also, when you're   {#1683}
[01:48:37] STUDENT_1: storing large text, true for non-relational also, but with relational database   {#1684}
[01:48:40] STUDENT_1: specifically, it's easier to understand that when you are creating a column type,   {#1685}
[01:48:44] STUDENT_1: let's say your column was email, your column was bio, where it has limited   {#1686}
[01:48:48] STUDENT_1: number of texts.   {#1687}
[01:48:49] STUDENT_1: So what your database does is when you give a where care type, it does a short   {#1688}
[01:48:54] STUDENT_1: texting.   {#1689}
[01:48:54] STUDENT_1: So what did this is in a row based database.   {#1690}
[01:48:57] STUDENT_1: base, you would see all the data of a particular row staying together.   {#1691}
[01:49:02] STUDENT_1: And these are fixed width rows.   {#1692}
[01:49:06] STUDENT_1: So you can exactly know how big the row is from which byte first column starts from which   {#1693}
[01:49:12] STUDENT_1: by the second column start from which by the third column starts.   {#1694}
[01:49:15] STUDENT_1: That's like exactly C structs that we know, or even with the previous example, when we   {#1695}
[01:49:19] STUDENT_1: know that it's four byte and four byte.   {#1696}
[01:49:21] STUDENT_1: So in eight by the first four byte will be this, the next four byte will be this.   {#1697}
[01:49:25] STUDENT_1: Similarly, in any table that you have, every row of your table needs to be a fixed length.   {#1698}
[01:49:33] STUDENT_1: With short text, when you define a text like this, it is a short text and it stays with   {#1699}
[01:49:39] STUDENT_1: the other columns of the row.   {#1700}
[01:49:42] STUDENT_1: While in case of a long text, what happens is it stores this long text in a separate   {#1701}
[01:49:48] STUDENT_1: disk location.   {#1702}
[01:49:49] STUDENT_1: disk location it's not network IO on disk location and store the reference over here   {#1703}
[01:49:54] STUDENT_1: and this database does internally you don't have to do anything over here database does it   {#1704}
[01:49:57] STUDENT_1: so when you define long text as a column type it stores it like this it stores the reference   {#1705}
[01:50:03] STUDENT_1: and stores the long text somewhere else when you read it it makes one DB one disk call to read the   {#1706}
[01:50:09] STUDENT_1: row another disk call to read this entire thing right so that is expensive reads but with short   {#1707}
[01:50:16] STUDENT_1: text when you read it gives you an entire row so this text column is handed to you immediately.   {#1708}
[01:50:22] STUDENT_1: So it says one disk column but then your row length or the size of the row is small with short   {#1709}
[01:50:28] STUDENT_1: text with long text with the size of the row is like you have to limit the length of the row because   {#1710}
[01:50:33] STUDENT_1: of which your long text which is gigantic you cannot have this big rows so it stores it in a   {#1711}
[01:50:38] STUDENT_1: different place so that it can scan very easily the rows it can scan very easy. So again this is   {#1712}
[01:50:46] TEACHER: You don't have to do it.   {#1713}
[01:50:47] TEACHER: Your database internally stores that you just have to provide a corresponding column type,   {#1714}
[01:50:51] TEACHER: long text and where care.   {#1715}
[01:50:53] TEACHER: So where care is typically we use.   {#1716}
[01:50:54] TEACHER: So email is a short text.   {#1717}
[01:50:56] TEACHER: Bio is a short text.   {#1718}
[01:50:57] TEACHER: First name is a short text.   {#1719}
[01:50:58] TEACHER: Last name is a short text.   {#1720}
[01:50:59] TEACHER: Block body comment.   {#1721}
[01:51:01] TEACHER: Right.   {#1722}
[01:51:02] TEACHER: Let's say if you are allowing 5,000 characters comment, 5,000 characters is 5,000 bytes.   {#1723}
[01:51:07] STUDENT_1: Imagine how big the row would get if you're storing 5,000 bytes over here.   {#1724}
[01:51:11] STUDENT_1: Waste of space.   {#1725}
[01:51:12] STUDENT_1: Right.   {#1726}
[01:51:12] STUDENT_1: So in such cases, you would want to know when would you want to store the data along with the other columns and when it is long enough for you to store it in a separate thing.   {#1727}
[01:51:21] STUDENT_1: So that's where where cat and long text, important for your DB to get performance out of, right?   {#1728}
[01:51:27] STUDENT_1: You're making your read slow, but you would say, but if I'm having this, I'm making two disc reads, but here I'm making just one.   {#1729}
[01:51:34] STUDENT_1: Why can't I always do this?   {#1730}
[01:51:37] STUDENT_1: So in the long text, what happens is you are more, if let's say this is a blog stable and   {#1731}
[01:51:42] STUDENT_1: this is a blog body that you are storing with the long text, you are very likely to read   {#1732}
[01:51:47] STUDENT_1: blog title, blog first few lines of it, right?   {#1733}
[01:51:50] STUDENT_1: Excerpt of the blog, image of the blog and whatnot.   {#1734}
[01:51:53] STUDENT_1: But will you want to render the blog body every time when you're rendering it?   {#1735}
[01:51:58] STUDENT_1: No, unless someone clicks on the blog and visits the blog page, then you need the blog   {#1736}
[01:52:02] STUDENT_1: body.   {#1737}
[01:52:03] TEACHER: Right?   {#1738}
[01:52:03] TEACHER: That's when you can make this expensive, this call to read it.   {#1739}
[01:52:06] TEACHER: Otherwise you don't need it.   {#1740}
[01:52:09] TEACHER: So in those cases, to keep your row size,   {#1741}
[01:52:12] TEACHER: always try to keep the row size to a bare minimum.   {#1742}
[01:52:14] TEACHER: To keep the row size or the document size to a bare minimum,   {#1743}
[01:52:18] STUDENT_1: you pick either short text or long text.   {#1744}
[01:52:22] STUDENT_1: So understand when you would want to use what.   {#1745}
[01:52:25] TEACHER: So when you have a very large column, a very large text,   {#1746}
[01:52:28] TEACHER: you would store it as long text.   {#1747}
[01:52:30] TEACHER: Otherwise everything is a short text.   {#1748}
[01:52:34] STUDENT_1: The next one is an interesting one.   {#1749}
[01:52:36] STUDENT_1: The next column is published.   {#1750}
[01:52:39] STUDENT_1: Now published art is where you store the date time that when was this blog published, but   {#1751}
[01:52:45] STUDENT_1: how are you storing date time?   {#1752}
[01:52:47] TEACHER: There are multiple ways to do that.   {#1753}
[01:52:49] TEACHER: And each one of them gives you different advantages.   {#1754}
[01:52:52] TEACHER: Now I'll tell, I'll talk about three approaches to do so.   {#1755}
[01:52:56] TEACHER: Now here, when you're storing date time, most basic way to store date time is to store it   {#1756}
[01:53:03] STUDENT_1: object. So every database provides you as a date time type of a particular column. Now this date   {#1757}
[01:53:10] STUDENT_1: time is a native data type of the database. Now when you have it, but when you think about it,   {#1758}
[01:53:17] STUDENT_1: if your database is storing data on the disk, it is serializing the data in some format and then   {#1759}
[01:53:24] STUDENT_1: flushing it. So now when you would want to read the date type, you read from the disk in a particular   {#1760}
[01:53:31] STUDENT_1: or format convert it into a daytime object and then process it.   {#1761}
[01:53:35] STUDENT_1: I'll give an example.   {#1762}
[01:53:36] STUDENT_1: Let's say I want to store 2nd April 22090136Z.   {#1763}
[01:53:43] STUDENT_1: So this is my date time as a string that I'm storing.   {#1764}
[01:53:47] STUDENT_1: At a time as a string is that I'm seeing.   {#1765}
[01:53:50] STUDENT_1: How it is stored we don't know.   {#1766}
[01:53:52] STUDENT_1: But when you want to store this date time in the database,   {#1767}
[01:53:56] STUDENT_1: your database anyway stores everything on the disk.   {#1768}
[01:53:59] STUDENT_1: So how would this date time be stored on the disk?   {#1769}
[01:54:04] STUDENT_1: Right now, one naive way to do this is to store this date time literally as a string on the   {#1770}
[01:54:11] STUDENT_1: disk.   {#1771}
[01:54:12] STUDENT_1: Right?   {#1772}
[01:54:12] STUDENT_1: So now when you're firing a query on a date time, when you want to read a date time, what   {#1773}
[01:54:17] STUDENT_1: will you do is you would read this string from the disk convert.   {#1774}
[01:54:23] STUDENT_1: Now this is a string.   {#1775}
[01:54:23] STUDENT_1: Then you as in your database engine would have to convert it into a daytime object for comparison.   {#1776}
[01:54:30] STUDENT_1: Let's say you fired a query, select start from blogs where published at is greater than now   {#1777}
[01:54:36] STUDENT_1: minus seven days.   {#1778}
[01:54:37] STUDENT_1: Means the blog that I published in last seven days.   {#1779}
[01:54:40] STUDENT_1: So now for it to do this, it would have to go through the disk, find the daytime that   {#1780}
[01:54:45] STUDENT_1: are that old.   {#1781}
[01:54:45] STUDENT_1: How would it know on disk?   {#1782}
[01:54:47] STUDENT_1: It is stored as a string.   {#1783}
[01:54:48] STUDENT_1: This is an example.   {#1784}
[01:54:49] STUDENT_1: Every database stores it separately, but it's important to know.   {#1785}
[01:54:53] STUDENT_1: how it happens.   {#1786}
[01:54:55] STUDENT_1: So if your database chooses to store it as a string like this,   {#1787}
[01:54:59] STUDENT_1: your database would have to go to every single row,   {#1788}
[01:55:03] STUDENT_1: read this string, convert it into date time object.   {#1789}
[01:55:06] STUDENT_1: So extract date, month, year, hour, minute, second,   {#1790}
[01:55:10] STUDENT_1: and then do the comparison.   {#1791}
[01:55:11] STUDENT_1: Because your language, let's say database is written in C++.   {#1792}
[01:55:16] STUDENT_1: It would have to understand, okay, this is year, this is month,   {#1793}
[01:55:19] STUDENT_1: this is date, this is hour, minute, this is second.   {#1794}
[01:55:23] STUDENT_1: greater than this is greater.   {#1795}
[01:55:25] STUDENT_1: If month greater than this is greater, that logic, right?   {#1796}
[01:55:28] STUDENT_1: You would have to apply that logic there.   {#1797}
[01:55:29] STUDENT_1: So someone has to read this string from the disk,   {#1798}
[01:55:34] STUDENT_1: convert it into a daytime object,   {#1799}
[01:55:35] STUDENT_1: and then compare it with other objects.   {#1800}
[01:55:38] STUDENT_1: This is expensive.   {#1801}
[01:55:41] STUDENT_1: So which is why depending on how your database   {#1802}
[01:55:44] STUDENT_1: stores this data on the disk,   {#1803}
[01:55:47] STUDENT_1: it determines the performance of your database.   {#1804}
[01:55:49] STUDENT_1: And it's not that all database   {#1805}
[01:55:51] STUDENT_1: stores it as string on the disk.   {#1806}
[01:55:54] STUDENT_1: MySQL has its own format.   {#1807}
[01:55:56] STUDENT_1: Postgres has its own format.   {#1808}
[01:55:57] STUDENT_1: MongoDB has its own format.   {#1809}
[01:55:59] TEACHER: Some stores it in epoch seconds.   {#1810}
[01:56:00] TEACHER: Some stores it in epoch milliseconds.   {#1811}
[01:56:02] TEACHER: It all depends.   {#1812}
[01:56:03] TEACHER: So whichever database you are using,   {#1813}
[01:56:06] STUDENT_1: understand how it stores the date time on the disk.   {#1814}
[01:56:09] STUDENT_1: If you find it not performant enough,   {#1815}
[01:56:14] STUDENT_1: you tweak it.   {#1816}
[01:56:15] STUDENT_1: You don't use it.   {#1817}
[01:56:16] STUDENT_1: You find another way to store that information.   {#1818}
[01:56:18] STUDENT_1: That would be efficient for your use case.   {#1819}
[01:56:23] STUDENT_1: So storing data as a data is an extremely convenient way to do it   {#1820}
[01:56:27] STUDENT_1: because depending on the language that you're using,   {#1821}
[01:56:30] STUDENT_1: it gives you native data object for you to do comparison.   {#1822}
[01:56:32] STUDENT_1: It makes our life very easy, but it may be suboptimal in some cases.   {#1823}
[01:56:37] STUDENT_1: So understand how your database use it.   {#1824}
[01:56:40] TEACHER: Understand how your database actually serializes and stores it on the disk.   {#1825}
[01:56:44] TEACHER: And then you take a call if you want to use data or not.   {#1826}
[01:56:48] TEACHER: time everywhere. It may ruin your performance.   {#1827}
[01:56:51] TEACHER: And there is a practical example of that where, or, or, or,   {#1828}
[01:56:54] TEACHER: or a practical situation where it actually happened and company moved it.   {#1829}
[01:56:58] TEACHER: I'll talk about it in two minutes.   {#1830}
[01:57:00] TEACHER: So understand it, right?   {#1831}
[01:57:02] TEACHER: How your data is actually doing it and see if fits your needs are.   {#1832}
[01:57:06] STUDENT_1: Other way, let's say this was slow.   {#1833}
[01:57:08] STUDENT_1: You know, what's the solution up with that.   {#1834}
[01:57:11] STUDENT_1: Right?   {#1835}
[01:57:11] STUDENT_1: So you may store date time as an epoch integer.   {#1836}
[01:57:15] STUDENT_1: So instead of storing date time as date time, you store date   {#1837}
[01:57:18] STUDENT_1: as integer. So you do it. So you create a column published   {#1838}
[01:57:23] STUDENT_1: art whose type is integer and not date time and you store   {#1839}
[01:57:28] STUDENT_1: epoch in that a lot of companies have now started following   {#1840}
[01:57:30] STUDENT_1: this. Right. So what is an epoch integer epoch   {#1841}
[01:57:34] STUDENT_1: into our epoch timestamp is number of seconds or number   {#1842}
[01:57:37] STUDENT_1: of milliseconds elapsed since first January 1970.   {#1843}
[01:57:41] STUDENT_1: This is where the clock started ticking for us. Right.   {#1844}
[01:57:44] STUDENT_1: So you start this as an epoch second. You see what the   {#1845}
[01:57:48] STUDENT_1: integer value there. Now, if you look closely, if hypothetically, let's say a database was storing   {#1846}
[01:57:54] STUDENT_1: date time as this string on the disk, look at the number of bytes it would require to store this   {#1847}
[01:57:59] TEACHER: string on the disk. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20 bytes.   {#1848}
[01:58:11] STUDENT_1: The string as it is stored 20 bytes, it is requiring to store this, but this exact same   {#1849}
[01:58:16] STUDENT_1: information can be stored as this integer which takes four bytes to store.   {#1850}
[01:58:22] TEACHER: From 20 bytes to four bytes massive space gain, right?   {#1851}
[01:58:26] TEACHER: Daytime has become performance.   {#1852}
[01:58:28] STUDENT_1: So this is efficient, optimal, lightweight, but not at all readable.   {#1853}
[01:58:36] STUDENT_1: Looking at this number, you cannot tell what time is this.   {#1854}
[01:58:38] STUDENT_1: Correct?   {#1855}
[01:58:39] STUDENT_1: So looking at this, you cannot tell what.   {#1856}
[01:58:44] STUDENT_9: right just a minute my battery went off   {#1857}
---- OWNED SEGMENTS END ----

CTX| [01:59:17] STUDENT_9: Let me check on the mic in this.   {#1858}
CTX| [01:59:24] TEACHER: Got it.   {#1859}
CTX| [01:59:25] TEACHER: Okay.   {#1860}
CTX| [01:59:27] TEACHER: So the first option that we had was date time was very readable.   {#1861}
CTX| [01:59:31] STUDENT_1: Looking at this, you can exactly tell what date, what time, what, what, what the date   {#1862}
CTX| [01:59:36] STUDENT_1: I was looking at this number.   {#1863}
CTX| [01:59:38] STUDENT_1: You cannot tell what that was.   {#1864}
CTX| [01:59:39] STUDENT_1: Right?   {#1865}
CTX| [01:59:41] STUDENT_1: Readability, but it gives you performance.   {#1866}
CTX| [01:59:43] STUDENT_1: It is very lightweight on index.   {#1867}
CTX| [01:59:44] STUDENT_1: It's just integer comparizer.   {#1868}
CTX| [01:59:46] STUDENT_1: So reading this, you are just reading an integer and comparing it.   {#1869}
CTX| [01:59:49] STUDENT_1: Most efficient operation for your database, for your desk, for everything, for your computer   {#1870}
CTX| [01:59:54] STUDENT_1: in general.   {#1871}
CTX| [01:59:55] STUDENT_1: Reading this, you have to create a complex object having multiple attributes and then   {#1872}
CTX| [01:59:58] STUDENT_1: you do comparison.   {#1873}
CTX| [01:59:59] STUDENT_1: So this is extremely lightweight, extremely optimal, all things good, but it takes away   {#1874}
CTX| [02:00:03] STUDENT_1: readability, right?   {#1875}
CTX| [02:00:04] TEACHER: But a lot of people choose to store date time as epoch integers in integer columns, right?   {#1876}
CTX| [02:00:09] TEACHER: Because you get a lot of benefits out of it.   {#1877}
CTX| [02:00:11] TEACHER: Now there is a third way where what if you relax some constants, you need readability,   {#1878}
