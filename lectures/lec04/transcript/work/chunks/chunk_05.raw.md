# chunk_05  OWNS 00:46:38 -> 00:59:38  (segments #715-#933, 2195 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:45:42] TEACHER: this database exposes them to user right really simplistic system right okay now given that we   {#708}
CTX| [00:45:52] TEACHER: have two choices and i specifically even in periods i mentioned read about redis and dynamo db right   {#709}
CTX| [00:45:56] TEACHER: we will probe some discussions around it so given that we have two choices one is redis one is   {#710}
CTX| [00:46:04] TEACHER: both gives us key value both gives us expiration right which one would you choose for the system   {#711}
CTX| [00:46:10] TEACHER: and why so raise your hand i'll pull you in we'll go in the we'll go in the order right sometimes i   {#712}
CTX| [00:46:18] STUDENT_1: just skip the order to give people fair chances to speak up right but uh raise your hands don't   {#713}
CTX| [00:46:24] STUDENT_1: barge it raise your hands i'll pull you in and uh which one would you pick redis dynamo db and   {#714}

---- OWNED SEGMENTS START ----
[00:46:38] STUDENT_4: I think I can go with the DynamoDB.   {#715}
[00:46:42] STUDENT_4: Why?   {#716}
[00:46:45] STUDENT_4: I want to store data permanently maybe sometime.   {#717}
[00:46:50] STUDENT_4: So persistence is required.   {#718}
[00:46:53] TEACHER: Why would you need persistence for this?   {#719}
[00:46:56] STUDENT_1: We said that 30 seconds gone, your data is anyway deleted.   {#720}
[00:47:05] STUDENT_4: expiration. Redis can go down. Redis is in memory database. So it can also go down and   {#721}
[00:47:11] STUDENT_4: DynamoDB is something that is self managed. It's managed by the AWS. So I don't have to   {#722}
[00:47:16] STUDENT_1: worry about that. You're going in because of manage. So what advantage does a managed   {#723}
[00:47:22] STUDENT_4: service give you? I don't have to worry about that. It's managed by the AWS. So it will   {#724}
[00:47:28] STUDENT_4: be highly available and that is something that i have to manage that so i have to take care of that   {#725}
[00:47:34] STUDENT_1: part okay so you are offloading the management part to the cloud vendor that you have so that   {#726}
[00:47:43] STUDENT_1: you focus more on the business logic brilliant so you're going that for persistence and managed   {#727}
[00:47:47] STUDENT_4: great yeah so in case like if i'm managing the infrastructure like if we have so much money then   {#728}
[00:47:54] STUDENT_4: And in that case, we can go with the Redis also.   {#729}
[00:47:58] STUDENT_1: Yeah, no, that's fine.   {#730}
[00:47:59] STUDENT_1: That's fine.   {#731}
[00:48:00] STUDENT_1: Let others bring out other points.   {#732}
[00:48:03] STUDENT_1: It's fine.   {#733}
[00:48:04] TEACHER: So you are going for persistence and manage because of it, you pick Dynamite.   {#734}
[00:48:08] TEACHER: That's right.   {#735}
[00:48:08] TEACHER: Okay.   {#736}
[00:48:09] TEACHER: Yes, Jodhita, which one would you pick?   {#737}
[00:48:13] STUDENT_2: Having it as a managed solution is one of the key decisions that depends on your team size.   {#738}
[00:48:19] STUDENT_2: If you have the team size.   {#739}
[00:48:20] STUDENT_2: to service.   {#740}
[00:48:23] STUDENT_2: One other thing can be depending on your, again, on your team size, Redis can help you   {#741}
[00:48:27] STUDENT_2: prevent vendor lock-in if that is a concern that you have, because Dynamo would probably   {#742}
[00:48:32] STUDENT_2: be sort of like logged into AWS and it'll be harder to migrate off of it.   {#743}
[00:48:40] STUDENT_1: What happens with vendor lock-in?   {#744}
[00:48:41] STUDENT_1: Like, why is vendor lock-in such a big issue?   {#745}
[00:48:45] STUDENT_2: I mean, a lot of times people think it's a big issue and very often it doesn't end   {#746}
[00:48:50] STUDENT_2: up being that's what I feel but yeah vendor lock and can be an issue in case the pricing starts   {#747}
[00:48:56] STUDENT_2: being unmanageable or maybe the other rest of your infra slowly starts moving to some other provider   {#748}
[00:49:02] STUDENT_1: or something like that why would that happen why would you switch a cloud provider depends like   {#749}
[00:49:08] STUDENT_2: sometimes you get better deals like better deals with that cloud provider for your business so   {#750}
[00:49:14] STUDENT_1: Anything else that you can think of apart from cost?   {#751}
[00:49:18] STUDENT_2: Sometimes it can be for security.   {#752}
[00:49:20] STUDENT_2: Like we had some issues with Azure last year and that might end up breaking some   {#753}
[00:49:28] STUDENT_2: particular security or something like that.   {#754}
[00:49:31] STUDENT_2: So for example, there were some issues with their databases where the access was something,   {#755}
[00:49:37] STUDENT_2: something was messed up that happened a few years ago.   {#756}
[00:49:41] STUDENT_2: and that might be a very big concern for something like a bank although banks often like have their   {#757}
[00:49:47] STUDENT_2: own infra but that's a fair part something like that so you might want to like slowly like if   {#758}
[00:49:53] STUDENT_2: something like that keeps happening you might to shift off of it for example in GCP if you might   {#759}
[00:49:58] STUDENT_2: have started with GCP but GCP is a little bit infamous for discontinuing services so you might   {#760}
[00:50:03] STUDENT_2: be like okay I want to like slowly shift off to AWS because they support a lot of things for a   {#761}
[00:50:10] TEACHER: Brilliant. Okay. Vendor locking, all these concerns, very valid, caused some major issues or   {#762}
[00:50:17] TEACHER: mess ups from the cloud vendor or not having enough trust or you eventually find out that,   {#763}
[00:50:23] TEACHER: hey, this is not the right trust because it's too complex to use. But I just want to add one   {#764}
[00:50:28] TEACHER: more point around vendor lock-in. So first of all, what vendor lock-in is, is here, let's say we are   {#765}
[00:50:33] STUDENT_1: using GCP. So then we are, so GCP becomes our vendor, right? So let's say I'm a startup, I'm   {#766}
[00:50:40] STUDENT_1: building this online offline and I'm hosted on GCP. So GCP is a vendor that I'm using. So vendor   {#767}
[00:50:45] STUDENT_1: lock-in is a term which people use, which means that I'm locked in with this particular vendor,   {#768}
[00:50:51] TEACHER: right? Now, given that DynamoDB is AWS specific, which is specifically one of the reasons why I   {#769}
[00:50:57] TEACHER: picked DynamoDB so that I cover this point of vendor lock-in. With vendor lock-in, what happens   {#770}
[00:51:01] STUDENT_1: is you cannot move out of that easily because the tool that you are using is only with that   {#771}
[00:51:07] STUDENT_1: DynamoDB is only with AWS.   {#772}
[00:51:09] STUDENT_1: DynamoDB is not with GCP or not with Azure.   {#773}
[00:51:11] STUDENT_1: So this way, if tomorrow you'd want to use something else, you'd have to rewrite your   {#774}
[00:51:17] STUDENT_1: entire code thinking about that other technology.   {#775}
[00:51:21] STUDENT_1: So this is a biggest concern where if people would want to move clouds either from GCP to   {#776}
[00:51:27] STUDENT_1: aws or aws to azure or somewhere around that they would have to rewrite a bunch of their code   {#777}
[00:51:32] STUDENT_1: which is where when organizations reach a certain maturity level they think about vendor locking a   {#778}
[00:51:38] STUDENT_1: lot right and few reasons uh around vendor locking obviously jyothi the rajd some brilliant points   {#779}
[00:51:44] STUDENT_1: but one very interesting reason that i would want to bring out is competition for example   {#780}
[00:51:52] STUDENT_1: Amazon is known to enter into hundreds of businesses right Amazon let's say Amazon   {#781}
[00:51:58] STUDENT_1: launch Amazon foods right Amazon foods in India they launched now Swiggy and Zomato   {#782}
[00:52:03] STUDENT_1: they are on AWS Amazon foods Amazon company hosted on AWS now what happens is with Swiggy   {#783}
[00:52:12] STUDENT_1: and Zomato now that Amazon entered their business now Swiggy and Zomato are on AWS I'm not sure   {#784}
[00:52:18] STUDENT_1: what they are on but if they are on AWS then they are literally feeding their competitor   {#785}
[00:52:23] STUDENT_1: because they are giving the the bill that they would incur on AWS goes into Amazon's pocket   {#786}
[00:52:29] STUDENT_1: which can then use to basically power their foods business right so they don't want people to   {#787}
[00:52:36] STUDENT_1: feed their competitors so you are on AWS and AWS enters your business you are gone so you are   {#788}
[00:52:43] STUDENT_1: actually feeding your competitor you don't do that so this is one of the main reasons why for   {#789}
[00:52:48] STUDENT_1: Walmart is not on AWS.   {#790}
[00:52:50] STUDENT_1: They are competitors.   {#791}
[00:52:52] STUDENT_1: Walmart is on GCP, right?   {#792}
[00:52:54] STUDENT_1: Classic reason because Walmart is an e-commerce.   {#793}
[00:52:56] STUDENT_1: Amazon is an e-commerce.   {#794}
[00:52:58] STUDENT_1: If Walmart is on this, then they are actually feeding their computer.   {#795}
[00:53:01] STUDENT_1: So we don't do it.   {#796}
[00:53:02] STUDENT_1: And this is not something that is pre-established.   {#797}
[00:53:06] STUDENT_1: For example, you were on AWS and let's say Amazon entered your business.   {#798}
[00:53:11] STUDENT_1: Now what you will do?   {#799}
[00:53:12] TEACHER: Like you cannot feed your, and it's not that startups do it.   {#800}
[00:53:18] TEACHER: organization having massive bills with AWS, let's say $10 million a month, you are literally paying   {#801}
[00:53:23] TEACHER: your competitor $10 million a month. And that's bad. So Amazon, I'm just using them as an example   {#802}
[00:53:32] TEACHER: because there are tons of them, but other companies also, Azure, Google, Microsoft,   {#803}
[00:53:38] TEACHER: Alibaba, everybody is known for that. So when they enter into business as your competitor and you are   {#804}
[00:53:43] TEACHER: that big customer you don't want that to meddle you right you don't you want to ensure that you   {#805}
[00:53:49] TEACHER: are not feeding your competitor so which is where hang on those lines and you don't have to do it   {#806}
[00:53:56] TEACHER: when you're working at a very early start-up because your bill is ten thousand dollars   {#807}
[00:53:59] TEACHER: hardly it does not matter to amazon at all right but if you're a big customer you always think   {#808}
[00:54:05] TEACHER: about this so that's why walmart on gcp and not on amazon but one counter example of that netflix   {#809}
[00:54:14] TEACHER: Netflix existed in the past.   {#810}
[00:54:16] TEACHER: Like it already existed.   {#811}
[00:54:18] TEACHER: Then Amazon entered into prime,   {#812}
[00:54:20] TEACHER: like using the prime video.   {#813}
[00:54:21] TEACHER: So prime video and Netflix are competitor.   {#814}
[00:54:25] TEACHER: But still Netflix is still on AWS.   {#815}
[00:54:28] TEACHER: Why?   {#816}
[00:54:29] TEACHER: Because they cannot now move out of it.   {#817}
[00:54:31] TEACHER: They have to rewrite so much of code.   {#818}
[00:54:32] TEACHER: So they said, it's okay.   {#819}
[00:54:33] TEACHER: We will continue to feed our customers   {#820}
[00:54:35] TEACHER: and they have this mutual agreement between them.   {#821}
[00:54:37] TEACHER: To some extent.   {#822}
[00:54:38] TEACHER: I don't know the details,   {#823}
[00:54:39] TEACHER: but yeah, that Netflix is still not moving out of AWS.   {#824}
[00:54:44] TEACHER: So they might give them better deal because Netflix is the biggest customer of AWS.   {#825}
[00:54:50] TEACHER: So these things really matter in real world.   {#826}
[00:54:53] TEACHER: When you're drawing or when you're designing a system, you might not think about it,   {#827}
[00:54:57] TEACHER: but in real world, when you design real systems, these are extremely critical points to think about.   {#828}
[00:55:02] TEACHER: Vendor lock-in, one of them.   {#829}
[00:55:04] TEACHER: That's what I wanted to just to exaggerate on vendor lock-in a bit,   {#830}
[00:55:08] TEACHER: that a lot of people said, which is why you see a lot of people   {#831}
[00:55:10] TEACHER: going in the open source technologies   {#832}
[00:55:13] TEACHER: direction rather than going for something   {#833}
[00:55:14] TEACHER: proprietary because they don't want to   {#834}
[00:55:16] TEACHER: be locked in a particular vendor.   {#835}
[00:55:19] TEACHER: Okay. Yes, Rahul?   {#836}
[00:55:22] STUDENT_3: So,   {#837}
[00:55:22] STUDENT_3: there are a few points that I would like   {#838}
[00:55:25] STUDENT_3: to move. First is persistence.   {#839}
[00:55:26] STUDENT_3: Persistence is also   {#840}
[00:55:28] STUDENT_3: available on Redis also.   {#841}
[00:55:30] STUDENT_3: So, like that   {#842}
[00:55:31] STUDENT_3: point is like   {#843}
[00:55:33] STUDENT_3: persistence is also available on Redis.   {#844}
[00:55:36] STUDENT_3: Also, Redis   {#845}
[00:55:38] STUDENT_10: How you can configure it?   {#846}
[00:55:41] STUDENT_3: So there is a blog that I have like read a while ago.   {#847}
[00:55:45] STUDENT_3: I have a link for this also.   {#848}
[00:55:48] STUDENT_3: I think I have shared that on the chat also, like Redis has persistence, like persistence   {#849}
[00:55:54] STUDENT_3: management, not one thing.   {#850}
[00:55:59] TEACHER: Always be like, always know how that is done.   {#851}
[00:56:02] TEACHER: It's good to know that Redis gives you persistence, how they give it.   {#852}
[00:56:06] TEACHER: you should know   {#853}
[00:56:08] TEACHER: because you should be basically   {#854}
[00:56:10] TEACHER: pushing your boundaries on that   {#855}
[00:56:11] TEACHER: and you should know those details   {#856}
[00:56:12] TEACHER: instead of just knowing   {#857}
[00:56:13] TEACHER: that it gives persistence.   {#858}
[00:56:14] TEACHER: How it gives you   {#859}
[00:56:15] TEACHER: AOF file, RDB files,   {#860}
[00:56:17] TEACHER: how you configure it,   {#861}
[00:56:18] TEACHER: what's the flush frequency.   {#862}
[00:56:20] TEACHER: So again,   {#863}
[00:56:22] TEACHER: just keep those things in mind   {#864}
[00:56:23] TEACHER: that be aware of everything   {#865}
[00:56:25] TEACHER: and try to remember them.   {#866}
[00:56:27] TEACHER: Okay.   {#867}
[00:56:27] TEACHER: Persistence, Redis gives you persistence.   {#868}
[00:56:29] TEACHER: I totally agree on that.   {#869}
[00:56:30] TEACHER: So if you need it,   {#870}
[00:56:31] TEACHER: you can configure it on Redis   {#871}
[00:56:32] TEACHER: but there are few limitations   {#872}
[00:56:33] TEACHER: of that as well.   {#873}
[00:56:34] TEACHER: But take it.   {#874}
[00:56:36] STUDENT_3: Second thing is like Redis is also like provided by many,   {#875}
[00:56:40] STUDENT_3: like all of the crowd providers that I know,   {#876}
[00:56:43] STUDENT_3: AWS CCB as a managed service also.   {#877}
[00:56:47] STUDENT_3: So you can have like managed Redis   {#878}
[00:56:50] STUDENT_3: and you can also move on from one cloud provider   {#879}
[00:56:53] STUDENT_3: to other providers if it is needed   {#880}
[00:56:55] STUDENT_3: because like the underlying code will be the same.   {#881}
[00:56:58] STUDENT_3: Okay.   {#882}
[00:56:59] STUDENT_3: Correct.   {#883}
[00:56:59] STUDENT_11: All of them.   {#884}
[00:57:00] STUDENT_3: Okay.   {#885}
[00:57:01] STUDENT_3: And the third thing that I like to,   {#886}
[00:57:04] STUDENT_3: I would like to think about is like,   {#887}
[00:57:06] STUDENT_3: how can we like the data, like how much data we are using. Okay. So I also searched for the   {#888}
[00:57:15] STUDENT_3: databases that like, no, not databases, data types that are in Redis. Okay. So from what I'm able,   {#889}
[00:57:23] STUDENT_3: able to read, Redis only has string data types in, in the terms we are storing. Okay.   {#890}
[00:57:31] STUDENT_3: Okay.   {#891}
[00:57:32] STUDENT_3: And the DynamoDB has like the numbers data type also.   {#892}
[00:57:38] STUDENT_3: I have also provided the link.   {#893}
[00:57:39] STUDENT_1: Even Redis has numbers.   {#894}
[00:57:41] STUDENT_1: Even Redis has numbers.   {#895}
[00:57:42] STUDENT_1: It's not just industry.   {#896}
[00:57:44] STUDENT_1: Redis has a bunch of data structures, a bunch of them.   {#897}
[00:57:48] STUDENT_1: But what you are looking for is the looking for future extensibility.   {#898}
[00:57:53] STUDENT_1: So if tomorrow, if you would want to support some complex use cases on top of this, instead   {#899}
[00:57:58] STUDENT_1: of just having key value, how likely like not, it may not be very relevant in online   {#900}
[00:58:03] STUDENT_1: offline use case, but this is a very important point that, Hey, will you in future require   {#901}
[00:58:09] TEACHER: some additional complexities in your feature, which requires you to have advanced data structures   {#902}
[00:58:16] TEACHER: like bloom filters, like hyperlog logs, like a geo special queries and whatnot, which is   {#903}
[00:58:21] TEACHER: where Redis comes into play.   {#904}
[00:58:22] TEACHER: So you may be more tempted to go towards Redis.   {#905}
[00:58:25] TEACHER: if you know that in the future, you might see something like this.   {#906}
[00:58:30] TEACHER: Okay.   {#907}
[00:58:31] STUDENT_1: So future extensibility is a very good point.   {#908}
[00:58:34] STUDENT_1: And may not be relevant to online or offline, but other use cases.   {#909}
[00:58:37] STUDENT_1: Sure.   {#910}
[00:58:39] STUDENT_4: Thanks Rahul for adding that.   {#911}
[00:58:41] STUDENT_4: Arpeth, in that case, in DynamoDB also, we can use a stream and Lambda for that.   {#912}
[00:58:47] STUDENT_4: Shalimda, please don't barge in.   {#913}
[00:58:49] STUDENT_4: Please, please.   {#914}
[00:58:50] TEACHER: Yeah, we can do that.   {#915}
[00:58:52] TEACHER: We can do that.   {#916}
[00:58:55] TEACHER: database in the world is evolving, they have a bunch of features.   {#917}
[00:58:58] TEACHER: Bunch of features.   {#918}
[00:58:59] TEACHER: So we just have to keep track of it.   {#919}
[00:59:01] TEACHER: Okay.   {#920}
[00:59:01] TEACHER: If we need that or not.   {#921}
[00:59:03] TEACHER: And when you talk about DynamoDB streams, Redis also gives you CDCs out of that.   {#922}
[00:59:07] TEACHER: Right.   {#923}
[00:59:08] TEACHER: Every database gives you everything.   {#924}
[00:59:10] TEACHER: World is converging really fast.   {#925}
[00:59:13] TEACHER: MongoDB supports ACID, SQL support sharding now, everything's happening.   {#926}
[00:59:18] TEACHER: Right.   {#927}
[00:59:19] TEACHER: So we just have to be open to every single thing.   {#928}
[00:59:22] STUDENT_1: So before you make decisions, go in depth of every single candidates that you have and   {#929}
[00:59:27] TEACHER: understand the pros and cons, depending on what suits you the best, you make that decision.   {#930}
[00:59:32] TEACHER: Okay.   {#931}
[00:59:33] TEACHER: I'll take one more.   {#932}
[00:59:35] TEACHER: Yes.   {#933}
---- OWNED SEGMENTS END ----

CTX| [00:59:38] TEACHER: So online often indication is something which is time sensitive.   {#934}
CTX| [00:59:43] TEACHER: And if I want it in the real time, I would choose Redis.   {#935}
CTX| [00:59:46] TEACHER: So let's say if there are 500 million users who are active and I want to query, then of   {#936}
CTX| [00:59:55] TEACHER: course, between Redis and Dynamo Redis will be faster.   {#937}
CTX| [00:59:59] TEACHER: Yeah.   {#938}
CTX| [01:00:00] TEACHER: But why would it be faster?   {#939}
CTX| [01:00:02] TEACHER: Is it only because it's in memory?   {#940}
CTX| [01:00:06] TEACHER: Yeah, in memory and even the performance Redis is better.   {#941}
CTX| [01:00:14] TEACHER: Not really.   {#942}
CTX| [01:00:15] TEACHER: What you would get more out of this for time sensitivity is the persistent   {#943}
CTX| [01:00:18] TEACHER: connections that you can hold with DynamoDB.   {#944}
CTX| [01:00:21] TEACHER: You cannot create persistent relations.   {#945}
CTX| [01:00:23] TEACHER: It's stateless.   {#946}
CTX| [01:00:24] TEACHER: Okay.   {#947}
CTX| [01:00:24] TEACHER: With Redis, you create persistent connections, which is what would give you   {#948}
CTX| [01:00:28] TEACHER: that extreme low latency that you require.   {#949}
CTX| [01:00:30] TEACHER: It obviously comes with a cost, but you get that.   {#950}
CTX| [01:00:33] TEACHER: That's how you get this time sensitivity.   {#951}
CTX| [01:00:35] TEACHER: Right.   {#952}
CTX| [01:00:36] TEACHER: It does that.   {#953}
CTX| [01:00:36] TEACHER: See, everyone might not be aware of all the features, right?   {#954}
