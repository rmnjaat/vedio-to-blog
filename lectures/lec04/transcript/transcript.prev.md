# Lecture 04

| | |
|---|---|
| **Source** | lec04.merged.json |
| **Duration** | 03:06:44 |
| **Speakers** | TODO: Teacher; Student 1 ...; (label mapping from diarization in term_decisions.md) |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 271 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | TODO: N - see [review_flags.md](review_flags.md) |
| **Verification** | TODO: PASS/FAIL, retention xx.x% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. TODO [HH:MM:SS] Topic

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

<!-- chunk_01 00:00:02-00:11:13 -->

<!-- topic-candidate [00:00:02]: Cohort introduction and course rules *(admin)* -->

**[00:00:02] Teacher:** *(admin)* Superb. Thank you. First of all, thank you so much. Thank you so much for joining this cohort. Trusting me with this. This is 16th cohort and I cannot even imagine me doing something as consistently as this. This 16th cohort. And we'll have fun talking about systems in depth. I'll do my level best to go into the depth of systems to help you build the raw intuition of the system, of basically building systems. So we'll do that next two months or the next eight weeks. It's all about system design. And the more importantly, the more interesting part is we'll always talk about the implementation side of things rather than just drawing boxes. I don't believe in drawing boxes. I believe in going into the intricate details of the system, which is what makes us better. Otherwise drawing boxes that you can do as a kid also. Okay.

[00:01:00] Course, first of all, participate live. No matter, like, it's just matter of eight weeks. What I would highly recommend is you participating live, which means that when the live session happens, join them. And there are times where you have some commitment, something, try to not falter, like, try to ensure that you still take out time to attend live, because this is where the sessions being live we active brainstorming, it would rewire your brain into thinking from a systems, from an intuitive way rather than saying, okay, this is the question, this is the answer. I never talk in those sense. I never talk about interviews, [?FYI | asr: "fii"], I don't believe anyone should prepare for interviews. So it's really simple. I want everyone to feel the joy of engineering, number one. Number two, build intuition to build any system in the world. Will apply a ton of first principles, very simplistic designs, but things that scale, things the way they are built in real world, will try to do that, right?

[00:02:07] So participate live no matter what happens. Like, I've had very unfortunate incidents, I still took these sessions, right? And I would highly recommend you to do it, because when you have those discipline, it's easy to get the most out of [unclear: "this person"]. That's why it's the first and the most important point that I would want to bring out, like, participate live no matter what. Second, you will hear a lot of new terms. There will not be jargons. I don't use jargons, I try to keep things extremely simple, but still there are things that has names, for example sharding, for example consistent hashing, so I cannot give simplistic names and that. So then you'll hear a lot of new terms, and it's very much possible that you would not have heard it in the past, and those terms note of it, read about them later, right? Given that this is an intermediate course, I'm expecting, in case you don't know something, a lot of places I'll explain, but I'd want you to spend time going through it, understand it on your own, right? Third is revise regularly. Very important, because the way the entire course is structured, first week is linked to second week, second week is linked to third week, third week is linked to fourth week, and so on and so forth, right? By the end of seventh week ad hoc systems, where we design flash sale, where we design message brokers, you'll see how simple those systems are. And I'm not even kidding, flash sale 10 minutes max will take to design it. It's that simple. So flash sale, when it comes that way, all the learnings from the past weeks, 1, 2, 3, 4, 5, 6 will come in handy when we design the flash sale or any system in the 7th week. And in most cases, you would see a string connecting all of them. So it's important. In case you feel like you need to revise, do that. Take out that time.

[00:03:58] Two months. Two months is nothing. Just give it all. You'll turn out to be much, much, much better [?engineer | asr: "interior"]. Then read the pre-reads. Extremely important, because the pre-reads are very heavily curated for the session that we would have. So every session will cover a bunch of topics. Pre-reads are according to that. If you read pre-reads, it will ensure that you have most what it takes for you to understand whatever is happening in that session. So pre-reads, what I share, extremely important. Then you have three one-on-ones that you can block. You can block it through re-log [check: name - course platform?]. Beneath the video, you will find section which says discuss one-on-one. Go and block the time. You have three one-on-ones to leverage.

[00:04:47] Then most people think system design is all about drawing boxes or it's theoretical and, oh, I need massive infrastructure to run it. No, not at all. Every single system, and I'm not even exaggerating when I say every single system, literally every single system that we discuss is implementable on a local machine. You don't need fancy infrastructure to do it. So you have, you should not, and obviously I'm not expecting you to implement it throughout this course, but take your time, take one year, one and a half year to implement all the systems. The folks who have done it are seeing humongous results, right? So every single system's core, you should implement. I'm not saying, like, every CRUD API and all those. Implement the core of the system, for example, flash sale, right? That core flash sale module, no one expects you to build UI to click stuff for load balancer, something very similar. So you don't need to implement the entire system, but implement a core of it, because the devil lies in the details. When you know, when you have, when you implemented, you'd realize key where the system could falter, what are the challenges that would come with implementation, because in real world, at your organization, you are expected to implement and not just draw boxes, right? So which is where implement the core of every single system.

[00:06:10] It's because take your time, and it's not that you have to do it in this two weeks or two months. So take your time in implementation, because it will take you year, year and a half to do it. And it's fine. Take your time. Absorb everything.

[00:06:25] Then continuous feedback. Every cohort is unique. And I understand. And I totally understand that I'd have to adjust to pace depending on the kind of folks that are there. So what I do is after every session, I share one link to Google form having two questions. What worked for you and what I can do to make this better. Feel free to leave your comments on that. This would help me tune the way I deliver things on every cohort. And I've been doing it for a very long time. And I take that very, like, it's very important for me to ensure that I give the best experience out there. So I have attuned to a lot of practices in the past, which has helped me revise this cohort in a much better way. So this helps me a lot.

[00:07:14] One final thing. If you find something interesting, there is a Discord channel called Look What I Found. Share it there. There are tons of super interesting resources you will find there. People have shared some great articles, videos and whatnot on that. Go through it. And if you find something interesting, drop a note on that channel. So that is that one collective links. Like the first ever link that was shared was AOSN [check: term]. That was a mind-blowing link. So go through them. Feel free to roam around the Discord server that you have and see the kind of resources. You'll find some great things anywhere on that.

[00:07:53] So in short, you have the calendar invite this way. And please accept it. For some reason, people don't accept calendar. I don't know why. Accept the calendar invite, you'll get notification, right? Accept the calendar invites, Saturday, Sunday, 9 to 11.30 a.m. The sessions would be there. Note, sessions would not end until I have answered all the doubts, right? But the core, whatever I want to cover in the session, will be covered by 11.30. And then there will be open questions. And in the middle of the session also we would have brainstorming and all. So I've structured it accordingly. But after 11 30, for basically, feel free to drop off, I cannot stop anyone anyway, but the sessions will continue until every single doubt is answered. So which means it does not matter if it's 11 30 or 12 or 12 30 or 1. I had one session that went till 1 30, not even kidding, right? 9 to 130, almost, basically four and a half hour straight we were discussing some very fancy stuff, right? So, so I am like, I'm there to answer every single question of yours. So the sessions will continue, but the core of the system, the core of the session will end by 11.30, 11.40, and then open forum.

[00:09:12] Ensure you have joined Discord server, a ton of interesting resources are there. And you have access to the learning portal, learn.relog.in. You go to that and access all the recordings. The recordings will be shared by the end of the day. It takes time for me to transcode it and amplify and whatnot, so then, so it will take some time for me to do it. So that's why immediate available it would not be possible. It takes time for me to do it, but by the end of the day definitely you'll get it. So sooner the better, but I can say that end of the day, it means 11 59 p.m, is it would definitely be done, because it takes time for me to transcode, and there are some glitches, some audio channel breaks and whatnot. So how to fix those and then move forward. So that's fine. Okay.

<!-- topic-candidate [00:10:00]: Flow of each session *(admin)* -->

[00:10:00] The flow of each session would be, would look something like this. Each session has a bunch of sections, and at the end of each section, I'll, we take questions. So it's not that it will be a monologue and then I'll take all the questions. So whenever I feel we have covered substantial enough and you folks might have questions at that point of time, we'll take questions. But it would not be that we are taking all the questions, because we have to cover everything by 11.30 and then open forum is there. So the plan is that we'll take some questions as the time permits. Then we'll move to the next section. But at the end, in case your doubts are not answered, post 11.30 when we have open forum, feel free to shoot that question. So in any case, the session does not end until all the doubts or all the questions are answered.

[00:10:51] We have a ton of brainstorming. First week, I don't do any because I want everyone to be on the same level. And then second week, [?onwards | asr: "converts"] will have brainstorming, but we'll still have questions and answers, a lot of them. But brainstorming of systems will start from next week. Because before that, first, let's cover the foundation.

<!-- chunk_02 00:11:13-00:22:56 -->

**[00:11:13] Teacher:** *(admin)* Apart from the things that we discuss in the live session, go through my YouTube videos. There is ton of things that I've put out. Take your time. One life, be a better engineer, right? Go through my YouTube videos and do consider membership. I very recently announced one. Do consider membership. I'll slowly start to move my free stuff into paid tier because time is money. So go through my YouTube videos, bunch of real world system design, architectures and whatnot. You'll find ton of them. But be assured, nothing that I cover in my course will be out there. Exclusive no matter what. And this will always be my topmost content. If may I put it, I don't like that word, but still, this would be the top part that I deliver in my course. Everything else is just superficial, right? So you'll still find enough value, enough value out of things that I post out. I post that, but this is where the actual goal is.

[00:12:11] *(admin)* I have one more course. I was planning to create more, but I'm not getting time. So I've created one more course on Redis internals, about Redis end-to-end. So if you are interested go for that. Apart from that, 2020 was the year which transformed my life. Entire 2020 I read one research paper every week and I wrote about it in depth and most only implemented it. All of those are their essays. If you go to top right, you'll find essays, within which you'll find all the detailed essays that I ever wrote. Not my newsletter, that is different. These are essays, that's why I used the word essays. So go through that, you'll find a bunch of interesting stuff, very advanced, like not really advanced, but good chunks of algorithms, pseudo random number generators, terrain generation algorithm and whatnot. So if you're interested, go through and explore that. Okay.

<!-- topic-candidate [00:13:05]: Agenda for today -->

[00:13:05] Coming to this session, the agenda for today is we'll discuss two things mostly. First is we'll start with the back. We'll start with designing the online offline indicator. Right, so Facebook, Twitter, you see when someone comes online you see green dot, someone goes offline you see gray dot, right? So we'll design that, but we'll not worry about scale. This is day one, right? We'll not worry about scale because the design would change very much when we cover other concepts, right? So you can automatically link here, this is how we should have designed this. But we'll still cover it in a way where we tackle it from the first principles and start building the intuition that we always wanted. So that's it. So that is what we'll do the first part. Then we'll take a break and then the second half of the session will be about how to approach system design and we'll talk about two things, databases and caching. When we talk about these, we'll talk it in context of, let's say we're building Medium-like application. It's very simple concepts, but we'll go into those granular details that every engineer should know about.

[00:14:13] So this is the agenda for today. So we'll start with the first one. And again, this day one, we'll not worry about scale, not much. We'll still talk about performance improvements, but not scale because you need, we'll go in the second, third, fourth week. And we have enough time to cover anyway. And we'll keep it simple. And we'll see how we are, how we are reaching to the solution. Although you may think, it's so obvious now, why are we spending time on this? But the more important part is there are some implementation specifics that you should know about. We'll talk about that and form that core intuition around building any and every system. Right? Okay.

<!-- topic-candidate [00:14:58]: Online offline indicator - the brief -->

[00:14:58] So [?online offline | asr: "on an offline"] indicator, we have here, what we'll have is we'll have. Will have a bunch of users against which you would see green dots or grey dots. Green dots implies they are online. Grey dots implies they are offline. So we just want to render this. This is the brief that we got from the product team. And now we have to go about it.

<!-- topic-candidate [00:15:22]: Two approaches to build any system - spiral and incremental -->

[00:15:22] So you have here, when you're designing any system, literally any system, I have always, like, throughout last 10, 11 years that I've spent, I've only seen two ways, two categories of approaches, or rather two approaches in general to build any system. And it does not matter. And it really depends on the system, which one are you going for? But there is no hard rule that you should always go with a certain approach. But there are two ways to build it. The first one is where I call the spiral approach. So in this approach, what happens is you decide the core of the system. Now this core of the system is most cases is database. So you start with designing the database, right? And then you build, okay, now this database I have, now I need API server. API server I have, bunch of API servers, I need a load balancer and so on and so forth. Right? So you decide the core of your system, which becomes the single point of focus of your system, that core of your system is the one that is making it possible. That it could be a database schema. It could be a communication layer. Messaging app, then your WebSocket becomes the core of the system and then you build everything around it. So that is one way to look at it when you go for a spiral flow around building different components as and when you need it.

[00:16:46] The second one is your incremental building. When it's about incremental building, it's about when you are unsure of how to implement, how to scale, which is where what you do is you start with the day zero architecture, whatever simplistic thing ever. You just draw that. It may be user, load balancer, API server, database. And then you see, oh, and then you think about implementation specific that, hey, is this server overburdened? If not, do I need to split it into another service or not? Right. All of those decisions is something that you would take. So start with an extremely simplistic day zero architecture. Then you see how each of the components that you have would behave under load and at scale. The responsibilities of it or not. You identify the borderline, you re-architect and repeat it until you are happy and content. So these are two approaches. At some places we'll use spiral, at some places we'll use incremental. You'll see it could be very evident, okay, where are we using spiral, where are we using incremental. But in most cases, a very simple way to look at it is when a system is simple enough, where it's a no brainer, where you know that, A, this is exactly to be done, you typically go with a spiral based approach. I don't know that, okay, this is the core of my system, I know this would require, this would be there, this would be there, and now I need a CDN and this and that. So that's a no brain. So that is where when you know, when you have built similar systems before, you typically go with spiral because you exactly know how things would transpire. But when you are in an ambiguous situation and you're a little uncertain, right, that's where this incremental building concept, which is where you can typically see how incremental building resonates with startup like environment. You start with the day zero architecture, you push it out to some users and re-architect over time and make it better and better and better. Why? In a multi-year project at a big organization you typically go with this, where you know what you need to implement, those are too complex, so you start with this and this and then you grow organically around it, right? No lines there, but two ways to look at it. It just gives you confidence when you're building. Okay.

<!-- topic-candidate [00:19:04]: Understand the core property and access pattern -->

[00:19:04] Whatever we're discussing with online offline, now we'll start the actual technical decisions that we would take. So points to remember is, first, understand the core property and access pattern. Really important. So what I've seen is a lot of people have affinity towards a particular tech. No, here I'll use Redis. Why? No, no, Redis. Because I love Redis. Or here I'll only use Postgres. Or I'll only use DynamoDB. Or I'll only use Cassandra. Right? So these kind of thought processes that you have, this kind of rigidity that you hold in your mind, hampers the growth. Not your, but systems growth. So what we should do instead is, we should focus on the core property that we need from that component rather than saying that, hey, I will only use DynamoDB over here and not other. Whatever company is not on AWS, you cannot use DynamoDB, right? So which is where for every single decision that we will make or you make in your life, in your career, in your, in the next big thing that you're designing, understand the core property, core access pattern that you would have from that particular subsystem or from that particular component and see which all tools, technologies, framework fit into the scheme of things.

[00:20:37] The one who do pick, you can pick any one of them. So a lot of people seem rigid and now I'll only use Redis. Why? What if my company does not use Redis? Then will you not build that system? You still have to, right? So that is exactly where it comes in very handy to look at a particular system, to look at a particular technology from its core property or from our requirements. And whoever satisfies that requirement will pick that. Throughout this course, you will see so many places. I literally discard Cassandra. We don't need that kind of fancy stuff. You don't. It's a very simplistic use case. A relational DB can solve it. And that's very counterintuitive. There are systems that are built using relational DBs instead of Cassandra, that very same system operating at scale, which is extremely important to know the core properties and access pattern, and your affinity towards a particular tech comes second, which one to use, but core property really important. You'll see how this helps in designing better systems.

[00:21:45] Most important part, build an intuition towards building system. That it's not always that this is the only way to build a system. There's nothing like this. Every system is infinitely buildable. You can evolve it the way you want. So, but building an intuition, intuition that you hold will stay with you forever. Right. And which is what is required? Because it's not that there are only 15, 16 systems that the world has and you would exactly that, right? No, you at real world, you will be thrown into situations where you have to build systems that does not even exist. How will you go about it? Right? So which is where intuition matters the most. Okay.

<!-- topic-candidate [00:22:29]: Online offline indicator - database as the core -->

[00:22:29] Now, if I start on online offline indicator, if you think about it, let's say we pick our core of the system as database. That's the easiest one to start. So let's say we start with a database and we'll think about if I'd want to render this, this online offline stuff, what do I need? I see that there is a user and I see there is a green or a grey button, or green or a grey indicator. Okay.

<!-- chunk_03 00:22:56-00:33:50 -->

**[00:22:56] Teacher:** So when it is there, it means that what I have is for a user, I want to store if the user is online or not, because this is exactly what I'll make a call, get the information and render it on the UI. So let's say we store it exactly that way. I'll store it as an integer because user ID integer, fair assumption, and online or offline. So I'll store a boolean, true or false. True means online, false means offline. And for all the users, I'll store this information. So this is a classic key-value use case. It's just access pattern. It's not kind of database. I'm just picking the access pattern. Because for a set of users, give me their online offline status. For a single user, give me the status. For a single user, update the status. These are the operations that we would do.

[00:23:44] So here, when we look at this, what we find is that this is a very key-value type use case. It's still not decided on the database, right? But we know that this is the access pattern that we would typically operate on. Right? Okay. So now that we have data in our database, now we know how we are storing it. Let's come a step back. Who will query the data from the database? An API server. Right? Call the API user. So on API server, we need to write API that would make call to the data of this and give this. Now here, one critical decision. Sure. You have two ways to implement it. First is given a user, give me the status. And you expose this one endpoint, give me the user ID, give me the status.

