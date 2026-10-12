# chunk_04  OWNS 00:35:37 -> 00:48:36  (segments #536-#738, 2113 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:34:44] TEACHER: it's a physical movement we learned in physics that when you throw energy at a thing it vibrates   {#528}
CTX| [00:34:50] TEACHER: faster. So when you are having water, you provide it energy with fire, the water vibrates and it   {#529}
CTX| [00:34:59] TEACHER: starts boiling. And when you suck the energy out of it, you take the temperature down,   {#530}
CTX| [00:35:06] TEACHER: the water freezes, it stops moving, it becomes ice, it holds true for every single element in   {#531}
CTX| [00:35:13] TEACHER: the world. With quartz crystal, what happens is, if in most cases, when your machine, let's say   {#532}
CTX| [00:35:20] TEACHER: a very high intensity game which requires a lot of CPU power, your CPU heats up.   {#533}
CTX| [00:35:27] TEACHER: This energy affects the vibration of the quartz crystal.   {#534}
CTX| [00:35:31] TEACHER: Quartz crystal would start to vibrate faster and your clock would move faster.   {#535}

---- OWNED SEGMENTS START ----
[00:35:37] TEACHER: If you are putting your machine in an extremely cold environment, the vibration of quartz   {#536}
[00:35:41] TEACHER: crystal would be slower, so your time would move slower.   {#537}
[00:35:45] TEACHER: physical phenomena affects the vibration of crystal which slows down or makes your clock   {#538}
[00:35:51] TEACHER: makes your computer clock go faster which is why there is a need of a periodic job that keeps the   {#539}
[00:35:58] TEACHER: clock in sync and it runs more frequently than you think it's really fascinating how physics and this   {#540}
[00:36:05] TEACHER: thing works together right you need to take care of these all sorts of phenomena when it comes to   {#541}
[00:36:10] TEACHER: this, there is a very famous article in case you have not read it, Jeff Dean and Sanjay   {#542}
[00:36:17] TEACHER: Ghimawat of Google, just Google friendship that made Google special.   {#543}
[00:36:22] TEACHER: Most of you would should know it in case you don't just search for this article friendship   {#544}
[00:36:26] TEACHER: that made Google special or something like this in which Sanjay Ghimawat and Jeff Dean   {#545}
[00:36:31] TEACHER: were facing a bug, which happened because a bit got flipped because of an explosion or   {#546}
[00:36:40] TEACHER: or also because of a solar storm that happened,   {#547}
[00:36:45] TEACHER: it flipped a bit in one of the data and they were scratching their heads   {#548}
[00:36:49] TEACHER: into understanding that why that even happened.   {#549}
[00:36:51] TEACHER: How did this bit got flipped automatically?   {#550}
[00:36:54] TEACHER: It was a natural phenomena that caused the bit to flip.   {#551}
[00:36:57] TEACHER: You cannot run away from nature.   {#552}
[00:36:59] TEACHER: Right?   {#553}
[00:36:59] TEACHER: So just Google the friendship that made Google special Jeff   {#554}
[00:37:03] TEACHER: Din and Sanjay Ghamawad brilliant folks.   {#555}
[00:37:06] TEACHER: Like I just love the papers that they wrote.   {#556}
[00:37:08] TEACHER: Jebdin and Sanjay Ghaavar.   {#557}
[00:37:09] TEACHER: Just read about them in case you are hearing the name for the first time.   {#558}
[00:37:13] TEACHER: So physical phenomena affecting this thing.   {#559}
[00:37:18] TEACHER: So even if we assume that our clocks will periodically   {#560}
[00:37:21] TEACHER: eventually be synced with NTP,   {#561}
[00:37:25] TEACHER: up until then, there is a chance that your clock is out of sync   {#562}
[00:37:29] TEACHER: when your ID is getting generated.   {#563}
[00:37:31] TEACHER: So hypothetically, let's say I have four machines.   {#564}
[00:37:34] TEACHER: machine id 2 machine id 4 machine id 7 machine id 9 and the time on those machines is 23 24 23 23   {#565}
[00:37:43] TEACHER: it's a pop many seconds i'm just using smaller numbers over here now here what would happen is   {#566}
[00:37:48] TEACHER: let's say my request first went to machine id 2 then it went to machine id 4 then it went to   {#567}
[00:37:53] TEACHER: machine id 7 and then it went to machine id 9 fine now when i fire get id function what we are doing   {#568}
[00:37:59] TEACHER: is we are concatenating machine like the time and the machine ID right so the ID that would   {#569}
[00:38:06] TEACHER: be generated on M2 would be 232 then the next ID would be generated would be 244 then 237 and then   {#570}
[00:38:18] TEACHER: 239 if you look carefully this is not monotonically increasing the first ID that was generated is 232   {#571}
[00:38:25] TEACHER: then 244 then suddenly it's 237 and then 239.   {#572}
[00:38:29] TEACHER: So you were expecting monotonicity, but you don't have it.   {#573}
[00:38:34] TEACHER: So this is a problem where you need monotonicity.   {#574}
[00:38:38] TEACHER: Even the clock skewness is what you need to take care of.   {#575}
[00:38:43] TEACHER: Somehow, we'll basically take a look at how people do it.   {#576}
[00:38:45] TEACHER: But this is actual thing that affects the,   {#577}
[00:38:50] TEACHER: in quote unquote, if that is the correctness of a system,   {#578}
[00:38:53] TEACHER: it affects the correctness of a system.   {#579}
[00:38:55] TEACHER: Okay, so now what we understand by this is ensuring monotonicity across distributed systems is almost impossible.   {#580}
[00:39:07] TEACHER: Almost impossible.   {#581}
[00:39:08] TEACHER: You might still see some strands here and there.   {#582}
[00:39:11] TEACHER: I did not find a theoretical proof of that, but you can very clearly see practically there are so many things that could break things that you cannot guarantee strict monotonicity in a distributed system.   {#583}
[00:39:20] TEACHER: where your ID generation logic is distributed.   {#584}
[00:39:26] TEACHER: So what do you do?   {#585}
[00:39:28] TEACHER: Let's say instead of putting it on independent machines,   {#586}
[00:39:33] TEACHER: let's have a central ID generation service.   {#587}
[00:39:35] TEACHER: Because there is one machine.   {#588}
[00:39:38] TEACHER: So whoever, basically idea is simple.   {#589}
[00:39:41] TEACHER: Whoever wants an ID, talks to this machine.   {#590}
[00:39:44] TEACHER: This machine generates an ID and sends it out.   {#591}
[00:39:46] TEACHER: Don't worry about throughput right now.   {#592}
[00:39:48] TEACHER: We'll talk about that.   {#593}
[00:39:50] TEACHER: client wants an ID, there is a central ID server.   {#594}
[00:39:53] TEACHER: The idea is that whoever wants the ID makes a network call, ID server generates an ID   {#595}
[00:39:59] TEACHER: and sends it back.   {#596}
[00:40:00] TEACHER: Whoever wants it makes a call, generates an ID, sends it back.   {#597}
[00:40:04] TEACHER: Now there is an ID generation service running over here because in a single machine,   {#598}
[00:40:09] TEACHER: clock skewness would not affect.   {#599}
[00:40:11] TEACHER: I will say why?   {#600}
[00:40:12] TEACHER: I'll tell you why.   {#601}
[00:40:14] TEACHER: Clock on a machine, assume that you are this machine, this particular machine, and you   {#602}
[00:40:20] TEACHER: moving faster. When you sync with the NDP server, you found out, hey, the current type   {#603}
[00:40:29] TEACHER: is not 24 but 23. So your clock does not change to 23. Your clock slows down the counting   {#604}
[00:40:37] TEACHER: and then it catches up and then it starts from 24. So instead of the time going back   {#605}
[00:40:44] TEACHER: on your machine, it just slows itself down and stretches that one second to become like   {#606}
[00:40:50] TEACHER: point three and then it receives.   {#607}
[00:40:53] TEACHER: So always remember the clock never goes back in time.   {#608}
[00:40:57] TEACHER: Never.   {#609}
[00:40:58] TEACHER: This means that on a single machine, you will never experience your clock moving back and   {#610}
[00:41:04] TEACHER: forth.   {#611}
[00:41:05] TEACHER: It can slow down or you can just pass it up.   {#612}
[00:41:08] TEACHER: So it would always move forward no matter what.   {#613}
[00:41:10] TEACHER: And that's such an important thing.   {#614}
[00:41:12] TEACHER: Now, which means that if you have your ID generation logic stick to one server, what   {#615}
[00:41:18] TEACHER: What would happen is that no matter where the request comes in, the clock on this machine   {#616}
[00:41:24] TEACHER: is always moving forward, it will always have monotonically increasing IDs.   {#617}
[00:41:27] TEACHER: That would work just fine.   {#618}
[00:41:29] TEACHER: Just fine.   {#619}
[00:41:31] TEACHER: But having this one machine is a single point of failure.   {#620}
[00:41:37] TEACHER: So now we need to solve it.   {#621}
[00:41:38] TEACHER: So you cannot have one machine, which means you need to have fault tolerance, you add   {#622}
[00:41:43] TEACHER: one more machine.   {#623}
[00:41:44] TEACHER: or adding a load balance so that anytime the request comes in,   {#624}
[00:41:47] TEACHER: it goes to either one of them.   {#625}
[00:41:49] TEACHER: Now, whenever whether this request goes over here or here,   {#626}
[00:41:52] TEACHER: it needs to connect to talk to other ID server   {#627}
[00:41:55] TEACHER: to see what was the last ID that it generated.   {#628}
[00:41:58] TEACHER: And then it would increase to plus plus of some buffer   {#629}
[00:42:01] TEACHER: and then it would generate a new ID.   {#630}
[00:42:02] TEACHER: So which means that these two servers need to constantly gossip   {#631}
[00:42:05] TEACHER: about the IDs that they generated   {#632}
[00:42:08] TEACHER: in order to generate a monotonically increasing ID   {#633}
[00:42:12] TEACHER: because they both have to agree upon that,   {#634}
[00:42:14] TEACHER: This is definitely larger than the other one that we ever generated problem.   {#635}
[00:42:19] TEACHER: So from a very simple ID generation logic, we made our things super complex and you can   {#636}
[00:42:28] TEACHER: very clearly see that this gossip, you will either lose on throughput when you're doing   {#637}
[00:42:34] TEACHER: this high throughput continuous gossip, it becomes very messy.   {#638}
[00:42:38] TEACHER: So atlas clock skewness problem is there.   {#639}
[00:42:41] TEACHER: So what we clearly see is that when you want strict monotonicity, there is no way, no way   {#640}
[00:42:49] TEACHER: for you to distribute.   {#641}
[00:42:52] TEACHER: So you cannot have an ID generation service which is distributed in nature, which also   {#642}
[00:42:58] TEACHER: guarantees strict monotonicity at high throughput.   {#643}
[00:43:02] TEACHER: Not possible.   {#644}
[00:43:04] TEACHER: Because you see, every time you think of something that is new problem or a new constant that   {#645}
[00:43:11] TEACHER: can't do this. You can't do it. Always, always that will happen. So there is no way, no way for   {#646}
[00:43:17] TEACHER: you to distribute this. So how do people go about it? That is where people relax up questions because   {#647}
[00:43:25] TEACHER: not everyone needs monotonicity. One question that might come to your head is, but my SQL server   {#648}
[00:43:33] TEACHER: has monotonic IDs, single machine. It's not distributed. It's single machine. The ID   {#649}
[00:43:41] TEACHER: logic is part of your database engine.   {#650}
[00:43:43] TEACHER: It's a single machine.   {#651}
[00:43:44] TEACHER: That's why you see ID 1, 2, 3, 4, 5, 6, so on and so forth.   {#652}
[00:43:48] TEACHER: If it would have been distributed, multi-master and whatnot,   {#653}
[00:43:51] TEACHER: you would never have it.   {#654}
[00:43:53] TEACHER: Try putting MySQL server in multi-master mode with an auto-increment ID.   {#655}
[00:43:57] TEACHER: See the number of conflicts you get because each one of them is its own brain.   {#656}
[00:44:02] TEACHER: Right?   {#657}
[00:44:03] TEACHER: So keep those things in mind that everything in computer science,   {#658}
[00:44:07] TEACHER: everything in software engineering is a trade-off.   {#659}
[00:44:11] TEACHER: you have to lose something.   {#660}
[00:44:12] TEACHER: You get something, you lose something.   {#661}
[00:44:15] TEACHER: Always.   {#662}
[00:44:16] TEACHER: And there are so many factors that we look at.   {#663}
[00:44:19] TEACHER: So in most cases,   {#664}
[00:44:21] TEACHER: whenever you are having a need of ID generation   {#665}
[00:44:24] TEACHER: or something similar,   {#666}
[00:44:27] TEACHER: always see that do you really need these constraints?   {#667}
[00:44:31] TEACHER: Do you really need what you have been asked for?   {#668}
[00:44:35] TEACHER: Try asking critical questions, challenging it.   {#669}
[00:44:38] TEACHER: that hey can we not relax these constants what if what if i don't care about integer rights   {#670}
[00:44:45] TEACHER: is that okay what if my ids are random like uuid or guids right what if my ids are not mono they   {#671}
[00:44:52] TEACHER: don't follow monotonicity is that okay because in most cases requirement says you need monotonicity   {#672}
[00:44:58] TEACHER: but after asking couple of critical questions that automatically it's in this because not everyone   {#673}
[00:45:02] TEACHER: thinks it through.   {#674}
[00:45:04] TEACHER: So asking these critical questions   {#675}
[00:45:05] TEACHER: is extremely important   {#676}
[00:45:07] TEACHER: whenever you are designed.   {#677}
[00:45:10] TEACHER: Okay.   {#678}
[00:45:11] TEACHER: One final thing before we take questions.   {#679}
[00:45:13] TEACHER: Why do we need ID generation?   {#680}
[00:45:16] TEACHER: Why?   {#681}
[00:45:17] TEACHER: Obviously, that should be the first thing   {#682}
[00:45:18] TEACHER: that we should answer.   {#683}
[00:45:19] TEACHER: But now that we have the context,   {#684}
[00:45:21] TEACHER: let me answer it for you.   {#685}
[00:45:23] TEACHER: You'd think that,   {#686}
[00:45:23] TEACHER: hey, MySQL is there now.   {#687}
[00:45:26] TEACHER: MySQL or any database,   {#688}
[00:45:27] TEACHER: it has ID,   {#689}
[00:45:28] TEACHER: MongoDB has ID.   {#690}
[00:45:29] TEACHER: Why are we,   {#691}
[00:45:32] TEACHER: and ID generation because imagine you are having a sharded database.   {#692}
[00:45:40] TEACHER: Multimaster mode.   {#693}
[00:45:42] TEACHER: Multimaster which means you have two master requests can go to anyone.   {#694}
[00:45:46] TEACHER: When requests can go to anyone, let's take an example of MySQL server itself.   {#695}
[00:45:52] TEACHER: So let's say I have a MySQL server, two MySQL servers.   {#696}
[00:45:57] TEACHER: Both are running in master mode which means write can go to anywhere.   {#697}
[00:46:02] TEACHER: a table you have an auto increment id you have an id column which is auto increment you have   {#698}
[00:46:08] TEACHER: either id column which is auto increment now if you do not have an id generation logic of your own   {#699}
[00:46:14] TEACHER: you would configure typically this auto incrementing now these two servers do not communicate or do not   {#700}
[00:46:20] TEACHER: talk to each other correct so when this request goes over here the auto increment id kicks in   {#701}
[00:46:26] TEACHER: when auto increment id kicks in it would start let's say you have a post there when you start   {#702}
[00:46:32] TEACHER: 4, here also 1, 2, 3, 4, because they don't know about each other.   {#703}
[00:46:39] TEACHER: Writes can go anywhere.   {#704}
[00:46:41] TEACHER: If you go for auto increment, this is where the problem would start to grip it.   {#705}
[00:46:45] TEACHER: So which is why now we understand why we need concatenate machine ID and this and that.   {#706}
[00:46:51] TEACHER: So that is a unique identification.   {#707}
[00:46:54] TEACHER: So now the ID is that you generate, you cannot just rely on database IDs, but you need to   {#708}
[00:46:59] TEACHER: have your own custom id logic where you cannot do this but just have something that would help you   {#709}
[00:47:05] TEACHER: uniquely identify those entries so whenever you have your databases operating in multi-master mode   {#710}
[00:47:11] TEACHER: you would typically see a custom id generation logic in place and that's where you need   {#711}
[00:47:18] TEACHER: distributed id generators we'll talk about very practical use cases of it in order to understand   {#712}
[00:47:23] TEACHER: how they are leveraged like all four examples will go in depth and understand okay any questions   {#713}
[00:47:29] TEACHER: We'll take till 10 and then we go on update.   {#714}
[00:47:31] TEACHER: Yeah, Aditi.   {#715}
[00:47:34] STUDENT_2: Yeah, so I was just wondering that the place where we opted for a shared service   {#716}
[00:47:40] STUDENT_2: to generate the IDs, instead of a shared service,   {#717}
[00:47:43] STUDENT_2: if we just have a common database and we take logs on it, would that work?   {#718}
[00:47:48] TEACHER: That's exactly shared service.   {#719}
[00:47:50] TEACHER: Your database is a shared service there, correct?   {#720}
[00:47:52] STUDENT_2: Yeah, but if we take logs on it, wouldn't it be unique then?   {#721}
[00:47:57] TEACHER: No, it will be unique, but that is still a single machine, right?   {#722}
[00:47:59] TEACHER: That is that database itself becomes a service, right?   {#723}
[00:48:02] STUDENT_2: Yeah.   {#724}
[00:48:03] STUDENT_2: Right.   {#725}
[00:48:04] STUDENT_2: Okay.   {#726}
[00:48:04] STUDENT_2: Okay.   {#727}
[00:48:05] STUDENT_2: Yeah.   {#728}
[00:48:05] TEACHER: That's the same thing.   {#729}
[00:48:06] TEACHER: That's one and the same thing.   {#730}
[00:48:07] TEACHER: Right.   {#731}
[00:48:09] STUDENT_1: Rajiv.   {#732}
[00:48:11] STUDENT_1: Orpid, the places where we want to resolve conflicts based on IDs now, since we tell   {#733}
[00:48:16] STUDENT_1: that, I mean, we are not sure whether the IDs on distributed system would be unique.   {#734}
[00:48:21] STUDENT_1: So how do we tackle that problem?   {#735}
[00:48:22] TEACHER: We'll talk about that.   {#736}
[00:48:23] TEACHER: there are still like we are still only uh basically 30 percent done and we'll talk about that right   {#737}
[00:48:29] TEACHER: how do we resolve what happens how should we approach that we'll talk about   {#738}
---- OWNED SEGMENTS END ----

CTX| [00:48:36] STUDENT_3: yeah so when you were discussing the last point right about auto incrementing by   {#739}
CTX| [00:48:42] STUDENT_3: one two three four in both the servers so can't be like auto increment by like the number of   {#740}
CTX| [00:48:48] STUDENT_3: servers we have basically if you have two then zero two four and one will disparate like one three   {#741}
CTX| [00:48:53] TEACHER: five yeah we can do that but there is a slight disadvantage to that we'll discuss in the second   {#742}
CTX| [00:48:59] STUDENT_3: time i have it covered f5 right okay dk yeah so instead of static counter why can't we use a   {#743}
CTX| [00:49:12] TEACHER: random id generator here and append it to the uh we'll talk about it random but great great   {#744}
CTX| [00:49:16] TEACHER: that you folks are already thinking about this.   {#745}
CTX| [00:49:18] TEACHER: I am so loving this much.   {#746}
CTX| [00:49:20] TEACHER: You folks are continuously thinking,   {#747}
CTX| [00:49:21] TEACHER: but which is where the static counter would pick   {#748}
CTX| [00:49:23] TEACHER: because we wanted monotonicity.   {#749}
CTX| [00:49:25] TEACHER: That's why we went for that.   {#750}
CTX| [00:49:27] TEACHER: Random ID does not give you monotonicity.   {#751}
CTX| [00:49:29] TEACHER: That's why I said that if you need monotonicity,   {#752}
CTX| [00:49:31] TEACHER: like you may not always need monotonicity.   {#753}
CTX| [00:49:33] TEACHER: You may think you need monotonicity,   {#754}
CTX| [00:49:35] TEACHER: but in reality, you can relax those constraints   {#755}
