# chunk_02  OWNS 00:11:22 -> 00:23:53  (segments #223-#422, 2152 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:10:25] STUDENT_1: line for an explanation of that word searchable via key plus it's a read heavy operation.   {#202}
CTX| [00:10:32] STUDENT_1: This dictionary is always maybe have a thousand to one ratio of read and write or maybe something   {#203}
CTX| [00:10:37] STUDENT_1: too skewed.   {#204}
CTX| [00:10:39] STUDENT_1: Much more than that to be honest.   {#205}
CTX| [00:10:40] STUDENT_1: It's much more than thousand to one.   {#206}
CTX| [00:10:42] STUDENT_1: So read heavy searchable system is one thing.   {#207}
CTX| [00:10:46] STUDENT_1: The only third thing which I have to take care when I'm going to add or modify a word.   {#208}
CTX| [00:10:52] STUDENT_1: I should not kind of   {#209}
CTX| [00:10:55] STUDENT_1: boil the ocean for   {#210}
CTX| [00:10:56] STUDENT_1: changing a small thing. That's   {#211}
CTX| [00:10:58] STUDENT_1: a second thought I am having.   {#212}
CTX| [00:11:00] STUDENT_1: What did you say about the last thing when you are modifying   {#213}
CTX| [00:11:02] STUDENT_1: something? So I'm   {#214}
CTX| [00:11:04] STUDENT_1: saying it should not kind of   {#215}
CTX| [00:11:06] STUDENT_1: disturb my whole system by doing   {#216}
CTX| [00:11:08] STUDENT_1: a very small change. I should   {#217}
CTX| [00:11:10] STUDENT_1: be able to update or add.   {#218}
CTX| [00:11:13] STUDENT_1: So that's the third   {#219}
CTX| [00:11:14] STUDENT_1: thing I have to keep in my mind when I'm   {#220}
CTX| [00:11:16] STUDENT_1: designing it.   {#221}
CTX| [00:11:19] STUDENT_1: If I design in a way   {#222}

---- OWNED SEGMENTS START ----
[00:11:22] STUDENT_1: each update is too costly, then also not a very good design.   {#223}
[00:11:26] STUDENT_1: It may be a good, but not very good.   {#224}
[00:11:28] TEACHER: But just to probe you on that, our updates are going to be weekly once.   {#225}
[00:11:34] STUDENT_1: Yes, when I say it should not disturb means it should not need to do too much   {#226}
[00:11:42] STUDENT_1: heavy on IO side or read side on desk.   {#227}
[00:11:46] STUDENT_1: If you put it in such a structure, then I have to go and scan each and every file   {#228}
[00:11:52] STUDENT_1: figure it out where it is and then change or add,   {#229}
[00:11:57] TEACHER: then it does not seems like a good design.   {#230}
[00:12:00] TEACHER: That's yeah.   {#231}
[00:12:00] TEACHER: But then in any case, our updates are I totally agree with your point that each   {#232}
[00:12:05] TEACHER: update, each single word update cannot be very costly.   {#233}
[00:12:09] STUDENT_15: Yes.   {#234}
[00:12:10] TEACHER: But given that my total I'm getting updates in batch, I can still do one huge   {#235}
[00:12:17] STUDENT_1: processing. Yes.   {#236}
[00:12:18] STUDENT_1: One huge processing is okay.   {#237}
[00:12:22] STUDENT_1: I think we have understood the fair bit of biggest requirement of the system.   {#238}
[00:12:27] STUDENT_1: Let's think about making it how we can do it.   {#239}
[00:12:30] STUDENT_1: When we say we need something searchable,   {#240}
[00:12:34] STUDENT_1: definitely a sorted via key looks like the first thing that we have to thought.   {#241}
[00:12:41] STUDENT_1: If you do not sort it, there is no way you can do a search in a very better way.   {#242}
[00:12:47] STUDENT_1: I mean, an efficient way, if I have to use the right word.   {#243}
[00:12:50] STUDENT_1: So starting by key should be the way now how you will store it.   {#244}
[00:12:56] STUDENT_1: So that if I have to search it, I can efficiently do it means in place of having a single text file,   {#245}
[00:13:07] STUDENT_1: maybe I need to start it or partition it where there are multiple of files.   {#246}
[00:13:12] STUDENT_1: And if you use yesterday's pattern of figuring out the routing,   {#247}
[00:13:20] STUDENT_1: you sent a word ABC and you figure out out of 100 files that I am having,   {#248}
[00:13:26] STUDENT_1: this file is responsible for ABC, let's say.   {#249}
[00:13:29] STUDENT_1: So I have not to go and search it and that file is sorted.   {#250}
[00:13:33] STUDENT_1: So if I go and know that this is the way we are up to search it,   {#251}
[00:13:38] STUDENT_1: I can immediately go and read that specific place in the file   {#252}
[00:13:41] STUDENT_1: so that disk.io and seek and all those things is minimal.   {#253}
[00:13:46] TEACHER: Just to stop you there.   {#254}
[00:13:50] TEACHER: You are proposing we don't have just one file.   {#255}
[00:13:53] TEACHER: We can split it into multiple files.   {#256}
[00:13:55] TEACHER: Just one thing added this constant of portability.   {#257}
[00:13:58] TEACHER: We cannot have multiple files.   {#258}
[00:14:01] TEACHER: Okay.   {#259}
[00:14:04] TEACHER: Because when you have multiple files, what you are killing is you are killing portability.   {#260}
[00:14:08] TEACHER: What we want is literally this one file in some format.   {#261}
[00:14:12] TEACHER: We do a copy like it should be one file which we should be easily able to ship.   {#262}
[00:14:16] TEACHER: We should not be able to copy tens and hundreds of files.   {#263}
[00:14:20] TEACHER: Only a specific software can read it.   {#264}
[00:14:21] TEACHER: Right.   {#265}
[00:14:22] TEACHER: What we would want to have is we want to just have this one file   {#266}
[00:14:25] TEACHER: containing everything we need to read and write to it.   {#267}
[00:14:29] STUDENT_1: Okay.   {#268}
[00:14:30] STUDENT_1: I have a bit different of Arpit there.   {#269}
[00:14:33] STUDENT_1: When we say multiple files, that's a logical way of saying it.   {#270}
[00:14:40] STUDENT_1: We may think about like having a one single zip,   {#271}
[00:14:43] STUDENT_1: which have hundreds of folders and each folder has something which makes.   {#272}
[00:14:46] STUDENT_1: No, but then you would still have to extract it to use it.   {#273}
[00:14:48] STUDENT_1: Right.   {#274}
[00:14:51] TEACHER: I'm also against it.   {#275}
[00:14:52] TEACHER: I'm saying have just one.   {#276}
[00:14:56] TEACHER: And you'll understand why I'm adding this constraint   {#277}
[00:14:59] TEACHER: when we reach the end of the solution.   {#278}
[00:15:01] TEACHER: Because it forms the foundation for hundreds of systems   {#279}
[00:15:04] TEACHER: that I'll talk about.   {#280}
[00:15:05] TEACHER: That's why I'm just probing you to think.   {#281}
[00:15:08] TEACHER: It might seem like Arpit is adding random constraint,   {#282}
[00:15:10] TEACHER: but these will all come in very handy.   {#283}
[00:15:14] STUDENT_1: I got it to your point.   {#284}
[00:15:16] STUDENT_1: Maybe I will think.   {#285}
[00:15:17] STUDENT_1: So when I say multiple files, my thought came from the logical division,   {#286}
[00:15:22] STUDENT_1: not necessarily we need to have a multiple files in one single file.   {#287}
[00:15:26] STUDENT_1: We have a logical division which says like, okay, first hundred pages or first hundred is   {#288}
[00:15:30] STUDENT_1: for this part and then up to this to this area.   {#289}
[00:15:34] STUDENT_1: So we can have a proper header or something which is a second file which talks about up   {#290}
[00:15:40] STUDENT_1: to this sector and this place are for this area and we can do it by a single file.   {#291}
[00:15:44] STUDENT_1: The idea is about making it searchable by sorting.   {#292}
[00:15:49] STUDENT_1: So that's why partitioning is necessary.   {#293}
[00:15:52] STUDENT_1: Sorting is necessary when you store it.   {#294}
[00:15:54] STUDENT_1: Now what we need to think about is when we are going to do a   {#295}
[00:16:02] STUDENT_1: representation in the system, we need a key and maybe a big size of variable size of value.   {#296}
[00:16:12] STUDENT_1: So in file, if you take a line by line approach or any approach when we are writing it, maybe   {#297}
[00:16:20] STUDENT_1: that will not be so good.   {#298}
[00:16:21] STUDENT_1: So we need to think about it encoding it in a way.   {#299}
[00:16:25] STUDENT_1: So in place of directly JSON, if you use any other format of encoding, when we are storing   {#300}
[00:16:31] STUDENT_1: it, that may be helpful, but it will definitely add the cost of decoding it.   {#301}
[00:16:38] STUDENT_1: So if I, in place of Jason, if I use any famous paracet or any other format that, that will   {#302}
[00:16:46] STUDENT_1: add a bit of a work there, but it seems that that should be not too much in my understanding.   {#303}
[00:16:55] STUDENT_1: You may need to think about the real facts and numbers to figure it out.   {#304}
[00:16:59] STUDENT_1: If it is a too bad a con that not do it.   {#305}
[00:17:03] STUDENT_1: Got it.   {#306}
[00:17:04] TEACHER: Thanks.   {#307}
[00:17:05] TEACHER: Thanks.   {#308}
[00:17:05] TEACHER: Thanks so much for adding so much.   {#309}
[00:17:08] TEACHER: trying not to digress into parquet, avro and all this format,   {#310}
[00:17:13] TEACHER: but trying to build a base understanding of this while still keeping it simple.   {#311}
[00:17:18] TEACHER: Because what you suggested that we have multiple partitions in our file,   {#312}
[00:17:24] TEACHER: and we should be able to look up within that,   {#313}
[00:17:26] TEACHER: that is still a complex enough solution that we'll touch upon later.   {#314}
[00:17:32] TEACHER: I'm trying to go in a very simpler direction so that the base concepts that we   {#315}
[00:17:36] TEACHER: need to build anything queryable works.   {#316}
[00:17:40] TEACHER: And just to add to a real world use case on why I'm just trying to keep it simple is on AWS, AWS has S3.   {#317}
[00:17:51] TEACHER: We all know AWS has S3.   {#318}
[00:17:53] TEACHER: Right?   {#319}
[00:17:54] TEACHER: On S3, we can upload any CSV file.   {#320}
[00:17:57] STUDENT_15: Yes.   {#321}
[00:17:58] TEACHER: And we can query it using a service called Athena.   {#322}
[00:18:00] STUDENT_15: I know.   {#323}
[00:18:01] TEACHER: Right?   {#324}
[00:18:02] TEACHER: Now in Athena, when you are storing things on S3, you are just storing simple CSV file,   {#325}
[00:18:08] TEACHER: but you are still able to seamlessly query on Athena.   {#326}
[00:18:10] TEACHER: That's what I'm trying to simulate.   {#327}
[00:18:12] TEACHER: With this example, with this basic understanding, we are trying to build AWS S3, not at that   {#328}
[00:18:19] TEACHER: scale, but basically that particular compute engine, how they would have thought of this,   {#329}
[00:18:25] TEACHER: how they would have implemented this.   {#330}
[00:18:27] TEACHER: And it has a ton of other applications as well, but this is what I'm trying to simulate.   {#331}
[00:18:32] TEACHER: very simple sense can we make and obviously the points that you said we will all incorporate that   {#332}
[00:18:37] TEACHER: right but not with that specific like let's say parquet and this because not a lot of people would   {#333}
[00:18:42] TEACHER: know about it but simplifying it to have an understanding okay this is what we need you can   {#334}
[00:18:48] TEACHER: use parquet and whatnot to build it but instead of going into that complexity we'll just keep it   {#335}
[00:18:51] STUDENT_1: really simple on that okay just maybe a last line to say on that in terms of the thought process   {#336}
[00:18:58] STUDENT_1: how Athena has came or other systems works in a such way.   {#337}
[00:19:01] STUDENT_1: We need to think about something like Lucene's way of tokenizing and putting.   {#338}
[00:19:08] STUDENT_1: Here the only thing is in the key,   {#339}
[00:19:11] STUDENT_1: Lucene tries to figure out the document ID and name   {#340}
[00:19:14] STUDENT_1: and all those things against it to save it.   {#341}
[00:19:16] STUDENT_1: Here we have to save it maybe a continuous data of two, three lines,   {#342}
[00:19:21] STUDENT_1: which is the meaning of that word.   {#343}
[00:19:24] STUDENT_1: So we need to think about building something like this.   {#344}
[00:19:28] STUDENT_1: And that looks near real because if you see the Lucene index,   {#345}
[00:19:34] STUDENT_1: they are creating a single file also.   {#346}
[00:19:36] STUDENT_1: I mean, one index is good enough in one single file,   {#347}
[00:19:40] STUDENT_1: which is quite large, even can go to one terabyte,   {#348}
[00:19:42] STUDENT_1: whatever you are saying.   {#349}
[00:19:43] STUDENT_1: So that's all I can think of to start with.   {#350}
[00:19:47] TEACHER: No, but you added some great parts.   {#351}
[00:19:48] TEACHER: It's just that I'm trying to keep it one level down   {#352}
[00:19:52] TEACHER: and then jump the level.   {#353}
[00:19:54] TEACHER: That's it.   {#354}
[00:19:55] TEACHER: Okay.   {#355}
[00:19:57] TEACHER: Sidesh, given this file that we have,   {#356}
[00:20:00] TEACHER: it will contain all the words that we have seen for now.   {#357}
[00:20:06] TEACHER: How would you search on this?   {#358}
[00:20:09] STUDENT_2: Yeah, Arvit.   {#359}
[00:20:10] STUDENT_2: So I was going to come to that.   {#360}
[00:20:11] STUDENT_2: Given that we have a single file,   {#361}
[00:20:13] STUDENT_2: and let us suppose this is terabyte big file,   {#362}
[00:20:16] STUDENT_2: what I would do is basically,   {#363}
[00:20:18] STUDENT_2: like imagine I will start with binary search   {#364}
[00:20:20] STUDENT_2: and then we will go ahead.   {#365}
[00:20:22] STUDENT_2: what I would do is basically take some offsets in this,   {#366}
[00:20:26] STUDENT_2: store it as indexes and given a word.   {#367}
[00:20:29] STUDENT_2: How?   {#368}
[00:20:30] STUDENT_2: So basically, yeah, now, okay, I'll get there.   {#369}
[00:20:33] STUDENT_2: Where I'm getting is basically I'm getting into a B plus tree.   {#370}
[00:20:36] STUDENT_2: I want in two keys and values   {#371}
[00:20:38] STUDENT_2: and basically create blocks of pages in memories.   {#372}
[00:20:42] STUDENT_2: So let us construct a first level index first.   {#373}
[00:20:45] STUDENT_2: Okay.   {#374}
[00:20:46] STUDENT_2: Now let us suppose you have a one terabyte file   {#375}
[00:20:48] STUDENT_2: and you have eight kilobyte block.   {#376}
[00:20:52] TEACHER: go to blocks and I'll keep it very simple.   {#377}
[00:20:54] TEACHER: Very simple.   {#378}
[00:20:55] TEACHER: Like what a five year old to understand.   {#379}
[00:20:57] STUDENT_2: Okay.   {#380}
[00:20:58] STUDENT_2: Okay.   {#381}
[00:20:58] STUDENT_2: Makes sense.   {#382}
[00:20:59] STUDENT_2: Like let us suppose you can keep 1000 keys in memory.   {#383}
[00:21:03] TEACHER: Okay.   {#384}
[00:21:04] TEACHER: Now, wait, wait, wait, wait, why only 1000 keys in memory?   {#385}
[00:21:08] TEACHER: So I can keep a lot.   {#386}
[00:21:10] TEACHER: No, why I'm saying this is we are over exaggerating.   {#387}
[00:21:14] TEACHER: We are over engineering.   {#388}
[00:21:15] TEACHER: This, this is a very simple word dictionary, right?   {#389}
[00:21:18] TEACHER: Keep it very simple.   {#390}
[00:21:19] TEACHER: No need to add B plus trees.   {#391}
[00:21:22] TEACHER: some anything fancy keep it very simple because that's where you see the power of the system   {#392}
[00:21:26] TEACHER: and i'm just trying to bring it down to a very simplistic level because you would see the beauty   {#393}
[00:21:32] TEACHER: of the system right that's why that's why given that you have what would be the first intuition   {#394}
[00:21:37] TEACHER: the first way of making or let me let me cover that i know you folks would go into very fancy   {#395}
[00:21:43] TEACHER: direction i'll just i'll just pull you into this give me a minute right okay so the nine way let's   {#396}
[00:21:49] TEACHER: say we discussed that, Hey, we cannot use a traditional database to store this particular   {#397}
[00:21:54] TEACHER: dictionary.   {#398}
[00:21:55] TEACHER: Dictory contains key and the meaning.   {#399}
[00:21:57] TEACHER: Now for us to make things now, given that we cannot use a traditional DB, the simplest   {#400}
[00:22:03] TEACHER: thing that we can come up with is, Hey, let's just store things in a simple text file.   {#401}
[00:22:07] TEACHER: Given that we are storing in things in a simple text file, what format would you store?   {#402}
[00:22:11] TEACHER: The normal format that we can think of is let's say we store it in a CSV format, but   {#403}
[00:22:16] TEACHER: first thing is key then you have this gigantic meaning for that particular key.   {#404}
[00:22:21] TEACHER: Okay given we have this we need to now search for this like because that's what our use case is.   {#405}
[00:22:27] TEACHER: Your use case is to do a key lookup. Now given that we have this one gigantic one terabyte file   {#406}
[00:22:33] TEACHER: and now we want to do key lookup in this what is a naive way? If you have this just this one file   {#407}
[00:22:38] TEACHER: and you want to do key lookup what will you do? You'll open this file read this file line by line   {#408}
[00:22:46] TEACHER: find the particular key that you are looking for.   {#409}
[00:22:48] TEACHER: Once you find it, you stop the iteration, read the meaning and return the response.   {#410}
[00:22:53] TEACHER: Right now doing this for every single read is very expensive because dictionary is a   {#411}
[00:22:58] TEACHER: very read heavy application.   {#412}
[00:23:00] TEACHER: So linear search is not a way to go because when you search linearly for every read   {#413}
[00:23:07] TEACHER: request that is coming in, you would be worst case, you would be effectively reading   {#414}
[00:23:11] TEACHER: one terabyte file every single time.   {#415}
[00:23:13] TEACHER: Right.   {#416}
[00:23:13] TEACHER: worst case right on an average would be reading half a terabyte for every read which will make   {#417}
[00:23:18] TEACHER: your things first of all very slow second it would degrade the performance of your disk third your   {#418}
[00:23:25] TEACHER: disk sectors will go bad because it is very heavily overutilized at the moment right so it has hardware   {#419}
[00:23:31] TEACHER: problems it has software problems it has time problems right so whenever you are in the situation   {#420}
[00:23:37] TEACHER: where your reads are slow, always, always in order to make things faster, in order to   {#421}
[00:23:44] TEACHER: make reads faster, the only thing that should come to your mind is indexing.   {#422}
---- OWNED SEGMENTS END ----

CTX| [00:23:53] TEACHER: So can we somehow index the data?   {#423}
CTX| [00:23:56] TEACHER: Can we somehow create a small index through which we would be able to not, through which   {#424}
CTX| [00:24:03] TEACHER: we should avoid doing a sequential scan of this entire file to hunt for the meaning that   {#425}
CTX| [00:24:10] TEACHER: we are doing or to hunt for the key that we are looking for.   {#426}
CTX| [00:24:13] TEACHER: So can we create an index on top of it?   {#427}
CTX| [00:24:17] TEACHER: So that's what would be the index that we'll create.   {#428}
CTX| [00:24:19] TEACHER: Just one level index, simple.   {#429}
CTX| [00:24:22] TEACHER: What would this index look like?   {#430}
CTX| [00:24:24] STUDENT_2: Yeah.   {#431}
CTX| [00:24:24] STUDENT_2: So basically offset and the name, like basically Apple or MSN.   {#432}
CTX| [00:24:30] TEACHER: And the key, right?   {#433}
CTX| [00:24:31] TEACHER: Key and the offset.   {#434}
CTX| [00:24:33] STUDENT_2: point to what? Offset is basically inside the file. So first line of this file is basically,   {#435}
CTX| [00:24:42] STUDENT_2: let us suppose we have organized it line by line is offset zero and so on. So offset is the   {#436}
CTX| [00:24:50] TEACHER: nth byte from the beginning of the file up until with that line starts. Right. So Apple is done.   {#437}