[00:24:35] Now here, imagine on the UI where you are entering four users. If you only have one API endpoint exposed, which says that, hey, for a... Then to render this online offline status for four users, you will have to make four API calls from the front end. Very poor experience and because a large number of API calls system will be [unclear: "over pertinent"] and whatnot. So the first critical design decision that we'll take is we'll expose a batch endpoint. Instead of exposing an endpoint that gives the status of just one user, we write one more endpoint that accepts a bunch of user IDs and returns the status of all of them. This way it would reduce the amount of network call that your front end has to make to the backend while ensuring that all the heavy lifting is done by the backend and front end makes fewer network calls to get the exact same information. So that is one reason.

[00:25:35] These are the intricate details that I was talking about rather than just drawing boxes. Understand, like, why are we exposing it in a certain way. Right. So we expose the endpoint slash data slash users and we accept a bunch of IDs there. And his job is for all the IDs that I provide, give me the online offline status of it. Right. Pretty simple thing. So what we sort out is rendering part is sorted out. Right. We expose an endpoint that would help us render the status of it on the front end.

<!-- topic-candidate [00:26:07]: Updating the status - heartbeat -->

[00:26:07] Now comes the part where we have to update it. It is, we now have a database on which we can fire a query, get the data. Right. That part is sorted. Now someone has to update this information because reading is done. What about updating? So now here, when we are updating this, that for every user, I need to put out online or offline, something like this. So now how do we go about this?

[00:26:33] Now here, there are two ways to get this information. First is a pull-based model. Push based on when I talk about pull-based, which means that your API server is trying to fetch this information that, are you alive, are you alive, are you alive, kind of that, right, where your API server is making call to front end and getting it. But that is not possible because HTTP stateless, there is no persistent connection, so API server cannot talk to client. Client has to talk to API server and say this. So pull-based model will not work because of... The client has to push this information that, hey, I am alive. I am alive. I am alive. So periodicity. So periodically you would send heartbeats to the backend and say that I am alive. It's like mimicking our heartbeats, right? So you have your machine. So long as the heart is beating, you are alive. Heart stops beating, you are dead, right?

[00:27:33] So what you do is every client will periodically make an API call, a heartbeat API call, which would tell the API server, I am alive. Right. So this is what you do. So you need one API endpoint where clients can post their heartbeat. So what do you do? You expose the endpoint slash heartbeat on which you can pass in post and say that whatever the authenticated user is will be marked as alive. But now with heartbeat, what you have to do is you cannot just say one. Again, if we go into a bit more details on that, this heartbeat call, do you need periodically or just one time heartbeat call is fine? For example, you may say that, why do I need to send it periodically? What if I send it once when I'm online and once when I log out? So that's a common thing that, hey, I just need two API calls. When I'm online, when I'm logging in the first time, I would send a heartbeat, and when I'm logging out, I'll say now I'm offline.

[00:28:40] But think about it. Let's say a user sent a call which says that, hey, I'm online, but then the machine crashed. Right? The client device ran out of battery. The user is actually offline, but your UI is showing it is online because you never received a call offline. And this is a very common case. So given that you can tell when you are online, but offline you cannot tell because you are not in that control, or you do not have control of making an API call just before I die, right? Or just before the device die, you cannot make an API call because what if someone just plugs off the device, right? You don't get time to do that. So, which is where you know that because of this fundamental limitation, you will have to periodically send the heartbeat to the backend. So that it's like, I'm alive, I'm alive, I'm alive, I'm alive.

[00:29:43] When you do that, and if the backend does not receive a heartbeat for a long enough time, then the backend would say that this user is offline. This is the most natural progression to the system, is we converge to this, that because I was constantly receiving heartbeat from this particular user, I was constantly marking this user as online, but if I don't get it long enough... Now this long becomes a subjective word. How long is long enough for me? Now this depends on this case. For some system it would be in 10 minutes, if I don't receive a heartbeat, I'll mark this user as offline. For some, if it is 10 seconds, for some it is one minute, right? Now depending on what you are building, you will configure this time, right, that, hey, this is what I'll say, that if I don't receive a heartbeat for, let's say, 30 seconds, I'll mark this user as offline. So this is your business logic.

[00:30:43] So now you need to keep track of what was the time at which I received the last heartbeat from this... So that you know that it has been long enough. Correct. So earlier what we were storing was we were storing int and bool. But what we need is we need to store the time at which we received the last heartbeat. So this is the pulse that we are sending. So instead of storing bool what we store is we store the time at which we received the last heartbeat. So every time user sends a heartbeat to the post heartbeat request, we update the last heartbeat of that particular user in the table. Okay.

[00:31:28] Just one thing. Whenever I draw something like this does not mean it is relational. It just helps you visualize the schema of it. You can model it however you want. Right. And whenever I [?write | asr: "try"] SQL does not mean we are only using SQL. It's just an easy way to understand this. Right. [?FYI | asr: "F-Y-O"]. Okay.

[00:31:46] So whenever we receive a heartbeat in the post request, and update on this database and update and mark this last heartbeat as something, right, the current time at which we receive the heartbeat. So update pulse set last heartbeat equal to now where user id is equal to something, right? We keep on doing this. Whenever we get heartbeat from a user, we keep on updating the corresponding row in the data, right?

<!-- topic-candidate [00:32:07]: getStatus business logic -->

[00:32:07] So now if this is how we are storing the data, now so which means now our get needs to change. Earlier what we did is while getting we just went to the database, read true or false and returned it to the user, but now instead of having true and false we are having integer, which is the last heartbeat type. So now our get method changes, the business logic of it. Now what we do is, we becomes little more complex. So what we do is whenever we get a status call to check an API for a user, also holds true for batch users, batch IDs that are provided. That if there is no entry in the database, we say it's offline. Because if there is no entry for U4 over here, it means user never came online. Correct? So which means that user is offline. So if there is no entry in the database for a user, we say it's offline. We return offline for that.

[00:33:06] If there is an entry and entry.lastheartbeat less than now minus 30 seconds, which means the time at which I received the last heartbeat is older than current time minus 30 seconds, which means it has been more than 30 seconds that I have received heartbeat from this particular user, I'll return offline. If I don't match these two conditions, the user is online, right? Either the entry does not exist, then it is definitely offline. If the entry exists, but the last heartbeat I received is older than 30 seconds and the user is offline. User is online. So this is how our business logic would change for the getStatus API.

<!-- chunk_04 00:33:50-00:46:38 -->

<!-- topic-candidate [00:33:50]: Estimating the scale (back of the envelope calculation) -->

**[00:33:50] Teacher:** Now let's estimate the scale of it. Pretty simple system, we implemented database, schema, update, reads, then long enough duration. We did that. Now let's see what happens at scale. Let's do some back of the envelope calculation as fancy people tell. Normal planning, normal crunching of mathematics, seventh standard. So if we look here, each row of this table has two columns. So each row has two values in it. First column is user ID. Second column is last heartbeat. So last heartbeat, let's say we are storing epoch seconds. This the seconds elapsed from 1st January 1970, which is a standard Unix epoch that we would store over here. If you compute the size or the length of a row, it will come up one integer, another integer. 4 byte plus 4 byte is equal to 8 byte. So for each user, I am requiring 8 bytes of space. Not really disk space yet. 8 bytes of space, which means if I have 100 users, there will be 100 entries. If I have 1000 users, 1000 entries and so on and so forth.

[00:35:14] So if I talk about, let's say I have a billion users, 1 eighth of the world population on my platform, let's say I'm Facebook. Facebook has much more than that, but let's say we have 1 billion users. So the amount of the number of entries we would have is 1 billion because one user, one entry and each entry is eight bytes long. One for user ID, one for timestamp. The total size of this would be one billion entries. Each entry is eight bytes. So the total size is eight GB. This is interesting because eight GB is not that big of a storage to worry about. 128 GB is right there, more than 8 GB is right there in your pocket. And your phone has 128 GB. This tells us, this calculation, this computation tells us that this system does not require a massive storage. This system requires something else. Storage is not a challenge for the system. Very evident. Storage is the amount of space you require to store the data. Because all we are doing is two integers we are storing. Even for a billion users, the total storage required for you is just 8 GB, which you can literally fit in RAM of a very trivial cheap machine. So this tells us that storage is not the problem for the system, but still, still, right.

[00:36:53] Let's say we are being very mighty. We are being very frugal over here and say that, hey, can we optimize this? Can we optimize this 8 GB to something even smaller? I don't want to spend 8 GB on this. Can I do that? Hypothetically. Hypothetically. We don't have to do it for every system, but hypothetically. If we would want to do it. So [unclear: "when you are thrown"] and now why we are talking about this optimization is because every step now, always remember this, whenever you're designing a system, every single step that you take, ask those questions, ask those critical questions that, hey, can I change this, can I go for an alternate, because it's all about trade-offs. Every single system is all about analyzing hundreds and thousands of trade-offs and then picking the best path for yourself.

[00:37:53] So now here, given that we know that storage is not a problem, but still, what if we would want to do better on storage? Always be open for every single possibility. And that's what makes you a better senior engineer. Thinking of all possible, all of the possibilities that you hold without being [?biased | asr: "buyers"]. We don't need this being overconfident. Hey, I know this stuff better than you. Be humble, always document every single possibility that you know, and tell why you took a certain path. You need to have that clarity because if let's say someone says, did you think of this thing? And then you say, no, I did not, that would make you seem like, that would not give you brownie points, right? Thinking of all possible cases whenever you are designing system is the heart and the soul of being a better senior engineer, right? Okay.

<!-- topic-candidate [00:38:47]: Absence of entry = offline (reducing storage) -->

[~00:38:47] So now if, let's say, even though storage is not a problem for us, what if we would want to reduce it even further? Can we do it, right? If such is a approach. So look from this perspective, see what your user is seeing, your end user. Your end user is seeing for the user if it is online or offline. All the user, all anything that user is like, everything that user is getting is about just seeing this green or grey dots. There is no additional information that we are showing to the user. And so can we say if the entry exists in the database, user is online. If the entry does not exist in the database, user is offline. What if absence is equal to offline? So absence of entry in the database is equal to offline. This way we would reduce the rows by a significant margin because you have the users, you would only have the entries here for the users who are actually online.

[00:40:01] Correct. So if you think on those lines, what if absence is equal to online, which means that, what it means that in order to delete it, I would want my entries to expire or delete after 30 seconds, because 30 seconds is the time that which we are playing, that if I don't receive a heartbeat in 30 seconds, I'll mark this user as offline. So which means that whenever I receive a heartbeat, I reset the timer of 30 seconds and then once 30 seconds exhaust, I'll delete those entries. This way, the number of entries we would require in the database will be equal to the number of users who are online at that moment. This ensures that we are reducing the storage requirement. Although storage is not [?big | asr: "picked"], but we're still doing that optimization.

<!-- topic-candidate [00:40:53]: Who deletes the expired entries - cron job -->

[00:40:53] And so who will do this delete? So you may think that, hey, I'll just write a cron job. That's the simplest one. And so you say that, hey, let's just write a cron job that deletes the expired entries. So what you do is you have your database in which you have this exact same schema. You have your user ID and last heartbeat. You write a cron job that goes through entries of the database that are expired, which means whenever the cron job runs, it finds the entries whose last heartbeat is older than 30 seconds and it deletes those corresponding entries from the database, right? Sounds okay, right? So this is a good solution. This way, now what you can do is your get, when you are making, when you want to get a status of a particular user or making a call. If the entry exists in the database, good. If entry does not exist, then user is offline. This solution sounds good. Would work for a startup when you are just launching out. But it's not a robust solution. You need to handle edge cases and whatnot.

[00:42:01] But the core idea is that, can we not, like, this adds up to having another moving part, another service, another process in your system. And because cron job has to be a separate process whose job is to iterate through the database, find the expired entries and delete them. So now you are hosting the [?services | asr: "surveys"]. You also need to ensure your cron is constantly running. Otherwise your business logic would falter. Right. So now uptime of the service becomes important for you. Uptime of this actual service is anyway important for you. So you are adding one more moving part in your system. Don't. So which is where? It's very counterintuitive from everything that's happening on the internet, YouTube videos, people who are creating, adding random services here and there. You as an engineer, think about implementation. Think about you are the one who would have to build those two components, the actual REST-based service and this cron that is running. You have to manage uptime for that. You have to manage telemetry for that. So many things on your [?plate | asr: "page"].

[00:43:13] Implementation, you realize that there is too much work in having this another process running, ensuring it's uptime, doing monitoring of that and whatnot. So never just draw boxes for the sake of it. Think from the implementation and see if you would really want to implement that, monitor that, manage that. If not, think for a better alternative. Always, always, always do that. Don't just draw boxes. Making your diagram look complex is the worst thing that you can do.

<!-- topic-candidate [00:43:43]: Offloading expiration to the database - TTL (Redis, DynamoDB) -->

[00:43:43] Okay, so if not cron job, ask this question, can you offload this to the database? Can your database do this deletion for it? Which means that now what we know is, given that there exists databases who do this thing, you don't have to reinvent the wheel by writing a cron job. So what we do is we want a database that gives us key-value like access and expiration, which, time to live. Two very common databases are Redis and DynamoDB. And there is a specific reason I chose only these two. There are others also, but I specifically for, in order to drive another discussion, I've chose these two. So this way, what we are doing is we are offloading the cron part to the database that gives you this as a native feature so that you don't have to worry about it. Why to reinvent the wheel? Why to add unnecessary components in your system? Keep it really simple.

[00:44:40] So now our entire logic becomes that whenever we receive heartbeat, so whenever we receive heartbeat, we update the entry in Redis and DynamoDB, whichever DB you choose, with a TTL of 30 seconds. And as soon as 30 seconds expires, your Redis and DynamoDB internally will automatically delete it. You don't have to worry about it. You're offloading those complexities to database and keeping your business logic very simple. Every time you receive a heartbeat, you reset the TTL to 30 seconds, which means that if the entry exists, it's online. If entry does not exist, it's offline. If I don't receive heartbeat in 30 seconds, my entry would be automatically deleted by the database. I don't have to worry about it. So this way, our entire design becomes extremely simple and we are managing the least. The database is taking care of the complexity, deletion part database is taking care. All you have to do is just write REST endpoints that talks to this database, exposes them to user, right? Really simplistic system, right? Okay.

<!-- topic-candidate [~00:45:42]: Redis vs DynamoDB - which one would you choose -->

[~00:45:42] Now given that we have two choices, and I specifically, even in pre-reads I mentioned, read about Redis and DynamoDB, right? We will probe some discussions around it. So given that we have two choices, one is Redis, one is, both gives us key-value, both gives us expiration, right? Which one would you choose for the system and why? So raise your hand, I'll pull you in. We'll go in the, we'll go in the order, right? Sometimes I just skip the order to give people fair chances to speak up, right? But, uh, raise your hands, don't [?barge in | asr: "barge it"]. Raise your hands, I'll pull you in. And, uh, which one would you pick, Redis, DynamoDB and

<!-- chunk_05 00:46:38-00:59:38 -->

**[00:46:38] Student 4:** I think I can go with the DynamoDB. Why? I want to store data permanently maybe sometime. So persistence is required.

**[00:46:53] Teacher:** Why would you need persistence for this? We said that 30 seconds gone, your data is anyway deleted.

**[00:47:05] Student 4:** Expiration. Redis can go down. Redis is in-memory database. So it can also go down and DynamoDB is something that is self managed. It's managed by the AWS. So I don't have to worry about that.

**[~00:47:16] Teacher:** You're going in because of manage. So what advantage does a managed service give you?

**[~00:47:22] Student 4:** I don't have to worry about that. It's managed by the AWS. So it will be highly available and that is something that I have to manage that, so I have to take care of that part.

**[~00:47:34] Teacher:** Okay, so you are offloading the management part to the cloud vendor that you have so that you focus more on the business logic. Brilliant. So you're going that for persistence and managed.

**[00:47:47] Student 4:** Great, yeah. So in case, like, if I'm managing the infrastructure, like if we have so much money, then. And in that case, we can go with the Redis also.

**[00:47:58] Teacher:** Yeah, no, that's fine. That's fine. Let others bring out other points. It's fine. So you are going for persistence and manage because of it, you pick [?DynamoDB | asr: "Dynamite"]. That's right. Okay. Yes, Jodhita [check: name spelling], which one would you pick?

**[00:48:13] Student 2 (Jodhita):** Having it as a managed solution is one of the key decisions that depends on your team size. If you have the team size. To service. [check: fragment, words may be missing] One other thing can be depending on your, again, on your team size, Redis can help you prevent vendor lock-in if that is a concern that you have, because Dynamo would probably be sort of like [?locked | asr: "logged"] into AWS and it'll be harder to migrate off of it.

<!-- topic-candidate [00:48:40]: Vendor lock-in -->

**[00:48:40] Teacher:** What happens with vendor lock-in? Like, why is vendor lock-in such a big issue?

**[00:48:45] Student 2:** I mean, a lot of times people think it's a big issue and very often it doesn't end up being, that's what I feel. But yeah, vendor lock-in can be an issue in case the pricing starts being unmanageable or maybe the other rest of your infra slowly starts moving to some other provider or something like that.

**[~00:49:02] Teacher:** Why would that happen? Why would you switch a cloud provider?

**[~00:49:06] Student 2:** Depends, like sometimes you get better deals, like better deals with that cloud provider for your business, so

**[00:49:14] Teacher:** Anything else that you can think of apart from cost?

**[00:49:18] Student 2:** Sometimes it can be for security. Like we had some issues with Azure last year and that might end up breaking some particular security or something like that. So for example, there were some issues with their databases where the access was something, something was messed up, that happened a few years ago.

