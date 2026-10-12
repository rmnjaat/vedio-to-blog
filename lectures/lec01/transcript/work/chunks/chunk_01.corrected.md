**[00:00:00] Teacher:** [unclear: "Tutor."] [?Agenda | asr: "A great"] week, first, day, second. And what we'll do is today we'll continue our discussion on the other four properties, other four fragments of it. Scaling, concurrency, delegation, and communication. And again, we'll talk in context of a medium, but the discussion will be those small nitty gritty, implementation detail, performance benefits, and whatnot.

<!-- topic-candidate [00:00:31]: Student feedback (admin) -->

[00:00:31] But as a regular ritual, first of all, thank you so much for providing the continuous feedback. Loved going through them. So there were few concerns raised, I'll start going through that, of all the things [unclear: "no point in mind"]. Okay, one person said, and it's given it's anonymous, I don't know who wrote that, but one person wrote, "But I wish the video uploaded could have been transcribed, it becomes easy to comprehend, it takes too much of effort." When one person team, I cannot transcribe, right, stuff around that, right? I tried finding a tool, but it misinterpreted our accent. So I found a project on GitHub that did that, but it misinterpreted, so I stopped doing it. I tried it once. So that's why, I'm just one person team doing out of [?passion | asr: "fashion"], so hard to do anything around that.

[00:01:27] Then, what I've done better. Okay. "I feel we could have some more post lecture read-ups." I typically don't give post lecture read-ups because 90% folks don't even read pre-reads. First of all. Second of all, the flow of the lecture is not fixed. It changes from cohort to cohort. Like pointers that I discussed yesterday, like three pointers that I discussed yesterday were data. Those were something that I never discussed ever in any cohort. Right. So it's naturally that comes to me because I keep reading a lot of stuff. It's not that this is something that I prepared on day one, a year back. And since then, there is nothing like, basically there is no change. So a lot of things that I say is very biased towards what I've learned in the recent time. And it obviously enhances the experience because I'm always learning. So given that there is no specific thing because there is a specific flow to that.

[00:02:24] Whatever I utter, just Google, find and read and explore, as simple as that. Because I, and another reason is I don't want you to limit, to be limited to those five or six links, because internet evolves. There are brilliant articles published every now and then, I may not be able to update the post reads, then I don't want you to read the stale information, right? One more reason. So it's always better that whenever you hear the term, whenever you find something interesting, go read about it. And in any case, I point out in the lecture, read this, read that, make a note of it, right? Like for example, yesterday I told about reading the, how MySQL implements date time through that documentation. If I share the link, then you can directly go and read it. Instead, go and explore the documentation. You will stumble upon much more interesting details. That would make you a better engineer. If I spoon feed that part to you, that's not fun because you need to build that habit of exploring things rather than waiting for someone to do the curation for you. Right. And I'm a firm believer of that because I believe in serendipity. I believe in you trying, you wanting to find something, but you land up on something else, which is thousand X more interesting to that. Right. So that's why I don't typically give pre-reads post-lecture read ups. I only give pre-reads just to prepare for it.

[00:03:49] Then, I'll say, "if there can be an introduction to cohort participants, better to know each other." 80 folks participation itself or introduction itself would take an hour. At least I'm assuming, like 80 folks, even if I give one minute, it will be 80 minutes. So one and a half hour gone. Right. So that is where I go into first ever cohort. I used to do introduction. There were 25 people in that also, almost 40 minutes went like that. Right. I felt it's a waste of time because you would know about each other. When someone asks questions, you would see their name popping up. You can connect over Discord and whatnot. Right. So I wanted to keep the entire course very crisp, very focused on engineering. Intro intro, you can anyway connect. Like you would see people raising their hands again. You would remember their names. A lot of people have done that in the past, but for me to give the maximum value, I cannot just say eight weeks, 16 sessions and four, and almost one and a half hour of it is gone in introduction. I don't do that. For me, it has to be extremely [?intense | asr: "tense"], extremely focused on engineering, right? So that I can deliver the maximum value, as simple as that. And imagine you waiting for one and a half hour just for introductions to get complete, and that too, that's the best case, right? 80 folks, an introduction. If I give one minute each, that's 80 minutes gone. That's right. So I just keep totally focused on this.

[00:05:18] And yeah, [unclear: "those who were it."] But in case there is anything, feel free to add to context feedback how I can improve, what all things I can cover. In case there is a scope for that, I'll definitely do it. But in case, I always have my eye on this. Great.

<!-- topic-candidate [00:05:33]: Agenda for today -->

[00:05:33] Now we'll move to the actual stuff. Week 1st, day 2nd agenda for today. As we discussed yesterday, the first thing that we'll discuss today is caching at different levels. How, and this is where the very interesting hacks would basically pop up, right? And from everyone else's experience, right? Because people would share how they have been doing it. And then it would obviously transform a lot of, like it would rewire our brain completely. Then we'll talk about scaling, then delegation, then concurrency, and then communication. Concurrency will spend like 5-10 minutes because next week, first day, like second week, first day, we have an in-depth coverage of concurrency. Like how database concurrency fall apart. That's next week. So that's week, second, first day. We'll take practical examples to understand concurrency in depth because that is the heart and soul of building systems at scale. We'll talk about this. We'll spend very less time today on concurrency. But delegation will cover basics that you definitely need to know. Scaling, communication, 5 to 5.

<!-- topic-candidate [00:06:36]: Caching at different levels -->

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
