# Lecture 01 - Scaling, Concurrency, Delegation, Communication

| | |
|---|---|
| **Source** | 5_6071343878177295376.mp4 |
| **Duration** | 03:15:09 |
| **Speakers** | Teacher; Students 1-18 (numbers from automatic speaker separation; names heard in class are flagged for spelling in review_flags.md) |
| **Processed** | 2026-10-11 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 331 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 124 - see [review_flags.md](review_flags.md) |
| **Verification** | PASS (strict), retention 99.53%, additions 0.29% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:31] Student feedback *(admin)*
2. [00:05:33] Agenda for today
3. [00:06:36] Caching at different levels
   - [00:17:19] Materialized views
   - [00:20:47] Browser caching
   - [00:29:06] Caching on the API server disk
4. [00:35:18] Scaling
   - [00:35:57] Vertical scaling and its limit
   - [00:40:47] Horizontal scaling and linear amplification
   - [00:48:35] Scaling a database
   - [00:49:26] Read replicas
   - [00:54:20] Sharding the database
5. [01:05:42] Delegation
   - [01:11:25] Message broker - message queues and message streams
   - [01:14:07] Message streams
   - [01:21:28] Kafka - topics and partitions
   - [01:27:45] Kafka - committing
6. [01:30:58] Q&A - delegation
7. [01:37:34] Break *(admin)*
8. [01:44:56] Concurrency
9. [01:50:38] Communication
   - [01:53:13] Short polling
   - [~01:56:22] Long polling
   - [01:59:25] WebSockets
10. [~02:23:22] Wrap-up and plan for next week *(admin)*
11. [02:25:43] Q&A
   - [02:35:25] Q&A - caching through an intermediate service
   - [02:37:13] Q&A - read replicas and master load
   - [02:39:01] Q&A - CDN (deferred)
   - [02:42:22] Q&A - scaling Kafka consumers with SQS
   - [02:46:02] Q&A - WebSockets behind a load balancer
   - [02:47:35] Netflix caching shows at ISPs
   - [02:50:12] Q&A - compression, security, database clustering

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

<!-- chunk_01 00:00:00-00:11:16 -->

**[00:00:00] Teacher:** [unclear: "Tutor."] [?Agenda | asr: "A great"] week, first, day, second. And what we'll do is today we'll continue our discussion on the other four properties, other four fragments of it. Scaling, concurrency, delegation, and communication. And again, we'll talk in context of a medium, but the discussion will be those small nitty gritty, implementation detail, performance benefits, and whatnot.

## [00:00:31] Student feedback *(admin)*

[00:00:31] But as a regular ritual, first of all, thank you so much for providing the continuous feedback. Loved going through them. So there were few concerns raised, I'll start going through that, of all the things [unclear: "no point in mind"]. Okay, one person said, and it's given it's anonymous, I don't know who wrote that, but one person wrote, "But I wish the video uploaded could have been transcribed, it becomes easy to comprehend, it takes too much of effort." When one person team, I cannot transcribe, right, stuff around that, right? I tried finding a tool, but it misinterpreted our accent. So I found a project on GitHub that did that, but it misinterpreted, so I stopped doing it. I tried it once. So that's why, I'm just one person team doing out of [?passion | asr: "fashion"], so hard to do anything around that.

[00:01:27] Then, what I've done better. Okay. "I feel we could have some more post lecture read-ups." I typically don't give post lecture read-ups because 90% folks don't even read pre-reads. First of all. Second of all, the flow of the lecture is not fixed. It changes from cohort to cohort. Like pointers that I discussed yesterday, like three pointers that I discussed yesterday were data. Those were something that I never discussed ever in any cohort. Right. So it's naturally that comes to me because I keep reading a lot of stuff. It's not that this is something that I prepared on day one, a year back. And since then, there is nothing like, basically there is no change. So a lot of things that I say is very biased towards what I've learned in the recent time. And it obviously enhances the experience because I'm always learning. So given that there is no specific thing because there is a specific flow to that.

[00:02:24] Whatever I utter, just Google, find and read and explore, as simple as that. Because I, and another reason is I don't want you to limit, to be limited to those five or six links, because internet evolves. There are brilliant articles published every now and then, I may not be able to update the post reads, then I don't want you to read the stale information, right? One more reason. So it's always better that whenever you hear the term, whenever you find something interesting, go read about it. And in any case, I point out in the lecture, read this, read that, make a note of it, right? Like for example, yesterday I told about reading the, how MySQL implements date time through that documentation. If I share the link, then you can directly go and read it. Instead, go and explore the documentation. You will stumble upon much more interesting details. That would make you a better engineer. If I spoon feed that part to you, that's not fun because you need to build that habit of exploring things rather than waiting for someone to do the curation for you. Right. And I'm a firm believer of that because I believe in serendipity. I believe in you trying, you wanting to find something, but you land up on something else, which is thousand X more interesting to that. Right. So that's why I don't typically give pre-reads post-lecture read ups. I only give pre-reads just to prepare for it.

[00:03:49] Then, I'll say, "if there can be an introduction to cohort participants, better to know each other." 80 folks participation itself or introduction itself would take an hour. At least I'm assuming, like 80 folks, even if I give one minute, it will be 80 minutes. So one and a half hour gone. Right. So that is where I go into first ever cohort. I used to do introduction. There were 25 people in that also, almost 40 minutes went like that. Right. I felt it's a waste of time because you would know about each other. When someone asks questions, you would see their name popping up. You can connect over Discord and whatnot. Right. So I wanted to keep the entire course very crisp, very focused on engineering. Intro intro, you can anyway connect. Like you would see people raising their hands again. You would remember their names. A lot of people have done that in the past, but for me to give the maximum value, I cannot just say eight weeks, 16 sessions and four, and almost one and a half hour of it is gone in introduction. I don't do that. For me, it has to be extremely [?intense | asr: "tense"], extremely focused on engineering, right? So that I can deliver the maximum value, as simple as that. And imagine you waiting for one and a half hour just for introductions to get complete, and that too, that's the best case, right? 80 folks, an introduction. If I give one minute each, that's 80 minutes gone. That's right. So I just keep totally focused on this.

[00:05:18] And yeah, [unclear: "those who were it."] But in case there is anything, feel free to add to context feedback how I can improve, what all things I can cover. In case there is a scope for that, I'll definitely do it. But in case, I always have my eye on this. Great.

## [00:05:33] Agenda for today

[00:05:33] Now we'll move to the actual stuff. Week 1st, day 2nd agenda for today. As we discussed yesterday, the first thing that we'll discuss today is caching at different levels. How, and this is where the very interesting hacks would basically pop up, right? And from everyone else's experience, right? Because people would share how they have been doing it. And then it would obviously transform a lot of, like it would rewire our brain completely. Then we'll talk about scaling, then delegation, then concurrency, and then communication. Concurrency will spend like 5-10 minutes because next week, first day, like second week, first day, we have an in-depth coverage of concurrency. Like how database concurrency fall apart. That's next week. So that's week, second, first day. We'll take practical examples to understand concurrency in depth because that is the heart and soul of building systems at scale. We'll talk about this. We'll spend very less time today on concurrency. But delegation will cover basics that you definitely need to know. Scaling, communication, 5 to 5.

## [00:06:36] Caching at different levels

[~00:06:36] Okay, let's start with the first one, caching at different levels. So what all places would you cache, what will you cache, and how it would benefit? Raise your hands, I'll pull.

**[00:07:00] Student 6:** So basically, caching at different levels, all we are trying to do is reduce the latency. So fundamentally, whether you're trying to reduce a computation, CPU, network, at the end of the day, when somebody makes a request, they want a quick response. And that is inversely proportional to latency. And latency can be reduced by having a caching at multiple layers. I'm giving a vague answer.

**[00:07:26] Teacher:** Where? Where? Example. Give me a concrete example. What you're caching, where you're caching, what benefits are you getting out of?

**[00:07:33] Student 6:** So one concurrent, one example would be like, for example, a user ID, a frequent user who's accessing my application, right? His,

**[~00:07:39] Teacher?:** that's okay. Where are you caching? Where?

**[~00:07:39] Student 6:** Where, in the sense? Sorry, I didn't get that part. Like, what do you mean?

**[~00:07:48] Teacher:** That's what we discussed yesterday, right? Where are you caching? In a centralized cache? That's what the crux of the discussion is. Like, you cannot just have one centralized cache where you are storing things, that you need to come up more creative, right? Where you can cache something that is giving you the performance benefits.

**[00:08:09] Student 12:** Okay.

**[00:08:10] Teacher:** Let me [unclear: "look you in a"], like hear what others have to pitch in. Then you may find something interesting. Okay. Yes. Jodinder [check: name spelling; "Jotinda" at 00:11:58], go on.

**[00:08:28] Student 3:** Sorry. I was on mute. Yeah. An application level cache. It's just a hash map.

**[00:08:38] Teacher:** First answer, where? Where are you storing it? Where exactly would this cache be placed?

**[00:08:43] Student 3:** Yeah, that would be main memory. Where?

**[00:08:47] Teacher:** In your architecture, where?

**[00:08:51] Student 3:** In the application itself. In the... Are you talking about centralized remote cache? No, no, no. I'm just saying that you can have central caches, but like on a very simple level, you can just have like some hash map in your application in the memory, like in the API servers. Yeah. In an API server, basically.

**[00:09:13] Teacher:** Now we are talking, right? So what you're suggesting is in main memory of API server.

**[00:09:20] Student 3:** Yeah. Other than that, like if you...

**[00:09:25] Teacher:** So for example, wait, wait. So for example, if we have an architecture like this, where we have user APIs or a database, so what we are proposing is we put cache in memory over here. So this is your standard database. You might have a remote cache. You might have a centralized remote cache, which is say Redis or something. But along with that, you can use the RAM of your machine, RAM of your API server to cache things. Correct? This is what you're recommending, correct? Yeah. Okay. So what is the disadvantage of this?

**[00:10:03] Student 3:** So the issue is like it's limited in how big this cache can grow, because like as the cache grows, like you're constrained on the memory for the application itself. Right. And then another thing is that if the application goes down, the cache is gone. Then like if the application itself crashes, if you're distributing this application at some level, all the different instances will have different caches. There will be some inconsistency at some point. So you might want a centralized cache in some sense, if that makes sense for your application.

**[00:10:39] Teacher:** Okay. Let's talk about inconsistency. Why would there be inconsistency?

**[00:10:44] Student 3:** So updating the cache, keeping it fresh is a challenge. For example, the data in the database changes depending on like, if you have like, if let's say you have instance one and instance two, like you've drawn, let's say the instance one is getting used for some particular entry more often, possible that cache entry gets refreshed by the DB depending on the whatever refresh policy you have, and the second instance starts lagging behind or does not get enough updates

<!-- chunk_02 00:11:16-00:22:41 -->

**[00:11:16] Student 3:** because you access like the first instance more often. So some users might see an [?inconsistent | asr: "consistent"] view.

**[00:11:24] Teacher:** How will you solve this?

**[00:11:27] Student 3:** One option is to have just a simple centralized cache, like maybe have another Redis instance which is being contacted by both the application instances. So that would definitely stay consistent to an extent.

**[00:11:45] Teacher:** Because it is a single source of truth. Yeah. So then you cannot have this.

**[00:11:49] Student 3:** Yeah. So yeah, like I think that's what I have right now.

**[00:11:54] Teacher:** Okay, fine. Let me elaborate on a couple of points over here. So what Jotinda [check: name spelling; "Jodinder" at 00:08:17] suggested is we use the memory. So we always think of cache as centralized [?remote | asr: "reverse"] cache. So this is the most, this is something that comes to us most naturally. But apart from this, there are other places can use as a cache. One of them that you just started suggesting is to use the main memory of the API server. Now you will not have just one API server. You would have multiple of them. And now here, if you're using the main memory of API server, it is local to this particular server. This memory is not accessible from anywhere else. So now when you cache something over here, this is local to this server, which means that other servers will not see the same changes.

[00:12:40] Now here, this is where the inconsistency part comes in. So where you might cache something on this server, and if that request goes to another server the next time, here it would not have the returns, it would have to make the DB call and then populate this cache and return back. But that's not why we would use this cache. This is an extremely interesting hack that would give you massive performance boost. Why? Because [unclear: "there you may consistency always."] What you are saving is an expensive network call to the cache by caching the same data over here. In case you don't need strong consistency, that hey, my request can go to any server, like for example in case you don't have, in case you, when a request comes from a user, it can go to any server, right? So in case you don't have this, in case you have sticky sessions, let's say request of a particular user will always go to a particular server always, right, in case you. Now what you can do is you can have a centralized remote cache, no problem. But given that you know the request of a particular user will always go to a particular server, because that's how you are load balancing things, you can cache a bunch of stuff of this user in the main memory of this server. Because you would not, the request of that specific user will never go to another server. That's not possible. This way you can leverage the memory of the API server itself to cache the response that you would want, right? But here you're giving up on strong consistency between cache and it should be okay. It's use case specific.

[00:14:16] It just that being creative in getting the performance boost is really important. This is really underappreciated, but a lot of startups use it as hack. Big companies typically don't, but startups use it as hack to get benefits. For example, and this also works where your data is nearly static. For example, blogs of LinkedIn or blogs of Medium. Nearly static data, how likely are you to change blog? And in case the data changes, you don't want immediate update. It's okay if it updates in some time. It's okay if you serve stale data to some user. That's perfectly fine because blog once published, very unlikely that it would be changed again. So given that, even if two different copies of it get cached on different machines, it's perfect fine because they're still okay. Like the frequency, the updates are very infrequent on the database for a published item. So in that case, you can leverage the main memory of the API server itself as a cache.

[00:15:17] So apart from having this, and I'm not saying it's either this or this, right? Always we [?often | asr: "open"], have multi-level caches. So this, you have it. Along with that, you have this as a cache. You can using main memory as a cache. What it helps you save is a network call to the remote cache in case you have it. This network I.O. you are reducing, the load on this Redis server, by caching the same information on local machine, not all, some information with some expiry. Although obviously this API server, it has very limited RAM, so having TTL is very important. How you flush the cache is very important. You can run a local Redis on this server itself, a lot of fancy stuff, right? But understand that you can leverage the API server that you have to cache something to save an expensive network call to another remote cache. And so that's why. Okay, [unclear: "which what are that"] Mohan, what other place will you cache, what will you cache, and how it would benefit?

**[00:16:14] Student 11:** Sorry, I couldn't think of an application level issue, but of course we use database views, right? That is also a form of caching, right? What it helps you save, it helps you save on executing the query. If one is that when the data is not changing much, that is one case. The other case is also because a SQL execution requires preparation and, you know, execution path creation by the server, right? So you can avoid all that if the, if you create a view, I think. Then the database server is, you know, have the prepared query, and whenever there's an update, it is, it is updated. I don't know the exact way the database keeps it up to date, but you know, views are kept up to date for all updates, right? So it is consistent and you can avoid the having to load the server with the query every time.

### [00:17:19] Materialized views

**[00:17:19] Teacher:** Great. Thanks for adding that. Let me, let me elaborate on this part. Oh, what Mohan added is something called as a materialized views on databases. This is typically a property of relational databases, but there are some non traditional databases that also leverages this to be performant. So with relational databases, one of the biggest concern comes out to be joins. So now let's say you're joining six different tables, almost for 80% of queries or 80% of load comes from those joining of six different tables. And now if that data is not changing very frequently, what if you the tables and store it as a separate table. That's what this materialized views are. So you can create a view of a table with the necessary computation that you are doing, and not just join, but let's say you want to add another column, a computed column, a derived column, all of that. For example, I have marks for each subject in a separate column and I want to have a total another column. Right. So now this total is a derived column.

[00:18:23] You store the raw data in the table where you have individual marks for each subjects. Can you create a new table with total as a new column, and this, and join with other details of people and whatnot. Now you create, you use this view, and so whatever query you fire, you fire on this view rather than this table. This view is already pre-joined, pre-computed, and it makes your things very fast. And because it doesn't have to do join again and again, because the data is already pre-joined and kept over here. The challenges that come with this is you need to update explicitly, which is where database triggers come to the rescue. So you define triggers that would refresh, and that's what the official term is, that would refresh this materialized views. But this would give you significant performance gain on the database, given that you don't have to do joins again. But this works where your data changes infrequently. Then a frequent refresh of this materialized views happens and that would slow things down.

[00:19:24] So in case you have never heard of materialized views, you are just a Google search away, but this is the gist topic. And revisit the recording in case you don't understand it, what materialized views are, how it is leveraged. So materialized views is one of the most interesting optimizations that come from the database, which not a lot of [?tech | asr: "tack"], quote unquote, I don't classify people as backend and data engineers, but backend engineers, APIs, they don't understand this particular optimization. Data engineers use it day in and day out. Materialized views are data engineers' bread and butter, so they have to use it to make their analytical queries hyper optimized. So DB views, materialized views, if you've never heard it, go read about it. Most importantly, implement, right? Without implementation everything is theoretical, right? Okay, thanks for adding that, Mohan. DB views is one, and how it is reducing, so what it is saving is it is saving that expensive database computation, that expensive join. That's what it is.

[00:20:24] Rahul, what would you cache? Where would you cache?

**[00:20:28] Student 4:** So basically, like two examples I have is basically our web browsers. Basically, they save our network I.O. while by caching things, caching things in the local storage itself. And second thing is CDN servers, like Netflix.

### [00:20:47] Browser caching

**[00:20:47] Teacher:** One, one. I want to give everyone else chance, right? Okay, browser, an interesting place where you can literally cache things over here. This way you don't even have to make calls to your backend server to get some information, for example static images, static assets, or even some API responses. For the JWT token, you may want to save it, so those, so you save bunch of computation. Plus there are web workers now that does everything offline, and then when internet comes back up, they sync back up to the back end, all of those things. So it gives you very nice experience. So you think it's working really fast, but every change is being done locally and then periodically pushed to the back end. So browsers local storage is an excellent place to cache bunch of stuff.

**[00:21:36] Student 4:** Also there is like one more point I would like to make on the first suggestion, first point. So basically you, the problem that we were having is like inconsistency when caching, okay, in the first, in the first point. So let's just say, like we have a cache which also has a feature of like publish and subscribe, okay? All of the, all of the nodes, API servers that are here, are publishers and themselves are subscribers. Okay. Whenever any update comes, we update the entry in the cache and the cache itself.

**[~00:22:12] Teacher:** I'd have to stop it. I'd have to stop you. People will get confused. They might not have heard of this. Let me come back to this. Next week we'll be touching upon this. Then it would make sense. It's just that I'm being wary of the different kinds of experiences that people have. So everyone is on the same. I just don't want people to get lost in this terms. That's right. That's right. [check: possible ASR duplicate] Shiva.

