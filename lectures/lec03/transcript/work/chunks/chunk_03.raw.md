# chunk_03  OWNS 00:24:05 -> 00:35:37  (segments #383-#535, 1780 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:23:05] TEACHER: My counter.   {#373}
CTX| [00:23:07] TEACHER: So my machine ID is M1.   {#374}
CTX| [00:23:09] TEACHER: my counter is 1 2 it's our one 2 3 4 5 6 7 at night time so m1 happened when it created this   {#375}
CTX| [00:23:16] TEACHER: generated this generated this when it generated this your this invoke 3 mod 3 equal to 0 yes so   {#376}
CTX| [00:23:23] TEACHER: i save the counter so it flushes the counter to the disk so 0 3 got written on the disk then the   {#377}
CTX| [00:23:28] TEACHER: next iteration now rather next time the function call happened 4 5 6 6 8 also saw it wrote it to   {#378}
CTX| [00:23:35] TEACHER: the disk right then 7 8 and then the machine crashed when the machine crashed the last value   {#379}
CTX| [00:23:43] TEACHER: that was written was 6 the id that was generated was already 8 so now when my machine reboots   {#380}
CTX| [00:23:49] TEACHER: if I start from 6 if I see that hey 6 is written if I start from this place I would be generating   {#381}
CTX| [00:23:55] TEACHER: 7 8 again which is wrong because it was already used by something right so the safest value that   {#382}

---- OWNED SEGMENTS START ----
[00:24:05] TEACHER: The last value that was flushed plus the flush frequency plus one.   {#383}
[00:24:11] TEACHER: So nine plus one, 10.   {#384}
[00:24:13] TEACHER: This is the safest value that you can start with.   {#385}
[00:24:15] TEACHER: So M1 happened 10, M1 happened 11, M1 happened 12.   {#386}
[00:24:18] TEACHER: Is what?   {#387}
[00:24:19] TEACHER: And then 12th day you do flush again.   {#388}
[00:24:21] TEACHER: This way, what happens is what you are trying to do is you are trying to ensure by adding   {#389}
[00:24:28] TEACHER: this small like by leaking or by not utilizing every single integer out there but might be because   {#390}
[00:24:36] TEACHER: here we never used 8 and 9 directly starting out 10 we lost those two values but that's so fine   {#391}
[00:24:42] TEACHER: that's okay right given that the correctness of the system matters more than you left you utilizing   {#392}
[00:24:50] TEACHER: every single integer out there right so always remember whenever you are trying to do something   {#393}
[00:24:56] TEACHER: with this, think of correctness.   {#394}
[00:24:58] TEACHER: Think of the safest value that you would want to start with.   {#395}
[00:25:00] TEACHER: So key takeaway from these is first not doing IO every time.   {#396}
[00:25:05] TEACHER: So you can add a periodicity factor.   {#397}
[00:25:08] TEACHER: Now don't think of a thread and timer and I'll do it.   {#398}
[00:25:10] TEACHER: Think of very simple approach as simple as a mod operation.   {#399}
[00:25:14] TEACHER: So n mod this, then you write it.   {#400}
[00:25:16] TEACHER: Right.   {#401}
[00:25:17] TEACHER: And second is whenever your machine recovers quote unquote, you start from the safest value.   {#402}
[00:25:23] TEACHER: This becomes the key design decisions or key design constraints when we are   {#403}
[00:25:28] TEACHER: deciding a distributed ID generator.   {#404}
[00:25:31] TEACHER: Okay.   {#405}
[00:25:32] TEACHER: Now, this is okay.   {#406}
[00:25:35] TEACHER: Now let's move to some other constraints.   {#407}
[00:25:37] TEACHER: Let's say instead of just having ID, if you look carefully, these IDs have no   {#408}
[00:25:42] TEACHER: particular order, like M1 can be literally anything.   {#409}
[00:25:45] TEACHER: I have hundreds of thousands of machines.   {#410}
[00:25:47] TEACHER: It like, there is no particular order in, in which we are, we are generating an ID.   {#411}
[00:25:51] TEACHER: What if I want to enforce a monotonically increasing constraint to my IDs?   {#412}
[00:26:00] TEACHER: So what we want is no matter how many machines I have in my infra, no matter how many machines   {#413}
[00:26:07] TEACHER: on which my IDs are getting generated, where the request goes, the IDs that should be generating,   {#414}
[00:26:12] TEACHER: it should be monotonically increasing, globally monotonically increasing IDs.   {#415}
[00:26:16] TEACHER: So even if I have 10 machines, the ID, like first request should always get ID, second   {#416}
[00:26:22] TEACHER: request should get ID 2, third request should get ID, let's say 5, next request should get   {#417}
[00:26:26] TEACHER: ID 6, no matter which machine it goes to.   {#418}
[00:26:29] TEACHER: Now let's say if we want monotonically increasing IDs, I will say first of all, why someone   {#419}
[00:26:35] TEACHER: would need this kind of monotonicity?   {#420}
[00:26:37] TEACHER: I'll give you a practical example for that.   {#421}
[00:26:40] TEACHER: Database.   {#422}
[00:26:40] TEACHER: in second week when we were building airline check-in system what we did is we saw importance   {#423}
[00:26:48] TEACHER: of locking and we always said hey we have two transactions transaction t1 and transaction t2   {#424}
[00:26:53] TEACHER: right then we said that hey transaction t1 ran this query and then transaction t2 ran this query   {#425}
[00:26:58] TEACHER: how did we know the transaction t1 came before transaction t2 one and two this one and two   {#426}
[00:27:07] TEACHER: because they are numbers, they tell you which one came first, which one came second.   {#427}
[00:27:12] TEACHER: It helps you in resolving conflicts.   {#428}
[00:27:15] TEACHER: For example, when T1 wrote something, T2 wrote something,   {#429}
[00:27:20] TEACHER: one of the conflict strategy would be the newer right overrides the older right.   {#430}
[00:27:25] TEACHER: Now this 1 and 2, it tells you that 2 is the newer right.   {#431}
[00:27:29] TEACHER: So you can actually accept during the conflict resolution strategy,   {#432}
[00:27:34] TEACHER: you can accept the right made by the newer transaction.   {#433}
[00:27:39] TEACHER: So monotonically increasing IDs play a very important role in doing conflict resolution,   {#434}
[00:27:44] TEACHER: which is where we need this.   {#435}
[00:27:46] TEACHER: And that is one of the places, one of the places, not all the places, but one of the   {#436}
[00:27:50] TEACHER: places.   {#437}
[00:27:51] TEACHER: So now what do we do is here in order for us to get monotonically increasing IDs.   {#438}
[00:27:57] TEACHER: Now, first of all, monotonically increasing IDs are, which increases monotonically does   {#439}
[00:28:02] TEACHER: not mean they are purely sequential like 1 2 3 4 5 6 is strictly monotonically increasing ids but   {#440}
[00:28:10] TEACHER: 1 2 5 7 8 9 32 33 34 that is monotonically increasing which means that my next id that   {#441}
[00:28:20] TEACHER: is generated is guaranteed to be greater than all the previous ids that are generated   {#442}
[00:28:25] TEACHER: That is monotonically increasing.   {#443}
[00:28:28] TEACHER: Now, if we were to have this as a feature in our thing,   {#444}
[00:28:34] TEACHER: what we can do is our logic that we wrote earlier,   {#445}
[00:28:39] TEACHER: where we concordinated machine ID and time,   {#446}
[00:28:42] TEACHER: we did machine ID and time.   {#447}
[00:28:45] TEACHER: So M1-1729.   {#448}
[00:28:47] TEACHER: Given that the time always moves forward,   {#449}
[00:28:51] TEACHER: it is always increasing.   {#450}
[00:28:53] TEACHER: what if we flip the order? What if we flip the order and have concatenation of time and then   {#451}
[00:29:02] TEACHER: machine ID? Given that the time always moves forward, if I do it at millisecond level, every   {#452}
[00:29:10] TEACHER: millisecond I would have a new value that I'm writing. It is always moving forward. These are   {#453}
[00:29:15] TEACHER: the most significant bits of my number. Machine ID can be literally anything. This way what I get   {#454}
[00:29:23] TEACHER: get monotonicity. It is not strict monotonicity, but it's pretty decent monotonicity that I'm   {#455}
[00:29:28] TEACHER: getting. Pretty decent. It's not strict. To some extent it would falter, but it's fine.   {#456}
[00:29:34] TEACHER: So what we are getting over here is something like this. This is what my ID would look like.   {#457}
[00:29:40] TEACHER: So this is my time. This is my machine ID. So 17290001, 17290002. These are machine IDs.   {#458}
[00:29:50] TEACHER: You can also change this to counters perfectly fine.   {#459}
[00:29:54] TEACHER: But the idea is putting time on the leftmost side gives you this natural order to IDs.   {#460}
[00:30:01] TEACHER: May not be very, may not be always monotonically increasing, but to a very good extent, it   {#461}
[00:30:09] TEACHER: is monotonically increasing.   {#462}
[00:30:11] TEACHER: And because it is possible that within the same millisecond, let's say these are machine   {#463}
[00:30:15] TEACHER: IDs, hypothetically, let's say these are machine IDs.   {#464}
[00:30:17] TEACHER: It is very much possible that the first request within the same millisecond went to machine   {#465}
[00:30:21] TEACHER: ID two and then the next request went to machine ID one.   {#466}
[00:30:25] TEACHER: So in that case, what you get is 17290002 first and then 17290001.   {#467}
[00:30:30] TEACHER: But within that millisecond, it would happen.   {#468}
[00:30:33] TEACHER: But as soon as millisecond passes by, you get almost monotonically increasing IDs across   {#469}
[00:30:41] TEACHER: your system.   {#470}
[00:30:43] TEACHER: Few things here and there is okay.   {#471}
[00:30:45] TEACHER: So you are not worrying about like here you see that it is still stateless.   {#472}
[00:30:50] TEACHER: Request and go to any machine because every machine is just doing the time concordinated   {#473}
[00:30:58] TEACHER: with machine ID.   {#474}
[00:30:59] TEACHER: Assume machine ID is integer and then it's just bits.   {#475}
[00:31:02] TEACHER: What you are getting is you are almost getting monotonicity.   {#476}
[00:31:06] TEACHER: Almost.   {#477}
[00:31:06] TEACHER: There might be incorrectness in the system.   {#478}
[00:31:08] TEACHER: That's fine without having to maintain a central state of things in order to get those things   {#479}
[00:31:14] TEACHER: increasing but getting pretty decent throughput pretty decent excellent throughput at very minimal   {#480}
[00:31:21] TEACHER: cost but here you see how we beautifully put time on the leftmost side of things to get almost   {#481}
[00:31:29] TEACHER: monotonically increasing ids because as your time moves forward the number would always be greater   {#482}
[00:31:35] TEACHER: because it is 17,290,001, 17,290,002, 17,300,001.   {#483}
[00:31:46] TEACHER: You see, this is always going to be increasing   {#484}
[00:31:49] TEACHER: because every millisecond, this is moving forward.   {#485}
[00:31:53] TEACHER: So this is a very key highlight   {#486}
[00:31:56] TEACHER: on why time is always on the leftmost side.   {#487}
[00:32:01] TEACHER: You would see a ton of ID generators.   {#488}
[00:32:05] TEACHER: time being on the leftmost side of your ID generation logic.   {#489}
[00:32:10] TEACHER: Pick any.   {#490}
[00:32:11] TEACHER: You would always see time sitting on the leftmost side.   {#491}
[00:32:13] TEACHER: This is the reason why.   {#492}
[00:32:15] TEACHER: Okay.   {#493}
[00:32:17] TEACHER: Now, although it's a good solution, but it still does not guarantee monotonicity.   {#494}
[00:32:21] TEACHER: One of the reasons that I will talk about was that, that it's not guaranteeing monotonicity,   {#495}
[00:32:27] TEACHER: but at least within millisecond, you have fair bit of monotonicity.   {#496}
[00:32:33] TEACHER: But there is another thing, another problem that would crop up is here.   {#497}
[00:32:38] TEACHER: What we talked about was the part where this, like the first request went to machine ID   {#498}
[00:32:44] TEACHER: 2 and then the next request went to machine ID 1.   {#499}
[00:32:46] TEACHER: So my IDs would be 1729002 and then the next ID would be 1729001.   {#500}
[00:32:51] TEACHER: So that is wrong.   {#501}
[00:32:52] TEACHER: But there is a problem even on the time side of things.   {#502}
[00:32:57] TEACHER: Right?   {#503}
[00:32:57] TEACHER: If even let go the part that it's okay that within a millisecond, I might have a little   {#504}
[00:33:02] TEACHER: bit of misordering, but at seconds or at time level, it should not be there.   {#505}
[00:33:08] TEACHER: So here what would happen is because our ID generation logic has time component and machine   {#506}
[00:33:16] TEACHER: ID component in that.   {#507}
[00:33:18] TEACHER: Here we up until now, we assume that the time across all of my machines is exactly synchronous,   {#508}
[00:33:27] TEACHER: but basically perfectly synchronized, which is not the case.   {#509}
[00:33:31] TEACHER: I'll tell you about it.   {#510}
[00:33:33] TEACHER: So clocks go here and there.   {#511}
[00:33:36] TEACHER: It's very common.   {#512}
[00:33:38] TEACHER: If you have worked in SRE team or DevOps team, you know you have a process that is running,   {#513}
[00:33:42] TEACHER: which is continuously syncing NTP clocks of your servers.   {#514}
[00:33:45] TEACHER: It's very common for your servers to go out of sync.   {#515}
[00:33:50] TEACHER: So what you do is you have a job running, job as in a normal process running, which   {#516}
[00:33:54] TEACHER: periodically syncs your machine clock to NTP servers.   {#517}
[00:33:59] TEACHER: So here what happens is, and first of all, why do clocks go out of sync?   {#518}
[00:34:06] TEACHER: That's a very fascinating thing.   {#519}
[00:34:07] TEACHER: So the clock that ticks on your machine is a hardware clock.   {#520}
[00:34:12] TEACHER: Although we see this digital time, it's actually a hardware clock.   {#521}
[00:34:16] TEACHER: There is a quartz crystal vibrating in your machine, in your laptop, on your server, in   {#522}
[00:34:22] TEACHER: your CPU.   {#523}
[00:34:22] TEACHER: It's vibrating.   {#524}
[00:34:24] TEACHER: measured and that tells you that hey one second has passed or one millisecond has passed because   {#525}
[00:34:29] TEACHER: it vibrates at a very particular frequency given that given that it's a physical movement that you   {#526}
[00:34:36] TEACHER: are measuring in order to see the time in order to measure the time what happens is that because   {#527}
[00:34:44] TEACHER: it's a physical movement we learned in physics that when you throw energy at a thing it vibrates   {#528}
[00:34:50] TEACHER: faster. So when you are having water, you provide it energy with fire, the water vibrates and it   {#529}
[00:34:59] TEACHER: starts boiling. And when you suck the energy out of it, you take the temperature down,   {#530}
[00:35:06] TEACHER: the water freezes, it stops moving, it becomes ice, it holds true for every single element in   {#531}
[00:35:13] TEACHER: the world. With quartz crystal, what happens is, if in most cases, when your machine, let's say   {#532}
[00:35:20] TEACHER: a very high intensity game which requires a lot of CPU power, your CPU heats up.   {#533}
[00:35:27] TEACHER: This energy affects the vibration of the quartz crystal.   {#534}
[00:35:31] TEACHER: Quartz crystal would start to vibrate faster and your clock would move faster.   {#535}
---- OWNED SEGMENTS END ----

CTX| [00:35:37] TEACHER: If you are putting your machine in an extremely cold environment, the vibration of quartz   {#536}
CTX| [00:35:41] TEACHER: crystal would be slower, so your time would move slower.   {#537}
CTX| [00:35:45] TEACHER: physical phenomena affects the vibration of crystal which slows down or makes your clock   {#538}
CTX| [00:35:51] TEACHER: makes your computer clock go faster which is why there is a need of a periodic job that keeps the   {#539}
CTX| [00:35:58] TEACHER: clock in sync and it runs more frequently than you think it's really fascinating how physics and this   {#540}
CTX| [00:36:05] TEACHER: thing works together right you need to take care of these all sorts of phenomena when it comes to   {#541}
CTX| [00:36:10] TEACHER: this, there is a very famous article in case you have not read it, Jeff Dean and Sanjay   {#542}
CTX| [00:36:17] TEACHER: Ghimawat of Google, just Google friendship that made Google special.   {#543}
CTX| [00:36:22] TEACHER: Most of you would should know it in case you don't just search for this article friendship   {#544}
CTX| [00:36:26] TEACHER: that made Google special or something like this in which Sanjay Ghimawat and Jeff Dean   {#545}
CTX| [00:36:31] TEACHER: were facing a bug, which happened because a bit got flipped because of an explosion or   {#546}
