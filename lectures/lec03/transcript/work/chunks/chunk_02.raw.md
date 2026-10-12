# chunk_02  OWNS 00:12:58 -> 00:24:05  (segments #197-#382, 1843 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:12:01] TEACHER: with every millisecond this is anyway moving forward you can choose to reset this at any   {#189}
CTX| [00:12:06] TEACHER: point in time. That's fine. So long as you don't exit the integer limit.   {#190}
CTX| [00:12:10] TEACHER: But you see how we now got two different ways to resolve collisions when it comes to your   {#191}
CTX| [00:12:18] TEACHER: program having multiple threads. One is by appending thread id and second is by using a static count.   {#192}
CTX| [00:12:25] TEACHER: So static count no matter how many threads you have it would automatically   {#193}
CTX| [00:12:28] TEACHER: atomically increment that's what this assumes. But if you look carefully here, given that   {#194}
CTX| [00:12:38] TEACHER: the counter is atomically increasing, time is redundant. Time plays no role because every time   {#195}
CTX| [00:12:50] TEACHER: your function is getting invoked, you are always doing count plus plus atomically. So no matter   {#196}

---- OWNED SEGMENTS START ----
[00:12:58] TEACHER: have because the increment is atomic it would always be 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and   {#197}
[00:13:05] TEACHER: so on and so forth.   {#198}
[00:13:07] TEACHER: So time is really not playing any part.   {#199}
[00:13:11] TEACHER: So can we remove that?   {#200}
[00:13:13] TEACHER: For sure can.   {#201}
[00:13:15] TEACHER: Because now what would happen is our IDs would become shorter.   {#202}
[00:13:19] TEACHER: So our another ID generation logic might look something like this.   {#203}
[00:13:23] TEACHER: We have a global counter variable.   {#204}
[00:13:25] TEACHER: getid function does a concatenation of machine id and counter that's it so whenever the request   {#205}
[00:13:32] TEACHER: goes to a particular machine it is handled by one of the threads and because the count plus plus   {#206}
[00:13:36] TEACHER: is atomic like we will make it atomic you don't like it's not by default atomic you wrap it in   {#207}
[00:13:42] TEACHER: logs and whatnot or do an atom or use a native atomic library to do that but the idea is assume   {#208}
[00:13:48] TEACHER: an atomic increment of countless of the variable cow and you get IDs like m101, m102, m103   {#209}
[00:13:55] TEACHER: and so on and so forth.   {#210}
[00:13:57] TEACHER: This kind of solves the problem, but what it has a limitation of that when it hits the   {#211}
[00:14:04] TEACHER: integer limit, that's a 4 billion or if it's 2 raised to 64, that's a massive number.   {#212}
[00:14:10] TEACHER: You might never hit that particular limit, but still it is ending up.   {#213}
[00:14:14] TEACHER: You would still write a good ID generation because of this.   {#214}
[00:14:18] TEACHER: wanted, you get it.   {#215}
[00:14:21] TEACHER: Machine ID concatenated with a static counter, which is atomically increment.   {#216}
[00:14:25] TEACHER: This solves the problem.   {#217}
[00:14:27] TEACHER: But okay, what next?   {#218}
[00:14:30] TEACHER: This is good.   {#219}
[00:14:30] TEACHER: So we saw multiple ways of or multiple common ways to build this ID generation or to implement   {#220}
[00:14:39] TEACHER: this ID generation.   {#221}
[00:14:40] TEACHER: Now what's next?   {#222}
[00:14:41] TEACHER: Now here we look at one very interesting factor, which is this static counter.   {#223}
[00:14:48] TEACHER: Int counter, this is a globally allocated variable.   {#224}
[00:14:51] TEACHER: Now what is happening is you have a static counter.   {#225}
[00:14:55] TEACHER: This is what your logic is, id generation logic.   {#226}
[00:14:58] TEACHER: The problem with this is what if your machine reboots?   {#227}
[00:15:04] TEACHER: As soon as your machine reboots, what would happen?   {#228}
[00:15:08] TEACHER: This counter would again be reset to zero because that's what would happen.   {#229}
[00:15:14] TEACHER: There is no layer of persistence at all over here.   {#230}
[00:15:18] TEACHER: thing. So when my process reboots or when my machine reboots, my counter will again start   {#231}
[00:15:24] TEACHER: from zero and when the request comes in, it would again start generating m101, m102, m103, m104,   {#232}
[00:15:31] TEACHER: which means that my ID generation logic is not unique because when my machine reboots,   {#233}
[00:15:37] TEACHER: it starts regenerating the IDs that it did after the previous reboot. So how do you solve it?   {#234}
[00:15:45] TEACHER: The root cause of this problem is that the place at which we are storing the counter   {#235}
[00:15:53] TEACHER: is actually a volatile memory.   {#236}
[00:15:56] TEACHER: So how do you solve it?   {#237}
[00:15:57] TEACHER: Very great answer.   {#238}
[00:16:00] TEACHER: Alok?   {#239}
[00:16:02] STUDENT_9: Back it up with the file locally.   {#240}
[00:16:04] TEACHER: Okay.   {#241}
[00:16:04] TEACHER: You write it to the file locally, right?   {#242}
[00:16:06] TEACHER: Because volatility is the problem.   {#243}
[00:16:08] TEACHER: So you start writing it to the file.   {#244}
[00:16:10] TEACHER: So it looks something like this.   {#245}
[00:16:11] TEACHER: So what we are doing over here is we store the counter to the disk every time.   {#246}
[00:16:17] TEACHER: And when my process starts, I load it from the disk, which means my code would look something   {#247}
[00:16:22] TEACHER: like this.   {#248}
[00:16:24] TEACHER: So here what we have is our counter is equal to a load function.   {#249}
[00:16:29] TEACHER: We basically assume that it loads from the disk.   {#250}
[00:16:31] TEACHER: My getid function 5 first to count plus plus.   {#251}
[00:16:35] TEACHER: I save the counter to the disk.   {#252}
[00:16:37] TEACHER: I concatenate with machine ID and counter.   {#253}
[00:16:41] TEACHER: it is we started storing the counter on the disk and not in some volatile memory.   {#254}
[00:16:48] TEACHER: So here, whenever my program starts, I first load the counter like this.   {#255}
[00:16:53] TEACHER: Whenever a function is invoked, I do count++ and immediately save the counter to the disk.   {#256}
[00:16:58] TEACHER: Maybe in a text file, I'm just dumping the counter every time, opening the file, writing   {#257}
[00:17:02] TEACHER: it there.   {#258}
[00:17:04] TEACHER: And my business project remains the same.   {#259}
[00:17:06] TEACHER: But here there is a problem that in here, what we are doing is when my function or when   {#260}
[00:17:13] TEACHER: my machine reboots, when my process reboots, I'm doing a disk IO, which is fairly okay.   {#261}
[00:17:18] TEACHER: One time at startup of my process or boot up of a machine, it's fine.   {#262}
[00:17:22] TEACHER: But every time that my ID function is getting invoked, I am doing a disk IO.   {#263}
[00:17:29] TEACHER: That would put, first of all, that would put a lot of pressure on the disk, 100% because   {#264}
[00:17:36] TEACHER: if it is getting invoked at a very high pace,   {#265}
[00:17:39] TEACHER: it would lead to so many disk IOS,   {#266}
[00:17:41] TEACHER: micro disk IOS happening on the disk.   {#267}
[00:17:43] TEACHER: Problem number one.   {#268}
[00:17:45] TEACHER: Problem number two is it might reduce the latency   {#269}
[00:17:49] TEACHER: that you are looking at   {#270}
[00:17:50] TEACHER: because you are doing disk IOS every time   {#271}
[00:17:52] TEACHER: or you were just serving it from memory.   {#272}
[00:17:55] TEACHER: So how do you solve this?   {#273}
[00:17:57] TEACHER: We are making massive micro disk IOS.   {#274}
[00:17:59] TEACHER: How do you mitigate this problem?   {#275}
[00:18:03] STUDENT_2: Jay?   {#276}
[00:18:06] STUDENT_2: How about adding another counter to the ID and you basically pick this counter up every   {#277}
[00:18:14] STUDENT_2: time you start up the server and then immediately increment it and write it back to a file.   {#278}
[00:18:21] STUDENT_2: So you'll pick up a unique one.   {#279}
[00:18:23] TEACHER: But how is the solving problem of frequent disk iOS?   {#280}
[00:18:26] STUDENT_2: You do it once at server startup only and then use that counter as part of SPS.   {#281}
[00:18:33] STUDENT_2: a third part of this.   {#282}
[00:18:35] TEACHER: You did that already. You loaded it from   {#283}
[00:18:37] TEACHER: the disk. But now whenever you are   {#284}
[00:18:39] TEACHER: generating this ID, every time you   {#285}
[00:18:41] TEACHER: are storing it on the disk. Correct?   {#286}
[00:18:44] TEACHER: This is...   {#287}
[00:18:45] STUDENT_2: I mean a third part in the   {#288}
[00:18:47] STUDENT_2: ID. Apart from this counter   {#289}
[00:18:49] STUDENT_2: we are already using.   {#290}
[00:18:51] TEACHER: No, but this is... But you are still   {#291}
[00:18:53] TEACHER: doing save counter every time, right?   {#292}
[00:18:56] STUDENT_2: No, just once   {#293}
[00:18:57] STUDENT_2: on server startup.   {#294}
[00:18:59] STUDENT_2: So each server startup   {#295}
[00:19:02] STUDENT_2: is represented by   {#296}
[00:19:04] STUDENT_2: a new counter.   {#297}
[00:19:07] TEACHER: How will this solve your problem?   {#298}
[00:19:09] TEACHER: Oh, okay.   {#299}
[00:19:10] TEACHER: So every time a server starts, that's a new counter   {#300}
[00:19:12] TEACHER: and then let your static counter start from zero.   {#301}
[00:19:16] TEACHER: Yeah.   {#302}
[00:19:17] TEACHER: Let your static counter start from zero and then booting up.   {#303}
[00:19:19] TEACHER: Okay, okay.   {#304}
[00:19:20] TEACHER: That's a good one.   {#305}
[00:19:21] TEACHER: That's a good one.   {#306}
[00:19:21] TEACHER: That's a good one.   {#307}
[00:19:22] TEACHER: But still, so then you will not be storing this at all.   {#308}
[00:19:26] TEACHER: You will be storing.   {#309}
[00:19:27] TEACHER: You will auto.   {#310}
[00:19:29] TEACHER: So basically you are not changing over here.   {#311}
[00:19:31] TEACHER: You are changing over here.   {#312}
[00:19:31] TEACHER: So you are not storing anything over here.   {#313}
[00:19:34] STUDENT_2: Yeah, no, that wouldn't be needed.   {#314}
[00:19:37] TEACHER: But then what's the downside of this?   {#315}
[00:19:45] STUDENT_2: When you increment ad server startup, that will have to be atomic.   {#316}
[00:19:51] STUDENT_2: That's right.   {#317}
[00:19:52] STUDENT_2: That can be made atomic.   {#318}
[00:19:56] STUDENT_2: A longer ID, longer than we have built here.   {#319}
[00:20:00] STUDENT_2: Correct.   {#320}
[00:20:00] STUDENT_2: Longer ID.   {#321}
[00:20:01] TEACHER: Right.   {#322}
[00:20:04] TEACHER: We'll talk about disadvantages of having long ID, but your approach is really good.   {#323}
[00:20:08] TEACHER: That approach is really good.   {#324}
[00:20:10] TEACHER: But that long ID might become a problem.   {#325}
[00:20:13] TEACHER: Not as big, but your approach is really nice.   {#326}
[00:20:15] TEACHER: I loved it.   {#327}
[00:20:16] TEACHER: I loved your approach.   {#328}
[00:20:17] STUDENT_9: Thanks.   {#329}
[00:20:20] TEACHER: I was just thinking of that case, but that would also not be that brilliant approach.   {#330}
[00:20:25] TEACHER: I liked it.   {#331}
[00:20:25] TEACHER: Every time, because you are now actually tackling this problem head on that instead of saving   {#332}
[00:20:30] TEACHER: it every time you are just starting a third part you're adding a third part to this really very   {#333}
[00:20:37] TEACHER: interesting very interesting and this is something i will definitely be adding to this going forward   {#334}
[00:20:43] TEACHER: thanks thanks thanks thanks for that okay uh uh harsh what else can we do to minimize this   {#335}
[00:20:52] STUDENT_5: i think it is something similar that i was thinking maybe we can have some bank of ids   {#336}
[00:20:57] STUDENT_5: For example, first time I read it is one just add 1000 to it and store it.   {#337}
[00:21:04] STUDENT_5: So once I reach 2000, then again read it and increase it by 1000.   {#338}
[00:21:08] STUDENT_5: So there are 1000 iterations we can do it in memory.   {#339}
[00:21:13] TEACHER: Got it. So what are effectively doing is you are minimizing the number of times you have to write to the disk by writing in a periodic manner.   {#340}
[00:21:24] TEACHER: Instead of writing it every time you are writing it at a certain frequency.   {#341}
[00:21:29] TEACHER: Right?   {#342}
[00:21:29] TEACHER: This way you are slashing down the number of disk IOs that you have to do.   {#343}
[00:21:34] TEACHER: Right?   {#344}
[00:21:34] TEACHER: Okay.   {#345}
[00:21:35] TEACHER: Let me walk you through on what, and I'll tell you why I'm a little bit stressing on   {#346}
[00:21:40] TEACHER: this approach because this comes in handy at two different places, but I still love the   {#347}
[00:21:45] TEACHER: first approach where every time the machine starts, you start with a third thing.   {#348}
[00:21:49] TEACHER: That's a really good one.   {#349}
[00:21:50] TEACHER: Really good.   {#350}
[00:21:51] TEACHER: Okay.   {#351}
[00:21:51] TEACHER: Okay. So what we do is instead of, we, let's say, we, let's say define a flush frequency.   {#352}
[00:22:00] TEACHER: Now this flush frequency would be something like this, that instead of writing, instead   {#353}
[00:22:04] TEACHER: of saving counter every single time, what we do is we define a flush frequency.   {#354}
[00:22:09] TEACHER: Let's say every thousand times, every thousand times we write, like after generating every   {#355}
[00:22:13] TEACHER: thousand IDs, I'll write it to the disk.   {#356}
[00:22:16] TEACHER: I'll write my counter to the disk.   {#357}
[00:22:17] TEACHER: So we are literally slashing on disk IO by a factor of 1000, which is a massive performance.   {#358}
[00:22:23] TEACHER: But what we just have to take care of that instead of just loading from the last point,   {#359}
[00:22:27] TEACHER: I have to just add the plus frequency over here so that we don't get any collision at   {#360}
[00:22:32] TEACHER: up.   {#361}
[00:22:33] TEACHER: So our logic now becomes counter equal to load plus the plus frequency.   {#362}
[00:22:37] TEACHER: Let's say every 1000 IDs we are writing do count plus plus counter mod equal to 1000   {#363}
[00:22:42] TEACHER: equal to zero.   {#364}
[00:22:42] TEACHER: Then you do write on the disk.   {#365}
[00:22:44] TEACHER: So we are not doing every time we are writing to the disk, but every thousandth time we   {#366}
[00:22:50] TEACHER: are writing to the disk.   {#367}
[00:22:51] TEACHER: Now this way, now just to give you how this would look like, just to explain how this   {#368}
[00:22:56] TEACHER: looks like.   {#369}
[00:22:57] TEACHER: Let's say hypothetically, my flush frequency is 3.   {#370}
[00:23:01] TEACHER: So every third value I flush to the disk.   {#371}
[00:23:05] TEACHER: What?   {#372}
[00:23:05] TEACHER: My counter.   {#373}
[00:23:07] TEACHER: So my machine ID is M1.   {#374}
[00:23:09] TEACHER: my counter is 1 2 it's our one 2 3 4 5 6 7 at night time so m1 happened when it created this   {#375}
[00:23:16] TEACHER: generated this generated this when it generated this your this invoke 3 mod 3 equal to 0 yes so   {#376}
[00:23:23] TEACHER: i save the counter so it flushes the counter to the disk so 0 3 got written on the disk then the   {#377}
[00:23:28] TEACHER: next iteration now rather next time the function call happened 4 5 6 6 8 also saw it wrote it to   {#378}
[00:23:35] TEACHER: the disk right then 7 8 and then the machine crashed when the machine crashed the last value   {#379}
[00:23:43] TEACHER: that was written was 6 the id that was generated was already 8 so now when my machine reboots   {#380}
[00:23:49] TEACHER: if I start from 6 if I see that hey 6 is written if I start from this place I would be generating   {#381}
[00:23:55] TEACHER: 7 8 again which is wrong because it was already used by something right so the safest value that   {#382}
---- OWNED SEGMENTS END ----

CTX| [00:24:05] TEACHER: The last value that was flushed plus the flush frequency plus one.   {#383}
CTX| [00:24:11] TEACHER: So nine plus one, 10.   {#384}
CTX| [00:24:13] TEACHER: This is the safest value that you can start with.   {#385}
CTX| [00:24:15] TEACHER: So M1 happened 10, M1 happened 11, M1 happened 12.   {#386}
CTX| [00:24:18] TEACHER: Is what?   {#387}
CTX| [00:24:19] TEACHER: And then 12th day you do flush again.   {#388}
CTX| [00:24:21] TEACHER: This way, what happens is what you are trying to do is you are trying to ensure by adding   {#389}
CTX| [00:24:28] TEACHER: this small like by leaking or by not utilizing every single integer out there but might be because   {#390}
CTX| [00:24:36] TEACHER: here we never used 8 and 9 directly starting out 10 we lost those two values but that's so fine   {#391}
CTX| [00:24:42] TEACHER: that's okay right given that the correctness of the system matters more than you left you utilizing   {#392}
CTX| [00:24:50] TEACHER: every single integer out there right so always remember whenever you are trying to do something   {#393}
CTX| [00:24:56] TEACHER: with this, think of correctness.   {#394}
CTX| [00:24:58] TEACHER: Think of the safest value that you would want to start with.   {#395}
CTX| [00:25:00] TEACHER: So key takeaway from these is first not doing IO every time.   {#396}