<!-- chunk_03 00:22:41-00:34:48 -->

**[00:22:41] Student 2:** Yeah. So my example is also like very similar to the third one, which is the browser caching, but I can go like give like a very specific example of how we use it. So we used it for personalized recommendations, and the use case for us was mostly not in terms of latency, but more for how the users perceive if we personalize too often. So the use case is we try to re-rank the products on the category pages, and the extreme could be we... So if a user revisits a category page, we can again do the re-ranking, right? And that would be like an extreme case. And then the other extreme is we don't update it for the full day or something. So we did some experiments and found like optimal time of for how much time we have to store these recommendations so that the users don't get too confused, but we also deliver the benefits of personalization. So this was like one implication for us. And also we used this information to also prepare our training data sets different way so that we take into account these effect of caches. So, yeah.

**[00:23:57] Teacher:** So which means that let's say, so hypothetically, let's say I'm Amazon and whatever recommendations I have, I store it in my browser's local storage on my apps device. And you just use that to render it. Right. Instead of making an expensive call in the backend to do that computation. Right.

**[00:24:15] Student 2:** Yeah. Yeah. But we have also set like a, like a time. We also refresh them. So the recommendations don't become, that's an excellent. [check: "that's an excellent" may be the Teacher talking over the student]

**[00:24:26] Teacher:** That's an excellent hack, right? Because anyway, you can just pick few items at random. Let's say you recommend 50 items, but on viewport, you can show only 10. So you pick 10 at random. Every time the user would think, Oh my God, the recommendations are so fast and so good, and recommendations update once every day for this. That's an excellent optimization. Right?

**[00:24:44] Student 17:** Yeah.

**[00:24:46] Teacher:** Nice. Thanks. Thanks for adding that. It's brilliant. Yes, Vishal?

**[00:24:54] Student 7:** Yeah, so we used to have caching on two levels. We used to have CDN Cloudflare for caching the whole response of the request. And we also had used Prerender.io, which is basically cached all JS files, all CSS files, the assets like images, videos and everything. So it would be like very beneficial for our team when we used it, the Prerender.io and [?Cloudflare | asr: "cloud"].

**[00:25:32] Teacher:** So one thing that Vishal briefly pointed out is what he cached. Like a lot of people think CDN is something that can only cache static things like images and videos and this part. No, what he cached was responses. So for example, you can serve API responses via CDN. We'll go in depth of CDN in third week, fourth week, fifth week. But still, let me just touch upon that. That you can, it's like CDNs are not just to cache images. Big misconception. I don't know how people come to that. So such a big generalization. But CDNs is just a proxy that sits in between you and the backend. You can literally cache anything. For CDN, anything that comes from the backend is just bytes. Whatever bytes you send from the backend CDN will cache it. Right?

[00:26:21] So you can actually cache API responses on CDN for something that does not change often. For example, search results or rather search results are popular terms. Right? Giphy uses that. For example, most popular terms. So for when you can cache it on CDN, you don't even have to go to backend to get the answer. Right? Not even hit your centralized cache. You can just directly send it from the CDN. So API responses that are near static can also be cached on the CDN. So keep those things open. [unclear: "Add-in"] for CDN is just bytes. It does not know it is an image or a video or something. For that, it is just a set of bytes that it can cache that it got from the back and it goes to cache and distribute globally across.

[00:27:04] So caching responses on the CDN, what it helps us in doing is it helps us save the request our infrastructure to handle that request because given that you have CDN. Let's say you have bunch of users, you have your backend, you have your database and all. But apart from that, you also have a CDN over here. So given the request will go to CDN and CDN will call to backend and backend will talk to the database to do it. If your CDN itself has the answer, the request does not even have to come to your infrastructure. Matlab, the request is not even coming to your backend server. It is directly getting served from the CDN. And it's not just images and videos. It could be literally, literally anything. Like for CDN is just set of bytes that are coming in. So I can literally expose or cache HTTPS colon slash slash search.abc.com slash popular. So all the popular searches of my platform can be cached on the CDN. This call, the request goes to CDN, CDN has the response, CDN services back. We'll talk in depth of how this works. We'll use CDN in very interesting ways in the future, but this is just a sneak peek of that. But this is an excellent, excellent place where we can get this performance benefit. Thanks for [?bringing | asr: "breaking"] that up. I'll pick one more and if this doesn't cover what I wanted to cover, I'll add my point and then other things I'll take it.

**[00:28:39] Student 2:** Yeah. Hi, so I would like to add to the first point, right? So at the API server level caching, no, no, API server level. Yeah. Yeah. To the first point. Right. So we are, we are caching that in the memory, right? But we can also do this level caching, right? Because that would, that will save the expensive network IO call to the database or any cache.

### [00:29:06] Caching on the API server disk

**[00:29:06] Teacher:** This is exactly what I wanted to cover. Thanks. Thanks so much. I'm so glad I pulled you in Jirak. [check: name spelling] This is mind blowing awesome optimization, right? A lot of people, which is what I said yesterday that don't just think of cache as something that goes and fits in memory. Think of cache as anything that helps you save an expensive computation or an expensive IO.

[00:29:31] Now, just try to remember whenever you spin up an API server, whenever you spin up an [?EC2 | asr: "to"] instance or a [?GCP VM | asr: "GCVM"] or anything you attach some disk to it, 8 GB, 20 GB, something. Are you literally using that disk? You don't. That disk is only there to store your operating system and your bundles, your jar files, your Python packages and whatnot. They're not using like out of those 20 GB, 2 GB, 3 GB are being used. They're not leveraging it enough. Now you may think that what you were doing here is with caching it in RAM. Now this is memory bound. API server RAM is very costly. If it is memory bound, which means that your API server, let's say if it has 8 GB RAM, it would need some fragment of it to run operating system, some fragment of it to run your application server and some other jobs. So you have very limited space to work with, but you have a gigantic disk, let's say 20 GB disk attached to this. Why not leverage that? Why not leverage the disk that is attached to the API server as a cache?

[00:30:38] Because what you are saving effectively from that is this expensive network IO. Disk is anyway faster than network IO. So you are saving this network IO by using disk as a cache, because for you local disk read is very fast as compared to the network IO that you would make to read from a centralized cache. So when inconsistency is okay, when you don't need strong consistency between them, are stateless, then you can actually cache some things on the disk of the API server. And this was the exact optimization that while we were having this discussion, that guy from Goldman Sachs, he got that idea, which did to optimize the system and worked wonders. This is where critically question every single component of your infrastructure. And hey, can I leverage this? Can I leverage this? Be extremely curious and ask those questions. If you just take it for granted, if you just think cache is RAM based, cache is centralized, then you would never come up with this optimization.

[00:31:41] So that's why system design in real world is very interesting because it helps. It makes you think at every possible step and you should anyway, think at every possible step. You have things between your [?ears | asr: "years"]. Use that always, always, always. And this is something mind blowing because very few people use it. They think if I'm storing it on disk, how will I get this performance benefit? Because memory is fast. But you are saving that expensive network I.O. Network is pathetically slow as compared to local disk read, local disk read. You can do in a fraction as compared to the network that you are making. So that's what I say. Always see if you are gaining something by caching something. Just limit caches to [unclear: "mavic"]. Explore it. You can use disk as a cache because whatever is more expensive than that, if you are saving it, you are helping your system thrive.

[00:32:38] Right. So, but again statutory warning because given that you will not have consistency between this, given that as your constraint that you will not have a centralized view of it. So if the request goes over here, it has something, it goes over here, it has something else. You should be okay with that. That's why it said it is very use case specific, but you can do it, you can cache a lot of stuff on API servers disk as well. And apart from that, few honorable mentions before we move forward is you can cache things on load balancer. So load balancers like nginx, if you're using AWS load balancer, you are using API gateways, you are using there, you can cache the responses just like you did with CDN, so that your request does not even come to your backend server, then forwarding it to centralized cache, then to database, materialized views and whatnot. So every single component in your request route is where you can ask this question that, hey, can I cache something over here? Would it make my system better? So load balancer is one more place where you can cache it. Load balancer, API gateway all falls into that same category where you can cache stuff.

[00:33:49] So local browser, CDN, load balancer, API server RAM, API server disk, then database materialized views. And in other case, the way you would want to leverage the database. And obviously centralized remote cache is there. So along this entire common layer of infrastructure that we always have, every single place you can [?cache | asr: "pass"]. But then you get some, you lose some. There is always a trade-off. So in this case, specifically, I'm highlighting this, the trading of strong consistency between this. And you should be, if you are okay with that, if your data is not changing much, then even having two copies of it does not matter. Because the data is very infrequently changed in the database. So it's okay. And if it's okay for you to stale data for some time, do it. It's the best thing ever. So these are points that I wanted to cover, cache at different levels. So along the route that we discussed,

<!-- chunk_04 00:34:48-00:45:45 -->

**[00:34:48] Teacher:** question every single step, and obviously depending on the architecture that you are working on, you would have some different components, but every single place in your, or every single component in your architecture will have a, will have a way to cache things, right? So go through that. So I'll take basically Sunay, Lanuba, Vikram, Amrit, Amrik and Harsh [check: name spellings], I'll take like, you can add it at the end when we'll have open forum. More than happy to hear your thoughts on that. Right now we'll move

## [00:35:18] Scaling

[00:35:18] Next part where we'll discuss scaling. Now here, as I said yesterday, we'll talk about databases part over here. And I'll tell you exactly how things are implemented. Not just scaling, scaling, but in general how databases are scaled. Okay. So scaling in general is having an ability to handle large number of concurrent requests. Now this concurrent is the key one. Large number of requests I can handle very easily. Of concurrent requests is what makes your system very interesting. It's what gives you the challenge, how do I do it? Because large number of concurrent users are there.

### [00:35:57] Vertical scaling and its limit

[00:35:57] So there are typical two strategies we all have heard, vertical scaling and horizontal scaling. So vertical scaling is where you add more resources. Now everyone knows it, but let me tell you why vertical scaling has a limit. Why you cannot make your infrastructure larger and larger and larger and larger. And what's stopping us from doing that? For example, let's say you have a database in which you have let's say 16 GB RAM, you want to handle more. What you did, you add more RAM, more CPU, more things, because if you have a bulky machine to do it, you can get things done. You can handle large flow. Now what's stopping you from making it from 16 to 32? Nothing. You go to AWS console, change the machine type. The database is scaled up. 32, 64, 128, 256, 512, 1 TB, 2 TB, 4 TB. But why can't you go beyond that? What happens? Is it that humans don't have that big, large of machines to work with? No, we have supercomputers. So then what's stopping? What's stopping AWS from giving you that? What is that one thing that is not allowed?

[00:37:05] You cannot just say AWS does not give me an option, so I cannot do vertical scaling. That's the most weird answer that I have got. I've definitely, I've actually heard this answer from a senior engineer, unfortunately, that I don't see an option beyond that. But think on a more fundamental way. Imagine your smartphone. You bought a smartphone, you bought a smartphone with an external SD card slot available. When you purchase that smartphone, it says that it can support external SD card of 256 GB. What happens if I insert 512 in it? Like an SD card with 512 GB storage in it. What happens then? It would not recognize. Why it is not recognized? Because of hardware limitation.

[00:37:55] So when any two components, any two hardware components have to interface with each other. When you insert a USB stick in the USB port that you have. Network card on your motherboard, or you plug in hard disk in your motherboard, that slot that you have or RAM that you have. What happens is the cache lines that are there. So the CPU buses that you may have heard in your college time, right? Year two, computer science folks, second year, microprocessor, MPT [check: course acronym as ASR wrote it] course. There you would have heard, or the course on computer architecture. There you have seen buses. Buses are the one that moves the data across. Has buses. Your USB stick, the golden lines that you see, those are buses. Now these buses needs to be placed or these needs to match. These needs to be compatible with each other. They need to understand the protocol in which the data would be sent. Not HTTP protocol, I'm talking about literal hardware protocol. The way it is would be sending the bytes over there. If that does not support it, you cannot go higher. As simple as that.

[00:39:10] And this is what is the reason why you cannot do infinite vertical scaling. It's not because AWS does not give you that in the drop-down. It's because of this limitation. It's because of this hardware limitation. You cannot do infinite vertical scaling. Because for you to support that one level up, you need to literally need a different hardware to do it. So unless a data center has it, you cannot go beyond that. Computers has fundamentals always for the way. [check: garbled sentence] It's always your CS fundamentals that goes a very long way. And this is why vertical scaling has a [?limit | asr: "new"]. And how do I know it? I worked in a data center for like, while I was in college, I spent my third year working in a data center because the professor loved me. And I asked him all sorts of stupid questions. Why this? Why that? Why AC temperature? All of that. And that's why I know this stuff. What is that physical limitation? And that professor used to teach us a microprocessor. Well, of course, so I could ask him this question. So he helped me understand why this doesn't work. And he actually showed me a demonstration of that, that how changing one helps you get the other.

[00:40:26] So this is why vertical scaling has a limit. Now, this is the actual hardware limit, because at the end everything is hardware. We are abstracted by software, it is running on is actually physical hardware. Vertical scaling is limited by the capability of the physical hardware on which things are running and not because of anything else. Okay.

### [00:40:47] Horizontal scaling and linear amplification

[00:40:47] So which is where we don't do vertical scaling. We prefer horizontal scaling because after a certain stage, when you cannot vertically scale up, but you need to handle more traffic. So that's why one machine will not be able to do that. You want to add multiple machines, which is where horizontal scaling comes in. The beauty of horizontal scaling, if you use it right, is 7th standard mathematics. It gives you linear amplification. What do I mean by that? Linear amplification is a standard term. That's why I used it. But linear amplification implies that if you know that one machine can handle 100 requests per second, what if I want 500 requests per second? I would need 500 divided by 100 equal to 5 machines. This is the benefit of doing horizontal scaling.

[00:41:37] Let's say you are Amazon, you have a prime day flash sale, right? You have a prime day sale. When you're having prime day sale, your marketing team knows or your business intelligence team knows that how many users will be there, how many orders will be there. They would have prediction models that would predict the number of orders that you have that you will get on that day. Given that, if you know that this is going to be the number of orders that I would get, you need to know that, do I have enough infra to handle that or not? With linear amplification, you can tell if you know the unit economic of one machine, the unit tech economic of one machine. For example, this machine of this particular configuration can handle these many requests per second. And if I want to handle n number of requests per second, the number of machines would be n divided by this. This is really critical when it comes to, when it comes to predictive scaling. This is what makes horizontal scaling possible.

[00:42:35] Autoscaling groups exist, but they don't work at scale. If you want to handle large spikes, autoscaling groups fail miserably. Miserably. Because they take their own sweet time to do it. You don't have that time when you see sudden spikes. For example, let's say there was a marketing campaign run. And suddenly marketing campaign shot a broadcasted a message to everyone. Now what would happen? A lot of users would come in. Traffic like this, you are very happy handling traffic like this. And suddenly because of that marketing approach, you got the sudden spike. When you got the sudden spike, your autoscaling group did not have time to react by the time these users flocked into your system. That's why before marketing team sends an SMS or a message or a push notification, you have to prepare your infrastructure to handle that spike. And then you ask the marketing team, now you send a message.

[00:43:31] This massive marketing campaign, it happens in coordination between those teams. If it doesn't happen, product is bound to fail. Infrastructure will go down. You'll have a massive outage. User will be unhappy and you'll lose business. So it's always a team game. The marketing team has to tell you before a big marketing campaign that you're doing. For smaller spikes like this and this and this, it's okay. Autoscaling group can handle. When it has breathing space to scale it up. It cannot. That is where you need to know this really well. Your unit economic of one machine. What's the capacity of this one machine? Now, how do you know it? Load testing is the only way. No other way to do it but load testing. There is no magic formula to get it. These are the number of requests that my machine can handle. If someone directly asks you that, if your senior engineer asks you that, or if your junior engineer asks you that, tell it. Let's do a load test on this machine and find the actual unit economic of your machine, rather than just guessing. There is no magical way to tell you that a 32 GB machine can handle 5000 requests per second. No, that's not true. There is always, you need to do load tests to get the answer. So keep those things in mind.

[00:44:49] Now, in the context of Medium, what we do is, and it's not that, like one thing to I should add is that it's either or, it's not that you either vertically scale or there you horizontally scale. And so there's a sweet spot. When you are starting up, when you're very young product, you do vertical scaling because you don't want to mess up things. And with horizontal scaling deployment becomes complex and whatnot. You do vertical scaling at first. And then after a certain stage you scale horizontally. Right. But always ensure you don't do any premature optimization. That's the root of all evil. Necessarily you are optimizing things, optimizing infrastructures for unnecessary reasons. Don't do that. Right. So we start simple. We first vertically scale API servers and then put a load balancer and horizontally scale the system. Third week we'll design a load balancer. You'll see how this is done. We just draw a box right now, but we'll go in depth of load balancer and how it is implemented in the third.

<!-- chunk_05 00:45:45-00:58:43 -->

**[00:45:45] Teacher:** But horizontal scaling, when people talk about it, people talk about horizontal scaling in API servers. Like here, we drew multiple API servers and we called it horizontal scaling. But, but, but there is a catch. You just cannot scale things horizontally because when you add more machines to your fleet as part of horizontal scaling to handle that large traffic, what about the database? What about things that these API servers depend on? Databases, centralized cache, you horizontally scale the system, you are accepting a large number of requests from the user on the service. All the service would forward requests to their dependent components, database, central caches, other services and whatnot. They would go down because they are not prepared for the scale.

[00:46:41] So whenever you are scaling, always do a bottom up scaling. So ensure that your database can handle the scale, then you horizontally scale your API servers and then your users make the request on that. So if your service depends on some other three or four service, they need to be properly horizontally scalable. And if it's a massive campaign, they need to scale up explicitly, then you will scale up. So it's always bottom up. So for massive campaigns, it's a team, it's an organization, it's an org level effort. Everyone needs to agree on that. They need to provide your document on how they do it so that you understand how you should auto scale.

[00:47:28] You cannot just auto scale assuming that things would work just fine because in a distributed system, one thing that has caused the most number of outages, and I'm so sure about it because I read so many outage reports, is cascading failures. When one component or rather when one component goes down, that component. So let's say this component went down, because of it this component would go down, because of it this component would go down, because of it the user would not be able to use the platform. So it's always cascading failures that becomes the root cause of all, all the major outages. You have to prevent that. So that is where always understand that whenever you are doing massive scaling, it's a bottom up event. To ensure that, ensure how they do it is their problem. But you have to ensure that the components that you depend on, they are scaled, they're able to handle the load and then you scale up. And so on and so forth.

