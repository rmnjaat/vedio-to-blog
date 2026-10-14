# chunk_10  OWNS 01:47:21 -> 02:00:01  (segments #1975-#2055, 857 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:46:23] STUDENT_2: But we don't know the exact URL.   {#1949}
CTX| [01:46:24] STUDENT_2: I mean, I mean, Amazon would store S3 will store it somewhere, but we don't know the   {#1950}
CTX| [01:46:29] STUDENT_2: exact URL or the place where they're stored.   {#1951}
CTX| [01:46:31] STUDENT_2: We just pass the, or we just create the path and then send out.   {#1952}
CTX| [01:46:35] STUDENT_2: Right.   {#1953}
CTX| [01:46:36] STUDENT_5: So why would we need to know the disk where S3 is storing it?   {#1954}
CTX| [01:46:39] STUDENT_2: No, no, that's not the question.   {#1955}
CTX| [01:46:41] STUDENT_2: The question is, there's the first few bytes where what is the, what is the.   {#1956}
CTX| [01:46:47] STUDENT_2: public IP of the S3.   {#1957}
CTX| [01:46:49] STUDENT_2: We just send it over there.   {#1958}
CTX| [01:46:50] STUDENT_2: Then S3 actually has to locate where the image ID was, right?   {#1959}
CTX| [01:46:53] STUDENT_2: And then it reaches out.   {#1960}
CTX| [01:46:54] STUDENT_2: Is that the way it goes?   {#1961}
CTX| [01:46:56] STUDENT_5: That's exactly.   {#1962}
CTX| [01:46:56] STUDENT_5: That's the black box for us.   {#1963}
CTX| [01:46:58] STUDENT_5: Why would we know which server to go to?   {#1964}
CTX| [01:47:00] TEACHER: For us is SDK.   {#1965}
CTX| [01:47:02] TEACHER: AWS SDK.   {#1966}
CTX| [01:47:03] TEACHER: Why should we care?   {#1967}
CTX| [01:47:04] TEACHER: Correct?   {#1968}
CTX| [01:47:05] TEACHER: Why should we care how S3 is doing it?   {#1969}
CTX| [01:47:07] TEACHER: S3 is black box for us.   {#1970}
CTX| [01:47:09] TEACHER: For this system, S3 is black box.   {#1971}
CTX| [01:47:11] TEACHER: For this system, CDN is black box.   {#1972}
CTX| [01:47:13] TEACHER: Right?   {#1973}
CTX| [01:47:14] TEACHER: So that's the API contract that we are working.   {#1974}

---- OWNED SEGMENTS START ----
[01:47:21] TEACHER: We'll take a break till 10.55 and when we'll come back, we'll talk about again a very interesting   {#1975}
[01:47:29] TEACHER: service.   {#1976}
[01:47:29] TEACHER: We'll go down the details called hashtag service.   {#1977}
[01:47:32] TEACHER: I'll lay out the problem statement.   {#1978}
[01:47:35] TEACHER: We'll have brainstorming, very interesting low-level details to explore.   {#1979}
[01:47:39] TEACHER: We'll talk about this in depth and we'll wrap by 11.30 today.   {#1980}
[01:47:44] TEACHER: We are on track.   {#1981}
[01:47:45] TEACHER: Great.   {#1982}
[01:47:45] TEACHER: See you folks at 10.55, 7, 8, 8, 8 minutes from now.   {#1983}
[01:47:50] TEACHER: Right.   {#1984}
[01:47:50] TEACHER: Sure.   {#1985}
[01:47:50] TEACHER: Thanks folks.   {#1986}
[01:54:29] STUDENT_7: Thank you.   {#1987}
[01:54:50] STUDENT_7: let's start with the second half just confirming if mic and speaker are correct yeah okay the   {#1988}
[01:54:59] TEACHER: The second system that we designed today is hashtag service.   {#1989}
[01:55:02] TEACHER: I have called it hashtag service, but the idea is that on Instagram, when you click on a particular hashtag, what you see is you see a screen which is dedicated to that hashtag, which contains the hashtag, the number of photos.   {#1990}
[01:55:20] TEACHER: and hypothetically, hypothetically, let's say we show exactly top 100 photos tagged with that particular hashtag.   {#1991}
[01:55:31] TEACHER: Right. That's what we do.   {#1992}
[01:55:33] TEACHER: Let's say we want to give user a best experience when the user clicks on a particular hashtag.   {#1993}
[01:55:40] TEACHER: Now assume that there are millions of hashtags out there and assume that there is a service by data science team.   {#1994}
[01:55:50] TEACHER: how they bring up but they notifies us whenever they generate top 100 photos for a particular   {#1995}
[01:55:56] TEACHER: hashtag somehow somehow right so we don't build a data science service it's their responsibility   {#1996}
[01:56:01] TEACHER: trending hashtag and this and trending photos and likes and comment and share and whatnot it's their   {#1997}
[01:56:06] TEACHER: heading we don't worry about it for us that is a black box what we are here to do is and here to   {#1998}
[01:56:12] TEACHER: give the best user experience when the user clicks on a particular hashtag by rendering this page   {#1999}
[01:56:20] TEACHER: So let's kick off brainstorming and we talk about things on brainstorming.   {#2000}
[01:56:28] TEACHER: We talk about storage.   {#2001}
[01:56:30] TEACHER: We talk about counting, large volume counting.   {#2002}
[01:56:33] TEACHER: We talk about inter-service communication and more importantly,   {#2003}
[01:56:37] TEACHER: super fast response time.   {#2004}
[01:56:38] TEACHER: Right.   {#2005}
[01:56:39] TEACHER: Okay.   {#2006}
[01:56:40] TEACHER: So how should we go about this?   {#2007}
[01:56:42] TEACHER: Raise your hands.   {#2008}
[01:56:42] TEACHER: I'll pull you in.   {#2009}
[01:56:43] TEACHER: How would you store data?   {#2010}
[01:56:44] TEACHER: Where would you store data?   {#2011}
[01:56:45] TEACHER: How would you retrieve and what of it?   {#2012}
[01:56:47] TEACHER: Let's start with storage first.   {#2013}
[01:56:50] TEACHER: data, how would you store this data?   {#2014}
[01:56:51] TEACHER: Assuming you need to give the best user experience.   {#2015}
[01:57:04] STUDENT_2: So like carpet, we can have one text table to first store like all the relevant text   {#2016}
[01:57:12] STUDENT_2: with their tag ID and the name.   {#2017}
[01:57:14] STUDENT_2: And then we can like in the photos table, we can store those texts there.   {#2018}
[01:57:20] TEACHER: Photo stable is out of question, right?   {#2019}
[01:57:21] TEACHER: You want to render this page.   {#2020}
[01:57:24] TEACHER: Think on those lines.   {#2021}
[01:57:28] TEACHER: What are you doing over here?   {#2022}
[01:57:30] TEACHER: And on photo stable, you don't have special hashtag column.   {#2023}
[01:57:32] TEACHER: It's part of your caption FII, right?   {#2024}
[01:57:35] TEACHER: So there is a special column where you're storing hashtags there.   {#2025}
[01:57:38] TEACHER: So here, this is what this is the page that you have to render.   {#2026}
[01:57:42] TEACHER: Now think on those lines.   {#2027}
[01:57:43] TEACHER: What are you storing in order to render this page?   {#2028}
[01:57:47] STUDENT_2: So in that case, like we will have a table where we are storing tag ID with the name,   {#2029}
[01:57:51] STUDENT_2: and then we will have one more like a key value store of type of thing.   {#2030}
[01:57:56] TEACHER: There are two tables, there are two databases there.   {#2031}
[01:58:03] STUDENT_2: We can have one only then, like where we can store what is the tag key and then we can   {#2032}
[01:58:09] STUDENT_2: store like values or the metadata associated with it like what look at this whenever somebody   {#2033}
[01:58:16] STUDENT_2: post a photo which has this relevant tag we can like let's say increase the count there   {#2034}
[01:58:22] STUDENT_2: the count of the photo has increased so let's say you have total photos over here   {#2035}
[01:58:28] TEACHER: and by the way why do you need it because that's exactly what you want to render   {#2036}
[01:58:32] TEACHER: yes so tag hashtag photos and then this 100 top 100 photos how are you getting it   {#2037}
[01:58:38] STUDENT_2: so that we can maintain in a separate area like the latest photos or the   {#2038}
[01:58:45] STUDENT_2: so whenever somebody uploads a photo and we find out that okay it's like its popularity has   {#2039}
[01:58:52] STUDENT_2: increased so we can like pop we don't have to care that's what i said why are you assuming   {#2040}
[01:58:57] TEACHER: we said we established the boundary data science team is doing it for us right so we can just   {#2041}
[01:59:04] STUDENT_2: store it in a like top 100 array in the same stories.   {#2042}
[01:59:08] STUDENT_2: What will you store in this array?   {#2043}
[01:59:13] STUDENT_2: The photo URLs again or the post ID.   {#2044}
[01:59:19] TEACHER: Right?   {#2045}
[01:59:21] TEACHER: Why photo URL?   {#2046}
[01:59:22] TEACHER: Post ID one, post ID two and so on and so forth.   {#2047}
[01:59:27] TEACHER: You store this information.   {#2048}
[01:59:28] TEACHER: Okay.   {#2049}
[01:59:29] TEACHER: What's the advantage of storing post ID over here?   {#2050}
[01:59:37] STUDENT_2: Advantage in the sense you mean like we can retrieve the post whichever we want like by   {#2051}
[01:59:42] STUDENT_2: joining it with the post table.   {#2052}
[01:59:45] TEACHER: What's the advantage?   {#2053}
[01:59:48] TEACHER: You are describing how you retrieve the data.   {#2054}
[01:59:51] TEACHER: What's the advantage of storing post ID over here?   {#2055}
---- OWNED SEGMENTS END ----

CTX| [02:00:01] STUDENT_2: Like advantages compared to board because I didn't think about any second method.   {#2056}
CTX| [02:00:05] STUDENT_2: Right.   {#2057}
CTX| [02:00:06] STUDENT_2: So that's the problem, right?   {#2058}
CTX| [02:00:08] TEACHER: That's the problem.   {#2059}
CTX| [02:00:09] TEACHER: That's what we have to think.   {#2060}
CTX| [02:00:11] TEACHER: Right.   {#2061}
CTX| [02:00:11] TEACHER: If we don't think of all possibilities, whatever I think seems optimal, but it might not be   {#2062}
CTX| [02:00:19] TEACHER: what's the advantage of storing post ID over here.   {#2063}
CTX| [02:00:23] STUDENT_1: So the advantage that I can think of is like, it is like, it is a data that we can derive   {#2064}
CTX| [02:00:29] STUDENT_1: from or derive anything from.   {#2065}
CTX| [02:00:31] STUDENT_1: Okay.   {#2066}
CTX| [02:00:31] STUDENT_1: Including the URL and all of those things.   {#2067}
CTX| [02:00:34] STUDENT_1: Second thing is like the amount of data we are storing in this table, in this non-relationable   {#2068}
CTX| [02:00:39] STUDENT_1: table, which is like a non-relationable table or already takes so much space.   {#2069}
CTX| [02:00:46] STUDENT_1: So this, this way we can reduce the amount of space that amount of space required to   {#2070}
CTX| [02:00:51] TEACHER: store this one document.   {#2071}
CTX| [02:00:52] TEACHER: Right.   {#2072}
CTX| [02:00:53] TEACHER: What's the other approach?   {#2073}
CTX| [02:00:54] TEACHER: If you don't store the post ID, what else can we do?   {#2074}
CTX| [02:00:57] STUDENT_1: So if we like the one, one thing, one thing that he told was like store the URL, but that   {#2075}
