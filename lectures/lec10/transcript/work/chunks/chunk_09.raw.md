# chunk_09  OWNS 01:39:09 -> 01:50:07  (segments #1765-#1958, 1869 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:38:10] STUDENT_4: Posting.   {#1732}
CTX| [01:38:11] TEACHER: No, you cannot upload to the same path.   {#1733}
CTX| [01:38:12] TEACHER: That's the wrong thing.   {#1734}
CTX| [01:38:14] TEACHER: That we conversion.   {#1735}
CTX| [01:38:16] STUDENT_4: Just a second.   {#1736}
CTX| [01:38:17] STUDENT_4: Just a second.   {#1737}
CTX| [01:38:17] STUDENT_4: Okay.   {#1738}
CTX| [01:38:18] STUDENT_4: We can upload to our same path and like there needs to be versioning enabled.   {#1739}
CTX| [01:38:23] TEACHER: You are going into S3 specific, right?   {#1740}
CTX| [01:38:26] STUDENT_4: That versioning enabled and whatnot.   {#1741}
CTX| [01:38:28] STUDENT_4: Any back, like anything that supports backup.   {#1742}
CTX| [01:38:33] STUDENT_4: will support versioning.   {#1743}
CTX| [01:38:34] TEACHER: Like that's exactly what we did with creating two files separate.   {#1744}
CTX| [01:38:38] TEACHER: Yeah.   {#1745}
CTX| [01:38:38] TEACHER: That's like,   {#1746}
CTX| [01:38:39] TEACHER: right.   {#1747}
CTX| [01:38:40] TEACHER: So I'm what I'm,   {#1748}
CTX| [01:38:41] TEACHER: I am saying this so that other don't get confused.   {#1749}
CTX| [01:38:43] TEACHER: That's fine.   {#1750}
CTX| [01:38:44] TEACHER: Right.   {#1751}
CTX| [01:38:45] STUDENT_4: Yeah.   {#1752}
CTX| [01:38:45] STUDENT_4: Okay.   {#1753}
CTX| [01:38:46] STUDENT_4: Let's just say like there is a matter dot Jason.   {#1754}
CTX| [01:38:48] STUDENT_4: Okay.   {#1755}
CTX| [01:38:49] STUDENT_4: So whenever like there is a update,   {#1756}
CTX| [01:38:51] STUDENT_4: we can just update matter dot Jason.   {#1757}
CTX| [01:38:53] STUDENT_4: Okay.   {#1758}
CTX| [01:38:55] STUDENT_4: And not only the parts we can also have,   {#1759}
CTX| [01:38:58] STUDENT_4: like a,   {#1760}
CTX| [01:38:59] STUDENT_4: we can also check matter dot Jason attributes,   {#1761}
CTX| [01:39:01] STUDENT_4: like a updated at,   {#1762}
CTX| [01:39:04] TEACHER: That is still polling.   {#1763}
CTX| [01:39:05] TEACHER: That is still polling.   {#1764}

---- OWNED SEGMENTS START ----
[01:39:09] STUDENT_4: We are doing it on like any request that we are like that we are having.   {#1765}
[01:39:13] STUDENT_4: Okay.   {#1766}
[01:39:15] TEACHER: But on every request made making a meta call to meta Jason file expensive.   {#1767}
[01:39:19] TEACHER: Why, why would you want to do that?   {#1768}
[01:39:20] TEACHER: That's still polling.   {#1769}
[01:39:21] STUDENT_4: Okay.   {#1770}
[01:39:22] STUDENT_4: Let's just say, okay, not meta.json.   {#1771}
[01:39:24] STUDENT_4: We can talk about like that, our dictionary file, the dictionary file that we are having,   {#1772}
[01:39:30] STUDENT_4: which shall, which is having all the entries.   {#1773}
[01:39:33] STUDENT_4: Okay. We can check like anyway, we are reading that file and whenever any request is coming.   {#1774}
[01:39:39] STUDENT_4: Okay. Before that we can just check updated at or anything like that tag.   {#1775}
[01:39:44] TEACHER: Like, no, you can't. That's what I said. That's what I said. Right. Because when you are reading   {#1776}
[01:39:50] TEACHER: that you would get garbage data, then you would make another read, reload the index and whatnot.   {#1777}
[01:39:54] STUDENT_4: Right. No, like not the garbage data I am talking about, like before, like reading the file itself   {#1778}
[01:40:02] STUDENT_4: before reading a file itself we are just checking like we have like any any file has like metadata   {#1779}
[01:40:08] STUDENT_4: like updated at created at and all of those things where is that stored so like   {#1780}
[01:40:18] STUDENT_4: like those in informations are stored at the top of the file i think like no for the text file for   {#1781}
[01:40:24] TEACHER: the text file no that are not stored there that's hard that's what okay let me convert this this   {#1782}
[01:40:30] TEACHER: to go into crazy directions.   {#1783}
[01:40:32] TEACHER: So let me converge it.   {#1784}
[01:40:33] TEACHER: Let me converge faster.   {#1785}
[01:40:35] TEACHER: Otherwise, we would spend till 11.30 on this.   {#1786}
[01:40:38] TEACHER: Right.   {#1787}
[01:40:38] TEACHER: But it's good that you folks are thinking.   {#1788}
[01:40:40] TEACHER: Why are we making certain decisions?   {#1789}
[01:40:42] TEACHER: Now we understand.   {#1790}
[01:40:43] TEACHER: Right.   {#1791}
[01:40:44] TEACHER: The what you're talking about this Rahul on bursting and all.   {#1792}
[01:40:47] TEACHER: This is exactly that where you're uploading it.   {#1793}
[01:40:49] TEACHER: Different files.   {#1794}
[01:40:50] TEACHER: Having a meta file.   {#1795}
[01:40:51] TEACHER: Meta file contains which one is the active one.   {#1796}
[01:40:54] TEACHER: Right.   {#1797}
[01:40:54] TEACHER: That's the latest version.   {#1798}
[01:40:55] TEACHER: Internally, S3 can abstract it out for us.   {#1799}
[01:40:58] TEACHER: Right.   {#1800}
[01:40:58] TEACHER: But I'm laying out in a very simple terms.   {#1801}
[01:41:00] TEACHER: Okay, now if you look carefully, this is exactly what would you do when you reboot a server.   {#1802}
[01:41:07] TEACHER: Because when a server reboots, it would root the meta.json file, understand what path it is,   {#1803}
[01:41:12] TEACHER: go to this path, read the file, read the index, build this hash map and start serving the request.   {#1804}
[01:41:17] TEACHER: So what we are effectively trying to do is when we are done uploading this file to this path,   {#1805}
[01:41:22] TEACHER: updating the meta.json file, we just want to trigger a server reload,   {#1806}
[01:41:27] TEACHER: which is equivalent to doing a deployment.   {#1807}
[01:41:32] TEACHER: do you don't need this you just include your AWS SDK and trigger a deployment using a deployment   {#1808}
[01:41:43] TEACHER: pipeline and bot not it would do rolling upgrade you just automatically when you trigger a deployment   {#1809}
[01:41:48] TEACHER: when you have a rolling deployment configured it would take down one server spin up another machine   {#1810}
[01:41:54] TEACHER: when this new machine spins up it would read the meta to the simple because that's what you have   {#1811}
[01:41:58] TEACHER: return when the server boots up and your API server boots up that's what you are doing.   {#1812}
[01:42:02] TEACHER: You are reading this metadata file now it would get the new path. It would read it and serve it.   {#1813}
[01:42:08] TEACHER: The problem is with inconsistency but you are still not serving garbage. You would have a time   {#1814}
[01:42:12] TEACHER: while this deployment is happening that sometimes the request goes to one server that has already   {#1815}
[01:42:18] TEACHER: built index on that old data while other server that is new server that is the new data but   {#1816}
[01:42:24] TEACHER: meanings does not drastically change.   {#1817}
[01:42:26] TEACHER: You are at least not serving garbage data.   {#1818}
[01:42:28] TEACHER: You are serving eventually consistent   {#1819}
[01:42:30] TEACHER: data, but that's fine because meanings   {#1820}
[01:42:32] TEACHER: anyway does not change   {#1821}
[01:42:34] TEACHER: drastically.   {#1822}
[01:42:36] TEACHER: So you avoid surveying   {#1823}
[01:42:38] TEACHER: garbage data because   {#1824}
[01:42:40] TEACHER: you are reading from another   {#1825}
[01:42:42] TEACHER: file now and you are just triggering   {#1826}
[01:42:44] TEACHER: a rolling deployment. Any deployment strategy is fine.   {#1827}
[01:42:46] TEACHER: You are just triggering your deployment   {#1828}
[01:42:48] TEACHER: using the cloud provider that you are using   {#1829}
[01:42:50] TEACHER: and it would seamlessly take its effect.   {#1830}
[01:42:53] TEACHER: This   {#1831}
[01:42:54] TEACHER: is how you don't need anything.   {#1832}
[01:42:56] TEACHER: When you see just one deployment invocation call,   {#1833}
[01:42:58] TEACHER: whatever cloud provider you are using, Jenkins job,   {#1834}
[01:43:00] TEACHER: whatever you are doing, just you got a simple deployment.   {#1835}
[01:43:03] TEACHER: Because when any API server boot up,   {#1836}
[01:43:05] TEACHER: it would read the metadata JSON file.   {#1837}
[01:43:07] TEACHER: In the metadata JSON file, now the path is the new path.   {#1838}
[01:43:09] TEACHER: Load the file and serve it.   {#1839}
[01:43:11] TEACHER: Simple.   {#1840}
[01:43:12] TEACHER: Right?   {#1841}
[01:43:13] TEACHER: So instead of exposing API endpoints, reactive,   {#1842}
[01:43:16] TEACHER: Redis, PubSub, all of that, throw it out of the window.   {#1843}
[01:43:19] TEACHER: Trigger a simple deployment and a job is done.   {#1844}
[01:43:22] TEACHER: Right?   {#1845}
[01:43:24] TEACHER: that's exactly what I have written in this part. This entire thing that I've done,   {#1846}
[01:43:31] TEACHER: this thing is exactly that. I've just been a little more elaborative on what we just covered.   {#1847}
[01:43:37] TEACHER: This is exactly that. Change log, how it would happen, merge that we just discussed,   {#1848}
[01:43:42] TEACHER: uploading it to the same path, transition, reactive pops up, parallel setup. This is what we are doing   {#1849}
[01:43:48] TEACHER: as parallel setup. Portability by adding header and this is what would happen behind this.   {#1850}
[01:43:55] TEACHER: That's exactly what I have covered.   {#1851}
[01:43:56] TEACHER: We went very in depth when you are brainstorming it.   {#1852}
[01:43:59] TEACHER: But now why did we discuss it?   {#1853}
[01:44:01] TEACHER: Let's first understand that.   {#1854}
[01:44:03] TEACHER: What we just see with this is we are now able to seamlessly fire your get request on S3.   {#1855}
[01:44:14] TEACHER: Not put request, get request on S3.   {#1856}
[01:44:16] TEACHER: Pointed reads, reading the bare minimum amount of data that you have to.   {#1857}
[01:44:20] TEACHER: This has huge applications.   {#1858}
[01:44:24] TEACHER: storage because of this. So let's say you have gigantic amount of data in your database on which   {#1859}
[01:44:29] TEACHER: let's say historical data is not even queried. I'll give an example, Amazon orders. Amazon orders,   {#1860}
[01:44:34] TEACHER: how likely are you to access orders that you made six months back? Highly unlikely, right? Highly   {#1861}
[01:44:41] TEACHER: unlikely you would do that. So what if you take the six months old order and push them to S3?   {#1862}
[01:44:47] TEACHER: But this does not mean user would never do that. User can still go back in time and check,   {#1863}
[01:44:51] TEACHER: what was the order that I made.   {#1864}
[01:44:53] TEACHER: So if your order is reset,   {#1865}
[01:44:55] TEACHER: you go to your hot database,   {#1866}
[01:44:57] TEACHER: let's say MySQL.   {#1867}
[01:44:58] TEACHER: And if it is your old order,   {#1868}
[01:45:01] TEACHER: you go to S3 and read it.   {#1869}
[01:45:03] TEACHER: But how do you know?   {#1870}
[01:45:04] TEACHER: On S3,   {#1871}
[01:45:05] TEACHER: you cannot just dump everything in a JSON file.   {#1872}
[01:45:07] TEACHER: You need an ability to make pointed queries on S3.   {#1873}
[01:45:10] TEACHER: This is how you are doing it.   {#1874}
[01:45:12] TEACHER: This gives you an ability   {#1875}
[01:45:15] TEACHER: to fire pointed queries on S3.   {#1876}
[01:45:18] TEACHER: Because now literally,   {#1877}
[01:45:21] TEACHER: order ID, you're getting order details from S3.   {#1878}
[01:45:24] TEACHER: Dead simple.   {#1879}
[01:45:25] TEACHER: And this is the beauty.   {#1880}
[01:45:27] TEACHER: This one system that we just discussed as example,   {#1881}
[01:45:30] TEACHER: as simple as word dictionary on S3,   {#1882}
[01:45:32] TEACHER: it solves a ton of problems.   {#1883}
[01:45:35] TEACHER: It helps us, it lays the foundation for multi-tiered storages   {#1884}
[01:45:39] TEACHER: because we are not losing an ability to query the data   {#1885}
[01:45:42] TEACHER: that we dump on S3.   {#1886}
[01:45:43] TEACHER: In most places, you think that, hey, when I dump on S3, it's archival.   {#1887}
[01:45:47] TEACHER: Here, it's a cheap storage for us.   {#1888}
[01:45:51] TEACHER: We reduce the cost of our main database by keeping the data that is very infrequently accessed on S3.   {#1889}
[01:45:58] TEACHER: By trading off the time because in hot database you can get it very fast.   {#1890}
[01:46:03] TEACHER: But on S3 you would get it relatively relatively very slow.   {#1891}
[01:46:07] TEACHER: But that's okay because that's very infrequently accessed data.   {#1892}
[01:46:09] TEACHER: But because you move data out of your hot database into your cold storage.   {#1893}
[01:46:14] TEACHER: You are reducing the cost of your hot database which is significant save.   {#1894}
[01:46:19] TEACHER: Significant.   {#1895}
[01:46:21] TEACHER: lays the foundation for that.   {#1896}
[01:46:23] TEACHER: Another example, Athena.   {#1897}
[01:46:25] TEACHER: Athena does exactly this.   {#1898}
[01:46:28] TEACHER: On Athena, you can load a CSV file and fire queries on this.   {#1899}
[01:46:31] TEACHER: This is exactly what Athena is doing behind the scenes.   {#1900}
[01:46:33] TEACHER: It is creating an index, keeping it handy,   {#1901}
[01:46:36] TEACHER: along with that file.   {#1902}
[01:46:37] TEACHER: When you fire the request, it goes to that file,   {#1903}
[01:46:39] TEACHER: reads the records and serves it back.   {#1904}
[01:46:41] TEACHER: Athena internally does exactly this.   {#1905}
[01:46:43] TEACHER: So having an ability.   {#1906}
[01:46:45] TEACHER: So what we just built is we built an ability to query data.   {#1907}
[01:46:49] TEACHER: Simple key value format.   {#1908}
[01:46:51] TEACHER: more complex but to start with let's start simple to fire a simple get key request on s3 without   {#1909}
[01:46:58] TEACHER: without having to read this entire file we just built it it has a ton of applications around it   {#1910}
[01:47:04] TEACHER: right aws s3 athena entire data lake if you have heard of data lake data engineering folks would   {#1911}
[01:47:11] TEACHER: definitely know it but data lakes are where you're storing huge amount of data in a very cheap storage   {#1912}
[01:47:17] TEACHER: but having an ability to query it.   {#1913}
[01:47:19] TEACHER: Apache Hudi does exactly this behind the scenes.   {#1914}
[01:47:22] TEACHER: The format that Hudi table format is exactly this index   {#1915}
[01:47:25] TEACHER: that we are storing.   {#1916}
[01:47:26] TEACHER: Hive partitions, exactly this.   {#1917}
[01:47:28] TEACHER: This is the foundation for having an ability to query   {#1918}
[01:47:33] TEACHER: huge amount of data on a very cheap storage.   {#1919}
[01:47:38] TEACHER: And this is what I wanted to cover.   {#1920}
[01:47:40] TEACHER: It comes to building a word dictionary on S3,   {#1921}
[01:47:43] TEACHER: considering from deciding to development to deployment seamless transitions and everything   {#1922}
[01:47:50] TEACHER: and keeping things really simple rather than over complicated right okay any questions on this   {#1923}
[01:47:56] TEACHER: i'll take questions till 55 and then we go on a break till 11. yeah maybe few things i'm not able   {#1924}
[01:48:04] STUDENT_1: to make sense. I'm just asking what we are trying to say at the time of when we created the merged   {#1925}
[01:48:13] STUDENT_1: file, which is the current file plus the change. Now we have a new file. Now once we create the   {#1926}
[01:48:20] STUDENT_1: new file, this new file has to go and create a new path in S3 and that has to be known to the   {#1927}
[01:48:26] STUDENT_1: API servers. That's what we are trying to achieve.   {#1928}
[01:48:29] STUDENT_1: Now, if we are sending, so let's say, but I understood the solution is we send a request   {#1929}
[01:48:38] STUDENT_1: to S3 that, okay, this is the new file and we go and update in a new path, which is being   {#1930}
[01:48:47] STUDENT_1: mentioned in the meta file.   {#1931}
[01:48:49] TEACHER: Meta.json file.   {#1932}
[01:48:50] TEACHER: Meta.json.   {#1933}
[01:48:51] STUDENT_1: And on that call itself,   {#1934}
[01:48:54] STUDENT_1: we are sending API servers   {#1935}
[01:48:56] STUDENT_1: to go and do the redeployment.   {#1936}
[01:48:58] STUDENT_1: Correct?   {#1937}
[01:48:58] TEACHER: No, no, no.   {#1938}
[01:48:59] TEACHER: Once that file is...   {#1939}
[01:49:00] TEACHER: Correct, correct, correct.   {#1940}
[01:49:01] TEACHER: So in that new server,   {#1941}
[01:49:02] TEACHER: when this meta.json file is updated,   {#1942}
[01:49:04] TEACHER: we are just triggering a deployment   {#1943}
[01:49:06] TEACHER: of our API servers.   {#1944}
[01:49:07] STUDENT_1: Okay.   {#1945}
[01:49:08] STUDENT_1: So we are making sure first   {#1946}
[01:49:09] STUDENT_1: the meta.json is updated.   {#1947}
[01:49:13] STUDENT_1: Yes.   {#1948}
[01:49:13] STUDENT_1: So in the deployment of my...   {#1949}
[01:49:16] STUDENT_1: in the change log process, I'm making sure file is created, then meta is updated,   {#1950}
[01:49:22] STUDENT_1: then only I'm sending this thing to the deployment server. Yes. Yes. Okay.   {#1951}
[01:49:29] STUDENT_1: Just I'm thinking about, can we do a bit better in place of creating a new VM whole deployment,   {#1952}
[01:49:37] STUDENT_1: It's a redeployment and it is just like a process that was reloaded at the startup.   {#1953}
[01:49:46] STUDENT_1: Yeah.   {#1954}
[01:49:47] STUDENT_1: Can we create something which is invoked?   {#1955}
[01:49:52] STUDENT_1: The whole thing is like going, heading from meta, creating the index and start serving   {#1956}
[01:49:57] STUDENT_1: of the hash table from server.   {#1957}
[01:49:59] STUDENT_1: This is the whole thing in place of doing the whole redeployment can be a wide of.   {#1958}
---- OWNED SEGMENTS END ----

CTX| [01:50:07] STUDENT_1: creating a new VM, doing the whole redeployment.   {#1959}
CTX| [01:50:10] STUDENT_1: Is there a better way we can do it?   {#1960}
CTX| [01:50:12] TEACHER: I, maybe I am like, no, there are, there are,   {#1961}
CTX| [01:50:15] TEACHER: I can imagine three ways to do it,   {#1962}
CTX| [01:50:17] TEACHER: but it's just, just make things little more complicated.   {#1963}
CTX| [01:50:19] TEACHER: For example, I'll give an example.   {#1964}
CTX| [01:50:20] STUDENT_13: Sure.   {#1965}
CTX| [01:50:21] TEACHER: What you can do is instead of doing redeployment of it,   {#1966}
CTX| [01:50:26] TEACHER: have like what I think Sitesh mentioned that just have API endpoints   {#1967}
CTX| [01:50:30] TEACHER: that would trigger reload of the API servers or trigger API servers,   {#1968}
CTX| [01:50:34] TEACHER: make it reactive instead of doing redeployment.   {#1969}
CTX| [01:50:37] TEACHER: seems big enough, just have API inputs experts that you invoke,   {#1970}
CTX| [01:50:40] TEACHER: which tells them to now go and pick the new file from S3.   {#1971}
CTX| [01:50:43] TEACHER: That's right.   {#1972}
CTX| [01:50:44] TEACHER: That is one way to do it.   {#1973}
CTX| [01:50:45] TEACHER: But I'm just making things simple because this is an out of the box approach.   {#1974}
CTX| [01:50:50] TEACHER: Thinking of triggering a deployment as part of an all server reload   {#1975}
CTX| [01:50:54] TEACHER: is an out of the box approach, which a lot of engineers just don't think about.   {#1976}
CTX| [01:50:59] TEACHER: So it's just that I'm proving you all to think in that direction   {#1977}
CTX| [01:51:03] TEACHER: that can we come up with something as simple   {#1978}
CTX| [01:51:07] TEACHER: I just triggered a problem because it's anyway, the cost remains exactly the same, but not   {#1979}