[00:48:35] Okay.

### [00:48:35] Scaling a database

[00:48:35] So now enough of this. [unclear: "Arbet"], how do you scale it? Right. How do you scale a database? Because that's the most common because database, as I always tell this repetitive, I am very repetitive about this, that database is the most critical and the most brittle component of our infrastructure. Because if DB goes down, everything is done. So scaling database is the most basic thing that you should do. So how do you scale a database? I am not talking about simple stuff. Let me talk about actual implementation of it. That's where the magic happens.

[00:49:09] So first is the easy one where you do vertical scaling. You have a small database. You go to AWS console. A machine type, you get a bigger database, right? That's the easy part, vertical scaling of systems. But then comes horizontal scaling now, because obviously vertical scaling has a limit, so you need horizontal scaling. So how do you do it?

### [00:49:26] Read replicas

[~00:49:26] First is read replicas. In most applications out there, the read to write ratio is 90 is to 10 or 99 is to 1, right? But it's basically very heavily skewed in terms of reads. For example, even in blogging application, a lot of people would read the blog versus create the blog. A lot of people on YouTube would review the content versus create the content. So almost it's prevalent that readers are more than writers. Given this, you would expect a large amount of read traffic hitting your database versus write traffic, which means that if you handle reads well, problem is solved. You can handle [?massive scale | asr: "master scale"]. So how do you handle reads efficiently, which is where read replicas come into the picture.

[00:50:19] Now you have a master node, you have a replica node. There is an asynchronous replication that is wired between the two and it's almost a native property of the database. [unclear: "Pulse of configuration chain"] and you can have this replication setup. In case you don't know how to do it, just a Google search of it. Setting up a replication between databases, something that SRE team would do day in and day out. But in case you are unaware, just do a Google search, how to set up MySQL replication or any database replication. So with this, what happens is whenever a write happens on the master, the writes are sent to the replica.

[00:50:55] Okay. We tell it this way, but in actuality, what happens? The replica makes a call to the master and reads the changes. That's what actually happens. Master is not pushing the changes to the replica. Replica is pulling the changes from the master. Always remember. This is how a asynchronous replication actually works.

[00:51:15] So you have a replica over here. You have a master over here. What you would do is you would write, all the write requests will go to the master, right? Then asynchronously they would be replicated on the replica. Now what you want is you want reads to go to replica, right, and writes to go over here. So now how it happens? Database automatically does not do anything. You have to do the heavy lifting. So if this is your API server, your API server will create connections with both the databases.

[00:51:53] So remember, recall when you set up a database and you connect it with your API server. In the code you write, you create a database connection, you pass the connection string and you create a database connection object. There in the connection string, you pass two connection strings and you create two database objects. One for this, one for master, one for replica. Now in your business logic, let's say you are reading profile of a user. You can use connection object of replica to fire the query over here, right? For example, when you're creating a blog, you use the connection object of the master so that it will use this to write to the master. Right?

[00:52:33] So it's your business logic. You can, there is a magic layer that solves it automatically. There are tools that aids you, but in a most naive way, most basic way, most simplistic way, you are the one who can, who know, depending on your use case, which reads are not so critical and can be from replicas while which writes or which reads are critical and should go to master. For example, banks, the reads of the bank, where for example, reading a profile of a user in a bank, a bank website, reading a profile of a user that can go to replica, but reading of account balance have to go to master. Imagine someone, your friend sent you money and he said, it's there, but it's not, and you freak out and say, you did not give me money and whatnot. So reading an account balance is a critical read, which should go to the master. Why? Reading the profile and random information can go to replica.

[00:53:36] So it's your context. It's your application. So you know which writes are not so critical that you can send to replica by using the database connection object that you always create. Remember connecting MySQL, Postgres, MongoDB. Create two connections. And now in your business, you say, okay, for this use case, use this one. In the API handler, you use that corresponding connection object to fire the [?query | asr: "page"]. This is exactly how people use it. There's an intermediate proxy layer. We'll talk about it in fifth or sixth [?week | asr: "way"], but not going into those details. This is the most basic way of implementation, right? That you create database connection with both the databases and depending on the use case, you pick one versus the other.

### [00:54:20] Sharding the database

[00:54:20] Now this is how you have a replica setup. Now the next step, what if here you have a master, you added a bunch of replicas. Now what happens when you get more traffic than that on your master? You vertically scale your master, but what happens beyond that? Which is where you shard the database. So the problem here is that the data is so huge. The load is so huge that one node is not able to handle it. You split the data because the data itself is [?huge | asr: "used"], the node itself cannot handle it. So you have to have multiple nodes, which is what you do is you shard the database, which means you create here, as per this diagram, you create three mutually exclusive subset of data and distribute it among the three nodes that you have. All the three are master. Each one may have its own replica. No problem in that. No one's stopping it from having its own replica.

[00:55:19] The idea is that your API server would have some logic to know, depending on this request, which database server should I go to. That's the routing layer where your API server itself, let's say you are sharding by user ID. So some user go over here, some user go over here, some user go over here and it has to be fixed. So hash of user ID and you do hash based routing. Now the thing is in the API server, you create connection with all the three databases. Depending on the request, you see for which user the request is, you forward the request to that corresponding node, get the answer and send it back. Right. This is literally how you do it. So if you have three shards or API server creates three database connections with this simple, right?

[00:56:04] This is the most naive, most basic implementation, like way to implement this. Highly recommend you to do this locally. When you hit production system, you might see fancy proxy layers sitting in between and [?whatnot | asr: "water"]. We'll talk about it in week five, right? How that [unclear: "app"] implemented. Things like understanding how it actually works, then adding complexity of an intermediate proxy layer is different. So first understand how you can actually do it naively and then you find other tools that helps you do it, because not all databases have those intermediate proxy layers, right? So you cannot just expect that to be there on all databases. So that's why knowing how to do it in the most basic way is essential for you to understand how it functions, right? So here the API server itself has this logic to know which database to talk to and it forwards the request to that database and it gets fixed up.

[00:56:54] This is all about databases, how to do it. Next week, we'll talk about databases, but on concurrency part, on transactions part and all. But this is how you scale a database, which is the most important part of it, because scaling of API servers is easy. Autoscaling groups, horizontal pod autoscaler thing to scale the API servers, right? Load balancers, this is anyway there to handle it because API servers are stateless. It makes your life very simple, but things become very interesting when you'd want to scale a data. These are three very common ways of scaling a database. Any questions on the scaling part before I move to delegation? Go on Nitin.

> **Student Question [00:57:38] - Student 1:** So I have a question on the read replica type of scaling. So, so over here we are using the master node as a, for all the write operations. So what if the master goes down and I mean, it's an outage, master goes down, it's an outage. I think, I mean, during college time, we read about different types of architecture, like in this case, it would be like a multi-layered architecture where the master is the root of. And then there are read replicas beyond, I mean, the children are the replicas of the master node. So whenever the master node, I mean, the master nodes are used for a write and reads, but if the writes are propagated to its children. Okay. In a synchronous manner, whenever a master node goes down, then there's a kind of voting system between all the, yeah, leader election.

<!-- chunk_06 00:58:43-01:12:04 -->

**[00:58:43] Student 1:** Another node becomes as a master, till that the master nodes goes up. Correct.

**[00:58:48] Teacher (answer):** That's a way to automatically recover from failures. But you may not always see that in production. Not always. There are some systems that use leader election and that's the way to do automatic recover from failures. But in most cases, you would see, because the world is cloud native now. If you are building AWS, you would have to do leader election. But if you are using AWS, AWS itself will do leader election for you and have a standby node become, and basically promote a replica to be the master and whatnot. It would do it [?internally | asr: "internet"]. Right.

[00:59:21] So talking from a practical perspective, we'll talk about leader election next week, next to next week. Right. But here when you talk about in simplistic way, I'm not over complicating it on first week. But when you talk about it simplistic way, what you're talking about, leader election, where your replica becomes a master and all that is there, that is recovery. That is automatic recovering from failures kicks in, right? But you may not always see it in production when you are having this kind of architecture, right? Because implementing it is a pain and not product companies need that because cloud gives you those guarantees.

**[00:59:54] Student 13:** Okay.

**[00:59:55] Teacher:** But we'll talk about leader election. We'll talk about leader election at three different places.

> **Student Question [00:59:59] - Student 1:** So why I ask this because in my experience, I have never, I mean, we have never provided a [?connection string | asr: "setting string"] as a read replica. We always like, we just always provide a single connection string.

**[01:00:12] Teacher (answer):** And I think that it's abstracted. Correct. That's what I'm saying. That architecture is abstracted. So that part, so that is a proxy kind of thing, which is you are providing one connection string and it is doing this heavy lifting for right. And not everyone would have that. That is where the naive way to do it is let your API server itself do this one.

> **Student Question [01:00:36] - Student 1:** And also one last small thing, if if we are providing multiple connections at the API server level and the API server is responsible for making a connection pool with each of them, then there won't, won't there be a heavy load on the API, like to maintain a connection to send out heartbeats now and then?

**[~01:00:56] Teacher (answer):** But you need that, right? You need that, you need that, and there is your API server to have connection with both [?databases | asr: "variables"] so that you can forward the request to the corresponding one.

**[01:01:08] Student 15:** Okay. I got it.

**[01:01:11] Student 16:** Okay. Thanks for that.

> **Student Question [01:01:13] - Student 3:** Yeah, actually we did touch upon a bit of what I want to understand towards the end, but I'll just elaborate the session a bit more. So in a normal use cases, do we manage connection pools separately for all these horizontal scale instances?

**[01:01:31] Teacher (answer):** For each database is a separate connection because TCP connections are stateful. Right. It's between a server and a database. It's a stateful. Right. So you need to have a separate TCP connection pool for every one of them, for every database.

**[01:01:46] Student 3:** Okay. Okay. And this could either happen like at a proxy layer and we maintain a pool with the proxy. Yeah.

**[01:01:54] Teacher:** Either way, your API server can maintain it, proxy can maintain it with the database. This can be stateless. All options are possible.

**[01:02:01] Student 12:** Got it. Yeah. Thank you.

> **Student Question [01:02:06] - Student 3:** Yeah. Hi. So I just want to understand that this sharding, so does it mean that instead of one database, we have exact same three databases?

**[01:02:16] Teacher (answer):** No, these are exclusive subset of data. So a third of rows will be over here. A third of rows will be over here. A third of rows will be over here.

**[01:02:24] Student 3:** Okay. Or can we do something like if I have a hundred tables in my application, so we can have 30 tables somewhere. Correct. Vertical sharding, but it will also, we need to manage those connection pooling in two three databases. Yeah, yeah, yeah, okay, yeah, all right, sure, sure. I have a question on caching, can ask now?

**[01:02:47] Teacher:** Not on caching, we'll basically take it at the end. Sure, okay, sure.

> **Student Question [~01:02:52] - Student 2:** So when we talk like no master DB or like no child DB, right. And then like no replica DB. So it is not server DB, right. So we can have like, no cluster of like no DB server. If it is Oracle database, Oracle RAC, if it is Amazon, then we can,

**[01:03:10] Teacher (answer):** There's no one way to build any system by the right. So you can have it the way you'd like.

[01:03:15] The reason I wanted to bring up this, right. So we can avoid like no DB outage. So if we, we can, we can definitely do that. And this is a very simplistic view. Tolerance of databases in fifth week, you'll see how we restructure this into ensuring that there is no, no outage at all. Right. How we handle, how we recover from failures and whatnot. We'll, we'll touch up. It's still first week. I'll take two more.

> **Student Question [01:03:42] - Student 1:** Hi, does auto scaling of EC2 instances go under horizontal scaling or vertical scale?

**[01:03:50] Teacher (answer):** Autoscaling. You add more instances, right? You have steps scaling there, when an average CPU utilization of the cluster goes beyond 60%, add one more node. Right. That's what the rule that you write. That's what general scale. Thanks. Yeah, Amrita.

> **Student Question [01:04:06] - Student 12:** Yeah. So, hi Gaurav. So my question is around the scaling of API servers and DB all together to handle the loads. So there are out of the box solutions available in the market which auto scale themselves, so in that case, like, like, give me example of one so that I can be a little more specific, like, let's take example of EC2 only. So they auto scale, so in the, in those cases, we, who takes the responsibility of scaling the API server, and if it is responsibility of [?ours | asr: "R"], then do we have out of the box solutions available for that?

**[01:04:50] Teacher?:** We define the rules.

**[01:04:51] Teacher (answer):** Autoscaling group will just spin up instances and add it behind a load balancer. We have to define the rules that when do we want to scale? For example, one way to scale is average CPU utilization of a cluster. So if average CPU utilization goes beyond a certain factor, add one more machine. If it goes beyond that, add one more machine. Define those rules to scale up and scale down. Right. But auto scaling, what it, auto scaling group, the auto scaler that you have provided by AWS or any cloud in general, that responsibility is to spin up a machine and add it behind the load balancer. That's what it would take care of. Okay. But the rules you have to define.

**[01:05:32] Student 12:** Okay.

**[01:05:34] Teacher:** Great. We almost covered everyone. Ritin, Chandan, and Deepak, I'll take your questions at the end. Okay.

## [01:05:42] Delegation

[01:05:42] Let's move to delegation. Delegation, and now here I'll cover basically Kafka essentials, which everything that you should know about Kafka in order to design systems, so those factors will cover. The delegation is the most, like, it's like it's the most underrated way to get performance out of system. So I happen to attend a talk, 2020, we just went in the lockdown, and there, there was a session by VP engineering Hotstar. What he said stuck with me. The principle that Hotstar is known for handling massive [?scale | asr: "skills"]. Obviously I give credit more to Akamai than Hotstar, but still Hotstar does that pretty well on the API side.

[01:06:28] So what Hotstar, what that person, I really should remember his name, but what he suggested was the way Hotstar looks at systems. They live by this principle that whatever that does not need to be done in real time should not be done in real time. Now this real time implies in the context of the request. So when you send the request and it does bunch of stuff, out of those bunch of stuff that it has to do, what is extremely essential for it to do in the request context, do that. For everything else, just delegate it to the worker.

[01:07:08] This is what it lives by, because of which the response time that you see, because in the context of the request, the amount of work that it has to do is bare minimum. You get very fast responses to the user. User gets good experience. There is very less load on the database and whatever can be done in an asynchronous way is done [?asynchronously | asr: "in a sequence"]. So this is what is superb about building systems at scale, doing or leveraging delegation to the fullest.

[01:07:37] I want to talk it in the context of Medium. Let's say we had user information, but now let's, I want to add the number of essays that a person wrote on the platform. But this number, you may say, yeah, I can do it with join. Yeah, you can do it with join, but I'm just manufacturing this use case to help you understand delegation part and we'll go into Kafka essentials through this. So say when I want to render this number. So what I can do is, I can actually come to that. So I can actually add a field in my users table called total blogs. Right? So every time the blog is published, I want to do count plus plus over here, but this is not so critical application or not the critical update. I can do it asynchronously. Right? So which is what this delegation is all about.

[01:08:24] So the core idea of delegation looks something like this. Client, you get a request, API server submits a task and sends the response. That's only the job of API server. So whatever needs to be done in the request context, it's done in the request context. Here the request context ends as soon as the client gets the response, right? Okay. Now when the task is submitted, it is submitted in a buffer, typically called as a broker, right? Message broker, message stream, same concepts over here. So it is pushed in a broker which is consumed by a bunch of workers and these workers do the heavy lifting and update the database. Right.

[01:09:07] So for our account example, this is exactly what would happen, where the updates would flow. For example, request from a user comes to the API server where a blog is published, let's say a blog is published. So what we do is we send a message called on publish in a message broker. Let's say I'm using SQS, SQS, RabbitMQ, anything. We put a message in a broker that a blog is published. Now in the worker, when a worker reads this message, it says, hey, a blog is published. What do I do? Worker has the business logic to do total blog plus plus in the database by firing an update query. So workers make a DB call to update this total blog and do count plus plus, and then reads anywhere happen and it reads the count from here when the page refreshes and does whatever. But the updation is done in an asynchronous way in the database. So whenever a user reads the next time would see the updated value.

[01:10:04] Here you can very clearly see the delay in processing that would happen because of asynchronous flow. But what you are saving from this is that API server does not have to directly write the database. It is updating this count asynchronously. So there is no synchronous load on the database. So the number of concurrent writes happening on the database are fewer. So database is experiencing less load. So the database is happy because it is the most brittle component of your infrastructure. Protect it. It's that iPhone. It's like iPhone, right? When you, it's like the new iPhone that you purchase, it's so, it's so expensive that you have to keep, you have to take very good, you have to take very good care of it, right? You put it in a shell, or not shell, you basically put a nice cover on it to ensure that even if it falls nothing breaks. Same, your database is iPhone. You have to take care of it very much because if this goes down everything is done, right? So take care of database like you are newly purchased [?phone | asr: "for"], not just like, but you're, but you're newly purchased [?phone | asr: "for"], right? So do whatever it takes, put less load on that, let it work just fine. It's like that pampered child, right? You have to keep care, you have to take care of it very much, right? So this is how a typical flow would look like.

### [01:11:25] Message broker - message queues and message streams

[~01:11:25] But this is where the magic happens. This broker, this is the heart and soul of delegation as a principle. So there are two ways to implement it, two kinds of broker. First are message queues. Second are message streams. So message queues are literal queues in which you put the message. There are bunch of consumers and they consume the message from them. Now this consumers are homogeneous consumers, which means they all do the exact same thing

<!-- chunk_07 01:12:04-01:24:34 -->

**[01:12:04] Teacher:** That you push. So let's say I have a task to publish that, hey, do this, spin up an EC2 instance, or update the account, or do or send an email notification, send a reminder, something, right? A task is submitted in a message and it gets stored in the broker in a message queue. SQS, RabbitMQ are queues. Then you have another message that is coming in, it got over here. Third message came over here, right? It's a queue. So one after another. Now from this, the consumer pulls the message from the queue. It's never push base. It's very few instances where you do push base things. Your consumer pulls the message from the queue and let's say consumer two pull the message first and it will get this message. Right. Then first consumer pulled the message and it got this message. Now consumer two pull the message, it saw what needs to be done, it start doing that particular part, right, which is where the heavy lifting is done by the consumer, right? Message queue is acting as a buffer for us to keep the message while consumer is the one that is reading from it and processing, it's doing the heavy lifting for you, right? Now the third message goes to consumer three. They all do the processing and discard or basically delete the message from the broker, right? But this is what is a very basic of a message queue.

