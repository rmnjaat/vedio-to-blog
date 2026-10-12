# chunk_06  OWNS 00:59:55 -> 01:11:11  (segments #870-#1034, 1915 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:59:55] TEACHER: Let's start with the   {#870}
[00:59:56] TEACHER: the second half so now what we'll talk about is we'll talk about how amazon does it uh fii i know   {#871}
[01:00:03] TEACHER: this because the team that did it sat right next to me so i used to attend a bunch of tech talks   {#872}
[01:00:09] TEACHER: there but uh i had a bunch of questions to them and kept on asking it clear how do folks do that   {#873}
[01:00:14] TEACHER: and they were kind enough to explain it in a in a public tech talk so okay so what amazon does   {#874}
[01:00:21] TEACHER: is for every order that you place is they assign a global ID to that order and that is unique.   {#875}
[01:00:29] TEACHER: Given the high throughputness of the system and plus not just this that they provide ID to a lot   {#876}
[01:00:36] TEACHER: of other internal services. One of them happens to be order which we all use on a day-to-day basis.   {#877}
[01:00:43] TEACHER: So that had to be unique. So what they had is they you leverage batching. Batching is one of the most   {#878}
[01:00:51] TEACHER: performance out of any system FII.   {#879}
[01:00:53] TEACHER: So what they do is they have something like this.   {#880}
[01:00:56] TEACHER: They have a bunch of API servers.   {#881}
[01:01:00] TEACHER: You can literally write this thing in 150 lines of code, not even exaggerated.   {#882}
[01:01:06] TEACHER: It's that simple to write.   {#883}
[01:01:08] TEACHER: Scaling you might just have to handle a few other cases here and there, but it's not difficult   {#884}
[01:01:12] TEACHER: for you to write this particular service.   {#885}
[01:01:15] TEACHER: Hardly 150 lines of code, not even kidding about anything else.   {#886}
[01:01:18] TEACHER: Python if you write 150 lines where you can write this entire surface.   {#887}
[01:01:22] TEACHER: So recommending you to write it FII.   {#888}
[01:01:25] TEACHER: Okay.   {#889}
[01:01:26] TEACHER: So APIs, they use a basic API server exposing your ID generation endpoints,   {#890}
[01:01:32] TEACHER: putting behind a load balancer classic thing and have a database.   {#891}
[01:01:35] TEACHER: Have a database.   {#892}
[01:01:36] TEACHER: Now this database is a classic relational database.   {#893}
[01:01:38] TEACHER: No fancy non-relational database.   {#894}
[01:01:40] TEACHER: I don't like to necessarily complicate things.   {#895}
[01:01:42] TEACHER: Normal relational database would work over here.   {#896}
[01:01:45] TEACHER: So what we do is similar to how we did not write to the disk every time we generated an ID,   {#897}
[01:01:55] TEACHER: we did it in batches.   {#898}
[01:01:57] TEACHER: Once every thousand ID generated things.   {#899}
[01:02:01] TEACHER: Similarly, we do things over here that instead of calling your remote service   {#900}
[01:02:06] TEACHER: every time you need an ID, you get a batch of IDs in one shot.   {#901}
[01:02:11] TEACHER: That's the core idea.   {#902}
[01:02:13] TEACHER: You would have seen a ton of videos, a few videos on YouTube about this, but let me go   {#903}
[01:02:18] TEACHER: into implementation details of it.   {#904}
[01:02:20] TEACHER: Given that we covered airline checking system, this becomes a piece of cake.   {#905}
[01:02:23] TEACHER: So now what would happen is, let's say I have two services, orders and payments.   {#906}
[01:02:31] TEACHER: When order service wants IDs.   {#907}
[01:02:34] TEACHER: So these are the servers that are running the order service.   {#908}
[01:02:38] TEACHER: These are servers that are running the payment service.   {#909}
[01:02:43] TEACHER: They don't care about monotonicity, FYI.   {#910}
[01:02:45] TEACHER: They don't care about monotonicity.   {#911}
[01:02:46] TEACHER: They need uniqueness as simple as that.   {#912}
[01:02:49] TEACHER: So now what you do is when order service wants an ID, any server of that makes a call to this   {#913}
[01:02:58] TEACHER: API, to this ID generation service and says, Hey, I just booted up.   {#914}
[01:03:02] TEACHER: Can you give me 500 IDs?   {#915}
[01:03:05] TEACHER: So it just requests for 500 IDs.   {#916}
[01:03:08] TEACHER: The request comes to this API server.   {#917}
[01:03:09] TEACHER: API server fires a SQL query on this team.   {#918}
[01:03:13] TEACHER: SQL query that, Hey, I need 500.   {#919}
[01:03:16] TEACHER: So it wrote 500 over here.   {#920}
[01:03:18] TEACHER: So 0 to 500.   {#921}
[01:03:20] TEACHER: So the range is sent to this server.   {#922}
[01:03:24] TEACHER: So 0 to 500 range.   {#923}
[01:03:26] TEACHER: You don't have to send individual IDs.   {#924}
[01:03:28] TEACHER: No start and end.   {#925}
[01:03:30] TEACHER: It's just integers, right?   {#926}
[01:03:32] TEACHER: So start and end, just send it at this range belongs to you.   {#927}
[01:03:35] TEACHER: And you update it in this database.   {#928}
[01:03:37] TEACHER: Now you can very quickly start thinking, Oh, exclusive.   {#929}
[01:03:43] TEACHER: You would do it for update like select start from this for update do it in a transaction so that it does not like multiple requests for a particular service does not affect.   {#930}
[01:03:52] TEACHER: All of that comes together.   {#931}
[01:03:54] TEACHER: So you would atomically update it in a transaction of the final value that is handed already handed over.   {#932}
[01:04:02] TEACHER: So let's say server one came up.   {#933}
[01:04:04] TEACHER: It said I don't have any ID to work with.   {#934}
[01:04:06] TEACHER: So I'll go to this and get 500 IDs.   {#935}
[01:04:09] TEACHER: to this server, updates this to 500 and responds back with this range, not independent IDs,   {#936}
[01:04:16] TEACHER: no needed. Why to send so much of data over network, just start and end, problem solved.   {#937}
[01:04:21] TEACHER: Then let's say server 2 came up and said, hey, give me another 500, I am new one, give me 500   {#938}
[01:04:27] TEACHER: more IDs. So it would make a call, call would go over here, it would go over here, it would say 500   {#939}
[01:04:33] TEACHER: plus plus, plus plus equal to 500, it get 1000. So it sends 500 to 1000 in response over here.   {#940}
[01:04:39] TEACHER: So now server two has this range.   {#941}
[01:04:41] TEACHER: Server one has range from zero to 500.   {#942}
[01:04:44] TEACHER: This is from 500 to 1000.   {#943}
[01:04:46] TEACHER: Now, order service, when they start getting the request from external world about orders,   {#944}
[01:04:52] TEACHER: when the request comes to this order services web server, they already have in memory this range.   {#945}
[01:04:58] TEACHER: Now, when they would want to generate, they would have their own databases, orders database or something.   {#946}
[01:05:03] TEACHER: They can start putting data into orders database, not really having to worry about anything.   {#947}
[01:05:07] TEACHER: The idea being that because they already have the range of IDs in memory, they can start   {#948}
[01:05:12] TEACHER: pulling that out.   {#949}
[01:05:14] TEACHER: And that becomes the globally unique IDs for that particular product.   {#950}
[01:05:19] TEACHER: And they can prefix it whatever they would want to do in case they follow those conventions.   {#951}
[01:05:23] TEACHER: But the idea is that this way, this central ID generation service just decouples the system.   {#952}
[01:05:29] TEACHER: Now you can have any number of service, order service can have any number of databases without   {#953}
[01:05:34] TEACHER: having any problem because ID generation service is separate and orders database separate so I can   {#954}
[01:05:39] TEACHER: shard order database and scale it horizontally without having any problem not needing and any   {#955}
[01:05:44] TEACHER: every one of those database can start accepting the rights this way what happens is that your   {#956}
[01:05:50] TEACHER: server does not have to make call every time to this ID generation service to get a set of IDs   {#957}
[01:05:55] TEACHER: I use 500 as a small example in reality it is 10 000 50 000 100 000 and depending on the throughput   {#958}
[01:06:01] TEACHER: of the service right okay disadvantage of this is in case your server got this range and then   {#959}
[01:06:09] TEACHER: its server crashed this range is gone so putting this range keeping this range too small means you   {#960}
[01:06:16] TEACHER: are making two frequent network calls to get the set of ids if it is too large and if your server   {#961}
[01:06:21] TEACHER: crashes you are losing that entire range so it's up to you your service your throughput in order   {#962}
[01:06:25] TEACHER: to fine tune how many service at max will you get it in a batch. It's up to you. You make that call,   {#963}
[01:06:32] TEACHER: you get it. Similarly, you had one entry for orders. Similarly, you would have one entry for   {#964}
[01:06:37] TEACHER: payment service. So when your payment service handles the request, it would not have to talk   {#965}
[01:06:42] TEACHER: to the central ID generation service every time. Instead, your server can load it once or once it   {#966}
[01:06:47] TEACHER: is about to be exhausted, it would load it and start using it whenever it wants to do that,   {#967}
[01:06:52] TEACHER: whenever it wants to process the payment.   {#968}
[01:06:55] TEACHER: Once any of this server sees that my IDs are getting exhausted,   {#969}
[01:06:59] TEACHER: let's say it got 500, 490 are already exhausted,   {#970}
[01:07:03] TEACHER: what it would do, it would make call and get another 500.   {#971}
[01:07:07] TEACHER: It might get some, let's say, 3000 to 3500.   {#972}
[01:07:10] TEACHER: So now it would have those rates,   {#973}
[01:07:11] TEACHER: it would start using from that particular range that it has.   {#974}
[01:07:15] TEACHER: So we are still not guaranteeing monotonicity across servers,   {#975}
[01:07:18] TEACHER: but you are handing them those IDs in batches.   {#976}
[01:07:22] TEACHER: This is how Amazon does it.   {#977}
[01:07:25] TEACHER: Really simple, very simple to build.   {#978}
[01:07:28] TEACHER: You can very clearly see how we can do this in transaction.   {#979}
[01:07:31] TEACHER: Airline check-in system, Ctrl-C, Ctrl-V over here.   {#980}
[01:07:34] TEACHER: Read, in transaction, update, atomically do plus equal to whatever range was,   {#981}
[01:07:40] TEACHER: or rather, however ID was requested.   {#982}
[01:07:42] TEACHER: You get the old value, you get the new value,   {#983}
[01:07:44] TEACHER: you send it as a range over here,   {#984}
[01:07:46] TEACHER: and server starts using those IDs over here.   {#985}
[01:07:49] TEACHER: So here, the single source of truth,   {#986}
[01:07:52] TEACHER: Because this is single server, it doesn't have to gossip with anyone.   {#987}
[01:07:56] TEACHER: You can very easily scale the system and just, it's just one update.   {#988}
[01:07:59] TEACHER: You don't even have to read all of it.   {#989}
[01:08:01] TEACHER: Just one minuscule tiny update that you're making in a database.   {#990}
[01:08:05] TEACHER: Every time someone wants this idea.   {#991}
[01:08:08] TEACHER: Right?   {#992}
[01:08:08] TEACHER: Okay.   {#993}
[01:08:09] TEACHER: This is how Amazon does it.   {#994}
[01:08:10] TEACHER: Any questions?   {#995}
[01:08:14] STUDENT_1: Rajiv?   {#996}
[01:08:16] STUDENT_1: I was wondering why it was in this architecture, a database not used for server   {#997}
[01:08:25] STUDENT_1: hello i'm audible now   {#998}
[01:08:32] TEACHER: yeah i have a question like oh wait wait wait sorry it must be problem with my mic wait wait   {#999}
[01:08:48] STUDENT_9: Yeah, Rajiv, go on.   {#1000}
[01:08:50] STUDENT_1: Audible, Apit now?   {#1001}
[01:08:51] STUDENT_1: No, no, no, yes, yes.   {#1002}
[01:08:53] STUDENT_1: Apit, I was wondering why was that a database not used to keep track of information, how   {#1003}
[01:08:58] STUDENT_1: much out of range a server has used and then when it comes up, it uses that information   {#1004}
[01:09:03] STUDENT_1: to start consuming from there.   {#1005}
[01:09:05] STUDENT_9: Why would you want to do that?   {#1006}
[01:09:07] STUDENT_1: I mean, I know that the range is appropriate enough, those IDs would get wasted.   {#1007}
[01:09:12] STUDENT_1: I mean, 100 IDs were used, 5, 4 out of 500, 400 got wasted with this thing.   {#1008}
[01:09:19] STUDENT_1: let's say we go for 10,000 now for the same thing.   {#1009}
[01:09:23] STUDENT_1: So 9,900 ideas got lost.   {#1010}
[01:09:25] STUDENT_1: I mean, there's no way to again, go back and use them.   {#1011}
[01:09:28] TEACHER: Imagine the overhead that you would have to keep in   {#1012}
[01:09:30] TEACHER: in order to keep track of every single one of them.   {#1013}
[01:09:32] TEACHER: That's a massive overhead.   {#1014}
[01:09:33] TEACHER: Why?   {#1015}
[01:09:35] STUDENT_10: Okay.   {#1016}
[01:09:36] TEACHER: Imagine big integer 2-264.   {#1017}
[01:09:39] TEACHER: Will you ever exhaust that number?   {#1018}
[01:09:41] TEACHER: If that Amazon is 500 trillion dollar company.   {#1019}
[01:09:48] STUDENT_1: it's okay it's okay boys under practical use usage of it then yeah obviously like think about   {#1020}
[01:09:55] TEACHER: practicality at every step don't just think oh i have to use every single every single id that is   {#1021}
[01:10:01] TEACHER: out there no one cares about it it's just few range of numbers because we tend to underestimate   {#1022}
[01:10:06] TEACHER: the numbers for example 1 million to 1 billion if i talk about it we just use 1 million like it's   {#1023}
[01:10:13] TEACHER: nothing. 1 million is a huge number. 1 billion is huge number.   {#1024}
[01:10:18] TEACHER: The difference between a million and a billion is almost   {#1025}
[01:10:21] TEACHER: equal to a billion and that's huge. Right.   {#1026}
[01:10:25] TEACHER: And we just use it like this 1 million, 4 billion, 5 billion.   {#1027}
[01:10:31] TEACHER: It's massive, massive, massive numbers and for a four by   {#1028}
[01:10:36] TEACHER: integer 4 billion, 4 billion orders.   {#1029}
[01:10:39] TEACHER: Imagine 4 billion orders of Amazon.   {#1030}
[01:10:41] TEACHER: sound right if you exhaust that making 64 bits make it 8 by 20 meters 2x to 64.   {#1031}
[01:10:47] TEACHER: not very much it's big enough range for you to not worry about it okay mohit yeah like if monotonicity   {#1032}
[01:10:57] STUDENT_3: was not a requirement then why not just go ahead with a uuid kind of approach let's talk about it   {#1033}
[01:11:03] TEACHER: let's talk about it like why not uuid so if uuid already exists for it why people are not   {#1034}
---- OWNED SEGMENTS END ----

CTX| [01:11:11] TEACHER: companies at scale don't prefer it.   {#1035}
CTX| [01:11:13] TEACHER: First of all, for folks who don't know what UUID is, UUIDs are 128 bit integers.   {#1036}
CTX| [01:11:18] TEACHER: Integers as it, 128 bit strings, which can be represented as gigantic integers.   {#1037}
CTX| [01:11:22] TEACHER: They are extremely inefficient at scale.   {#1038}
CTX| [01:11:27] TEACHER: Array, how my company is using UUID, are we inefficient at scale?   {#1039}
CTX| [01:11:32] TEACHER: Yes, you are.   {#1040}
CTX| [01:11:33] TEACHER: Okay, let me break up.   {#1041}
CTX| [01:11:34] TEACHER: So, in the second week pre-reads, I shared a video on how indexes make database read faster.   {#1042}
CTX| [01:11:44] TEACHER: In that we saw that indexes are also just tables with indexed values and the IDs of   {#1043}
CTX| [01:11:52] TEACHER: the rows that it points to.   {#1044}
CTX| [01:11:54] TEACHER: For example, post table has user ID and post ID and post title and whatnot.   {#1045}
CTX| [01:12:01] TEACHER: If you are creating an index on user ID, it is effectively a new B plus three or a new   {#1046}
CTX| [01:12:05] TEACHER: table which is created in which just two columns are there.   {#1047}
CTX| [01:12:08] TEACHER: Just to visualize in which you have first column as post user ID, second value as post ID.   {#1048}
