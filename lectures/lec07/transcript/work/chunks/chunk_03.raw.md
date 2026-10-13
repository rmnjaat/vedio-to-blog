# chunk_03  OWNS 00:25:34 -> 00:36:15  (segments #436-#671, 1748 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:24:43] TEACHER: Reading is very fast, checkpointing is fast and pushy get is fast.   {#424}
CTX| [00:24:46] TEACHER: So they did not even realize that they were losing out on data.   {#425}
CTX| [00:24:50] TEACHER: They had no clue. Their databases were out of sync and they had no idea.   {#426}
CTX| [00:24:55] TEACHER: But after I pointed, they said, we'll write a cron job to put them in sync.   {#427}
CTX| [00:24:59] TEACHER: They said, it's okay if we lose data.   {#428}
CTX| [00:25:02] TEACHER: they stop losing data as well because CDC keeps track of which rows or which documents or which   {#429}
CTX| [00:25:08] TEACHER: entities are captured and put there right so it does that checkpointing for you in a sequential   {#430}
CTX| [00:25:13] TEACHER: way that's how you gained a ton of benefits out of it no loss rather than the performance better   {#431}
CTX| [00:25:21] STUDENT_2: because of this uh foot patching would have solved like if they have batched a certain   {#432}
CTX| [00:25:27] STUDENT_2: number of events together and   {#433}
CTX| [00:25:30] STUDENT_2: do the   {#434}
CTX| [00:25:32] STUDENT_2: processing.   {#435}

---- OWNED SEGMENTS START ----
[00:25:34] TEACHER: It would not have been   {#436}
[00:25:36] TEACHER: as worse as it was.   {#437}
[00:25:38] TEACHER: They were doing one at a time because that's   {#438}
[00:25:40] TEACHER: the most basic thing that they could write.   {#439}
[00:25:42] TEACHER: So they just went out with that.   {#440}
[00:25:44] TEACHER: And it was a legacy architecture. When they started, they went   {#441}
[00:25:46] TEACHER: with this, the company scaled   {#442}
[00:25:48] TEACHER: but they did not change it.   {#443}
[00:25:50] TEACHER: So they were just living with that.   {#444}
[00:25:54] TEACHER: And you know, there is always a service   {#445}
[00:25:57] TEACHER: No one touches that ever.   {#446}
[00:25:59] TEACHER: This was one of them.   {#447}
[00:26:01] STUDENT_2: Got it.   {#448}
[00:26:03] STUDENT_2: So one other thing,   {#449}
[00:26:05] STUDENT_2: what if the CDC was implemented from a read replica?   {#450}
[00:26:11] STUDENT_2: It's fine.   {#451}
[00:26:12] STUDENT_9: Works just fine.   {#452}
[00:26:14] STUDENT_2: Okay.   {#453}
[00:26:15] STUDENT_2: And if it was a no-sql type of database   {#454}
[00:26:18] STUDENT_2: where eventual consistency happens.   {#455}
[00:26:21] STUDENT_2: So can you please tell me one particular use case   {#456}
[00:26:27] STUDENT_2: where this would be a bad example, bad implementation.   {#457}
[00:26:31] TEACHER: Not at all.   {#458}
[00:26:32] TEACHER: If you are okay with eventual consistency, even CDCs are eventually consistent.   {#459}
[00:26:35] TEACHER: It does not guarantee strong consistency anyway.   {#460}
[00:26:38] TEACHER: There is no strong consistency between these and these databases.   {#461}
[00:26:40] TEACHER: It's all eventual consistency.   {#462}
[00:26:42] TEACHER: Right?   {#463}
[00:26:43] TEACHER: So the system is built on our.   {#464}
[00:26:45] STUDENT_2: I mean, in terms of asynchronous processing.   {#465}
[00:26:48] TEACHER: So where you need synchronicity, you cannot move past, right?   {#466}
[00:26:53] TEACHER: You have to have synchronous.   {#467}
[00:26:54] TEACHER: When you need strong consistency, that's when you do synchronous programming.   {#468}
[00:26:57] TEACHER: Right.   {#469}
[00:26:59] STUDENT_2: Got it.   {#470}
[00:27:00] STUDENT_2: Okay.   {#471}
[00:27:00] STUDENT_2: So in terms of synchronous, uh, synchronous, I mean, synchronous communication, we won't   {#472}
[00:27:05] STUDENT_2: be able to implement this.   {#473}
[00:27:06] STUDENT_9: Yeah.   {#474}
[00:27:07] STUDENT_9: Okay.   {#475}
[00:27:09] STUDENT_2: Got it.   {#476}
[00:27:10] STUDENT_2: Great.   {#477}
[00:27:11] STUDENT_2: Got it.   {#478}
[00:27:13] STUDENT_6: So, uh, is, is CDC somewhere close to server sent events or could we have simply use server   {#479}
[00:27:20] TEACHER: server sent event is front end JavaScript.   {#480}
[00:27:23] TEACHER: Right.   {#481}
[00:27:24] TEACHER: Okay.   {#482}
[00:27:24] TEACHER: This is backend database very different.   {#483}
[00:27:28] TEACHER: Right.   {#484}
[00:27:29] TEACHER: And CDC is pull the data and transform and push the data to other database or, or   {#485}
[00:27:37] TEACHER: SYNC is JavaScript where your backend server is sending the event to your front end.   {#486}
[00:27:44] TEACHER: Very different.   {#487}
[00:27:47] STUDENT_6: I'm saying one minor question in the organization example that you just talked   {#488}
[00:27:52] STUDENT_6: about used SQL rather because Kafka is expensive as well as it has.   {#489}
[00:27:59] TEACHER: See, that is like, I could point out a hundred things there, but a company always has some   {#490}
[00:28:06] TEACHER: decisions made a certain way, right?   {#491}
[00:28:09] TEACHER: Got it.   {#492}
[00:28:10] TEACHER: So you can't cover it on it, but you could go ahead with that.   {#493}
[00:28:14] TEACHER: Like if the, but there, but there load was decent enough that Kafka and SQL's cost would   {#494}
[00:28:20] TEACHER: have been fairly similar.   {#495}
[00:28:22] TEACHER: Yeah, it would have been very similar.   {#496}
[00:28:23] TEACHER: The kind of throughput that they were having.   {#497}
[00:28:26] TEACHER: It started as a very legacy service.   {#498}
[00:28:28] TEACHER: Oh, sorry.   {#499}
[00:28:29] TEACHER: It started as a very basic service.   {#500}
[00:28:31] TEACHER: Company grew.   {#501}
[00:28:32] TEACHER: They did not refactor that service.   {#502}
[00:28:34] TEACHER: And then it started to bite back.   {#503}
[00:28:38] TEACHER: Right?   {#504}
[00:28:38] TEACHER: Okay.   {#505}
[00:28:39] TEACHER: Yeah.   {#506}
[00:28:40] TEACHER: I'll take one more question before we move forward.   {#507}
[00:28:42] TEACHER: DK, go on.   {#508}
[00:28:44] TEACHER: Hi, Arpit.   {#509}
[00:28:45] STUDENT_4: So, Arpit, what I wanted to understand in CDC.   {#510}
[00:28:48] STUDENT_4: So, let's say in my skills, some transactions are happening.   {#511}
[00:28:52] STUDENT_4: This is the first step.   {#512}
[00:28:53] STUDENT_4: This is the second step.   {#513}
[00:28:54] STUDENT_4: So would CDC would also be able to capture in that sequence   {#514}
[00:28:59] STUDENT_4: or CDC is not a good example or a good use case for that?   {#515}
[00:29:03] TEACHER: CDC is a brilliant use case for that.   {#516}
[00:29:05] TEACHER: And when you talk about transaction,   {#517}
[00:29:06] TEACHER: transaction is an atomic unit, right?   {#518}
[00:29:08] TEACHER: In a transaction, there might be 10 SQL statements   {#519}
[00:29:10] TEACHER: that you're running.   {#520}
[00:29:11] TEACHER: But what gets written to the log file   {#521}
[00:29:13] TEACHER: when your transaction commits, correct?   {#522}
[00:29:16] TEACHER: Right.   {#523}
[00:29:17] TEACHER: So all of the stages are written in one shot in your log file   {#524}
[00:29:20] TEACHER: and then it's being read by CDC.   {#525}
[00:29:22] TEACHER: Okay, so it is then reading it in the same sequence, whatever.   {#526}
[00:29:26] STUDENT_4: Correct.   {#527}
[00:29:26] TEACHER: So the sequence in which your transactions are committing and added to the log file is   {#528}
[00:29:30] TEACHER: the same sequence in which CDC is reading and pushing it into other database.   {#529}
[00:29:34] STUDENT_4: Okay.   {#530}
[00:29:35] STUDENT_4: Got it.   {#531}
[00:29:36] STUDENT_4: Got it.   {#532}
[00:29:36] STUDENT_4: And second thing is, so CDC is only used in cases when there is a simple use case where   {#533}
[00:29:44] STUDENT_4: we don't have to do a lot of transformations.   {#534}
[00:29:45] STUDENT_4: Let's say I have, I have like in my school, I have two tables where I want to put some   {#535}
[00:29:52] STUDENT_4: join of these two tables.   {#536}
[00:29:54] STUDENT_4: But when let's say we are doing multiple   {#537}
[00:29:56] STUDENT_4: joins and multiple aggregations and   {#538}
[00:29:58] STUDENT_4: let's say we have to write some configuration file in CDC   {#539}
[00:30:00] STUDENT_4: to capture that kind of data. Is it   {#540}
[00:30:02] STUDENT_4: also a good use case for that scenario   {#541}
[00:30:04] STUDENT_4: or it doesn't work in that case?   {#542}
[00:30:06] STUDENT_4: Apache Spark solves that for you.   {#543}
[00:30:08] STUDENT_4: Okay, then we have to use the consumer   {#544}
[00:30:10] STUDENT_4: and multiple pipelines and   {#545}
[00:30:12] TEACHER: you know. Yeah, mostly around   {#546}
[00:30:13] TEACHER: Apache Spark solve the big data tools that you   {#547}
[00:30:16] TEACHER: hear about. Apache Spark is   {#548}
[00:30:18] TEACHER: the king of all at the moment.   {#549}
[00:30:20] TEACHER: Apache Spark does that for you really well.   {#550}
[00:30:22] TEACHER: So when you're doing complex transformations across tables and joins and   {#551}
[00:30:25] TEACHER: like making multiple jobs and whatnot, Apache Spark is your friend.   {#552}
[00:30:30] TEACHER: My friend.   {#553}
[00:30:31] TEACHER: Okay.   {#554}
[00:30:31] TEACHER: Got it.   {#555}
[00:30:32] STUDENT_4: So it is, it is for basically simple use cases.   {#556}
[00:30:34] STUDENT_4: Key.   {#557}
[00:30:35] STUDENT_4: Yes.   {#558}
[00:30:35] STUDENT_4: Data comes.   {#559}
[00:30:35] TEACHER: You just want to consume whatever is written there, extract it out, put it   {#560}
[00:30:40] TEACHER: somewhere, right.   {#561}
[00:30:41] STUDENT_4: With some basic transformation, right.   {#562}
[00:30:43] STUDENT_4: Because in the past I've used one tool by the name of PG sync, which used to   {#563}
[00:30:47] STUDENT_4: push our post-based data to Elasticsearch.   {#564}
[00:30:52] TEACHER: one, right? It is just extract and put it.   {#565}
[00:30:54] TEACHER: PG sync is an example   {#566}
[00:30:56] TEACHER: of Postgres based CDC   {#567}
[00:30:58] TEACHER: because it only works with Postgres, but it   {#568}
[00:31:00] TEACHER: does that exact same thing. And that's exactly   {#569}
[00:31:02] TEACHER: what a CDC is.   {#570}
[00:31:03] TEACHER: Got it. Got it. I've used it   {#571}
[00:31:06] TEACHER: and I was never aware that this system is   {#572}
[00:31:08] TEACHER: called CDCs.   {#573}
[00:31:09] TEACHER: So now you could replace that with Airby   {#574}
[00:31:12] TEACHER: DBZM having much more   {#575}
[00:31:14] TEACHER: having much more fancier plugins.   {#576}
[00:31:16] TEACHER: If you may want to put data into some other   {#577}
[00:31:18] TEACHER: thing, you may not have to rewrite a lot of   {#578}
[00:31:20] TEACHER: stuff there, right? Like   {#579}
[00:31:22] TEACHER: integration with those APIs and what it just does magically for.   {#580}
[00:31:25] TEACHER: Got it.   {#581}
[00:31:26] TEACHER: Got it.   {#582}
[00:31:26] TEACHER: Yeah.   {#583}
[00:31:27] STUDENT_12: Yeah.   {#584}
[00:31:28] STUDENT_12: Yeah.   {#585}
[00:31:29] STUDENT_9: Rajiv, I'll take your question.   {#586}
[00:31:31] TEACHER: We'll move forward to the first topic that I wanted to go just going back and forth, but   {#587}
[00:31:37] TEACHER: I just wanted to start on this note around, it tells what it is because now that being   {#588}
[00:31:42] TEACHER: addressed the big discussion, my personal favorite distributed cash will have a ton   {#589}
[00:31:47] TEACHER: of brainstorming.   {#590}
[00:31:47] TEACHER: A lot of critical questions I'll be throwing at you folks.   {#591}
[00:31:52] TEACHER: a good distributed cache.   {#592}
[00:31:54] TEACHER: The idea being going into those nitty gritties,   {#593}
[00:31:59] TEACHER: going into those granular details that matter.   {#594}
[00:32:02] TEACHER: We'll talk about everything that you can think of on this slides.   {#595}
[00:32:07] TEACHER: Okay.   {#596}
[00:32:07] TEACHER: So requirements pretty simple.   {#597}
[00:32:09] TEACHER: High throughput, low latency distributed.   {#598}
[00:32:12] TEACHER: Everything we want.   {#599}
[00:32:13] TEACHER: We are very greedy.   {#600}
[00:32:14] TEACHER: Get put, delete ETL, the four functionalities that would implement.   {#601}
[00:32:17] TEACHER: Scale is by default given.   {#602}
[00:32:19] TEACHER: But we'll have a very good time discussing.   {#603}
[00:32:22] TEACHER: So this discussion, this entire thing, we'll have two brainstorming.   {#604}
[00:32:25] TEACHER: First, around low-level implementation that I do now.   {#605}
[00:32:28] TEACHER: Then we take a break.   {#606}
[00:32:29] TEACHER: Then we do high-level implementation of it, where I would want to talk about consistent   {#607}
[00:32:33] TEACHER: hashing, distributed hash tables, those part.   {#608}
[00:32:37] TEACHER: So we'll start with low-level implementation, cover it to the fullest.   {#609}
[00:32:40] TEACHER: Then we go on the high-level set.   {#610}
[00:32:42] TEACHER: So we'll have two brainstorming in the same.   {#611}
[00:32:44] TEACHER: So this is a mega system that we are designing.   {#612}
[00:32:46] TEACHER: idea is to again form a lot of dots in your head then you can connect it however right okay so let's   {#613}
[00:32:55] TEACHER: start with the first one distributed cache assume it's in memory it's distributed i should be very   {#614}
[00:33:00] TEACHER: explicit when i talk it is a distributed in memory cache now let's start with storage right so the   {#615}
[00:33:07] TEACHER: things that we brainstorm on storage how do we find caches full cash eviction communication   {#616}
[00:33:13] TEACHER: concurrency and TTL.   {#617}
[00:33:15] TEACHER: These are the things which are very   {#618}
[00:33:17] TEACHER: important when it comes to implementing   {#619}
[00:33:19] TEACHER: a cache. We will go very deep into each one   {#620}
[00:33:20] TEACHER: of them to understand how we are doing, what we   {#621}
[00:33:22] TEACHER: are doing. And then we   {#622}
[00:33:24] TEACHER: go on a break and then high level brainstorm.   {#623}
[00:33:26] TEACHER: So let's start with the first one.   {#624}
[00:33:28] TEACHER: How will you store the data   {#625}
[00:33:30] TEACHER: for an... Now here   {#626}
[00:33:32] TEACHER: what we are discussing right now   {#627}
[00:33:34] TEACHER: is just one node.   {#628}
[00:33:36] TEACHER: It's not a distributed. Distributed will take   {#629}
[00:33:38] TEACHER: when we go on the high level details of it.   {#630}
[00:33:40] TEACHER: This is just single node implementation   {#631}
[00:33:43] TEACHER: of distributed cache as in one node you have, right?   {#632}
[00:33:47] TEACHER: Let's talk about storage.   {#633}
[00:33:49] TEACHER: How would you store the data in this node?   {#634}
[00:33:51] TEACHER: It's an in-memory store.   {#635}
[00:33:53] TEACHER: Raise your hands, I'll pull you in.   {#636}
[00:33:58] TEACHER: Yeah, Hemant?   {#637}
[00:34:00] STUDENT_1: Yeah.   {#638}
[00:34:01] STUDENT_1: So, uh, mostly our requirement is like saving the key value pairs.   {#639}
[00:34:06] STUDENT_1: Can I assume?   {#640}
[00:34:07] STUDENT_1: Okay.   {#641}
[00:34:08] STUDENT_1: So what we need to do is like we need an address in memory where keys are there and for that   {#642}
[00:34:18] STUDENT_1: key whatever the value is there is a separate address from where we have to fetch or maybe   {#643}
[00:34:23] STUDENT_1: write or update.   {#644}
[00:34:24] TEACHER: But where value stores?   {#645}
[00:34:26] STUDENT_1: Yeah, so I'm going on that.   {#646}
[00:34:28] STUDENT_1: And keys, maybe we can provide a continuous array of in-memory, which provides the location   {#647}
[00:34:38] STUDENT_1: for keys, which holds the pointer where the values will be stored.   {#648}
[00:34:46] TEACHER: To put it simply hash table.   {#649}
[00:34:48] STUDENT_1: Yeah, I was trying to build on top of it.   {#650}
[00:34:52] STUDENT_1: Like it's like a hash table.   {#651}
[00:34:55] STUDENT_1: Only thing we may need to worry about is how we try to create the open addressing or chaining   {#652}
[00:35:06] STUDENT_1: because you will try to provide a definite size.   {#653}
[00:35:12] TEACHER: If hash maps already exist, why would you want to rebuild that logic?   {#654}
[00:35:16] TEACHER: They have already solved that problem for you, right?   {#655}
[00:35:21] STUDENT_1: Yeah.   {#656}
[00:35:21] STUDENT_1: I mean, if you ask me a single system, I mean, single node, a has map is made for that with   {#657}
[00:35:30] STUDENT_1: all those things.   {#658}
[00:35:31] STUDENT_1: Correct.   {#659}
[00:35:32] STUDENT_1: We have to maybe think about how we can do this.   {#660}
[00:35:38] STUDENT_1: We have more than one machines are connected.   {#661}
[00:35:40] TEACHER: No, no, no.   {#662}
[00:35:40] TEACHER: We're still talking about single node implementation.   {#663}
[00:35:42] TEACHER: Distribute machine, you can think of sharding.   {#664}
[00:35:44] STUDENT_1: Right?   {#665}
[00:35:45] STUDENT_1: That's a simple has map.   {#666}
[00:35:48] STUDENT_1: has map which can be used as a storage.   {#667}
[00:35:53] STUDENT_1: Now let me change the requirement a bit, just a bit.   {#668}
[00:35:56] TEACHER: Now imagine in the value we could store set list bloom filter and hyperlog blog and whatnot.   {#669}
[00:36:08] TEACHER: I have multiple types that I'm supporting in value.   {#670}
[00:36:11] TEACHER: So how will your value be represented?   {#671}
---- OWNED SEGMENTS END ----

CTX| [00:36:15] STUDENT_1: Okay, now we are looking for like a memory area which we where we can put anything in general,   {#672}
CTX| [00:36:26] STUDENT_1: like that or list or anything. Normally, if you think about from any hash table implementation,   {#673}
CTX| [00:36:32] STUDENT_1: it tries to put values via time. So if we talk about let's say Java 1, I know   {#674}
CTX| [00:36:39] STUDENT_9: No, no, that is good.   {#675}
CTX| [00:36:41] STUDENT_9: No, Java is good.   {#676}
CTX| [00:36:42] STUDENT_1: Okay, so it takes like a value as a data type, which value may be a general object.   {#677}
CTX| [00:36:48] STUDENT_1: It may be like a wrap or primitives integer string.   {#678}
CTX| [00:36:52] STUDENT_1: And then based on whatever the object is, it's takes the pointer of that object.   {#679}
CTX| [00:37:01] STUDENT_1: And that object goes in heap, but we save the object.   {#680}
CTX| [00:37:05] STUDENT_1: So same thing we can do here also.   {#681}
CTX| [00:37:09] STUDENT_1: Either we can create pointers for that,   {#682}
CTX| [00:37:13] STUDENT_1: or if it is like a primitive values,   {#683}