[01:13:29] Now here, one key thing to note is that all these three consumers are having the exact same logic. They are all listening to the same queue. A message is sent or a message is read. When a message is read from a queue, it is exclusively read for a particular consumer. So now this message will not be going to any other consumer. So for example, this is my consumer one who read the message. It doesn't mean this message will not go to consumer two or consumer two. The three consumers are homogeneous in nature, they have the exact same business logic running, they are all pulling the message, returning the message from the queue and doing the heavy lifting, right? This is a message queue.

### [01:14:07] Message streams

[01:14:07] Right, now there is another type of brokers called message streams, which is where Kafka and Kinesis fits into the scheme of things. Now let me walk you through what the problem is and then we'll understand how message streams work. So let's say what we would want to do is we want to, like, when a blog is published, when a blog is published, we are doing count plus plus, but now let's say we want to not just do count plus plus, but we want to index this blog in Elasticsearch so that search service can use that. If you would want to also index this into Elasticsearch, which means that I would have like Elasticsearch running over here and my worker would have to also write it to Elasticsearch. That is one way to do it. So for example, it might look something like this. Let me quickly draw that and I'll erase it. So let's say this is your Elasticsearch and now your worker would also have to write over here. So now upon blog publish, when the message came to the SQS and got consumed by this worker. Now this worker is doing two things. First, it is doing count++ by making an update query on the database. And second, it is updating the Elasticsearch, creating this entry in the Elasticsearch index. Okay, no problem.

[01:15:32] This worker is single source of code. Two teams, one analytics or one backend team and one search team that were collaborating on this code base. You know what happens when you collaborate with other teams? Fights. Changes of one, stops the deployment of others, uncommitted changes, messy branches, very different looking code problems. These are all management problems. There are people problems that come in when two people collaborate on the same code base. Apart from that, engineering challenges would also come. For example, let's say this worker consumed this message, did count++, but before it could update, in Elasticsearch, the worker crashed. Now what would happen? This failure scenario means that you did count plus plus. So the blog count became from 74, it becomes 75. But before I could index it in Elasticsearch, my worker crashed. So now I have inconsistency. My count says 75, but my search is 74. Problem. Right.

[01:16:40] So this way now what you would do, you would retry. Message failed, now I will retry. If you are retrying, if you are reconsuming the message and retrying it, now what would happen? You will again do count plus plus. When you do count plus plus, the 75 would become 76 and the 74 now, and now your search indexing became successful or was successful. So now you have 75 entries over here, but your count says 76. Problem. So which is where doing two things in one shot is always a problem in distributed system, because machines can go down time, right? And distributed transactions are extremely costly. So what's the solution? This is where message streams came into the picture. So what you typically do over here is you use a message stream like Kafka or Kinesis, and now these work on a different principle. So they are slightly different from a message broker or a message queue, rather message queue is a better word.

[01:17:41] So message queue is where you have homogeneous consumers, where you have message streams, where you have heterogeneous consumers. So for example, you have a backend team or analytics [?team | asr: "stream"] that is doing count plus plus, and you have a search team. So now whenever a blog is published, you push a message in Kafka. The message goes over here. They are buffered in Kafka until the retention is over. Now what happens is when the messages are coming in Kafka, in the message queue, your consumers read the message from the queue, process it and delete it. But with message streams, the messages are not pulled out, but rather visually the consumers are iterating over these messages. This is what happens behind the scenes. So this is what happens rather visually. I have two types of consumers. Now these are heterogeneous consumers. These were homogeneous consumers. These are heterogeneous consumers. Search and analytics. Search is just reading the message and indexing it Elasticsearch. Analytics is just reading the message and doing count plus plus. Okay.

[01:18:55] So now what would happen? When your search is iterating through these messages, it is iterating at its own sweet time. No one is deleting message from a message stream. Messages are there until the deletion policy kicks in. Deletion policy is deleted message after 40 days or 40 days or 60 days or 100 days. That's up to you. But messages are not explicitly deleted by any of these consumers. These consumers, they iterate over these messages at their own sweet pace and do the own sweet thing. So now search consumers will iterate over these messages and will do indexing in Elasticsearch, while your analytics consumers will iterate on these messages and do count plus plus. Now here no one wants these two to do exact same thing at the exact same time, because they both can work there at their own sweet time. Search team can work and have their consumer work at their own sweet time, analytics can do that at their own sweet time without having any problem, right? This way what you get is, even if search cluster [unclear: "is understood"], Elasticsearch is down, analytics they has nothing to do with it.

[01:20:01] It can continue processing and move ahead with this. Right? Because they're not dependent on each other. This is the core idea of a message stream. And this is the most powerful technology in our day to day. Kafka, Kinesis, they have worked wonders. They have a real, like they have made companies re-architect their entire architecture, right? They have done that because it has helped people solve massive enterprise problems. Because it's very difficult to manage people. You have to do it. Okay. So this is where Kafka comes in. Wait, wait. I'll give chance to ask questions. Wait, wait. Let me cover that. Okay.

[01:20:47] So now what happens next is with Kafka, what you are doing is given that you have two things, search and counter. Search counter service does count plus plus in the database. Now, when a blog is published, the message is sent to Kafka, messages persisted in Kafka, search service consumes the message at their own sweet pace, counter service consume the message at their own sweet pace and does the corresponding job. This way, now you have, you can have two separate code bases. Search team owns the search code base, counter service team owns their own code base. People happy, manager happy, organization happy. And as a user do decoupling as much as possible.

### [01:21:28] Kafka - topics and partitions

[01:21:28] Okay. Given that Kafka is the backbone of our modern computing system, we need to know the most critical parts of it. Right. So that's why let's spend some time understanding Kafka, like the essential that you should definitely know about Kafka and obviously bunch of misconceptions, which I hate people assuming. So in Kafka, what you have in Kafka is a, obviously it's a message stream, not a message queue. Kafka is a message stream in which the messages are persisted almost forever as per the deletion policy. It's a message stream. Now internally Kafka has topics. So what I'm drawing over here is one topic of Kafka. Let's say blog published or on publish is one topic of Kafka. So think of it like a queue. So on publish is one topic of Kafka. So when you push a message to Kafka, you push a message for a topic in Kafka. So let's say when a blog is published, I push a message to on published topic and it would be stored for that particular topic in Kafka. So that is the first level, first terminology that you should know. That's a topic in Kafka. Now, every topic in Kafka has some number of partitions and every topic can have different number of partitions. So let's say the blue lines that you see are the partitions of [?on publish | asr: "unpublished"] topic.

[01:23:00] So here I have drawn three partitions of this topic. So now what happens is when you push a message to Kafka, you can push a message to Kafka for a particular topic. You provide that this is my partitioning key. Depending on the partitioning key, given that you have three partitions, the messages will be stored in a particular partition of Kafka. So for a particular [?on publish | asr: "unpublished"] topic, when I'm publishing a message that a particular blog is published, this message has a particular partition key. You can define a partition key. Let's say you define user ID as the partition key. So all the blogs published by a particular user will always go to a particular partition. So out of this three, it would hash the user ID and see where, in which partition it fits in or it is routed to. So it will go and put this message in this partition at the front of the queue. Then the second message came in. Let's say it went to partition three because the user ID hashed there. This message went over here and this message went in the third partition over here.

[01:24:11] Now when your consumers are reading this, right? So messages are sent for a topic within which they are stored in a particular partition. Now when a consumer is reading a consumer. Now here the beautiful thing is I can have multiple search consumers.

<!-- chunk_08 01:24:34-01:36:20 -->

**[01:24:34] Teacher:** I can have one consumer, but I typically have multiple consumers to do search indexing as fast as possible. So search, this one that I drew over here. This one, three consumers that you see over here. So three consumers are there reading from this. So now what happens is in Kafka, because my number of partitions are three and I'll have multiple search consumers doing that part, and similarly I'll have counter consumers iterating at their own sweet pace on the same topic. When my search consumers are using their iterating, because I have three partitions, only three consumers can be active. So for example, search consumer one, and now this is handled by Kafka. You don't have to do anything. You literally don't have to do anything. Kafka handles this for you. So when you create a consumer, you say that basically this is called as a consumer group in Kafka. So for example, given that you have three partitions, you can have three consumers over here.

[01:25:35] Consumer one, consumer two, consumer three. Consumer one will read from partition one, consumer two will read from partition two, consumer three will read from partition three. And the messages are ordered in the partition. Here you see first message, first [?here | asr: "year"], second message over here. So ordering guarantees are within partition, not across topic. So it cannot guarantee that across topic the messages are ordered. The ordering is guaranteed within the partition, right? So for example, if user publish blog one first and then blog two, the consumer will read blog one first and blog two, who is iterating on that partition, right? But across partition, no guarantees. So now here what would happen is the search consumer that you have that is consuming from this particular partition, it will read all the messages from the first partition, consumer two will read from the second, the third partition. Now what happens when you add fourth and fifth consumer? Given that you have only three partitions, when consumer four starts and consumer five starts, they would not get any messages. When they iterate, they would not get anything because that's what the limitation of Kafka is. So the biggest limitation of Kafka is its parallelism. The parallelism of your consumption depends on the number of partitions of a topic.

[01:27:00] So if my topic has three partitions, I can have at max three consumers consuming from that. And I can have three, I can have N different types of consumers, analytics, counter, backend, something, something, something. But for each of them, I can have at max three different or three consumers only. I can have two, if I can have less than three also. For example, if I only have one consumer, then it will get messages from all these three [?partitions | asr: "parties"]. When it iterates, it gets iterated from all these three [?partitions | asr: "parties"] in a round robin way. But at max, you can have three consumers over here. That's the limitation of Kafka.

### [01:27:45] Kafka - committing

[01:27:45] One final thing about Kafka is when you iterate, how does it know that you are [?iterated | asr: "treated"] to a certain point? So which is where there is a thing called committing after you read a particular number of messages. So let's say my consumer, let's say my analytics consumer read first message, second message, then it can issue a commit to Kafka. And your Kafka will keep a track of that consumer one of analytics consumer group has read till this message. Then when the consumer reads another message, it starts from the same point again and then it commits that I've read till this point, it starts again, then it commits again that I've read till this point. So in case, let's say it read till this point, but before committing my consumer crashed off, not Kafka, but my consumer crashed off before committing. So when, although I process these four messages, but because I last committed over here, so when my consumer will resume, it will start from...

[01:28:46] Kafka does not guarantee exactly once semantics. Kafka guarantees at least once semantics. If you want to have exactly once, there are other ways to do it, but Kafka out of the box, and now it has also started providing some kind of exactly once, but it's still not truly exactly once. But as a simplistic view, it's, should be okay for you to reconsume different set of messages, oh sorry, the same set of messages again. You should be okay with that. So this is how you would tell Kafka that me as the consumer group, I've read till this point, now when I will resume, give me messages after this.

[01:29:24] This is what the committing of Kafka looks like, right? These are the basic things that you should definitely know about Kafka, and this holds true for Kinesis also. Kafka has partitions, Kinesis has shards. Same thing, different terminology, and underlying architecture nearly the same, right? There is no big of a difference between the two, the way these operate, all the message streams operate, they operate in this exact same, right? So understanding one helps you build an understanding of other, just API nomenclature, API and nomenclature, right? But this is the heart and soul of delegation, message queues and message brokers, right?

[01:30:02] And this is the essential of Kafka that you should know, because we will be using it throughout almost all the systems, almost, almost all the consumer systems that we design, and because that is the backbone, that is the heart and soul of delegation. So whenever we're delegating and we need multiple types of consumers, Kafka is, will be our default choice. But it's, there is one place where Kafka doesn't suit, and we'll talk about it in week...

[01:30:32] One place where Kafka fails miserably. Miserably. It's the worst that you can use then. Because a lot of people think Kafka is a magical solution. They sprinkle it like it's salt. Goes in every system. No. Consistent hashing. Very stupid solution in some cases. Kafka, very stupid solution in some cases. They are not magical solutions. You need to know the strengths and the weaknesses of it. And then you can make a [?sane | asr: "same"] choice. Okay.

## [01:30:58] Q&A - delegation

[01:30:58] Any questions on delegation? Go on, Rajiv.

> **Student Question [01:31:03] - Student 9:** So, we have different groups of consumers. So, I just read somewhere that, each, consumer in a group can subscribe to a single partition. So if you have multiple partition, those members of the groups talk about.

**[01:31:19] Teacher:** Yeah.

**[01:31:20] Student 9:** Yeah. So now the, I always wondered at how these, I mean, since the partitions has different, messages, you know, the ordering is like scattered now. So how these consumers actually talk to each other to.

**[01:31:32] Teacher (answer):** I said there is no global ordering. That's what I said. I spent five minutes talking about it. There is no global ordering.

**[01:31:36] Student 9:** Okay.

> **Student Question [01:31:37] - Student 9:** So, but if a consumer wants to know all the message that it say you have distributed the messages across all the partitions. Now, if a consumer is subscribing to a partition one, but partition two and partition three also has few messages, right? So how would consumer one know about the messages in partition two and partition three?

**[~01:31:52] Teacher (answer):** No, consumer one. If there is only one consumer exit, we'll get message from all the three consumers in a round robin fashion. It is never that you specify you subscribe to only one partition over here. It's never like that. You can have less than n, where n is the number of partitions, number of consumers. You can have it and it does it in round robin. So one message over here, one message over here, one message over here, like this, it goes. But it's always better to have n is to n. So if there are N partitions, have N consumers, that's the ideal way to build that system, but still you can have fewer consumers than partitions. It's perfectly fine, but there is no global ordering.

**[01:32:40] Student 9:** Okay.

> **Student Question [01:32:42] - Student 1:** [unclear: "So got up."] Hi, so the basics of a message queue and stream are the same, right?

**[01:32:50] Teacher:** What basic, what do you mean by basic?

**[01:32:54] Student?:** There is a consumer who hovers over the items or messages.

**[01:32:58] Teacher:** Correct.

**[01:32:58] Student 13:** Yeah.

**[01:32:59] Teacher:** And then it's a buffer. It's a buffer where you are holding up messages and then consuming at your own sweet time.

> **Student Question [01:33:04] - Student 1:** So does that mean if the place where I should use queues is where I have only one operation to operate on?

**[01:33:11] Teacher (answer):** Correct. That's the best way to look at it.

**[01:33:14] Teacher:** So why don't we use streams? Because streams are, they at least seem to be more powerful than expensive, expensive cost. [check: "So why don't we use streams?" may be a student question] Okay. Cost. For example, SQS, AWS SQS bills you per message. Kinesis bills you for the duration that it is running. Right? So for a smaller workload, you'd go for SQS. Why would you want to waste money on streams? Because that infrastructure is constantly running. Cost is one factor that you should always think about. You are there to save cost for the organization. You can design as fancy of a system, but if it is not cost efficient, it will not see the light of the day.

> **Student Question [01:33:53] - Student?:** And how many number of partitions is better? Should we have more number of partitions for better performance or less?

**[01:33:58] Teacher (answer):** Depending on the concurrency, depending on the speed of consumption you need, you can have as many partitions as you want. Right. But depending on the consumption rate that you expect, you can add more partitions to that. Okay.

> **Student Question [01:34:13] - Student 1:** And the last limitation of Kafka that you talked about committing the messages. Can't we commit a limitation?

**[01:34:19] Student?:** That's a feature.

**[01:34:21] Teacher?:** A message. So we can commit at each message, right? Yeah, we can. We can commit at each message, but it's like too much. Like, but it's better to do batch commit. Why want to make network calls every time to commit?

**[~01:34:32] Student?:** Thanks.

> **Student Question [~01:34:32] - Student 2:** So message queue can have one consumer group or more than one consumer group?

**[~01:34:43] Teacher (answer):** Message queue. Message queue has all, all homogeneous consumers. These are all homogeneous consumers.

**[01:34:52] Student 2:** Homogeneous consumers. So that means like now one consumer group or more than one consumer group?

**[01:34:57] Teacher (answer):** One, one, one. All these are same, exact same. So they would read the same. Anyone who is reading the message will get the message. It's not that everyone is iterating their own sweet pace. That's what this visualization depicts. Right.

**[01:35:10] Student 2:** Suppose if there are more than one consumer group, then the solution is message stream, not message.

**[01:35:15] Teacher:** Correct. Correct.

> **Student Question [~01:35:16] - Student 2:** Okay. And other question, right? When a message is processed from queue or stream, [?happy path | asr: "happy party"] always like the process of successfully. Suppose if it's at consumer level in middle or somewhere, then how it intelligently can process the message again? So do we have to manually re-trigger or replay the message process?

**[~01:35:35] Teacher (answer):** No, that's a guarantee of the underlying queue that you're using. SQS provides different guarantees, [?RabbitMQ | asr: "rapid time queue"] provides different [check: sentence breaks off here, words possibly lost] called as a visibility timeout in SQS. So what happens is if this fails, then before deleting the message, obviously before deleting the message, the consumer failed, then after the visibility timeout, typically two minutes or 10 minutes, let's say 10 minutes. So after 10 minutes, the message would reappear at the front of the queue.

> **Student Question [01:36:03] - Student 2:** So what is the indication of failure? Let's say like no consumer is doing like, you don't delete it.

**[01:36:07] Teacher (answer):** You don't delete it. That's the indication of failure. The consumer after processing the message has to delete the message.

**[01:36:13] Student?:** Oh, it's part of the code.

**[01:36:16] Teacher:** You have to write it. You have to write it.

<!-- chunk_09 01:36:20-01:49:02 -->

**[01:36:20] Student 2:** Because we use stream, but we don't like write any code. Stream mein you commit.

**[01:36:25] Teacher:** Queue mein you delete. Okay. Stream mein, if you don't commit, you would again start from the last checkpoint.

**[01:36:32] Student 2:** It looks like the commit is also internal. We don't commit like part of the code.

**[01:36:35] Teacher:** You commit or you have set it to auto commit or a periodic commit.

**[01:36:39] Student 4:** Okay.

**[01:36:40] Teacher:** It's always there. It's always there. It's always there. [check: possible ASR duplicate] It's not magical, right? Either you have to have said commit on every message, as an auto commit or a periodic commit. 100%.

**[01:36:49] Student 14:** Yeah. Yeah.

**[01:36:52] Teacher:** I'll take one more. Yeah. I'll take one more and then we'll go on a break. I'll just pick someone at random who I've not interacted with. Yes, Aditi.

> **Student Question [01:37:01] - Student 8:** Yeah. So yesterday we looked into that connection pooling and there we were setting a maximum limit of connections and any further incoming connections would be, that would also be kind of a queue, right?

**[01:37:16] Teacher (answer):** Difference here in message. This is infrastructure queue. This is a separate process that is an in-memory queue. Okay. In-memory queue, like queue data structure. This is your infrastructure queue component. Like where you spin up a process, right? Two very different things.