[00:49:41] And that might be a very big concern for something like a bank, although banks often like have their own infra, but that's a fair part, something like that. So you might want to like slowly, like if something like that keeps happening, you might to shift off of it. For example, in GCP, if you might have started with GCP, but GCP is a little bit infamous for discontinuing services, so you might be like, okay, I want to like slowly shift off to AWS because they support a lot of things for a

**[00:50:10] Teacher:** Brilliant. Okay. Vendor locking, all these concerns, very valid, caused some major issues or mess ups from the cloud vendor or not having enough trust, or you eventually find out that, hey, this is not the right trust because it's too complex to use. But I just want to add one more point around vendor lock-in. So first of all, what vendor lock-in is, is here, let's say we are using GCP. So then we are, so GCP becomes our vendor, right? So let's say I'm a startup, I'm building this online offline and I'm hosted on GCP. So GCP is a vendor that I'm using. So vendor lock-in is a term which people use, which means that I'm locked in with this particular vendor, right?

[~00:50:51] Now, given that DynamoDB is AWS specific, which is specifically one of the reasons why I picked DynamoDB so that I cover this point of vendor lock-in. With vendor lock-in, what happens is you cannot move out of that easily because the tool that you are using is only with that. DynamoDB is only with AWS. DynamoDB is not with GCP or not with Azure. So this way, if tomorrow you'd want to use something else, you'd have to rewrite your entire code thinking about that other technology.

[00:51:21] So this is a biggest concern where if people would want to move clouds either from GCP to AWS or AWS to Azure or somewhere around that, they would have to rewrite a bunch of their code, which is where when organizations reach a certain maturity level, they think about vendor locking a lot, right? And few reasons, uh, around vendor locking, obviously Jyothi [unclear: "the rajd"] some brilliant points [check: name spelling, "Jodhita" at 00:48:09]. But one very interesting reason that I would want to bring out is competition. For example,

[00:51:52] Amazon is known to enter into hundreds of businesses, right? Amazon, let's say Amazon launch Amazon foods, right? Amazon foods in India they launched. Now Swiggy and Zomato, they are on AWS. Amazon foods, Amazon company, hosted on AWS. Now what happens is with Swiggy and Zomato, now that Amazon entered their business, now Swiggy and Zomato are on AWS, I'm not sure what they are on, but if they are on AWS, then they are literally feeding their competitor, because they are giving the, the bill that they would incur on AWS goes into Amazon's pocket, which can then use to basically power their foods business, right? So they don't want people to feed their competitors. So you are on AWS and AWS enters your business, you are gone. So you are actually feeding your competitor. You don't do that. So this is one of the main reasons why for Walmart is not on AWS. They are competitors. Walmart is on GCP, right? Classic reason because Walmart is an e-commerce. Amazon is an e-commerce. If Walmart is on this, then they are actually feeding their competitor. So we don't do it. And this is not something that is pre-established. For example, you were on AWS and let's say Amazon entered your business. Now what you will do?

[00:53:12] Like you cannot feed your, and it's not that startups do it. Organization having massive bills with AWS, let's say $10 million a month, you are literally paying your competitor $10 million a month. And that's bad. So Amazon, I'm just using them as an example because there are tons of them, but other companies also, Azure, Google, Microsoft, Alibaba, everybody is known for that. So when they enter into business as your competitor and you are that big customer, you don't want that to meddle you, right? You don't, you want to ensure that you are not feeding your competitor, so which is where hang on those lines. And you don't have to do it when you're working at a very early start-up, because your bill is ten thousand dollars, hardly, it does not matter to Amazon at all, right? But if you're a big customer, you always think about this. So that's why Walmart on GCP and not on Amazon.

[~00:54:05] But one counter example of that, Netflix. Netflix existed in the past. Like it already existed. Then Amazon entered into Prime, like using the Prime Video. So Prime Video and Netflix are competitor. But still Netflix is still on AWS. Why? Because they cannot now move out of it. They have to rewrite so much of code. So they said, it's okay. We will continue to feed our customers and they have this mutual agreement between them. To some extent. I don't know the details, but yeah, that Netflix is still not moving out of AWS. So they might give them better deal because Netflix is the biggest customer of AWS. So these things really matter in real world.

[00:54:53] When you're drawing or when you're designing a system, you might not think about it, but in real world, when you design real systems, these are extremely critical points to think about. Vendor lock-in, one of them. That's what I wanted to just to exaggerate on vendor lock-in a bit, that a lot of people said, which is why you see a lot of people going in the open source technologies direction rather than going for something proprietary because they don't want to be locked in a particular vendor. Okay. Yes, Rahul?

<!-- topic-candidate [00:55:22]: Redis persistence, managed Redis, data types -->

**[00:55:22] Student 3 (Rahul):** So, there are a few points that I would like to move. First is persistence. Persistence is also available on Redis also. So, like that point is like persistence is also available on Redis. Also, Redis

**[00:55:38] Student?:** How you can configure it?

**[00:55:41] Student 3 (Rahul):** So there is a blog that I have like read a while ago. I have a link for this also. I think I have shared that on the chat also, like Redis has persistence, like persistence management, not one thing.

**[00:55:59] Teacher:** Always be like, always know how that is done. It's good to know that Redis gives you persistence, how they give it, you should know, because you should be basically pushing your boundaries on that, and you should know those details instead of just knowing that it gives persistence. How it gives you AOF file, RDB files, how you configure it, what's the flush frequency. So again, just keep those things in mind, that be aware of everything and try to remember them. Okay. Persistence, Redis gives you persistence. I totally agree on that. So if you need it, you can configure it on Redis, but there are few limitations of that as well. But take it.

**[00:56:36] Student 3 (Rahul):** Second thing is like Redis is also like provided by many, like all of the cloud providers that I know, AWS [?ElastiCache | asr: "CCB"] as a managed service also. So you can have like managed Redis and you can also move on from one cloud provider to other providers if it is needed, because like the underlying code will be the same. Okay. Correct.

**[00:56:59] Student?:** All of them.

**[00:57:00] Student 3 (Rahul):** Okay. And the third thing that I like to, I would like to think about is like, how can we like the data, like how much data we are using. Okay. So I also searched for the databases that like, no, not databases, data types that are in Redis. Okay. So from what I'm able, able to read, Redis only has string data types in, in the terms we are storing. Okay. Okay. And the DynamoDB has like the numbers data type also. I have also provided the link.

<!-- topic-candidate [00:57:39]: Future extensibility - Redis data structures -->

**[00:57:39] Teacher:** Even Redis has numbers. Even Redis has numbers. [check: possible ASR duplicate] It's not just [?in strings | asr: "industry"]. Redis has a bunch of data structures, a bunch of them. But what you are looking for is the looking for future extensibility. So if tomorrow, if you would want to support some complex use cases on top of this, instead of just having key value, how likely like not, it may not be very relevant in online offline use case, but this is a very important point that, hey, will you in future require some additional complexities in your feature, which requires you to have advanced data structures like Bloom filters, like HyperLogLogs, like a geospatial queries and whatnot, which is where Redis comes into play. So you may be more tempted to go towards Redis if you know that in the future, you might see something like this. Okay. So future extensibility is a very good point. And may not be relevant to online or offline, but other use cases. Sure. Thanks Rahul for adding that.

**[00:58:41] Student 4:** Arpit, in that case, in DynamoDB also, we can use a stream and Lambda for that.

**[00:58:47] Teacher:** Shalimda [check: name spelling], please don't barge in. Please, please. Yeah, we can do that. We can do that. Database in the world is evolving, they have a bunch of features. Bunch of features. So we just have to keep track of it. Okay. If we need that or not. And when you talk about DynamoDB streams, Redis also gives you CDCs out of that. Right. Every database gives you everything. World is converging really fast. MongoDB supports ACID, SQL support sharding now, everything's happening. Right. So we just have to be open to every single thing. So before you make decisions, go in depth of every single candidates that you have and understand the pros and cons, depending on what suits you the best, you make that decision. Okay. I'll take one more. Yes.

<!-- chunk_06 00:59:38-01:10:42 -->

**[00:59:38] Student?:** So online offline indication is something which is time sensitive. And if I want it in the real time, I would choose Redis. So let's say if there are 500 million users who are active and I want to query, then of course, between Redis and Dynamo, Redis will be faster.

**[00:59:59] Teacher:** Yeah. But why would it be faster? Is it only because it's in memory?

**[01:00:06] Student?:** Yeah, in memory and even the performance Redis is better.

**[01:00:14] Teacher:** Not really. What you would get more out of this for time sensitivity is the persistent connections that you can hold with DynamoDB. You cannot create [?persistent connections | asr: "persistent relations"]. It's stateless. Okay. With Redis, you create persistent connections, which is what would give you that extreme low latency that you require. It obviously comes with a cost, but you get that. That's how you get this time sensitivity. Right. It does that.

[01:00:36] See, everyone might not be aware of all the features, right? Have to be extremely open. Okay, what are things that you would need and how to do it, right? And that turns, like Redis has [?Pub/Sub | asr: "Spongebob"], DynamoDB has its own set of features. You pick database. Now there is [?term | asr: "ArrowDB"], Aerospike. Aerospike is there. Aerospike is proprietary. It has its own bunch of features, right? So just being open to things around us and diving deep into each one of them. Basically, database is the most critical, most brittle component of your infrastructure. Really well, right? Which, what features they offer, how they, how you do it, what's the performance. You should know those numbers very early, but over time you should build those intuition of using it.

[01:01:23] But time sensitivity, as in what you added was that core feature that you need around like, for example, when someone goes offline, you want to, like, as soon as the, for example, I'll just give an example on that. As soon as the key expires, you would want to immediately pretend that this user is offline immediately. So now how do you do that? If you would want that kind of feature, then Redis gives you those hooks that tell you that, hey, this key just expired. But DynamoDB does not give you that. It gives you through streams, but it would take you a long time to process it. But Redis can give you it on the fly on a persistent connection. Again, a bit more details of Redis, but that's what you're supposed to know. All these fancy features that databases offer. Yeah. Okay.

[01:02:13] Mohit, Sandeep and Shreya, I'll take like in case you want to add, we'll have a chat about it at the end. We'll move to the next part now. But what I wanted to stress from this is like why I specifically chose Redis and DynamoDB, Redis open source, DynamoDB proprietary, big difference. So if you are having, if you're working in a small team, lean startup, five, 10 member team, you don't want this additional pressure of managing the infrastructure, which is where you would go for a management. Reasons why people go for managed services because they have very lean team or they might not have expertise in managing them because managing any database, Redis, Elasticsearch, basically MySQL, Redis, Elasticsearch, any comes with its own set of pain points, observability, profiling and whatnot. Managed services give you easy. If you're a big organization thinking of vendor lock-in, then you may want to choose one over other.

[01:03:03] These factors, which is why I love having this brainstorming because apart from all the most common answers. These are the ones that are very interesting. Future extensions, vendor lock-in and manage. These three things is what is missing. A lot of people don't put thought around it. Very, very, very important. Okay. And this is not, and by the way, in real world, this is not how online offline are built. They're built using WebSockets, which we'll discuss next week, not with online offline use case, but with some other use case. But this, the things that we discussed was more around how we go into those granular details, how we build intuition around it, how we make those trade-off decisions, right? So we are keeping things simple because it's day one. When things become, when things starts to become complex, you'll see the complexity that we touch, right? So for now, and again, warning, there's not how they're actually built. They are built with a ton of tunings and optimizations and whatnot, but we'll touch upon few of them in the next week. So second week, second day, when we talk about Slack's real-time communication, we'll touch upon this. Okay.

<!-- topic-candidate [01:04:14]: The real challenge at scale - 6 million updates per minute -->

[01:04:14] Let's see how our DB is doing. We've talked about storage. Now comes more interesting part. So we talk about that storage is not a challenge for this system because 8 GB for 1 million entries is peanuts for a database. Now, so then what's the challenge when you have a billion users, what else can be challenging? So let's say clients are sending heartbeats every 10 seconds, right? So in one minute you'd get six heartbeats. If there are 1 million active users, not total users, active users, then your system will get 6 million requests per minute. Now things are becoming scary. 6 million requests per minute. [check: possible ASR duplicate] And now for each heartbeat that you are receiving, you would have to go and update it in the database, which means every heartbeat that you are receiving results in one DB call, which means now your single database needs 206 million updates per minute. [check: "206 million" - possibly "to do 6 million"; 6 million said before and after] This is scary. Your database having to do so many writes, 6 million updates per minute, your database would start to choke.

[01:05:19] Now here is a classic case where storage is not a problem. Computation is. So you don't need large amount of storage in this database. The data needs are very small. 8 GB entire data fits in 8 GB. Right. But having to support 6 million requests per minute is a challenge. Right.

<!-- topic-candidate [01:05:44]: Connection pooling -->

[01:05:44] So now how do we make it better apart from all the sharding partitioning stuff, which we'll discuss in future. One thing that I want to bring out is something that very few people talk about is connection pooling. So we'll talk about sharding partitioning in coming weeks. So don't judge me on that. I don't know that part. This is one point that no one talks about. And I really want to highlight this, which is connection pooling. So here the key challenge is that storage is not a concern for this database. The concern is computation. The number of queries that have been fired. Each query is doing an update on the database. So one of the possible optimizations that you all should know about is called connection pooling.

[01:06:25] Now here, every request that is coming in is making one database call. Now this request from user, the post request is HTTP request, TCP connection. When the request comes in, API server creates a connection with the database and writes something. So this is another TCP connection. Now, for you to create a TCP connection, for your API server to talk to your database, a TCP connection needs to be established. In order to establish a TCP connection, the infamous three-way handshake is required. And then three-way handshake to set up the connection, two-way to tear down. So to set up a TCP connection, they have to do three-way handshake. And to terminate [unclear: "a dissipation"], they have to do two-way tear down. So five network trips for every single call. So which is where establishing this connection, the one line that we draw like this on the diagram, like this, without giving a thought, is an expensive process.

[01:07:27] Your API server need to establish the connection with your database. And this is extremely expensive because of the number of network trips that you are doing. So this is a problem. Now, how do you reduce this? This is the biggest performance bottleneck. When you are talking about micro writes, we are doing in the database, it just, every database call we are doing one update in the database, one row update in the database, right? And that is a pointed update. Given this, your database is doing the bare minimum, right? In the system, one update to one row indexed by primary key, right? These micro updates. So where is the time going? Most of the time that is being spent here is in establishing this TCP connection, which is an expensive process. So how do you solve it? Which is where, to make it better, to put lesser load on the database, we add connection pooling.

[01:08:20] So now what is connection pooling? Understand this. Connection pooling is where, because underlying it's all TCP connections. Who asked the TCP connection to shut down? Don't shut it down. Let the TCP connection be open between your server and your database. Given that the update that we are doing on the database is a micro update, which means you literally go to the database, update one row and come back. A lot of time is being wasted in establishing the TCP connection and tearing it down. So what if you create a bunch of connections, you have a bunch of, sorry, you have a bunch of connections handy in your system.

[01:09:01] Let's say my API server creates three TCP connections. My API server creates three TCP connections with my database on startup. When my database, when my API server starts, it creates three TCP connections with my database. It keeps them handy on the [?side | asr: "site"]. Right. Now, whenever I get a post request, whenever I want to write something to the database or fire a query to this database, select, update, insert, whatever. Whenever I want to do that, I can use any one of these connections, which is right now not being used by any other thing and to fire the query.

[01:09:44] So which means that how this all works is when the request comes in the server picks one of these three, let's say there are three available connections. It picks one of this and marks it unavailable, and I will also talk about implementation of it. But it picks one available connection and now this connection, because it is already established with the database, all it does is fire update query and get the response. It does not have to reestablish the TCP connections and terminate it. So it saves five network trips, three-way handshake to set up, two-way [?to tear down | asr: "to your job"], right? So it saves this five network trip. So literally one request and one response. That's all. This way you make your API call very fast, number one. Number two, you reduce the load on the database. But why load on the database would be reduced? The number of queries are same.

<!-- chunk_07 01:10:42-01:23:46 -->

**[01:10:42] Teacher:** Establishing the TCP connection is an expensive process for your database. Because when your network, let's say you are doing a three-way handshake, you're setting up the TCP connection. Your database has to read the packet. The first packet comes in, acknowledgement goes out, third packet comes in. It has to put the CPU bandwidth into processing it. Network bandwidth goes into reading it. OS buffers are used, right? So the cost of establishing a TCP connection is massive when it comes to this micro updates. Your database has to [?spend | asr: "spread"] considerable CPU and memory establishing this TCP connection and then terminating. So by having this connection pool where you are pre-establishing the connections and then just reusing them, you are saving your databases bandwidth, CPU, network, both and memory also. Not really memory, but actually CPU and network [?more | asr: "mode"]. You are saving the CPU and network, that additional work that CPU network would have to do, like your database would have to put in the extra a CPU network to do that, you are saving that, which would dramatically reduce the load on your database. Given that the updates are micro updates, like just one row update.

[01:12:01] This will give you not only performance boost in your client side response time, but also will reduce load on your database, freeing it up to do other to fire other queries. It will save your infrastructure cost. You would make your database much, much, much, much more perform just by adding this connection.

<!-- topic-candidate [01:12:20]: How many connections - minimum and maximum of the connection pool -->

[01:12:20] Comes another question. How many connections should you create? Now here with the connection pool that you have is when you define a connection pool, you define what is the minimum number of connections? What is the maximum number of connections? So minimum number of connections might be three. So we start with three. Let's say I got three concurrent requests. Each request pick one connection. They are firing it. Let's say that same time I got the fourth request. Now, when my fourth request would come in, it would say, oh, there are no available connections for me to use. What do I do? So here, the connection pool that you use. Now, database, MySQL, Postgres, Redis, everyone supports connection pooling. And there are libraries who manage it for you.

