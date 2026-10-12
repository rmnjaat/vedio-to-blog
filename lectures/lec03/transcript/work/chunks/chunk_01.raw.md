# chunk_01  OWNS 00:00:02 -> 00:12:58  (segments #0-#196, 2003 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: The third day second, it's all about distributed ID generators.   {#0}
[00:00:08] TEACHER: Like this is one of the most misunderstood topic out there.   {#1}
[00:00:14] TEACHER: Like, Hey, auto increment works giving ID wise this such a big problem.   {#2}
[00:00:21] TEACHER: Most people don't really face, don't really face this unless they hit the scale.   {#3}
[00:00:27] TEACHER: But nowadays, because of the mass internet penetration that we have, most companies hit that scale sooner than they think.   {#4}
[00:00:37] TEACHER: So which is where distributed ID generators really come into the picture.   {#5}
[00:00:40] TEACHER: That's why.   {#6}
[00:00:41] TEACHER: So that's one reason why you should know them in depth.   {#7}
[00:00:45] TEACHER: Second is there's some beauty of computer science going behind the scenes.   {#8}
[00:00:50] TEACHER: You just fall in love on how amazing engineers are in the device solutions like this.   {#9}
[00:00:57] TEACHER: is surely going to blow your mind.   {#10}
[00:01:00] TEACHER: Third, when we understand ID generation,   {#11}
[00:01:04] TEACHER: we see some really interesting side effects of that,   {#12}
[00:01:09] TEACHER: which most people didn't even think about.   {#13}
[00:01:11] TEACHER: So we'll touch upon all of that today.   {#14}
[00:01:14] TEACHER: And what I'll do in first one,   {#15}
[00:01:16] TEACHER: I'll take you through the journey on basics of ID generation.   {#16}
[00:01:22] TEACHER: And through that, we build or we formulate some really   {#17}
[00:01:27] TEACHER: foundational things that we should know about.   {#18}
[00:01:30] TEACHER: And then we take a look at how Amazon does it.   {#19}
[00:01:33] TEACHER: Oh, sorry.   {#20}
[00:01:34] TEACHER: How Amazon does it.   {#21}
[00:01:36] TEACHER: How Flickr does it.   {#22}
[00:01:38] TEACHER: How Twitter does it.   {#23}
[00:01:40] TEACHER: How Instagram does it.   {#24}
[00:01:41] TEACHER: Right.   {#25}
[00:01:42] TEACHER: And implement every single thing.   {#26}
[00:01:45] TEACHER: Right.   {#27}
[00:01:45] TEACHER: Without, and trust me, there are people from past courts.   {#28}
[00:01:48] TEACHER: Once they implemented, they got much deeper understanding.   {#29}
[00:01:51] TEACHER: Theoretically, it's all okay.   {#30}
[00:01:52] TEACHER: But implement every single one of these.   {#31}
[00:01:57] TEACHER: to get the deep understanding, why that works,   {#32}
[00:02:00] TEACHER: because there are such beautiful things out there.   {#33}
[00:02:03] TEACHER: I want all of you to experience that same joy,   {#34}
[00:02:07] TEACHER: which obviously early engineers, that is very different,   {#35}
[00:02:11] TEACHER: but at least you get that kick of you knowing those things really in depth.   {#36}
[00:02:16] TEACHER: Okay. So we'll do that.   {#37}
[00:02:17] TEACHER: So we start from really simple   {#38}
[00:02:20] TEACHER: and we touch upon some really interesting concepts.   {#39}
[00:02:23] TEACHER: While doing this, I'll show you a very interesting demo, not really a demo, but some really interesting side effects on that.   {#40}
[00:02:31] TEACHER: Okay.   {#41}
[00:02:32] TEACHER: So let's start with this.   {#42}
[00:02:34] TEACHER: So ID generation, first of all, IDs, IDs, we all just use so often, like identity of something.   {#43}
[00:02:43] TEACHER: We use ID word very often.   {#44}
[00:02:44] TEACHER: So it's more about, if I may want to put it in just one line, it is more about giving   {#45}
[00:02:49] TEACHER: uniqueness to a particular row, document, object, event, whatnot.   {#46}
[00:02:55] TEACHER: Anything that would help you uniquely identify something that is its ID.   {#47}
[00:03:00] TEACHER: So what our problem statement is that assign a globally unique ID to anything.   {#48}
[00:03:07] TEACHER: So whoever asked for an ID, we assign it to them.   {#49}
[00:03:11] TEACHER: Now here what we do is we write a function that spits out something unique every time   {#50}
[00:03:18] TEACHER: it is invoked.   {#51}
[00:03:20] TEACHER: So that's what we have to do.   {#52}
[00:03:23] TEACHER: As simple as when someone wants it, we invoke a function that function should spit out something   {#53}
[00:03:27] TEACHER: unique every time.   {#54}
[00:03:29] TEACHER: Now here, the function we are writing is not a central service.   {#55}
[00:03:34] TEACHER: Don't directly jump into that.   {#56}
[00:03:36] TEACHER: It's a function which is part of your business logic and not a central service.   {#57}
[00:03:42] TEACHER: A lot of people are directly, the ID generation,   {#58}
[00:03:45] TEACHER: I'll start writing a new service.   {#59}
[00:03:47] TEACHER: Don't think of that.   {#60}
[00:03:48] TEACHER: What we are right now being constrained by,   {#61}
[00:03:51] TEACHER: because this is where the foundation,   {#62}
[00:03:52] TEACHER: like this is what matters when you are building a foundation,   {#63}
[00:03:56] TEACHER: is we are just writing a function whose job is to spit out something new   {#64}
[00:04:00] TEACHER: every time it is simple.   {#65}
[00:04:02] TEACHER: As simple as that.   {#66}
[00:04:04] TEACHER: I'll take you through that evolution.   {#67}
[00:04:06] TEACHER: so that you understand it really well.   {#68}
[00:04:08] TEACHER: So it is part of our application logic and not a central ID generation service.   {#69}
[00:04:14] TEACHER: So when I get a request, I myself am generating an ID by invoking a function   {#70}
[00:04:18] TEACHER: called locally function call.   {#71}
[00:04:20] TEACHER: I get that idea and I use it.   {#72}
[00:04:22] TEACHER: That's what we are doing at the moment.   {#73}
[00:04:24] TEACHER: Then we'll build a central ID generation service kind of thing, whatever it's   {#74}
[00:04:27] TEACHER: at, right?   {#75}
[00:04:28] TEACHER: Okay.   {#76}
[00:04:29] TEACHER: So here the first hint that we get is because we want to write a function that   {#77}
[00:04:36] TEACHER: unique every time it is invoked. We know time is unique. We know time always moves forward.   {#78}
[00:04:42] TEACHER: So why can't our ID generation function just return my current epoch millisecond?   {#79}
[00:04:49] TEACHER: And that could be the, that could be the simplest starting point that we can think about.   {#80}
[00:04:55] TEACHER: That because we want to generate ID every time, generate something unique every time a function   {#81}
[00:05:01] TEACHER: is invoked. We know time always moves forward. So let's just, whenever someone asks for an id,   {#82}
[00:05:06] TEACHER: let me just generate an epoch millisecond, which is the current timestamp in millisecond.   {#83}
[00:05:13] TEACHER: That should work fine, but obviously something would break because if it was the case, then   {#84}
[00:05:18] TEACHER: everyone would be using this. So here we are taking epoch millisecond, which means we are   {#85}
[00:05:26] TEACHER: okay with the millisecond level granularity, which means this function cannot be invoked   {#86}
[00:05:30] TEACHER: twice within the same millisecond.   {#87}
[00:05:33] TEACHER: Otherwise you have to go to microsecond and nanosecond level.   {#88}
[00:05:37] TEACHER: So now what we do is that's okay.   {#89}
[00:05:39] TEACHER: Let's start with that.   {#90}
[00:05:40] TEACHER: With that constraint, it's fine.   {#91}
[00:05:42] TEACHER: So what if there are multiple machines?   {#92}
[00:05:45] TEACHER: Our function for ID generation was as simple as generating epoch millisecond and just   {#93}
[00:05:51] TEACHER: returning it.   {#94}
[00:05:53] TEACHER: What if there are multiple machines?   {#95}
[00:05:56] TEACHER: assume that a single machine, it is not possible for our use case to invoke the same function   {#96}
[00:06:01] TEACHER: twice within the same millisecond.   {#97}
[00:06:03] TEACHER: It is very much possible.   {#98}
[00:06:04] TEACHER: I will have multiple machines in which that same method is getting executed within the   {#99}
[00:06:10] TEACHER: same millisecond.   {#100}
[00:06:11] TEACHER: So when that happens, what would happen?   {#101}
[00:06:14] TEACHER: Collision.   {#102}
[00:06:15] TEACHER: Because both the machine at that very same time, let's say 1729 is the epoch millisecond   {#103}
[00:06:21] TEACHER: and just using a smaller number over here.   {#104}
[00:06:23] TEACHER: but imagine it's an epoch millisecond.   {#105}
[00:06:26] TEACHER: When this function is getting invoked at the very same millisecond   {#106}
[00:06:30] TEACHER: on those two machines, what would happen?   {#107}
[00:06:33] TEACHER: There would be a collision.   {#108}
[00:06:34] TEACHER: Both would generate the same ID   {#109}
[00:06:37] TEACHER: because what we were just returning was 1729,   {#110}
[00:06:40] TEACHER: the current epoch millisecond,   {#111}
[00:06:41] TEACHER: which means it is not globally unique.   {#112}
[00:06:43] TEACHER: So when you have multiple machines,   {#113}
[00:06:45] TEACHER: one thing that you can do in order to resolve this collision   {#114}
[00:06:47] TEACHER: is to concatenate machine ID and APOC-MEDISECOND.   {#115}
[00:06:54] TEACHER: So which machine generated which ID?   {#116}
[00:06:57] TEACHER: That becomes your ID.   {#117}
[00:06:59] TEACHER: So this is the function that would be executed   {#118}
[00:07:01] TEACHER: on both the machines now.   {#119}
[00:07:02] TEACHER: So when a request comes to a particular machine,   {#120}
[00:07:05] TEACHER: it invokes this function and the ID generates.   {#121}
[00:07:08] TEACHER: It's not just 1729, but M1-1729.   {#122}
[00:07:11] TEACHER: And I'm just using some nomenclature.   {#123}
[00:07:13] TEACHER: You can change it however you want.   {#124}
[00:07:15] TEACHER: But the ID are even same.   {#125}
[00:07:17] TEACHER: 1729 and M2-1729.   {#126}
[00:07:20] TEACHER: So here what is happening is we resolve the collision.   {#127}
[00:07:23] TEACHER: Now we see globally unique IDs.   {#128}
[00:07:26] TEACHER: This is M1-1729.   {#129}
[00:07:28] TEACHER: This is M2-1729.   {#130}
[00:07:30] TEACHER: So that is a very common strategy.   {#131}
[00:07:32] TEACHER: Whenever you see a collision, you try to add something that led to that collision in order   {#132}
[00:07:39] TEACHER: to resolve the collision.   {#133}
[00:07:41] TEACHER: It's a very standard practice.   {#134}
[00:07:42] TEACHER: So here we saw IDs are basic or primitive ID generation logic colliding.   {#135}
[00:07:47] TEACHER: it collided because we had two different machines executing at the same time.   {#136}
[00:07:52] TEACHER: So in order to resolve the collision or to handle this conflict,   {#137}
[00:07:55] TEACHER: we added machine ID because machine ID led to that. So our ID generation logic now   {#138}
[00:08:02] TEACHER: changes to machine ID and get epoch millisecond concatenation. Okay, this works fine. But what if   {#139}
[00:08:09] TEACHER: our program has threads? If our program has threads, which means that within that same machine,   {#140}
[00:08:17] TEACHER: be executed, the same function can be executed multiple times within the same millisecond.   {#141}
[00:08:24] TEACHER: Which means if I have two threads, let's say t1, t2 and m1 and t1 and t3.   {#142}
[00:08:30] TEACHER: These are typically integer thread IDs, which operating system assigns to the thread.   {#143}
[00:08:35] TEACHER: I'm just using t1, t2, m1, m2 to simplify the explanation.   {#144}
[00:08:40] TEACHER: So here what would happen is it is very much possible.   {#145}
[00:08:43] TEACHER: it is very much possible that your program has multiple threads running on multiple codes   {#146}
[00:08:48] TEACHER: which would invoke this exact same function within the same millisecond.   {#147}
[00:08:51] TEACHER: So now there is again a chance of collision because two threads executing at the same time   {#148}
[00:08:56] TEACHER: within the same machine would spit out that exact same id m1-1729.   {#149}
[00:09:01] TEACHER: We don't want that.   {#150}
[00:09:02] TEACHER: So what do we do?   {#151}
[00:09:04] TEACHER: We have two approaches.   {#152}
[00:09:05] TEACHER: First approach is like how we added a collision resolution thing   {#153}
[00:09:11] TEACHER: by attaching or by concatenating machine ID.   {#154}
[00:09:14] TEACHER: We do something similar by attaching thread ID.   {#155}
[00:09:18] TEACHER: So what we do is we write our ID generation logic.   {#156}
[00:09:22] TEACHER: That looks something like this.   {#157}
[00:09:23] TEACHER: Concatenate machine ID, thread ID and get up of milliseconds.   {#158}
[00:09:27] TEACHER: So when my ID generation function is now invoked,   {#159}
[00:09:31] TEACHER: it returns m1-t1-1729, m1-t2-1729.   {#160}
[00:09:38] TEACHER: There might be other thread IDs on m2, which is p1 and t3.   {#161}
[00:09:42] TEACHER: So m2-t1-1729 and m2-t3-1-1729.   {#162}
[00:09:46] TEACHER: So these are the actual IDs that will be used for those rows and columns and whatnot.   {#163}
[00:09:53] TEACHER: That is one way to do it.   {#164}
[00:09:55] TEACHER: Other way to do it is by adding a counter that resets every few minutes.   {#165}
[00:10:02] TEACHER: It's a very common practice.   {#166}
[00:10:03] TEACHER: So instead of you always adding a thing that in order to resolve the conflict, you always   {#167}
[00:10:11] TEACHER: adding the thing that led to conflict leads to gigantic, that which leads to basically   {#168}
[00:10:17] TEACHER: gigantic IDs.   {#169}
[00:10:19] TEACHER: What you can instead do, you can go for a static counter.   {#170}
[00:10:22] TEACHER: So what is a static counter?   {#171}
[00:10:25] TEACHER: share a ramp, static counter is globally allocated variable on heap.   {#172}
[00:10:30] TEACHER: Everyone can access that.   {#173}
[00:10:32] TEACHER: So both the threads can access that.   {#174}
[00:10:33] TEACHER: So what you can do is you can atomically increment that counter every time the function is invoked   {#175}
[00:10:39] TEACHER: and that becomes a resolution logic.   {#176}
[00:10:42] TEACHER: So and here what we do is we globally allocate a counter variable, getid function in all   {#177}
[00:10:52] TEACHER: is concatenation of machine id, timestamp and a static counter. This static counter becomes plus   {#178}
[00:10:59] TEACHER: plus every single time the function is invoked something like this and assume this is an atomic   {#179}
[00:11:04] TEACHER: increment. I did not write at locks, works, mutex and all but assume this is an atomic increment   {#180}
[00:11:09] TEACHER: like the increment is thread safe atomic increments. So what we get is every time the function is   {#181}
[00:11:16] TEACHER: in both my counter will become plus plus plus plus plus plus plus plus so which means i would   {#182}
[00:11:22] TEACHER: never see collision within the same machine because it's atomic increment so no matter   {#183}
[00:11:27] TEACHER: how many threads i have increment will always be atomic and it would be fine so no matter which   {#184}
[00:11:34] TEACHER: thread handles it my id would look something like this m1 hyper 1729 hyphen 01 m1 hyphen 172902   {#185}
[00:11:41] TEACHER: M1 172903 as my millisecond moves forward it become M1 happen 1730-03-04 and so on and so forth.   {#186}
[00:11:51] TEACHER: Every few minutes you can reset the counter or every few seconds you can reset the counter.   {#187}
[00:11:56] TEACHER: That's your business logic. But the idea is you would still have something you need because now   {#188}
[00:12:01] TEACHER: with every millisecond this is anyway moving forward you can choose to reset this at any   {#189}
[00:12:06] TEACHER: point in time. That's fine. So long as you don't exit the integer limit.   {#190}
[00:12:10] TEACHER: But you see how we now got two different ways to resolve collisions when it comes to your   {#191}
[00:12:18] TEACHER: program having multiple threads. One is by appending thread id and second is by using a static count.   {#192}
[00:12:25] TEACHER: So static count no matter how many threads you have it would automatically   {#193}
[00:12:28] TEACHER: atomically increment that's what this assumes. But if you look carefully here, given that   {#194}
[00:12:38] TEACHER: the counter is atomically increasing, time is redundant. Time plays no role because every time   {#195}
[00:12:50] TEACHER: your function is getting invoked, you are always doing count plus plus atomically. So no matter   {#196}
---- OWNED SEGMENTS END ----

CTX| [00:12:58] TEACHER: have because the increment is atomic it would always be 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and   {#197}
CTX| [00:13:05] TEACHER: so on and so forth.   {#198}
CTX| [00:13:07] TEACHER: So time is really not playing any part.   {#199}
CTX| [00:13:11] TEACHER: So can we remove that?   {#200}
CTX| [00:13:13] TEACHER: For sure can.   {#201}
CTX| [00:13:15] TEACHER: Because now what would happen is our IDs would become shorter.   {#202}
CTX| [00:13:19] TEACHER: So our another ID generation logic might look something like this.   {#203}
CTX| [00:13:23] TEACHER: We have a global counter variable.   {#204}
CTX| [00:13:25] TEACHER: getid function does a concatenation of machine id and counter that's it so whenever the request   {#205}
CTX| [00:13:32] TEACHER: goes to a particular machine it is handled by one of the threads and because the count plus plus   {#206}
CTX| [00:13:36] TEACHER: is atomic like we will make it atomic you don't like it's not by default atomic you wrap it in   {#207}
CTX| [00:13:42] TEACHER: logs and whatnot or do an atom or use a native atomic library to do that but the idea is assume   {#208}
CTX| [00:13:48] TEACHER: an atomic increment of countless of the variable cow and you get IDs like m101, m102, m103   {#209}
CTX| [00:13:55] TEACHER: and so on and so forth.   {#210}
CTX| [00:13:57] TEACHER: This kind of solves the problem, but what it has a limitation of that when it hits the   {#211}