## [01:37:34] Break *(admin)*

[01:37:34] *(admin)* Okay. Yeah. Okay. Pariksit Sampad Ranjit. [check: name spelling] So I'll take your questions at the end. Now what we'll do is we'll take a break, it doesn't quite long, we'll take a break and once we come from the big break we'll talk about, we'll talk about concurrency and we'll talk about then communication. So concurrency is a small part, we'll spend more time on concurrency next week, but we'll talk about communication a little more in depth. And then again, more than happy to take any questions that you have throughout the session, whatever we covered, at the end. So session again, like always, would not end until all the questions are right. Okay? So it's 10:38, we'll take break till 10:45, and from 10:45 we'll resume our discussion on concurrency and communication, right? See you folks at 10:45. Thanks folks.

[break ~01:38:25-01:44:37]

**[01:44:37] Teacher:** Thank you. [check: possibly hallucinated in silence right after the 372 s break]

## [01:44:56] Concurrency

[01:44:56] Let's start with the second half for today and we discuss concurrency and communication. So concurrency is one of the most important things that helps you get the performance out of your system. Right. So now why concurrency is important? Because it helps you extract the most out of your single machine, be it your server, be it your database, be it your asynchronous worker, anything. Right. To get the most out of your machine you need to run either multiple processes on that or multiple threads on that to get it. So multi-processing, multi-threading falls under this concurrency.

[01:45:38] Comes up with a bunch of issues. The biggest of them is communication between threads, like how do you communicate between two threads or two process that hey, I'm done with this processing, please don't reprocess this again. Classic case, right? How do you prevent concurrent use of shared resources? Now let me talk about a bit. So with concurrency what happens is when you have two threads, a classic, classic example, you have a global variable count, you have two variables, two threads, both are doing count plus plus, right? You have a global variable count, int count equal to zero, both threads are [unclear: "excess sacred"], both are doing count plus plus. Count plus plus is not thread safe. Why? Because if, let's say, I do this 1000 times on each thread, my total count should be 2000, but it is 1997. Why? Because count plus plus is not atomic, because count plus plus is not a thread safe operation. Why? Just a Google search in case you are not from CS.

[~01:46:37] But concurrent systems are extremely difficult to build because when it comes to concurrency you need to guarantee two things. First is to ensure data correctness. Like I'll give you an example where I have two threads both doing count plus equal to, like count plus plus thousand times, the final value has to be 2000 and not 1997. But you will get 1997 because count plus plus is not thread safe, right? So correctness is one issue. Second is you need to have high throughput. So a way to ensure correctness is to use locks. Optimistic, optimistic locking, pessimistic locking, we'll talk about them detail in coming weeks, third, fourth, fifth, sixth, we'll talk in depth about it, but I'm just giving you a gist of it. So locks are ways to ensure, to like, locks are the way through which you can protect your critical section. For example, you wrap your count plus plus with semaphores and say that at any point in time, only one would move in to the count++ while every other thread would wait. That's a classic implementation.

[01:47:47] It's like roads that we drive our vehicles on. When we hit a square, there's a traffic signal. Each road that is coming onto the square has a traffic signal. The center part of the road is the critical section. At any point in time one traffic signal goes green, allowing it to consume that middle part, then it turns red, then other turns green in that access section, right? So this is the shared resource. We are allowing one side of the road to access the middle part to move on to go on the other side, right? This is a classic case. This are semaphores, this is a locking mechanism. You are locking other threads while one is accessing it. When one is done, you give chance to other thread to do it. That's literally what locking does for you. This is exactly what pessimistic locking is. That's a simplest analogy that I can give to explain this part. You can see the entire domain of computer science, entire, not even exactly, when I say entire, the entire domain of computer science is very well. You can see them in action in your real world. It's heavily inspired on how humans behave.

<!-- chunk_10 01:49:02-02:01:30 -->

**[01:49:02] Teacher:** Locking are a way to do it. A way to implement pessimistic locking is with mutex and semaphores. So you will find those terms here and there. And there are lock-free data structures like CRDTs, the most brilliant data structures, like I've read about CRDTs, lock-free implementations and not, and we'll not touch upon that as advanced data structure part, but know those talks, like something like this even exists. Right. But we'll touch upon this concurrency in very high depth when it comes to database, how. We'll see it in action. And that would solidify the entire [?understanding | asr: "understudy"]. But I'm just sprinkling it a bit so that we understand how that happens. Okay.

[01:49:39] So in our Medium example, where does this concurrency fit in? For example, two people clapped on an article at the exact same time. Now what would happen? You have to [?increment that count | asr: "enter that account"]. If it was 100, it becomes 102. It cannot be 101. Right? So how do you do that? You do it by using transactions or atomic instructions on your database. So when you are doing, updating your database, you do it in a transaction, ACID properties. That's what your databases are known for. Or if not transactions, it will give you atomic operations. You do that in order to ensure that your data is always correct. So transactions are a way to do that. Next week, we'll go in depth of database transactions, locking and all to ensure the correctness of the system while ensuring high flow. So this is just a sprinkled taste of concurrency, but because anyway, we are going in depth in third week, sixth week and seventh week. That's why I'm just briefly touching upon that. Okay.

## [01:50:38] Communication

[01:50:38] Then let's talk about communication and then I'll take the combined questions of both at the end. Let's talk about communication because this is the most neglected part per se, when it comes to system design. Like when someone is architecting a system, no one thinks about communication. I'll express REST endpoint and get it done. It is not the only way to do it. Folks, first of all, don't know what REST is, to be honest. They think HTTP endpoints are REST. If you are one of them, don't, don't, exposing HTTP endpoint does not mean it's a REST call, hundred percent. I have a video on it in case you would want to know what actual REST is, what HTTP endpoints are. HTTP is a way to implement REST. REST is a specification on how you should expose your endpoints.

[01:51:25] Exposing the endpoint, right? So REST tells you how to do it the best way, HTTP is a medium to get it done. In case you have this confusion, go on my YouTube channel, you'll find a video titled "So you know REST?" Yeah, that's the one. What's that? You'll understand what REST is. But in general we expose, we typically expose HTTP endpoints. Generic term for that is remote procedure calls, RPCs. Different from... Different RPCs is a generic name, which means that a client can invoke a procedure on a server through a specification. That's an RPC, that's a remote procedure call. HTTP web server that we all create day-to-day world, that is a way to do RPC, remote procedure call, where you are sending an HTTP request, server understands that if request is in this format, which method to call.

[01:52:25] What RPC is. So you send a request, server does the processing and sends the response. This is a standard, like most common way of doing the communication between client and the server. The server is the one who is doing the heavy lifting because it has access to databases, does computation, encryption, decryption, authentication, authorization and whatnot. Your client just says, yeah, I want to do, I want this. It's like you ordering in a restaurant. You just say, hey, I want burger. The kitchen staff goes and does the heavy lifting. That's the server part of it. That does the heavy lifting to prepare the burger and bring it to you. So you are the client demanding something. Server is the one doing the heavy lifting and sending the response back to you. But this is typically a standard, the way people almost do it.

### [01:53:13] Short polling

[01:53:13] But there are other paradigms that I want to talk about. First is short polling. Now, short polling is a very interesting, it's a very interesting way to build or to basically build a user experience. That's a better way to put it. It's a very interesting way to build a user experience. For example, let's say you want to spin up an EC2 machine. So you went to AWS console, you click click click and hit the start button. An entry on the UI that says that instance is creating, in progress, in progress, in progress, in progress. And after some time it becomes ready. Now, without even you refreshing, the interface changed from in progress to ready, right? So how did this happen? This is an example of short polling, where your client typically makes those requests again and again, periodically to the server to see if the things are done or not or what's the current status of something.

[01:54:18] So that you typically see in a long running job. For example, spinning up EC2 instances. Now here what you are saving is that your user does not have to hit refresh again and again and again and again to do it, because your user hitting refresh again and again versus you doing it on JavaScript is the exact same thing, right? So you don't want user to hit refresh again and again. Instead you are doing it for him or her in your front end code to make constant constant request on the back end to see the current status, right? This is short polling. So you are making repetitive calls to get a current status. Other places where you can see is while refreshing cricket score. So cricket matches go on for days. To see the cricket score you go to Cricbuzz or [?ESPNcricinfo | asr: "espn cricket for"] something like that. When match is live it keeps on auto refreshing and you don't have to hit the and again. This is an example of short polling.

[~01:55:09] Now, obviously simplest way to build. This is extremely simple to build. But the disadvantage is you're making far too many requests from client to server. Like let's say you have a periodicity of 10 seconds. So every 10 seconds you are making one request, which means unnecessarily you're making six requests a minute. And imagine if there are million users, concurrent users, then you're making 6 million concurrent requests per minute on server. That's far too much of HTTP overhead, and given how HTTP works in a normal way, sends a request, gets the response, terminates the connection, so three-way handshake, two-way teardown, one request, one response every time, right? The worst part is, what if the response doesn't change from the server? Like for example you spin up an EC2 instance, let's say it takes one hour to spin it up. For one hour you are making that request again and again and again and again to see the exact same response. That's too much of request that you're making to see the same redundant information, because it's taking effect after one hour, but for one hour you're constantly making requests just to see the current status. That's the problem, that's the disadvantage. The number of requests that would, that a server would need to handle would be huge in case of short polling.

### [~01:56:22] Long polling

[~01:56:22] So now what's the other way to do it? The other way to do it is long polling. So as the name suggests, now here what happens is, it's a way to implement it, implementation is your end, no one will give you out of the box, you have to write this code by the way. So for example, an example of long polling is where you spin up an EC2 instance, instead of, and you make a request, you spin up an EC2 instance, your... The server registers a task and sends the response first, but then to check the status of it, you make one call. Now this call would not return unless the state changes. For example, I made a request to spin up an EC2 instance. I got a response that task acknowledged. Then I made another request to see the status of my server is ready or not. I made a request. Now my server will not send the response until my instance is ready.

[01:57:23] Way what you are doing is you are reducing the number of HTTP requests by a huge margin, but now your server has to do this loop to check if the instance is ready or not. So, and then someone has to do that loop, right? So here the server will be doing that loop to check if the instance is ready or not. So it has its own disadvantages and advantages. The advantage being that you make very minimal requests from the client to get things done, but the disadvantage is someone has to do that loop to check if it is ready or wrong. Right. And you have to implement it. There's not a magical solution that would implement short polling or long polling for you. You have to implement it depending on what you are designing, designing an EC2 instance, something else, designing a cricket score, something else, messaging app, something else, right? Everyone has to implement it in their own specific way. There is no one global way to do it.

[01:58:16] It's just a suggestion that you can go for long polling, where your client makes fewer requests to get things done. Your server only sends the response when it has something new to share. For example, in the context of a cricket match, when I make a request to get the latest score, I would get the score only when the next ball is bowled. Otherwise, I would not get a response. That, and it's your implementation. You have to not send a response unless you have the next ball bowled. And how do you know it? You apply the infinite loop in the backend to check if the next ball is bowled. It's expensive, but it's one of the ways to implement it. Right? So that's long polling. So short polling sends a lot of requests and like you, here you can see, short polling, it immediately gets a response from the server with the latest score or the current status, even if it is in progress, but long polling waits, like makes a server wait for it to have something change in the backend and then send a response. So you make fewer requests when you're using long polling, but your server has to do a lot more heavy lifting than in case of short polling.

### [01:59:25] WebSockets

[01:59:25] Then the next one is, we talk about kind of stateless short polling and long polling. Another one is WebSockets, the most common one that is used to build messaging apps. Messaging apps, real-time communication, WebSockets do it. The concept of WebSocket is very similar to what we talked about yesterday as connection pool. In connection pool, the reason we built connection pool is there was an established connection between the server and the database and we just sent requests there and got response there. So we did not incur the overhead of re-establishing the TCP connection and terminating it again. This is exact same thing that we are doing with WebSockets. So what are WebSockets? WebSockets are bi-directional channel that is established between your client and the server. Now here the client is end user, browser, mobile device, end user, and server is a backend server.

[~02:00:17] And this WebSocket connection is a persistent TCP connection that understands the WebSocket protocol. The name of the protocol, like you have HTTP, here you have WS protocol, WebSocket protocol. HTTPS is HTTP with SSL. WSS is the secure WebSocket. So WebSocket is not running on top of HTTP. WebSocket is in parallel of HTTP. There are different specifications. So WebSockets are persistent. They are bidirectional in nature. So the way the protocol is defined is that because the connection is kept open between the client and the server, the client can send the request to the server or the server can proactively send a message the client. And it's not that, like we typically see that client sends a request, server sends a response. Here with WebSocket server can also proactively send message to the client. So for example it's brilliant to build chat applications, because all the clients are connected to this server. When a user sends a message, comes to the server and server immediately sends it to another user, because your client doesn't have to send to the server, hey, are there any new messages for me

<!-- chunk_11 02:01:30-02:14:14 -->

**[02:01:30] Teacher:** Literally pushing the message to the [?client | asr: "country"], "Hey, here's the message for you from this particular business." So this is why WebSockets are very good, because it helps you build rich product experiences. You don't have to wait for a long time for you to receive a message. When a user sends you the message, you receive it immediately, right? This is the idea. Now, it is possible because of the bi-directional channel that you have established between the two. The persistent TCP connection between the two is the reason why you are, you can build such experiences. So as you can very clearly see, because it's a persistent connection, very expensive to manage, very expensive. Next week, Sunday will go in depth of scaling WebSockets, how to use it, how to scale it, how to build real-time Slack communication, right? That, but we'll talk, we'll go in depth of scaling WebSockets, like how to do it, why to do it, why are we making those certain decisions? And like, again, like always, building the intuition.

[02:02:32] Now here, the advantage is that given that the connection is already open between it, any to and fro that happens, it happens at a lightning fast speed, because you don't have to reestablish the connection, which is why it is used for any real-time data transfer which requires low communication over it. Like sending messages, stock market ticker, brilliant example. Groww, any app that you use, or Robinhood, any app that you use, you open your stock market and you continuously see, every second you see a tick, right? Up, something going up, something going down. In today's age everything is going down. But you constantly get it, you don't have to refresh every time to see what the current price is, right? They are proactively sending data to you, so that's a good user experience, right? So it is used on those sort of things. So real-time communication, stock market, because live experiences, multiplayer games. I'll give another example: the Zoom chat that we use. Zoom chat works on top of WebSockets. The messages that you send, people who are connected on it immediately gets it. Everyone else misses out on that, those messages, right? That's a live messages, or that communication happening over a bidirectional channel that is established. It is also using [?multiplayer | asr: "multiple"] games. Now WebSockets might not be directly used, a variant of it, but you may have heard of MQTT, which is kind of WebSocket equivalent. So MQTT, WebSocket, HTTP, they are specifications. Underlying it has to be either TCP or UDP. Even it is persistent, it has to be TCP, right? This is where fundamentals come in, that you have no other option, you have no other protocol there, you have to use TCP. But now how lightweight you can make depends on either you are using WebSocket or MQTT or anything on top of it. So that are the specifications that you are using in order to build a system where client sends message in a particular format so that server understands in that particular format.

[02:04:33] Now, here the channel goes bi-directional. Now, what if it does not have to be bi-directional, where, let's say, my client does not have to send anything to the server, only sends data to the client? For example, stock market tickers. You are not requesting every time, "Arre, give me the latest data, give me latest data." Your server is proactively sending it to you, which means that you don't really have any stake in making a request to the server. Once you are connected, server can just send data to you. Which is where you don't need a persistent bi-directional channel, but a persistent unidirectional channel, where your server can send data to the client. Your client is going to have to send anything to the server. Your client only first establishes the connection, done, and then your server is proactively sending data to the client. And this is called as server-sent events. For some reason people call it server-side events. No, it's server-sent events. So these are events that server proactively sent to the client. Your client, anything, the client cannot send anything to the server except to establish the connection. Your server is proactively sending data to the client, right?

[~02:05:48] Now, where do you see it in action? Stock market ticker, classic case. You don't have anything to do there, stock market updates are coming to you. Second, very interesting one, the deployment log streaming. You might be using so many CI/CD tools, and you see how quickly deployment logs come onto your web browsers, right? They are good user experiences where you are streamed, the deployment logs are streamed to you. Like Slice, like Vercel, Netlify and whatnot. [check: "Slice" - name unclear] They leveraged this. They used to leverage it. Now they switched their model, but deployment logs in most, with rich user experience, you would see this in action, where instead of doing a refresh, you see this log being streamed to you. This is also used to build remote terminals. Remote terminals, where you have a connection between a server, a big process is, get all the STD outs from that server. Server-sent event from that server to your browser. That's where server-sent events comes into the web. Server-sent events and WebSockets, they're all browser and device based. You cannot, like, server to server, people typically don't use it. You can, but you don't use it, because they had an exceptional overhead. So this is where you can leverage server-sent events.

[02:07:10] So it's very lightweight as compared to, because WebSockets are bi-directional. So it has that communication overhead, but when it's the communication overhead, server-sent events are dead simple. Client comes, client subscribes, server sends the data, client accepts it. Everyone lives happily ever after. So it's very lightweight as compared to WebSocket, but you lack bi-directional communication, because this is just unidirectional. Your server is sending the data to the client. Theoretical. Okay, implement this. It hardly takes you 14 lines of code. MDN website, Mozilla's official documentation of web, has a working example which consists of only 21 lines of code to build your own server-sent events. Write that, every single thing is implementable. Implement WebSockets with Socket.io. Do that, because otherwise it's a theoretical jargon. Everyone can come and talk about it. When you implement, you realize how to actually use it. It's not that you have to implement it at scale. At least write hello world. At least write hello world of short polling, long polling, WebSocket, server-sent events. This way your understanding of communication layer will be really solid. Theoretically, everyone can draw boxes. My two-year-old daughter can draw boxes like this, but knowing those intricate details is what makes you a better engineer. Always, always, always focus on implementation side of things. Theoretically, everyone can do it. Okay.

[02:08:49] So now how do you add this? Now, in our communication block, in our [?Medium blog | asr: "medium block"], now you see how different layers are talking to each other. User to API server, it's an HTTP, normal HTTP request response that we see. And then this is also TCP connection. From API server to database is a persistent TCP connection. This is not WebSocket. It's a persistent normal TCP connection that is established between your backend server and backend cloud. This has nothing to do with JavaScript. Then, let's say you want to have real-time likes. For example, on a Medium blog, let's say two people are reading the same blog. When one person claps on it, a very nice animation is shown to other. This real-time likes, if you would want to build it, that will happen over WebSocket, because you don't want to refresh the page to see the likes made by other users. You want to show very nice animation. Other example of real-time interactions is on Twitter. When a famous celebrity posts something and you scroll through it, you can see that like count changing on the fly. You don't have to refresh to see the updated like count. Then basic Instagram live interaction. Your favorite celebrity goes live on Instagram, you can send hearts to that celebrity. When you send hearts to that celebrity, everyone else can see the heart that you send. That is real-time interaction, that is live interaction I was talking about, and this all happens over WebSocket, right?

