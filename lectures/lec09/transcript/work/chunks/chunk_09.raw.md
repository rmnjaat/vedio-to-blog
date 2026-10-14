# chunk_09  OWNS 01:36:44 -> 01:47:21  (segments #1740-#1974, 1855 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:35:48] TEACHER: when this is passed this request will go where cdn and this request goes to cdn says hey do i have   {#1725}
CTX| [01:35:56] TEACHER: this path let's say it does not have this path it says then do i have this path so first it would   {#1726}
CTX| [01:36:02] TEACHER: check do i have already processed image no do i have this path let's say no so it would first go   {#1727}
CTX| [01:36:07] TEACHER: to this go to origin read the image actual original image comes to cdn now cdn would see and apply oh   {#1728}
CTX| [01:36:14] TEACHER: this user requested me to do a w equal to 360.   {#1729}
CTX| [01:36:17] TEACHER: So it would do the image processing on the CDN server and cache it.   {#1730}
CTX| [01:36:21] TEACHER: So it would convert the image to 360p pixel image   {#1731}
CTX| [01:36:24] TEACHER: and it would cache it on the CDN and it would serve it to the user.   {#1732}
CTX| [01:36:28] TEACHER: Next time the same request comes in,   {#1733}
CTX| [01:36:30] TEACHER: this thing, it would just bluntly check if this path exists,   {#1734}
CTX| [01:36:33] TEACHER: if it exists good enough,   {#1735}
CTX| [01:36:34] TEACHER: which means already processed image exists.   {#1736}
CTX| [01:36:36] TEACHER: If not, it would see this image exists.   {#1737}
CTX| [01:36:38] TEACHER: If not, it would fetch the image, put it back,   {#1738}
CTX| [01:36:41] TEACHER: process it through this and serve it back.   {#1739}

---- OWNED SEGMENTS START ----
[01:36:44] TEACHER: you can leverage CDN to do image processing as well.   {#1740}
[01:36:48] TEACHER: Now you can do a lot more with this.   {#1741}
[01:36:50] TEACHER: Image resizing, image coloring, grayscaling,   {#1742}
[01:36:54] TEACHER: transpose, rotation.   {#1743}
[01:36:56] TEACHER: Some services also provide recognitions as all.   {#1744}
[01:37:00] TEACHER: Far too many things.   {#1745}
[01:37:01] TEACHER: Pick your favorite CDN,   {#1746}
[01:37:02] TEACHER: see the kind of image processing capabilities   {#1747}
[01:37:04] TEACHER: that it provides.   {#1748}
[01:37:05] TEACHER: So you don't really, in today's day in it,   {#1749}
[01:37:08] TEACHER: you don't really have to build your own image   {#1750}
[01:37:11] TEACHER: uploading service or image optimization service.   {#1751}
[01:37:14] TEACHER: gives you those tools out of the box.   {#1752}
[01:37:16] TEACHER: You just pay that bit of money.   {#1753}
[01:37:18] TEACHER: Problem solved.   {#1754}
[01:37:19] TEACHER: Right.   {#1755}
[01:37:19] TEACHER: This is how you build real systems.   {#1756}
[01:37:21] TEACHER: Drawing boxes.   {#1757}
[01:37:22] TEACHER: Again, as I say, is the easiest thing to do.   {#1758}
[01:37:25] TEACHER: Build things how they're supposed to be.   {#1759}
[01:37:28] TEACHER: How real world builds them.   {#1760}
[01:37:29] TEACHER: Not just theoretical jargon.   {#1761}
[01:37:31] TEACHER: Right.   {#1762}
[01:37:32] TEACHER: Okay.   {#1763}
[01:37:33] TEACHER: Okay.   {#1764}
[01:37:33] TEACHER: And this is what I wanted to cover.   {#1765}
[01:37:35] TEACHER: Everything about image upload service that I feel is important.   {#1766}
[01:37:38] TEACHER: How we and what we covered.   {#1767}
[01:37:40] TEACHER: We covered quite a few things in detail.   {#1768}
[01:37:42] TEACHER: We first talked about just to summarize.   {#1769}
[01:37:44] TEACHER: question and we go on a break.   {#1770}
[01:37:46] TEACHER: Just to summarize, we first build an understanding of what CDN does.   {#1771}
[01:37:49] TEACHER: We saw that demo of how I've configured it on my website.   {#1772}
[01:37:53] TEACHER: Then we started talking about image upload service in that we first   {#1773}
[01:37:57] TEACHER: converge on storage, why we went for that because it was cheap.   {#1774}
[01:38:00] TEACHER: Then we talk about data flow.   {#1775}
[01:38:01] TEACHER: We saw one concern about doing double copy of data requiring 2x the bandwidth.   {#1776}
[01:38:07] TEACHER: Then we thought of directly uploading to S3.   {#1777}
[01:38:09] TEACHER: That's what we understood pre-signed URL.   {#1778}
[01:38:11] TEACHER: While understanding pre-signed URL, we saw a demo of how GitHub does it.   {#1779}
[01:38:14] TEACHER: recommend you to do try it on your own.   {#1780}
[01:38:17] TEACHER: All of you will have GitHub account to do that.   {#1781}
[01:38:19] TEACHER: When we did that,   {#1782}
[01:38:20] TEACHER: then we talked about separation of concerns,   {#1783}
[01:38:22] TEACHER: how we separated the post and the image   {#1784}
[01:38:25] TEACHER: so that our systems are extensible   {#1785}
[01:38:26] TEACHER: and not storing the derived value   {#1786}
[01:38:28] TEACHER: so that we can change the CDL on the fly   {#1787}
[01:38:30] TEACHER: and do any experimentations we need.   {#1788}
[01:38:32] TEACHER: Then we talked about privacy,   {#1789}
[01:38:34] TEACHER: how privacy works in real world   {#1790}
[01:38:37] TEACHER: and how you can make things 100% private   {#1791}
[01:38:40] TEACHER: by letting everything go through image,   {#1792}
[01:38:42] TEACHER: through the API servers   {#1793}
[01:38:44] TEACHER: CDN. That's how you make it 100% private. Then we talk about extensibility a bit, where we said   {#1794}
[01:38:50] TEACHER: that when the post is published, you put a message on Kafka store as other services to consume.   {#1795}
[01:38:54] TEACHER: And then we talk about optimization through CDN, where we saw how we can leverage CDN,   {#1796}
[01:39:00] TEACHER: pass in a bunch of parameters, depending on the CDN that you provide, that you use,   {#1797}
[01:39:04] TEACHER: go through the documentation and see the image processing capabilities that it provides.   {#1798}
[01:39:08] TEACHER: And this completes a very real world image upload service. We showed you the actual   {#1799}
[01:39:14] TEACHER: that you saw it, you saw it first time, right?   {#1800}
[01:39:18] TEACHER: And this is how you think about implementation   {#1801}
[01:39:20] TEACHER: at every single step.   {#1802}
[01:39:23] TEACHER: I could have just drawn this box   {#1803}
[01:39:25] TEACHER: and you all would be happy or not.   {#1804}
[01:39:27] TEACHER: Let me make it a little more complex.   {#1805}
[01:39:29] TEACHER: I would have drawn this box and you would be happy.   {#1806}
[01:39:31] TEACHER: But that's not what real engineers do.   {#1807}
[01:39:34] TEACHER: Think about implementation.   {#1808}
[01:39:35] TEACHER: Think about the specifics.   {#1809}
[01:39:36] TEACHER: That's what makes you better, better than the most.   {#1810}
[01:39:39] TEACHER: Right?   {#1811}
[01:39:40] TEACHER: Okay.   {#1812}
[01:39:40] TEACHER: I will take questions till 10, 15,   {#1813}
[01:39:42] TEACHER: and then we're going to break.   {#1814}
[01:39:43] TEACHER: Okay.   {#1815}
[01:39:48] STUDENT_7: Yes, Amrit.   {#1816}
[01:39:52] STUDENT_1: We saw that if anyone has the URL for the CDN, then they can access it.   {#1817}
[01:39:57] STUDENT_1: Those things become private, right?   {#1818}
[01:40:00] STUDENT_1: So OTT must have done the authorization thing first and then they give the access to CDN?   {#1819}
[01:40:08] STUDENT_1: Or how is that?   {#1820}
[01:40:09] STUDENT_5: OTT will talk later.   {#1821}
[01:40:10] TEACHER: We'll talk later.   {#1822}
[01:40:11] TEACHER: Sixth week.   {#1823}
[01:40:12] TEACHER: Sixth week we'll talk about it.   {#1824}
[01:40:17] STUDENT_1: So basically what I was thinking is like there was some sort of like a proprietary format   {#1825}
[01:40:25] STUDENT_1: for these images that only Instagram app is able to open.   {#1826}
[01:40:31] STUDENT_1: This problem can be resolved, right?   {#1827}
[01:40:36] TEACHER: Why would that be the case?   {#1828}
[01:40:38] TEACHER: Because for your Instagram to render it, they would have to ship it in the Android code.   {#1829}
[01:40:44] TEACHER: Once it is out there in the APK, anyone can decompile and extract it.   {#1830}
[01:40:49] TEACHER: There is no rocket science.   {#1831}
[01:40:51] STUDENT_8: Okay.   {#1832}
[01:40:52] STUDENT_1: So like, if we see like Udemy, Udemy also like handles videos in DRM context, right?   {#1833}
[01:41:05] TEACHER: DRM is different.   {#1834}
[01:41:06] TEACHER: Proprietary format is different.   {#1835}
[01:41:08] STUDENT_1: Okay.   {#1836}
[01:41:09] STUDENT_1: Okay, so like it was kind of like, like I was thinking on those lights actually.   {#1837}
[01:41:15] TEACHER: So there is nothing called proprietary format because once you ship your code, ship your   {#1838}
[01:41:18] TEACHER: jar, you can anyone can decompile and look at the source code.   {#1839}
[01:41:23] STUDENT_11: Okay.   {#1840}
[01:41:25] TEACHER: It's easy to reverse engineer your format.   {#1841}
[01:41:27] TEACHER: That's not secure.   {#1842}
[01:41:30] TEACHER: Once you ship it out in the public, it's out in the public.   {#1843}
[01:41:34] TEACHER: And what you're talking about DRM is very different.   {#1844}
[01:41:36] TEACHER: I use DRM, as I know.   {#1845}
[01:41:39] TEACHER: I have quite implemented DRM.   {#1846}
[01:41:41] TEACHER: So DRM is very different than proprietary format.   {#1847}
[01:41:44] STUDENT_1: Okay.   {#1848}
[01:41:46] STUDENT_1: I will have to research about DRM.   {#1849}
[01:41:48] STUDENT_1: Yeah.   {#1850}
[01:41:48] TEACHER: Read more about DRM.   {#1851}
[01:41:50] TEACHER: It's very interesting.   {#1852}
[01:41:52] TEACHER: There are a lot of interesting hacks even I've applied.   {#1853}
[01:41:54] TEACHER: Now I can catch who is doing mischief on my platform because it's my platform.   {#1854}
[01:41:58] TEACHER: I can do that.   {#1855}
[01:42:00] TEACHER: While implementing, while building entire relog, I got to know all this fancy stuff and which   {#1856}
[01:42:06] TEACHER: And then I found a lot of loopholes.   {#1857}
[01:42:09] TEACHER: I wore the hacker's hat and tried to hack my own system,   {#1858}
[01:42:13] TEACHER: find out and kept on fixing it.   {#1859}
[01:42:16] TEACHER: I did that iteration for 10 days straight.   {#1860}
[01:42:19] TEACHER: So that's why I went really deep into DRM protection and whatnot.   {#1861}
[01:42:23] TEACHER: Just ensure that I have it fully covered.   {#1862}
[01:42:26] TEACHER: But I'm very interested to go through that.   {#1863}
[01:42:28] STUDENT_1: Basically, you became white hat hacker.   {#1864}
[01:42:32] TEACHER: Kind of, yes.   {#1865}
[01:42:34] TEACHER: I'm glad you didn't say white hat.   {#1866}
[01:42:38] TEACHER: but yes exactly i i try to hack my own system i had to do it i had to do it   {#1867}
[01:42:43] TEACHER: but do read into drm there is a lot of fascinating things out there how people   {#1868}
[01:42:48] TEACHER: and the most interesting part of that is how people capture the one who did that and that   {#1869}
[01:42:56] TEACHER: acts as a formal proof i can launch literally i can launch a police complaint and the person   {#1870}
[01:43:01] TEACHER: will be behind bars for three years that's the statement from indian government fii so if you   {#1871}
[01:43:07] TEACHER: pirate any content and and they have a proof a drm proof that you did it you are in jail for three   {#1872}
[01:43:14] TEACHER: years no questions asked you're not given a bail at any cost that's how strict the laws are now so   {#1873}
[01:43:21] TEACHER: beware before you think of pirating anything nowadays because everything is traceable i   {#1874}
[01:43:26] TEACHER: I ensure that I have three formal complaints registered.   {#1875}
[01:43:30] TEACHER: Three formal complaints.   {#1876}
[01:43:31] TEACHER: In last one month, I registered three complaints.   {#1877}
[01:43:33] TEACHER: Those three folks are going down 100%.   {#1878}
[01:43:37] TEACHER: So beware before you take any steps.   {#1879}
[01:43:39] TEACHER: And not just my course, any course.   {#1880}
[01:43:41] TEACHER: You don't know what is DRM protected.   {#1881}
[01:43:43] TEACHER: Laws are really strict nowadays.   {#1882}
[01:43:45] TEACHER: Google is taking very serious actions.   {#1883}
[01:43:48] TEACHER: A lot of things are going berserk.   {#1884}
[01:43:50] TEACHER: But it's good that people are now doing this.   {#1885}
[01:43:54] TEACHER: Yes, Harsh?   {#1886}
[01:43:57] STUDENT_9: So in this approach, I just think that for example, if you upload something, but did not   {#1887}
[01:44:03] STUDENT_9: post, so our storage is wasted.   {#1888}
[01:44:07] TEACHER: That's why we said dirt cheap.   {#1889}
[01:44:09] TEACHER: Yeah.   {#1890}
[01:44:09] STUDENT_9: It's very cheap.   {#1891}
[01:44:10] STUDENT_9: Yeah.   {#1892}
[01:44:11] STUDENT_9: But we need to think on this clean up or something.   {#1893}
[01:44:14] STUDENT_9: It's if it's a big concern.   {#1894}
[01:44:16] TEACHER: Correct.   {#1895}
[01:44:16] TEACHER: If it's a concern, then you anyway have a database in which you are storing the images.   {#1896}
[01:44:20] TEACHER: It's may not be published because unless you make an entry in the post, it is not really   {#1897}
[01:44:24] TEACHER: published, you can see the entries which are there, but not posted and you can clean it   {#1898}
[01:44:27] TEACHER: up.   {#1899}
[01:44:28] TEACHER: But if that is difficult enough, you leave it.   {#1900}
[01:44:30] TEACHER: It's anyway dirt cheap.   {#1901}
[01:44:31] TEACHER: So it's okay.   {#1902}
[01:44:33] STUDENT_9: And why exactly we are using Kafka here?   {#1903}
[01:44:36] STUDENT_9: It is just for that notification or other notification.   {#1904}
[01:44:39] TEACHER: And you need to tell those service, right?   {#1905}
[01:44:41] TEACHER: A new post is published.   {#1906}
[01:44:43] STUDENT_9: Okay.   {#1907}
[01:44:44] TEACHER: How would you tell them?   {#1908}
[01:44:46] STUDENT_9: Right.   {#1909}
[01:44:46] STUDENT_9: All right.   {#1910}
[01:44:47] STUDENT_9: Yeah.   {#1911}
[01:44:47] STUDENT_9: Thank you.   {#1912}
[01:44:49] TEACHER: Last question before we go on a break.   {#1913}
[01:44:51] TEACHER: Go on Rajiv.   {#1914}
[01:44:53] TEACHER: How does the image service know that what is the nearest CDN to a user?   {#1915}
[01:44:57] STUDENT_2: I mean, that's CDN internal.   {#1916}
[01:44:59] TEACHER: That's CDN internal.   {#1917}
[01:45:00] TEACHER: You look up, that's where BGP protocol comes in.   {#1918}
[01:45:04] TEACHER: It's not, user service would not know.   {#1919}
[01:45:05] TEACHER: Image service would not know.   {#1920}
[01:45:07] TEACHER: User would not know.   {#1921}
[01:45:08] TEACHER: User would fire a simple DNS resolution request, which is where the DNS resolver   {#1922}
[01:45:12] TEACHER: would resolve it to the nearest one.   {#1923}
[01:45:13] TEACHER: And how it does it is with the BGP protocol.   {#1924}
[01:45:15] TEACHER: A few would, but that's how your CDN resolves to the near, sorry, the domain name resolves   {#1925}
[01:45:21] TEACHER: CRS CDN's IP address.   {#1926}
[01:45:24] TEACHER: Cloudflare has a blog on it   {#1927}
[01:45:25] TEACHER: and they have very conveniently   {#1928}
[01:45:27] TEACHER: said it's something proprietary or   {#1929}
[01:45:29] TEACHER: like they route a request somehow.   {#1930}
[01:45:31] TEACHER: But you can skim through it. You'll find   {#1931}
[01:45:33] TEACHER: some stuff on   {#1932}
[01:45:35] TEACHER: those lines but none   {#1933}
[01:45:37] TEACHER: has released the actual way to do   {#1934}
[01:45:39] TEACHER: it but people have tried to   {#1935}
[01:45:41] TEACHER: like you know   {#1936}
[01:45:43] TEACHER: superficially people explain it to say oh it would   {#1937}
[01:45:45] TEACHER: automatically do that. No one knows the   {#1938}
[01:45:47] TEACHER: actual details.   {#1939}
[01:45:49] TEACHER: Only Akamai, Cloudflare   {#1940}
[01:45:51] TEACHER: the actual CDN providers know those details, how they're actually doing it.   {#1941}
[01:45:55] TEACHER: And Akamai was the first to start it.   {#1942}
[01:45:59] TEACHER: Cloudflare hired a few folks from Akamai to do it, but something   {#1943}
[01:46:03] TEACHER: around that has happened.   {#1944}
[01:46:04] TEACHER: So you'll find a blog by Cloudflare on this very topic, but they have not   {#1945}
[01:46:09] TEACHER: disclosed any details, but you'll get a rough idea on how that happens.   {#1946}
[01:46:13] STUDENT_2: On the same note, only the image ID, which you sold it, the image ID, which   {#1947}
[01:46:17] STUDENT_2: service has generated, we store it in the SQL table now.   {#1948}
[01:46:23] STUDENT_2: But we don't know the exact URL.   {#1949}
[01:46:24] STUDENT_2: I mean, I mean, Amazon would store S3 will store it somewhere, but we don't know the   {#1950}
[01:46:29] STUDENT_2: exact URL or the place where they're stored.   {#1951}
[01:46:31] STUDENT_2: We just pass the, or we just create the path and then send out.   {#1952}
[01:46:35] STUDENT_2: Right.   {#1953}
[01:46:36] STUDENT_5: So why would we need to know the disk where S3 is storing it?   {#1954}
[01:46:39] STUDENT_2: No, no, that's not the question.   {#1955}
[01:46:41] STUDENT_2: The question is, there's the first few bytes where what is the, what is the.   {#1956}
[01:46:47] STUDENT_2: public IP of the S3.   {#1957}
[01:46:49] STUDENT_2: We just send it over there.   {#1958}
[01:46:50] STUDENT_2: Then S3 actually has to locate where the image ID was, right?   {#1959}
[01:46:53] STUDENT_2: And then it reaches out.   {#1960}
[01:46:54] STUDENT_2: Is that the way it goes?   {#1961}
[01:46:56] STUDENT_5: That's exactly.   {#1962}
[01:46:56] STUDENT_5: That's the black box for us.   {#1963}
[01:46:58] STUDENT_5: Why would we know which server to go to?   {#1964}
[01:47:00] TEACHER: For us is SDK.   {#1965}
[01:47:02] TEACHER: AWS SDK.   {#1966}
[01:47:03] TEACHER: Why should we care?   {#1967}
[01:47:04] TEACHER: Correct?   {#1968}
[01:47:05] TEACHER: Why should we care how S3 is doing it?   {#1969}
[01:47:07] TEACHER: S3 is black box for us.   {#1970}
[01:47:09] TEACHER: For this system, S3 is black box.   {#1971}
[01:47:11] TEACHER: For this system, CDN is black box.   {#1972}
[01:47:13] TEACHER: Right?   {#1973}
[01:47:14] TEACHER: So that's the API contract that we are working.   {#1974}
---- OWNED SEGMENTS END ----

CTX| [01:47:21] TEACHER: We'll take a break till 10.55 and when we'll come back, we'll talk about again a very interesting   {#1975}
CTX| [01:47:29] TEACHER: service.   {#1976}
CTX| [01:47:29] TEACHER: We'll go down the details called hashtag service.   {#1977}
CTX| [01:47:32] TEACHER: I'll lay out the problem statement.   {#1978}
CTX| [01:47:35] TEACHER: We'll have brainstorming, very interesting low-level details to explore.   {#1979}
CTX| [01:47:39] TEACHER: We'll talk about this in depth and we'll wrap by 11.30 today.   {#1980}
CTX| [01:47:44] TEACHER: We are on track.   {#1981}
CTX| [01:47:45] TEACHER: Great.   {#1982}
CTX| [01:47:45] TEACHER: See you folks at 10.55, 7, 8, 8, 8 minutes from now.   {#1983}
CTX| [01:47:50] TEACHER: Right.   {#1984}
CTX| [01:47:50] TEACHER: Sure.   {#1985}
CTX| [01:47:50] TEACHER: Thanks folks.   {#1986}
