# chunk_10  OWNS 01:43:08 -> 01:56:24  (segments #1777-#2028, 2128 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:42:09] TEACHER: requirements, things that others have not thought about, bringing in that clarity.   {#1755}
CTX| [01:42:14] TEACHER: Second is a hat of an architect where you're supposed to architect a system considering   {#1756}
CTX| [01:42:19] TEACHER: extensibility of it in the future.   {#1757}
CTX| [01:42:21] TEACHER: And third, the hat of an engineer, which goes into those low level nitty gritty details   {#1758}
CTX| [01:42:26] TEACHER: of it and ensures that it is optimal across all the layers.   {#1759}
CTX| [01:42:31] TEACHER: And this is what makes a good synergy.   {#1760}
CTX| [01:42:34] TEACHER: You have to wear three hats.   {#1761}
CTX| [01:42:35] TEACHER: today will bear the first hand   {#1762}
CTX| [01:42:37] TEACHER: around thinking around requirements   {#1763}
CTX| [01:42:40] TEACHER: where we   {#1764}
CTX| [01:42:42] TEACHER: are just given a briefing,   {#1765}
CTX| [01:42:43] TEACHER: a one-line briefing of the statement.   {#1766}
CTX| [01:42:45] TEACHER: Hey, let's allow people to tag people in   {#1767}
CTX| [01:42:47] TEACHER: for this.   {#1768}
CTX| [01:42:49] TEACHER: Okay.   {#1769}
CTX| [01:42:51] TEACHER: What questions would you ask   {#1770}
CTX| [01:42:53] TEACHER: not to manager but to yourself, to your   {#1771}
CTX| [01:42:55] TEACHER: team or how would you brainstorm   {#1772}
CTX| [01:42:57] TEACHER: about it? Raise your hands.   {#1773}
CTX| [01:42:59] TEACHER: I'll pull you in. One question, one person   {#1774}
CTX| [01:43:01] TEACHER: and then we move to the next one.   {#1775}
CTX| [01:43:03] TEACHER: Okay.   {#1776}

---- OWNED SEGMENTS START ----
[01:43:08] STUDENT_1: Yeah, maybe the first question I will try to figure it out.   {#1777}
[01:43:16] STUDENT_1: What should be the schema of storing tags?   {#1778}
[01:43:19] TEACHER: Nothing around engineering.   {#1779}
[01:43:20] TEACHER: Nothing around engineering.   {#1780}
[01:43:22] TEACHER: Don't think on engineering at all.   {#1781}
[01:43:24] TEACHER: Because all you are given is this one line briefing.   {#1782}
[01:43:27] TEACHER: Just one line briefing.   {#1783}
[01:43:29] TEACHER: Allow people to tag other people in photos.   {#1784}
[01:43:31] TEACHER: That's it.   {#1785}
[01:43:32] TEACHER: Think on the product side here.   {#1786}
[01:43:37] STUDENT_1: Okay.   {#1787}
[01:43:38] STUDENT_1: Then maybe the most important thing will be around who can tag and is there a way that   {#1788}
[01:43:48] STUDENT_1: I can mark tagging to be correct?   {#1789}
[01:43:52] STUDENT_1: Who can tag is one thing.   {#1790}
[01:43:54] TEACHER: No, who can tag?   {#1791}
[01:43:56] TEACHER: So what is the significance of who can tag?   {#1792}
[01:43:59] TEACHER: What would it allow?   {#1793}
[01:44:02] TEACHER: What would it enable you to do?   {#1794}
[01:44:05] STUDENT_1: that I'm the owner of let's say a photo then only I can tag.   {#1795}
[01:44:11] STUDENT_1: I should so nobody else can kind of attack the wrong thing, wrong people, wrong object or something like this.   {#1796}
[01:44:19] TEACHER: No, but someone else can tag you or not. That is also important, right?   {#1797}
[01:44:25] STUDENT_1: I mean that that is okay, but we also need to think about if it goes through a check.   {#1798}
[01:44:35] STUDENT_1: let's say some icons and not part of not not owner of a image and tries to tag somebody in a wrong   {#1799}
[01:44:44] STUDENT_1: way and normally there are repercussions around that no no no no you are not the owner of the   {#1800}
[01:44:50] TEACHER: image still you are doing that is different problem but you are tagging someone else in   {#1801}
[01:44:54] TEACHER: your photo that's different so what you should more focus on is authorization part where who can   {#1802}
[01:45:01] TEACHER: tag me in their photo obviously that's a check that you can only tag people in your photos right   {#1803}
[01:45:07] TEACHER: don't go into the correctness of it think about r is other person allowing you to tag himself or   {#1804}
[01:45:13] TEACHER: herself in your photo or not that is more important yes that's that's amenity right i know that's   {#1805}
[01:45:19] TEACHER: what you made it but you you you put it in a different way a different way got it but here   {#1806}
[01:45:24] TEACHER: it's more important that it should be in your control that do you want to have this feature   {#1807}
[01:45:31] TEACHER: dictating who can tag you in their photos.   {#1808}
[01:45:33] TEACHER: Yes.   {#1809}
[01:45:34] TEACHER: Right.   {#1810}
[01:45:34] TEACHER: Which means that now you have to have a separate authorization layer,   {#1811}
[01:45:38] TEACHER: which keeps track of things that,   {#1812}
[01:45:40] TEACHER: Hey,   {#1813}
[01:45:41] TEACHER: am I allowed to tag?   {#1814}
[01:45:42] TEACHER: Like who is allowed to tag me in their photos?   {#1815}
[01:45:44] TEACHER: So you will see this feature day in and day out on Instagram,   {#1816}
[01:45:47] TEACHER: where you are not,   {#1817}
[01:45:48] TEACHER: or even on Twitter,   {#1818}
[01:45:48] TEACHER: where you are not allowed to tag people in their posts,   {#1819}
[01:45:52] TEACHER: in their photos and whatnot.   {#1820}
[01:45:53] TEACHER: So that is an important part.   {#1821}
[01:45:55] TEACHER: Okay.   {#1822}
[01:45:56] TEACHER: Anubhav,   {#1823}
[01:45:56] TEACHER: what other part?   {#1824}
[01:45:59] STUDENT_5: Yep.   {#1825}
[01:46:01] STUDENT_5: lot of other considerations around um how many people can be tagged in a photo can they remove   {#1826}
[01:46:06] TEACHER: their tags themselves or one one one one one one one okay and then i'll and then i'll circle back   {#1827}
[01:46:11] STUDENT_5: you in that's right but one which one would you want to play i i would prefer how many people can   {#1828}
[01:46:17] TEACHER: be tagged in a photo so you are setting you're going for the max limit like the max number of   {#1829}
[01:46:22] TEACHER: people, max limit of people tag in a photo.   {#1830}
[01:46:29] STUDENT_5: Also, whether it is a photo level or at a broader, like maybe at an album level or   {#1831}
[01:46:35] STUDENT_5: at a collection level.   {#1832}
[01:46:37] STUDENT_5: Photo, photo, let's keep it photo.   {#1833}
[01:46:39] TEACHER: But how, how would it define your system?   {#1834}
[01:46:42] TEACHER: What, what would you have?   {#1835}
[01:46:44] TEACHER: Like what changes can you make depending on this?   {#1836}
[01:46:47] TEACHER: If let's say the max limit is five versus 10 versus 100 versus infinite.   {#1837}
[01:46:57] STUDENT_5: Okay.   {#1838}
[01:46:58] STUDENT_5: Five, 10, 100 infinite.   {#1839}
[01:47:00] STUDENT_5: So we would need some sort of a mechanism to limit the number and given how like who   {#1840}
[01:47:07] STUDENT_5: can tag, we would also need to manage a concurrency a bit.   {#1841}
[01:47:10] STUDENT_5: So maybe if we have a limit of a limit of five, we want to concurrently update tags.   {#1842}
[01:47:17] STUDENT_5: If I'm updating or if someone else is updating, we also might want to update in your photo.   {#1843}
[01:47:23] TEACHER: You are the one who are tagging in your photo.   {#1844}
[01:47:24] TEACHER: Someone else cannot come and tag you like tagging your photo.   {#1845}
[01:47:27] TEACHER: Correct.   {#1846}
[01:47:29] STUDENT_3: Okay.   {#1847}
[01:47:29] STUDENT_3: Yeah.   {#1848}
[01:47:31] STUDENT_3: That makes sense.   {#1849}
[01:47:32] TEACHER: So concurrency is not a challenge here.   {#1850}
[01:47:36] TEACHER: But how would this define what aspect of the system would this determine the max limit?   {#1851}
[01:47:44] TEACHER: Let's say, let me simplify.   {#1852}
[01:47:47] TEACHER: 5 versus 10,000.   {#1853}
[01:47:50] TEACHER: Let me go to extreme 5 versus 10,000.   {#1854}
[01:47:52] TEACHER: How would your system change?   {#1855}
[01:47:54] TEACHER: If you are, if your max limit is 5, how would the system change?   {#1856}
[01:47:57] TEACHER: If your max limit is 10,000.   {#1857}
[01:48:12] TEACHER: I'll tell you if it is just five people, you can go and.   {#1858}
[01:48:17] TEACHER: keep them in an array directly.   {#1859}
[01:48:20] TEACHER: Right.   {#1860}
[01:48:20] TEACHER: But if it is 10,000, you would need to have separate entries for them   {#1861}
[01:48:24] TEACHER: because you cannot keep that entire thing chunk together in that one document.   {#1862}
[01:48:28] TEACHER: Like what we discussed yesterday.   {#1863}
[01:48:29] TEACHER: Right.   {#1864}
[01:48:30] TEACHER: Yeah.   {#1865}
[01:48:30] TEACHER: This is what it would affect because if you're allowing 10,000 people, then your   {#1866}
[01:48:33] TEACHER: document size grows out to be really big.   {#1867}
[01:48:35] TEACHER: And then you won't have to do pagination because no one will give you 10,000   {#1868}
[01:48:38] TEACHER: in one shot unnecessary because no one's going to going through 10,000 in one shot.   {#1869}
[01:48:43] TEACHER: So you would have paginated endpoints.   {#1870}
[01:48:45] TEACHER: So you would not store everything in one document.   {#1871}
[01:48:48] TEACHER: This is what determines your storage schema.   {#1872}
[01:48:50] TEACHER: That this max limit of people,   {#1873}
[01:48:52] TEACHER: like max limit of people who can be tagged in a photo.   {#1874}
[01:48:56] TEACHER: Right?   {#1875}
[01:48:57] TEACHER: This is what I want to probe.   {#1876}
[01:48:59] TEACHER: Right?   {#1877}
[01:49:00] TEACHER: Every single question that we ask leads to a change,   {#1878}
[01:49:04] TEACHER: affects or rather should positively influence our design.   {#1879}
[01:49:08] TEACHER: Right?   {#1880}
[01:49:08] TEACHER: That's right.   {#1881}
[01:49:10] TEACHER: Okay.   {#1882}
[01:49:10] TEACHER: Vikram, one point from your side.   {#1883}
[01:49:13] STUDENT_6: Yeah.   {#1884}
[01:49:15] STUDENT_6: should we allow to send notifications to the tag? Great. If I say yes, then, then, then   {#1885}
[01:49:26] STUDENT_6: we should also consider the above point at max limit that if notification should go to   {#1886}
[01:49:32] TEACHER: everyone who are tagged, isn't it? Yeah. Otherwise, otherwise just imagine someone tagging you   {#1887}
[01:49:39] TEACHER: in a very shitty photo and you don't even know about it.   {#1888}
[01:49:44] TEACHER: Right?   {#1889}
[01:49:44] TEACHER: That should not happen.   {#1890}
[01:49:45] TEACHER: So what does this mean?   {#1891}
[01:49:47] TEACHER: That you have to interface with notification team that,   {#1892}
[01:49:51] TEACHER: hey, we are rolling out this feature.   {#1893}
[01:49:53] TEACHER: You would see a huge spike on your traffic   {#1894}
[01:49:56] TEACHER: as soon as people start to use this feature   {#1895}
[01:49:58] TEACHER: because it's very likely for people to tag other people   {#1896}
[01:50:00] TEACHER: in their photos.   {#1897}
[01:50:01] TEACHER: So get ready to scale up your systems.   {#1898}
[01:50:04] STUDENT_13: Yeah.   {#1899}
[01:50:05] TEACHER: Right?   {#1900}
[01:50:05] TEACHER: Because if they are not ready,   {#1901}
[01:50:09] TEACHER: If they're not ready with scaling of the systems and you push notifications on their end, the system gets overburdened.   {#1902}
[01:50:16] TEACHER: Other critical notifications might get affected.   {#1903}
[01:50:18] TEACHER: So you have to interface with the notification.   {#1904}
[01:50:21] TEACHER: As senior engineers, you have to interface with the notification team.   {#1905}
[01:50:24] TEACHER: If it's a yes on sending notification to people, which in most cases would be.   {#1906}
[01:50:27] TEACHER: You have to interface with the team and say, and just ensure that they're prepared for us to handle, to see a step, to see a rise in the notifications that are being sent.   {#1907}
[01:50:40] TEACHER: This would also lead to the fact that there is a throttling.   {#1908}
[01:50:47] TEACHER: Now this throttling is different.   {#1909}
[01:50:49] TEACHER: This is basically product level throttling.   {#1910}
[01:50:51] TEACHER: So typically people don't love products or the people don't like when apps send them   {#1911}
[01:50:57] TEACHER: turn off notifications.   {#1912}
[01:50:59] TEACHER: People hate it.   {#1913}
[01:51:00] TEACHER: People, good apps only send three notifications a week or five notifications.   {#1914}
[01:51:06] TEACHER: If someone, if some app is sending you a notification every single day, it's a big turn off.   {#1915}
[01:51:10] TEACHER: People are very likely to unlock or to basically uninstall your app.   {#1916}
[01:51:14] TEACHER: So if this is a new type of notification that is sent and let's say you are being tagged   {#1917}
[01:51:21] TEACHER: Getting notifications for every single post you are tagged in   {#1918}
[01:51:23] TEACHER: is a bad user experience.   {#1919}
[01:51:25] TEACHER: So now you also have to talk to the interfacing team,   {#1920}
[01:51:30] TEACHER: the notifications team that, hey, how are you handling this?   {#1921}
[01:51:33] TEACHER: Are you having any kind of throttling?   {#1922}
[01:51:34] TEACHER: If not, let's have that.   {#1923}
[01:51:36] TEACHER: You need to ensure that you are not bombarding other users   {#1924}
[01:51:39] TEACHER: with notifications for every photo that they are tagged in.   {#1925}
[01:51:42] TEACHER: Club them.   {#1926}
[01:51:43] TEACHER: Do some, like, make product better on that side.   {#1927}
[01:51:46] TEACHER: Give them a rich notification experience.   {#1928}
[01:51:49] STUDENT_6: Yeah.   {#1929}
[01:51:51] STUDENT_6: also happened that let's say very famous celebrity posted one photo and other people are tag tagging   {#1930}
[01:51:56] TEACHER: the him that just you would get lots of notifications. Correct. Correct. Correct.   {#1931}
[01:52:03] TEACHER: So all these things, because it is very much possible that a senior management has not   {#1932}
[01:52:07] TEACHER: thought this through that. They are just saying one line statement to you. Now it's your responsibility   {#1933}
[01:52:13] TEACHER: to dissect it and go into those details and point them. Right. Okay. What else? Vishal.   {#1934}
[01:52:21] TEACHER: One point from your site.   {#1935}
[01:52:23] STUDENT_4: Yeah.   {#1936}
[01:52:24] STUDENT_4: Maybe user level setting, whether anyone can tagging or did that first point, first   {#1937}
[01:52:29] TEACHER: point, who can that.   {#1938}
[01:52:36] STUDENT_4: No, I meant like a weather.   {#1939}
[01:52:38] STUDENT_4: I am a user, so I should have like a profile in the like profile settings, whether anyone   {#1940}
[01:52:44] STUDENT_4: can tag me or not.   {#1941}
[01:52:45] TEACHER: Like if I have disabled, that's covered on the first one.   {#1942}
[01:52:49] TEACHER: Any other.   {#1943}
[01:52:51] STUDENT_4: No.   {#1944}
[01:52:52] STUDENT_4: Okay.   {#1945}
[01:52:52] STUDENT_4: Rahul?   {#1946}
[01:52:54] STUDENT_4: Self removal of tag.   {#1947}
[01:52:57] STUDENT_4: Correct.   {#1948}
[01:52:59] STUDENT_4: Anyone tag me and I don't want to.   {#1949}
[01:53:02] TEACHER: In a random photo.   {#1950}
[01:53:03] TEACHER: Let's say in some obscene photo people tagged you.   {#1951}
[01:53:06] TEACHER: You should have an option to remove yourself from that.   {#1952}
[01:53:09] TEACHER: So now this makes authorization really interesting.   {#1953}
[01:53:14] TEACHER: Because now authorization is not just about who can tag you.   {#1954}
[01:53:17] TEACHER: but even more calendar level that you, all the photo is of user one,   {#1955}
[01:53:23] TEACHER: but you are allowed to remove yourself from that photo.   {#1956}
[01:53:27] TEACHER: A little more complex than we anticipated,   {#1957}
[01:53:30] TEACHER: but now this requires you to build a very robust authorization layer.   {#1958}
[01:53:33] TEACHER: Very important feature, right?   {#1959}
[01:53:36] TEACHER: Thanks for bringing that up.   {#1960}
[01:53:37] TEACHER: Anubhaf, which other feature?   {#1961}
[01:53:41] STUDENT_5: Yeah, I was thinking from user experience perspective,   {#1962}
[01:53:44] STUDENT_5: whether the tagging would be self-driven   {#1963}
[01:53:47] STUDENT_5: tag someone knowing them or whether   {#1964}
[01:53:49] STUDENT_5: we would have suggestions okay this   {#1965}
[01:53:51] STUDENT_5: photo looks like this person from   {#1966}
[01:53:53] STUDENT_5: your friends list something that facebook   {#1967}
[01:53:55] STUDENT_5: does i think   {#1968}
[01:53:56] STUDENT_5: so with for this we will   {#1969}
[01:53:59] STUDENT_5: have some recognition and recommendation   {#1970}
[01:54:02] STUDENT_5: machine learning   {#1971}
[01:54:03] STUDENT_5: systems that provide us these inputs   {#1972}
[01:54:05] STUDENT_5: we would need that so now what   {#1973}
[01:54:07] TEACHER: would this entail like how would this   {#1974}
[01:54:09] TEACHER: affect your design and peripheral   {#1975}
[01:54:12] TEACHER: teams   {#1976}
[01:54:14] STUDENT_5: with my design i have   {#1977}
[01:54:17] STUDENT_5: with taking inputs from these peripheral teams.   {#1978}
[01:54:21] STUDENT_5: Whenever a photo upload event is triggered,   {#1979}
[01:54:24] STUDENT_5: I have to get these inputs from the,   {#1980}
[01:54:27] STUDENT_5: both for the face recognition and suggestion inputs   {#1981}
[01:54:30] STUDENT_5: from these systems from the periphery teams   {#1982}
[01:54:34] TEACHER: and display them to the user.   {#1983}
[01:54:36] TEACHER: So, which means that, okay,   {#1984}
[01:54:37] TEACHER: so then front-end changes for you to display that.   {#1985}
[01:54:40] TEACHER: And more importantly,   {#1986}
[01:54:43] TEACHER: when you're displaying them,   {#1987}
[01:54:44] TEACHER: the response time of that service needs to be slow.   {#1988}
[01:54:47] TEACHER: should be fast enough.   {#1989}
[01:54:49] TEACHER: If they are not fast enough,   {#1990}
[01:54:50] TEACHER: then your user,   {#1991}
[01:54:52] TEACHER: then sometimes user sees it,   {#1992}
[01:54:53] TEACHER: sometimes user doesn't,   {#1993}
[01:54:55] TEACHER: gives user a very poor experience.   {#1994}
[01:54:57] TEACHER: Yes.   {#1995}
[01:54:58] TEACHER: So you need to ensure   {#1996}
[01:54:59] TEACHER: that whenever you are rolling this out,   {#1997}
[01:55:01] TEACHER: that ML team, ML algorithm,   {#1998}
[01:55:03] TEACHER: whatever they are running,   {#1999}
[01:55:04] TEACHER: it's very fast.   {#2000}
[01:55:05] TEACHER: It maintains a certain SLA.   {#2001}
[01:55:08] TEACHER: So what this brings to the point   {#2002}
[01:55:10] TEACHER: is notion of SLA   {#2003}
[01:55:12] TEACHER: because you have a synchronous,   {#2004}
[01:55:13] TEACHER: now you have a synchronous dependency   {#2005}
[01:55:15] TEACHER: on the team   {#2006}
[01:55:15] TEACHER: because as soon as user clicked   {#2007}
[01:55:17] TEACHER: photos started tagging, you have to immediately show them the suggestions.   {#2008}
[01:55:21] TEACHER: So given that the ML teams API, which is suggesting you things on the email,   {#2009}
[01:55:27] TEACHER: they need to have a very strict SLA and they need to adhere to that because   {#2010}
[01:55:31] TEACHER: you have a synchronous dependency on that.   {#2011}
[01:55:33] TEACHER: And now you also need to create a fallback plan.   {#2012}
[01:55:36] TEACHER: What if that API does not respond in time?   {#2013}
[01:55:38] TEACHER: What would you do?   {#2014}
[01:55:38] TEACHER: Will you not allow user to tag or will you allow user to manually tag?   {#2015}
[01:55:43] TEACHER: It's still a protocol.   {#2016}
[01:55:44] TEACHER: call, it sounds straightforward, but it's still a product call because it might be   {#2017}
[01:55:48] TEACHER: possible in some cases that you don't even allow people to tag unless it's coming   {#2018}
[01:55:52] TEACHER: from your MLT for some reason, for some reason you want to do that.   {#2019}
[01:55:56] TEACHER: But it's important to think on those slides.   {#2020}
[01:55:58] TEACHER: Okay.   {#2021}
[01:55:59] TEACHER: One more point before I cover one other aspect of it.   {#2022}
[01:56:02] TEACHER: Alok sir, go on.   {#2023}
[01:56:04] TEACHER: What's that one feature you want, like what things that you'd want to consider?   {#2024}
[01:56:08] STUDENT_5: One question, should we update the user's activity page or where the user   {#2025}
[01:56:13] STUDENT_5: can see what happened?   {#2026}
[01:56:16] TEACHER: Profile service activity.   {#2027}
[01:56:18] TEACHER: Now, how would this affect your system?   {#2028}
---- OWNED SEGMENTS END ----

CTX| [01:56:24] TEACHER: If I say yes to this, what does this end?   {#2029}
CTX| [01:56:28] STUDENT_5: We would be maintaining this information somewhere that what happened, what happens   {#2030}
CTX| [01:56:33] STUDENT_5: to user profile.   {#2031}
CTX| [01:56:34] STUDENT_5: So we have to actually start pushing this information.   {#2032}
CTX| [01:56:36] STUDENT_5: They're also asynchronously.   {#2033}
CTX| [01:56:37] TEACHER: Correct.   {#2034}
CTX| [01:56:38] TEACHER: That's fine.   {#2035}
CTX| [01:56:42] STUDENT_5: and also who can see this activity but then that is probably the users itself will be   {#2036}
CTX| [01:56:49] TEACHER: will be seeing that activity that's fine but now i'll just add to that what does this affect   {#2037}
CTX| [01:56:55] TEACHER: this affects one very interesting part that this the way you are storing this information   {#2038}
CTX| [01:57:01] TEACHER: that in this photo these people attack they need to be indexed somehow you need to store   {#2039}
CTX| [01:57:06] TEACHER: this information in a database where you can now you should be able to query that.   {#2040}
CTX| [01:57:11] TEACHER: Now you cannot just have just things stored in an array, which is unindexable.   {#2041}
CTX| [01:57:17] TEACHER: You have to store it in a database like the tagging in this photo.   {#2042}
CTX| [01:57:21] TEACHER: These people are tagged in a way that you should be able to query that who all or rather   {#2043}