[02:10:11] So depending on what you are building, how you are building, what your use case is, understand the trade-offs of every single thing. So what you should definitely know: short polling, or normal HTTP request response, assuming that you know that. Write a short polling thing, write a long polling thing, write WebSocket using Socket.io, write server-sent events. Mozilla has a brilliant documentation. Just use that. And write one server-sent events. You can see the limitation of it, the strength of it, where you can use it, where you can leverage it, and discover things. So this is all about communication.

**[02:10:49] Teacher:** Okay. Any questions on communication and skill? Sorry.

> **Student Question [02:10:55] - Student 7:** Is there any limit to the number of the sockets connections? I'm trying to relate it with the connect polling in HTTP.

**[02:11:04] Teacher (answer):** That's the same thing. The connection, the limitation is always physical limitation. They're just a Google search away from industry, because at the end it's TCP. Right. When you're connecting on TCP, it's always connected on ports. The limitation that comes to a server when you're establishing the TCP connections between the two servers, same comes when you're establishing the to the backend server.

**[02:11:26] Student 15:** Okay.

> **Student Question [02:11:27] - Student 7:** Let's say it. Just one question. So we discussed about long polling. So is there any limitation if I think in respect to blocking the connection object, because it waits for the response from the server? So it holds up the connection object. So this is a disadvantage, right?

**[02:11:46] Teacher (answer):** Correct. That's a disadvantage, that your connection is open until you get the response.

**[02:11:51] Student 7:** So it is not scalable if we use long polling.

**[02:11:54] Teacher:** It is scalable. Scale is not, because then, because then this is like having near persistent connection, because you don't get response unless there is one. It's exactly like WebSocket. You are having persistent connection here. You are having long running connection. What's the difference?

**[02:12:09] Student 7:** But I get a burst of request. Then those requests to be blocked till my connection object is not released.

**[02:12:15] Teacher:** So that's your, that's why you build it. Like you, that should add it yourself. You will not, can you, you cannot just replace short polling with long polling in every use case. Understand your use case well and see if it fits your needs. See if that's the kind of user experience you would want to build. And then you will, you will not always go for WebSocket, because they are extremely expensive. You may not always go for short polling, because you might have very high surge of requests, but in some cases long polling would work, where you know that it's not really very long. You might get response may not be in five seconds, but 10 seconds. So that's long polling for you.

**[02:12:48] Student 7:** Okay. Okay. Got it. Thank you.

**[02:12:51] Teacher:** Rahul.

> **Student Question [02:12:53] - Student 4:** So my question is about the last architecture that you showed us, about the like architecture. Can you all know that? Yeah.

**[02:13:01] Teacher (answer):** So we'll talk about this in detail next week. It's just a random box that I drew. Very random. Right.

**[02:13:07] Student 4:** I was just, yeah, I was just saying we can use server-sent events also here.

**[02:13:13] Teacher:** Like, no, because user would also like, right. A user can also. Yeah.

**[02:13:17] Student 4:** So for that, I actually thought, like, we can basically, whenever user clicks the button, it sends a HTTP request. Okay. We can make it, make on the UI side that the like is incremented on the local side. But when user clicks, the HTTP request gets sent to the API server. Server, and when it gets updated, it sends a server-sent event off to the real time. Like, you can do that.

**[02:13:48] Teacher:** You can do that. We'll discuss it next week. There, where it would make more sense. When we talk about Slack's real-time communication, we'll discuss all this architecture, all this patterns.

**[02:13:56] Student 7:** Okay. Sure.

**[02:13:58] Teacher:** Amrik.

> **Student Question [02:14:01] - Student 2:** In the long polling, we will be waiting for the server to send the response, right? Correct. [check: "Correct." may be the Teacher answering] But what if the server goes down?

**[02:14:10] Teacher (answer):** It's gone. The client has to re-send the request.

<!-- chunk_12 02:14:14-02:27:34 -->

**[02:14:14] Student 2:** Okay. There can't be anything else.

**[02:14:17] Teacher:** No, because TCP connection breaks, right? As a server went down. Okay. But acknowledge the request. Acknowledgement will be sent at that time only when the request is sent, but the response is specific. That's your use case. What you're building depends on that. Right? Let's say we are only fetching the next, if you're just fetching the live cricket score. [unclear: "bold"], you would not get a response. Right. So [unclear: "if I didn't middle"], if the, if the connection breaks, you send a request, I can get the latest commentary. You'll get the response. But the next one is gold. Okay. Right. But if you're talking about payments, that's a different problem. You're talking about e-commerce is a different problem. Right. So depending on what you are building, you can have this retriable or not. It depends on that. And so it's very use case specific. Think of a use case and then model it with long polling. So first write a hello world with long polling. Pick a use case and implement it for that. Okay. Yeah.

> **Student Question [~02:15:10] - Student 4:** Hi. So we talked about the WebSocket example in case of stock trading, that tickers. So for, for any client, those tickers will be sent only for the watch list script which a client has added. So on the server side we are sending these updates to this client. So are we, how are we trying to, you know, send them all?

**[02:15:44] Teacher (answer):** It's not that huge of a data. How many markets, how many companies are listed? 10,000? One integer for each, 10,000. 10,000 integers. One integer is [?4 bytes | asr: "4 by 2"]. 10,000 into 4, 40,000. 40 KB every second. Nothing much. Right? Okay.

**[02:15:59] Student 4:** Yeah, thanks. Right?

**[02:16:01] Teacher:** So over complication, like, I stay away from over complication. Like, I like to build simple systems. Why to do filtering on the server side? Send all the data, let it be filtered on the client's, right? Because that's not huge amount of data that you are transferring here and there.

**[02:16:18] Student 4:** You anyway have to do that, right? Yeah, thanks. Thanks everybody. Yeah, I wish.

**[02:16:26] Student 1:** Here. So you can, you can set up this [?SSE | asr: "ssc"] over a LB as well, right? So that, that way your backup servers can be scaled. Yes. Okay, okay. [check: "Yes" may be the Teacher answering] [unclear: "and above"]

> **Student Question [02:16:41] - Student 3:** So I wanted to understand, could we implement an push notifications using server [unclear: "site so send you"]

**[~02:16:48] Teacher (answer):** And post notifications is very different. Push notifications are extremely different way to talk to this. So the way it works is very different from either WebSocket or... You can mimic a push notification. I'm using very strong words. You can mimic a push notification through server-sent events. But push notifications in itself are totally different. And so the Google Cloud Messaging or Apple push notifications or APNs, they work in a very different way than WebSockets and server-sent events, because they have to have different guarantees. This needs to have different guarantees. So this is under your control. That is typically not under your control. But you can still mimic push notifications by this, where you make a call periodically to check if there are any notifications. Then you mimic a push notification. Like from app itself, you create a push notification for yourself. For example, how your basically calendar app does. That if you have a meeting, even if you don't have internet, you still get a push notification. How? The reason for that is that your app itself is generating push notification for your app, can do that. So it's mimicking the fact that you are getting a push notification, but internally, it's your app who has raised a push notification for itself, giving you a seamless user experience. So you can mimic, but you cannot implement.

**[02:18:14] Student 3:** And the guarantee issues could arise because our server-sent event could be lost in a network due to congestion or anything.

**[02:18:22] Teacher:** Even push notification can get lost. But the protocol specification of a push notification is different from server-sent events. That's the problem, because cloud messaging works on different guarantees. They have different specifications, which is optimized for, because push notifications can come to you anytime. Imagine having a persistent connection open one with GCM always. Very inefficient, right? So there has to be a more optimal way to do it. That's why they need a different protocol to do it altogether, work on very different. That's why GCM has different specifications than APNs. Hmm.

**[02:19:00] Student 3:** That makes sense. Thank you.

**[02:19:02] Teacher:** Yeah. Sandeep. By the way, just, just, just a basic, just a mention. How do I know this? I, it was like dreaded. I hated that one month when I was implementing push notifications using native. At that time I was, I'm talking back in 2015, just a fresher out of, like, I just completed, [unclear: "a joint tractor"] at that time, and we were building a push notification service at that time. Services that, like, SNS did not support good push notifications. They had very, very terrible delivery rates. OneSignal had just started. So we could not find any managed solution for push notification. What do we do? We integrated natively with GCM and APNs and build that infrastructure to do it. That's why I know how painfully hard it was to do it, and that's why companies like OneSignal, Twilio and all of this, they have abstracted it out. So now for you it's just an API call and they take care of push notifications, right? But it was fun. So in case you'd want, anyone would want to explore on that, just try integrating with GCM once natively, and you would understand what specification, how to send message, how it gets it. They have a brilliant documentation. GCM, GCM stands for Google Cloud Messaging. They have a brilliant documentation on what they are, how they do it and how to integrate. It's just one document. It's a big one, but you'll find it. So try integrating it in your native app and see how beautiful and how ugly it can get, both at the same time. Sandeep, yeah.

> **Student Question [~02:20:36] - Student 6:** So I just want to ask one question here. So basically you have WebSockets, one protocol, HTTP, under the protocol, but under the hood it's TCP connection. One is a persistent, the other one is not a persistent one.

**[~02:20:50] Teacher:** No, that is also persistent, but you explicitly break it.

**[~02:20:54] Student 6:** Yeah, you break it once you get the response.

**[~02:20:54] Teacher:** Correct, correct.

**[~02:20:54] Student 6:** So my question is, between the application and the DB, that is also persistent tp, that is also [?persistent | asr: "personal"] TCP connection. Yeah. But what is a protocol that they use there? They use some kind of WebSockets there, or...

**[~02:21:06] Teacher (answer):** No, no, no, no. No, for example, if you're connecting with MySQL, so MySQL has its own protocol as a TCP, but how does your server communicate a SQL query to the database? There has to be a way in which is okay. First byte is this, next four byte is this, next hundred byte is SQL query, next five bytes is this, right? That is a specification. So that is typically called as a dialect, MySQL dialect. So you might have heard this term. If you're using Golang, you would see you're putting SQL dialects.

**[02:21:41] Student 4:** Yes.

**[02:21:42] Teacher:** Your server uses a SQL dialect, which is compatible to the database. So MySQL has its own dialect. Postgres has its own dialect. MongoDB has its own dialect. At the end it's all TCP, but the way it sends the SQL query or any command that you are firing and your server understands it, it's very different. And it depends on the database that you're using, but under the hood, persistent TCP connection. And then the data that you're sending, 1KB, 2KB data as a SQL query, the way you structure it is the specification. With HTTP messages, in third week, we'll go through HTTP specification to understand why you should not use it at a certain place. We'll go through that. We'll understand how that works. But in a gist, the way you are sending a SQL command to the server to understand that dialect, that's what this specific, like HTTP is a format, WebSocket is also format, server-sent event has its own format, right? Now those specifications are the one that, that tells you how to bundle your message or your event and send it across, so that both the devices can understand it.

**[~02:22:56] Student 6:** Yeah. So basically, even though it's a persistent TCP connection between the app server and the DB, but the, the communication specification is very, it depends on the DB with which you're connecting to.

**[~02:23:06] Teacher:** That, which is correct. So just say, for example, Redis has RESP, which is its own specification. So anyone who wants to talk to Redis would have to send in messages in that specific format, right? MySQL has its own, Postgres has its own, WebSocket has its own, HTTP has its own.

**[~02:23:22] Student 6:** Okay, cool. Thank you very much, sir.

## [~02:23:22] Wrap-up and plan for next week *(admin)*

**[~02:23:22] Teacher:** *(admin)* Great. Any other question, anyone, across the session? By the way, this is all what I wanted to cover, all the six components. I'll share the pre-reads today for the next week. And by the way, before I take other questions, folks who would want to drop off, next week is all about databases. Saturday, we'll take a look at relational databases. Now we'll have brainstorming. Now we'll dive deep into implementation specifics. Saturday will be very interesting. I'll show you an actual demonstration of SQL transactions, blocking, concurrency, throughput, all of that, like, live here. Like, I literally run the code and show it to you and get the max out of our database. On Sunday, we will go through NoSQL databases, understand different types of databases for first one hour. And then one and a half hour to two hours, we'll have an extremely detailed discussion around building Slack's real-time communication. While we do that, we will not only build Slack's real-time communication, but also three different kinds of messaging apps along those lines. So you will see how the underlying architecture remains the same, while all we change is the guarantees that our system provides. So we'll see that, we'll see those in action there. So that's the plan for next week, Saturday and Sunday.

[02:24:52] So I'll upload the video. I'll send an email, shoot an email. Please don't use Hotmail. Hotmail is crap. For somehow it just masks the login emails as spam. Everything else goes through, for some reason. And they have shipped something recently because of which it is happening. If you have Gmail address, shoot me an email. I'll update your email to Gmail and remove that Hotmail from it. Earlier Gmail used to do it, but now Gmail is sorted. Hotmail is utter crap. So pick your battles. If you try to find, file a complaint with them, why it is not working, it should work. If it is not working, it's Hotmail's issue. I cannot, I'm not filtering anything out from my packet, right? So talk around those lines with the Hotmail team, raise a concern with it, right? Okay. So that's all I'm going to cover. Folks who want to drop a filter, drop off, I'll take some questions now.

## [02:25:43] Q&A

> **Student Question [02:25:43] - Student 1:** Yeah, do you think, go on. [check: "go on" may be the Teacher] So mostly the communication which we talked about yesterday, today, so basically we are focusing on the TCP only. So I would really like to have a discussion on the UDP side, and...

**[~02:25:58] Teacher (answer):** Too early, too early. Wait for week four, wait for week four. After that you will have, you may already have the answer for that. But wait, wait till week four, right? It will be too early. A lot of people will get scared. That's why I'm not going deep into it. I've used UDP twice, so I know where it thrives, where it does not. So I'll, I'll, I'll give you an idea in case you don't have, ask this question. It is that I'm avoiding to create that confusion. People would get overwhelmed by that.

> **Student Question [02:26:27] - Student 1:** And also, specifically, I'm intrigued about learning about the video streaming. Like how the video

**[02:26:36] Teacher (answer):** streams... Sixth week. I have it covered. It's there in the category. I have it covered. Don't worry about it. It's very easy. It's all CDN. It's all CDN. You don't have to worry about anything at all. I'll talk about how that happens. You pointers will not show you how to actually do it, but we'll give you pointers, which you can look up to and implement it on. It's not that difficult in our days. So yeah.

> **Student Question [02:27:03] - Student 6:** Yeah. So you talked about queue versus stream, right? Like typically wait SNS fall into these two, whether it falls.

**[02:27:11] Teacher (answer):** SNS is totally different.

**[02:27:13] Student 6:** Okay.

**[02:27:13] Teacher:** SNS is totally, SNS is neither a queue nor a stream. SQS is a queue. Kinesis is a stream, right? SNS is just a notification thing. You send a data, all ever who is subscribed to it, it just broadcast it to them. Simple. That's what SNS is all about.

**[02:27:29] Student 14:** So can SNS has no persistence.

<!-- chunk_13 02:27:34-02:40:10 -->

> **Student Question [02:27:34] - Student 6:** So can SNS and SQS be combined and be considered?

**[02:27:38] Teacher (answer):** You can, you can, you can mimic Kafka with SNS plus SQS.

**[02:27:41] Student 6:** Okay.

**[02:27:42] Teacher:** But there is a limitation for that. When you implement, you would realize that historical, because you don't have historical messages in Kafka, you can have historical messages. So you can go through old messages also with SNS and SQS. You cannot have.

**[02:27:55] Student 6:** Okay. Okay. Got it.

> **Student Question [02:27:58] - Student 6:** And I have one question related to caching as well. So one of the places where you can implement caching is at load balancer, API gateway. So typically you'll have to re invalidate the cache as well. So how do you invalidate that layer? So if you don't, I mean, yeah, I guess.

**[02:28:21] Teacher (answer):** Load balancer does not give you any API [unclear: "code O8 FII"], right? So the only way to invalidate it is time-based. That's the only thing. So when you're caching something at load balancer, you need to be aware that for a certain amount of time, it will be cached. So you cannot typically invalidate it because load balancer does not expose those endpoints to the market. You can request it to invalidate. So you can adjust the time at max.

**[02:28:44] Student 7:** Okay, got it. That's it. Sure.

**[02:28:48] Student 1:** Yes, but actually, so actually I wanted to touch upon the same thing, which I don't know the last name. But with SNS and SQS, we can replicate the behavior where like multiple consumers can actually have the same messages. And so it's, it's from my learning, like, you know, we went ahead with SQS based architecture. You know, since there's no ordering and no sharding basically, you know, for a given object in RDB, we were receiving like, you know, multiple messages in the SQS and multiple consumers were picking it at the same time. And even with the retries and everything, you know, we used to end up like, you know, failing. Then we had to like, you know, re-architect everything and move to Kinesis or like, you know, so like from SQS. Yeah. Yeah.

[02:29:45] So that's one thing like, you know, ordering is, and sharding is, is really one important thing, when to choose like SQS and Kinesis, because, with sharding, we, we, you actually get all the messages for a given, unique ID in, in a single, and a single consumer is actually consuming all those messages. So you actually can actually control, you know, the behavior, how you want to, persist it, back in your database and, and do other things.

**[02:30:14] Teacher:** performance, given that you know that all the requests of a particular thing will come to one place, you can cache and load and whatnot, you can pass and write and whatnot. So yeah, you get all sorts of performance improvements by that.

**[02:30:26] Student 1:** Yeah. So I, so I want to just touch base on that. Yeah. No, no. Excellent.

**[02:30:32] Teacher:** Thanks. Thanks for adding that.

**[02:30:34] Student 1:** And, even on the caching side, I might, I'm not sure like, no, whether it, you know, comes. So my team owns a config platform and generally configs are really small in nature for most of the applications, but latency is a really important thing for our customers. Even introducing more than three milliseconds of latency is a no-go. So what we do is, so from our control plane, people can do any changes to their configurations. We take the snapshot and push it to S3. application boot up, you know, we load it from S3 and into internal in-memory cache. And we also use what we talked about, like, you know, using the disk. So we also persisted inside. So many levels, right?

[02:31:30] For mobile guys, like, you know, what we do is like, you know, rather than S3, we push it to CDN and whenever a call comes like you know first call goes to the in-memory part if it is not present loads it from disk if it's not there then like you know in the back and like go go to CDN and fetch it so like but just want to trade like you know

