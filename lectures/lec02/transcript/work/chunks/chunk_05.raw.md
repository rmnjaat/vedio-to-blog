# chunk_05  OWNS 00:50:04 -> 01:03:30  (segments #850-#985, 1314 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:49:07] TEACHER: deep in graph database, three level deep, a simple graph query   {#835}
CTX| [00:49:11] TEACHER: would give you that answer graph traversal and you get that answer   {#836}
CTX| [00:49:13] TEACHER: in relational databases for N level deep, you have to write N self   {#837}
CTX| [00:49:19] TEACHER: Correct.   {#838}
CTX| [00:49:20] TEACHER: Now this cannot be one generic query, but depending on each level of join, you have   {#839}
CTX| [00:49:24] TEACHER: to write or rewrite that query and then fire it.   {#840}
CTX| [00:49:29] TEACHER: That is painful.   {#841}
CTX| [00:49:30] TEACHER: Right.   {#842}
CTX| [00:49:31] TEACHER: Plus n self joins on a table may not be very optimal when your data is huge.   {#843}
CTX| [00:49:36] TEACHER: Third, your data is stored in one data node in terms of relational DB.   {#844}
CTX| [00:49:40] TEACHER: So part-triotic sharding exists, but graph databases give you out of the box.   {#845}
CTX| [00:49:44] STUDENT_4: Yeah.   {#846}
CTX| [00:49:45] STUDENT_4: theory part understood but do you have any like no reference to a resource which can explain like   {#847}
CTX| [00:49:51] STUDENT_4: no real time like no use case just google search you're just a google search graph databases in   {#848}
CTX| [00:49:56] TEACHER: fraud detection graph databases in recommendation engine you'll find tons of articles above okay   {#849}

---- OWNED SEGMENTS START ----
[00:50:04] STUDENT_6: yeah one more question relating to the uh sequel versus non-sql databases like these days   {#850}
[00:50:09] STUDENT_6: MongoDB also offers ACID properties.   {#851}
[00:50:13] STUDENT_6: Not performed.   {#852}
[00:50:15] STUDENT_6: Okay.   {#853}
[00:50:16] TEACHER: It's a distributed transaction.   {#854}
[00:50:17] TEACHER: Slows down.   {#855}
[00:50:18] TEACHER: In their official documentation,   {#856}
[00:50:19] TEACHER: it says that please use ACID sparingly.   {#857}
[00:50:24] TEACHER: It says that in their official documentation   {#858}
[00:50:27] TEACHER: because cross-shard ACID compliance is costly.   {#859}
[00:50:31] TEACHER: It is implemented using a distributed transaction.   {#860}
[00:50:33] TEACHER: Distributed transaction slows down the throughput.   {#861}
[00:50:36] TEACHER: Within shard ACID, anyone can guarantee.   {#862}
[00:50:40] TEACHER: ACID MongoDB guarantees, but it says that you're losing out on throughput.   {#863}
[00:50:44] TEACHER: It's there in the official documentation.   {#864}
[00:50:46] TEACHER: In the ACID part of it, you'll find it a line that says,   {#865}
[00:50:50] TEACHER: please use it sparing or something on similar lines.   {#866}
[00:50:53] TEACHER: And it says that it does it using distributed transaction.   {#867}
[00:50:57] TEACHER: Because of it, you should not use it more often.   {#868}
[00:50:59] TEACHER: If you need something like this, you should use it.   {#869}
[00:51:01] TEACHER: And I've also found it in the Wiretigers documentation as well.   {#870}
[00:51:05] TEACHER: Same thing.   {#871}
[00:51:06] TEACHER: Right. So, yeah. So people claim ACID, cross-shad ACID is only done through distributed transaction, which slows down the throughput. And you typically should not do it when you need high throughput.   {#872}
[00:51:20] TEACHER: Sampar?   {#873}
[00:51:20] STUDENT_4: uh yeah so yesterday we we we tried to design the kv store on relational databases right and   {#874}
[00:51:31] STUDENT_2: now we can also see that we can use non-relational databases for kv stores because kv stores don't   {#875}
[00:51:38] STUDENT_2: usually have the relations so the only is this the deciding factor for a kv store being in a   {#876}
[00:51:46] STUDENT_2: SQL database and non-SQL database.   {#877}
[00:51:49] STUDENT_2: No, no, no.   {#878}
[00:51:49] TEACHER: KV store are databases of themselves.   {#879}
[00:51:52] TEACHER: Like they are in their own league.   {#880}
[00:51:54] TEACHER: We just mimic an access pattern.   {#881}
[00:51:57] TEACHER: Right.   {#882}
[00:51:57] TEACHER: So DynamoDB is a key value store.   {#883}
[00:51:59] TEACHER: Redis is a key value store.   {#884}
[00:52:00] TEACHER: Right.   {#885}
[00:52:00] TEACHER: They have the different storage engines to implement it.   {#886}
[00:52:03] TEACHER: Redis does it in memory.   {#887}
[00:52:03] TEACHER: DynamoDB does it on disk.   {#888}
[00:52:05] TEACHER: Right.   {#889}
[00:52:06] TEACHER: So what changes is the underlying storage layer.   {#890}
[00:52:08] TEACHER: Right.   {#891}
[00:52:09] TEACHER: KV is just an access pattern.   {#892}
[00:52:11] TEACHER: It does not define the underlying store.   {#893}
[00:52:14] TEACHER: Correct.   {#894}
[00:52:14] TEACHER: Okay.   {#895}
[00:52:14] STUDENT_2: So if I have a KV access pattern use case, so how do I decide whether I should choose   {#896}
[00:52:21] STUDENT_2: a relational and non-relational?   {#897}
[00:52:23] STUDENT_2: Is it just the correctness part?   {#898}
[00:52:26] STUDENT_2: Correct.   {#899}
[00:52:27] STUDENT_2: What else?   {#900}
[00:52:28] STUDENT_2: Okay.   {#901}
[00:52:30] TEACHER: Otherwise you can go for a specialized KV store as well, like Daryl Abu Devi or Redis.   {#902}
[00:52:34] TEACHER: If you need something like that, that's why I understand the features that you need from   {#903}
[00:52:38] TEACHER: it, because you may not always need to build a KV store from scratch because KV is just   {#904}
[00:52:42] TEACHER: an access pattern.   {#905}
[00:52:44] STUDENT_2: Okay. Okay. So in, in that way, if I, if I implement KV store in our relational database   {#906}
[00:52:52] STUDENT_2: and instead use, uh, DynamoDB or Redis. So in terms of scaling factor, all, all of them   {#907}
[00:53:01] STUDENT_2: will perform same. Is it?   {#908}
[00:53:04] STUDENT_2: No, it depends on how you, what you're storing, how we are storing, how you are accessing   {#909}
[00:53:07] TEACHER: what's the throughput, how we are partitioning, how we are sharding the data, a ton of factors,   {#910}
[00:53:11] TEACHER: You just cannot use something as a black box.   {#911}
[00:53:14] TEACHER: It is very dependent on what, for example, if you store it to store massive block values,   {#912}
[00:53:20] TEACHER: each of let's say four MB size, then relational databases would cry their heart out.   {#913}
[00:53:24] TEACHER: But DynamoDB would work better.   {#914}
[00:53:26] TEACHER: If you're storing a small amount of data, you would see like, so the performance characteristics   {#915}
[00:53:32] TEACHER: varies depending on what you're storing and how you're querying the data.   {#916}
[00:53:39] STUDENT_4: Okay.   {#917}
[00:53:41] TEACHER: we are using something how we are using something okay all right thank you yeah folks we'll take a   {#918}
[00:53:48] TEACHER: break for five minutes today early break because we have a very long discussion coming up so first   {#919}
[00:53:53] TEACHER: i've done uh we just scratched the surface of non-relational databases but throughout this course   {#920}
[00:53:58] TEACHER: we use every single one of them at different places one of them we'll use right here right   {#921}
[00:54:02] TEACHER: in this one so when we come back five minutes break we'll see back at 10 when we come back uh   {#922}
[00:54:08] TEACHER: We'll discuss slags, real-time communication, a ton of brainstorming.   {#923}
[00:54:12] TEACHER: We'll ask how, how, how, why, why, why at every single step before we make any decision.   {#924}
[00:54:17] TEACHER: So we'll do that in order to solidify our understanding.   {#925}
[00:54:21] TEACHER: So see you folks at 10 after 5.   {#926}
[00:54:24] TEACHER: Thanks folks.   {#927}
[00:59:43] TEACHER: Thank you.   {#928}
[01:00:05] TEACHER: Let's start with the second half. Now what we'll do is we'll design Slack real-time   {#929}
[01:00:10] TEACHER: communication. So one thing that I kind of hate is how when people put out   {#930}
[01:00:16] TEACHER: they say design Slack, entire Slack you will design, right? So what we'll do is instead   {#931}
[01:00:23] TEACHER: we'll focus on this just one part of it and do it really well. So Slack real-time communication   {#932}
[01:00:29] TEACHER: bracket all text that's it nothing more only text based real-time communication which means   {#933}
[01:00:37] TEACHER: messages that you see here and there holds ruba teams teams insta facebook whatever right but   {#934}
[01:00:43] TEACHER: we'll keep it simple we'll understand the foundational building blocks we'll understand   {#935}
[01:00:49] TEACHER: the small nitty gritties of it how we're making design decision okay the requirements for this   {#936}
[01:00:55] TEACHER: This is pretty simple.   {#937}
[01:00:56] TEACHER: We have multiple users, multiple channels.   {#938}
[01:00:58] TEACHER: Let's assume that we are only talking about one organization on Slack on which you have   {#939}
[01:01:02] TEACHER: there are multiple employees, multiple channels part of it.   {#940}
[01:01:05] TEACHER: User can direct message another user or can put a message in a channel.   {#941}
[01:01:12] TEACHER: The chat needs to be real time and historical messages can be scrolled.   {#942}
[01:01:18] TEACHER: So for example, if a user posted a message on a channel, you can just scroll through   {#943}
[01:01:22] TEACHER: the channel and go to historical messages.   {#944}
[01:01:25] TEACHER: These are the things that we have to like, we need to adhere to or we need to build.   {#945}
[01:01:30] TEACHER: Right.   {#946}
[01:01:31] TEACHER: This same thing can be used to build ton of stuff, multiplayer games, real time chat,   {#947}
[01:01:35] TEACHER: interactions, real time polls, creative tools and whatnot.   {#948}
[01:01:39] TEACHER: Right.   {#949}
[01:01:39] TEACHER: You can use the same architecture to build a bunch of stuff, but the key highlight of   {#950}
[01:01:43] TEACHER: this would be how we are making certain decisions instead of just like, you know, we'll have   {#951}
[01:01:48] TEACHER: this boxes.   {#952}
[01:01:49] TEACHER: We'll go into those implementation nitty gritties of it and build better systems out there.   {#953}
[01:01:54] TEACHER: Okay.   {#954}
[01:01:55] TEACHER: We'll quick off our brainstorming and we'll cover all these parts, channels, messages,   {#955}
[01:02:00] TEACHER: checkpoints, and real-time communication.   {#956}
[01:02:02] TEACHER: Through this, we'll talk about scaling web sockets and all.   {#957}
[01:02:04] TEACHER: Directly jumping to web sockets is not a good idea.   {#958}
[01:02:07] TEACHER: We'll cover a bunch of stuff, then we come to web sockets and then we scale it.   {#959}
[01:02:11] TEACHER: Okay, so let's start with brainstorming.   {#960}
[01:02:14] TEACHER: Let's start with simple stuff.   {#961}
[01:02:16] TEACHER: Schemas.   {#962}
[01:02:17] TEACHER: That's the easiest thing to start with, right?   {#963}
[01:02:19] TEACHER: So how would you go about designing basic schema for only these features, not other random stuff.   {#964}
[01:02:26] TEACHER: Only these features, multiple users, channels, user can DM messages, chat and stuff.   {#965}
[01:02:31] TEACHER: What would be a schema?   {#966}
[01:02:32] TEACHER: And this does not mean we are using relational database, FYI.   {#967}
[01:02:35] TEACHER: It's just a schema.   {#968}
[01:02:37] TEACHER: It's just that these are the entities, these are the attributes of it.   {#969}
[01:02:40] TEACHER: This does not mean we are using relational database.   {#970}
[01:02:44] TEACHER: It depends on the kind of guarantees we want to put and then we pick the database.   {#971}
[01:02:49] TEACHER: Okay.   {#972}
[01:02:50] TEACHER: Let's start with this.   {#973}
[01:02:51] TEACHER: How would you store the data?   {#974}
[01:02:53] TEACHER: What would be the basic schema of this?   {#975}
[01:02:57] TEACHER: Raise your hands.   {#976}
[01:02:58] TEACHER: I'll pull you in.   {#977}
[01:03:01] TEACHER: Yeah, Pankaj.   {#978}
[01:03:04] STUDENT_1: Yeah.   {#979}
[01:03:05] STUDENT_1: So what I'm thinking right now is there would be one table for users.   {#980}
[01:03:10] STUDENT_1: So user with their ID name and if they have like some nickname, which they can have.   {#981}
[01:03:18] TEACHER: That's okay.   {#982}
[01:03:19] TEACHER: What else?   {#983}
[01:03:20] STUDENT_1: And then there would be a channel stable, uh, would have like a main   {#984}
[01:03:25] STUDENT_1: organization ID and the channel ID.   {#985}
---- OWNED SEGMENTS END ----

CTX| [01:03:30] STUDENT_1: Then there would be like a messages table, uh, which will have like, uh,   {#986}
CTX| [01:03:36] STUDENT_1: which like two user, like basically the channel ID in which the user   {#987}
CTX| [01:03:40] STUDENT_11: sent the message and.   {#988}
CTX| [01:03:43] STUDENT_11: Okay.   {#989}
CTX| [01:03:43] STUDENT_11: Okay.   {#990}
CTX| [01:03:44] TEACHER: Before that, before that, before that, how do you know which   {#991}
CTX| [01:03:46] TEACHER: user are part of which channel?   {#992}
CTX| [01:03:50] TEACHER: You need to store it somewhere, right?   {#993}
CTX| [01:03:52] STUDENT_1: Yeah.   {#994}
CTX| [01:03:52] STUDENT_1: So there would be like, what we can call it, membership table or something like that,   {#995}
CTX| [01:04:00] STUDENT_1: which will store which user is part of which channel.   {#996}
CTX| [01:04:03] TEACHER: How did you come up with this name?   {#997}
CTX| [01:04:05] TEACHER: Membership?   {#998}
CTX| [01:04:07] TEACHER: Looking over here?   {#999}
CTX| [01:04:10] STUDENT_11: No, I didn't see that.   {#1000}
CTX| [01:04:12] TEACHER: That's good.   {#1001}
CTX| [01:04:13] TEACHER: That's good.   {#1002}
CTX| [01:04:13] TEACHER: Right?   {#1003}
CTX| [01:04:14] TEACHER: If you did not, but you still came up with this word, that's brilliant.   {#1004}
CTX| [01:04:17] TEACHER: Why I say this?   {#1005}
CTX| [01:04:19] TEACHER: this, they say that, Hey, that table would be in a user's channel table.   {#1006}
CTX| [01:04:23] TEACHER: A lot of people would name it like this.   {#1007}
CTX| [01:04:26] TEACHER: And I'm a little against this.   {#1008}
CTX| [01:04:28] TEACHER: Why?   {#1009}
CTX| [01:04:29] TEACHER: Because this is the easy way to name stuff user channel.   {#1010}
