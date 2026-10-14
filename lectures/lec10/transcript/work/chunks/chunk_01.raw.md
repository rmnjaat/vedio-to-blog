# chunk_01  OWNS 00:00:01 -> 00:11:22  (segments #0-#222, 1853 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:01] TEACHER: Great. Week 5, day 2nd and we'll continue our discussion on standard engines.   {#0}
[00:00:08] TEACHER: The agenda for today are two very interesting problem set points that would not only be interesting but will also solidify a lot of core understanding that you need.   {#1}
[00:00:21] TEACHER: When you're trying to build an interesting system or you're trying to get the maximum out of existing systems.   {#2}
[00:00:28] TEACHER: So there are a lot of building blocks, a lot of foundational concepts that would help you think in a very different way.   {#3}
[00:00:34] TEACHER: And both of them are actively used in production.   {#4}
[00:00:39] TEACHER: It's not something that's just theoretical.   {#5}
[00:00:42] TEACHER: You will find practical use of both of the systems to a huge extent.   {#6}
[00:00:48] TEACHER: Okay.   {#7}
[00:00:49] TEACHER: So let's start with the first one.   {#8}
[00:00:50] TEACHER: The problem statement itself, and we'll directly start with the brainstorm.   {#9}
[00:00:53] TEACHER: The problem statement in itself is very quote-unquote tricky.   {#10}
[00:00:58] TEACHER: What we will do is we will build a word dictionary without using any traditional database.   {#11}
[00:01:05] TEACHER: Like no MySQL, no Postgres, no MongoDB, no Redis, nothing.   {#12}
[00:01:09] TEACHER: You have to be creative.   {#13}
[00:01:11] TEACHER: You cannot use any traditional database.   {#14}
[00:01:13] TEACHER: Sorry.   {#15}
[00:01:14] TEACHER: You cannot use any traditional database to build this word dictionary.   {#16}
[00:01:19] TEACHER: So you have to be creative into thinking, how will you do this?   {#17}
[00:01:24] TEACHER: This thing needs to be scalable, which means you should not be   {#18}
[00:01:28] TEACHER: worrying about scale, but then obviously some constraints would be there,   {#19}
[00:01:32] TEACHER: but it needs to be quote unquote scalable.   {#20}
[00:01:36] TEACHER: And on both the sides.   {#21}
[00:01:38] TEACHER: So typically when you design any system, you can bifurcate into two, one is   {#22}
[00:01:42] TEACHER: storage, other is compute.   {#23}
[00:01:43] TEACHER: Compute basically your API servers and storage means your database.   {#24}
[00:01:47] TEACHER: Here you cannot use your database.   {#25}
[00:01:48] TEACHER: So that's an interesting problem to solve, but it needs to be scalable.   {#26}
[00:01:53] TEACHER: with respect to both storage and API servers,   {#27}
[00:01:57] TEACHER: it's okay to have high response time   {#28}
[00:02:00] TEACHER: because that's not what we are trying to solve over here.   {#29}
[00:02:04] TEACHER: Getting performance is different trick.   {#30}
[00:02:05] TEACHER: We have done it in past at lot of systems.   {#31}
[00:02:07] TEACHER: What we are more focusing on is this constraint   {#32}
[00:02:11] TEACHER: that you cannot use a traditional database.   {#33}
[00:02:13] TEACHER: So we are okay to have a little high response   {#34}
[00:02:16] TEACHER: because we know hundreds of ways to improve it,   {#35}
[00:02:18] TEACHER: like caching, matching and all what we can improve.   {#36}
[00:02:20] TEACHER: But let's not focus on that.   {#37}
[00:02:21] TEACHER: Let's focus on the core part of it that it's okay for us to have a little high response time,   {#38}
[00:02:28] TEACHER: but what we want is we want portability.   {#39}
[00:02:31] TEACHER: Now portability, how come when we kick off our brainstorming,   {#40}
[00:02:35] TEACHER: I would explicitly point out, hey, this is not making our system portable enough   {#41}
[00:02:40] TEACHER: and you'll understand the importance of portability the next system and next week.   {#42}
[00:02:45] TEACHER: So I just compiled this problem statement in order to cover a lot of critical building blocks   {#43}
[00:02:51] TEACHER: in day in and day out in real world.   {#44}
[00:02:54] TEACHER: So we want portability.   {#45}
[00:02:56] TEACHER: Our response time can be high.   {#46}
[00:02:58] TEACHER: Okay.   {#47}
[00:02:59] TEACHER: So you cannot use a traditional database.   {#48}
[00:03:01] TEACHER: You have to be creative.   {#49}
[00:03:02] TEACHER: Now here, one key point.   {#50}
[00:03:05] TEACHER: In the dictionary, it's a standard English dictionary.   {#51}
[00:03:08] TEACHER: You have English words.   {#52}
[00:03:09] TEACHER: You have English meanings.   {#53}
[00:03:12] TEACHER: When you do this,   {#54}
[00:03:14] TEACHER: or when you're serving this dictionary,   {#55}
[00:03:15] TEACHER: it's mostly read-only.   {#56}
[00:03:17] TEACHER: You are not going to update.   {#57}
[00:03:19] TEACHER: Imagine how frequently Oxford dictionary gets updated.   {#58}
[00:03:21] TEACHER: Not much.   {#59}
[00:03:22] TEACHER: Right.   {#60}
[00:03:23] TEACHER: So what we are doing is we don't want to support continuous update.   {#61}
[00:03:28] TEACHER: What we are doing is the words and the meanings will be updated weekly.   {#62}
[00:03:32] TEACHER: It's not that it will be updated anytime you want.   {#63}
[00:03:36] TEACHER: Weekly, you will be given a changelog file.   {#64}
[00:03:39] TEACHER: In this changelog file, you will have the updated words and the updated meanings.   {#65}
[00:03:43] TEACHER: Right.   {#66}
[00:03:43] TEACHER: You would have this information.   {#67}
[00:03:45] TEACHER: You have to take this changelog file and apply it to whatever storage engine or whatever database you are building.   {#68}
[00:03:52] TEACHER: So you don't have to support pointed updates right there and there like live pointed updates.   {#69}
[00:03:58] TEACHER: These will be given to you weekly basis.   {#70}
[00:04:01] TEACHER: Let's say every Sunday.   {#71}
[00:04:02] TEACHER: Every Sunday you are given this new changelog file over email.   {#72}
[00:04:05] TEACHER: You have to apply those changes over here.   {#73}
[00:04:08] TEACHER: The lookup in this dictionary will always be a singular word.   {#74}
[00:04:12] TEACHER: You don't have to think about autocomplete or not.   {#75}
[00:04:14] TEACHER: Given a word, give me the meaning.   {#76}
[00:04:16] TEACHER: That's it.   {#77}
[00:04:16] TEACHER: If the word does not exist, return 404.   {#78}
[00:04:19] TEACHER: The entire size of the dictionary is one terabyte.   {#79}
[00:04:25] TEACHER: And the dictionary in total has 170,000 words.   {#80}
[00:04:31] TEACHER: So total dictionary size is one terabyte.   {#81}
[00:04:34] TEACHER: 170,000 words you have in the dictionary.   {#82}
[00:04:37] TEACHER: So you have to build a system like this.   {#83}
[00:04:41] TEACHER: Build a word dictionary without using any database.   {#84}
[00:04:46] TEACHER: So no MySQL, no MongoDB, no Elasticsearch, no Redis, no Memcache, nothing, nothing, nothing.   {#85}
[00:04:52] TEACHER: Be creative in your approach.   {#86}
[00:04:54] TEACHER: Think about it.   {#87}
[00:04:55] TEACHER: How would you go about it?   {#88}
[00:04:56] TEACHER: And things that we would brainstorm on is around storage query, quotability and seamless   {#89}
[00:05:00] TEACHER: updates.   {#90}
[00:05:00] TEACHER: So let's start with the storage one.   {#91}
[00:05:03] TEACHER: Go on, Raghun.   {#92}
[00:05:05] STUDENT_4: So basically there are two ways that I can think of.   {#93}
[00:05:09] STUDENT_4: We can store this.   {#94}
[00:05:09] STUDENT_4: One is a text file and other is a JSON format basically.   {#95}
[00:05:16] TEACHER: And one terabyte dictionary, Jason format.   {#96}
[00:05:20] STUDENT_4: Yeah, that's a bad way to go, but like just as a reference, how do you, how do you query   {#97}
[00:05:25] TEACHER: a Jason format?   {#98}
[00:05:26] STUDENT_4: So basically it would be like marshaling and marshaling and that would be a very expensive   {#99}
[00:05:32] STUDENT_4: process.   {#100}
[00:05:33] STUDENT_4: Exactly.   {#101}
[00:05:34] STUDENT_4: That's why I'm like more inclined towards text file.   {#102}
[00:05:38] STUDENT_4: Uh, so basically, uh, is it okay if I like, uh, tell about updates also?   {#103}
[00:05:46] TEACHER: And let's cover this one part in depth.   {#104}
[00:05:48] TEACHER: Okay.   {#105}
[00:05:49] TEACHER: You mentioned text file.   {#106}
[00:05:50] TEACHER: You mentioned Jason file.   {#107}
[00:05:51] TEACHER: So when you said Jason file, you would want to store all the words.   {#108}
[00:05:55] TEACHER: And all the meanings in this one Jason file.   {#109}
[00:05:57] TEACHER: Right.   {#110}
[00:05:58] TEACHER: Yeah.   {#111}
[00:05:58] TEACHER: Given that you brought up this topic, it's it's, first of all, thank you   {#112}
[00:06:01] TEACHER: for breaking this topic up, but now what would happen?   {#113}
[00:06:04] TEACHER: A lot of us put a lot of data in Jason files.   {#114}
[00:06:07] TEACHER: Now the disadvantage of storing data in Jason files, especially in this,   {#115}
[00:06:11] TEACHER: in this use case is that for you to check if a word exists in this JSON file or not,   {#116}
[00:06:20] TEACHER: you anyway have to read the entire JSON file, deserialize it,   {#117}
[00:06:24] TEACHER: create this in-memory object and then check like in-memory hash map or something   {#118}
[00:06:28] TEACHER: and then check.   {#119}
[00:06:29] TEACHER: That becomes really costly.   {#120}
[00:06:31] TEACHER: Size of the dictionary is one terabyte big.   {#121}
[00:06:33] TEACHER: There is no direct way to access a particular thing in this JSON   {#122}
[00:06:37] TEACHER: without reading the entire JSON file because that's what the format says.   {#123}
[00:06:41] TEACHER: is why we cannot go with JSON file, a singular JSON file containing all the data, which means   {#124}
[00:06:50] TEACHER: that what we can pick is we can pick a simple text file.   {#125}
[00:06:55] TEACHER: Raul, what will be the format of the text file?   {#126}
[00:06:57] STUDENT_4: So basically it would be like, it will be something like write ahead log, which will   {#127}
[00:07:02] STUDENT_4: have like, which will create some logs.   {#128}
[00:07:04] STUDENT_4: Like this word is updated.   {#129}
[00:07:05] STUDENT_4: This word is like this word is updated with this meaning dictionary.   {#130}
[00:07:08] TEACHER: How are you storing?   {#131}
[00:07:09] STUDENT_4: yeah so that's   {#132}
[00:07:11] STUDENT_4: that's that's how like basically like   {#133}
[00:07:13] STUDENT_4: this word equals to   {#134}
[00:07:16] STUDENT_4: meaning equals to   {#135}
[00:07:17] STUDENT_4: anything kind of CSV   {#136}
[00:07:20] STUDENT_4: yeah you can   {#137}
[00:07:21] TEACHER: say that right so let's   {#138}
[00:07:23] TEACHER: say I score apple   {#139}
[00:07:25] TEACHER: comma fruit   {#140}
[00:07:27] TEACHER: and then new line   {#141}
[00:07:29] TEACHER: and then let's say you have Amazon   {#142}
[00:07:32] STUDENT_4: and it can   {#143}
[00:07:33] STUDENT_4: have repetitive columns like   {#144}
[00:07:35] STUDENT_4: it can have like columns with   {#145}
[00:07:37] STUDENT_4: the same name   {#146}
[00:07:39] STUDENT_11: There are no columns. You only have words and meanings.   {#147}
[00:07:41] STUDENT_4: Like rows with the same   {#148}
[00:07:45] STUDENT_4: same words.   {#149}
[00:07:47] TEACHER: No, no, no. We don't want same words   {#150}
[00:07:49] TEACHER: in the dictionary. Imagine this file   {#151}
[00:07:51] TEACHER: opened in any text editor.   {#152}
[00:07:53] TEACHER: People would find it difficult.   {#153}
[00:07:55] TEACHER: You want portability. You cannot have   {#154}
[00:07:57] TEACHER: duplicate things over here.   {#155}
[00:08:02] STUDENT_4: It is related   {#156}
[00:08:03] STUDENT_4: to the updates that I thought.   {#157}
[00:08:05] STUDENT_4: But that's not   {#158}
[00:08:06] TEACHER: now I'm adding.   {#159}
[00:08:09] TEACHER: out of the box, right?   {#160}
[00:08:11] TEACHER: Yeah.   {#161}
[00:08:11] TEACHER: I know where you're going with this.   {#162}
[00:08:13] TEACHER: Right.   {#163}
[00:08:14] TEACHER: Now then you'll create an index   {#164}
[00:08:15] TEACHER: and what not on top of it.   {#165}
[00:08:16] STUDENT_4: No, I was actually thinking   {#166}
[00:08:18] STUDENT_4: about dirty reads   {#167}
[00:08:19] STUDENT_4: and something like that   {#168}
[00:08:20] STUDENT_4: in that context.   {#169}
[00:08:21] STUDENT_4: But let's keep it simple   {#170}
[00:08:23] TEACHER: because this one constraint   {#171}
[00:08:24] TEACHER: that I'm adding   {#172}
[00:08:25] TEACHER: that you cannot have   {#173}
[00:08:26] TEACHER: repetitive things in this file   {#174}
[00:08:27] TEACHER: will make things very,   {#175}
[00:08:29] TEACHER: let me add it.   {#176}
[00:08:33] TEACHER: No repetitive entries.   {#177}
[00:08:37] TEACHER: Okay.   {#178}
[00:08:39] TEACHER: Okay.   {#179}
[00:08:41] TEACHER: So now what will you do?   {#180}
[00:08:43] TEACHER: Is this format according to you okay enough to start with?   {#181}
[00:08:47] TEACHER: Yeah.   {#182}
[00:08:48] TEACHER: For starters, it is okay.   {#183}
[00:08:51] TEACHER: Okay.   {#184}
[00:08:51] TEACHER: Just one question before I move to Heman.   {#185}
[00:08:54] TEACHER: Will you keep this file sorted in some fashion?   {#186}
[00:08:59] STUDENT_4: Okay.   {#187}
[00:09:00] STUDENT_4: If there is a sorting constraint, then there will be like...   {#188}
[00:09:03] STUDENT_4: No, there is no constraint.   {#189}
[00:09:04] STUDENT_4: Will you keep it sorted?   {#190}
[00:09:07] STUDENT_4: No, I don't think so.   {#191}
[00:09:09] STUDENT_4: don't have any like like I we don't have any restrictions on the response time right as of   {#192}
[00:09:16] STUDENT_4: now like we are not bound to just give the answer quickly so I will not prefer sorting here okay so   {#193}
[00:09:24] STUDENT_4: words can come and fit in any order here okay yeah okay fine okay hey man else else I will go with   {#194}
[00:09:32] STUDENT_2: the trees or something like that wait wait wait wait wait we'll come to that we'll come to that   {#195}
[00:09:39] TEACHER: that's how because it's fun to discover it step by step right because that that solidifies the   {#196}
[00:09:45] TEACHER: understanding for him that's right right okay so uh himan yeah anything that you would want to   {#197}
[00:09:52] STUDENT_1: change in this file format yeah i maybe i would like to start from scratch the way i have to think   {#198}
[00:09:59] STUDENT_1: it. So if I say the biggest requirement, it is first searchable dictionary, the first,   {#199}
[00:10:11] STUDENT_1: most important and the heavy thing is it's a, it should be a searchable via key. Let's say,   {#200}
[00:10:18] STUDENT_1: I consider this thing as a key value store, where key is a word, well, you can be a two line, three   {#201}
[00:10:25] STUDENT_1: line for an explanation of that word searchable via key plus it's a read heavy operation.   {#202}
[00:10:32] STUDENT_1: This dictionary is always maybe have a thousand to one ratio of read and write or maybe something   {#203}
[00:10:37] STUDENT_1: too skewed.   {#204}
[00:10:39] STUDENT_1: Much more than that to be honest.   {#205}
[00:10:40] STUDENT_1: It's much more than thousand to one.   {#206}
[00:10:42] STUDENT_1: So read heavy searchable system is one thing.   {#207}
[00:10:46] STUDENT_1: The only third thing which I have to take care when I'm going to add or modify a word.   {#208}
[00:10:52] STUDENT_1: I should not kind of   {#209}
[00:10:55] STUDENT_1: boil the ocean for   {#210}
[00:10:56] STUDENT_1: changing a small thing. That's   {#211}
[00:10:58] STUDENT_1: a second thought I am having.   {#212}
[00:11:00] STUDENT_1: What did you say about the last thing when you are modifying   {#213}
[00:11:02] STUDENT_1: something? So I'm   {#214}
[00:11:04] STUDENT_1: saying it should not kind of   {#215}
[00:11:06] STUDENT_1: disturb my whole system by doing   {#216}
[00:11:08] STUDENT_1: a very small change. I should   {#217}
[00:11:10] STUDENT_1: be able to update or add.   {#218}
[00:11:13] STUDENT_1: So that's the third   {#219}
[00:11:14] STUDENT_1: thing I have to keep in my mind when I'm   {#220}
[00:11:16] STUDENT_1: designing it.   {#221}
[00:11:19] STUDENT_1: If I design in a way   {#222}
---- OWNED SEGMENTS END ----

CTX| [00:11:22] STUDENT_1: each update is too costly, then also not a very good design.   {#223}
CTX| [00:11:26] STUDENT_1: It may be a good, but not very good.   {#224}
CTX| [00:11:28] TEACHER: But just to probe you on that, our updates are going to be weekly once.   {#225}
CTX| [00:11:34] STUDENT_1: Yes, when I say it should not disturb means it should not need to do too much   {#226}
CTX| [00:11:42] STUDENT_1: heavy on IO side or read side on desk.   {#227}
CTX| [00:11:46] STUDENT_1: If you put it in such a structure, then I have to go and scan each and every file   {#228}
CTX| [00:11:52] STUDENT_1: figure it out where it is and then change or add,   {#229}
CTX| [00:11:57] TEACHER: then it does not seems like a good design.   {#230}
CTX| [00:12:00] TEACHER: That's yeah.   {#231}
CTX| [00:12:00] TEACHER: But then in any case, our updates are I totally agree with your point that each   {#232}
CTX| [00:12:05] TEACHER: update, each single word update cannot be very costly.   {#233}
CTX| [00:12:09] STUDENT_15: Yes.   {#234}
CTX| [00:12:10] TEACHER: But given that my total I'm getting updates in batch, I can still do one huge   {#235}
CTX| [00:12:17] STUDENT_1: processing. Yes.   {#236}
CTX| [00:12:18] STUDENT_1: One huge processing is okay.   {#237}