**[~02:31:47] Teacher:** No, no, that's brilliant. You are having at so many levels, but one of the reasons why you are able to do so is because there is not much cache invalidation required.

**[~02:31:59] Student 1:** Yes, and inconsistency is like is not a problem for us. It's not a problem.

**[02:32:07] Teacher:** So brilliant. You used all the layers there and you know, that's how we should be thinking. Like it is not always a single centralized remote cache that you should rely on. Anything that floats your boat, do that. Anything that helps you keep your infrastructure cheap or rather less expensive to do that.

**[02:32:25] Student 1:** And just want to touch base on one more thing as in like, you know, we since like falling back is an anti-pattern because most of the times you never fall back and you never test that part of your code. So we try and avoid that as well that, you know, it's not, it's not like, you know, something is falling back. It's, it's part of the make making that fallback a part of the actual process rather than like they're just falling back. Okay. Because it can happen when, you know, once it triggered, like, you know, we never tested that part or it, it was some part of the code, like, you know, which was never updated because it was always a fallback thing.

**[02:33:03] Teacher:** So then is it that you send a fraction of requests as a fallback every day?

**[02:33:09] Student 1:** We don't, put fallback at all.

**[02:33:13] Teacher:** As in, it's, but then it's kind of fallback where you don't have in memory. You go to this, you don't have a disk, you go to CDN and fetch it. Right.

**[02:33:20] Student 1:** So it's more like, you know, first, we always go to disk, for always go to in memory. Okay. And for the first time, like nothing will be there. So it will load from disk. And at the same time, we will, in the background thread, like, you know, we'll fire a call to CDN and, you know, gets the latest thing from CDN. And when we are building the CDN, so first place is like, you know, where, for example, let's say you did some change we commit those changes to the git repository and we also at the same time we publish those changes to CDN, we ensure that like you know both both of them are done.

**[02:34:07] Teacher:** But then is it possible in your case that memory is flushed and you don't have [unclear: "the return memory"]?

**[02:34:17] Student 1:** Yes, like let's say if if it is flushed then you know it will fall back to disk. So no, so the thing is, for the first time like this fallback, let's say when the application is, when the application started, there's nothing in memory so it will it will get it from disk so it will this this this this this path is always covered and then at the same time we call to CDN and get it from there as well. So if it's latest, like, one from, from what you have got it.

**[02:34:55] Teacher:** It, it, it, it basically automatically gets updated. Yes. Whenever I did something you have got it. Pretty interesting.

**[02:35:03] Teacher:** Good. Anything else you don't want to add?

**[~02:35:06] Student 1:** No, no, no. And it was a great session. Sorry, like actually I am, you know, joining from Luxembourg. So it's like 4.

**[02:35:13] Teacher:** Oh, oh, oh. Have a, have a, like have a, have a good sleep. It's about 30 AM. Great. Thanks. Thanks so much. Amrik.

### [02:35:25] Q&A - caching through an intermediate service

> **Student Question [02:35:25] - Student 2:** Yeah. I just wanted to discuss one thing, actually it's regarding the caching. Okay. So while I joined a company, okay. It means they were planning to move from the calling directly to the API server to something else as a common library. So on the front end, what we did is we implemented a different application. Okay. So it was storing the data and instead of calling directly to the API server, we were calling that application first, that service first. And then from there we were getting the data. So will this be also means this is also a part of caching or what?

**[02:36:00] Teacher (answer):** You're saving an expensive thing, right? And then whatever you are saving, if you are having a copy of data at an end and you're saving something, let's cache it. You're basically kind of a, because that's what you do, right. You save an expensive computation, you spare, save an expensive IO.

**[02:36:18] Student 2:** Okay. And, that service was responsible for one more thing actually means, for, it was avoiding the multiple API calls. For example, if we have, say four or five machines were there. Okay. For that, we, were calling the data. So from the front end, we were just passing one query to that service, which was having all the parameter indexes and that service was making instead of the front end directly meeting

**[~02:36:41] Teacher:** but then were you caching something on that service?

**[~02:36:47] Student 2:** That was responsible for two things actually, for the that query for processing also and for that caching also.

**[~02:36:54] Teacher:** Got it. So then your front end has one point of contact and it can internally for and it can internally fan it out to multiple services to get it. It's basically kind of like an [?API gateway | asr: "if I get it"]. Right. Oh, yeah.

**[02:37:11] Teacher:** Yes. Shitej [check: name spelling].

### [02:37:13] Q&A - read replicas and master load

> **Student Question [02:37:13] - Student 7:** Yeah. So I have a question regarding read replica. So we discussed that replica is pulling the changes from master. So my question is, does adding more read replicas, assume that my service is a read heavy service. So does adding more replicas affect the performance of the master node?

**[02:37:30] Teacher (answer):** It does, but not that much.

**[02:37:33] Student 7:** Okay.

**[02:37:36] Teacher:** still absorbing some capacity of master while it is trying to fetch it. Right. So you will not have huge number of read replicas. Five, six, seven is still five is fine. But beyond that, you typically don't go because it eats up into servers like masters, CPU, network and memory capacity while it is trying to fetch the data because every database gives you different ways to fetch the data. Some database gives you direct SSH option to go and read the entire bin log file and then do processing on your end. If your database do that, great. If not, then it gives you SQL or your protocol specific way to fetch it. That would require servers, CPU, memory and network bandwidth, all of them. So you typically don't add huge number of it.

[02:38:24] You can create now as a solution, but let's say you need 15. Your database is only allowing five. How do you get it to 15? So you typically create a [?hierarchical structure | asr: "hierarchy culture"]. So a replica can become a replica of other replica.

**[02:38:36] Student 9:** Okay. Okay.

**[02:38:38] Teacher:** So let's say you have five at the top layer and then everyone gets three, three, three, three, three, or other two, two, two. So that's why you, you basically complete your 15 replicas.

> **Student Question [02:38:49] - Student 7:** And let's suppose they are affecting the master node that then it might be an indication to move to sharding.

**[02:38:55] Teacher (answer):** Correct.
Correct.
Correct.

**[02:38:58] Student 7:** Thank you.

### [02:39:01] Q&A - CDN (deferred)

**[02:39:01] Teacher?:** Rahul.

> **Student Question [02:39:02] - Student 4:** So my question is just about confirming things about CDN. So basically, if you remember the first point in that, at the start of the lecture, like we, we had some API servers, which are having some local caching. Okay. So I, from, so I tried to think about the system of CDN and how it is working. Basically it's just a proxy. Okay.

**[02:39:28] Teacher (answer):** CDN will have a discussion. early to discuss CDN, I have huge detail of CDN covered in third week. Right. So I would recommend let's, let's, let's defer the discussion for that time because I'm anyway covering that. So a bunch of questions will be answered there and everyone will be on the same page, right? If I cover partially today and then something later, so it will create a mess and, and like not everyone will absorb that. Right. That's right. So a CDN specific, let's move to the end. Like in case you're diving into deeper details of CDN.

**[02:40:02] Student 4:** Sure. Not, not in the deep things. It's just about the caching thing.

<!-- chunk_14 02:40:10-02:52:43 -->

**[02:40:10] Teacher:** So what, what, what exactly are you caching on CDN?

**[02:40:13] Student 4:** So basically like, if you remember the first, first point in from the, from the start of the lecture, it is about like caching, caching things in the local, local server or local instance on the server. It can be whatever Docker container. Okay. So, my question is basically the CDN do this also like, they, like, they must have a lot of like kind of like API servers, which are like, lot of API servers and like, so to make this system efficient, so do they like a store, the data store, the caching data in their, disk also.

**[02:40:58] Teacher:** So in RAM, imagine storing images in RAM. Would you store images in RAM?

**[02:41:01] Student 4:** No, no, like, not like a part of data, like not exactly the more.

**[02:41:07] Teacher:** Everything is on [unclear: "this procedure"]. Everything is on [?disk, of course | asr: "this course"].

**[02:41:10] Student 4:** Okay. So I thought like it was a combination of RAM and disk actually,

**[02:41:14] Teacher:** but why would you want to store it on RAM and CDN? Because most things that people are caching on CDN are what? Images, videos, gigantic responses. Why small responses? What would you gain by storing something in RAM, but do user data needs to be stored in RAM. It's their decision. Right. But I don't really see a need to store anything in RAM because this access is anyway, fast CDNs are closer to user. Would anyway get all the benefits out of it.

**[02:41:42] Student 4:** So what I was thinking was it was kind of from, from what I thought was basically first cache as a RAM, then it's the disk and then there is central storage. Yeah.

**[02:41:54] Teacher:** They can implement. I don't know. I've never worked for that for mine. I've never worked for cloud. I don't know if they cache something on RAM or not. They can, if they want to, but I don't see a need to do that. Given that disk access is fast, you have SSDs that would give you relatively similar performance in RAM. They might cache some configurations and not, but not the user data. User data is typically gigantic.

**[02:42:14] Student 15:** Okay. That's sure.

**[02:42:18] Teacher:** Sampai [check: name spelling].

### [02:42:22] Q&A - scaling Kafka consumers with SQS

> **Student Question [02:42:22] - Student 1:** Hey, here. So my question is mostly related to the Kafka part where you discussed the heterogeneous workers and homogeneous workers. So for the homogeneous workers, it's okay to use the queuing facilities. But for the heterogeneous workers, we need to use some sort of solutions like Kafka. But with Kafka, the problem is the workers cannot scale. If you want to scale, you need to do add more partitions. want to add more partitions you need to do rebalancing all all of those stuff, correct? Now let's say I want to leverage Kafka based solution for some heterogeneous workers but where in some services the workers are scaling at times, then can we fit that solution like this Kafka based solution over here?

**[~02:43:15] Teacher (answer):** Yeah, so you can have Kafka consumers, let's say you have three partitions beyond that hypothetically. Yes. But then you need hundreds of consumers. Now what do you do? You have three consumers for your Kafka. Let it push into a message queue like SQS and have 100 workers there. So the job of this would be just to read the message and put it into SQS and there are 100 workers who are doing the heavy lifting for you. So this way, without rebalancing or without repartitioning your Kafka, you can get higher throughput.

> **Student Question [02:43:54] - Student 1:** But okay, so that means we are adding one extra component that needs to be managed to to to get the scaling functionality as well as straight. Okay, okay. And there is no best other solution other than using these two systems together. Okay. And it's very common for notification architecture?

**[02:44:16] Teacher (answer):** Very common. All notification architecture, this is extremely common. You have a Kafka, you have limitation of Kafka, which is parallelism equal to number of partitions, but you need higher degree of fan-out. So sending message takes more time, consuming takes less. So you just consume from Kafka, put it into SQS and then have workers, hundreds of workers that is throwing it out in the word. It's a very common thing.

**[~02:44:38] Student 1:** Okay. There is one more functionality in Kafka, which I haven't read it through. I was working around this space and I found, I got to learn that term. It's something called broadcasting feature in Kafka. I haven't read in depth about it, but what I got to know is that Kafka, so earlier we used to think that Kafka was a dumb messaging system where Kafka don't do anything. Like it doesn't fetch from the producer. It doesn't send to the consumer. Producer fetches it, fetches the message and a producer sends the message and consumers fetches the messages. So Kafka is a dumb system. But with this broadcasting feature, what Kafka does is it can send, broadcast the message to all the consumer groups that is consuming from a particular topic. I got to learn something from that, not in depth,

**[02:45:34] Teacher:** So obviously those engineers are also working. I'm not sure how, how, like what advantages does it provide? And if it is real time, [?pub-sub | asr: "pops up"] is what they're trying to add. Not sure around that, but I'll, I'll also take a look. I've just made a note of it. Okay.

**[02:45:52] Student 1:** Great. Great. But yeah, for the timing, I got the answer. Yeah. Thank you. Thanks.

**[02:45:59] Teacher:** Okay. Yeah. Rajiv.

### [02:46:02] Q&A - WebSockets behind a load balancer

> **Student Question [02:46:02] - Student 9:** So, if it's regarding WebSocket connections, I actually not clear about this, that the client always knows, so client has to have a connection with the server, right? So if it goes through LB now, is it to that a single instance of client would always know public IP of LB, but LB is sticky. That means it will always forward the connection to a single server or it can go to any.

**[02:46:30] Teacher (answer):** that if you need WebSockets, LB has to be sticky. Okay. So load balancers that supports WSS, which basically WebSocket specification, it has to be sticky and it would forward to the exact same server

**[~02:46:47] Teacher?:** and if LB goes down then reconnection, reestablishing the connection, the client would establish the connection.

> **Student Question [~02:46:53] - Student 9:** Okay, okay, okay. So and one more question regarding Kafka. So Kafka, it's as we said that the removal policy is a policy where we decide how much long data should keep in, how does Kafka manages this data, so big data, right?

**[~02:47:08] Teacher (answer):** We'll talk about that sixth week. We have it covered. We'll talk about that.

**[~02:47:14] Student 9:** So they say that Kafka is like a DB only, it has a

**[02:47:19] Teacher:** We'll talk about it. Six weeks, we have a very, like we'll talk about some other thing, but I'll specify how basically Kafka leverages that. We'll go through that.

**[02:47:28] Student 15:** Okay. Thank you. Yeah.

**[02:47:32] Teacher:** Yeah. Yeah.

### [02:47:35] Netflix caching shows at ISPs

**[02:47:35] Student 2:** I would like to add one more point on the, on the caching examples. That is the, how the Netflix does its video streaming. So we can store the video files on CDN. That's fine. But to get more performance on it, we can also do one more optimization. Like suppose some show is very popular and we can store that show on the PoP locations that is called the internet service providers, which are more near to the users and it will get the streaming very faster and it will also save cost for the CDNs and like that.

**[02:48:14] Teacher:** That's a brilliant example. You then, so then you also must be knowing about how, how ISPs sued Netflix because of Squid Games. Yeah. You, you, you read that, right? So, so for folks who don't know, a brilliant example that has just been shared is how you can cache the popular shows of Netflix data on ISPs. If you use ACT internet, ACT has massive data centers, not massive, but still they have basically pretty decent sized data centers. You cache it at local ISP site. This way, when you're accessing it, the data is right there and you fetch it from there. You don't even have to go to CDN to read the data. And this way you can get like ultra low latency to your end users for such things.

[02:49:08] Now, why is it possible? Because data is not changing. worrying about inconsistency here. Show is live, show is live, done and dusted, right? So you can literally ship it to local ISPs, ask them to cache it. This is where Netflix works with ISPs to service. And here, if you look for Cloudflare engineering blogs, there they talk about this, how Cloudflare accelerates using, like how Cloudflare accelerates the performance by working with ISPs to drive this experience. So Cloudflare also has a blog on this, just a Google search. Right.

[02:49:50] But Netflix, these are next level optimizations. People that CDN is the ultimate. Now Netflix was mostly the pioneer. I'm not sure if they were, but Netflix was mostly the pioneer in this on leveraging ISPs to cache the data. Right. But thanks so much for adding that. It's a brilliant point. Yeah.

### [02:50:12] Q&A - compression, security, database clustering

> **Student Question [02:50:12] - Student 7:** A couple of questions. Are you going to cover like a compression as a kind of strategy for various use cases? That's one.

**[02:50:21] Teacher (answer):** Compression is basic.

**[02:50:22] Student 7:** Okay.

**[02:50:23] Teacher:** You have three or four algorithms. Pick one that suits you the best. None. Basically nothing much in that.

> **Student Question [02:50:30] - Student 7:** Okay. And security as a topic.

**[02:50:35] Teacher (answer):** Not really. I mean, that does not really fall under like high level architecture. So I typically stray away. cover are there on my website, like those were the 28, 29 topics, what were the exact ones that I'll cover.

> **Student Question [~02:50:49] - Student 7:** But isn't that something that a system designer needs to worry about in real world?

**[~02:50:53] Teacher (answer):** Yes, and I do know those part, but people would not resonate if I talk about, if I start talking about security, people would run away. Like I, I just have to, you know, ensure that the people who are enrolled for a certain thing, they get the value most, like they get the most value out of it, but it is a bit security, then there are, then it opens up a whole new Pandora's box, right? You can, I can talk about infrastructure security. I can talk about how to go into best practices cloud.

**[02:51:23] Student 7:** No, no, no, I'm talking about only infrastructure, forget infrastructure, but just, application security, right? Because it's, it's such an example, example rate limiters, DDoS, SQL injections.

**[02:51:36] Teacher:** What?

**[02:51:38] Student 7:** Yeah.

**[02:51:38] Teacher:** I mean, all of this is just a Google search away, right? Rate limiters are tons of videos available. else is just like they're already on the internet. Right. There's nothing much to add there because there's a pretty standard. Isn't it right? Handling DDoS equal to rate limiter. You add rate limit on a different layer. You get, you get the answer. Right. Like, like you know how to solve that problem. When you talk about SQL injection, there are standard ways to do it. You talk about CVEs. You exactly know how to patch it. Now what else? because these are pretty things which is available across the internet. There is nothing much specific to add.

> **Student Question [02:52:20] - Student 7:** Okay. Final thing, the clustering of databases, that is part of you probably are saying vertical scaling, right?

**[02:52:34] Teacher (answer):** No, [?horizontal scaling | asr: "how is it all scaling"]? Clustering, now you can read out a cluster that are multiple machines. So [?horizontal scaling | asr: "how is it all scaling"]?

<!-- chunk_15 02:52:43-03:05:22 -->

**[02:52:43] Teacher:** You create a database cluster, cluster is equal to multiple machines.

**[02:52:47] Student 7:** So it didn't cover it in the examples. So it was, so you said vertical one and the other is the read replica and sharding

**[02:52:56] Teacher:** is the sharding cluster cluster. How does it all scale multiple machines?

> **Student Question [02:53:01] - Student 7:** I mean, I don't know whether, you know, when you create a cluster, which is provided by the database vendor, for example, is it based on sharding or not?

**[02:53:11] Teacher (answer):** It is based on sharding. It is based on sharding. [check: possible ASR duplicate]

**[02:53:12] Student 7:** It appears as one database, right?

**[02:53:15] Teacher:** Yeah. So in that sense, we classic example sharded database internally. For us, it is one database internally, it is split across multiple storage nodes cluster.

**[02:53:27] Student 7:** Correct. So then we don't need to handle the sharding part, right?

**[02:53:32] Teacher (answer):** Ourselves depends on the database vendor. You are talking about vendors. They, if they are charging money for you, they would be handling it for you. If you are using open-source technologies which does not provide native sharding, you have to implement it.

**[02:53:44] Student 7:** Got it. Okay. Understood. Thanks.

**[02:53:49] Teacher:** Yes, Chandan.

