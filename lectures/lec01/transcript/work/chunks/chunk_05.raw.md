# chunk_05  OWNS 00:45:45 -> 00:58:43  (segments #784-#989, 2155 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:44:47] TEACHER: So keep those things in mind.   {#763}
CTX| [00:44:49] TEACHER: Now, in the context of medium, what we do is,   {#764}
CTX| [00:44:53] TEACHER: And it's not that like one thing to I should add is that it's either or it's not that you either vertically scale or there you horizontally scale.   {#765}
CTX| [00:45:02] TEACHER: And so there's a sweet spot.   {#766}
CTX| [00:45:04] TEACHER: When you are starting up, when you're very young product, you do vertical scaling because you don't want to mess up things.   {#767}
CTX| [00:45:11] TEACHER: And with horizontal scaling deployment becomes complex and whatnot.   {#768}
CTX| [00:45:14] TEACHER: You do vertical scaling at first.   {#769}
CTX| [00:45:15] TEACHER: And then after a certain stage you scale horizontally.   {#770}
CTX| [00:45:18] TEACHER: Right.   {#771}
CTX| [00:45:18] TEACHER: But always ensure you don't do any premature optimization.   {#772}
CTX| [00:45:21] TEACHER: That's the root of all even.   {#773}
CTX| [00:45:23] TEACHER: necessarily you are optimizing things, optimizing infrastructures for unnecessary reasons.   {#774}
CTX| [00:45:28] TEACHER: Don't do that.   {#775}
CTX| [00:45:28] TEACHER: Right.   {#776}
CTX| [00:45:29] TEACHER: So we start simple.   {#777}
CTX| [00:45:30] TEACHER: We first vertically scale API servers and then put a load balancer and horizontally scale   {#778}
CTX| [00:45:35] TEACHER: the system.   {#779}
CTX| [00:45:35] TEACHER: Third week we'll design a load balancer.   {#780}
CTX| [00:45:37] TEACHER: You'll see how this is done.   {#781}
CTX| [00:45:38] TEACHER: We just draw a box right now, but we'll go in depth of load balancer and how it is implemented   {#782}
CTX| [00:45:42] TEACHER: in the third.   {#783}

---- OWNED SEGMENTS START ----
[00:45:45] TEACHER: But horizontal scaling, when people talk about it, people talk about horizontal scaling in   {#784}
[00:45:53] TEACHER: API servers. Like here, we drew multiple API servers and we called it horizontal scaling.   {#785}
[00:45:58] TEACHER: But, but, but there is a catch. You just cannot scale things horizontally because when you add   {#786}
[00:46:06] TEACHER: more machines to your fleet as part of horizontal scaling to handle that large traffic, what about   {#787}
[00:46:13] TEACHER: the database? What about things that these API servers depend on? Databases, centralized cache,   {#788}
[00:46:23] TEACHER: you horizontally scale the system, you are accepting a large number of requests from the user on the   {#789}
[00:46:29] TEACHER: service. All the service would forward requests to their dependent components database, central   {#790}
[00:46:35] TEACHER: caches, other services and whatnot. They would go down because they are not prepared for the scale.   {#791}
[00:46:41] TEACHER: So whenever you are scaling, always do a bottom up scaling. So ensure that your database can   {#792}
[00:46:49] TEACHER: handle the scale, then you horizontally scale your API servers and then your users make the   {#793}
[00:46:54] TEACHER: request on that.   {#794}
[00:46:55] TEACHER: So if your service depends on some other three or four service, they need to be properly horizontally   {#795}
[00:47:01] TEACHER: scalable.   {#796}
[00:47:03] TEACHER: And if it's a massive campaign, they need to scale up explicitly, then you will scale up.   {#797}
[00:47:08] TEACHER: So it's always bottom up.   {#798}
[00:47:10] TEACHER: So for massive campaigns, it's a team, it's an organization, it's an org level effort.   {#799}
[00:47:16] TEACHER: Everyone needs to agree on that.   {#800}
[00:47:19] TEACHER: They need to provide your document on how they do it   {#801}
[00:47:23] TEACHER: so that you understand how you should auto scale.   {#802}
[00:47:28] TEACHER: You cannot just auto scale assuming that things would work just fine   {#803}
[00:47:33] TEACHER: because in a distributed system,   {#804}
[00:47:36] TEACHER: one thing that has caused the most number of outages   {#805}
[00:47:42] TEACHER: and I'm so sure about it because I read so many outage reports   {#806}
[00:47:45] TEACHER: is cascading failures.   {#807}
[00:47:49] TEACHER: When one component or rather when one component goes down, that component.   {#808}
[00:47:54] TEACHER: So let's say this component went down because of it, this component would go   {#809}
[00:47:58] TEACHER: down because of it, this component would go down because of it, the user would   {#810}
[00:48:02] TEACHER: not be able to use the platform.   {#811}
[00:48:04] TEACHER: So it's always cascading failures that becomes the root cause of all,   {#812}
[00:48:09] TEACHER: all the major outages.   {#813}
[00:48:11] TEACHER: You have to prevent that.   {#814}
[00:48:13] TEACHER: So that is where always understand that whenever you are doing massive   {#815}
[00:48:17] TEACHER: scaling, it's a bottom up event.   {#816}
[00:48:20] TEACHER: to ensure that ensure how they do it is their problem.   {#817}
[00:48:24] TEACHER: But you have to ensure that the components that you depend on,   {#818}
[00:48:28] TEACHER: they are scaled, they're able to handle the load and then you scale up.   {#819}
[00:48:33] TEACHER: And so on and so forth.   {#820}
[00:48:35] TEACHER: Okay.   {#821}
[00:48:35] TEACHER: So now enough of this.   {#822}
[00:48:37] TEACHER: Arbet, how do you scale it?   {#823}
[00:48:38] TEACHER: Right.   {#824}
[00:48:39] TEACHER: How do you scale a database?   {#825}
[00:48:40] TEACHER: Because that's the most common because database, as I always tell this repetitive,   {#826}
[00:48:45] TEACHER: I am very repetitive about this, that database is the most critical   {#827}
[00:48:50] TEACHER: and the most brittle component of our infrastructure.   {#828}
[00:48:53] TEACHER: Because if DB goes down, everything is done.   {#829}
[00:48:55] TEACHER: So scaling database is the most basic thing that you should do.   {#830}
[00:49:00] TEACHER: So how do you scale a database?   {#831}
[00:49:03] TEACHER: I am not talking about simple stuff.   {#832}
[00:49:05] TEACHER: Let me talk about actual implementation of it.   {#833}
[00:49:07] TEACHER: That's where the magic happens.   {#834}
[00:49:09] TEACHER: So first is the easy one where you do vertical scaling.   {#835}
[00:49:12] TEACHER: You have a small database.   {#836}
[00:49:13] TEACHER: You go to AWS console.   {#837}
[00:49:15] TEACHER: a machine type you get a bigger database right that's the easy part vertical scaling of systems   {#838}
[00:49:20] TEACHER: but then comes horizontal scaling now because obviously vertical scaling has a limit so you   {#839}
[00:49:26] TEACHER: need horizontal scaling so how do you do it first is read replicas in most applications out there   {#840}
[00:49:31] TEACHER: the read to write ratio is 90 is to 10 or 99 is to 1 right but it's basically very heavily skewed   {#841}
[00:49:40] TEACHER: in terms of reads.   {#842}
[00:49:41] TEACHER: For example, even in blogging application, a lot of people would read the blog versus   {#843}
[00:49:46] TEACHER: create the blog.   {#844}
[00:49:48] TEACHER: A lot of people on YouTube would review the content versus create the content.   {#845}
[00:49:53] TEACHER: So almost it's prevalent that readers are more than writers.   {#846}
[00:49:58] TEACHER: Given this, you would expect a large amount of read traffic hitting your database versus   {#847}
[00:50:05] TEACHER: write traffic.   {#848}
[00:50:07] TEACHER: which means that if you handle reads well, problem is solved.   {#849}
[00:50:12] TEACHER: You can handle master scale.   {#850}
[00:50:13] TEACHER: So how do you handle reads efficiently, which is where read replicas come into the picture.   {#851}
[00:50:19] TEACHER: Now you have a master node, you have a replica node.   {#852}
[00:50:23] TEACHER: There is an asynchronous replication that is wired between the two and it's almost a native   {#853}
[00:50:30] TEACHER: property of the database. Pulse of configuration chain and you can have this replication setup.   {#854}
[00:50:34] TEACHER: In case you don't know how to do it, just a Google search of it.   {#855}
[00:50:37] TEACHER: Setting up a replication between databases, something that SRE team would do day in and   {#856}
[00:50:41] TEACHER: day out.   {#857}
[00:50:41] TEACHER: But in case you are unaware, just do a Google search, how to set up MySQL replication or   {#858}
[00:50:45] TEACHER: any database replication.   {#859}
[00:50:47] TEACHER: So with this, what happens is whenever a write happens on the master, the writes are sent   {#860}
[00:50:53] TEACHER: to the replica.   {#861}
[00:50:55] TEACHER: Okay.   {#862}
[00:50:55] TEACHER: We tell it this way, but in actuality, what happens?   {#863}
[00:50:59] TEACHER: The replica makes a call to the master and reads the changes.   {#864}
[00:51:04] TEACHER: That's what actually happens.   {#865}
[00:51:05] TEACHER: Master is not pushing the changes to the replica.   {#866}
[00:51:09] TEACHER: Replica is pulling the changes from the master.   {#867}
[00:51:11] TEACHER: Always remember.   {#868}
[00:51:12] TEACHER: This is how a Asikrass replication actually works.   {#869}
[00:51:15] TEACHER: So you have a replica over here.   {#870}
[00:51:19] TEACHER: You have a master over here.   {#871}
[00:51:21] TEACHER: What you would do is you would write all the write requests will go to the master.   {#872}
[00:51:26] TEACHER: right then asynchronously they would be replicated on the replica.   {#873}
[00:51:31] TEACHER: Now what you want is you want reads to go to replica right and writes to go over here.   {#874}
[00:51:37] TEACHER: So now how it happens database automatically does not do anything.   {#875}
[00:51:43] TEACHER: You have to do the heavy lifting.   {#876}
[00:51:45] TEACHER: So if this is your API server, your API server will create connections with both the databases.   {#877}
[00:51:53] TEACHER: So remember, recall when you set up a database and you connect it with your API server.   {#878}
[00:52:00] TEACHER: In the code you write, you create a database connection, you pass the connection string   {#879}
[00:52:03] TEACHER: and you create a database connection object.   {#880}
[00:52:05] TEACHER: There in the connection string, you pass two connection strings   {#881}
[00:52:08] TEACHER: and you create two database objects.   {#882}
[00:52:10] TEACHER: One for this, one for master, one for replica.   {#883}
[00:52:13] TEACHER: Now in your business logic, let's say you are reading profile of a user.   {#884}
[00:52:18] TEACHER: You can use connection object of replica to fire the query.   {#885}
[00:52:23] TEACHER: over here, right?   {#886}
[00:52:25] TEACHER: For example, when you're creating a blog, you use the connection   {#887}
[00:52:27] TEACHER: object of the master so that it will use this to write to the master.   {#888}
[00:52:32] TEACHER: Right?   {#889}
[00:52:33] TEACHER: So it's your business logic.   {#890}
[00:52:34] TEACHER: You can, there is a magic layer that solves it automatically.   {#891}
[00:52:38] TEACHER: There are tools that aids you, but in a most naive way, most basic   {#892}
[00:52:42] TEACHER: way, most simplistic way, you are the one who can, who know, depending   {#893}
[00:52:47] TEACHER: on your use case, which reads are not so critical and can be   {#894}
[00:52:53] TEACHER: from replicas while which writes or which reads are critical and should go to master.   {#895}
[00:52:59] TEACHER: For example, banks, the reads of the bank, where for example, reading a profile of a   {#896}
[00:53:07] TEACHER: user in a bank, a bank website, reading a profile of a user that can go to replica,   {#897}
[00:53:12] TEACHER: but reading of account balance have to go to master.   {#898}
[00:53:16] TEACHER: Imagine someone, your friend sent you money and he said, it's there, but it's not.   {#899}
[00:53:21] TEACHER: and you freak out and say, you did not give me money and whatnot.   {#900}
[00:53:25] TEACHER: So reading an account balance is a critical read,   {#901}
[00:53:29] TEACHER: which should go to the master.   {#902}
[00:53:32] TEACHER: Why?   {#903}
[00:53:33] TEACHER: Reading the profile and random information can go to Replica.   {#904}
[00:53:36] TEACHER: So it's your context.   {#905}
[00:53:38] TEACHER: It's your application.   {#906}
[00:53:39] TEACHER: So you know which writes are not so critical   {#907}
[00:53:42] TEACHER: that you can send to Replica   {#908}
[00:53:44] TEACHER: by using the database connection object that you always create.   {#909}
[00:53:48] TEACHER: Remember connecting MySQL, Postgres, MongoDB.   {#910}
[00:53:51] TEACHER: Create two connections.   {#911}
[00:53:53] TEACHER: And now in your business, you say, okay, for this use case, use this one.   {#912}
[00:53:56] TEACHER: In the API handler, you use that corresponding connection object to fire the page.   {#913}
[00:54:00] TEACHER: This is exactly how people use it.   {#914}
[00:54:04] TEACHER: There's an intermediate proxy layer.   {#915}
[00:54:06] TEACHER: We'll talk about it in fifth or sixth way, but not going into those details.   {#916}
[00:54:10] TEACHER: This is the most basic way of implementation, right?   {#917}
[00:54:12] TEACHER: That you create database connection with both the databases and depending on the use case,   {#918}
[00:54:17] TEACHER: you pick one versus the other.   {#919}
[00:54:20] TEACHER: Now this is how you have a replica setup.   {#920}
[00:54:23] TEACHER: Now the next step, what if here you have a master, you added a bunch of replicas.   {#921}
[00:54:29] TEACHER: Now what happens when you get more traffic than that on your master?   {#922}
[00:54:33] TEACHER: You vertically scale your master, but what happens beyond that?   {#923}
[00:54:36] TEACHER: Which is where you shard the database.   {#924}
[00:54:39] TEACHER: So the problem here is that the data is so huge.   {#925}
[00:54:44] TEACHER: The load is so huge that OneNote is not able to handle it.   {#926}
[00:54:49] TEACHER: You split the data because the data itself is used,   {#927}
[00:54:52] TEACHER: the node itself cannot handle it.   {#928}
[00:54:53] TEACHER: So you have to have multiple nodes, which is what you do is you shard the database,   {#929}
[00:54:58] TEACHER: which means you create here as per this diagram,   {#930}
[00:55:01] TEACHER: you create three mutually exclusive subset of data   {#931}
[00:55:06] TEACHER: and distribute it among the three nodes that you have.   {#932}
[00:55:10] TEACHER: All the three are master.   {#933}
[00:55:12] TEACHER: Each one may have its own replica.   {#934}
[00:55:14] TEACHER: No problem in that.   {#935}
[00:55:16] TEACHER: No one's stopping it from having its own replica.   {#936}
[00:55:19] TEACHER: the idea is that your API server would have some logic to know, depending on this request,   {#937}
[00:55:26] TEACHER: which database server should I go to.   {#938}
[00:55:28] TEACHER: That's the routing layer where your API server itself, let's say you are sharding by user   {#939}
[00:55:34] TEACHER: ID.   {#940}
[00:55:35] TEACHER: So some user go over here, some user go over here, some user go over here and it has to   {#941}
[00:55:39] TEACHER: be fixed.   {#942}
[00:55:40] TEACHER: So hash off user ID and you do hash based routing.   {#943}
[00:55:44] TEACHER: Now the thing is in the API server, you create connection with all the three databases.   {#944}
[00:55:49] TEACHER: Depending on the request, you see for which user the request is, you forward   {#945}
[00:55:52] TEACHER: the request to that corresponding node, get the answer and send it back.   {#946}
[00:55:56] TEACHER: Right.   {#947}
[00:55:56] TEACHER: This is literally how you do it.   {#948}
[00:55:58] TEACHER: So if you have three shots or API server creates three database   {#949}
[00:56:01] TEACHER: connections with this simple, right?   {#950}
[00:56:04] TEACHER: This is the most naive, most basic implementation, like way to implement   {#951}
[00:56:07] TEACHER: this highly recommend you to do this locally.   {#952}
[00:56:10] TEACHER: When you hit production system, you might see fancy proxy layers   {#953}
[00:56:14] TEACHER: sitting in between and water.   {#954}
[00:56:15] TEACHER: We'll talk about it in week five, right?   {#955}
[00:56:17] TEACHER: How that app implemented.   {#956}
[00:56:19] TEACHER: things like understanding how it actually works then adding complexity of an intermediate proxy   {#957}
[00:56:24] TEACHER: layer is different so first understand how you can actually do it naively and then you find other   {#958}
[00:56:29] TEACHER: tools that helps you do it because not all databases have those intermediate proxy layers   {#959}
[00:56:33] TEACHER: right so you cannot just expect that to be there on all databases so that's why knowing how to do it   {#960}
[00:56:39] TEACHER: in the most basic way is essential for you to understand how it functions right so here the   {#961}
[00:56:45] TEACHER: The API server itself has this logic to know which database to talk to   {#962}
[00:56:48] TEACHER: and it forwards the request to that database and it gets fixed up.   {#963}
[00:56:54] TEACHER: This is all about databases, how to do it.   {#964}
[00:56:58] TEACHER: Next week, we'll talk about databases, but on concurrency part,   {#965}
[00:57:02] TEACHER: on transactions part and all.   {#966}
[00:57:04] TEACHER: But this is how you scale a database, which is the most important part of it   {#967}
[00:57:08] TEACHER: because scaling of API servers is easy.   {#968}
[00:57:12] TEACHER: Autoscaling groups, horizontal pod, autoscaler.   {#969}
[00:57:15] TEACHER: thing to scale the API servers, right?   {#970}
[00:57:17] TEACHER: Load valancers, this is anyway there to handle it because API servers are   {#971}
[00:57:20] TEACHER: stateless, it makes your life very simple, but things become very interesting.   {#972}
[00:57:24] TEACHER: When you'd want to scale a data.   {#973}
[00:57:26] TEACHER: These are three very common ways of scaling a database.   {#974}
[00:57:30] TEACHER: Any questions on the scaling part before I move to dedication?   {#975}
[00:57:35] TEACHER: Go on Nitin.   {#976}
[00:57:38] STUDENT_1: So I have a question on the ReReplica type of scaling.   {#977}
[00:57:42] STUDENT_1: So, so over here we are using the master node as a, for all the right operations.   {#978}
[00:57:49] STUDENT_1: So what if the master goes down and I mean, it's an outage, master goes down, it's an   {#979}
[00:57:56] TEACHER: outage.   {#980}
[00:57:57] STUDENT_1: I think, I mean, during college time, we read about different types of architecture, like   {#981}
[00:58:04] STUDENT_1: in this case, it would be like a multi-layered architecture where the master is the root of   {#982}
[00:58:12] STUDENT_1: And then, uh, there are, uh, read replicas beyond, I mean, the children are the replicas   {#983}
[00:58:18] STUDENT_1: of the master note.   {#984}
[00:58:19] STUDENT_1: So whenever the master note, I mean, the master notes are used for a right and, uh, reads,   {#985}
[00:58:25] STUDENT_1: but, uh, if, uh, the rights are propagated to its children.   {#986}
[00:58:29] STUDENT_1: Okay.   {#987}
[00:58:29] STUDENT_1: In a synchronous manner, whenever a master note goes down, then there's a, uh, kind of   {#988}
[00:58:36] STUDENT_1: voting system between all the, yeah, leader election.   {#989}
---- OWNED SEGMENTS END ----

CTX| [00:58:43] STUDENT_1: another node becomes as a master,   {#990}
CTX| [00:58:46] STUDENT_1: till that the master nodes goes up.   {#991}
CTX| [00:58:48] STUDENT_1: Correct.   {#992}
CTX| [00:58:48] TEACHER: That's a way to automatically recover from failures.   {#993}
CTX| [00:58:51] TEACHER: But you may not always see that in production.   {#994}
CTX| [00:58:55] TEACHER: Not always.   {#995}
CTX| [00:58:56] TEACHER: There are some systems that use leader election   {#996}
CTX| [00:58:58] TEACHER: and that's the way to do automatic recover from failures.   {#997}
CTX| [00:59:03] TEACHER: But in most cases,   {#998}
CTX| [00:59:04] TEACHER: you would see because the world is cloud native now.   {#999}
CTX| [00:59:08] TEACHER: If you are building AWS,   {#1000}
CTX| [00:59:09] TEACHER: you would have to do leader election.   {#1001}
CTX| [00:59:10] TEACHER: But if you are using AWS,   {#1002}
CTX| [00:59:12] TEACHER: AWS itself will do leader election for you and have a standby node become   {#1003}
CTX| [00:59:16] TEACHER: and basically promote a replica to be the master and whatnot.   {#1004}
CTX| [00:59:19] TEACHER: It would do it internet.   {#1005}
CTX| [00:59:20] TEACHER: Right.   {#1006}
CTX| [00:59:21] TEACHER: So talking from a practical perspective, we'll talk about   {#1007}
CTX| [00:59:23] TEACHER: leader election next week, next to next week.   {#1008}
CTX| [00:59:26] TEACHER: Right.   {#1009}
CTX| [00:59:26] TEACHER: But here when you talk about in simplistic way, I'm not over   {#1010}
CTX| [00:59:30] TEACHER: complicating it on first week.   {#1011}
CTX| [00:59:32] TEACHER: But when you talk about it simplistic way, what you're talking about   {#1012}
CTX| [00:59:35] TEACHER: leader election, where your replica becomes a master and all that is   {#1013}
CTX| [00:59:38] TEACHER: there, that is recovery.   {#1014}
CTX| [00:59:39] TEACHER: That is automatic recovering from failures.   {#1015}
CTX| [00:59:42] TEACHER: kicks in, right?   {#1016}
