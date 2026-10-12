# chunk_04  OWNS 00:34:48 -> 00:45:45  (segments #574-#783, 1915 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:33:49] TEACHER: So local browser, CDN, load balancer, API server RAM, API server disk, then database materialized use.   {#556}
CTX| [00:34:00] TEACHER: And in other case, the way you would want to leverage the database.   {#557}
CTX| [00:34:03] TEACHER: And obviously centralized remote cache is there.   {#558}
CTX| [00:34:06] TEACHER: So along this entire common layer of infrastructure that we always have, every single place you can pass.   {#559}
CTX| [00:34:13] TEACHER: But then you get some, you lose some.   {#560}
CTX| [00:34:16] TEACHER: There is always a trade-off.   {#561}
CTX| [00:34:18] TEACHER: So in this case, specifically, I'm highlighting this,   {#562}
CTX| [00:34:21] TEACHER: the trading of strong consistency between this.   {#563}
CTX| [00:34:23] TEACHER: And you should be, if you are okay with that,   {#564}
CTX| [00:34:24] TEACHER: if your data is not changing much,   {#565}
CTX| [00:34:26] TEACHER: then even having two copies of it does not matter.   {#566}
CTX| [00:34:29] TEACHER: Because the data is very infrequently changed in the database.   {#567}
CTX| [00:34:32] TEACHER: So it's okay.   {#568}
CTX| [00:34:34] TEACHER: And if it's okay for you to sell data for some time, do it.   {#569}
CTX| [00:34:37] TEACHER: It's the best thing ever.   {#570}
CTX| [00:34:40] TEACHER: So these are points that I wanted to cover,   {#571}
CTX| [00:34:42] TEACHER: cash at different levels.   {#572}
CTX| [00:34:44] TEACHER: So along the route that we discussed,   {#573}

---- OWNED SEGMENTS START ----
[00:34:48] TEACHER: question every single step and obviously depending on the architecture that you are working on   {#574}
[00:34:52] TEACHER: you would have some different components but every single place in your or every single component in   {#575}
[00:34:58] TEACHER: your architecture will have a will have a way to catch things right so go through that   {#576}
[00:35:04] TEACHER: so i'll take uh basically sunay lanuba vikram amrit amrik and harsh i'll take like you can add it at   {#577}
[00:35:12] TEACHER: the end when we'll have open forum more than happy to hear your thoughts on that right now we'll move   {#578}
[00:35:18] TEACHER: Next part where we'll discuss scaling.   {#579}
[00:35:22] TEACHER: Now here, as I said yesterday, we'll talk about databases part over here.   {#580}
[00:35:27] TEACHER: And I'll tell you exactly how things are implemented.   {#581}
[00:35:30] TEACHER: Not just scaling, scaling, but in general how databases are scaled.   {#582}
[00:35:34] TEACHER: Okay.   {#583}
[00:35:35] TEACHER: So scaling in general is having an ability to handle large number of concurrent requests.   {#584}
[00:35:41] TEACHER: Now this concurrent is the key one.   {#585}
[00:35:44] TEACHER: Large number of requests I can handle very easily.   {#586}
[00:35:48] TEACHER: of concurrent requests is what makes your system very interesting.   {#587}
[00:35:52] TEACHER: It's what gives you the challenge, how do I do it?   {#588}
[00:35:55] TEACHER: Because large number of concurrent users are there.   {#589}
[00:35:57] TEACHER: So there are typical two strategies we all have heard,   {#590}
[00:35:59] TEACHER: vertical scaling and horizontal scaling.   {#591}
[00:36:01] TEACHER: So vertical scaling is where you add more resources.   {#592}
[00:36:04] TEACHER: Now everyone knows it, but let me tell you why vertical scaling has a limit.   {#593}
[00:36:10] TEACHER: Why you cannot make your infrastructure larger and larger and larger and larger.   {#594}
[00:36:15] TEACHER: And what's stopping us from doing that?   {#595}
[00:36:18] TEACHER: For example, let's say you have a database in which you have let's say 16 GB RAM, you   {#596}
[00:36:24] TEACHER: want to handle more.   {#597}
[00:36:25] TEACHER: What you did, you add more RAM, more CPU, more things because if you have a bulky machine   {#598}
[00:36:30] TEACHER: to do it, you can get things done.   {#599}
[00:36:32] TEACHER: You can handle large flow.   {#600}
[00:36:34] TEACHER: Now what's stopping you from making it from 16 to 32?   {#601}
[00:36:38] TEACHER: Nothing.   {#602}
[00:36:38] TEACHER: You go to AWS console, change the machine type.   {#603}
[00:36:41] TEACHER: The database is scaled up.   {#604}
[00:36:43] TEACHER: 32, 64, 128, 256, 512, 1 dB, 2 dB, 4 dB.   {#605}
[00:36:48] TEACHER: But why can't you go beyond that?   {#606}
[00:36:51] TEACHER: What happens?   {#607}
[00:36:52] TEACHER: Is it that humans don't have that big, large of machines to work with?   {#608}
[00:36:56] TEACHER: No, we have supercomputers.   {#609}
[00:36:58] TEACHER: So then what's stopping?   {#610}
[00:37:00] TEACHER: What's stopping AWS from giving you that?   {#611}
[00:37:03] TEACHER: What is that one thing that is not allowed?   {#612}
[00:37:05] TEACHER: You cannot just say AWS does not give me an option,   {#613}
[00:37:07] TEACHER: so I cannot do vertical scaling.   {#614}
[00:37:09] TEACHER: That's the most weird answer that I have got.   {#615}
[00:37:12] TEACHER: I've definitely, I've actually heard this answer from a senior engineer,   {#616}
[00:37:16] TEACHER: unfortunately, that I don't see an option beyond that.   {#617}
[00:37:19] TEACHER: But think on a more fundamental way.   {#618}
[00:37:23] TEACHER: Imagine your smartphone.   {#619}
[00:37:25] TEACHER: You bought a smartphone,   {#620}
[00:37:28] TEACHER: you bought a smartphone with an external SD card slot available.   {#621}
[00:37:34] TEACHER: When you purchase that smartphone, it says that it can support external SD card of 256 GB.   {#622}
[00:37:41] TEACHER: What happens if I insert 512 in it?   {#623}
[00:37:45] TEACHER: Like an SD card with 512 GB storage in it.   {#624}
[00:37:48] TEACHER: What happens then?   {#625}
[00:37:49] TEACHER: It would not recognize.   {#626}
[00:37:51] TEACHER: Why it is not recognized?   {#627}
[00:37:53] TEACHER: Because of hardware limitation.   {#628}
[00:37:55] TEACHER: So when any two components, any two hardware components have to interface with each other.   {#629}
[00:38:01] TEACHER: When you insert a USB stick in the USB port that you have.   {#630}
[00:38:10] TEACHER: network card on your motherboard, or you plug in hard disk in your motherboard,   {#631}
[00:38:15] TEACHER: that slot that you have or RAM that you have.   {#632}
[00:38:18] TEACHER: What happens is the cache lines that are there.   {#633}
[00:38:21] TEACHER: So the CPU buses that you may have heard in your college time, right?   {#634}
[00:38:25] TEACHER: Year two, computer science folks, second year, microprocessor, MPT course.   {#635}
[00:38:30] TEACHER: There you would have heard, or the course on computer architecture.   {#636}
[00:38:33] TEACHER: There you have seen buses.   {#637}
[00:38:35] TEACHER: Buses are the one that moves the data across.   {#638}
[00:38:40] TEACHER: has buses.   {#639}
[00:38:42] TEACHER: Your USB stick, the golden   {#640}
[00:38:44] TEACHER: lines that you see, those are buses.   {#641}
[00:38:47] TEACHER: Now these buses   {#642}
[00:38:48] TEACHER: needs to be placed   {#643}
[00:38:50] TEACHER: or these needs to match. These needs   {#644}
[00:38:52] TEACHER: to be compatible with each other.   {#645}
[00:38:54] TEACHER: They need to understand the protocol in which   {#646}
[00:38:56] TEACHER: the data would be sent. Not HTTP protocol   {#647}
[00:38:58] TEACHER: I'm talking about literal hardware   {#648}
[00:39:00] TEACHER: protocol. The way it is would be   {#649}
[00:39:02] TEACHER: sending the bytes over there.   {#650}
[00:39:04] TEACHER: If that does not support it   {#651}
[00:39:06] TEACHER: you cannot go higher.   {#652}
[00:39:08] TEACHER: As simple as that.   {#653}
[00:39:10] TEACHER: And this is what is the reason why you cannot do infinite vertical scaling.   {#654}
[00:39:16] TEACHER: It's not because AWS does not give you that in the drop-down.   {#655}
[00:39:19] TEACHER: It's because of this limitation.   {#656}
[00:39:21] TEACHER: It's because of this hardware limitation.   {#657}
[00:39:24] TEACHER: You cannot do infinite vertical scaling.   {#658}
[00:39:26] TEACHER: Because for you to support that one level up,   {#659}
[00:39:29] TEACHER: you need to literally need a different hardware to do it.   {#660}
[00:39:33] TEACHER: So unless a data center has it, you cannot go beyond that.   {#661}
[00:39:37] TEACHER: Computers has fundamentals always for the way.   {#662}
[00:39:41] TEACHER: It's always your CS fundamentals that goes a very long way.   {#663}
[00:39:45] TEACHER: And this is why vertical scaling has a new.   {#664}
[00:39:48] TEACHER: And how do I know it?   {#665}
[00:39:49] TEACHER: I worked in a data center for like, while I was in college,   {#666}
[00:39:52] TEACHER: I spent my third year working in a data center because the professor loved me.   {#667}
[00:39:58] TEACHER: And I asked him all sorts of stupid questions.   {#668}
[00:40:00] TEACHER: Why this?   {#669}
[00:40:01] TEACHER: Why that?   {#670}
[00:40:02] TEACHER: Why AC temperature?   {#671}
[00:40:03] TEACHER: All of that.   {#672}
[00:40:04] TEACHER: And that's why I know this stuff.   {#673}
[00:40:07] TEACHER: What is that physical limitation?   {#674}
[00:40:08] TEACHER: And that professor used to teach us a microprocessor.   {#675}
[00:40:13] TEACHER: Well, of course, so I could ask him this question.   {#676}
[00:40:17] TEACHER: So he helped me understand why this doesn't work.   {#677}
[00:40:20] TEACHER: And he actually showed me a demonstration of that,   {#678}
[00:40:22] TEACHER: that how changing one helps you get the other.   {#679}
[00:40:26] TEACHER: So this is why vertical scaling has a limit.   {#680}
[00:40:29] TEACHER: Now, this is the actual hardware limit   {#681}
[00:40:32] TEACHER: because at the end everything is hardware.   {#682}
[00:40:34] TEACHER: We are abstracted by software,   {#683}
[00:40:36] TEACHER: it is running on is actually physical hardware.   {#684}
[00:40:39] TEACHER: Vertical scaling is limited by the capability of the physical hardware on   {#685}
[00:40:43] TEACHER: which things are running and not because of anything else.   {#686}
[00:40:46] TEACHER: Okay.   {#687}
[00:40:47] TEACHER: So which is where we don't do vertical scaling.   {#688}
[00:40:50] TEACHER: We prefer horizontal scaling because after a certain stage, when you   {#689}
[00:40:53] TEACHER: cannot vertically scale up, but you need to handle more traffic.   {#690}
[00:40:57] TEACHER: So that's why one machine will not be able to do that.   {#691}
[00:40:59] TEACHER: You want to add multiple machines, which is where horizontal scaling comes in.   {#692}
[00:41:03] TEACHER: The beauty of horizontal scaling, if you use it right.   {#693}
[00:41:06] TEACHER: is 7th standard mathematics.   {#694}
[00:41:09] TEACHER: It gives you linear amplification.   {#695}
[00:41:12] TEACHER: What do I mean by that?   {#696}
[00:41:13] TEACHER: Linear amplification is a standard term.   {#697}
[00:41:14] TEACHER: That's why I used it.   {#698}
[00:41:16] TEACHER: But linear amplification implies that   {#699}
[00:41:17] TEACHER: if you know that one machine   {#700}
[00:41:21] TEACHER: can handle 100 requests per second,   {#701}
[00:41:24] TEACHER: what if I want 500 requests per second?   {#702}
[00:41:27] TEACHER: I would need 500 divided by 100   {#703}
[00:41:29] TEACHER: equal to 5 machines.   {#704}
[00:41:31] TEACHER: This is the benefit of doing horizontal scaling.   {#705}
[00:41:37] TEACHER: Let's say you are Amazon, you have a prime day flash sale, right?   {#706}
[00:41:41] TEACHER: You have a prime day sale.   {#707}
[00:41:43] TEACHER: When you're having prime day sale, your marketing team knows or your business intelligence team   {#708}
[00:41:47] TEACHER: knows that how many users will be there, how many orders will be there.   {#709}
[00:41:51] TEACHER: They would have prediction models that would predict the number of orders that you have   {#710}
[00:41:54] TEACHER: that you will get on that day.   {#711}
[00:41:57] TEACHER: Given that, if you know that this is going to be the number of orders that I would get,   {#712}
[00:42:02] TEACHER: You need to know that, do I have enough infra to handle that or not?   {#713}
[00:42:07] TEACHER: With linear application, you can tell if you know the unit economic of one machine, the   {#714}
[00:42:13] TEACHER: unit tech economic of one machine.   {#715}
[00:42:15] TEACHER: For example, this machine of this particular configuration can handle these many requests   {#716}
[00:42:19] TEACHER: per second.   {#717}
[00:42:20] TEACHER: And if I want to handle n number of requests per second, the number of machines would be   {#718}
[00:42:23] TEACHER: n divided by this.   {#719}
[00:42:26] TEACHER: This is really critical when it comes to when it comes to predictive scaling.   {#720}
[00:42:32] TEACHER: This is what makes horizontal scaling possible.   {#721}
[00:42:35] TEACHER: Autoscaling groups exist, but they don't work at scale.   {#722}
[00:42:38] TEACHER: If you want to handle large spikes, autoscaling groups fail miserably.   {#723}
[00:42:44] TEACHER: Miserably.   {#724}
[00:42:45] TEACHER: Because they take their own sweet time to do it.   {#725}
[00:42:48] TEACHER: You don't have that time when you see sudden spikes.   {#726}
[00:42:50] TEACHER: For example, let's say there was a marketing campaign run.   {#727}
[00:42:54] TEACHER: And suddenly marketing campaign shot a broadcasted a message to everyone.   {#728}
[00:42:59] TEACHER: Now what would happen?   {#729}
[00:43:00] TEACHER: A lot of users would come in.   {#730}
[00:43:02] TEACHER: traffic like this, you are very happy handling traffic like this.   {#731}
[00:43:05] TEACHER: And suddenly because of that marketing approach, you got the sudden spike.   {#732}
[00:43:08] TEACHER: When you got the sudden spike, your auto scaling group did not have time to react   {#733}
[00:43:14] TEACHER: by the time these users flogged into your system.   {#734}
[00:43:17] TEACHER: That's why before marketing team sends an SMS or a message or a push notification,   {#735}
[00:43:23] TEACHER: you have to prepare your infrastructure to handle that spike.   {#736}
[00:43:27] TEACHER: And then you ask the marketing team, now you send a message.   {#737}
[00:43:31] TEACHER: This massive marketing campaign, it happens in coordination between those teams.   {#738}
[00:43:36] TEACHER: If it doesn't happen, product is bound to fail.   {#739}
[00:43:38] TEACHER: Infrastructure will go down.   {#740}
[00:43:40] TEACHER: You'll have a massive outage.   {#741}
[00:43:41] TEACHER: User will be unhappy and you'll lose business.   {#742}
[00:43:44] TEACHER: So it's always a team game.   {#743}
[00:43:46] TEACHER: The marketing team has to tell you before a big marketing campaign that you're doing.   {#744}
[00:43:50] TEACHER: For smaller spikes like this and this and this, it's okay.   {#745}
[00:43:54] TEACHER: Autoscaling group can handle.   {#746}
[00:43:55] TEACHER: When it has breathing space to scale it up.   {#747}
[00:43:59] TEACHER: It cannot. That is where you need to know this really well.   {#748}
[00:44:04] TEACHER: Your unit economic of one machine.   {#749}
[00:44:06] TEACHER: What's the capacity of this one machine?   {#750}
[00:44:08] TEACHER: Now, how do you know it?   {#751}
[00:44:09] TEACHER: Load testing is the only way.   {#752}
[00:44:12] TEACHER: No other way to do it but load testing.   {#753}
[00:44:14] TEACHER: There is no magic formula to get it.   {#754}
[00:44:16] TEACHER: These are the number of requests that my machine can handle.   {#755}
[00:44:20] TEACHER: If someone directly asks you that, if your senior engineer asks you that,   {#756}
[00:44:24] TEACHER: or if your junior engineer asks you that, tell it.   {#757}
[00:44:26] TEACHER: let's do a load test on this machine and find the actual unit economic of your machine,   {#758}
[00:44:32] TEACHER: rather than just guessing.   {#759}
[00:44:34] TEACHER: There is no magical way to tell you that a 32GP machine can handle 5000 requests per second.   {#760}
[00:44:40] TEACHER: No, that's not true.   {#761}
[00:44:42] TEACHER: There is always, you need to do load tests to get the answer.   {#762}
[00:44:47] TEACHER: So keep those things in mind.   {#763}
[00:44:49] TEACHER: Now, in the context of medium, what we do is,   {#764}
[00:44:53] TEACHER: And it's not that like one thing to I should add is that it's either or it's not that you either vertically scale or there you horizontally scale.   {#765}
[00:45:02] TEACHER: And so there's a sweet spot.   {#766}
[00:45:04] TEACHER: When you are starting up, when you're very young product, you do vertical scaling because you don't want to mess up things.   {#767}
[00:45:11] TEACHER: And with horizontal scaling deployment becomes complex and whatnot.   {#768}
[00:45:14] TEACHER: You do vertical scaling at first.   {#769}
[00:45:15] TEACHER: And then after a certain stage you scale horizontally.   {#770}
[00:45:18] TEACHER: Right.   {#771}
[00:45:18] TEACHER: But always ensure you don't do any premature optimization.   {#772}
[00:45:21] TEACHER: That's the root of all even.   {#773}
[00:45:23] TEACHER: necessarily you are optimizing things, optimizing infrastructures for unnecessary reasons.   {#774}
[00:45:28] TEACHER: Don't do that.   {#775}
[00:45:28] TEACHER: Right.   {#776}
[00:45:29] TEACHER: So we start simple.   {#777}
[00:45:30] TEACHER: We first vertically scale API servers and then put a load balancer and horizontally scale   {#778}
[00:45:35] TEACHER: the system.   {#779}
[00:45:35] TEACHER: Third week we'll design a load balancer.   {#780}
[00:45:37] TEACHER: You'll see how this is done.   {#781}
[00:45:38] TEACHER: We just draw a box right now, but we'll go in depth of load balancer and how it is implemented   {#782}
[00:45:42] TEACHER: in the third.   {#783}
---- OWNED SEGMENTS END ----

CTX| [00:45:45] TEACHER: But horizontal scaling, when people talk about it, people talk about horizontal scaling in   {#784}
CTX| [00:45:53] TEACHER: API servers. Like here, we drew multiple API servers and we called it horizontal scaling.   {#785}
CTX| [00:45:58] TEACHER: But, but, but there is a catch. You just cannot scale things horizontally because when you add   {#786}
CTX| [00:46:06] TEACHER: more machines to your fleet as part of horizontal scaling to handle that large traffic, what about   {#787}
CTX| [00:46:13] TEACHER: the database? What about things that these API servers depend on? Databases, centralized cache,   {#788}
CTX| [00:46:23] TEACHER: you horizontally scale the system, you are accepting a large number of requests from the user on the   {#789}
CTX| [00:46:29] TEACHER: service. All the service would forward requests to their dependent components database, central   {#790}
CTX| [00:46:35] TEACHER: caches, other services and whatnot. They would go down because they are not prepared for the scale.   {#791}
CTX| [00:46:41] TEACHER: So whenever you are scaling, always do a bottom up scaling. So ensure that your database can   {#792}