**[02:53:56] Student 16?:** Chandan, you there?

**[02:54:00] Teacher:** I'll circle back. Audio problem. Surya.

> **Student Question [02:54:04] - Student 6:** Yeah. Hi. So I have a question related to again Kafka, Kinesis. Okay. You mentioned that usually partitions in Kafka is used to increase the parallelism, right? Like increase the [?processing | asr: "crossing"] rate. You mentioned also like Kinesis shards is also similar, right?

**[02:54:25] Teacher (answer):** Yeah, exactly. Same as Kafka partitions.

**[02:54:28] Student 6:** Yeah. Okay. So and with respect to the consumers, right? Like would the similar concepts apply? One consumer subscribing to one partition and will [unclear: "never said"] one subscriber subscribing to one partition

**[~02:54:41] Teacher (answer):** Consumer just comes and reads it. Kafka manages it for you, that from which consumer or from which partition it would read it, okay? That's the responsibility of Kafka. It's a, it's very easy integration for consumer to talk to Kafka and read the message, okay?

**[~02:54:56] Student 6:** But eventually, like scaling up the partitions will increase the parallelism, right? Like

**[~02:55:03] Teacher:** Correct, correct, yes.

**[02:55:05] Student 6:** Does this similar concept, like just the way you mentioned it, Kafka manages like which partition to read and supplies. Kinesis also does the same, like exactly same thing?

**[02:55:16] Teacher (answer):** Copy paste same.

**[02:55:19] Student 12:** Okay.

**[02:55:20] Teacher:** Okay. Because in Kinesis consumer, when you start, you don't specify which shard to read from. Yep. Right. So internally does that management for you.

**[02:55:32] Student 6:** Okay. And just a continuation like, but it doesn't have the limitation that you explained, right? Like having more number of consumers, right? You mentioned one limitation, limitation with three, if you have

**[02:55:46] Teacher:** three partitions and you have five consumers, two consumers will do nothing.

**[02:55:50] Student 6:** Okay.

**[02:55:50] Teacher:** Same thing goes for Kinesis. Same thing goes for Kafka. See the logic, right? How would Kafka keep track of [unclear: "which consumer rental, which point of two"] are reading from the same one? Not possible. Right. That's a fundamental limitation, right? Because think of implementation. If you think of the implementation, you realize it is not possible for Kafka to maintain it efficiently, that which consumer, if two consumers are reading from the same partition, Kafka, for it to maintain which consumer, which message was read from which partition and ensuring ordering, not possible. They cannot implement it. Right.

**[02:56:24] Student 6:** Okay. Okay. [?Got it | asr: "Not it"]. [?Got it | asr: "Not it"]. Good.

**[02:56:28] Teacher:** Yeah.

> **Student Question [02:56:31] - Student 8:** Yeah. Question with respect to the streaming. I heard the concept today, so bear with my naive question. I did not understand the part of a commit. Like when we say a commit, is it a commit to the Kafka service or is it a commit saying we did it and we store with the database itself? No, no, it's not Kafka commit. [check: "No, no, it's not Kafka commit" may be the Teacher]

**[02:56:54] Teacher (answer):** Kafka will keep track that this consumer read till this point. It's a commit operation. So Kafka will keep track that this consumer has read till this point. So next time when the consumer wants to read, it would start from that checkpoint.

**[02:57:13] Student 8:** It makes sense. So follow up question on the example, right? Like for example, when we started, like there are two databases we wanted to commit one, a DB and other one, the Elasticsearch, and right. And then we said that streaming is a solution that can replace distributed transaction.

**[02:57:36] Teacher (answer):** Not really. Not really. You cannot replace distributed transaction. You can implement it with distributed transaction. But you now have. It's not that it is replacing distributed transaction. In some cases you have to have distributed transaction. But here what we are doing is, we have two independent processes who are doing two very independent things on this exact same message. So that's why they can contribute their own sweet [?pace | asr: "face"].

**[02:58:01] Student 8:** Yeah. So yeah, like my, my general question was, like in general, if you are doing two writes on two different databases, like any, any, right, any two persistent services, there's no option other than doing a distributed, like for a consistent, there is no option, right?

**[02:58:15] Teacher (answer):** For strong consistency. There is no option, but to distribute transactions. Thanks. Yeah. Simra.

**[02:58:25] Student 2:** Yeah. Hi, Arpit.

> **Student Question [02:58:28] - Student 2:** Message queue, so here like we were talking that consumer consumes the message and once that is done, yeah, he updates that, that this message is done. So do we have any time, and suppose that the consumer goes down and that message was never updated? We spoke about that with visibility

**[02:58:48] Teacher (answer):** timeout, right? So depending on the queue that you are using, it would have, it should have some way to do it. If I talk about SQS, SQS gives you visibility timeout, which means that if, let's say, your consumer consumed a message, but before deleting it, your consumer crashed. Then after visibility timeout, let's say 10 seconds or 10 minutes, for example, whatever you configure, the message would reappear at the head of the queue and would be re-consumed by some other consumer or [unclear: "busy"], whichever are available at that time. So that's a concept of visibility timeout.

**[02:59:21] Student 9:** Okay. Got it.

**[02:59:23] Teacher:** So read visibility timeout in SQS, but you get, and something similar exists in [?RabbitMQ | asr: "rabbit time"]. Also I've used SQS very widely, same thing exists in [?Google Pub/Sub | asr: "Google pubs"], everything comes up. Every feature is copy paste everywhere. You'll find equivalent of one another. Right. But the key term is visibility timeout in SQS. You start from that, pick your favorite technology and you'll find an equivalence of that.

**[02:59:45] Student 18:** Sure. Sure.

**[02:59:46] Teacher:** Yeah. Great.

**[02:59:49] Teacher:** Gaurav.

> **Student Question [02:59:50] - Student?:** Hi, Arpit. So how is browser level caching implemented?

**[02:59:54] Teacher (answer):** Local storage, browser has a limited local storage that you can leverage. So you can, like, you cannot store huge amount of data, but still pretty decent amount of data on the browser side of things. So browser caches images also, so that it doesn't have to make an expensive network call to fetch the images. So once the image is loaded, the next load is very fast. It's not because of CDN, but because the browser cached the assets. So you can check the network tab of the browser of a web page that you would want to open, but bunch of images are there, and you can see that it says that content already present or something like that when it tries to get it. So it just loads it from the cache without making a network [?call | asr: "file"]. So what you can use is, you can use local storage SDK to do it. So local storage HTML5, or basically, if I may put it, quote unquote modern browsers, they give you local storage as a object which you can use to set item, get item, cache images and what not. You can use it for a bunch of stuff. So in the network tab you go to storage, so in Chrome or Firefox anywhere, you go to storage, on left side you'll find local storage, click on that, for any website you'll see what they are caching.

> **Student Question [~03:01:07] - Student 1:** Got it, thanks. And also for a message queue, we do not have any partitions, right? In

**[03:01:16] Teacher (answer):** message queue internally, we don't know if they are doing partition or not, right? So I cannot comment that, but naively from outside, you don't see those internally. SQS might be partitioning it. We don't know. Right. And there's no explicit nuance of it.

**[03:01:31] Student 1:** Got it. And does the worker read a message, then delete it and work on it, or.

**[03:01:36] Teacher (answer):** It's your implementation. SQS will give you APIs to do it. Have you do it. It's up to you. You delete first, you delete later, up to you, but it makes sense to delete after you have done processing. Yep. Right. Otherwise there's a loss of message. Thanks. Rajiv.

> **Student Question [03:01:58] - Student 9:** Hi, Arpit. So Arpit, I just, this idea came to my mind. I know you will discuss DB for the weeks, but really a question. Do you have any formula for sharding? No. How do you approach sharding? I mean, you just see data. How, what is the constraint, and then analyze it and then see, okay, what needs to be done?

**[03:02:18] Teacher (answer):** Yes. It's very subjective. Golden formula, there is no magic number to do that. Right. There is no magic formula to do it. It's always analyzing, like going through the data, seeing the access pattern, then taking a call. Right. That's all it depends. Pankaj.

> **Student Question [03:02:42] - Student 10:** Yeah. Hi. So, my question was, around these WebSockets and all server side events.
>
> [03:02:48] So like when we are maintaining a TCP connection open, right? So if a server has a lot of, you know, connections with the connection open with different clients and it's crashes because of some reason. So like when it spins up a new instance again, like many of them will be connecting at the same time, right? So is there a layer between server and the client by which we are maintaining these connections, or like our server is directly connected?

**[03:03:16] Teacher (answer):** Once the connection is broken between client and the server, client would reestablish the connection to whichever server is available. I will connect to only this specific server. Whatever is available, the client will connect to that.

**[03:03:30] Student 10:** Okay. So in our case, it's basically like, so if I want to make thousand connections at the same time, it will not increase the load on the server then?

**[03:03:40] Teacher (answer):** It will, but at that time, the server is not doing anything, right? Is server doing anything? Up thousand connections. It does not take much time. How's the connection establishing [unclear: "in my shot"] is nothing, nothing for the server.

**[~03:03:52] Student 10:** Okay. And the second point was, not sure, I joined a bit late, but like we have now some frameworks like React Query also, which caches the API response as well on the client side. So if you are making a server API call and if the response is not changing, then the React Query will automatically give you the... So that is also one use case of that.

**[03:04:19] Teacher (answer):** It might be, it might be caching it in your native JavaScript runtime memory of that, or maybe local storage, wherever it is choosing to cache, but that's an excellent example. See, everywhere you see caching, like no one wants to do repetitive computation. That's why dynamic programming, right? You do memoization, ensuring that you don't redo the same things again in it. Adit.

> **Student Question [03:04:44] - Student 2:** Hey, hi, one basic question for in long polling and server side, server sent events. In both of the cases, TCP connection would be open, right?

**[03:04:56] Teacher (answer):** Yes.

> **Student Question [03:04:56] - Student 2:** So in case of SSE, when is the TCP connection closed?

**[03:05:02] Teacher (answer):** When your client wants to terminate it, it's on the side of the client, either the server goes down or the client chooses to terminate the connection, that I'm done consuming. Okay.

[03:05:13] Okay. Okay. Thank you. Yeah. Thank you. Sure. Great. Any other question? Anyone?

<!-- chunk_16 03:05:22-03:15:10 -->

> **Student Question [03:05:22] - Student 1:** Yeah. We check. So how do you test those [?SSE | asr: "SSC"] type of connections?

**[03:05:30] Teacher:** As in how do I test?

**[03:05:31] Student 1:** Is it like, how, how can, how, how do we like ensure that like any, any sort of a unit testing or.

**[03:05:39] Teacher (answer):** I've never write. I've never written tests on servers that I just deployed in production. I wanted to write the deployment logs that I gave as an example. I just built it. I never tested. I never wrote unit test for connections per se. Never. I just said, but I do, I have tested what needs to be done when you receive a certain type of message, never tested the connection, but I've tested what I received on the connection. Right. So you can rely on that anyway, because that would be functional anyway. Okay. So I did test the business logic on what to do when I receive a certain type of message on SSE and not the actual connection connection.

> **Student Question [03:06:22] - Student 1:** Yeah. And one more follow up question. So like what if you have to design a read heavy API, right? And, and, and, and basically relies on a data, which is sitting on a database. So even though we have a database, which is replicated across data centers, so you'll one master and then you have some replica sitting on cross data center street, but then you cannot cache entire data into the cache because it's like a bit of data. So how, how can you design that read heavy APIs? Because you cannot cache everything, you cannot, if you cannot cache everything, how, how would you do that?

**[~03:06:55] Teacher (answer):** Like, you need to have replicas. The only way to do is with replicas, have redundant copies of data and some reads from there. There is no other way.

**[03:07:07] Student 1:** Right. Okay. So like, for example, you, you increase the API servers, right. And on the back, you'll have to continuously increase the replica.

**[03:07:15] Teacher:** Add replicas. Yes. Yes. Otherwise one database would handle like, like one database has a limitation on the number of requests that it can handle. There is no way.

**[03:07:25] Student 8:** We have some limited connections.

> **Student Question [03:07:30] - Student 1:** But are we going to cover those caching strategies?

**[03:07:33] Teacher (answer):** Yeah, yeah, yeah. To some extent. Yes. Well, see, now it's just first week, right? It's just first week. There's seven more to go. We have far too many systems to cover. We have far too many practices to look at. We have far too many patterns to observe. Okay. A lot of things will be. Pankaj.

> **Student Question [03:07:52] - Student 10:** Just a quick, quick confirmation, in this server-sent events, the connection is is still bi-directional, just the client is not using it, right?

**[03:08:00] Teacher (answer):** No. The connection itself is, the protocol specification does not allow client to send something. Okay. Okay. Yeah. Right. So that's how protocols are implemented. That's what the specifications are implemented. So they don't allow client to send something. They don't give a way for client to send something to the server.

**[03:08:23] Student 10:** Okay. Yeah. So basically the TCP connection, which is established, it will allow bi-directional communication, but the protocol with written on top of it is not allowed.

**[03:08:35] Student 16?:** Okay. Thanks. Yeah. Anuqa. [check: "Yeah. Anuqa." may be the Teacher calling the next student]

> **Student Question [03:08:40] - Student 3:** Here, another question on WebSockets and server-sent events. So if we have a proxy or a load balancer in our system before the server, then the TCP connection that the client has will be with the proxy and the load balancer. Yes. They have the responsibility of propagating that to the server.

**[03:09:01] Student 14:** Yes.

**[03:09:02] Student 3:** Understood. Thank you.

**[03:09:05] Teacher:** Yeah, Ranjit.

> **Student Question [03:09:07] - Student 8:** Arpit, just one question on the replica set that you mentioned. So when the API servers are being added to address scale, the logic, and I noted that you mentioned that the logic would be at the business side, the business logic side of the API server, right? Replicas that should it go to. Correct. I also noted you mentioned read replicas, right? So is it a cardinal rule, as in a read replica, or replica could be a read, right?

**[03:09:34] Teacher (answer):** If you are having a read replica, then it is a multi-master. Okay. Okay. Multi-master comes with its own set of challenges. So when I say read replica, it is just there to solve the read.

**[03:09:43] Student 8:** Because, because let's say your system, I mean, your scale is such, which is increasing and you've got one master and you've got read replicas, and then you realize that you're scaling on at the API server level, but you know, really the master is taking all the writes.

**[03:09:58] Student 1:** You will have to distribute them, isn't it?

**[03:10:01] Teacher (answer):** Yeah. So replica, if you are having multi-master, then you have to handle conflicts. And that is extremely use case specific, how you handle conflicts in a multi-master setup. So that is where sharding is preferred. Right. So read replicas, sharding, and then you go into multi-master if you want to make things overtly complicated.

**[03:10:20] Teacher?:** Understood. Understood. Okay.

**[03:10:22] Teacher:** Yeah. Chira.

**[03:10:25] Student 2:** Yeah. Hi, Arpit. So just wanted to add to Anupal's question, right? So he asked that if there's a proxy or load balancer in between, then client will connect to the proxy and then proxy will connect with the server. Right?

**[03:10:41] Student 14:** Yes.

**[03:10:42] Student 2:** So I think it depends, right? That if it is a layer four or layer seven proxy, because if it is a layer four proxy, then the client will directly connect with the server. So it will be kind of a two connection, but there would be a single tunnel.

**[03:11:04] Teacher:** It does not matter. At the end, the data will go through them.

**[03:11:09] Student 2:** Correct? Yeah. Yeah.

[03:11:11] Yeah. That's true. It's just that if we have a kind of layer seven load balancer, then it can make intelligent decision. Right.

**[03:11:21] Teacher:** But if you are only, if you're only forwarding, if you're rather, if you're only routing the messages here and there, it really does not matter. And if it's layer four or layer seven, and in most cases like this, that's exactly what we do. We just relay the messages back and forth.

**[03:11:36] Student 4:** Yeah. Makes sense.

**[03:11:38] Student 3:** Thank you. So, I just wanted to add to the server-sent events for [?WebSockets | asr: "web software"]. So we actually use it for like on-prem stuff that we have. So there are no inbound connections that are allowed, but only outbound connection from the client side is like a setup via [?WebSocket | asr: "web software"] and then server side communication happens to that.

**[03:12:08] Teacher:** Oh, nice. And what do you stream? Like what, what kind of data do you stream on that?

**[03:12:14] Student 3:** So like, for like, it's not specifically for streaming, like, use cases. Like, so there are on-prem virtual machines are there, like VMware or something. So if you want to perform automations on that, on top of that, so there is no inbound connection allowed. So from there is polling, which, which will send, you know, a request from on-prem to our servers and then we will get it. So only outbound connection is open.

**[03:12:46] Teacher:** Nice. Got that.

**[03:12:48] Student 3:** From on-premise.

**[03:12:50] Teacher:** Happy to see server-sent events in production. Very few companies do that. Everyone just says, let's just use WebSockets, just in case we might have to do bidirectional communication.

> **Student Question [03:13:04] - Student 3:** Also, one more thing I wanted to ask about was, so RabbitMQ and, you know, I mean, in, in sense of queuing and streams. So there are persistent queues that are also available in RabbitMQ, right? Yeah. So like why, if I want multiple consumers and, you know, persistent stream is there, then you can use that.

**[03:13:31] Teacher (answer):** But see, while my course is moving forward in time, database or queue developers are also moving forward in time. They are also building features, right? So there is no hard and bound rule. Today, like as I said, MongoDB never wanted ACID property, but now it supports ACID property. So if I say that MongoDB does not support ACID, that would be wrong. Or NoSQL does not support ACID, that is wrong. So a lot of things progress, right? So there might be new features that, let's say, basically Kafka broadcast is there, which solves kind of real-time Pub/Sub use case. So we cannot just say Kafka does not support real-time Pub/Sub. So generic statements are typically tend to avoid. That's why I'm just going to specific details of that, that, hey, RabbitMQ is mostly known as a message queue, but it has persistent [?queues | asr: "use"] that kind of solves the message streams kind of use case. But there is no hard rule ever, because every engineer is coding and they are all making their tools better and better. And the world is converging.

[03:14:27] If you look at it, all databases are converging to being exactly. They look like one of them nowadays. Like MySQL supports JSON, Postgres support JSON, MongoDB supports this. There are [?wide columns | asr: "white columns"] which support ACID compliance. Hudi supports transactions and whatnot. And everyone is doing everything because building is easy. Got it.

**[03:14:50] Student 4:** Thank you.

**[03:14:52] Teacher:** Any other question, anyone? Great. See you folks next week. The end of the day I'll shoot anyway. Thanks folks, it was fab. Bye bye. Thanks. Bye everyone.

<!-- BODY END -->