[01:13:05] But the idea is that how do you do? Let's say there are three established connections. Fourth concurrent request came in. It does not have a connection to make a call to the database. Now, what would you do? Either it would wait for a connection to be [?freed up | asr: "freedom"]. So which means out of the three queries that were running, if one of them releases the connection, the database would pick that up. That is first. Second is if it does not want to wait, then what it can do is it can establish a new TCP connection with the database, fire the query, and add this connection back to the connection pool. So after this, you do not have three connections in connection pool, but four connections in connection pool. So this is stretching the connection pool on demand. So which is where if let's say there are millions of requests coming in, everyone creates their own connections and adds to the connection pool, then that's a problem. So you don't do that.

[01:14:05] So what do you do is you have a maximum limit on the connection pool, which tells it, hey, minimum three, maximum 100. So each server cannot create more than 100 connections to the database, that you can configure on a connection pool. This way what happens is if 100 are being used and 100 is the maximum, if 101st request comes in, it waits for any one of them to release it. And then it uses. But now given that every database has a limit on the number of TCP connections that it can hold, the problem that creeps in is what if there are hundreds of servers all creating 100 connections with the database. Many active connections. So now what do you do? So it's a responsibility of the connection pool to terminate the connections that are unused. So you can also configure a time that says that this is the TTL of my connection. So if MySQL connection or if my TCP connection is not in use for let's say 10 minutes, terminate it. So this way, if there are four connections created from one API server to this database and if one of them is not in use for 10 minutes, it deletes it. This way, you reduce the number of connections on the database from a particular server.

<!-- topic-candidate [01:15:23]: Where the connection pool runs - implementation (blocking queue, a library, not a service) -->

[01:15:23] Now, where does this connection pool run? It's not a separate process. It's a simple TCP. When a server boots up, you create the database connection object that you create. You just create multiple database connection objects. As simple as that. You put them in a blocking queue and you read them as you need it. That's how the implementation of connection pool is. You can find connection pool implementation, a ton of them on GitHub. But the idea remains the same. All it does is creates multiple connections with the database, keeps them in a queue. It's a blocking queue. People make a call to the queue. If it has the entry, it gets it. It basically pops out from the queue. If it does not, it waits for someone else to put in. Until then, an infinite loop is run over here, which is the waiting part. So connection pool is not a service. For some reason, nowadays, everyone thinks everything is a service. No. Connection pool is a simple library that is running in the API server of yours, which is creating this pool of connections to the database.

[01:16:23] And this gives a massive, massive, massive, massive performance boost to your database and your response time. Why? Because here the updates are micro because all you are doing is just firing this one minuscule update where it is this one tiny minuscule update onto your one row by ID because this is also the primary key of the table, literally goes to that B plus tree node and updates it, right? Dead simple system. So you don't want to waste a lot of time into doing something this expensive to fire one micro. If it was a big SQL query, then the time to run that query is long enough for you to outweigh the benefits that you get from the connection pool, but here you'll get it because the updates are micro, you'll get a massive performance boost.

[01:17:15] And in any case, always, whenever you are writing something like this, not just online, offline, but see if you, if you are firing a bunch of micro updates on your database, having a connection pool and in general, having a connection pool is always a great option. So in case you don't have a connection pool in your existing code base, go see if you would want to add one, see the kind of benefits that you would get out of it. You might see a massive performance.

<!-- topic-candidate [01:17:40]: Same pattern for failure detection in a distributed system (heartbeats) -->

[01:17:40] Whatever we discussed with on and offline, you can literally control C and control V and build failure detection in a distributed system. Now there, here in online offline, your users were sending heartbeats. In a distributed system, all the nodes send a heartbeat to a central server that keeps track which one is alive and which one is not. For example, if you're building your own AWS, bunch of EC2 machines, you need to know when a machine is down. How do you know when heartbeat, when you don't receive heartbeat from that? And this exact same thing, some protocol differences here and there, but you can build a failure detection and distributed system. Right. Which is fair. Every single thing.

[01:18:18] That's why I always say, observe the pattern rather than the question and the answer that the system that we discussed is not just to do online offline, but it can just be a control C control V into a distributed system. When you have to want to do a failure detection and distributed system. Let's say we are building our own load balancer and you want to know if a machine, if a backend machine is [?down | asr: "done"], you don't want to forward the machine. What do you do? You want to detect failures, right? That, that's when you know, okay, I don't want to forward the request to this no machine anymore. How do you do it? The same system can work there, right? So observe the pattern, observe the core properties that we need and then build an intuition around building systems, right?

<!-- topic-candidate [01:18:52]: Questions on connection pool and online/offline -->

[01:18:52] Okay, any questions on this, specifically connection pool, in case you have, most people have questions or connection, that's why I'm just probing it. But any question on this on and offline part? Yes.

