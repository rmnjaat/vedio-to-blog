# chunk_10  OWNS 01:52:10 -> 02:02:46  (segments #1754-#1953, 1633 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:51:11] TEACHER: And you can do for value type and what are you, you can build another   {#1729}
CTX| [01:51:14] TEACHER: redis on top of this.   {#1730}
CTX| [01:51:15] TEACHER: And that's okay.   {#1731}
CTX| [01:51:16] TEACHER: That's why we are not defining very country.   {#1732}
CTX| [01:51:18] TEACHER: What we want to get the best out of this is to understand these key design   {#1733}
CTX| [01:51:22] TEACHER: decision, right?   {#1734}
CTX| [01:51:24] TEACHER: But you can have value type when you're supporting multiple values.   {#1735}
CTX| [01:51:26] TEACHER: Let's say you're just supporting string type.   {#1736}
CTX| [01:51:28] TEACHER: Then you don't need that or just one homogeneous type.   {#1737}
CTX| [01:51:30] TEACHER: You don't need that.   {#1738}
CTX| [01:51:31] TEACHER: That's why I didn't cover.   {#1739}
CTX| [01:51:33] STUDENT_14: Okay.   {#1740}
CTX| [01:51:34] STUDENT_14: Okay.   {#1741}
CTX| [01:51:34] TEACHER: Yeah.   {#1742}
CTX| [01:51:35] TEACHER: How, how would insert work?   {#1743}
CTX| [01:51:38] STUDENT_2: As we have the index on the key, so we can simply do like insert where the key is this   {#1744}
CTX| [01:51:44] STUDENT_2: and we can put the value over there.   {#1745}
CTX| [01:51:46] TEACHER: Okay.   {#1746}
CTX| [01:51:47] TEACHER: So what are insert query would look like?   {#1747}
CTX| [01:51:50] STUDENT_2: It will be like insert into, and it will be the value and then where the key is equals   {#1748}
CTX| [01:51:54] STUDENT_2: to this, whatever the key we are putting over there.   {#1749}
CTX| [01:51:59] TEACHER: So key value and expired at you would pass all three to do it.   {#1750}
CTX| [01:52:04] TEACHER: Okay.   {#1751}
CTX| [01:52:04] TEACHER: Yes.   {#1752}
CTX| [01:52:05] TEACHER: Is this robust enough solution?   {#1753}

---- OWNED SEGMENTS START ----
[01:52:10] TEACHER: Now think of it.   {#1754}
[01:52:11] TEACHER: When you are exposing a key value store, you fire foot operations.   {#1755}
[01:52:15] TEACHER: Right.   {#1756}
[01:52:16] TEACHER: Yes.   {#1757}
[01:52:17] TEACHER: Put K1 V1.   {#1758}
[01:52:20] TEACHER: When you do put, it would trigger an insert.   {#1759}
[01:52:23] TEACHER: Correct.   {#1760}
[01:52:24] TEACHER: Right.   {#1761}
[01:52:24] TEACHER: It would fire K1, V1 and some expression that you pass in over there.   {#1762}
[01:52:28] TEACHER: Then let's say another operation came in, which is put K1 V2.   {#1763}
[01:52:33] TEACHER: Now what would happen?   {#1764}
[01:52:34] TEACHER: It would fire the same insert again and it would fail.   {#1765}
[01:52:39] TEACHER: Correct?   {#1766}
[01:52:40] TEACHER: Yep.   {#1767}
[01:52:41] TEACHER: Because key already exists.   {#1768}
[01:52:43] STUDENT_2: Already existing.   {#1769}
[01:52:44] STUDENT_2: So, so we should also add a where clause where the value is, but the value is nailed   {#1770}
[01:52:54] STUDENT_2: expired basically.   {#1771}
[01:52:55] STUDENT_2: What?   {#1772}
[01:52:57] TEACHER: Will you not up like how will when you do put operation, you expect this to replace this   {#1773}
[01:53:02] TEACHER: value.   {#1774}
[01:53:03] TEACHER: Correct.   {#1775}
[01:53:05] TEACHER: When you do first put, you expect what?   {#1776}
[01:53:10] STUDENT_2: When you do put the key to set that value.   {#1777}
[01:53:12] STUDENT_2: And then when we are using the, yeah, yeah, yeah.   {#1778}
[01:53:14] STUDENT_2: Right.   {#1779}
[01:53:14] STUDENT_2: Okay.   {#1780}
[01:53:15] STUDENT_2: Got it.   {#1781}
[01:53:15] STUDENT_2: Correct.   {#1782}
[01:53:16] STUDENT_2: For the next one, we will update the value.   {#1783}
[01:53:17] TEACHER: Huh?   {#1784}
[01:53:18] TEACHER: So how will you handle this?   {#1785}
[01:53:22] TEACHER: So then your put operation   {#1786}
[01:53:23] TEACHER: or insert operation   {#1787}
[01:53:25] TEACHER: is something different because   {#1788}
[01:53:27] TEACHER: now when you fire the same query again   {#1789}
[01:53:29] TEACHER: it would throw the error the second time.   {#1790}
[01:53:32] TEACHER: So now you can   {#1791}
[01:53:33] TEACHER: do get every time   {#1792}
[01:53:35] TEACHER: check if the key exists   {#1793}
[01:53:37] TEACHER: if it exists then you fire update.   {#1794}
[01:53:39] TEACHER: If not then you fire insert.   {#1795}
[01:53:40] TEACHER: Insert.   {#1796}
[01:53:42] TEACHER: So now for every put operation   {#1797}
[01:53:44] TEACHER: results into a get   {#1798}
[01:53:46] TEACHER: and a put.   {#1799}
[01:53:48] TEACHER: Correct? Yes.   {#1800}
[01:53:49] TEACHER: Yes, expensive because you are unnecessarily getting it.   {#1801}
[01:53:57] TEACHER: Right.   {#1802}
[01:53:57] TEACHER: So how do you make it better?   {#1803}
[01:54:07] TEACHER: So what you typically want to do is you'd want to insert if the key does not exist and you   {#1804}
[01:54:14] TEACHER: want to update if the key exists.   {#1805}
[01:54:15] TEACHER: Correct.   {#1806}
[01:54:18] STUDENT_8: How do you do it without getting the key explicitly?   {#1807}
[01:54:27] STUDENT_2: Maybe we can do this thing key.   {#1808}
[01:54:29] STUDENT_2: We can simply mark the previous key to be expired and create a new entry with a new same   {#1809}
[01:54:34] STUDENT_2: key.   {#1810}
[01:54:34] TEACHER: You're still getting it, right?   {#1811}
[01:54:35] TEACHER: You're still getting it.   {#1812}
[01:54:37] TEACHER: Yeah.   {#1813}
[01:54:38] TEACHER: What you want to have to do, you would want typically this.   {#1814}
[01:54:40] TEACHER: If you're marking that is done, but this is your primary key.   {#1815}
[01:54:43] TEACHER: You cannot have two entries with that.   {#1816}
[01:54:46] TEACHER: Anyway, right.   {#1817}
[01:54:55] TEACHER: The devil lies in the details, right?   {#1818}
[01:54:58] TEACHER: When we, we never think about implementation, we just think our drawing boxes.   {#1819}
[01:55:01] TEACHER: This, this, this is what I want all of you to think about implementation.   {#1820}
[01:55:05] TEACHER: This is where you need to know when you think about the implementation use use.   {#1821}
[01:55:10] TEACHER: You know that get an insert or get or update is so costly.   {#1822}
[01:55:16] TEACHER: We have to make it better.   {#1823}
[01:55:17] TEACHER: So let me pull in Mohit.   {#1824}
[01:55:20] TEACHER: Mohit, go on.   {#1825}
[01:55:21] TEACHER: How will you do it?   {#1826}
[01:55:23] STUDENT_10: Yeah.   {#1827}
[01:55:23] STUDENT_10: So like you could write a query like insert into store value K1 V1.   {#1828}
[01:55:29] STUDENT_10: If exist, do update.   {#1829}
[01:55:33] STUDENT_10: Basically we are trying to do an absurd query at the database level.   {#1830}
[01:55:37] TEACHER: Correct.   {#1831}
[01:55:38] TEACHER: So what you are trying to do is absurd.   {#1832}
[01:55:42] TEACHER: And so depending on the database you choose to implement this,   {#1833}
[01:55:46] TEACHER: see if they support absurd operations.   {#1834}
[01:55:49] TEACHER: Absurds are atomic, wrapped in transaction and just one SQL query.   {#1835}
[01:55:53] TEACHER: So you don't have to get it from the database,   {#1836}
[01:55:56] TEACHER: check if it exists and then write it in a transaction.   {#1837}
[01:55:59] TEACHER: You can just fire an absurd statement that does it for you.   {#1838}
[01:56:02] TEACHER: So your query in case you are using, in case you are using Postgres, you just replace insert   {#1839}
[01:56:10] TEACHER: with absurd.   {#1840}
[01:56:12] TEACHER: That's it.   {#1841}
[01:56:13] TEACHER: If you replace insert with absurd, you get absurd behavior.   {#1842}
[01:56:16] TEACHER: Now what absurd does if the key exists, let's say if you fire key K1, V1 and some expiration,   {#1843}
[01:56:22] TEACHER: you get K1, V1 and some expiration.   {#1844}
[01:56:24] TEACHER: Let's say another put came in K1 V2 expiration.   {#1845}
[01:56:27] TEACHER: It would automatically just do replace this V2.   {#1846}
[01:56:30] TEACHER: So if it exists, it updates.   {#1847}
[01:56:32] TEACHER: does not exist, it inserts.   {#1848}
[01:56:34] TEACHER: It automatically does that.   {#1849}
[01:56:36] TEACHER: Now, how is it more performant?   {#1850}
[01:56:37] TEACHER: You are anyway getting it now, but you are not doing that network   {#1851}
[01:56:40] TEACHER: IO to bring the data to your API servers.   {#1852}
[01:56:43] TEACHER: You are firing an Upsert.   {#1853}
[01:56:45] TEACHER: Let your database read it, exist, update, if not create.   {#1854}
[01:56:49] TEACHER: So you are saving that network IO, one network trip of firing   {#1855}
[01:56:53] TEACHER: this one query and getting it back and not having a gigantic   {#1856}
[01:56:56] TEACHER: transition wrapped around.   {#1857}
[01:56:57] TEACHER: And it's much, much, much, much more efficient.   {#1858}
[01:57:00] TEACHER: So Upsert, if you are using Postgres, you can use Upsert.   {#1859}
[01:57:04] TEACHER: Otherwise you can use replace into.   {#1860}
[01:57:07] TEACHER: These are all clauses by the way, or on duplicate key update.   {#1861}
[01:57:14] TEACHER: On duplicate key update.   {#1862}
[01:57:16] TEACHER: So Google search, Google search about them.   {#1863}
[01:57:18] TEACHER: You'll learn them.   {#1864}
[01:57:18] TEACHER: And in any case, we would be covering it.   {#1865}
[01:57:21] TEACHER: Today or maybe next week, somewhere.   {#1866}
[01:57:24] TEACHER: But you would have to, oh no, today only in this discussion itself, we'll be covering   {#1867}
[01:57:28] TEACHER: it.   {#1868}
[01:57:30] TEACHER: pick your favorite like depending on the database that you're using you'll be picking that up to   {#1869}
[01:57:34] TEACHER: implement it right this is how your insert would be full put your put operations will be full put   {#1870}
[01:57:40] TEACHER: so if the key exists it fetches it like automatically does that you don't have to   {#1871}
[01:57:44] TEACHER: make that network call or that network round trip to get the key and then check it and then wrap it   {#1872}
[01:57:49] TEACHER: in the transaction that would slow down your throughput this would keep your database throughput   {#1873}
[01:57:53] TEACHER: really high when you're using native absurd statements every database supports that because   {#1874}
[01:58:01] TEACHER: standard every database has a different clause for it postgres calls it absurd mysql has a   {#1875}
[01:58:08] TEACHER: replacing to or on duplicate key update right so depending on the database you would pick the   {#1876}
[01:58:14] TEACHER: favorite implementation there right so depending on the database just find what they support you   {#1877}
[01:58:19] TEACHER: would do that so this way you keep the load on your database to a bare minimum by leveraging the   {#1878}
[01:58:25] TEACHER: upset operation. So get put, then delete that. Now what else? What else is remaining? Nothing.   {#1879}
[01:58:33] TEACHER: Storage, optimization, storage, insert. Update is straightforward. You just go and directly   {#1880}
[01:58:37] TEACHER: update. So put and this are same. TTL we talked about. Oh, TTL, TTL. TTL is remaining. How   {#1881}
[01:58:45] STUDENT_1: would you do key expirations so for key expirations we can just to have this logic in server actually   {#1882}
[01:58:57] STUDENT_1: so if we check the time right now and the time exp if it is already and compared with expired   {#1883}
[01:59:05] STUDENT_1: so if the time is definite time now is definitely more than expired we will just send like this key   {#1884}
[01:59:12] STUDENT_1: does not exist.   {#1885}
[01:59:14] TEACHER: So you are still fetching the key from the database.   {#1886}
[01:59:16] TEACHER: So what is your get query   {#1887}
[01:59:18] TEACHER: looks like? Like your SQL   {#1888}
[01:59:20] TEACHER: query to get a particular key?   {#1889}
[01:59:22] STUDENT_1: So basically select   {#1890}
[01:59:25] STUDENT_1: star from   {#1891}
[01:59:26] STUDENT_1: database where key equals   {#1892}
[01:59:28] STUDENT_1: to k1.   {#1893}
[01:59:31] TEACHER: Okay.   {#1894}
[01:59:32] TEACHER: And then you would fetch the key on the   {#1895}
[01:59:34] TEACHER: API side, check if the key   {#1896}
[01:59:36] TEACHER: is expired or not and then return   {#1897}
[01:59:38] TEACHER: the corresponding response. Correct?   {#1898}
[01:59:41] TEACHER: Yeah.   {#1899}
[01:59:42] TEACHER: It's wasteful.   {#1900}
[01:59:44] TEACHER: You are reading, let's say the value was 10 MB big.   {#1901}
[01:59:49] TEACHER: You are making the 10 MB data transfer to your API eventually to realize that he is   {#1902}
[01:59:54] TEACHER: expired.   {#1903}
[01:59:55] STUDENT_1: So I can also add and expired at is expired at is greater than now.   {#1904}
[02:00:04] STUDENT_1: Correct.   {#1905}
[02:00:05] TEACHER: And what we say with this one clause is that heavy network IO.   {#1906}
[02:00:10] TEACHER: Yeah.   {#1907}
[02:00:10] TEACHER: Right.   {#1908}
[02:00:12] TEACHER: micro decisions, right?   {#1909}
[02:00:13] TEACHER: Please make your, your database performance.   {#1910}
[02:00:17] TEACHER: Right.   {#1911}
[02:00:18] TEACHER: For sure.   {#1912}
[02:00:18] TEACHER: Everyone would have done with this insert, right?   {#1913}
[02:00:21] TEACHER: Everyone would have written insert queries.   {#1914}
[02:00:23] TEACHER: But when you think about the devils, you realize absurdly wanted here.   {#1915}
[02:00:28] TEACHER: Also everyone would just, it's simple.   {#1916}
[02:00:30] TEACHER: Now, uh, select a, the key equal to this.   {#1917}
[02:00:33] TEACHER: This is the real deal where you are not even reading that from the database.   {#1918}
[02:00:39] TEACHER: So if your values are gigantic, you are saving a ton of network IO.   {#1919}
[02:00:44] TEACHER: That's the beauty of this.   {#1920}
[02:00:45] TEACHER: Like go into those details.   {#1921}
[02:00:47] TEACHER: I just want all of you to have that curiosity.   {#1922}
[02:00:50] TEACHER: How to get like, you know, every single line that you want to get a performance out of.   {#1923}
[02:00:56] TEACHER: This is how you get.   {#1924}
[02:00:57] TEACHER: Okay.   {#1925}
[02:00:57] TEACHER: So we just implemented get and added this check.   {#1926}
[02:01:00] TEACHER: Now, also there is one more performance optimization on the similar lines.   {#1927}
[02:01:10] TEACHER: not here but at uh wait i'll i'll i'll i'll i'll just talk about it it will be much more fun when   {#1928}
[02:01:17] STUDENT_1: i cover it later right okay there is one more thing actually what uh so uh it's about absurd   {#1929}
[02:01:24] STUDENT_1: actually okay so let's just say like this key value store or key value store uh stores are   {#1930}
[02:01:31] STUDENT_1: transactional data okay and somehow some uh like some newbie came to the company and he   {#1931}
[02:01:39] STUDENT_1: misfired this uh misfired this execution basically he ran an episode okay so like   {#1932}
[02:01:47] STUDENT_1: there is a case like there is a case like uh when like when he's running put query he's   {#1933}
[02:01:55] STUDENT_1: accidentally updating the value which does not need to be should not be updated let's just say   {#1934}
[02:02:01] STUDENT_1: transaction ID and the whatever value it holds.   {#1935}
[02:02:05] STUDENT_1: Okay.   {#1936}
[02:02:06] TEACHER: So why would that even happen?   {#1937}
[02:02:09] STUDENT_1: Like you're firing Upsert.   {#1938}
[02:02:11] TEACHER: You anyway have to support Upsert for high throughput.   {#1939}
[02:02:13] TEACHER: Why would you fire a random insert in your database?   {#1940}
[02:02:17] STUDENT_1: No, let's just say like there was...   {#1941}
[02:02:20] TEACHER: That's very specific use case, Rahul.   {#1942}
[02:02:22] TEACHER: Let's take it at the end.   {#1943}
[02:02:23] TEACHER: It's very extremely specific use case that you're talking about.   {#1944}
[02:02:26] TEACHER: Right.   {#1945}
[02:02:26] TEACHER: And in most cases, if it's human error, the team lead should be sacked.   {#1946}
[02:02:31] TEACHER: simple as that, right? They should do   {#1947}
[02:02:33] TEACHER: very thorough reviews of every single thing   {#1948}
[02:02:35] TEACHER: that they are doing. UB should not   {#1949}
[02:02:37] TEACHER: operate on such things as simple   {#1950}
[02:02:39] TEACHER: as that unless it's thoroughly verified.   {#1951}
[02:02:42] TEACHER: But I'm happy to   {#1952}
[02:02:43] TEACHER: take it at the end.   {#1953}
---- OWNED SEGMENTS END ----

CTX| [02:02:46] TEACHER: Let me basically cover   {#1954}
CTX| [02:02:47] TEACHER: a few of these details. I still   {#1955}
CTX| [02:02:49] TEACHER: have a bunch of things to cover in this.   {#1956}
CTX| [02:02:51] TEACHER: We are still here to touch upon high level and make it distributed   {#1957}
CTX| [02:02:53] TEACHER: and how Redis does that.   {#1958}
CTX| [02:02:55] TEACHER: I just want to spend more time   {#1959}
CTX| [02:02:57] TEACHER: on explaining that. So that's why.   {#1960}
CTX| [02:02:59] TEACHER: Just bear with me for next   {#1961}
CTX| [02:03:01] TEACHER: 10-15 minutes okay so what we do with this is we start with a simple mysql with storage we start a   {#1962}
CTX| [02:03:09] TEACHER: single load no don't think about distributed on day zero it's that simple and then think about   {#1963}
CTX| [02:03:14] TEACHER: distribute first cover all the devils sort it out make things forward and then scale so we add a   {#1964}
CTX| [02:03:20] TEACHER: simple schema called store we have key we have value we store the ptl we store is deleted like   {#1965}
CTX| [02:03:25] TEACHER: this comes so naturally to us that hey we store the absolute expiration time and we store soft   {#1966}
CTX| [02:03:29] TEACHER: built it but when we do this let's think about storage do we really need every single column   {#1967}
CTX| [02:03:35] TEACHER: that we added we are habituated and i'm not even kidding we are habituated into having an id column   {#1968}
CTX| [02:03:42] TEACHER: auto increment for some reason people are obsessed by it and i know why orms orm sucks i hate them   {#1969}
