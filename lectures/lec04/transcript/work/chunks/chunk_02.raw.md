# chunk_02  OWNS 00:11:13 -> 00:22:56  (segments #167-#364, 2048 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:10:16] TEACHER: So whenever I feel we have covered substantial enough   {#148}
CTX| [00:10:19] TEACHER: and you folks might have questions.   {#149}
CTX| [00:10:21] TEACHER: at that point of time, we'll take questions.   {#150}
CTX| [00:10:24] TEACHER: But it would not be that we are taking all the questions   {#151}
CTX| [00:10:27] TEACHER: because we have to cover everything by 11.30   {#152}
CTX| [00:10:29] TEACHER: and then open forum is there.   {#153}
CTX| [00:10:31] TEACHER: So the plan is that we'll take some questions   {#154}
CTX| [00:10:34] TEACHER: as the time permits.   {#155}
CTX| [00:10:36] TEACHER: Then we'll move to the next section.   {#156}
CTX| [00:10:38] TEACHER: But at the end, in case your doubts are not answered,   {#157}
CTX| [00:10:42] STUDENT_1: post 11.30 when we have open forum,   {#158}
CTX| [00:10:44] STUDENT_1: feel free to shoot that question.   {#159}
CTX| [00:10:45] STUDENT_1: So in any case, the session does not end   {#160}
CTX| [00:10:47] TEACHER: until all the doubts or all the questions are answered.   {#161}
CTX| [00:10:51] TEACHER: We have a ton of brainstorming.   {#162}
CTX| [00:10:54] TEACHER: First week, I don't do any because I want everyone to be on the same level.   {#163}
CTX| [00:10:59] TEACHER: And then second week, converts will have brainstorming, but we'll still have questions and answers, a lot of them.   {#164}
CTX| [00:11:04] TEACHER: But brainstorming of systems will start from next week.   {#165}
CTX| [00:11:07] TEACHER: Because before that, first, let's cover the foundation.   {#166}

---- OWNED SEGMENTS START ----
[00:11:13] TEACHER: Apart from the things that we discuss in the live session, go through my YouTube videos.   {#167}
[00:11:19] TEACHER: there is ton of things that I've put out.   {#168}
[00:11:22] TEACHER: Take your time.   {#169}
[00:11:23] TEACHER: One life, be a better engineer, right?   {#170}
[00:11:25] TEACHER: Go through my YouTube videos and do consider membership.   {#171}
[00:11:28] TEACHER: I very recently announced one.   {#172}
[00:11:30] TEACHER: Do consider membership.   {#173}
[00:11:31] TEACHER: I'll slowly start to move my free stuff into paid tier because time is money.   {#174}
[00:11:37] TEACHER: So go through my YouTube videos, bunch of real world system design,   {#175}
[00:11:41] TEACHER: architectures and whatnot.   {#176}
[00:11:42] TEACHER: You'll find ton of them.   {#177}
[00:11:43] TEACHER: But be assured, nothing that I cover in my course will be out there.   {#178}
[00:11:49] TEACHER: exclusive no matter what.   {#179}
[00:11:50] TEACHER: And this will always be my topmost content.   {#180}
[00:11:54] TEACHER: If may I put it, I don't like that word, but still,   {#181}
[00:11:56] TEACHER: this would be the top part that I deliver in my course.   {#182}
[00:11:59] TEACHER: Everything else is just superficial, right?   {#183}
[00:12:01] TEACHER: So you'll still find enough value,   {#184}
[00:12:03] TEACHER: enough value out of things that I post out.   {#185}
[00:12:06] TEACHER: I post that, but this is where the actual goal is.   {#186}
[00:12:11] TEACHER: I have one more course.   {#187}
[00:12:12] TEACHER: I was planning to create more, but I'm not getting time.   {#188}
[00:12:15] TEACHER: So I've created one more course on Redis internals.   {#189}
[00:12:19] TEACHER: about Redis end-to-end. So if you are interested go for that. Apart from that 2020 was the year   {#190}
[00:12:26] TEACHER: which transformed my life. Entire 2020 I read one research paper every week and I wrote about it   {#191}
[00:12:33] TEACHER: in depth and most only implemented it. All of those are their essays. If you go to top right   {#192}
[00:12:39] TEACHER: you'll find essays within which you'll find all the detailed essays that I ever wrote.   {#193}
[00:12:43] TEACHER: Not my newsletter that is different. These are essays that's why I used the word essays.   {#194}
[00:12:49] TEACHER: So go through that, you'll find a bunch of interesting stuff, very advanced,   {#195}
[00:12:53] TEACHER: like not really advanced, but good chunks of algorithms,   {#196}
[00:12:56] TEACHER: pseudo random number generators, terrain generation algorithm and whatnot.   {#197}
[00:13:00] TEACHER: So if you're interested, go through and explore that.   {#198}
[00:13:04] TEACHER: Okay.   {#199}
[00:13:05] TEACHER: Coming to this session, the agenda for today is we'll discuss two things mostly.   {#200}
[00:13:11] TEACHER: First is we'll start with the back.   {#201}
[00:13:13] TEACHER: We'll start with designing the online offline indicator.   {#202}
[00:13:15] STUDENT_1: right so facebook twitter you see when someone comes online you see green dot someone goes   {#203}
[00:13:21] TEACHER: offline you see gray dot right so we'll design that uh but we'll not worry about scale this is   {#204}
[00:13:26] TEACHER: day one right we'll not worry about scale because the design would change very much when we cover   {#205}
[00:13:32] TEACHER: other concepts right so you can automatically link here this is how we should have designed   {#206}
[00:13:36] TEACHER: this but we'll still cover it in a way where we tackle it from the first principles and start   {#207}
[00:13:42] TEACHER: building the intuition that we always wanted. So that's it. So that is what we'll do the first part.   {#208}
[00:13:49] TEACHER: Then we'll take a break and then the second half of the session will be about how to approach   {#209}
[00:13:54] STUDENT_1: system design and we'll talk about two things, databases and caching. When we talk about these,   {#210}
[00:14:02] STUDENT_1: we'll talk it in context of let's say we're building medium-like application.   {#211}
[00:14:07] STUDENT_1: It's very simple concepts, but we'll go into those granular details   {#212}
[00:14:11] TEACHER: that every engineer should know about.   {#213}
[00:14:13] TEACHER: So this is the agenda for today.   {#214}
[00:14:16] TEACHER: So we'll start with the first one.   {#215}
[00:14:17] TEACHER: And again, this day one, we'll not worry about scale, not much.   {#216}
[00:14:22] TEACHER: We'll still talk about performance improvements, but not scale because you need,   {#217}
[00:14:28] TEACHER: we'll go in the second, third, fourth week.   {#218}
[00:14:31] TEACHER: And we have enough time to cover anyway.   {#219}
[00:14:33] TEACHER: And we'll keep it simple.   {#220}
[00:14:36] TEACHER: And we'll see how we are, how we are reaching to the solution.   {#221}
[00:14:41] TEACHER: Although you may think, it's so obvious now, why are we spending time on this?   {#222}
[00:14:44] TEACHER: But the more important part is there are some implementation specifics that you should know   {#223}
[00:14:50] TEACHER: about.   {#224}
[00:14:50] TEACHER: We'll talk about that and form that core intuition around building any and every system.   {#225}
[00:14:57] TEACHER: Right?   {#226}
[00:14:58] TEACHER: Okay.   {#227}
[00:14:58] STUDENT_1: So on an offline indicator, we have here, what we'll have is we'll have.   {#228}
[00:15:05] STUDENT_1: will have a bunch of users   {#229}
[00:15:08] STUDENT_1: against which you would see   {#230}
[00:15:10] STUDENT_1: green dots or grey dots.   {#231}
[00:15:12] STUDENT_1: Green dots implies they are online.   {#232}
[00:15:14] STUDENT_1: Grey dots implies they are offline.   {#233}
[00:15:16] STUDENT_1: So we just want to render this.   {#234}
[00:15:18] STUDENT_1: This is the brief that we got from the product team.   {#235}
[00:15:21] STUDENT_1: And now we have to go about it.   {#236}
[00:15:22] TEACHER: So you have here,   {#237}
[00:15:24] TEACHER: when you're designing any system,   {#238}
[00:15:25] TEACHER: literally any system,   {#239}
[00:15:27] TEACHER: I have always like throughout   {#240}
[00:15:28] TEACHER: last 10, 11 years that I've spent,   {#241}
[00:15:30] TEACHER: I've only seen two ways,   {#242}
[00:15:35] TEACHER: two categories of approaches or rather two approaches in general to build any system.   {#243}
[00:15:40] TEACHER: And it does not matter.   {#244}
[00:15:42] TEACHER: And it really depends on the system.   {#245}
[00:15:44] TEACHER: Which one are you going for?   {#246}
[00:15:45] TEACHER: But there is no hard rule that you should always go with a certain approach.   {#247}
[00:15:49] TEACHER: But there are two ways to build it.   {#248}
[00:15:52] TEACHER: The first one is where I call the spiral approach.   {#249}
[00:15:56] TEACHER: So in this approach, what happens is you decide the core of the system.   {#250}
[00:16:01] STUDENT_1: Now this core of the system is most cases is database.   {#251}
[00:16:04] STUDENT_1: So you start with designing the database, right?   {#252}
[00:16:07] STUDENT_1: And then you build, okay, now this database I have, now I need API server,   {#253}
[00:16:11] STUDENT_1: API server I have, bunch of API servers, I need a load balancer and so on and so forth.   {#254}
[00:16:15] STUDENT_1: Right?   {#255}
[00:16:15] STUDENT_1: So you decide the core of your system, which becomes the single point of focus   {#256}
[00:16:21] STUDENT_1: of your system, that core of your system is the one that is making it possible.   {#257}
[00:16:27] STUDENT_1: That it could be a database schema.   {#258}
[00:16:29] STUDENT_1: It could be a communication layer.   {#259}
[00:16:31] STUDENT_1: messaging app, then your web socket becomes the core of the system and then you build   {#260}
[00:16:35] STUDENT_1: everything around it.   {#261}
[00:16:37] STUDENT_1: So that is one way to look at it when you go for a spiral flow around building different   {#262}
[00:16:44] STUDENT_1: components as and when you need it.   {#263}
[00:16:46] STUDENT_1: The second one is your incremental building.   {#264}
[00:16:49] STUDENT_1: When it's about incremental building, it's about when you are unsure of how to implement,   {#265}
[00:16:55] STUDENT_1: how to scale, which is where what you do is you start with the DAISY architecture, whatever   {#266}
[00:17:01] STUDENT_1: simplistic thing ever.   {#267}
[00:17:03] STUDENT_1: You just draw that.   {#268}
[00:17:03] STUDENT_1: It may be user, load balancer, API server, database.   {#269}
[00:17:08] STUDENT_1: And then you see, oh, and then you think about implementation specific that, hey, is this   {#270}
[00:17:13] TEACHER: server overburdened?   {#271}
[00:17:14] TEACHER: If not, do I need to split it into another service or not?   {#272}
[00:17:17] TEACHER: Right.   {#273}
[00:17:18] TEACHER: All of those decisions is something that you would take.   {#274}
[00:17:21] STUDENT_1: So start with an extremely simplistic day zero architecture.   {#275}
[00:17:24] STUDENT_1: Then you see how each of the components that you have would behave under load and at scale.   {#276}
[00:17:31] STUDENT_1: the responsibilities of it or not. You identify the borderline, you re-architect and repeat it   {#277}
[00:17:37] STUDENT_1: until you are happy and content. So these are two approaches. At some places we'll use spiral,   {#278}
[00:17:43] TEACHER: at some places we'll use incremental. You'll see it could be very evident, okay, where are we using   {#279}
[00:17:47] TEACHER: spiral, where are we using incremental. But in most cases, a very simple way to look at it is   {#280}
[00:17:54] TEACHER: when a system is simple enough, where it's a no brainer, where you know that A, this is exactly   {#281}
[00:18:01] STUDENT_1: to be done you typically go with a spiral based approach i don't know that okay this is the core   {#282}
[00:18:06] STUDENT_1: of my system i know this would require this would be there this would be there and now i need a cdn   {#283}
[00:18:10] STUDENT_1: and this and that so that's a no brain so that is where when you know when you have built similar   {#284}
[00:18:15] TEACHER: systems before you typically go with spiral because you exactly know how things would transpire   {#285}
[00:18:21] TEACHER: but when you are in an ambiguous situation and you're a little uncertain right that's where this   {#286}
[00:18:27] TEACHER: incremental building concept which is where you can typically see how incremental building resonates   {#287}
[00:18:31] TEACHER: with startup like environment you start with the day zero architecture you push it out to some users   {#288}
[00:18:37] TEACHER: and re-architect over time and make it better and better and better why in a multi-year project at   {#289}
[00:18:43] TEACHER: a big organization you typically go with this where you know what you need to implement those   {#290}
[00:18:50] TEACHER: are two complex so you start with this and this and then you grow organically around it right no   {#291}
[00:18:57] STUDENT_1: lines there, but two ways to look at it.   {#292}
[00:18:59] TEACHER: It just gives you confidence when you're building.   {#293}
[00:19:02] TEACHER: Okay.   {#294}
[00:19:04] TEACHER: Whatever we're discussing with online offline,   {#295}
[00:19:07] TEACHER: now we'll start the actual technical decisions that we would take.   {#296}
[00:19:10] TEACHER: So points to remember is first,   {#297}
[00:19:14] TEACHER: understand the core property and access pattern.   {#298}
[00:19:18] TEACHER: Really important.   {#299}
[00:19:19] TEACHER: So what I've seen is a lot of people have affinity   {#300}
[00:19:24] TEACHER: towards a particular tech.   {#301}
[00:19:27] TEACHER: No, here I'll use Redis.   {#302}
[00:19:29] TEACHER: Why?   {#303}
[00:19:29] TEACHER: No, no, Redis.   {#304}
[00:19:30] TEACHER: Because I love Redis.   {#305}
[00:19:32] TEACHER: Or here I'll only use Postgres.   {#306}
[00:19:33] TEACHER: Or I'll only use DynamoDB.   {#307}
[00:19:35] TEACHER: Or I'll only use Cassandra.   {#308}
[00:19:36] STUDENT_1: Right?   {#309}
[00:19:37] STUDENT_1: So these kind of thought processes that you have,   {#310}
[00:19:44] TEACHER: this kind of rigidity that you hold in your mind,   {#311}
[00:19:47] TEACHER: hampers the growth.   {#312}
[00:19:49] TEACHER: Not your, but systems growth.   {#313}
[00:19:51] TEACHER: So what we should do instead is,   {#314}
[00:19:54] TEACHER: we should focus on the core property that we need from that component rather than saying that hey i   {#315}
[00:20:02] TEACHER: will only use dynamo tv over here and not other whatever company is not on aws you cannot use   {#316}
[00:20:08] TEACHER: dynamo tv right so which is where for every single decision that we will make or you make in your   {#317}
[00:20:16] TEACHER: life in your career in your in the next big thing that you're designing understand the core property   {#318}
[00:20:24] TEACHER: core access pattern that you would have from that particular subsystem or from that particular   {#319}
[00:20:30] TEACHER: component and see which all tools, technologies, framework fit into the scheme of things.   {#320}
[00:20:37] TEACHER: The one who do pick, you can pick any one of them.   {#321}
[00:20:41] TEACHER: So a lot of people seem rigid and now I'll only use Redis.   {#322}
[00:20:44] TEACHER: Why?   {#323}
[00:20:45] TEACHER: What if my company does not use Redis?   {#324}
[00:20:47] TEACHER: Then will you not build that system?   {#325}
[00:20:49] TEACHER: You still have to, right?   {#326}
[00:20:51] TEACHER: So that is exactly where it comes in very handy to look at a particular system, to look at a particular technology from its core property or from our requirements.   {#327}
[00:21:03] STUDENT_1: And whoever satisfies that requirement will pick that.   {#328}
[00:21:05] STUDENT_1: Throughout this course, you will see so many places.   {#329}
[00:21:08] STUDENT_1: I literally discard Cassandra.   {#330}
[00:21:11] STUDENT_1: We don't need that kind of fancy stuff.   {#331}
[00:21:14] STUDENT_1: You don't.   {#332}
[00:21:15] STUDENT_1: It's a very simplistic use case.   {#333}
[00:21:16] STUDENT_1: A relational DB can solve it.   {#334}
[00:21:18] STUDENT_1: And that's very counterintuitive.   {#335}
[00:21:21] TEACHER: There are systems that are built using relational DBs instead of Cassandra, that very same system   {#336}
[00:21:28] TEACHER: operating at scale, which is extremely important to know the core properties and access pattern   {#337}
[00:21:33] TEACHER: and your affinity towards a particular tech comes second, which one to use, but core property   {#338}
[00:21:39] TEACHER: really important.   {#339}
[00:21:41] TEACHER: You'll see how this helps in designing better systems.   {#340}
[00:21:45] TEACHER: Most important part, build an intuition towards building system.   {#341}
[00:21:50] TEACHER: That it's not always that this is the only way to build a system.   {#342}
[00:21:55] TEACHER: There's nothing like this.   {#343}
[00:21:56] TEACHER: Every system is infinitely buildable.   {#344}
[00:21:59] TEACHER: You can evolve it the way you want.   {#345}
[00:22:01] TEACHER: So, but building an intuition, intuition that you hold will stay with you forever.   {#346}
[00:22:07] TEACHER: Right.   {#347}
[00:22:07] TEACHER: And which is what is required?   {#348}
[00:22:09] TEACHER: Because it's not that there are only 15, 16 systems that the world has and you would   {#349}
[00:22:14] TEACHER: Exactly that, right?   {#350}
[00:22:15] TEACHER: No, you at real world, you will be thrown into situations where you have to build systems   {#351}
[00:22:20] TEACHER: that does not even exist.   {#352}
[00:22:22] TEACHER: How will you go about it?   {#353}
[00:22:24] TEACHER: Right?   {#354}
[00:22:24] TEACHER: So which is where intuition matters the most.   {#355}
[00:22:28] TEACHER: Okay.   {#356}
[00:22:29] STUDENT_1: Now, if I start on online offline indicator, if you think about it, let's say we pick our   {#357}
[00:22:35] STUDENT_1: core of the system as database.   {#358}
[00:22:38] STUDENT_1: That's the easiest one to start.   {#359}
[00:22:39] STUDENT_1: So let's say we start with a database and we'll think about if I'd want to render this   {#360}
[00:22:44] TEACHER: this online offline stuff, what do I need?   {#361}
[00:22:47] TEACHER: I see that there is a user and I see there is a green or a grey button or green or a   {#362}
[00:22:53] TEACHER: grey indicator.   {#363}
[00:22:54] TEACHER: Okay.   {#364}
---- OWNED SEGMENTS END ----

CTX| [00:22:56] STUDENT_1: So when it is there, it means that what I have is for a user, I want to store if the   {#365}
CTX| [00:23:04] STUDENT_1: user is online or not, because this is exactly what I'll make a call, get the information   {#366}
CTX| [00:23:09] STUDENT_1: and render it on the UI.   {#367}
CTX| [00:23:11] STUDENT_1: So let's say we store it exactly that way.   {#368}
CTX| [00:23:14] STUDENT_1: I'll store it as an integer because user ID integer fair assumption and online or offline.   {#369}
CTX| [00:23:19] STUDENT_1: So I'll store a boolean true or false.   {#370}
CTX| [00:23:21] STUDENT_1: True means online, false means offline.   {#371}
CTX| [00:23:23] STUDENT_1: And for all the users, I'll store this information.   {#372}
CTX| [00:23:26] STUDENT_1: So this is a classic key value use case.   {#373}
CTX| [00:23:30] STUDENT_1: It's just access pattern.   {#374}
CTX| [00:23:31] STUDENT_1: It's not kind of database.   {#375}
CTX| [00:23:33] STUDENT_1: I'm just picking the access pattern.   {#376}
CTX| [00:23:35] STUDENT_1: Because for a set of users, give me their online offline status.   {#377}
CTX| [00:23:38] STUDENT_1: For a single user, give me the status.   {#378}
CTX| [00:23:41] STUDENT_1: For a single user, update the status.   {#379}
CTX| [00:23:42] STUDENT_1: These are the operations that we would do.   {#380}
CTX| [00:23:44] STUDENT_1: So here, when we look at this, what we find is that this is a very key value type use case.   {#381}
CTX| [00:23:52] STUDENT_1: It's still not decided on the database, right?   {#382}
CTX| [00:23:54] STUDENT_1: But we know that this is the access pattern that we would typically operate on.   {#383}