> **Student Question [~01:19:01] - Student 4:** Hey Arpit, so one question I have is, see, I that when you scale the API servers, you can always make sure that some TCP connections you can get rid of and give the connections to the other API server, right? But they'll one time frame where the number of connections will be more than the total number of TCP connections, right? So how would that seem like? Imagine it's a special event and it's a blocking, it will block, it's a blocking thing [check: possibly the start of the teacher's answer]

**[01:19:33] Teacher (answer):** because if your data, if you would want one more [?connection | asr: "collection"], your database cannot create because the TCP connection limit. If a database cannot let you create one more TCP connection, then this server that you are spinning up, the one that is trying to create this [?connection | asr: "location"] would have to wait. It will just wait. It will have this loop. It will keep on trying to establish the connection forever. And it will succeed when any one of the existing server basically terminates the connection with the database and then this server would get it.

> **Student Question [~01:20:01] - Student 4:** So that is a problem, right?

**[01:20:05] Teacher (answer):** So then you have to scale up your database to handle large number of [?TCP | asr: "PCM"] connections. Okay. So if you know that you, it's basically the size of the database depends on the number of concurrent queries that you would fire on it. Right. Because the, the concurrency that you would want to support in a system would determine the number of concurrent connections that your database would need to handle. And in most cases, the database is limited by, or the most common bottleneck of a database is the maximum number of connections that it can handle. So you need to know the maximum connections that it can handle. And if you want to support concurrency more than that, you vertically scale your system. Otherwise, you go for sharding. So sharding and vertical scaling are based, which we'll discuss next week. But these are two common ways to do it.

> **Student Question [01:20:52] - Student 4:** Okay, sure. And one last question. So if I'm going with Redis as a solution, most likely I'll be the one who, like, if I'm running my company, I'll be the one who will be managing it, right? So in this kind of scenario where I have to do autoscaling on the fly, don't you think DynamoDB will give a better value for the buck?

**[01:21:10] Teacher (answer):** If you are starting up, if you have a small team, you don't have ability to do that. You go for DynamoDB or any managed solution when you have a lean team. So that's where you would be more tilted to go towards DynamoDB versus Redis. If you have expertise, first of all, your team needs to have expertise to manage Redis. And I'm assuming self-hosted Redis. Expertise in managing it. If they don't, then you don't go for that option. Second, you find a managed solution for Redis. Let's say with Redis lab, AWS, GCP, everyone has some [?variant | asr: "varied"] of, you would use that. Right. The last, if you're having those team expertise and engineering bandwidth to manage it and whatnot, then you would do self-hosting. Otherwise go for a managed solution. You throw money at cloud providers and get things done.

**[01:21:55] Student?:** Okay, cool. Thank you very much.

**[01:21:58] Teacher:** Any other question, anyone? Hi, next time please raise your hand, it makes it easier for people to know when in queue, but it's fine, go on.

> **Student Question [~01:22:08] - Student 2:** Okay, so I had one question, like you said we can have a TTL expire in a connection, so at the boot up time if 100 connection are created and a few connection had expired. So in that case, for example, if 50 connections are expired and again, some, more requests are coming. So how does this happen again?

**[01:22:34] Teacher?:** It will be a TCP connection. They will create a new [?connection | asr: "distribution"] and add it to the connection pool with the same expiration.

**[01:22:41] Teacher (answer):** So because you would have a min and a max, right? Minimum number of connections, actual number of connections. So let's say maximum is set to a hundred, right? But now you only 50 but 51st request came in, so it would establish a new connection and put it in the connection pool.

> **Student Question [01:22:55] - Student?:** Okay, so every time there will be 100 connection?

**[~01:22:55] Teacher (answer):** No, at max there will be 100. Okay, that depends on the number of requests, the number of requests that are coming in. Okay. Okay.

**[01:23:06] Teacher:** Thank you. Yeah, Amrita.

> **Student Question [~01:23:06] - Student (Amrita):** Hi. So in a system like this, where the number of DB connections is like, we have more frequent DB connections.

**[01:23:21] Student?:** Yeah.

> **Student Question [01:23:22] - Student (Amrita):** Is this the factor to decide how we scale our DB, like rather than the how our data is present in DB, like is number of connections the important factor to decide the scale of DB?

**[01:23:34] Teacher (answer):** Brilliant question. Brilliant question. Why number of connections is an important factor? Because updates are very small, right? It's a key-value kind of access pattern.

<!-- chunk_08 01:23:46-01:34:18 -->

**[01:23:46] Teacher:** You are literally going at a place and literally just updating one row. You are not firing massive analytics query. Your reads are also simple. Given a user, give me the row. So given this, reads are very fast, writes are very fast or very small. So the bottleneck becomes network. So that's why we are overstressing on the number of network connections that we are playing. So in this case, where you have micro reads and micro writes, network typically becomes... And in network, establishing the TCP connection becomes a bottleneck.

**[01:24:21] Student 15:** Got it. Yeah. Thanks. Yeah. Yeah.

**[01:24:24] Teacher:** But in case you are firing queries that were massive aggregations, joining 10 tables, 15 tables, where your average time to execute a SQL query was more than establishing a connection, then you would not stress more on this. You'd focus more on the CPU side and the memory side of the database. Got it? Yeah. Yeah. Sure. Yes, DK. Yeah.

<!-- topic-candidate [01:24:48]: Q&A - how many concurrent connections a DB can handle -->

> **Student Question [01:24:48] - Student (DK):** Hi, Arpit. So my question is also somewhere around this that see, when we want to scale a database, it is either, I mean, what I've seen till now is that, you know, when, when memory is a limit or, you know, when scalability is the issue, but the point which you have touched base right now is about the maximum number of conflict concurrent connections with the DB can handle. So what is this concurrent connection? It is like mentioned something on the, you know, documentation of DBs or is it something like we have to benchmark that, you know, how many concurrent connections this DB can handle. And if it is not able to, you know, handle those connections, then I should scale it now. So what is that parameter?

**[01:25:26] Teacher (answer):** Okay. So the maximum number of TCP connections that a server, [unclear: "let's see added"] database is also a server, database is a process running in a server. Maximum number of connections that a server can handle depends on the RAM that it holds, depends on the network card on that instance. Now here, if I assume that you are using a cloud provider, let's say AWS. On AWS, if you're using RDS or any database, it gives you a formula that you can fire and see the number. Now it also shows it on the UI, the number of TCP connections that a database can handle. So if you are using a managed service, the managed services documentation would have this information that this size of database handles these many connections or these many concurrent connections.

[01:26:08] If you are doing self-managed, then do a benchmark. You pick a machine that is having high network capacity and then you do a benchmark to see the number of concurrent connections that it can hold. Now here, the number of concurrent connections that you can manage also depends on the kind of load that you are putting in. Because if you're having a very high sustained load on the database, it might not be able to fulfill that. So it's always better to benchmark and see. But in most cases you would have to go for an instance that is having a dedicated attached network card, maybe multiple of them. And every cloud provider has this special class of instances that offers you high network bandwidth for you to support large number of TCP connections. So these are the steps that you would want to take to find that limit that you have.

<!-- topic-candidate [01:27:01]: Four things to scale - memory, CPU, disk and network -->

> **Student Question [01:27:01] - Student?:** So overall there are two parameters to scale the DB. Concurrent connection and one is the size of the DB, when, when we start deciding whether we have to vertical scale it or, you know, horizontal scale it. So these are the two deciding factors, right, to scale a DB? [check: likely DK's follow-up; split point inside the 01:27:14 segment]

**[~01:27:14] Teacher (answer):** [?Mainly | asr: "many"] memory, CPU, disk and network. There are only four things in computer science. Only four: memory, CPU, disk and network. There is no fifth. Obviously, basically GPU I'm basically putting it in CPU, right? So these four things determine the scaling because there are some use cases which are CPU intensive. For example, high, if you are doing massive aggregations on your data, that's CPU intensive. There is memory intensive, where you're pulling in a lot of data that you would want to process, like massive joins that you are doing. Then disk, where you're storing large amount of data on the disk and that is becoming the [?bottleneck | asr: "border"] where you need, basically your data warehouse [unclear: "is followed to"] this category, where you have massive data that you are storing or doing massive processing, but the amount... And then becomes network, that your amount of queries that you would want to fire on a server is limited by the network capacity of that machine, or in this case database.

[01:28:14] These are the four parameters that we always have to think about. Everything else is just like [unclear: "focus, focus"]. Like, these four are the key things on which you define scaling, horizontal or vertical, because vertical scaling has a limit. But if you're building a good distributed system, make it horizontally scalable, which is where sharding comes up.

<!-- topic-candidate [~01:28:32]: Q&A - connection pool minimum and maximum size -->

> **Student Question [~01:28:32] - Student 7:** Got it. But yeah, thanks. Yeah. So do you have kind of share any idea how it's kind of build some intuition about when exactly to use, you know, connection pooling, number one, right? So you're saying always, always use, right? Okay, fine. So, okay. I thought that would be the answer. But anyway, so the follow-up question is actually, so how do you know, like, what is the minimum and maximum to set? Do you always set it to the server's capacity or is there, is there a way to [unclear: "swimming out"] or, you know, how many they are being kind of added to the pool, and you know, or we just leave it to the server? [check: "Got it. But yeah, thanks." may be the previous asker; "always, always use" may be the teacher interjecting]

**[~01:29:22] Teacher (answer):** Okay, so minimum typically people start with three or five, right? So, because anyway, you can create a connections on the fly. When your connection pool exhausted, you can create connections on the fly. Now, how do you define the maximum one for that? You need to know the maximum number of connections that your database can support divided by the maximum number of servers that you would have at any point in time. So let's say the maximum number of servers that you would have at any point in time is 100 and your database can handle at max 1000 connections, 1000 divided by 100, which means the maximum for each server can be 10. So [?simple math | asr: "simple max"] and you would be able to do that. So instead of setting it to 10, you can set it to 15. A server might get large number of requests than other servers. So then you can set it max to 15, because if your database is not able to establish a connection, then your server would anyway be waiting. So maximum is typically 1.2x of the average. That's the standard that I've seen, or rather that's a practice that I've seen, not the standard, but the practice that I've seen, 1.2x of the average.

[01:30:27] So maximum number of connections that your database can support divided by maximum number of servers that you would have. And that's how you can do it. But have the right telemetry, have the right things that you monitor, that how is your connection pool performing, what are the maximum number of connections that are, sorry, what are the number of connections in the connection pool at any given moment, what are the number of servers. If you give your production system one week, you will have those numbers on which you would be able to tune it better. But the best way to tune it is start with a conservative mindset, observe the metrics and then retune it. That's the [?funda | asr: "funder"] behind it. Does that answer?

**[01:31:12] Student 7:** Yeah. Okay. Thank you. *(admin)* The video was stopping for me. Your internet is a bit laggy, but I think my internet is in trouble. No problem. Sure. Thanks. Sure. [check: mixed voices - "Your internet is a bit laggy" / "No problem. Sure." may be the teacher]

<!-- topic-candidate [01:31:27]: Q&A - festival traffic spike and connection pooling -->

**[01:31:27] Teacher:** Rahul.

> **Student Question [01:31:29] - Student 3 (Rahul):** So basically my question is about, let's just say like tomorrow is a festival. Let's just say any, any festival and the number of users who are going to be online, like increased by [?2x | asr: "two weeks"]. Let's just say. Okay. So in that case, in that case, what happens is connection pooling actually kind of like messes things up. Like in the sense, like time to update, time to update in the database is more than the amount of requests that are coming. Okay. And that is happening just for the one because it's faster. So in that case, like, I'm actually kind of like confused about what should be the approach that we should take? Like, one of the things that I can think of, like, we can increase, vertically scale the systems that we have.

**[01:32:27] Teacher:** Always.

**[01:32:28] Student 3 (Rahul):** But like, I don't find it like feasible for just, doing it just for,

**[~01:32:34] Teacher (answer):** But then you reduce it also. Right. You scale it up and you basically bring it down, right? Because if you know that you would have to handle those much of requests, you'd have to do it. There is no way out. Your database needs to support those many concurrent requests that you are aiming for. If it's 2x, then you need to ensure first of all the database supports that, and then you would, then you would tune your connection pool in order to accept those many requests, right? So vertical scaling your database is obviously, there's nothing wrong in that, but over time, it's still day one, let a course progress. Over time, you will have answers to this. When we discuss flash sale, you will have a very good answer for this.

[01:33:14] But for now, vertical scale your DB to ensure that the number of concurrent requests that you would want to handle, you are able to handle that, first of all. And then you may have to tune your connection pool maximum, may not be minimum, but the maximum size of a connection pool, because if you are scaling up, your vertical scaling your servers also, it can handle large number of requests. So you will need a bit of tuning on that. Knowing the tech unit economic is very important when you are operating in real world. So have the right set of monitoring tools which helps you make this decision. Okay.

<!-- topic-candidate [01:33:52]: Break (admin) -->

**[01:33:52] Teacher:** *(admin)* Gaurav and Mohit, I'll take your question at the end. Now what we'll do is we'll take a break. And by the way, in every session, we take one break for five to seven minutes. Today we'll take a break for five minutes. We'll sync back at 10.40 and then next 20-25 minutes we'll discuss database and then 20-25 minutes we'll discuss caching, and this way by 11.30 we'll have everything done. We'll take 5 minutes break, it has been a lot, so

<!-- chunk_09 01:34:18-01:45:53 -->

**[01:34:18] Teacher:** *(admin)* Spend your time having a break, basically. Sip some coffee, have some water and we'll sync back at 10.40, 5 minutes from now, and we'll resume our discussion on foundational topics. Database and caching is what we'll cover today and other four we'll cover at the end. Bye. Okay, [unclear: "job"]. Thanks folks. See you folks at 10.40 in five minutes.

[gap 01:34:39-01:39:54 - no speech in recording]

<!-- topic-candidate [01:39:55]: Second half - foundational topics (six core components) -->

**[01:39:55] Teacher:** *(admin)* Great, we'll start with the second half for today and just quickly check on the mic. Okay, mic and output fine. Okay, let me start for the second half for today.

[~01:40:03] And what we'll do is we'll discuss foundation topic. So earlier I did not cover online offline indicator. I started from here, it become too theoretical, like, now scrap this, let me start with online offline, and so that we basically slowly move into, like, we are already into the groove of things. Okay.

[01:40:25] So foundational topics and system design, these are six core components of most of the systems, most, not all, most of the systems, which whenever we're designing a system, we have to think of this six components, right? Database, caching, scaling, delegation, concurrency, communication. We'll talk about two today. We'll talk about four tomorrow. So any system that you pick would have the six, not just online, offline. In online you may also see, you'll see this six. Any system we discuss, you'll always see this six key components or key design decisions that would have to make. Okay?

<!-- topic-candidate [~01:40:56]: Database - multi-user blogging application schema -->

[~01:40:56] So we'll understand database. Will start with database and then caching. Caching, five minutes, seven minutes thing, but we'll, over the course, like, along the course, we'll see a ton of use cases of caching and how to better it. But still, [?day one | asr: "day when"] we are just keeping things a little simple. So we'll talk it in, like, to get deeper understanding, we'll talk in terms of designing a multi-user blogging application, like Medium, right? So two things. We don't go build fancy Medium recommended, nothing. We'll keep it simple. And one user, multiple blogs, and multiple users in the system. That's it. That's all we worry about. Right? So one user can post multiple blogs and there are multiple users in the system.

[01:41:37] So now, for, to do, to have this, let's see how databases are designed for this and why are we design decisions. So we'll have two tables. One where we are storing all the users. Second is where we are storing all the blogs that are there. So users will have ID, name and bio. So ID is the ID of the user, auto increment ID. Name of the user is what you render there, and bio of the user, a small text, 128 characters something. And then you have blogs. In blogs you have ID, author ID. This author wrote this blog. The blog has this particular title. Blog has this body. This is the body of the blog. The blog was published at this date, and is deleted as a soft delete column, where if user deletes it, you just mark is deleted as true. Right? Standard schema.

<!-- topic-candidate [01:42:32]: Soft delete vs hard delete -->

[01:42:32] But now let's go into those details and importance of each of these fields. First, let's start with is deleted. Now in a lot of places, even in your organization, you will find a ton of tables having a is deleted column. Soft deletes. So why do people do soft deletes in database when database gives you delete query, right? What's the importance of doing soft deletes? Now soft deletes are extremely important to ensure the performance of your database. You'll say, [unclear: "are you deleted performance"]? How?

[01:43:07] So when you are deleting your entry, first of all, it's a hard delete. When you just fire a delete query on your database, it's a hard delete. It means you cannot recover that corresponding data again. So that's challenge number one. What if you'd want to recover what you just deleted? How do you do it? If you want recoverability in your system, let's say user deleted a blog, but then you would want to give them a way to recover it. Example, Google Drive. In Google Drive you delete a file, it goes into trash, and for 30 days it stays in the trash before, and while in 30 days you can go visit the trash and recover it, right? That is soft delete. So when you need recoverability, you use soft. First.

[~01:43:49] Second is archival. Archival is important because let's say user put in a ton of effort into generating this content, this blog. If user marks it as delete and you hard deleted, that rich data is gone. You could have used to train your machine learning models, build another ChatGPT and whatnot. And so you, when a user has put in effort, you don't want that to just delete. When users delete, you just delete, and you don't want that to happen. So what you do is when user says delete, you do a soft delete and run a job that pulls out this soft deleted rows and puts into S3 or any blob storage, so that you can do use it for machine learning recognition training purposes and whatnot. So when you need archival, even the user has deleted it, you're still putting it at different place, right? So archival is another reason why you would want soft delete.

[~01:44:45] The third one is audit. Like a fancy reason, fancy thing for... I have visited police stations because of this. So what happens is, see, when you work at startup, you have to do all of this. So what happened is a user registered a complaint against another user. Because, say, user A, user B. User A harassed user B online on the platform. User A harassed user B. User B filed a complaint against user A. Complaint went to police station. Police came to the platform, to us, asking, give us all the details of this particular user. What did this user do? What was the comment? What did they do? And all of that for us, because we are a consumer platform. We have to provide this information. Now imagine user A harassed user B online, post a very filthy comment. As soon as user A got to know that B has filed a complaint, A deleted it. Have not did soft deleted, but hard deleted the data. Evidence is gone.

<!-- chunk_10 01:45:53-01:59:17 -->

**[01:45:53] Teacher:** Police would not want that, government does not want evidence, because this was an evidence where it was an evidence of harassment. You cannot, you cannot give it up, which is why soft delete are important. Right? Very vague. You as an engineer would never think of visiting police station to do this. I visited police station giving justifications, printed copy of all the traces, handed it over to police, not even exaggerating a bit. And this is true.

[01:46:22] You have, when you are building a system, you need to know if this would require, if the entry that you're making in your database, would it require recoverability? Would it require archival? Would it require an audit? If yes, you do soft delete. Otherwise you do hard. Right? So always keep in mind, always, always, always keep in mind, whenever you're designing system think from holistic view rather than just thinking from this very narrow vision of building things, right? So you need soft deletes to get this, to do this three things.

[~01:46:52] But one bigger reason, not bigger, but one more reason to do soft deletes is that it is easy on your database. Now most storage engines of your database, they store the data in a B plus tree format. Now when you hard delete a row, the entry gets deleted from the B plus tree node, B plus tree becomes imbalanced, then this entire tree rebalancing needs to happen. And when that happens, your database spends a lot of CPU cycles rebalancing the tree rather than handling the request. So with soft deletes, your entry gets updated, your B plus tree node does not have to get rebalance because the entry still exists with this updated column. So this reduces the load on the database, which is why knowing the database internals is really important. That how your database is structuring the data, would soft delete help or not? You need to know answers of that, depending on which you can design the system. But in general, you would always see this practice of people doing soft deletes in the database or in the tables that they store the user generated information. This is the importance of doing soft deletes.

<!-- topic-candidate [01:48:00]: Column types - short text (varchar) vs long text -->

[01:48:00] Then the next thing is, here you see two columns, bio and body. So bio is a bio of a user, 140 characters. Body is a gigantic blog that a user has written. Now here, what I want to highlight is, I want to highlight the column type. So body is a long text format. Bio is a short text format. Now short text format and long text format. So this is what your database internally, you don't have to do it, internally does this.

[01:48:32] So in a relational database, and true for non-relational also, when you're storing large text, true for non-relational also, but with relational database specifically, it's easier to understand that when you are creating a column type, let's say your column was email, your column was bio, where it has limited number of texts. So what your database does is when you give a varchar type, it does a short texting. So what did this is, in a row based database, base, you would see all the data of a particular row staying together. And these are fixed width rows. So you can exactly know how big the row is, from which byte first column starts, from which byte the second column start, from which byte the third column starts. That's like exactly C structs that we know, or even with the previous example, when we know that it's four byte and four byte. So in eight byte, the first four byte will be this, the next four byte will be this. Similarly, in any table that you have, every row of your table needs to be a fixed length.

[01:49:33] With short text, when you define a text like this, it is a short text and it stays with the other columns of the row. While in case of a long text, what happens is it stores this long text in a separate disk location. Disk location, it's not network IO, on disk location, and store the reference over here. And this database does internally, you don't have to do anything over here, database does it. So when you define long text as a column type, it stores it like this. It stores the reference and stores the long text somewhere else. When you read it, it makes one DB, one disk call to read the row, another disk call to read this entire thing, right? So that is expensive reads. But with short text, when you read it, it gives you an entire row, so this text column is handed to you immediately. So it [?saves one disk call | asr: "says one disk column"], but then your row length or the size of the row is small with short text. With long text, with the size of the row is like, you have to limit the length of the row, because of which your long text, which is gigantic, you cannot have this big rows, so it stores it in a different place, so that it can scan very easily the rows, it can scan very easy. So again, this is...

[01:50:46] You don't have to do it. Your database internally stores that, you just have to provide a corresponding column type, long text and varchar. So varchar is typically we use. So email is a short text. Bio is a short text. First name is a short text. Last name is a short text. Blog body, comment. Right. Let's say if you are allowing 5,000 characters comment, 5,000 characters is 5,000 bytes. Imagine how big the row would get if you're storing 5,000 bytes over here. Waste of space. Right. So in such cases, you would want to know when would you want to store the data along with the other columns and when it is long enough for you to store it in a separate thing. So that's where varchar and long text, important for your DB to get performance out of, right?

[01:51:27] You're making your read slow, but you would say, but if I'm having this, I'm making two disk reads, but here I'm making just one. Why can't I always do this? So in the long text, what happens is you are more, if let's say this is a blogs table and this is a blog body that you are storing with the long text, you are very likely to read blog title, blog first few lines of it, right? Excerpt of the blog, image of the blog and whatnot. But will you want to render the blog body every time when you're rendering it? No, unless someone clicks on the blog and visits the blog page, then you need the blog body. Right? That's when you can make this expensive, this call to read it. Otherwise you don't need it. So in those cases, to keep your row size, always try to keep the row size to a bare minimum. To keep the row size or the document size to a bare minimum, you pick either short text or long text. So understand when you would want to use what. So when you have a very large column, a very large text, you would store it as long text. Otherwise everything is a short text.

<!-- topic-candidate [01:52:34]: Storing date time - published at -->

[01:52:34] The next one is an interesting one. The next column is published. Now published at is where you store the date time, that when was this blog published, but how are you storing date time? There are multiple ways to do that. And each one of them gives you different advantages. Now I'll tell, I'll talk about three approaches to do so.

[01:52:56] Now here, when you're storing date time, most basic way to store date time is to store it object. So every database provides you as a date time type of a particular column. Now this date time is a native data type of the database. Now when you have it, but when you think about it, if your database is storing data on the disk, it is serializing the data in some format and then flushing it. So now when you would want to read the date type, you read from the disk in a particular or format, convert it into a date time object and then process it.

[01:53:35] I'll give an example. Let's say I want to store 2nd April 22090136Z. So this is my date time as a string that I'm storing. [?Date time | asr: "At a time"] as a string is that I'm seeing. How it is stored we don't know. But when you want to store this date time in the database, your database anyway stores everything on the disk. So how would this date time be stored on the disk? Right now, one naive way to do this is to store this date time literally as a string on the disk. Right? So now when you're firing a query on a date time, when you want to read a date time, what will you do is you would read this string from the disk, convert. Now this is a string. Then you as in your database engine would have to convert it into a date time object for comparison.

[01:54:30] Let's say you fired a query, select star from blogs where published at is greater than now minus seven days. Means the blog that I published in last seven days. So now for it to do this, it would have to go through the disk, find the date time that are that old. How would it know on disk? It is stored as a string. This is an example. Every database stores it separately, but it's important to know how it happens. So if your database chooses to store it as a string like this, your database would have to go to every single row, read this string, convert it into date time object. So extract date, month, year, hour, minute, second, and then do the comparison. Because your language, let's say database is written in C++. It would have to understand, okay, this is year, this is month, this is date, this is hour, minute, this is second. Greater than, this is greater. If month greater than, this is greater, that logic, right? You would have to apply that logic there.

[01:55:29] So someone has to read this string from the disk, convert it into a date time object, and then compare it with other objects. This is expensive. So which is why, depending on how your database stores this data on the disk, it determines the performance of your database. And it's not that all database stores it as string on the disk. MySQL has its own format. Postgres has its own format. MongoDB has its own format. Some stores it in epoch seconds. Some stores it in epoch milliseconds. It all depends. So whichever database you are using, understand how it stores the date time on the disk. If you find it not performant enough, you tweak it. You don't use it. You find another way to store that information. That would be efficient for your use case.

[01:56:23] So [?storing date as a date | asr: "storing data as a data"] is an extremely convenient way to do it, because depending on the language that you're using, it gives you native [?date object | asr: "data object"] for you to do comparison. It makes our life very easy, but it may be suboptimal in some cases. So understand how your database use it. Understand how your database actually serializes and stores it on the disk. And then you take a call if you want to use [?date | asr: "data"] or not, time everywhere. It may ruin your performance. And there is a practical example of that where, or, or, or, or a practical situation where it actually happened and company moved it. I'll talk about it in two minutes. So understand it, right? How your data is actually doing it and see if fits your needs are.

<!-- topic-candidate [01:57:06]: Date time as epoch integer -->

[01:57:06] Other way, let's say this was slow. You know, what's the solution up with that. Right? So you may store date time as an epoch integer. So instead of storing date time as date time, you store date as integer. So you do it. So you create a column published at whose type is integer and not date time and you store epoch in that. A lot of companies have now started following this. Right. So what is an epoch integer? Epoch [?integer or | asr: "into our"] epoch timestamp is number of seconds or number of milliseconds elapsed since first January 1970. This is where the clock started ticking for us. Right. So you start this as an epoch second. You see what the integer value there.

[~01:57:48] Now, if you look closely, if hypothetically, let's say a database was storing date time as this string on the disk, look at the number of bytes it would require to store this string on the disk. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20 bytes. The string as it is stored, 20 bytes it is requiring to store this, but this exact same information can be stored as this integer, which takes four bytes to store. From 20 bytes to four bytes, massive space gain, right? Date time has become performance. So this is efficient, optimal, lightweight, but not at all readable. Looking at this number, you cannot tell what time is this. Correct? So looking at this, you cannot tell what.

**[01:58:44] Teacher?:** *(admin)* Right, just a minute, my battery went off.

[gap 01:58:46-01:59:17 - no speech in recording]

<!-- chunk_11 01:59:17-02:10:48 -->

**[01:59:17] Teacher?:** *(admin)* Let me check on the mic in this.

**[01:59:24] Teacher:** Got it. Okay. So the first option that we had was date time was very readable. Looking at this, you can exactly tell what date, what time, what, what, what the date. I was looking at this number. You cannot tell what that was. Right? Readability, but it gives you performance. It is very lightweight on index. It's just integer comparison. So reading this, you are just reading an integer and comparing it. Most efficient operation for your database, for your disk, for everything, for your computer in general. Reading this, you have to create a complex object having multiple attributes and then you do comparison. So this is extremely lightweight, extremely optimal, all things good, but it takes away readability, right?

[02:00:04] But a lot of people choose to store date time as epoch integers in integer columns, right? Because you get a lot of benefits out of it. Now there is a third way where what if you relax some constraints, you need readability, but then you also need performance. So this is very specific to a company. So what happened in 2016? In 2016, Redbus is where people do bus booking. They were having a table which stored date time as date time. And this date time was becoming the performance bottleneck because it had to do massive date time comparisons and it was slowing things down to the core. So what they did is they wanted to move. So first of all, they were like, hey, can they move to an epoch integer? If they moved to an epoch integer, they lost readability. Readability because the way they were using it in their [?IDEs | asr: "IDs"], in their SQL [?IDEs | asr: "IDs"], in their UI, they were like literally rendering it as is. So now they were very used to in debugging it that way. Right. To lose out on readability when they use native [?IDEs | asr: "ids"] to look at text.

[02:01:11] So they wanted readability and this. So what they knew is they did not want time level granularity. All they wanted was date level granularity. So they were not using time type. They were just using date. So what they did is they stored date time as integer return in this format. So YYYYMMDD as an integer, not as a string, as an integer. So 20220402. So they relax the constraint. They said, hey, we don't need time. What we need is we need date. So we would store it in a format, which is custom format, very heavily optimized for their use case. So they get readability because you can looking at this, you can tell it 2nd of April. They get benefit because they get performance because it is integer. Integer comparison, integer index, lightning fast. Right.

[02:02:07] So be open to alter some things. There is no hard rule that you have to use date time as data. There is no hard rule that you only have to use the [?epoch integers | asr: "app of integers"]. Be creative with your solution. And that's where the next level of optimizations come. So these are three ways through which I would want to put forth how date times are stored. So date time has its own advantages and disadvantages. Date time has an epoch integer on advantages, disadvantages, and date time as a custom format, as an integer like this has its own, and you can change it to however you want. I just give an example of Redbus, which I definitely know because one of my friends did that. So an example of that, right? So being open to changes, being wary of the fact that do you need readability? Do you need performance? Do you need convenience? What do you want? Right. Depending on which you pick the corresponding type. Right. Okay.

<!-- topic-candidate [02:03:00]: Questions on storing date time (custom format, time zones) -->

[02:03:00] Any questions on this database?

**[02:03:08] Student?:** Yeah.

**[02:03:15] Teacher:** *(admin)* You're not audible. Let me check if it is me or you. Hello. Yeah.

> **Student Question [02:03:20] - Student 3:** Sorry. Yeah. So I didn't really understand what is the benefit you explained in the custom format. So if they wanted, because what I think is, this is really inflexible. If for whatever use case, they'll need timestamp in future, they'll have to do.

**[02:03:35] Teacher (answer):** They knew they did not. Right. They knew they did not. [check: possible ASR duplicate]

**[02:03:39] Student 3:** They could have, they could have also stored as an epoch. What you mentioned in the second step, right? But it's not readable.

**[02:03:45] Teacher:** They wanted readability.

**[02:03:46] Student 3:** I mean, this is a, this is a simple parsing function in the app side, like client side.

**[02:03:52] Teacher:** They did not want to. It's their decision, their company.

**[02:03:56] Student 3:** Want to do it, okay, but I mean, there is no performance improvement is what I'm saying.

**[02:04:00] Teacher?:** And then integer, integer, right? You get the same benefit. Correct? Yeah, that's what I'm saying, there's [check: segment may mix Teacher and Student 3 - "that's what I'm saying" sounds like Student 3]

**[02:04:07] Student 3:** No performance improvement. It's just what, from here to here there is. Yes, there is not. Yeah, correct.

**[02:04:15] Teacher:** Correct, that's all. Yeah, yeah. And it's their company, their use case, and I've seen a bunch of places where people have used custom format, I cannot reveal it because it's proprietary information, where you don't want to do either this or this, but go with something like this.

**[02:04:30] Student?:** Got it. Yeah.

**[02:04:35] Student 8:** Hi, I think with the first format, you also capture the time zone information, which is a little bit lost in second and third one. So I think that needs to be taken care while designing what scheme you want to use.

**[02:04:51] Teacher:** You get something, you lose something. But in any case, if you store it in Unix time zone, you store it in Unix format, depending on where the time is rendered, you can pick the local device system and render it in that. So if it's only for the viewing purpose, you can very easily do it. So in that case the, that

**[02:05:13] Student 8:** Same long value for that epoch time zone that represents different time in different time zones, right? So in that case you need to be especially careful, like that you take everything in UTC. Yes, yes, yes. Like I've burned my hands with this, so that's why. Yeah, everyone, everyone has been [check: crosstalk - "yes, yes, yes" / "everyone has been" may be the Teacher]

**[02:05:37] Teacher:** Through this. But see, you need something, you, you go for it, right? It's not that, it's not that this is better than the both, right? It's always that this has its own trade-off, this has their own [?trade-offs | asr: "redops"], this as they don't.

**[02:05:47] Student 8:** Yeah.

**[02:05:49] Teacher:** So, got it.

> **Student Question [02:05:52] - Student?:** Hi, so in the example that you just mentioned, why Redbus, Redbus didn't use date time as [?an epoch integer | asr: "a pocket teacher"]. Was it only for development purposes?

**[02:06:00] Teacher (answer):** No, no, no, it was production for a use case and I cannot reveal the use case. It was for a use case. They wanted it to be date. It was more of analytics use case, not for transactional systems, but date time was creating the havoc. It was becoming the bottleneck. They went with custom.

**[02:06:16] Student?:** Got it. Thanks.

<!-- topic-candidate [02:06:19]: Question on soft delete and tree rebalancing -->

**[02:06:19] Teacher:** Surya?

> **Student Question [02:06:20] - Student 5 (Surya):** Yeah, I have a doubt on the previous slide on the soft delete part, right? Like where you mentioned soft delete reasons are this. And one of the positives that you said, like, easy on the database engine, but eventually when you consider soft delete, right? Sometimes you never do hard delete. In that case, it perfectly makes sense in the tree balancing and stuff. Example of Google Drive where eventually you will do the hard delete.

**[02:06:51] Teacher:** Yeah.

**[02:06:53] Student 5 (Surya):** So in that case, like, that rebalancing is not really a benefit, right? Eventually after 30 days, you are doing the hard and a database has to do the rebalancing anyway. So it's beneficial only if you are in that soft delete state forever.

**[02:07:08] Teacher (answer):** No, no, no. I'll give you another example. So when you are, let's say you are doing hard deletes every time. Now what would happen is every time you do hard delete, you would have to rebalance. There's a very high chance that worst case, every delete requires you to do rebalancing. But imagine you have accumulated a bunch of soft deletes and you're deleting all of them in one shot. So [?database | asr: "DataWare"] has to do rebalancing once versus many times. So what you are saving on is you are clubbing all the tree rebalancing into one, doing hard deletes across all, so that your database rebalancing happens just once or rather few, or, basically fewer times than not. Okay. That is the advantage that you have.

**[02:07:54] Student 5 (Surya):** That, that still means that, let's say it, we take the example of Google Drive. So that means you can do the batch of all the hard deletes over a day, but you cannot even club multiple days. Okay. Yeah.

**[02:08:07] Teacher:** So basically doing staggered deletion and in a batch way, rather than doing a time. So if you do pointed deletion, you might have the worst cases, you would have to do rebalancing every time. That's the worst case, right? But when you are batching all of those and doing hard deleting one shot, and let's say basically delete 100 rows at a time and then committing it, so for 100 rows one rebalance, right? So you are slashing the number of rebalances by a factor of 100 by batching it in the size of 100. That's the advantage of it, right? Okay, I'll take one more question before we move to caching. Sandeep, go on.

<!-- topic-candidate [~02:08:39]: Question on epoch integer range (max out, MySQL date time storage) -->

> **Student Question [~02:08:39] - Student 4 (Sandeep):** Yeah, so that's my question is regarding the date format that you mentioned other slides. So here you mentioned that the serialized format and then in the form of a string and then you talked about epoch, right? But don't you, epoch, that number is increasing so exponentially, very soon you're going to max out on int, then you have to go to double, that will be like 64 bit. So I was thinking the epoch is the worst time format, the second worst serialized, and the third, it's not worst, but, but still on the worst, it's very limited, it's very limiting, third. Yeah, so yeah, that's, that was, I was thinking, but then when you're describing you said that, you know, epoch integers are always better. So I was just wondering.

**[~02:09:24] Teacher (answer):** No, no, but still your point is very true. Like, for example, it, right now it is four bytes. As soon as we hit 2032 is when we would limit, where we would basically max out, right? We would max out the range of integer. Right. Yes. So, for what integer. So now what do we do? So from [?four bytes | asr: "four by two"], we move to eight, but then it suddenly doubles the space required to store date type. Right. Yeah. So which is where a lot of databases have thought it, to go through MySQL documentation on how they store date type. So what they do. So one thing, if we start the date time from first January, 1970, what if I want to represent a 31st December, 1969 minus one with, if I do it with an epoch integer, I would have to represent it with minus one. Correct. So then that's wrong. That's wrong on so many levels. Right.

[02:10:15] So in that, but if you store it this way, you are, you are gaining something or losing something, but if you'd want to store date time as date time, what if you have another way, which helps you, which allows you to cover the entire spectrum of datetime, not limited by the size of integer, it would take a little extra space. Let's say eight bytes, not eight bytes, but rather six bytes, but it can store it in a very compressed way. So what I would recommend is go through MySQL's datetime documentation

<!-- chunk_12 02:10:48-02:21:32 -->

**[02:10:48] Teacher:** And see how beautifully MySQL stores this information. It's mind-blowingly awesome the way it stores it, from BCE to, you know, no matter how many years, I think it supports still 20,000 year. Most only 20,000 is the max that it goes. It can handle up to. Human race has gone by that and 100%. But it covers this massive spectrum with a very limited bytes. So MySQL date time, explore that. Read the official document. Don't read some blog or video or random person. Official documentation. Because in that they have mentioned why they took that particular decision on storing the date time in a serialized way without storing it in integers, but still getting good enough performance. So it tries to balance both worlds. Okay.

**[02:11:47] Student 7:** Okay. Thank you very much.

**[02:11:49] Teacher:** Yeah. Yeah.

<!-- topic-candidate [02:11:51]: Caching -->

[02:11:51] We'll move to caching. Then after this, we'll again have a quick question. And by the way, caching is very smart, but very interesting assignment, assignment, a very interesting discussion I've got to trigger tomorrow morning. For that, I'll cover this. So caching, most, God, people have so many confusions. Like people misunderstand caching a lot. So caching is not just in-memory caching. Always remember, what is caching? Caching is anything, literally anything that helps you save a heavy computation. Simple. Anything which is heavy operation or heavy computation, you save that caching for you. So that you don't have to go. Dynamic programming, memoization is caching. Classic caching. So a lot of people think caches, they think RAM. Who said we only have to use RAM for caching? Caches are not only RAM based. You can use disk as a cache. You can use network as a cache. Anything that is worse than that you are saving it, that becomes a cache and you can just basically refer to it to in order to not do that expensive computation, expensive operation, expensive IO.

[02:13:04] So typically what caching uses is it helps us reduce disk IO or network IO, right? So when you're saving disk IO, you may obviously think because RAM is faster than disk, we cache it in RAM. And that's what we are always used to, that caches are RAM, RAM are caches and what and what not. But what the core idea is, we are saving this expensive disk IO by caching the computation in RAM. But what if you had an expensive network call? What if you cache on the disk and you refer to that local disk rather than making that expensive network call? That is also possible. There you are saving an expensive network IO. Right? So understand this part about caching. Caching is literally anything. Anything which can help you save an expensive disk IO, expensive network IO or expensive computation. All three. See, as I always say, computer science has four things. Disk, network, CPU, RAM. RAM like we typically think in that way, so any expensive disk IO, any expensive computation, any expensive network IO you save, that is a cache for you, right? So that you can refer to it, and it's not just RAM based. So be very creative in finding usage of caches. So caches in general are just glorified hash tables, that's it. Key-value hash table, that's it, right? And with some, and if you're using Redis, it has a bunch of advanced data structures like HyperLogLog, Bloom filters, geospatial queries and whatnot. But that then just hash tables, key values, nothing more than that.

[02:14:47] In our blog example, what we typically place the cache is we typically have a remote cache that can be communicated that any API server can talk to. Any API server can talk to that and it logically sits between your database and your API server, but physically it sits over here. For example, when I get a request, request comes to API server, API server first checks the cache, if it has the data it returns it back. If it does not have the data it goes to the database, reads the data, puts it onto the cache and forwards it back to the user. A standard cache use case. Having a remote cache helps us ensure that no matter where the request goes, they all go to the same cache to read the data. There is just one copy of data in the cache and everyone reads it. No matter where the request goes, you can go and read and send it back. By adding this cache, what you are saving, you are saving an expensive database query, the load on your database, because the queries are now answered by your cache. So reading a blog, get a blog, let's say a blog is popular, doing that expensive three four table join on database to [unclear: "grid"] that blog data again and again puts unnecessary load on the database. So that's why you cache it on the, in your cache, in your centralized remote cache. So request comes to [?API | asr: "a pay"] for the blog, goes to cache, returns it back, right? Much, much, much faster and efficient. So much, it would reduce the load on your database by a massive margin, right? So again, cache is reducing the load on your database by helping you reduce an expensive network IO, right? Obviously it makes network [?IO | asr: "i"] over here, but reading from the cache pre-computed is much faster than going to the database, recomputing it and sending it back, right? So always remember, cache is anything that is helping you reduce an expensive disk IO, network IO, computation, right? Anything.

[02:17:00] Now tomorrow, and by the way, this is what I want to talk about caching. We'll build distributed cache, remote cache, key-value store, there we'll go into details of it, like third week, fourth week, fifth week, we'll go extreme details of building a cache and then a lot of internals will be covered, and also tomorrow also. But the core idea is that a lot of us have anyway used cache, so we'll go into very granular details of it. In first day we'll talk about it in very detail, extreme detail, eviction, LRU, [?LFU | asr: "lf"] and whatnot, right, when we design one. But what we want to do tomorrow, first thing, first 30 minutes we'll spend time talking about this. Now this is one discussion that I always look forward. What this leads to is, in the third cohort, fourth cohort that I had about two years back, we had the same discussion where what we wanted to do is we wanted to find all possible places that you can use as a cache with an example. So this is a very common architectural diagram. Think about all possible places where you can cache something and it should reduce something. So we spent time 30 minutes talking about different use cases around it. And one approach that came up in that discussion, that person worked at Goldman Sachs. He took that approach, proposed it to his manager. Manager approved it and they saw significant, like massive performance boost by this. They did not think of this use case. Hey, he can also cache here, right? And this is what is importance of this discussion.

[02:18:41] So what we will do tomorrow, first thing for 30 minutes is we'll have discussion. So spend some time today going through this, find possible places where you can use as a cache with an example. Folks who raise the hands will pitch one use case, one place where they can use as a cache and what problem it solves. Right. And one example that is there is centralized cache and application level cache that we talk about. Advantages is everyone goes to, talks to one to do it, it saves expensive DB call. So that is one. So it helps us save expensive DB computation and we got your cache against application level information there and every API server talks to it. That is one place. But find other places where you can cache. CDN might be one. Load balancer might be another. Think on those lines. Where you can cache, what you can cache, and what problem it solves. Tomorrow we'll have this discussion around it for the first 30 minutes. And this hopefully sparks a lot of interesting, or it would help you understand a lot of interesting, quote unquote, hacks that people have applied to get the maximum performance out of their system.

[02:19:52] So we'll talk about it. And again, like always, everything will have a trade-off. So when you use something, some place as a cache, you get something, you lose something. So we'll have a lot of trade-off based discussion tomorrow for 30 minutes on this. And after that, we'll discuss on the other four components of foundational topics with the same example. So concurrency, communication, scaling, and delegation. We'll talk about that.

<!-- topic-candidate [02:20:16]: Questions on databases and caching -->

[02:20:16] Any questions on this? Database caching, anything that we discuss in the second half. Rajiv?

> **Student Question [02:20:22] - Student 6 (Rajiv):** Yeah, Arpit. So I was also under an impression that caching should be in RAM. So now you just say that's something which avoids heavy computation is caching. A separate cache component. Why can't we put the expensive computation DB itself and go and search the DB table, whatever is pre-computed.

**[02:20:42] Teacher (answer):** And then that is a possible place. That is a possible place. And which, uh, whatever things that we'll discuss tomorrow. And why not this? Right. So always have this question. Why not this? Why just this? Why are we, why the entire world is obsessed with just storing it in RAM? Why there is so much of misconception around it. See, entire business should work. Add in your products should work. Add in your products should be performed. However you do it, you do it.

> **Student Question [02:21:09] - Student 6 (Rajiv):** One thing more question. This is like the first slide, offline online indicator. We use DB.

**[02:21:15] Teacher:** Just a minute. First, let me just cover all the questions on this. Then we'll go back. So that basically there is no big context, right? Any questions on the second half of session where we cover databases and caches? Anyone?

<!-- chunk_13 02:21:32-02:34:42 -->

**[02:21:32] Teacher:** Take one. I'll count it. Hi. Hi. Got. I'm going to raise your hand. [check: high speaking rate, possibly garbled] Okay. Go on. Okay. Sorry. Yeah. [check: "Hi", "Sorry. Yeah." may be the student]

> **Student Question [~02:21:44] - Student?:** So basically in the client side, when we use local storage, so that is, that also comes in caching means to store something.

**[02:21:52] Teacher (answer):** Let's, let's, let's have those discussions tomorrow around that. Like, because we'll have, because this is what I would want to come from you on. Right. What are different places where you can cache it? Okay. So tomorrow we'll have exhaustive discussions on that. Like what is cache? What is not? What are we caching? How did you, because everyone would be there. Everyone would be prepared and then it would just spark those things in their head. Right. And I want everyone to experience that. That's it.

**[02:22:18] Student?:** Okay.

<!-- topic-candidate [02:22:19]: Q&A - soft delete cleanup, GDPR right to be forgotten -->

**[02:22:19] Teacher:** Yeah. Ajay.

> **Student Question [~02:22:21] - Student (Ajay):** Hey, hi. So I had one question related to the database and where we are using soft delete. So if you're marking like a lot of recall records to the soft delete, so it, it will like increase the database size. Right.

**[02:22:35] Teacher (answer):** So. Correct. So you would do periodic hard delete stuff from that. Let's say once a day you pick up all the soft deletes and you do hard delete on it.

**[02:22:44] Student (Ajay):** Okay.

**[02:22:44] Teacher:** Or, or move it to somewhere else. Like that's archival. You move it to somewhere else. Okay. Thank you. Got it. [check: "Thank you. Got it." may be the student]

[02:22:53] For soft deletes, when can you move an item which is soft deleted to hard deleted? Because it's very subjective. Let's talk about Facebook. The users, when you want to hard delete them, does it have to comply with the guidelines, or is it Facebook? GDPR compliance, right to be forgotten. GDPR says right to be forgotten. So if user files a case, with not a police case, but if it files a ticket with Facebook saying that I want to exercise my right to be forgot and please delete everything that you have for me, Facebook has to do hard delete of it in one month's time. So they would do physical hard deletes of everything that a user has ever created on the [unclear: "truck"]. What if that user had harassed someone? What if that user? Had harassed someone.

[02:23:40] So then, no. So it's not that they have to do it immediately. Right? Facebook has that time. One month, two month time to delete all. It gives you the breathing space to cover this use case, and if someone has [unclear: "had a so immediately pull this company"], but in any case [unclear: "fii"], uh, logs have everything, right? So from there you can extract the data. So the PIIs would be deleted immediately, but there are hacks to, uh, recover something. So for example, Atlassian has this mega outage where they deleted the data and it took them 14 days to recover, right? If someone has physically hard deleted the data, how were they able to recover it? As per GDPR compliance, right to be forgotten is right to be forgotten. If you hard delete, you hard delete. But it's still, Atlassian was able to recover it, which means that no company is hard deleting all the data that was ever created on the platform, right? They are just hard deleting for the sake of compliance from a specific places which are tracked. Logs may everything is there. They're just replaying in snapshots.

[02:24:43] So for example, if you take daily snapshots of your database and if a user says I want right to be forgotten, will you go and update all of your snapshots? No one does that. So your data is anyway there in historical snapshots of the database. No one is deleting them. But from your transaction system, there would not be any trace of that. Thanks. See, these are all hacks. Legal team helps you with this to navigate through this compliance part, to maximize what you can. And I build GDPR, so I know all these hacks. It took me two months to make the entire [?org | asr: "or"] GDPR compliant on this. So I implemented all this infrastructure level thing. So that's why it's not fake. And I'm not making this up. I had to do it. That's why I know it's in these details.

[02:25:31] So what is GDPR? GDPR is the compliance that tells you this, that if user can exercise right to be forgotten. So I can go and ask Instagram that I want to delete everything from your system. I want to be forgotten from your system, that if a user like Arpit ever existed. So they have to hard delete all of your data. So GDPR enforces that on every single organization. Every single.

<!-- topic-candidate [02:26:02]: Q&A - compression in cache -->

[02:26:02] Rahul?

> **Student Question [02:26:04] - Student (Rahul):** So my question, simple one. So do we implement compression on the caching side of things, like to reduce the amount of data that we are caching?

**[02:26:17] Teacher (answer):** Depends. Because then you are, then you would, then your trade-off comes in. Decompression. Decompression is a trade-off, right? So if you, what you are caching is gigantic, let's say blob, massive text blobs, right? And the time for you to decompress and read is less than time for you to and is less than the time that you spend in just reading it and basically requiring that extra amount of memory to store that, right? So you do the trade-off analysis and see if you want to compress or not. But then compression, cache will not do compression for you. You have to do it on the application. Most caches are just key value, right? So you'd have to compress and store and read and decompress and send.

> **Student Question [02:27:04] - Student (Rahul):** So like, is there any, like, is there any cache which you like does compression by storing the data itself?

**[02:27:11] Teacher (answer):** I think there would be plugins for most of the caches out there that does compression, but not sure of any. I've never used, I never found a genuine use case where I'm storing massive data in cache, like massive data as in a data with massive, because for a small field, like let's say email ID, I would not get performance boost. If I do decompress, I would actually lose performance. But if I'm storing entire [?blog | asr: "block"] body in cache, it might be helpful, because if let's say data itself is 10 KB, which is not very unusual, then compressing it and storing it in let's say one KB would be a huge benefit for me. So those are the use cases where I can go for compression. I've never used it personally, but there might be something.

**[02:27:53] Student (Rahul):** Actually, I asked this question because like, there are sometimes like people store videos or a part of videos or like some kind of images in cache, like depends on the service that we are using. Let's just say Instagram, for example. Okay. They, they would have caches around the world for the data to be like, transferred to the

**[02:28:18] Teacher:** CDN said they would be distributing it, but you can compress this. [check: "CDN" may end the student's sentence] So there is nothing that is stopping you from not doing compression. You can do it. You cannot do it. It's there, but there would be plugins. I'm not sure any cache out of the box supports that. Not really sure. Because most caches that you see are in memory. So not sure if they do this or not, but then definitely has a cache does not support that. There has to be a plugin that does that, or it's as simple that because you are the one who are storing it, just do compression on your end. Why should cache offer it out of the box? Because, because, now that I think of it, cache should not give you that option.

[02:28:58] Because you are wasting network bandwidth to transfer 10 KB of data, which is eventually getting stored in 1 KB. If you do compression on your end, you're just transferring 1 KB of data. Much more beneficial. Got it. So, caches should never offer you compression out of the box. It should be your responsibility, logic that would do that. So you're thinking of saving space in memory, but the amount of data that you would transfer that you transfer over the network would be huge. Right. So save that directly now. So compress on your end, send it, [?store it | asr: "story"], receive it, decompress it and return.

**[02:29:35] Student?:** Got it.

**[02:29:37] Teacher:** See, that's why I love this question, right? It just made me think on those lines. Thanks.

[02:29:43] Thanks. Thanks for asking this super question. And yeah, folks, keep things in mind like these, which is why I love these questions, right? If this question was not asked, I would not have been, like, it would be hard for me to even cover all these use cases, right? Even I don't know, it's just from experience that when someone asks, I have answers to that, right? So keep asking questions, it just helps everyone, right? But a great, great, great, great question. Amrita.

<!-- topic-candidate [~02:30:05]: Q&A - soft delete cron job and downtime -->

> **Student Question [~02:30:05] - Student (Amrita):** Yeah, so my question is around the soft delete. So if we have a service to be highly available and we have a cron job, which will delete the soft deleted entries. So what would be the alternative instead of maintaining a cron job? The service is supposed to be highly available.

**[02:30:30] Teacher (answer):** Cron job has nothing to do with availability. So are you saying your cron job needs to be highly available?

**[02:30:36] Student (Amrita):** So basically, like I was cross question, this is in an interview where I told the interview that I can run a background service which will delete the soft marked entries. He said, but there will be a downtime when you delete the soft deleted entries. So how will you handle that?

**[02:30:54] Teacher (answer):** Why would there be a downtime when you delete a soft deleted entry? Why? There would not be any downtime in your service when you're deleting, when you're just doing hard deletes, why would there be a downtime? There is no reason that because of your delete, it's a hard service can intermittently go down. That's a different problem. Job, your main service cannot go down. Why would it go down? You do stagger deletions. You would do it at a linear pace. Why? Why would that go down?

**[02:31:23] Student (Amrita):** Like he mentioned something around locking the table entry.

**[02:31:28] Teacher (answer):** That's not going down. That's just about being strongly consistent. That's strong consistency you're talking about. When you're deleting, you need to lock and delete rather than directly deleting. Because then you don't want stale reads to happen on your database. That entry is deleted but you are still reading it, that should not happen. So basically that strong consistency you're talking about, and not availability. Okay, we'll talk about strong consistency next week, uh, next week, uh, Saturday, when we talk about databases. We talk about strong consistency there, a bunch of things will be covered there. Rajiv.

<!-- topic-candidate [~02:32:01]: Q&A - Redis cache vs DB table for pre-computed results -->

> **Student Question [~02:32:01] - Student 6 (Rajiv):** Uh, Arpit, going back to the, which I asked, right, to, to put the cache results in DB. So from QPS perspective, let's say I don't, I have, might have a wrong notion about this. So let's say we have a Redis, Redis cache. We have deployed where we hold results. And then we have a DB table, which holds the result. From QPS perspective, reading both of both from them is same. Is it, or any one of them is course better than that. That's the reason we put Redis or as a,

**[~02:32:33] Teacher (answer):** Let's approach this from first principle, great question. Caches, let's say you store the exact same information on your Redis, and like the pre-computed result on your Redis and in your database, right? Now from an application server, both have persistent connections, Redis also and your relational database also, so that is negated. So equal, equal, you, you, you don't get any. Next is when you are getting a value from memory, when the request comes to your Redis and Redis wants to read it, it's there in the memory, right? Here, when it comes to your database, it goes to disk and reads it, right? Would store that information on the disk. So when it reads from memory, here it reads from the disk.

[02:33:17] Now, depending on how much of data are you reading, right? You would know that if reading from the memory is fast enough or not versus reading from the disk. If it's very small read, it might be very in, uh, it might be very significant difference, because the time to read from the disk, uh, let's say less than 10 or 15 bytes of data to read from the disk versus 10 or 15, uh, 10 or 15 bytes of memory will be much faster, because this guy is humongously slow when you are reading small reads. But if your reads are large, let's say one KB RAM and one KB disk, when you do this, then your time spent on reading it is not that huge. So you would get minimal difference. Like there would still be, this would be like a Redis would still be a little faster than this, but not humongous. Like you would not see massive difference.

[02:34:08] Next part, how your database is actually reading. Your disk based databases stores it in terms of B plus tree. It would have to do the traversal, the disk traversal to reach till that point and then read it. Right. So it's not just one disk read that is happening. It is one, two, three, depending on the number of rows that you're putting in, log of n would be the reads that it would have to do. Right. So that is the additional [?cost | asr: "cause"] that you are bearing, but with in memory, you get it in one shot because it's hashed in memory. Next part.

<!-- chunk_14 02:34:42-02:45:51 -->

**[02:34:42] Teacher:** Now here, given that the data is in memory, you are immediately just reading and serving it. Here, that is not the case, but because you're storing in memory, the cost that you would require is high. The amount you can store is limited by the RAM and not by the disk. With database, the data is limited by the disk and not the RAM. So you will have larger cache on disk versus a smaller cache in memory. Decide.

[02:35:13] So it's very subjective. So what you're reading, how much are you reading? How your data is stored? How many IOs would happen? What are you actually getting as an advantage? How much of data are you storing? These factors you would have to think about when you make this decision, but overall not much difference. Yeah.

**[02:35:33] Student?:** As it is, right? Given that a pre, that, given that your computation that you are saving is humongous.

**[02:35:39] Teacher:** Right.

**[02:35:40] Student?:** Right.

**[02:35:42] Teacher:** [unclear: "gates"] Yeah. And yeah, RAM is more expensive than disk, so that is the biggest factor.

> **Student Question [~02:35:48] - Student 6:** Uh, one more thing before. So there is some cost we, we pay to, to, uh, Redis cluster, to mean, I mean, we are taking as a service. I mean, I know we thought that Redis is an in-house, I mean, you have to maintain Redis over there. So I read somewhere that you have to pay some cost. I have no experience with Redis basically, but do you have to pay some cost for them to maintain or just you...

**[~02:36:07] Teacher (answer):** Yeah, if you're having to then put up, then the entire management is done by the cloud. So they have their own pricing and billings and whatnot.

**[02:36:17] Student 6:** So costing also you have to take care of.

**[02:36:21] Teacher:** Plus, if you're piggybacking on the same database, in the database, you are firing this thing on the database, the database will also spend time processing this, so existing requests will take an effect. That is also there. Right. Lot of things, lot of things. It's all trade-off. Our entire domain is filled with trade-offs. There is no one right answer to anything. Even 2 plus 2, plus, there is no one right answer. I can tweak it, change the formulation and basically suggest something else. So be always open to trade-offs. Asking such questions really helps out everything.

[02:36:55] Nitin, go on.

> **Student Question [02:36:58] - Student (Nitin):** Yes, regarding [?Amrita's | asr: "Mirita's"] question. So maybe the interviewer was trying to say like whenever your cron job is trying to hard delete, and let's say there are thousands of records, 100k records, okay, which needs to be hard deleted. So maybe the performance impact would be there. So at that time, the DB's availability might be reduced. Let's say during that cron job is running, maybe there's a high traffic incoming. So will the DB be able to perform the hard delete also to serve the request from coming.

**[02:37:39] Teacher (answer):** That's what I said. We have to do staggered deletion. You cannot delete all 100,000 rows in one shot. Split it across your entire day. One hour page job you run and you delete only 1,000 rows at a time. Do staggered deletions to reduce the impact. That's a garbage collection. So do it across the time. So instead of deleting 100,000 rows in one shot, split it into, let's say, half an hour you run job, amount of rows, let's say 10,000 rows, split across 10 hours, sorry, sorry, 10,000 rows every hour you delete. That would minimize the impact, right? Who said you want to delete thousand rows or 100,000 rows in one shot? Okay.

> **Student Question [~02:38:19] - Student (Nitin):** Uh, okay, then, uh, the follow-up thing would be like, uh, if the cron job is running in every like one hour or so, then, then also that particular cron job service, uh, would, uh, take up the connection pool, one or two connections. So then you have, then you, if you don't edit and your data would grow.

**[~02:38:37] Teacher (answer):** Okay, you'll gain some, you lose some, right? If you're saving this, then you're [unclear: "losing out office"]. There is nothing like you don't win it all. Never. You win something, you lose something.

**[02:38:57] Student?:** Got it. Okay.

**[~02:38:57] Teacher:** Yeah. Vishan. [check: name spelling]

> **Student Question [02:39:02] - Student 4 (Vishan):** Hey, hi. So it's just simple question. So regarding soft delete, if we have like soft delete in the database, like for particular table, sometimes it happens like we also have like uniqueness index index on that particular field. So sometimes like, uh, for like email, user deleted it and wants to like create a new account with same email ID. So it would block that. Use.

**[02:39:31] Teacher (answer):** So then there has to be hard in this use case. It has to be hard deleted.

**[02:39:35] Student 4 (Vishan):** Yeah. Okay. Got it. Got.

**[02:39:39] Teacher:** Anwar. Go on.

<!-- topic-candidate [02:39:53]: Q&A -->

[02:39:53] Any other question across the entire session?

**[02:40:02] Student 7:** Can you hear me?

**[02:40:03] Teacher:** Yeah, now I can hear you. Got it.

> **Student Question [02:40:05] - Student 7:** Yeah. So maybe it all always depends upon the use case, right? So when you're talking about running cron jobs and all these extra services [?to delete | asr: "to believe"], we can also set up the retention policy in the DB itself, right?

**[02:40:21] Teacher (answer):** Someone has to do it. So then DB would be having thread that is doing it. So DB is doing the cron job for you, right? So you're offloading it to database.

> **Student Question [02:40:30] - Student 7:** Yeah. So in this case, I wanted to know if someone has done this from their experience, what, you know, which of the approaches in general, where you have to make a lot of these, uh, interval, regular interval of delete, which one is better, compared, comparatively, for the DB performance?

**[~02:40:49] Teacher (answer):** Offload it to database, do it in a staggered way. Yeah, always works. Okay. Okay.

**[02:41:07] Student?:** Hello. Go ahead.

> **Student Question [02:41:08] - Student?:** Am I audible? Yeah. Yeah. Just a follow up question. So in one point you mentioned that why is, suppose, let's say we are caching on. And it is as well as some database, let's say we are considering here Postgres or MySQL, and we are, you know, caching something on these two databases. So why did you say that every time we have to read from the disk? Because if, let's say, we index that field, then it automatically comes to the RAM. I mean, that is my understanding. I'm thinking in the right direction.

**[02:41:38] Teacher (answer):** Worst case is reading from the disk, right? Worst case is what? Reading from the disk, right? [check: possible ASR duplicate] We go in the worst case. The best case is that the table is so small that it fits in the RAM and database is keeping it in the RAM. Then there is no difference.

**[02:41:51] Student?:** Correct. But, but the worst case is, but when we index something, index.

**[02:41:59] Teacher (answer):** If you don't have enough RAM to fit in that index, then, okay, you always go for the worst case. It will always, in the worst case, it will be a disk read.

> **Student Question [~02:42:11] - Student?:** Okay, got it, got it. All right. Yeah. So after we talked about vendor lock-in, let's say I work for Google, so I'm bound to use GCP, right? In that case,

**[~02:42:20] Teacher (answer):** Yeah, then you, then you, you yourself are the vendor. You would never be moving out, right?

**[~02:42:31] Student?:** Yeah, so there is no point of comparison.

**[02:42:35] Teacher:** Correct. So then vendor lock-in is out of option, right? And for a lot of companies, if I know that I'll always be on AWS no matter what, I would not care, right? So then I don't worry about vendor lock-in at all in that case. Okay, but then one more question comes. If I think from, if I wear the hat of a manager, I would think that, hey, is it easy for me to find talent who knows this particular technology that only this particular vendor offers versus an open source technology that everyone uses? That is another thing. For example, Aerospike is a pro, or rather let's say a TigerGraph is a proprietary graph database, and I have, let's say, uh, Neo4j. I would find hundreds of developers who know Neo4j, but few who knows TigerGraph, right? So how easy it is for me to find talent who knows that particular stuff. That could be another thing that me as a manager would. So that is another reason where I might not want to, like, I might be tempted to go for an open source technology versus a proprietary stuff.

> **Student Question [02:43:40] - Student?:** And when we were also comparing the differences between DDB and Redis, we didn't talk about availability. Is it because they both provide us similar kind of.

**[02:43:49] Teacher (answer):** Assuming that. Assuming that. [check: possible ASR duplicate] Availability because there is nothing much in that. I'm assuming that you need team to maintain availability. And because it's all about having that engineering expertise to have that availability, that AWS is giving availability here. Your engineers would have to ensure that availability. So keeping availability same because availability is a property of engineers and not database.

> **Student Question [02:44:11] - Student?:** Yeah. Correct. And also for designing online offline indicator, we didn't talk about how do we tell the last seen? Was it out of scope for this?

**[02:44:20] Teacher (answer):** Scope, out of the, we just draw this green and gray, right? That was out of scope. But if you need that, then you cannot delete the rows. Then you keep the rows. Okay. And you get like the last heartbeat you got is the last thing that you have.

**[02:44:34] Student?:** Got it. Thanks.

> **Student Question [02:44:38] - Student 3:** So my question is about Redis actually, uh, so basically what I wanted to ask is about like, uh, there is a function, uh, and that is that automatically managed, manages keys after a certain period of time. Okay. So my question is about, uh, about the implementation of that. Like, how is it, is it doing?

**[02:45:00] Teacher (answer):** We will discuss this. We'll discuss this in third week. When we design cache, we'll have this discussion on this. How, how, how, how TTL happens. We'll have this discussion third week.

**[02:45:09] Student?:** Sure.

**[02:45:12] Teacher:** Surya.

> **Student Question [02:45:13] - Student 5 (Surya):** Yeah. Uh, I have a question around, uh, um, around the index, how database index length. Does it, I was under the impression that it always stores on the disk and it, I mean, yes, does it ever store on RAM as well permanently?

**[02:45:30] Teacher (answer):** RAM? No. Permanent is always [?disk | asr: "this"], always, always, always, always. I have a video on it on my YouTube. What's that? How database, how indexes make database read faster. It will come in pre-reads for the next week also. So [?watch that | asr: "what's that"] video. You'll understand what, how it happens. Okay.

<!-- chunk_15 02:45:51-02:59:03 -->

<!-- topic-candidate [02:45:51]: Q&A - soft delete vs archival -->

> **Student Question [02:45:51] - Student 2:** I just wanted to ask this soft delete and archival the same thing.

**[02:45:57] Teacher (answer):** No, soft delete allows you to archive.

**[02:46:02] Student 2:** Okay.

**[02:46:03] Teacher:** Because if you do hard delete, you don't have time to archive. Right.

**[02:46:08] Student 2:** Okay. So like, it happens to be like in one of our project, I don't remember exactly, but they were proposing to have soft delete as well as archival.

**[02:46:17] Teacher (answer):** So soft delete, you need soft delete so that you can archive after, like you can archive after a day or so, right? Because imagine you are doing hard delete and immediately copying it on S3. How slow would that be? Correct. [check: "Correct." may be the student] So which is where, which is where soft delete would allow you to do archival, because you would have time to collect all the soft deleted rows and put it into different ways and then do hard delete from here. Okay. Got it. Got it. [check: "Okay. Got it. Got it." may be the student]

<!-- topic-candidate [02:46:44]: Q&A - Redis as primary database (online/offline problem) -->

[02:46:44] DK.

> **Student Question [02:46:47] - Student (DK):** So in our online and offline problem, we actually, the way we started is, see, whenever we talk about Redis, we generally talk in terms of that, you know, we want to cache something. I mean, that's just a general tendency. But the way we have started a solution, we have proposed either DynamoDB or Redis as the mainstream database for, you know, that solution. Why we just started with that? I mean, instead of, you know, proposing a database and then coming to the cache part of it, we directly propose.

**[02:47:19] Teacher (answer):** I use Redis as a [unclear: "primary DVO worker"]. Why not?

**[02:47:24] Student (DK):** So like, it's like a trade-off that whether we want to persist that data or not, because see, in Redis, we can persist the data, we can persist the data, but there's a possibility. We don't want to persist that data. So, so it depends that if we want to persist that data, I mean, I'm not able to, you know, clearly defined.

**[~02:47:42] Teacher:** There is no problem in that, you are on the right, right. You've got all the points checked. Now, depending on the guarantees that your system would need to provide, you pick one over the other. Right.

**[~02:47:49] Student (DK):** Okay. So it depends on the guarantees. What kind of guarantees I'm looking for, based on that, whether I need some primary database and top of, and on top of that, we should we add Redis or should we just go with the Redis? Yeah. All depends on the guarantees. That's what you're saying.

**[~02:48:04] Teacher:** So I'm using Redis as my primary DB. There is no harm in that. I can just configure [?AOF | asr: "AI"] based persistence on Redis and I'll get [?on-disk | asr: "on this"] persistence for that. Right. There will be zero data loss. Right. But I'll get speed. I have enough. I have small enough data, only 8 GB, so I can store it in RAM. Right. So there is no, no reason for me to not use Redis. Got it. That's why. Okay. [check: "Got it." may be the student] And it just being open. It's an, which is where this hard stereotypes that people have made, DynamoDB just for use for this thing, or SQL is just used for that thing. That's all. It's very, it's, it just depends on how you know how to leverage a particular tech, that's all matters, right?

<!-- topic-candidate [02:48:53]: Q&A - autoscaling, self-managed Redis vs DynamoDB -->

> **Student Question [02:48:53] - Student 8:** So, got it. Yeah, yeah, yeah. While you were comparing Redis and Dynamo, should autoscaling be also a factor in that? Like with Dynamo, you could, it would provide you like autoscaling in case you have a sudden surge, whereas in a self-managed Redis you probably might not be able to react in a small window of time when you see a sudden. So that's a disadvantage, right?

**[~02:49:21] Teacher (answer):** So that's a property of engineering teams rather than the tool itself, right? So assuming that, even as we discussed, assuming handling [?surges | asr: "searches"] and all of that remain same, then we discuss. But if you want to consider that, those points, and this, that's a disadvantage. When you're self-hosting something, that you need engineering expertise to manage and scale and react with [?surges | asr: "searches"], right? That's an added strain on the engineering teams, and so that is one more point that can go against self-hosted Redis versus DynamoDB. So if you have lean team, you can just offload everything to DynamoDB. You throw money at them, they become your extended engineering team.

[02:50:05] Correct, but with Redis you have to manage, so it's a trade-off, so you need engineering expertise to pull that off. [check: may be Student 8 summarizing]

<!-- topic-candidate [~02:50:11]: Q&A - avoiding DB-specific features (TTL) -->

> **Student Question [~02:50:11] - Student 5:** Okay. Yeah, yeah. So like, in the online offline thing we were discussing about using TTL in Redis, right? Now I don't know if that is a feature that is widely available in all kind of databases, but in general, should we try to avoid features that are specific to some DBs, because in future, in future we may not be able to change?

**[~02:50:38] Teacher (answer):** No, we wanted that, right? We wanted, we wanted expiration. That's why we went for a database that gives us, a DynamoDB gives you, Redis gives you, right? Then, though, you can also say, what can I not live without? ACID. You need some features, right? You just cannot say because your data, you're picking databases that would give you those things, to move into a database that would not give you the features that you need. Right. You would always find databases that give you similar features and move into those database. If not, you always have an option to re-implement it. For example, writing a cron job that does that exact same thing. Yes. Right. So you need to draw a line where you need to stop overthinking.

**[02:51:22] Student 14:** Yeah.

**[02:51:23] Teacher:** Correct. He like going, entire, basically not, not, not, making everything abstractionized and whatnot. So you need to draw a line. What are some realistic things? What are some unrealistic things? Drop all the unrealistic things that focus on realistic and then design a system. Otherwise you'll drop the rabbit hole and eventually write your own database. Don't do that.

**[02:51:52] Student 5:** Yeah. Oh yeah. I'm because like, when I was working on a project, yeah, I was working on a project where for archival, I propose like TTL and then listening to streams, and like the senior engineer in my team challenge saying, you can only do this with Dynamo, you can't do it if we move to something else.

**[02:52:09] Teacher:** But then you would not use DynamoDB streams, but your CDCs, Debezium gives you that. Right. If you're using MySQL, use Debezium to capture all this. See, either someone could give you with managed, or you would have to write a small service that would do that for you. Yes. Right. [unclear: "we are rigid as"] we can code anything and everything out there, right? So don't worry about, it's a, basically that's one thing that you would have to document it, if we would want to ever do that, this is the, like, these are the steps that we would have to take. Yeah, just being aware of the limitations of your design is a good place to be. Okay, thanks, I should use it. [check: "Okay, thanks, I should use it." may be Student 5] Thanks for that question. Amrik Gaur. [check: name spelling]

<!-- topic-candidate [02:52:51]: Q&A - connection pooling when scaling the database -->

> **Student Question [02:52:51] - Student?:** Yeah, I don't know, means I have not never used the connection pooling. Okay. So just a [?question | asr: "portion"] out of curiosity, suppose that, if I scale my database, okay. I mean, it's from one [?DB | asr: "DBI"], switch to two, then the connection pooling will also be multiplied by two, means it is a directly proportional, or it depends on the implementation.

**[02:53:11] Teacher (answer):** So what I would recommend is. Today, spend some time writing a hello world with connection, [?pooling | asr: "pulling"] local database, run it. You'll see the kind of configurations it provides. Right. And you understand the limitations of it. Right. You'll be in much better position to answer this on your own. Right. The way, if you're moving, if you're horizontally scaling your DB, how you do it, that also depends. We'll talk about it next, right? Horizontally scaling of databases and how to do it. We'll talk about next week. A lot of things will get clear, but today try to write a hello world with connection pooling, right? So that you will be in a position to understand horizontal scaling of database and the role of connection pooling better. Okay.

<!-- topic-candidate [02:53:48]: Q&A - deleting offline entries vs showing last seen -->

> **Student Question [02:53:48] - Student?:** Okay. Okay. One more question. We, we optimized that online and offline DB by means deleting offline fields, right? Suppose if I have to show the, that in WhatsApp, it shows, right? We discussed it. Someone asked, if you want to show, then you cannot delete.

**[02:54:10] Teacher (answer):** Okay. So, and then it's a product call. If they want to show it, then you cannot delete it. If they don't, you will delete it.

**[02:54:17] Student?:** So that, how can we optimize that? That was, I was thinking.

**[02:54:21] Teacher (answer):** You cannot, because storage is not a problem, right? It's just 8 GB of storage. You don't have to optimize on that. Okay. That's what I said. [02:54:27] stretch so that we think on those lines, right? Because storage is not problem. 8 GB is peanuts for everything. Right.

<!-- topic-candidate [02:54:50]: Q&A - downsides of connection pooling -->

> **Student Question [02:54:50] - Student 2:** Yeah. Thank you. So we discussed a lot of pros of connection pooling, and I think [?Arpit | asr: "at a"] also mentioned that we should almost use it everywhere. And I understood a lot about it today, but what I also want to understand is, are there any catches or cons or any situations where using connection pooling might be detrimental, that you are aware of?

**[02:55:15] Teacher (answer):** Imagine you configure a connection pool with minimum number of hundred connections. Okay. Let me give a hypothetical situation. Let's say you have a database that supports at [?max | asr: "packs"], 1000. Just to make a calculation simpler. Let's say you have a database that supports maximum connections of 1000. And you have a, you configuring a [?per server | asr: "repair server"], a connection pool of 100 minimum number. And now you had one server, a hundred, and here, 1000 works fine. You got some traffic. You add one more server. You got some more traffic. You had one more server, right? Three servers, 10 servers.

[02:55:53] But then suddenly you add 20 more because you saw massive, massive spike. Now what would happen? You exhausted the maximum number of connections that could be made with the database. So by not configuring your connection pool properly, you can limit the number of API servers that you can have. Correct. That's what you have to worry about, that what are the maximum number of API servers would I have. That would depend on the connection pool that you have got, the minimum number of connections in the connection pool that are configuring, the maximum number of connections that could exist on your database. It's all a factor of that, right? So that is where just blindly using connection pooling is not a good idea, right?

[02:56:37] Because if you just put it in an overstretch mode, let's say it grows to as many connections as it wants, but then you cannot have large number of servers, because if every server, then it would put a lot of pressure on a database. And let's say if you set up your expiration time on connection to be very high, let's say 10 minutes, now, which means that your existing connections on connections would not break. You need more servers to handle the load, but your existing connections cannot break. The load balancer has set up connection with some other server, but some other server is [?hogging | asr: "fogging"] up the database connections. Now what? Gone. You're having an outage, right? Those users who are connected to that other server, the data, because some other server is having very large TTL on the connection pool. Problem. Right?

[02:57:26] Life is filled with problems. Just find a near optimal solution and move on. But grass is not always green. You need to know how to tune it, where to tune it, all the factors that you see. You need to know the places where it can [?break | asr: "bring"]. So, think on multiple directions at a shot, document everything, and start to step by step, what could go wrong, what could go wrong, what could go wrong. Start with a conservative, which is where I said that in most cases you start with the minimum number of connections in a connection pool, you start with three or five, not more than that, and you make it grow to a certain stage, maybe less than 50 or 100.

[02:58:02] The amount of time, the TTL of the connection pool or the connection, that after which it would be deleted, it cannot be too small, because if it is connections to the backend or to the database. If it's too large, then you are having unused, a large number of unused connections. So you need to find a sweet spot, and it depends on the use case. Why? Because let's say you are having, you are firing queries which are taking longer time on your database to execute, which means you need to keep the connections open for a very long time, which means that you cannot have a short TTL. Yes. So depending on what your use case is, so one factor or one metric that you should track is average time for SQL query completion on your database workflow. That is the most important factor that would help you tune your connection pool the best, right?

<!-- chunk_16 02:59:03-03:06:47 -->

**[02:59:03] Teacher:** Think on those slides.

**[02:59:06] Student 6:** Yeah.

> **Student Question [02:59:07] - Student 2:** If just small follow up with, if the average time to query a particular table for a particular record, let's say for a particular variable, it goes up. Then if we have a very frequent use case for that, we should think about expanding our connection pool for that DB.

**[02:59:24] Student 2:** Correct. [check: "Correct." may be the teacher answering] Yeah. Thank you. That was very insightful. Yeah.

**[02:59:29] Teacher?:** Great. Deepak.

> **Student Question [02:59:31] - Student 4 (Deepak):** So I wanted to know like in case of a database server, we have multiple, we have fixed number of codes and each TCP connection is two codes. [check: "codes" - cores or ports?] So how we maintain more than 30,000 connections?

**[02:59:44] Teacher (answer):** Yeah, just a Google search. Just a Google search. See something that can be [unclear: "Google search to ECD"]. I would recommend do that. Do a Google search, in case you still don't find an answer, more than happy to answer it, but spend some time because you will stumble upon something very interesting. So, Hussain Nasser has a great video on that. You'll find a couple of Stack Overflow answers on it. Like, how that happens. There is a hardware specification that you would stumble upon. Google search. Google search. Right? In case you still don't get an answer, by third week, I'll be more than happy to answer. Because that's when it would be much more relevant. Right? More than happy to answer that.

[03:00:19] Sure. Husha?

**[03:00:20] Student 15:** Can you hear me now?

> **Student Question [03:00:22] - Student 6:** Yeah. So, yeah. I was asking key when we use TTL to save space, we are increasing computation power on Redis side. So how to do that trade-off.

**[03:00:34] Teacher (answer):** [unclear: "How did it is"] that the space was important. That's why we did that.

**[03:00:38] Student 6:** Yeah.

**[03:00:39] Teacher:** In case space is not important. You skip that. Okay. You just keep those entries handy there.

**[03:00:43] Student 6:** Okay. So that computation power won't slow down the system that much, not

**[03:00:48] Teacher:** much because it's in-memory deletion. It's peanuts for Redis. [unclear: "speedups"] Oh, thank you. Yeah, great questions. Quite, quite interesting, loved every one of them. Nice. I have a couple of notes to make on this point because these are excellent questions. I loved it. Thanks, thanks so much. Any other question, anyone, before I wrap? Yeah, anything?

> **Student Question [03:01:12] - Student?:** So, so today I mean I quite learned like, like how to do like, you said, right, the gain something, we have to lose something. Right. So, you know, how to build that intuition that we are making the right choice, we are making the right trade-offs.

**[03:01:32] Teacher (answer):** So at the end of eight weeks, second era, you'll have this intuition. [unclear: "Bill"], every single decision, every single system will design. We'll do this. We'll spend hours talking about those trade-offs over time. Intuition will be the hundred percent. Right. Of this course

**[~03:01:51] Student?:** which I understand now that it just pro I'll and today we didn't have any brainstorming

**[03:01:56] Teacher:** Right, but next week on what, when we'll have those brainstorming, right, we'll not move forward unless and until we have answers that why are we making a certain decision, what are the trade-offs for that, and then only we'll be moving forward. So over time it will be done, don't worry.

> **Student Question [~03:02:07] - Student?:** And also you mentioned about not to overthink and just go with a certain solution and just try it on. Yeah, so learn about that? Like, at what stage we need to just stop it and just go with the solution.

**[03:02:26] Teacher (answer):** That would be, it will happen. Sixth week, we'll wear three hats. Six week. We in one of the discussion, like it's not, and obviously this is not just an engineering course. So what we will do is we'll think from different perspectives, same system from a management perspective, from managers, from product managers perspective, from senior engineer perspective, from junior engineer understand where to draw that line. So all of that is covered. Six weeks, second day, we'll discuss that.

**[03:02:56] Student 6:** Great. Thanks. Thanks.

**[03:02:59] Teacher:** Gaurav?

> **Student Question [03:03:01] - Student (Gaurav):** So this is very, very basic question. You mentioned in the very beginning that HTTP is a stateless and the connections are not always on.

**[03:03:10] Teacher (answer):** No. So, so HTTP is designed to be stateless people like, but you can still have a persistent HTTP connection where you can pass in that, basically keep. Your web server understands that I've got this keep-alive header. So I'll not terminate it, but HTTP in itself is a stateless thing. Okay. Which means that it's one request. You send a request, you get a response, deal done, but there are ways to keep the connection support. HTTP/2 keeps the persistent connections. WebSocket keeps up. WebSocket is not HTTP, but it keeps the persistent connection. So there is no rule which says that you cannot, or you have to always terminate the connection. Right.

[03:03:49] But what happens is the web servers have made those hacks by passing in a specific header. The web server would not terminate because what happens is your client sends a request, your server sends a response and server terminates the connection. So if your server doesn't terminate a connection, client does not terminate the connection. The connection will always remain open. Which is what this keep-alive header that you pass in to keep the connection open does for you.

[03:04:16] But [unclear: "motor motor"] overall understand that HTTP, think of it as a stateless. It would simplify your design much because making it stateful, you would find other better options. Like for the WebSockets, MQTT that would come in very handy when you'd want to make HTTP state. Right. But that's a simplistic way, overly simplistic way to do it at one, in one of the systems in the future, we'll use [?HTTP/2 | asr: "HTTP to"] specifically and we'll keep it stateful. Right. We'll also talk about that. But where to use it, how to use it, we'll go into depth of it and then make that same decision. Why are we going on those routes and not making a statement? So we'll talk about it. So a lot of things will be covered. So fifth week, second day.

> **Student Question [03:05:00] - Student?:** And also in one of the resources that you shared previously, it was mentioned that HTTP cannot be used on top of TCP. Is it true?

**[03:05:08] Teacher (answer):** HTTP is on top of TCP. Which resource was that, Baba?

**[03:05:11] Student?:** Okay, I might have misunderstood it.

**[03:05:15] Teacher:** Share it with me, share it with me. Just, just drop me a DM. I read through all three. I don't think there is any, but in case there is something I'll just shoot a clarification. HTTP is TC. [check: cut off] HTTP is a protocol. HTTP is a specification. And TCP is the [?layer 4 | asr: "layer for"] protocol. So no relation. So you can run, you can send HTTP message on top of UDP also. No one's stopping you from doing that.

**[03:05:37] Student?:** Right. So that's fine. Thank you. Sure.

**[03:05:40] Teacher:** Sankal. [check: name spelling]

**[03:05:47] Teacher:** *(admin)* So [unclear: "I got gone"]. So I can be inaudible. So shoot me a DM with your question because morning also your voice was not that. So check the mic, shoot me a DM, more than happy to answer your question. Right. Great. Any other question? Anyone?

<!-- topic-candidate [03:06:12]: Wrap-up (admin) -->

[03:06:12] *(admin)* Super. Thanks folks for tuning in. Upload the recording by tonight. I'll shoot a message. I'll shoot an email when that's done. Sometimes it's happened by two also. But I cannot commit to that. I can commit to end of the day. So we'll upload the recording, upload the notes, what we just shared. You'll have access to that. You'll get an email on that. See you folks tomorrow morning. Remember that fun exercise. Do that. We'll discover something very interesting tomorrow. Right? Sure. Thanks folks for tuning and have a great day. Bye-bye.

**[03:06:43] Student 8:** Thank you. Bye. Thank you.

<!-- BODY END -->
