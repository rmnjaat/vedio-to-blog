# Lecture 03 - Distributed ID generators: epoch IDs, central ID service, Amazon, Flickr, Snowflake, pagination, Instagram

| | |
|---|---|
| **Source** | lec03.merged.json |
| **Duration** | 02:29:51 |
| **Speakers** | Teacher (TEACHER); Student 1 (STUDENT_1, Rajiv); Student 2 (STUDENT_2, mixed: Jay / Aditi); Student 3 (STUDENT_3, mixed: DK / Pankaj); Student 4 (STUDENT_4); Student 5 (STUDENT_5, Harsh); Student 6 (STUDENT_6, Anupam); Student 7 (STUDENT_7); Student 8 (STUDENT_8, Simranath); STUDENT_9 mixed label - per turn (Alok / Teacher / Student?); Student 10 (STUDENT_10) - names only on turns right after the teacher's name call |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 160 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 146 (CHECK 31, SPEAKER? 5, TERM? 62, UNCLEAR 48) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS, retention 99.57%, additions 0.31%, unapplied log rows 0 - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:02] Agenda - distributed ID generators
2. [00:02:32] ID generation - problem statement
   - [00:04:29] Epoch millisecond as ID
   - [00:05:42] Multiple machines - machine ID + epoch millisecond
   - [00:08:02] Multiple threads - thread ID
3. [00:09:55] Static counter
   - [00:14:41] Static counter lost on reboot - persisting the counter to disk
   - [00:17:06] Disk IO on every ID generation
   - [00:21:51] Flush frequency
4. [00:25:35] Monotonically increasing IDs
   - [00:32:52] Clock sync problem (NTP)
   - [00:33:59] Why clocks go out of sync (quartz crystal)
5. [00:39:26] Central ID generation service
   - [00:44:03] Relaxing the constraints - ask critical questions
   - [00:45:11] Multi-master auto-increment
6. [00:54:17] Break *(admin)*
7. [00:59:55] Amazon - batched ID ranges
   - [01:10:54] Why not UUID
   - [01:16:38] MongoDB IDs
8. [01:17:56] Flickr ticket servers
   - [01:23:40] Upsert in MySQL - insert on duplicate key update vs replace into
   - [01:26:29] Single point of failure - two servers (odd/even)
   - [01:31:39] Questions on the stub column and server restart
9. [01:36:01] Twitter Snowflake
10. [01:44:43] Pagination - limit offset vs ID-based
11. [01:54:04] Snowflake at Discord (custom epoch)
12. [02:03:18] Instagram IDs
   - [02:05:42] Logical shards and physical servers
   - [02:09:26] Instagram IDs with stored procedures (PL/SQL)
   - [02:15:18] Questions on Instagram IDs and sequencers
   - [02:17:34] Wrap-up of ID generation
13. [02:18:14] Questions - monotonic IDs, gossip, queue-based ID ranges
14. [02:25:27] Wrap-up and next week *(admin)*
15. [02:26:36] Q&A

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

<!-- chunk_01 00:00:02-00:12:58 -->

## [00:00:02] Agenda - distributed ID generators

**[00:00:02] Teacher:** The third day second [check: "The third day second" as heard - third week, second day?], it's all about distributed ID generators. Like this is one of the most misunderstood topic out there. Like, hey, auto increment [unclear: "works giving ID wise this"] such a big problem. Most people don't really face, don't really face this unless they hit the scale. But nowadays, because of the mass internet penetration that we have, most companies hit that scale sooner than they think. So which is where distributed ID generators really come into the picture. That's why. So that's one reason why you should know them in depth. Second is there's some beauty of computer science going behind the scenes. You just fall in love on how amazing engineers are in the device solutions [check: "in the device solutions" as heard - devising solutions?] like this. Is surely going to blow your mind.

[00:01:00] Third, when we understand ID generation, we see some really interesting side effects of that, which most people didn't even think about. So we'll touch upon all of that today. And what I'll do in first one, I'll take you through the journey on basics of ID generation. And through that, we build or we formulate some really foundational things that we should know about. And then we take a look at how Amazon does it. Oh, sorry. How Amazon does it. How Flickr does it. How Twitter does it. How Instagram does it. Right. And implement every single thing. Right. Without, and trust me, there are people from past cohorts. Once they implemented, they got much deeper understanding. Theoretically, it's all okay. But implement every single one of these to get the deep understanding, why that works, because there are such beautiful things out there. I want all of you to experience that same joy, which obviously early engineers, that is very different, but at least you get that kick of you knowing those things really in depth. Okay. So we'll do that. So we start from really simple and we touch upon some really interesting concepts. While doing this, I'll show you a very interesting demo, not really a demo, but some really interesting side effects on that. Okay.

## [00:02:32] ID generation - problem statement

[00:02:32] So let's start with this. So ID generation, first of all, IDs, IDs, we all just use so often, like identity of something. We use ID word very often. So it's more about, if I may want to put it in just one line, it is more about giving uniqueness to a particular row, document, object, event, whatnot. Anything that would help you uniquely identify something that is its ID. So what our problem statement is that assign a globally unique ID to anything. So whoever asked for an ID, we assign it to them. Now here what we do is we write a function that spits out something unique every time it is invoked. So that's what we have to do. As simple as when someone wants it, we invoke a function, that function should spit out something unique every time.

[00:03:29] Now here, the function we are writing is not a central service. Don't directly jump into that. It's a function which is part of your business logic and not a central service. A lot of people are directly, the ID generation, I'll start writing a new service. Don't think of that. What we are right now being constrained by, because this is where the foundation, like this is what matters when you are building a foundation, is we are just writing a function whose job is to spit out something new every time it is simple. As simple as that. I'll take you through that evolution so that you understand it really well. So it is part of our application logic and not a central ID generation service. So when I get a request, I myself am generating an ID by invoking a function called locally, function call. I get that ID and I use it. That's what we are doing at the moment. Then we'll build a central ID generation service kind of thing, whatever it's at, right? Okay.

### [00:04:29] Epoch millisecond as ID

[00:04:29] So here the first hint that we get is because we want to write a function that unique every time it is invoked. We know time is unique. We know time always moves forward. So why can't our ID generation function just return my current epoch millisecond? And that could be the, that could be the simplest starting point that we can think about. That because we want to generate ID every time, generate something unique every time a function is invoked. We know time always moves forward. So let's just, whenever someone asks for an ID, let me just generate an epoch millisecond, which is the current timestamp in millisecond. That should work fine, but obviously something would break because if it was the case, then everyone would be using this. So here we are taking epoch millisecond, which means we are okay with the millisecond level granularity, which means this function cannot be invoked twice within the same millisecond. Otherwise you have to go to microsecond and nanosecond level. So now what we do is that's okay. Let's start with that. With that constraint, it's fine.

### [00:05:42] Multiple machines - machine ID + epoch millisecond

[00:05:42] So what if there are multiple machines? Our function for ID generation was as simple as generating epoch millisecond and just returning it. What if there are multiple machines? Assume that a single machine, it is not possible for our use case to invoke the same function twice within the same millisecond. It is very much possible. I will have multiple machines in which that same method is getting executed within the same millisecond. So when that happens, what would happen? Collision. Because both the machine at that very same time, let's say 1729 is the epoch millisecond, and just using a smaller number over here, but imagine it's an epoch millisecond. When this function is getting invoked at the very same millisecond on those two machines, what would happen? There would be a collision. Both would generate the same ID because what we were just returning was 1729, the current epoch millisecond, which means it is not globally unique.

[00:06:43] So when you have multiple machines, one thing that you can do in order to resolve this collision is to concatenate machine ID and epoch millisecond. So which machine generated which ID? That becomes your ID. So this is the function that would be executed on both the machines now. So when a request comes to a particular machine, it invokes this function and the ID generates. It's not just 1729, but M1-1729. And I'm just using some nomenclature. You can change it however you want. But the ID are even same. 1729 and M2-1729. So here what is happening is we resolve the collision. Now we see globally unique IDs. This is M1-1729. This is M2-1729. So that is a very common strategy. Whenever you see a collision, you try to add something that led to that collision in order to resolve the collision. It's a very standard practice. So here we saw IDs are basic or primitive ID generation logic colliding. It collided because we had two different machines executing at the same time. So in order to resolve the collision or to handle this conflict, we added machine ID because machine ID led to that. So our ID generation logic now changes to machine ID and get epoch millisecond concatenation. Okay, this works fine.

### [00:08:02] Multiple threads - thread ID

[~00:08:02] But what if our program has threads? If our program has threads, which means that within that same machine, be executed, the same function can be executed multiple times within the same millisecond. Which means if I have two threads, let's say T1, T2 and M1 and T1 and T3. These are typically integer thread IDs, which operating system assigns to the thread. I'm just using T1, T2, M1, M2 to simplify the explanation. So here what would happen is it is very much possible. It is very much possible that your program has multiple threads running on multiple cores which would invoke this exact same function within the same millisecond. So now there is again a chance of collision because two threads executing at the same time within the same machine would spit out that exact same ID M1-1729. We don't want that.

[00:09:02] So what do we do? We have two approaches. First approach is like how we added a collision resolution thing by attaching or by concatenating machine ID. We do something similar by attaching thread ID. So what we do is we write our ID generation logic. That looks something like this. Concatenate machine ID, thread ID and get epoch milliseconds. So when my ID generation function is now invoked, it returns M1-T1-1729, M1-T2-1729. There might be other thread IDs on M2, which is T1 and T3. So M2-T1-1729 and M2-T3-1-1729. So these are the actual IDs that will be used for those rows and columns and whatnot. That is one way to do it.

## [00:09:55] Static counter

[00:09:55] Other way to do it is by adding a counter that resets every few minutes. It's a very common practice. So instead of you always adding a thing that in order to resolve the conflict, you always adding the thing that led to conflict leads to gigantic, that which leads to basically gigantic IDs. What you can instead do, you can go for a static counter. So what is a static counter? [unclear: "share a ramp"], static counter is globally allocated variable on heap. Everyone can access that. So both the threads can access that. So what you can do is you can atomically increment that counter every time the function is invoked and that becomes a resolution logic.

[00:10:42] So and here what we do is we globally allocate a counter variable, getid function in all is concatenation of machine ID, timestamp and a static counter. This static counter becomes plus plus every single time the function is invoked, something like this, and assume this is an atomic increment. I did not write [unclear: "at locks, works"], mutex and all, but assume this is an atomic increment, like the increment is thread safe, atomic increments. So what we get is every time the function is [?invoked | asr: "in both"], my counter will become plus plus plus plus plus plus plus plus [check: possible ASR loop - "plus" x8], so which means I would never see collision within the same machine because it's atomic increment. So no matter how many threads I have, increment will always be atomic and it would be fine. So no matter which thread handles it, my ID would look something like this: M1 hyphen 1729 hyphen 01, M1 hyphen 172902, M1 172903. As my millisecond moves forward, it become M1 hyphen 1730-03-04 and so on and so forth.

[00:11:51] Every few minutes you can reset the counter or every few seconds you can reset the counter. That's your business logic. But the idea is you would still have something [?unique | asr: "you need"] because now with every millisecond this is anyway moving forward, you can choose to reset this at any point in time. That's fine. So long as you don't [?exceed | asr: "exit"] the integer limit. But you see how we now got two different ways to resolve collisions when it comes to your program having multiple threads. One is by appending thread ID and second is by using a static count. So static count, no matter how many threads you have, it would automatically atomically increment, that's what this assumes. But if you look carefully here, given that the counter is atomically increasing, time is redundant. Time plays no role because every time your function is getting invoked, you are always doing count plus plus atomically. So no matter

<!-- chunk_02 00:12:58-00:24:05 -->

**[00:12:58] Teacher:** ...have, because the increment is atomic, it would always be 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and so on and so forth. So time is really not playing any part. So can we remove that? For sure can. Because now what would happen is our IDs would become shorter. So our another ID generation logic might look something like this. We have a global counter variable. getid function does a concatenation of machine ID and counter, that's it. So whenever the request goes to a particular machine, it is handled by one of the threads, and because the count plus plus is atomic, like, we will make it atomic, you don't, like, it's not by default atomic, you wrap it in locks and whatnot, or do an atom or use a native atomic library to do that. But the idea is, assume an atomic increment of [?count plus plus | asr: "countless"] of the variable [?count | asr: "cow"], and you get IDs like m101, m102, m103 and so on and so forth.

[00:13:57] This kind of solves the problem, but what it has a limitation of, that when it hits the integer limit, that's a 4 billion, or if it's 2 raised to 64, that's a massive number. You might never hit that particular limit, but still it is ending up. You would still write a good ID generation because of this. wanted, you get it. Machine ID concatenated with a static counter, which is atomically increment. This solves the problem. But okay, what next? This is good. So we saw multiple ways of, or multiple common ways to build this ID generation, or to implement this ID generation. Now what's next?

### [00:14:41] Static counter lost on reboot - persisting the counter to disk

[00:14:41] Now here we look at one very interesting factor, which is this static counter. Int counter, this is a globally allocated variable. Now what is happening is you have a static counter. This is what your logic is, ID generation logic. The problem with this is, what if your machine reboots? As soon as your machine reboots, what would happen? This counter would again be reset to zero, because that's what would happen. There is no layer of persistence at all over here. thing. So when my process reboots or when my machine reboots, my counter will again start from zero, and when the request comes in, it would again start generating m101, m102, m103, m104, which means that my ID generation logic is not unique, because when my machine reboots, it starts regenerating the IDs that it did after the previous reboot. So how do you solve it? The root cause of this problem is that the place at which we are storing the counter is actually a volatile memory. So how do you solve it? Very great answer. Alok?

**[00:16:02] Student 9 (Alok):** Back it up with the file locally.

**[00:16:04] Teacher:** Okay. You write it to the file locally, right? Because volatility is the problem. So you start writing it to the file. So it looks something like this. So what we are doing over here is we store the counter to the disk every time. And when my process starts, I load it from the disk, which means my code would look something like this. So here what we have is, our counter is equal to a load function. We basically assume that it loads from the disk. My getid function [unclear: "5 first"] to count plus plus. I save the counter to the disk. I concatenate with machine ID and counter. it is, we started storing the counter on the disk and not in some volatile memory. So here, whenever my program starts, I first load the counter like this. Whenever a function is invoked, I do count++ and immediately save the counter to the disk. Maybe in a text file, I'm just dumping the counter every time, opening the file, writing it there. And my [?business logic | asr: "business project"] remains the same.

### [00:17:06] Disk IO on every ID generation

[00:17:06] But here there is a problem, that in here, what we are doing is, when my function, or when my machine reboots, when my process reboots, I'm doing a disk IO, which is fairly okay. One time at startup of my process or boot up of a machine, it's fine. But every time that my ID function is getting invoked, I am doing a disk IO. That would put, first of all, that would put a lot of pressure on the disk, 100%, because if it is getting invoked at a very high pace, it would lead to so many disk IOs, micro disk IOs happening on the disk. Problem number one. Problem number two is it might reduce the latency that you are looking at, because you are doing disk IOs every time, or you were just serving it from memory. So how do you solve this? We are making massive micro disk IOs. How do you mitigate this problem? Jay?

**[00:18:06] Student 2 (Jay):** How about adding another counter to the ID, and you basically pick this counter up every time you start up the server and then immediately increment it and write it back to a file. So you'll pick up a unique one.

**[00:18:23] Teacher:** But how is the solving problem of frequent disk IOs?

**[00:18:26] Student 2:** You do it once at server startup only and then use that counter as part of [unclear: "SPS"]. a third part of this.

**[00:18:35] Teacher:** You did that already. You loaded it from the disk. But now whenever you are generating this ID, every time you are storing it on the disk. Correct? This is...

**[00:18:45] Student 2:** I mean a third part in the ID. Apart from this counter we are already using.

**[00:18:51] Teacher:** No, but this is... But you are still doing save counter every time, right?

**[00:18:56] Student 2:** No, just once on server startup. So each server startup is represented by a new counter.

**[00:19:07] Teacher:** How will this solve your problem? Oh, okay. So every time a server starts, that's a new counter, and then let your static counter start from zero. Yeah. Let your static counter start from zero and then booting up. Okay, okay. That's a good one. That's a good one. But still, so then you will not be storing this at all. You will be storing. You will auto. So basically you are not changing over here. You are changing over here. So you are not storing anything over here.

**[00:19:34] Student 2:** Yeah, no, that wouldn't be needed.

**[00:19:37] Teacher:** But then what's the downside of this?

**[00:19:45] Student 2:** When you increment at server startup, that will have to be atomic. That's right. That can be made atomic. A longer ID, longer than we have built here. Correct. Longer ID.

**[00:20:01] Teacher:** Right. We'll talk about disadvantages of having long ID, but your approach is really good. That approach is really good. But that long ID might become a problem. Not as big, but your approach is really nice. I loved it. I loved your approach.

**[00:20:17] Student?:** Thanks.

**[00:20:20] Teacher:** I was just thinking of that case, but that would also not be that brilliant approach. I liked it. Every time, because you are now actually tackling this problem head on, that instead of saving it every time, you are just starting a third part, you're adding a third part to this. Really very interesting, very interesting, and this is something I will definitely be adding to this going forward. Thanks, thanks for that. Okay. Harsh, what else can we do to minimize this?

**[00:20:52] Student 5 (Harsh):** I think it is something similar that I was thinking, maybe we can have some bank of IDs. For example, first time I read it is one, just add 1000 to it and store it. So once I reach 2000, then again read it and increase it by 1000. So there are 1000 iterations we can do it in memory.

**[00:21:13] Teacher:** Got it. So what are effectively doing is you are minimizing the number of times you have to write to the disk by writing in a periodic manner. Instead of writing it every time, you are writing it at a certain frequency. Right? This way you are slashing down the number of disk IOs that you have to do. Right? Okay. Let me walk you through on what, and I'll tell you why I'm a little bit stressing on this approach, because this comes in handy at two different places. But I still love the first approach, where every time the machine starts, you start with a third thing. That's a really good one. Really good. Okay.

### [00:21:51] Flush frequency

[00:21:51] Okay. So what we do is, instead of, we, let's say, we, let's say define a flush frequency. Now this flush frequency would be something like this, that instead of writing, instead of saving counter every single time, what we do is we define a flush frequency. Let's say every thousand times, every thousand times we write, like, after generating every thousand IDs, I'll write it to the disk. I'll write my counter to the disk. So we are literally slashing on disk IO by a factor of 1000, which is a massive performance. But what we just have to take care of, that instead of just loading from the last point, I have to just add the flush frequency over here, so that we don't get any collision at up. [check: "collision at up" - words may be missing] So our logic now becomes counter equal to load plus the flush frequency. Let's say every 1000 IDs we are writing: do count plus plus, counter mod equal to 1000 equal to zero, then you do write on the disk. So we are not doing every time we are writing to the disk, but every thousandth time we are writing to the disk.

[00:22:51] Now this way, now just to give you how this would look like, just to explain how this looks like. Let's say hypothetically, my flush frequency is 3.

[00:23:01] So every third value I flush to the disk. What? My counter. So my machine ID is M1. My counter is 1, 2, [unclear: "it's our one"] 2, 3, 4, 5, 6, 7 [unclear: "at night time"]. So M1 happened [check: "M1 happened" - possibly "M1 hyphen"] when it created this, generated this, generated this. When it generated this, your this invoke, 3 mod 3 equal to 0, yes. So I save the counter, so it flushes the counter to the disk. So 0 3 got written on the disk. Then the next iteration, now, rather, next time the function call happened, 4, 5, 6, [unclear: "6 8 also saw"] it wrote it to the disk, right? Then 7, 8, and then the machine crashed. When the machine crashed, the last value that was written was 6. The ID that was generated was already 8. So now when my machine reboots, if I start from 6, if I see that, hey, 6 is written, if I start from this place, I would be generating 7, 8 again, which is wrong, because it was already used by something, right? So the safest value that

<!-- chunk_03 00:24:05-00:35:37 -->

**[00:24:05] Teacher:** The last value that was flushed plus the flush frequency plus one. So nine plus one, 10. This is the safest value that you can start with. So M1 [?hyphen | asr: "happened"] 10, M1 [?hyphen | asr: "happened"] 11, M1 [?hyphen | asr: "happened"] 12. Is what? And then 12th day you do flush again. This way, what happens is what you are trying to do is you are trying to ensure by adding this small, like by leaking or by not utilizing every single integer out there, but might be because here we never used 8 and 9 directly, starting out 10, we lost those two values, but that's so fine, that's okay, right? Given that the correctness of the system matters more than you left you utilizing every single integer out there, right? So always remember, whenever you are trying to do something with this, think of correctness. Think of the safest value that you would want to start with. So key takeaway from these is first, not doing IO every time. So you can add a periodicity factor. Now don't think of a thread and timer and I'll do it. Think of very simple approach, as simple as a mod operation. So n mod this, then you write it. Right. And second is, whenever your machine recovers, quote unquote, you start from the safest value. This becomes the key design decisions or key design constraints when we are deciding a distributed ID generator. Okay. Now, this is okay.

## [00:25:35] Monotonically increasing IDs

[00:25:35] Now let's move to some other constraints. Let's say instead of just having ID, if you look carefully, these IDs have no particular order, like M1 can be literally anything. I have hundreds of thousands of machines. It, like, there is no particular order in, in which we are, we are generating an ID. What if I want to enforce a monotonically increasing constraint to my IDs? So what we want is, no matter how many machines I have in my infra, no matter how many machines on which my IDs are getting generated, where the request goes, the IDs that should be generating, it should be monotonically increasing, globally monotonically increasing IDs. So even if I have 10 machines, the ID, like, first request should always get ID, second request should get ID 2, third request should get ID, let's say 5, next request should get ID 6, no matter which machine it goes to. Now let's say if we want monotonically increasing IDs, I will say, first of all, why someone would need this kind of monotonicity? I'll give you a practical example for that.

[00:26:40] Database. In second week, when we were building airline check-in system, what we did is we saw importance of locking, and we always said, hey, we have two transactions, transaction T1 and transaction T2, right? Then we said that, hey, transaction T1 ran this query and then transaction T2 ran this query. How did we know the transaction T1 came before transaction T2? One and two, this one and two, because they are numbers, they tell you which one came first, which one came second. It helps you in resolving conflicts. For example, when T1 wrote something, T2 wrote something, one of the conflict strategy would be the newer write overrides the older write. Now this 1 and 2, it tells you that 2 is the newer write. So you can actually accept, during the conflict resolution strategy, you can accept the write made by the newer transaction. So monotonically increasing IDs play a very important role in doing conflict resolution, which is where we need this. And that is one of the places, one of the places, not all the places, but one of the places.

[00:27:51] So now what do we do is, here, in order for us to get monotonically increasing IDs. Now, first of all, monotonically increasing IDs are, which increases monotonically, does not mean they are purely sequential. Like 1 2 3 4 5 6 is strictly monotonically increasing IDs, but 1 2 5 7 8 9 32 33 34, that is monotonically increasing, which means that my next ID that is generated is guaranteed to be greater than all the previous IDs that are generated. That is monotonically increasing. Now, if we were to have this as a feature in our thing, what we can do is, our logic that we wrote earlier, where we concatenated machine ID and time, we did machine ID and time. So M1-1729. Given that the time always moves forward, it is always increasing.

[00:28:53] What if we flip the order? What if we flip the order and have concatenation of time and then machine ID? Given that the time always moves forward, if I do it at millisecond level, every millisecond I would have a new value that I'm writing. It is always moving forward. These are the most significant bits of my number. Machine ID can be literally anything. This way what I get, get monotonicity. It is not strict monotonicity, but it's pretty decent monotonicity that I'm getting. Pretty decent. It's not strict. To some extent it would falter, but it's fine. So what we are getting over here is something like this. This is what my ID would look like. So this is my time. This is my machine ID. So 17290001, 17290002. These are machine IDs. You can also change this to counters, perfectly fine. But the idea is, putting time on the leftmost side gives you this natural order to IDs. May not be very, may not be always monotonically increasing, but to a very good extent, it is monotonically increasing.

[00:30:11] And because it is possible that within the same millisecond, let's say these are machine IDs, hypothetically, let's say these are machine IDs. It is very much possible that the first request within the same millisecond went to machine ID two and then the next request went to machine ID one. So in that case, what you get is 17290002 first and then 17290001. But within that millisecond, it would happen. But as soon as millisecond passes by, you get almost monotonically increasing IDs across your system. Few things here and there is okay. So you are not worrying about, like, here you see that it is still stateless. Request and go to any machine, because every machine is just doing the time concatenated with machine ID. Assume machine ID is integer and then it's just bits. What you are getting is, you are almost getting monotonicity. Almost.

[00:31:06] There might be incorrectness in the system. That's fine, without having to maintain a central state of things in order to get those things increasing, but getting pretty decent throughput, pretty decent, excellent throughput at very minimal cost. But here you see how we beautifully put time on the leftmost side of things to get almost monotonically increasing IDs, because as your time moves forward, the number would always be greater, because it is 17,290,001, 17,290,002, 17,300,001. You see, this is always going to be increasing, because every millisecond, this is moving forward. So this is a very key highlight on why time is always on the leftmost side. You would see a ton of ID generators. Time being on the leftmost side of your ID generation logic. Pick any. You would always see time sitting on the leftmost side. This is the reason why. Okay.

[00:32:17] Now, although it's a good solution, but it still does not guarantee monotonicity. One of the reasons that I will talk about was that, that it's not guaranteeing monotonicity, but at least within millisecond, you have fair bit of monotonicity. But there is another thing, another problem that would crop up is here. What we talked about was the part where this, like, the first request went to machine ID 2 and then the next request went to machine ID 1. So my IDs would be 1729002 and then the next ID would be 1729001. So that is wrong.

### [00:32:52] Clock sync problem (NTP)

[00:32:52] But there is a problem even on the time side of things. Right? If even let go the part that it's okay that within a millisecond I might have a little bit of misordering, but at seconds or at time level, it should not be there. So here what would happen is, because our ID generation logic has time component and machine ID component in that. Here, we, up until now, we assume that the time across all of my machines is exactly synchronous, but basically perfectly synchronized, which is not the case. I'll tell you about it. So clocks go here and there. It's very common. If you have worked in SRE team or DevOps team, you know you have a process that is running, which is continuously syncing NTP clocks of your servers. It's very common for your servers to go out of sync. So what you do is, you have a job running, job as in a normal process running, which periodically syncs your machine clock to NTP servers.

### [00:33:59] Why clocks go out of sync (quartz crystal)

[00:33:59] So here what happens is, and first of all, why do clocks go out of sync? That's a very fascinating thing. So the clock that ticks on your machine is a hardware clock. Although we see this digital time, it's actually a hardware clock. There is a quartz crystal vibrating in your machine, in your laptop, on your server, in your CPU.

[00:34:22] It's vibrating. Measured, and that tells you that, hey, one second has passed or one millisecond has passed, because it vibrates at a very particular frequency. Given that, given that it's a physical movement that you are measuring in order to see the time, in order to measure the time, what happens is that, because it's a physical movement, we learned in physics that when you throw energy at a thing, it vibrates faster. So when you are having water, you provide it energy with fire, the water vibrates and it starts boiling. And when you suck the energy out of it, you take the temperature down, the water freezes, it stops moving, it becomes ice. It holds true for every single element in the world. With quartz crystal, what happens is, if in most cases, when your machine, let's say a very high intensity game which requires a lot of CPU power, your CPU heats up. This energy affects the vibration of the quartz crystal. Quartz crystal would start to vibrate faster and your clock would move faster.

<!-- chunk_04 00:35:37-00:48:36 -->

**[00:35:37] Teacher:** If you are putting your machine in an extremely cold environment, the vibration of quartz crystal would be slower, so your time would move slower. Physical phenomena affects the vibration of crystal which slows down or makes your clock, makes your computer clock go faster, which is why there is a need of a periodic job that keeps the clock in sync, and it runs more frequently than you think. It's really fascinating how physics and this thing works together, right? You need to take care of these all sorts of phenomena when it comes to this.

[00:36:10] There is a very famous article, in case you have not read it, Jeff Dean and Sanjay Ghemawat of Google, just Google "friendship that made Google special". Most of you would should know it. In case you don't, just search for this article, "friendship that made Google special" or something like this, in which Sanjay Ghemawat and Jeff Dean were facing a bug, which happened because a bit got flipped because of an explosion or or also because of a solar storm that happened, it flipped a bit in one of the data and they were scratching their heads into understanding that why that even happened. How did this bit got flipped automatically? It was a natural phenomena that caused the bit to flip. You cannot run away from nature. Right? So just Google the "friendship that made Google special", Jeff Dean and Sanjay Ghemawat, brilliant folks. Like, I just love the papers that they wrote. Jeff Dean and Sanjay Ghemawat. Just read about them in case you are hearing the name for the first time.

[00:37:13] So physical phenomena affecting this thing. So even if we assume that our clocks will periodically eventually be synced with NTP, up until then, there is a chance that your clock is out of sync when your ID is getting generated. So hypothetically, let's say I have four machines: machine ID 2, machine ID 4, machine ID 7, machine ID 9, and the time on those machines is 23, 24, 23, 23, it's [?epoch milliseconds | asr: "a pop many seconds"], I'm just using smaller numbers over here. Now here what would happen is, let's say my request first went to machine ID 2, then it went to machine ID 4, then it went to machine ID 7 and then it went to machine ID 9. Fine. Now when I fire get ID function, what we are doing is we are concatenating machine, like, the time and the machine ID, right? So the ID that would be generated on M2 would be 232, then the next ID would be generated would be 244, then 237 and then 239. If you look carefully, this is not monotonically increasing. The first ID that was generated is 232, then 244, then suddenly it's 237 and then 239.

[00:38:29] So you were expecting monotonicity, but you don't have it. So this is a problem where you need monotonicity. Even the clock skewness is what you need to take care of. Somehow, we'll basically take a look at how people do it. But this is actual thing that affects the, in quote unquote, if that is the correctness of a system, it affects the correctness of a system. Okay, so now what we understand by this is ensuring monotonicity across distributed systems is almost impossible. Almost impossible. You might still see some strands here and there. I did not find a theoretical proof of that, but you can very clearly see practically there are so many things that could break things that you cannot guarantee strict monotonicity in a distributed system, where your ID generation logic is distributed.

## [00:39:26] Central ID generation service

[00:39:26] So what do you do? Let's say instead of putting it on independent machines, let's have a central ID generation service. Because there is one machine. So whoever, basically idea is simple. Whoever wants an ID, talks to this machine. This machine generates an ID and sends it out. Don't worry about throughput right now. We'll talk about that. Client wants an ID, there is a central ID server. The idea is that whoever wants the ID makes a network call, ID server generates an ID and sends it back. Whoever wants it makes a call, generates an ID, sends it back.

[00:40:04] Now there is an ID generation service running over here because in a single machine, clock skewness would not affect. I will say why? I'll tell you why. Clock on a machine, assume that you are this machine, this particular machine, and you moving faster. When you sync with the NTP server, you found out, hey, the current [?time | asr: "type"] is not 24 but 23. So your clock does not change to 23. Your clock slows down the counting and then it catches up and then it starts from 24. So instead of the time going back on your machine, it just slows itself down and stretches that one second to become like point three and then it receives. [check: "and then it receives" - unclear ending] So always remember, the clock never goes back in time. Never. This means that on a single machine, you will never experience your clock moving back and forth. It can slow down or you can just pass it up. So it would always move forward no matter what. And that's such an important thing.

[00:41:12] Now, which means that if you have your ID generation logic stick to one server, what, what would happen is that no matter where the request comes in, the clock on this machine is always moving forward, it will always have monotonically increasing IDs. That would work just fine. Just fine. But having this one machine is a single point of failure. So now we need to solve it. So you cannot have one machine, which means you need to have fault tolerance, you add one more machine, or adding a load balancer so that anytime the request comes in, it goes to either one of them. Now, whenever, whether this request goes over here or here, it needs to connect, to talk to other ID server to see what was the last ID that it generated. And then it would increase to plus plus of some buffer and then it would generate a new ID.

[00:42:02] So which means that these two servers need to constantly gossip about the IDs that they generated in order to generate a monotonically increasing ID, because they both have to agree upon that, "This is definitely larger than the other one that we ever generated" problem. So from a very simple ID generation logic, we made our things super complex, and you can very clearly see that this gossip, you will either lose on throughput when you're doing this high throughput continuous gossip, it becomes very messy. So at least clock skewness problem is there. So what we clearly see is that when you want strict monotonicity, there is no way, no way for you to distribute. So you cannot have an ID generation service which is distributed in nature, which also guarantees strict monotonicity at high throughput. Not possible.

[00:43:04] Because you see, every time you think of something that is new problem or a new constant that can't do this. You can't do it. Always, always that will happen. So there is no way, no way for you to distribute this. So how do people go about it? That is where people [unclear: "relax up questions"] because not everyone needs monotonicity. One question that might come to your head is, but MySQL server has monotonic IDs. Single machine. It's not distributed. It's single machine. The ID logic is part of your database engine. It's a single machine. That's why you see ID 1, 2, 3, 4, 5, 6, so on and so forth. If it would have been distributed, multi-master and whatnot, you would never have it. Try putting MySQL server in multi-master mode with an auto-increment ID. See the number of conflicts you get, because each one of them is its own brain. Right?

### [00:44:03] Relaxing the constraints - ask critical questions

[00:44:03] So keep those things in mind, that everything in computer science, everything in software engineering is a trade-off. You have to lose something. You get something, you lose something. Always. And there are so many factors that we look at. So in most cases, whenever you are having a need of ID generation or something similar, always see that, do you really need these constraints? Do you really need what you have been asked for? Try asking critical questions, challenging it, that, hey, can we not relax these constants? What if, what if I don't care about integer rights [check: "integer rights" - "integer IDs" or "integer, right"?], is that okay? What if my IDs are random, like UUID or GUIDs, right? What if my IDs are not mono, they don't follow monotonicity, is that okay? Because in most cases requirement says you need monotonicity, but after asking couple of critical questions [unclear: "that automatically it's in this"] because not everyone thinks it through. So asking these critical questions is extremely important whenever you are designed. Okay.

### [00:45:11] Multi-master auto-increment

[00:45:11] One final thing before we take questions. Why do we need ID generation? Why? Obviously, that should be the first thing that we should answer. But now that we have the context, let me answer it for you. You'd think that, hey, MySQL is there now. MySQL or any database, it has ID, MongoDB has ID. Why are we, and ID generation, because imagine you are having a sharded database. Multi-master mode. Multi-master, which means you have two master, requests can go to anyone. When requests can go to anyone, let's take an example of MySQL server itself. So let's say I have a MySQL server, two MySQL servers. Both are running in master mode, which means write can go to anywhere.

[00:46:02] A table, you have an auto increment ID, you have an ID column which is auto increment, you have either ID column which is auto increment. Now if you do not have an ID generation logic of your own, you would configure typically this auto incrementing. Now these two servers do not communicate or do not talk to each other, correct? So when this request goes over here, the auto increment ID kicks in. When auto increment ID kicks in, it would start, let's say you have a post there, when you start 4, here also 1, 2, 3, 4, because they don't know about each other. Writes can go anywhere. If you go for auto increment, this is where the problem would start to [?creep in | asr: "grip it"]. So which is why now we understand why we need concatenate machine ID and this and that. So that is a unique identification.

[00:46:54] So now the ID is that you generate, you cannot just rely on database IDs, but you need to have your own custom ID logic where you cannot do this, but just have something that would help you uniquely identify those entries. So whenever you have your databases operating in multi-master mode, you would typically see a custom ID generation logic in place, and that's where you need distributed ID generators. We'll talk about very practical use cases of it in order to understand how they are leveraged, like all four examples, will go in depth and understand. Okay, any questions? We'll take till 10 and then we [unclear: "go on update"]. Yeah, Aditi.

> **Student Question [00:47:34] - Student 2 (Aditi):** Yeah, so I was just wondering that the place where we opted for a shared service to generate the IDs, instead of a shared service, if we just have a common database and we take [?locks | asr: "logs"] on it, would that work?

**[00:47:48] Teacher (answer):** That's exactly shared service. Your database is a shared service there, correct?

**[00:47:52] Student 2 (Aditi):** Yeah, but if we take [?locks | asr: "logs"] on it, wouldn't it be unique then?

**[00:47:57] Teacher (answer):** No, it will be unique, but that is still a single machine, right? That is, that database itself becomes a service, right?

**[00:48:02] Student 2 (Aditi):** Yeah. Right. Okay. Okay. Yeah.

**[00:48:05] Teacher:** That's the same thing. That's one and the same thing. Right. Rajiv.

> **Student Question [00:48:11] - Student 1 (Rajiv):** Arpit, the places where we want to resolve conflicts based on IDs now, since we tell that, I mean, we are not sure whether the IDs on distributed system would be unique. So how do we tackle that problem?

**[00:48:22] Teacher (answer):** We'll talk about that. There are still, like, we are still only basically 30 percent done, and we'll talk about that, right? How do we resolve, what happens, how should we approach that, we'll talk about

<!-- chunk_05 00:48:36-00:59:55 -->

> **Student Question [00:48:36] - Student 3 (DK):** Yeah, so when you were discussing the last point, right, about auto incrementing by one, two, three, four in both the servers, so can't be like auto increment by like the number of servers we have, basically? If you have two, then zero, two, four, and one will disparate, like one, three, five.

**[~00:48:53] Teacher (answer):** Yeah, we can do that, but there is a slight disadvantage to that, we'll discuss in the second time. [unclear: "i have it covered f5 right"] Okay DK, yeah. [check: speaker boundary - "time i have it covered f5 right okay dk yeah" is labelled Student 3; "okay dk" sounds like the teacher]

> **Student Question [~00:48:59] - Student 3 (DK):** So instead of static counter, why can't we use a random ID generator here and append it to the

**[~00:49:12] Teacher (answer):** We'll talk about it, random. But great, great that you folks are already thinking about this. I am so loving this much. You folks are continuously thinking, but which is where the static counter would pick, because we wanted monotonicity. That's why we went for that. Random ID does not give you monotonicity. That's why I said that if you need monotonicity, like, you may not always need monotonicity. You may think you need monotonicity, but in reality, you can relax those constraints and say, hey, what if I don't have monotonicity? Then you can go for a random ID like UUID. Right, right.

> **Student Question [00:49:45] - Student 3 (DK):** So that is my second question. Why can't you use a UUID instead of all this complexity?

**[00:49:50] Teacher (answer):** We can, that's what I said. Relax the constraint. If it's okay for you to relax the constraint, then use UUID. Don't rely on strict monotonicity, because not everyone needs that.

**[00:49:59] Student?:** Got it. But in that case, I think we will not be able to, you know, give that ordering, if you are using UUID. Got it.

**[00:50:05] Teacher:** You get some, you lose some. Got it. Got it. [check: speaker - "Got it. Got it." may be Student 3] But we'll talk about UUID. We'll talk about MongoDB IDs, UUIDs and whatnot. We'll see where you can use it, disadvantages of it, how monotonicity would help you, all of that, like, real practical situations where ID generation, you really need need kind of thing. We'll go in there after that. I've got it. Yeah. [check: speaker - "I've got it." may be a student]

> **Student Question [00:50:30] - Student 2:** So basically my question is about the central ID generation. So what I was thinking is like a center server, which generates ID, you told us about the distributed, distributed thing also, just a second.

**[00:50:49] Student 3:** [check: speaker - may be Student 2 continuing after "just a second"] You also told us about the distributed ID server also. So what we can basically do is, basically we can have like a particular ID, like ID for each server that we have, like, in the distributed system, in the ID servers, and just like they can have their own logic for like creating, creating, and they append, they just append their own ID server to that logic which is generating IDs.

**[00:51:25] Teacher (answer):** But you are losing on monotonicity. That's fine. That's fine. That's okay. There is nothing wrong in it. That's what I'm saying. There is no one right way to do it. For some, it works in one way. For some, it works for other ways. But your approach is also correct. You get some, you lose some. I'm just discussing on the core idea behind ID generation. And now when we go into the specific examples, you'll see that, hey, if you're getting advantages on a certain part, you'd be losing on certain part, but at the end, it's a trade-off that you would have to make, what you want and what you can give up, by maximizing the throughput and performance and efficiency of your system. Sure.

> **Student Question [00:52:12] - Student 4:** I wanted to propose one more solution for the part where we wanted to reduce the disk IOs. So, can we do something like, when the server restarts, we read from the database, get the last counter saved in the database, and then start incrementing ahead? So we wouldn't need those periodical saves as well.

**[00:52:35] Student?:** So then you are writing to database every time? [check: speaker - teacher-style challenge]

**[00:52:39] Student 4:** No, so we'll have some last row which was saved to database.

**[00:52:44] Teacher:** That's what I'm saying. This is not where we are using it and storing it in database.

**[00:52:47] Student 4:** No, no, no. Not the IDs. Let's say we are saving messages to database. Now that message ID, certain row has a message ID which was last saved to the database.

**[~00:52:58] Teacher (answer):** That's exactly what this load is actually doing. This load is actually doing that itself. Writing it to the database, one and the same thing. You are starting from that particular point. Correct. But then how are you, but here you are assuming that you are writing this, this, whatever you're doing using this get ID for, you are writing it back to database. That row is getting inserted. I'm not even assuming that. Got it. You are assuming that an entry is getting created in the database for every single thing. And then you are picking the max row and then starting from that.

[00:53:35] I'm not even assuming that you're using this, like, in this approach, I'm not even assuming that you are writing back to the database, because that is anyway expensive. Right. I'm just focusing on this ID generation logic, but then what you're proposing, max row ID, and then you start from the, that's exactly what this load function is all about. Here I'm [?talking | asr: "tracking"] about loading from the disk, but with this, you're assuming that when you get an ID, then you are doing something and then you're storing things into database. And then that's an expensive call that you're making. I'm not even assuming that you're [unclear: "student"] back to the database. You're just attaching something in this, basically pushing it forward. Let's say request ID kind of thing. Right? Yeah. Okay. Yeah.

## [00:54:17] Break *(admin)*

**[00:54:17] Teacher:** *(admin)* Let's take a quick break for five minutes. Once we come back, what we'll talk about is, we'll talk about how Amazon does it using central ID generation service and then other use cases. I'll show you a very nice demo of why people, why people go for a certain way and not the other way, and how to make those particular trade-off decisions. So we'll take a quick break for five minutes. We'll [unclear: "sing back"] at 10. And we'll talk about Amazon, Flickr, Twitter, Instagram, and pagination. A very interesting side effect of having a good ID generation system. We'll talk about it. See you folks in five minutes.

[break ~00:54:56-00:59:55]

**[00:58:50] Teacher:** *(admin)* Thank you. [check: possibly hallucinated in silence]

<!-- chunk_06 00:59:55-01:11:11 -->

## [00:59:55] Amazon - batched ID ranges

**[00:59:55] Teacher:** Let's start with the second half. So now what we'll talk about is, we'll talk about how Amazon does it. FYI, I know this because the team that did it sat right next to me, so I used to attend a bunch of tech talks there. But I had a bunch of questions to them and kept on asking [unclear: "it clear"] how do folks do that, and they were kind enough to explain it in a in a public tech talk. So okay.

[01:00:14] So what Amazon does is, for every order that you place is, they assign a global ID to that order, and that is unique. Given the high throughputness of the system, and plus not just this, that they provide ID to a lot of other internal services. One of them happens to be order, which we all use on a day-to-day basis. So that had to be unique. So what they had is they, you leverage batching. Batching is one of the most [check: words possibly lost mid-sentence] performance out of any system, FYI.

[01:00:53] So what they do is they have something like this. They have a bunch of API servers. You can literally write this thing in 150 lines of code, not even exaggerated. It's that simple to write. Scaling, you might just have to handle a few other cases here and there, but it's not difficult for you to write this particular service. Hardly 150 lines of code, not even kidding about anything else. Python, if you write 150 lines, where you can write this entire service. So recommending you to write it, FYI. Okay.

[01:01:26] So APIs, they use a basic API server exposing your ID generation endpoints, putting behind a load balancer, classic thing, and have a database. Have a database. Now this database is a classic relational database. No fancy non-relational database. I don't like to necessarily complicate things. Normal relational database would work over here. So what we do is, similar to how we did not write to the disk every time we generated an ID, we did it in batches. Once every thousand ID generated things. Similarly, we do things over here that instead of calling your remote service every time you need an ID, you get a batch of IDs in one shot. That's the core idea.

[01:02:13] You would have seen a ton of videos, a few videos on YouTube about this, but let me go into implementation details of it. Given that we covered airline check-in system, this becomes a piece of cake. So now what would happen is, let's say I have two services, orders and payments. When order service wants IDs. So these are the servers that are running the order service. These are servers that are running the payment service. They don't care about monotonicity, FYI. They don't care about monotonicity. They need uniqueness, as simple as that.

[01:02:49] So now what you do is, when order service wants an ID, any server of that makes a call to this API, to this ID generation service and says, "Hey, I just booted up. Can you give me 500 IDs?" So it just requests for 500 IDs. The request comes to this API server. API server fires a SQL query on this [?table | asr: "team"]. SQL query that, "Hey, I need 500." So it wrote 500 over here. So 0 to 500. So the range is sent to this server. So 0 to 500 range. You don't have to send individual IDs. No, start and end. It's just integers, right? So start and end, just send it at this range belongs to you. And you update it in this database.

[01:03:37] Now you can very quickly start thinking, "Oh, exclusive." You would do it for update, like select start from this for update, do it in a transaction, so that it does not, like, multiple requests for a particular service does not affect. All of that comes together. So you would atomically update it in a transaction of the final value that is handed, already handed over.

[01:04:02] So let's say server one came up. It said, "I don't have any ID to work with. So I'll go to this and get 500 IDs." To this server, updates this to 500 and responds back with this range, not independent IDs, no needed. Why to send so much of data over network? Just start and end, problem solved. Then let's say server 2 came up and said, "Hey, give me another 500, I am new one, give me 500 more IDs." So it would make a call, call would go over here, it would go over here, it would say 500 plus plus, plus plus equal to 500, it get 1000. So it sends 500 to 1000 in response over here. So now server two has this range. Server one has range from zero to 500. This is from 500 to 1000.

[01:04:46] Now, order service, when they start getting the request from external world about orders, when the request comes to this order services web server, they already have in memory this range. Now, when they would want to generate, they would have their own databases, orders database or something. They can start putting data into orders database, not really having to worry about anything. The idea being that because they already have the range of IDs in memory, they can start pulling that out. And that becomes the globally unique IDs for that particular product. And they can prefix it whatever they would want to do, in case they follow those conventions.

[01:05:23] But the idea is that this way, this central ID generation service just decouples the system. Now you can have any number of service, order service can have any number of databases without having any problem, because ID generation service is separate and orders database separate. So I can shard order database and scale it horizontally without having any problem, not needing and any, every one of those database can start accepting the writes. This way what happens is that your server does not have to make call every time to this ID generation service to get a set of IDs. I use 500 as a small example. In reality it is 10,000, 50,000, 100,000, and depending on the throughput of the service, right? Okay.

[01:06:01] Disadvantage of this is, in case your server got this range and then its server crashed, this range is gone. So putting this range, keeping this range too small means you are making too frequent network calls to get the set of IDs. If it is too large and if your server crashes, you are losing that entire range. So it's up to you, your service, your throughput, in order to fine tune how many service at max will you get it in a batch. It's up to you. You make that call, you get it.

[01:06:32] Similarly, you had one entry for orders. Similarly, you would have one entry for payment service. So when your payment service handles the request, it would not have to talk to the central ID generation service every time. Instead, your server can load it once, or once it is about to be exhausted, it would load it and start using it whenever it wants to do that, whenever it wants to process the payment. Once any of this server sees that my IDs are getting exhausted, let's say it got 500, 490 are already exhausted, what it would do, it would make call and get another 500. It might get some, let's say, 3000 to 3500. So now it would have those [?ranges | asr: "rates"], it would start using from that particular range that it has. So we are still not guaranteeing monotonicity across servers, but you are handing them those IDs in batches.

[01:07:22] This is how Amazon does it. Really simple, very simple to build. You can very clearly see how we can do this in transaction. Airline check-in system, Ctrl-C, Ctrl-V over here. Read, in transaction, update, atomically do plus equal to whatever range was, or rather, however ID was requested. You get the old value, you get the new value, you send it as a range over here, and server starts using those IDs over here. So here, the single source of truth, because this is single server, it doesn't have to gossip with anyone. You can very easily scale the system and just, it's just one update. You don't even have to read all of it. Just one minuscule tiny update that you're making in a database every time someone wants this ID. Right? Okay. This is how Amazon does it. Any questions?

**[01:08:14] Teacher:** Rajiv?

> **Student Question [01:08:16] - Student 1 (Rajiv):** I was wondering why it was in this architecture, a database not used for server

**[01:08:25] Student 1:** Hello, I'm audible now?

**[01:08:32] Student?:** Yeah, I have a question like

**[~01:08:35] Teacher:** Oh wait, wait, wait, sorry, it must be problem with my mic. Wait, wait. [check: speaker - whose mic problem, teacher or Rajiv?]

**[01:08:48] Teacher:** Yeah, Rajiv, go on.

**[01:08:50] Student 1:** Audible, Arpit, now? No, no, no, yes, yes. Arpit, I was wondering why was that a database not used to keep track of information, how much out of range a server has used, and then when it comes up, it uses that information to start consuming from there.

**[01:09:05] Teacher (answer):** Why would you want to do that?

**[01:09:07] Student 1:** I mean, I know that the range is appropriate enough, those IDs would get wasted. I mean, 100 IDs were used, 5, 4 out of 500, 400 got wasted with this thing. Let's say we go for 10,000 now for the same thing. So 9,900 IDs got lost. I mean, there's no way to again go back and use them.

**[01:09:28] Teacher (answer):** Imagine the overhead that you would have to keep in, in order to keep track of every single one of them. That's a massive overhead. Why?

**[01:09:35] Student 10:** Okay.

**[01:09:36] Teacher:** Imagine big integer 2-264 [check: "2-264" - likely 2^64]. Will you ever exhaust that number? If that Amazon is 500 trillion dollar company.

**[01:09:48] Student 1:** It's okay, it's okay, [unclear: "boys"] under practical use, usage of it, then.

**[~01:09:52] Teacher:** Yeah, obviously, like, think about practicality at every step. Don't just think, "Oh, I have to use every single, every single ID that is out there." No one cares about it. It's just few range of numbers, because we tend to underestimate the numbers. For example, 1 million to 1 billion, if I talk about it, we just use 1 million like it's nothing. 1 million is a huge number. 1 billion is huge number. The difference between a million and a billion is almost equal to a billion, and that's huge. Right. And we just use it like this, 1 million, 4 billion, 5 billion. It's massive, massive, massive numbers. And for a [?four-byte | asr: "four by"] integer, 4 billion, 4 billion orders. Imagine 4 billion orders of Amazon. [unclear: "sound right"] if you exhaust that, making 64 bits, make it [unclear: "8 by 20 meters 2x to 64"]. Not very much, it's big enough range for you to not worry about it. Okay, Mohit?

### [01:10:54] Why not UUID

> **Student Question [~01:10:54] - Student?:** Yeah, like if monotonicity was not a requirement, then why not just go ahead with a UUID kind of approach?

**[~01:11:01] Teacher (answer):** Let's talk about it. Let's talk about it, like, why not UUID. So if UUID already exists for it, why people are not [check: possible ASR duplicate "let's talk about it"]

<!-- chunk_07 01:11:11-01:21:59 -->

**[01:11:11] Teacher:** companies at scale don't prefer it. First of all, for folks who don't know what UUID is, UUIDs are 128 bit integers. Integers as it, 128 bit strings, which can be represented as gigantic integers. They are extremely inefficient at scale. [?Arre | asr: "Array"], how my company is using UUID, are we inefficient at scale? Yes, you are. [check: teacher voicing a hypothetical student question, or a real student?] Okay, let me break up. So, in the second week pre-reads, I shared a video on how indexes make database read faster. In that we saw that indexes are also just tables with indexed values and the IDs of the rows that it points to. For example, post table has user ID and post ID and post title and whatnot. If you are creating an index on user ID, it is effectively a new B+ tree or a new table which is created in which just two columns are there. Just to visualize in which you have first column as post user ID, second value as post ID. It's internally managed by database FYI.

[01:12:18] So what happens over here is because in index for a dense index at every single row of your database or of your index, they are also storing the row ID. big, it would make your indexes bulky. For example, 128 bit integers is equal to 16 bytes. Right. Now imagine if your indexes were set, if your index took one GB, if your ID was just a four byte integer, but now you are changing it to UUID, which is 16 byte integer. So now you just bloated your index by a factor of four. So your index, which was one GB in size is now suddenly four GB in size. So always remember your database is as fast as you get the max performance out of your database. It should be able to fit all the indexes in RAM. If it is not able to fit all the indexes in RAM, no matter how many optimizations you do, your database will never gain speed. Never.

[01:13:18] Because whenever your SQL query executes and not just [unclear: "Rupert SQL"], any database in the world, wherever indexes are. Whenever you send any query, the first set of things that it does is does this basic query plan, query execution plan it creates. While doing that, all the operation it does on indexes because indexes are really tiny. Really tiny indexes. When it fits in RAM, let's say you're doing joins of two tables on the indexed columns. It can just do it in memory. It doesn't have to read from the disk anytime. Once it knows the result, then it goes to the disk and reads the entire row. So that's the last step. So if your indexes are in RAM, entire query execution happens in RAM. Just the things that you need from the row from the disk is the detailed row that was setting in the result. So this way your execution becomes lightning fast when your indexes can fit in RAM.

[01:14:14] So when I am ever optimizing a database ever, when someone comes to me and says, with my database is slow. I have what to do. The first thing I do is check their index sizes. That's it. When most cases index sizes are the problem. Random index is created on the database and this and that I see the amount of spills that happens on the disk simple because if your query execution. For in order for you to even read your indexes, it has to go to the disk to read it, that would be very slow. So that's why it does not mean that your database keeps your indexes in RAM. That is the main source, but it loads it in RAM during boot up or whenever you are requesting it to, when you're [?firing | asr: "filing"] a particular query and it keeps in RAM. So the RAM of your database server should be equal to, or should be more than what your total index size is. Then you get a max out of your database. Otherwise you cannot. Otherwise your database query execution would be pathetically slow.

[01:15:12] Now, you're just over-exaggerating. I'll tell you other designs where because of this, people have not used UUIDs. not used to UUIDs. Okay. So UUIDs, they're gigantic integers, 16 bytes, 4X larger. That's huge. So 1 GB index becomes 4 GB index now. So they do not index well and they bloat up the index. That's right. But they're good for security because you cannot predict what's next in terms of UUID. They seem very random. Because you cannot predict the next one, so it's hard for anyone to scrape out the entire website. If you're building Facebook and you know that you are exposing the database IDs, 1, 2, 3, 4, 5, 6, people can just fire REST requests and start from for I equal to zero, I is less than 1 billion I plus plus and start scraping the entire website. So because UUIDs are very random, they're good for security because it's hard for anyone to predict and penetrate or just predict other IDs. In most cases they would get four of them. [check: "get four of them" - go for them?] So which is why people don't use UUIDs.

[01:16:20] scale. It does not mean you should not use it. It works in some cases. It does not work in other cases. In some cases where you're just scrapping it out, you know that your application is small enough. You would never hit that table. You would never hit that scale. The [?UUID | asr: "UI"] is just fine. Don't unnecessarily go for the best solution out there. See what works for you the best.

### [01:16:38] MongoDB IDs

[01:16:38] MongoDB is just happy with 96 bits [?long | asr: "log"]. So MongoDB IDs are 12 byte integers. where look carefully, first four bytes is epoch time, always comes first, right? Then five bytes of random and three bytes of counter, counter [unclear: "for each chart"] that it has, right? This is 12 bytes is what they are favoring right now. They didn't go for 16 for UUID. They, what's stopping them from going for UUIDs? Nothing. To reduce by four bytes they went for sure, right? MySQL auto increment IDs is four byte integer, you're very happy. That's very tiny index, right? Four bytes, eight bytes is still doable beyond eight bytes. You should worry about the performance at scale, at scale. Okay. So this is what MongoDB does. [unclear: "New to see"] a lot of ID generation, sitting things on the left, like having time on the left side and trying to keep the ID smaller, which is why in the first half of when you're brainstorming, ID is becoming longer is a problem because they do not index well. Okay. to help you understand this entire thing better. Every single company, every single quote-unquote case study we look at, every single one of the further case studies mentioned that they didn't go for UUIDs because they do not index well. Because this is the harsh reality.

## [01:17:56] Flickr ticket servers

[01:17:56] So let's take a look at what Flickr did. So Flickr is pre-Instagram. Flickr was Instagram of 2010s to 2010s. A lot of things got posted there. then obviously Instagram took over a lot of stuff. So Flickr needed its own ID generation. But why? Because database was sharded, which is what I always say. Because your database is sharded, operating in multi-master mode, which means that writes can be going to anywhere, they need a central ID generation thing to maintain the uniqueness. To guarantee uniqueness, they need a central ID generation service because they cannot just use auto increment everywhere because that would result to conflict. Because of which they needed a central ID generation service. Now you know where you did it. Flickr did it because of this exact same reason. And in their blog, they mentioned why not UUIDs? Because they index badly.

[01:18:51] Every single one is mentioning UUIDs index badly because 16 bytes is a huge thing. Huge thing because it just [?4Xes | asr: "forexes"] your index. Almost rough estimate. Don't quote me on that because your integer was 4 bytes. additional things that you are taking up in that [?4X | asr: "forex"] is a wrong calculation, actually depends on the value, but you get that there, right? Okay, so this is what it's written in their blog, their official blog: if you cannot fit indexes in memory you cannot make your database [?fast | asr: "pass"], and it's true. It's true. Anytime a [?senior | asr: "serial"] engineer, technical architect, [unclear: "stop in your"] principal engineer ever optimizes the database, the first thing he or she looks at is the index size. Always remember this. Because if your index is spilled on disk, your database would always be slow. Always be slow. And this is one of the ways to which you can actually provision the database. If someone asks you, not during interviews, interviews are crappy. In your real world, if someone asks you, Hey, what should be the size of this database for it to be performed? The bare minimum [?size | asr: "side"] should be, should be the summation of sizes of all the indexes that it holds. Simple. Bare minimum. That's the bare minimum that it needs to be. Beyond that, anything is good, but that's a bare minimum that you should have. Right. Always keep these things in mind.

[01:20:09] That's why database fundamentals. So, so, so important because that's the, as I always say, database is the most brutal component of the most essential, but most brutal component of an infrastructure because scaling API servers is easy. They are mostly stateless. Every other thing is stateless. Database is the one where everything is getting stored. Everything is getting [?queried | asr: "varied"]. entire load is handled by database. So understand your database, whichever database you are using really well.

[01:20:38] So how did Flickr did it? So Flickr built a central ticket server, basically ID generation service. And they built it on top of MySQL. So what they do is whoever wants to get an ID, they make a query to MySQL and they get an ID. Don't think of performance. It's their decision. We can't say much about it. But understand the beauty of this design. That's what matters. As an engineer, focus on the beauty of design rather than pointing out the faults. It's okay to point out the faults, but pick the good parts of it. Because it was their decision. We can't interfere. It's like your neighbors are fighting. You know that both of them are wrong, but you should not say anything to them. It's their life. Whatever they want to do it, let them do it. But pick the best parts of it.

[01:21:25] So what they did is they created a table called tickets. In this table, they added a column called id, big integer, unsigned, not null and auto increment. Right? You clearly see big integer 2 raise to 64. They added a column called stub, will come to this what stub is all about. They have made id the primary key, unique key to stub. The idea is that if MySQL already gives me auto increment ids, why can't MySQL be my id generation service?

<!-- chunk_08 01:21:59-01:33:59 -->

**[01:21:59] Teacher:** Sometime back, right, someone asked that, but I think Shriya was that, that asked that part, right? Why can't we just use my existing ID generation, I can't use my database as my ID generation service? That's exactly what they are doing. They are using database itself as ID. So it's a separate database. Photos are being stored in other sharded database, your ID generation itself is a separate database in which you are leveraging the auto-incrementedness of the database as your ID generation.

[01:22:26] So what happens if, let's say, you want to naively use a database as that, you know, database gives you auto increment. Whenever someone needs an ID, it talks to this database and you want ID from that. Basically, what would you do? You have this column, ID, auto increment ID. You would delete this and add a new row. When you add a new row, what would you get? It would be the next ID. Then when you need one, you delete one and you add one, it would get the next ID.

[01:22:53] Right, but for you to add one, you can just cannot insert a row with nothing, you need to pass some values to them. So you had another column called stub. It's a normal column, name seems fancy, just a normal dummy column, some dummy value, nothing special about it, right? But what we are effectively doing is we are just inserting this row, we are deleting and reinserting, deleting and reinserting, deleting and reinserting. This way, whenever you're inserting into this table without providing the ID, increment the ID and would use that as a default value while inserting, and then the next one, and then the next one, and then the next. Classic auto increment ID use case, right? So either we delete or increment, delete and insert in one transaction, or we can use upsert, because delete plus insert is equal to upsert, right?

### [01:23:40] Upsert in MySQL - insert on duplicate key update vs replace into

[01:23:40] So because they were using MySQL, I'm talking a bit about MySQL here, but MySQL, because they're using MySQL, MySQL provides two ways to do it, is insert on duplicate key update. So it's very simple. What it does is it tries to insert whatever you provided over here, insert into this, this, this values, this, this, this, it tries to insert that. But if it fails due to unique key constraint, then it triggers the update that you pass it. That is classic upsert. So you're trying to insert. So how, what is upsert? You're trying to insert something. If it exists, then update. If it does not exist, then insert. This is an upsert state for MySQL.

[01:24:28] So there are two ways to do upsert. First is this. The second one is replaceInto. Similar to how we have insertInto, there is replaceInto. We saw this in key-value store on relational database. This replaceInto. So replaceInto does upsert, but what replaceInto does internally, it actually deletes and inserts the new row. So you can very clearly see it is slower. It is basically 32 times slower than on duplicate key update. So you can use either replace into or insert, but replace into is 32 times slower than this. I personally benchmarked this. That's why I am quoting this number, 32x slower. I personally benchmarked it on a MySQL server to see the performance difference between the two. So it is 32 times slower over here. So pick one. Anyway, what matters is doing upsert.

[01:25:17] So what you are actually doing, like this, whenever, whenever a server, a server wants an ID so they can insert a photo in photos database, what it does is it fires a SQL query on the central ID service, the tickets, something like this: insert into tickets stub values a, because you have to pass some value, so you use stub a, a random value, nothing, no, no, nothing matters that you put any value there, but it is the constant. Well, insert into ticket stub a on duplicate key update ID equal to ID plus one. Simple. [?This way | asr: "this day"], what happens is it would try to insert this a, but it would see [unclear: "key array"] but this already exists, so on duplicate key update. So it would update 74 to 75 and would return that, right? Then next time the query fires 76, 77, 78 and so on and so forth. So you get IDs like this. You are leveraging MySQL transaction, MySQL atomicity in order to get the IDs that you want. So this is what Flickr does as part of like implementation logic.

### [01:26:29] Single point of failure - two servers (odd/even)

[01:26:29] But now what you see is like something like this. So these are your photo service servers. This would make it clear. This is your ID generation server, MySQL, that is different, and photos database is different, which is sharded. So what they're doing is whenever there is a request to post a photo, request comes to this API server, API server fires the request to this MySQL to get the ID. You get the ID, then you store it in photos. Right. This is what is happening. But if you look carefully, this is a single point of failure, because there is one server. If this server goes down, then gone. Right.

[01:27:02] Now to solve it, you put two servers. But this is very similar to that problem now. Gossip, monotonicity and whatnot. Here we don't care about monotonicity. So what we do, we put both databases behind a load balancer and make one, someone also recommended this approach. This is exactly what we are doing. So what we do is we have two databases. Now, even if one of the databases [?goes down | asr: "goes on"], other databases can handle the load. But how do you ensure uniqueness? [unclear: "tests."] How do you ensure that they don't conflict? What we do is, let's say I have two databases. I'll have, instead of doing increment plus plus, I do increment plus equal to two. Let's say one database generates odd IDs, other database generates even IDs.

[01:27:43] So how you can configure this is auto increment underscore increment. These are actual configuration that you can provide in your MySQL server. Auto increment increment is set to 2 and auto increment offset is set to 1. So increment increment, this means by how much you would want to increment every time. And increment offset is what's the starting point of it. So this is what you would configure. And now the load balancer that you put over here is configured in round robin port [check: "round robin port" - port/fashion?].

[01:28:17] So first request goes over here. It generates ID 1. Second request goes to other server. Third request comes to first server. Auto increment plus equal to 2, 1 plus 2 is 3, so you get ID 3. Next request goes over your 2, plus auto increment increment is 2, so 4, 5, 6, 7, 8. Because you are doing it in round, you will always see [unclear: "positive request 2 year, 2nd year, 3rd year 4th year, 5th year, 6th year, 7th year, 8th year"]. You almost get [?monotonicity | asr: "more authenticity"]. You have solved problem of single point of failure. Now you have 2 servers. If one of the server goes down, fine for you, because your ID generation is still continuing to work without any hiccups.

[01:29:01] But what happens when it goes down? What do you do? If one server goes down, let's say my odd server went down due to some reason. Now all of my requests will go to even server. So the IDs that would spit out would be 2, 4, 6, 8, 10, 12, etc. Now assume that after 202 ID was generated, my server, my odd server came back up. Now when my odd server came back up, either it can start from the point where it left up, because MySQL is a persistent source. It's not storing in memory. So let's say generated ID till five, it would generate seven, 204, nine, 206, 11, 208. Right? Here you see a huge discrepancy in IDs. It's not that it's a constraint that you are playing with. It just does not look aesthetically pleasing. Much more for aesthetics rather than correctness. You are still getting unique ID, but there seems to be very massive parity between.

[01:30:01] So it's optional to just reset the one that you just spun up to the ID. Let's say this generated ID to 202. You will add some buffer, let's say 240, and you set here 241 and 242. And then it resumes from that. 242, 243, 244, 245, 246 and so on and so forth. It's just for aesthetics, nothing about correctness, nothing about strict monotonicity. Because we're still not guarantee strict monotonicity. But you still have that as like nearly similar. So it's good. It's a good byproduct to have. So this is how Flickr does it. It's a really simple approach that we right now looked at. It's pretty simple, but it's pretty brilliant in its own sense.

[01:30:49] [unclear: "Ordin event and results back up."] That's one thing. You would say, who would do this? Who would do this configuring? Who would find this max buffer and then start page? So we are starting with the safest value, right? Who would do this? Obviously, when a server goes down, SRE engineer, DevOps engineer, you know, they would fix it. They can configure it. They can change it. You can write an automated script, but typically database going down is a big thing. There will be an engineer looking into it. He or she will do this. It's fine. Right. You can also, in case you want to automate, you can automate. You just need to find the active server, find the max IDs, add some buffer to that, and then set the values and then just do a quick process reboot on each server. You are done. Right? Okay. Any questions on this approach?

### [01:31:39] Questions on the stub column and server restart

**[01:31:39] Student?:** Yeah, man.

> **Student Question [01:31:41] - Student 3:** Yeah. Can you just go back to the previous page where you have created that query? I'm not able to understand how it's creating the unique value at this one. Can you just elaborate maybe one more time?

**[01:31:52] Teacher (answer):** This is 75, 76. Insert into ticket stub values A. So what we are trying to do, we are trying to insert a value. Something we have not provided ID.

[01:32:02] So we're trying to insert this value. Right? But stub is having what? Unique key. Correct? What would happen? This insert would fail. Have two same values over here in this column. Correct. So on duplicate key update, update to what ID equal to ID plus one.

**[~01:32:22] Student 3:** That I understood. [?Stub | asr: "Step"] part where it is coming, not able to make sense of that.

**[~01:32:28] Teacher:** It's just a common value. It's just a random value that you chose. It's a hard coded value in your query. Hard coded. Oh. Right. It's a hard code. It can be literally any string that you would want to keep. It's just that you want to trigger this. You want to break the unique constraint. Correct? You are just trying. You are making your database break the unique constraint so that you can trigger an update atomic.

**[01:32:58] Student 3:** Oh, so for that purpose only stub exists.

**[01:33:01] Teacher:** That's it. That's it. There is no other reason for stub.

**[01:33:04] Student 3:** Okay. Got it.

**[01:33:06] Teacher:** DK?

**[01:33:08] Student 3:** Yep.

> **Student Question [01:33:09] - Student 3:** If you can go to the last page, I am not able to understand how, when the server comes back, how you are resetting the values with the buffer value.

**[01:33:18] Teacher (answer):** This one, I said, no, one engineer will do that. This configuration, these configurations, it's MySQL specific. Check how you can change auto increment offset on the platform. But why do we need to do that? Because let's say one server comes back. I said aesthetics. I said it's for aesthetics. Nothing more. It, your system is still running correctly. It would just look a bit.

**[01:33:41] Student 3:** The last value only will keep on updating it. Right. Or it doesn't work.

**[01:33:45] Teacher:** But that's what I said. Let's say it died off at five. Okay. This value is 202 right now. If odd server comes back up, what would be the next ID that would be generated?

<!-- chunk_09 01:33:59-01:47:02 -->

**[01:33:59] Student 3:** But this is an even server.

**[01:34:01] Teacher:** This even [unclear: "page"] 202, odd server came back up. What is the ID generated on the odd server now?

**[01:34:08] Student 3:** Whatever value was.

**[01:34:10] Teacher:** I have three, one, three, five. What's the next value that would be generated? One, three, seven,

**[01:34:15] Student 3:** Seven.

**[01:34:15] Teacher:** And on the even server. Okay. Two, zero, four. So just to maintain that. Correct. Right. Just for aesthetics. That's what I'm saying. Just for aesthetics. Okay. There's nothing special. Even if you don't do it, your system would still function correctly. It just for aesthetics. You can just reset the value on both sides and make it look better. That's it.

> **Student Question [01:34:38] - Student 3:** Okay, so after reset, what will be the right value according to you?

**[01:34:43] Teacher (answer):** Start with 240, 239 and then let it round robin.

**[01:34:49] Student 3:** Got it.

**[01:34:50] Teacher:** Pick some value. It's up to you. You are the [?designer | asr: "desire"]. You are the architect of the system. It's up to you where you want to reset. You reset it to the safest value of that. Makes sense. That's why we discussed safest value in the first place. So that we understand the importance of starting from a safest value the IDs that were generated in the past. Right? Okay. Chal. One more question before we move forward. Chathindar [check: name spelling], go on.

> **Student Question [01:35:16] - Student 2:** Yeah. So I think I'm a little confused here in this one. You said the max plus buffer thing is just for aesthetics. But let's say if the odd server goes down, let's add five [check: "let's add five" - "let's say at five"?] and the even server goes on till 202. If we don't do this max plus buffer thing and the odd server starts producing IDs from let's say seven, then they are not monotonically increasing.

**[01:35:38] Teacher (answer):** Where did we enforce monotonicity?

**[01:35:40] Student 2:** Okay, we are not enforcing that here. Never.

**[01:35:43] Teacher:** That's what I started saying. We are not enforcing monotonicity. It's a nice byproduct [?to have | asr: "to hire"].

**[01:35:49] Student 8:** Okay.

**[01:35:51] Teacher:** Because that's what I said. Not everyone needs monotonicity. And it's okay to not have it. Social media, why would you care about monotonicity? You should have it. Okay.

## [01:36:01] Twitter Snowflake

[01:36:01] Now the next part is we discussed the two approaches [unclear: "of Atilla"] that we saw. Amazon and Flickr. They were central ID generation service. Now what we take, we take a look at distributed part, or rather not distributed. Decentralized ID generation logic, not service, logic. So Twitter still uses this. One of the best ID generation system out there. So what Twitter uses an algorithm called Snowflake. I, two words back [check: "two words back" - two weeks back?], I never thought why they are calling it Snowflake.

[01:36:39] Now I remember just a little backstory. Snowflake is like almost every single snowflake in the world that you see is unique. That's why the ID generation logic, they are calling it as Snowflake. So pick any two snowflakes, they would no way be similar. They would no way be exactly the same. They would always be dissimilar. That's the beauty of snowflake. In case you're interested, the Numberphile has a great video on why snowflakes are unique. Not ID generation, but the actual snowflakes. Unfortunately, computer has to, like when we hear Windows, we think about operating system and not the physical Windows. We are now used to that. So snowflake, not ID generation, but the actual snowflake. Every single snowflake is unique because of which they named this particular algorithm, if I may call it, as Snowflake.

[01:37:30] Is Twitter uses Snowflake for their IDs. Snowflake, this algorithm is also adopted by Discord and Instagram. We'll talk about Instagram. Discord is very similar. We'll also talk about Discord also and Instagram also. So Snowflakes are 64 bits [unclear: "in TV"]. 64 bits, keeping it small. That's what they also went for. They did not want to keep it large. If they would have kept it large, at Twitter scale, the amount of data that is getting ingested, the amount of data that is getting indexed. Imagine instead of having 64 bits, you are having 128 bits, which means 16 bytes. You are literally doubling the space that you need. That's why efficiency at scale, storage efficiency at scale, compute efficiency at scale.

[01:38:17] So what Snowflakes are? Snowflakes are very simple. They are very similar to MongoDB's ID, but very small, very nice. Right, so what they have is they have first 41 bits as epoch milliseconds, left side, always time. 41 bits epoch milliseconds, which means every millisecond this would always move forward, so you almost get ordering in IDs. That's a very nice byproduct. We'll take a look at pagination because of this, how it is very efficient. Then the next 10 bits for machine IDs. Machine IDs is server that is generating this ID, not database server, it's the API server of Twitter. So

[01:38:57] So imagine you're tweeting something. So what do you have? This is you. This is tweets DB, which is partitioned, massively partitioned, right? And these are the API servers, normal API servers handle REST request to create a tweet. Here you have this ID generation logic called Snowflake. It's not a library. It's not a service. It's a library, normal, normal integer, normal bit manipulation. When you get a request to tweet something, it does basic validation there. Tweet ID, user ID, text tags that. It generates a random tweet ID using Snowflake and it just stores it into this database. These are API servers which are generated. So this 10 bits are for these machine IDs.

[01:39:44] Now because of this 10 bit constraint, you know the maximum number of API servers that Twitter would have had for tweet service would be at max 2 raise to 10, which is 1024. It cannot go beyond that. Correct. Otherwise this would overflow. Correct. That's what happens. So you, it reserved 41 bits for epoch milliseconds, 10 bits for machine IDs and 12 bit for per machine counter, that static counter that we discussed at the first. It will press, plus, plus, plus, plus, plus, plus, plus, plus every time. Now this is what it generates on demand.

[01:40:20] When you get this, see, when you get this in the business logic handle, when you're generating a new Snowflake ID, you need current time, you have it. Machine ID, you would know that this is my machine ID. It would be in range of 0 to 1, 0 to 1, pick one. Every machine will get a unique ID to start with. And a 12 byte machine counter, per machine counter. What does this tell you? This tells you that per machine counter is 12 bytes, sorry, 12 bits, which means that in 1 millisecond, one machine can generate 2 raised to 12 unique IDs before seeing any collision. Per millisecond per machine, 2 raised to power 12. 2 raised to 10 is 1024, 2048, 4096. 2 raised to 12 is 4096.

[01:41:17] One millisecond, one machine can generate 4096 unique IDs without seeing any conflict. One millisecond. That's a humongous throughput that they have made the system tolerant enough that hard to attend that scale, right? So they are prepared for, well prepared for the future, right? Because at max 1024 machines, so when entire collision would happen, when Snowflake would see, when, when would Snowflake even see a collision where same IDs are getting generated? It would happen when in one machine, in one machine, in one millisecond, you are handling more than 4096 requests. No one can do that. One millisecond more than four, more one millisecond, more than 4,000 requests per millisecond implies 400,000 requests per second. No one does. No one does it. So they are very much safe from the scale that they are handling. And they can at max have 10 machines.

[01:42:21] So this is normal. You can even write Snowflake in three lines of code. That too for aesthetic, I can write it in one line also. Three lines of code. Because you know the current time. You know the machine ID. You know a static counter you do atomically plus plus. Just arrange those bits like this. Like take a number. Left shift by 23 and set a time, and then set bitwise or, and basically create this ID, as simple as this, normal bit manipulation, right? But the kind of benefits you get out of this is because now there is no moving component, there is no need of a central ID service and whatnot to talk to. It's literally a request comes, you generate a Snowflake ID, you store it in the database, done.

[01:43:08] This is why Twitter scales. There is no central, because, because firing tweets is one of the most high throughput things that the world is handling right now. People keep on tweeting stuff whenever there's a big event as if they're missing out on something. They keep on tweeting. These folks need to handle the scale. If they would have had a set of [unclear: "lighting services"], they would need to scale that part and this and that and that and that. Screw it. We don't do that.

[01:43:36] So the beauty of Snowflakes is that they are roughly sortable. Within the same millisecond, assuming that the machine that has lesser ID is smaller, the machine has larger ID is larger, within the same millisecond you get roughly sortable IDs. That's brilliant. First 41 bits of epoch millisecond means after every millisecond your number is massively moving forward and it gives you an ability of getting a tweet before and after a certain time because the first 41 bits. So if you go to Twitter right now, click on any tweet, look at the link, the tweet ID itself is an integer. This is Snowflake that we are talking about. Now what would happen is the first 41 bits of that number is actually epoch millisecond when the tweet was made, which means that given you have IDs, you can very clearly tell if this tweet was made before this time or after this time. That is brilliant because now it makes your pagination super efficient. So this is a very interesting byproduct of having roughly sortable IDs.

## [01:44:43] Pagination - limit offset vs ID-based

[01:44:43] So if you ever take a look at Twitter API, unfortunately it is paid right now. No, they reverted it, but now I think they already, they made it again paid. Not sure what their current state is, but if you go through Twitter's API documentation, what you will find interesting is the way you can paginate a tweet. For example, you want to list all the tweets of a person's profile of a, of a made by a particular account. What you can do, there are two ways to pagination. One most common limit offset based pagination. So you fire a SQL query and use SQL as an example, but it holds to per every database, FYI. Select star from tweets where user ID is this limit 10 offset 0. Then for the next page, limit 10 offset 10. For next, limit 10 offset 20 and so on and so forth. That is one way to pagination. Limit offset, skip limit, whatever you may want to call it. That is one way of pagination.

[01:45:41] But this has a problem. When you do limit offset based pagination, it is pathetically slow. In case of Twitter, imagine it is very common for people to scroll down the tweets of a particular person. Let's say Arpit made 10,000 tweets. Going through all of his tweets is a very slow process. Because if I go down deeper into [?pagination | asr: "page initial"], like if I go level deep into it, third page is okay. Fourth page is okay. Fifth page is okay. Six page would be slower. Seven would be even slower. Eight would be even slower, but it is a very common use case to scroll through it. You'll say, why would someone scroll through person's profile? Okay.

[01:46:19] Let me give you another example. Let's say you are writing a [?batch job | asr: "bad job"]. In order to compute trending topics, right? Trending topics in last two, you want to process last one hour of tweets. Processing last one hour tweets, in one hour Twitter produces millions of tweets. Imagine doing pagination across those million rows, that would be so slow. Let me give you a practical example of that. I never thought this would come in this handy. I wrote a very quick demo back in 2016. I was getting bored at Amazon, didn't know what to do. What I did is I, I was heavily into MongoDB back then.

<!-- chunk_10 01:47:02-01:57:49 -->

**[01:47:02] Teacher:** I wrote a simple benchmark. I found something interesting and I wrote a benchmark back in 2016. Good that I got bored at Amazon. So efficient pagination, MongoDB, MongoDB benchmark. You want this? Okay. So this holds true for MongoDB. This holds true for SQL. [unclear: "this whole super"] literally every single database out there, right? Okay, let me explain what's happening here, how pagination, ID generation, pagination are linked together, right? So there are two ways to paginate. As I said, first way to do it is limit offset. This is limit and offset, MongoDB's example, skip and limit. The idea is that whenever you are firing or want to get the next one, you fire queries like this. You skip something, you limit something. You skip something, you limit something. Here it should be 10, FYI. But that's fine. You do that.

[~01:47:55] Now what happens behind the scene when you execute it? Now when you execute a query like this, limit n offset n. When you execute something like this, your database has to evaluate the entire query, literally find the entire result set until the point that you requested, skip those many of the result set and pick the one that you're interested it. That is extremely expensive because every time you are executing the query, you have to compute the entire result set. Then you are skipping and then you're picking the things that you requested for. It becomes linearly expensive. I'll walk you through that.

[01:48:40] But other way to do pagination is ID limit based pagination, where let's say you just want to iterate through a table. That's it. No advanced filters, no advanced where clauses. want to iterate through the table. That's it. In Twitter's case, let's say you want to read tweets. [unclear: "You as it"] Twitter wants to read tweets made in last one so that it can do processing of [?finding | asr: "funding"] trending topics and whatnot, or doing recommendation, putting it into [?Twitter feed | asr: "Twitter speed"] and whatnot, right? Very common use case for Twitter. So it's very common for them to iterate through all the tweets that made in last N minutes, right? In order for you to do that, they need very efficient pagination, which is where you go for ID limit based pagination.

[~01:49:24] First of all, what is ID limit based pagination? When your IDs are comparable. For example, MySQL auto increment IDs, they are comparable: one, two, three, four, five, six. You know which one came first, which one came second, right? IDs are comparable in case of [?MongoDB | asr: "mongodicree"] and Snowflake and anywhere where you see time on the leftmost side. You can actually compare the IDs, you can which one is larger. Right? So now what you can do is, instead of paginating by limit and offset, you paginate it by ID. Something like this. And db.students.find where ID is greater than the last. So you first get the first 10 rows. Then you find the last ID from this while iterating, you find the last ID, and then you do db.students.find where ID is greater than the last ID, limit 10. Then ID greater than the last ID [?limit 10 | asr: "limited"], then ID greater than the last ID [?limit 10 | asr: "limited"], and so on and so forth. Given that your collection, MongoDB collection, SQL table, are all physically stored by ID, that's what, how databases are stored, they're physically stored order by primary key, this becomes a very efficient operation.

[~01:50:37] Let me show you the benchmarking graph. Here, this is the graph. So here you see the blue line is the skip limit or limit offset based pagination, and ID limit is the ID based pagination. Obviously I cannot apply advanced where clauses over here, but if you don't have to, you can get a constant time performance while doing deep pagination. Here range or for smaller depth of pagination, your time does not very much. But as you go deeper and deeper and deeper and deeper and deeper, you see the time increasing linearly. It holds true for every use case. This is where I had a massive disk flush. I was so keen why there is a sudden spike over here. My disk started to throttle at that time and I was so happy that I made my disk throttle. Because of it, there is a sudden spike, but it is actually linear. And it was fun to understand that I got to put so much pressure on my disk that it started crying and I was so happy. I always wanted to saturate my IO and I was able to do that.

[01:51:48] So here what happened is you can very clearly see a linear growth in time, but it is constant performance when I'm doing ID based pagination, because it is a property of database to keep things ordered by primary key. Always, always. Okay.

[01:52:04] By the way, in case you are interested to know, I have a members-only video on my YouTube last week posted, not promoting, but in case you'd want to know deeper, I'm covering a bunch of database engineering topics there on YouTube. But it is members-only, so you may have to make that other purchase there. But I went into how database actually stores, like why database chooses B+ tree to store it and how it actually physically stores the data, how it makes its operations perform.

[01:52:28] So, iterating by primary key is very efficient, is actually physically storing the data in that exact same manner. So for you to do, hey, give me 10 from this particular ID. Literally log n time, it reaches to that location, then sequential scan after that. Very efficient for your database. No matter, and because it is B+ tree, it's always log n to reach to that particular ID and then a sequential scan after that. Log n, sequential scan, log n, sequential scan. That's why no matter how deep you go, not increase at all. You see a constant, very evident from this graph, very evident. You see a constant [?time performance | asr: "type of comments"] always for ID based pagination. Disadvantaged, you cannot apply a complex where clauses, but it's okay. That's what your use case is, right? But that is a very nice, but basically that is a very nice side effect or other byproduct of using Snowflake or any iteration or any ID generation logic where timestamp is on the leftmost side. You will always see that.

[01:53:37] So MongoDB, I showed you an example, holds true for Snowflake, holds true for even MySQL. Even in MySQL, you don't want to do that deep pagination and you don't want fancy where clauses. Try doing this. You would get much, much, much larger performance when you are going deeper into pagination. But this does not mean you go and replace all of your iteration logic, because it has limitations that if you have complex where clauses, [?pagination | asr: "vegetation"], right? But where you can go for it, right?

## [01:54:04] Snowflake at Discord (custom epoch)

[~01:54:04] Okay, so before I take question, let me just cover this Snowflake at Discord, and after this we'll take question about Snowflake and I will talk about Instagram [unclear: "software"]. So here what happens is, there is no enforcement. We say that the first 41 bits over here is epoch millisecond. So epoch millisecond is basically time stamp from epoch. Epoch is 1st January 1970. But if my company is starting in, let's say, 2011 or 2015, why, why should I start my time from 1st January 1970? Can I not get a custom epoch? So this way I can get a larger range, right? For example, the time that I lost from 1st January 1970 to let's say 2015, those big of an ID range, I would get it to, it would just enlarge my ID even longer. And like heads up for 20, 30, 30, for 35 years, heads up. That's huge, like 35 years of IDs you will get it, right?

[~01:55:09] So what Discord does, it has the exact same structure, exact same structure as Twitter, but it's just that the epoch time starts from first second of 2015, because in 2015 the company started, right? Snowflake is also used by Sony, the TV company Sony. They also use Snowflake based implementation. It is open source, you can find it on GitHub. Go through the source code, five lines of code of core Snowflake, and you see it's literally bit manipulation. That's it. All right? And we'll also see it by Instagram, how they also manipulate those bits. Very easy, right? But go through that, it's very easy. And this Snowflake get very nice [?traction | asr: "fraction"] because of its decentralization. There is no need of centralized ID generation service. There is no moving part required. Moving part is no external services which needs to be scaled up and scaled out and whatnot.

[01:56:01] It's very counterintuitive. Whenever you think of ID generation, the first thing comes up, I'll write a microservice that does that. Good engineers never think like that. Good engineers look at problem. They look at the most efficient way to find a solution. Not every solution requires you to build a service. For some reason, everyone is doing that. Very stupid. Do things that matter to you and your business. else is doing it, right? Everything, every system, every solution is contextual. It depends on the context of your organization, the expertise of your engineer, the support from your management. But you are the one who can bring that [?change | asr: "chain"] in case you are unhappy. If your solution is far superior than others, everyone else is proposing microservice, but if you think Snowflake works well for you, just go for Snowflake. You need to have, you need to make data driven decisions. If you show the data, why would they not adopt it? It's really simple, but just don't fall into this trap of building microservices after like for every single problem. Microservices are stupid in most cases. In most cases they are stupid, they are an overkill. So understand the context and then build what you really need to build. Keep things simple, because simple systems scale, always simple.

[01:57:19] And if you look here, it is just a library. Normal three lines of code leads you in generating a Snowflake ID. You don't even have to make a network call for that. Because of its decentralization, because of not having to make a network call and build a service and scale it in, it's just so, so, so efficient for you to live this. This is the beauty of Snowflake. Any questions on this before we go to Instagram?

<!-- chunk_11 01:57:49-02:09:20 -->

**[01:57:49] Teacher:** Yes, Rajiv.

> **Student Question [01:57:51] - Student 1 (Rajiv):** Arpit, that graph which you showed us, how did you come to know that the disk is throttling there?

**[01:57:59] Teacher (answer):** I happened to have Prometheus running at that point of time, which was exporting my node metrics into somewhere. I happened to have that happened. It was all luck. So what I saw was my disk IO. I was continuously monitoring my disk IO. Actually the node was monitoring it. I had those metrics being exported somewhere else. On, all that was done on my local machine, but I was capturing those metrics for some other thing. I was writing a Wikipedia. I was writing a search engine on Wikipedia. I wanted to capture a bunch of metrics and I happened to have node exporter running and it captured it. It showed my disk IO utilization, as part of my node exporter, you get this disk IO utilization metric. That's how I got to know. It was a hundred percent.

> **Student Question [01:58:42] - Student 1 (Rajiv):** That thing. Okay. One more thing that you told about this pagination logic works for all DB. You talked about B+ tree of MySQL or SQL based thing, but then when it comes to NoSQL part, primary key, reading is the same for both people.

**[01:59:03] Teacher (answer):** Depends on the storage engine. MongoDB, it works well. You saw it in MongoDB. MongoDB is a NoSQL data. Correct. Okay. Anyone that gives you sequential scanning, this would that the DynamoDB also, but if you're having completely decentralized hash based thing, then you cannot. If you're, if you have data locality, then you get this benefit. If your data is completely de localized, then you would never get this performance benefit.

[01:59:30] So understand how your database stores your data on the disk, which is why knowing database internals is essential for you to build performances. Otherwise you would have like, otherwise limit offset, everyone would have done. So how your database is actually storing the data, you can make those performance optimizations without having to worry about is this true or not? Because you know it is how it is stored. But MongoDB, it works.

[01:59:56] And just one more example to that. We saw in that graph that for smaller value, it is okay. Elasticsearch, Elasticsearch gives you two ways to [?paginate | asr: "page in it"], exact same thing. Elasticsearch is also NoSQL. It's also [?sharded | asr: "Charlotte"] partitioned work part. Elasticsearch puts a limit of 10,000 documents in a limit offset based pagination. You cannot go beyond 10,000. It's a hard-coded limit. Try spinning up Elasticsearch server. Try firing a query with offset, with skip. I'm not sure what they call it. I think they call it offset only. 10,000, more than 10,000. It gives you an error that you cannot go beyond this. Please use cursor API to go beyond this. Classic example where you are iterating through almost all the documents. They're more than 10,000. It's better to go for a cursor based approach versus going for a limit offset based approach. For smaller values, it does not matter, but as you go deeper, deeper, deeper, that's where these things starts to creep up. Okay. Yeah.

**[02:01:01] Student 5:** Yeah.

> **Student Question [02:01:02] - Student 5:** So what is counter here in this Snowflake approach in static counter?

**[02:01:06] Teacher (answer):** Atomically increment. Every time you generate ID.

**[02:01:10] Student 5:** Okay. Per server counter.

**[02:01:12] Teacher:** Per server.

**[02:01:13] Student 5:** Alright. Yeah.

**[02:01:15] Teacher:** Which is exactly why I stress so much in the first time when we're discussing this. It all comes together in all of these discussions. Yeah. Yeah.

> **Student Question [02:01:25] - Student 4:** I didn't understand like how in Discord, epoch is just a number, right? So even if we start from today's date, how is it like saving us? Okay.

**[02:01:37] Teacher (answer):** What is epoch? Let's say I'm starting with the current epoch. The current epoch is 1676784716. This is the current epoch second. If I add three zero, it becomes current epoch millisecond. This is the current epoch millisecond. If I start, if I'm starting my company at this moment, I'm losing out on this [unclear: "big operate"] because this is my first 41 bits of it. Right. So now because I have 41 bits only the maximum value that I can store in those 41 bits is. Correct. [?Two to the power 41 | asr: "No, do the power 41"]. It will get exhausted pretty quickly because now I'm not starting from zero. I'm starting from this one. Correct. I could have caught up that big of a range if I start from 0 from this moment and let my time move forward from here 1, 2, 3, 4, 5, 6, on and so forth.

**[02:02:41] Student 4:** Got it? So we are essentially subtracting the start time. [check: speaker boundary - "Got it?" may be the Teacher's]

**[02:02:46] Teacher:** So this way we get a massive range handy because the rate at which your time is moving forward is exactly the rate at which the time is moving forward. So this time and the actual time. So you get 35 years of time. If you start today, you get 45 years of time. Right. Right. So it would take more 45 years for you to exhaust that range of 41 [?bits | asr: "minutes"].

**[02:03:11] Student 2:** Right.

**[02:03:13] Teacher:** So you're just gaining that particular. Right. Okay. Okay.

## [02:03:18] Instagram IDs

[02:03:18] Now let's go into how Instagram does it. And this is why you should love early engineers, not current, early engineers of Instagram. You should like, they deserve to be millionaires, like multi-millionaires. They deserve. Look at this beautiful. When I first read that blog, I started cursing because this is such a brilliant piece of optimization. It just boggled my mind how someone having a deep knowledge of data, not really deep, someone having decent knowledge of database can do this much out of it.

[02:03:51] So what Instagram did is Instagram wanted to use Snowflake. But what they did is they did Snowflake while inserting in DB. So Twitter did Snowflake at API servers. Instagram does it over here. API server does not have Snowflake logic. Database has it. See the beauty of their implementation. So what Instagram needed? They wanted ID sortable by time. Same use case as Twitter. They wanted to process, find trending hashtags, push it to feeds of the users and whatnot. Like do processing on the recent item. So they needed ID sortable by time. 64 ID so that they are efficient on indexes. And they did not want to build a new service.

[02:04:39] Look carefully. How good companies, they are trying, continuously trying to not have microservices. We on the other hand are told to build microservices every now and then. That's why I always say good engineers never think in microservices. They think in problems and solutions. They did not go for a building microservice for every single thing out there. That's an overkill for most organizations.

[02:05:03] So they had these requirements. So what they went with, they tweaked Snowflake a bit. What they did, they put first 41 bits at epoch millisecond, but from 1st January 2011. So they get massive range to play with now. Then the next 13 bits is DB shard ID. Was already sharded, we'll talk about the sharding structure also in a couple of minutes. So what Snowflake for Twitter did, 41, 10 for machine ID and 12 for this. What Instagram did, 41 bits, 13 and 10. So 13 for DB shard ID and 10 is per shard sequence number, static counter, right? Okay.

### [02:05:42] Logical shards and physical servers

[~02:05:42] Let's first go into and understand what logical shards and physical servers are for Instagram. So what we do is in- I hope you, like, it was shared in the period, but I hope you saw that video on sharding and partitioning that I put on my YouTube and shared in the readings. If not, do watch it. I'll give you a glimpse of it. So what Instagram does, Instagram uses, Instagram uses Postgres as a database, right? [unclear: "at 10"] what Instagram had is Instagram created bunch of logical shards also called as partitions and physical DB servers. Physical DB servers is actual physical servers on which your database is running. Right. Which means your MySQL servers that you are spinning up. Right. Within the MySQL server, you create database by firing create database command. Right. That create database is a logical partition. Right.

[02:06:36] So what you do is you create logical shard, which is thousands of them at max 2 raise to 13, which is 8192 at max. And you have fewer physical servers, let's say 10 or 15. So on each server, you create create database Instagram 1, create database Instagram 2, create database Instagram 3. Other server create database Instagram 2000, create database Instagram 5000. So creating multiple logical partitions in your database, every partition will have the exact same tables with the exact same schemas. So this is one database in which you have four tables. Database but different data, table same, schema same, data different. So this is logical partition, this is physical server, right?

[02:07:23] So MySQL server that you spin up is a physical server within which you, when you do create database, that is a logical partition. So when you run a migration to add a column, you have to run it on all the databases that you have, all the physical database servers against which all the logical databases that you have. When you do create database, we always when database and your company name, and you create users table, [unclear: "odd table"] and this. They do this multiple times, like 8,000 times. But advantage that they get because of this is that now they can take a dump of a database and put it into some other database. For example, let's say one of my database is hot. One of my databases is hot. It can literally, we'll go into this one more time in the fifth week, right? But I'm just giving you a glimpse on what this is all about. They can literally take this small database, logical partition, and move it over here. SQL dump commands, they do this, they dump it, and they load it in different place, right? This way they can balance.

[02:08:33] So for them, horizontally scaling a database is easy. They spin up a new physical server, take this logical partition, and move it there. Why is logical partition? Because now they can literally dump it very quickly and load it very quickly. If they were not having this logical partitions, they had to go through every single row and then extract the row that needs to be moved and then move it. Instead, they just create separate logical partitions, making their movement very easy. So this is what Instagram has as their structure. So they have 10 MySQL servers within each one of them, thousand, thousand, thousand MySQL databases, which is create database command that you fire, that are being created, which has logical partition and physical database server. Now this database shard ID that here we are talking about is this.

<!-- chunk_12 02:09:20-02:20:10 -->

**[02:09:20] Teacher:** Right? They can be at max 2 raise to 13, which is 8192. And per shard sequence number like static count.

### [02:09:26] Instagram IDs with stored procedures (PL/SQL)

[02:09:26] But now what Instagram does is brilliant. What they do? They use stored procedures. Things we neglected in college, PL/SQL, no one studied that. Stored procedures, what are they? We are not going to use it. We write raw SQL queries. What Instagram did is something really fancy, really basic. I did study this in college, but never thought it would be used in this way. PL/SQL. I loved PL/SQL, stored procedures and triggers and whatnot, but see how beautifully they're using it.

[02:09:56] So their photos table. So as I said, there are multiple physical servers in which there are logical partitions or logical databases that you're creating. Each database has same set of tables with same set of schemas. For each partition that it has table photos, it creates something like this. So create database Insta 5, create table Insta 5.photos. Schema of the photos table, other column, whatever you want to put it. But ID column looks something like this. ID, big integer, not null, default. Default value is, when you don't provide any value, the default value is this. This is a function called, a stored procedure, a function. Insta 5.next ID. So, when you are inserting a photo in the table, if you don't provide an ID, invoke this function. That's what it is doing. When you don't provide an ID while inserting the photo in this database or in this table, invoke this function, whatever the output is, use that as the ID.

[02:11:00] Now what this function is? This function is this. Create or replace function insta5.nextID. has its own next ID function because it is on fifth shard. I'm having those five five five suffixed everywhere. So next ID of this data, next ID, oh sorry, next ID of Insta 5, photos table of Insta 5, create database Insta 5. And how I'm defining this function is like this. Insta 5.next ID is the function name which outputs result which is of type big integer and it declares four variables. First is an epoch variable of type big integer and this is the value which is 1st January 2011 epoch timestamp, epoch millisecond, and sequence id something, now millisecond big integer something, shard id is 5. This 5, this 5, this 5, same, right? It's hard coded there. This is for shard id 5. Similarly you have to run the same, you have to create this stored procedure for every single database that you have, right, as an example.

[02:12:09] Now, this is the business logic. This is actually how you create a Snowflake ID. So what you do? Every database has a sequencer. Like how does database generate auto-increment IDs? Behind the scene, there is a sequencer or a sequencing algorithm whose job is to obviously table sequence. There are multiple names for that, but basically sequence is what you hear the general job. So you create a sequence which atomically increments and spits out the ID. Increments, simple. Every time you invoke it, it increments. So you invoke a function called next one, it's a standard function, [?nextval | asr: "next well"] [?insta5 | asr: "insta pi"] dot table id sequence mod mod 1024, by 1024, 2 raise to 10. This is limited by 10 per shard sequence number, right? So no matter how many transactions come in, this will be an atomic increment and you do mod mod 1024, so it restricts it to 10 bits as sequence ID. So it stores it in this sequence ID over here. Right.

[02:13:09] Then you get now millisecond. Now millisecond, you get normal epoch millisecond of your current database. Right. Now you want to create, what you want to create? Snowflake ID. So what do you do in result, which is a big integer? You first 41 bits is what? Epoch millisecond since your custom epoch, which is 1st January 2011. Now millisecond minus epoch left shift by 23. So you compute a time left shift by 23. When you left shift by 23 you would set the first 41 bits to be epoch milliseconds. Then the next is shard id. You have a shard id which is 5. Result equal to result bitwise or shard id left shift 10. So next 13 bits are set to 5, which is shard id. And then you do result equal to result or sequence id.

[02:14:07] And every time you invoke this function, or every time you insert this photo without passing in any id, it triggers this particular function which generates the Snowflake id, returns it as result, which gets inserted in this table. Instagram does Snowflake ID in the database [?stored procedure | asr: "code procedure"]. Highly, highly, highly recommend you to implement this. Don't just look at it in theoretical side. Very easy to implement. Just start your favorite server, MySQL, Postgres, anything, and write this and see how beautiful this implement is. [unclear: "Post on"] the previous batch did it and they found it. They were so amused when it first tried because it's so easy. It's so easy. It's so efficient because now you don't need to have logic on the API side, all offloaded to database. You just do normal insert like you always do without passing an ID. Earlier, [unclear: "if you don't buy you to"] auto increment. Now, instead of auto incrementing, it would invoke this function. Problem solved. This is such a beautiful thing that Instagram does. It still does that. You can still see Insta post having integer IDs, which are Snowflake generated exactly like this. Right. Okay. Any questions on this?

### [02:15:18] Questions on Instagram IDs and sequencers

[02:15:23] Rajiv.

> **Student Question [02:15:25] - Student 1 (Rajiv):** In this line, [unclear: "under dot table underscore added or sequence"], this should be a column on Insta five, right?

**[02:15:32] Teacher (answer):** No, no, no, no, no. This is not a column. This is basically depends on database. It is not need to be a column. It's a sequencer.

**[02:15:39] Student 10:** Okay. Okay.

**[02:15:41] Teacher:** So you can create as many sequence. By default, when you create an ID column with auto increment, it creates a sequence. It basically creates a sequence behind the scene with a unique name and it assigns it internally. You generate new IDs, it just does a [?nextval | asr: "next file"] and gets a new integer and it uses it as the ID for that row that you're inserting. Here we are just replacing the default one with this. So this is what you would basically custom create as a new sequencer. I don't need it. It's an auto incrementing sequence. Like how auto increment IDs are similarly. You don't need this to be a separate column.

> **Student Question [~02:16:14] - Student 1 (Rajiv):** One more question. We just lifted the logic from API server and just substituted and put it in a DB, right? Apart from logical partitioning, we just lifted and placed the logic in DB, which, which means that we are like abstracting the logic inside DB, DB takes care of this.

**[02:16:29] Teacher (answer):** So now you have large number. You can have more than 10,000, 50,000 API servers also.

**[02:16:34] Student 1 (Rajiv):** Okay.

**[02:16:35] Teacher:** There's no limit. Twitter is limited by that now. Twitter can only have two raised to 10 API servers.

**[02:16:42] Student 1 (Rajiv):** Because of machine IDs. Okay. Yeah. Yeah. And we have a lot, we have a lot many partitions. Correct.

**[02:16:51] Teacher:** And here we have [unclear: "bottleneck five"]. We can have at max 8,000 logical databases, which is huge number, 8,000 databases. What can you do?

**[02:16:59] Student 1 (Rajiv):** Yeah. Scaling actually helped you. Okay. I understand. Right.

**[02:17:03] Teacher:** So, Pankaj.

**[02:17:05] Student 3 (Pankaj):** Yeah.

> **Student Question [02:17:06] - Student 3 (Pankaj):** So, across machines, how are we comparing the IDs? It's just that one, if the machine ID 1 and machine ID 2 are generating at the same time, one is given priority.

**[02:17:17] Teacher (answer):** Is that one is smaller, two is larger.

> **Student Question [02:17:19] - Student 3 (Pankaj):** Okay. And that machine ID is like we are giving it by default.

**[02:17:24] Teacher (answer):** Yeah, [unclear: "that any machine that can get separating"]. Another, let's say ZooKeeper is assigning you IDs when your machine spins up.

**[02:17:30] Student 7:** Okay. Okay. Yeah.

### [02:17:34] Wrap-up of ID generation

**[02:17:34] Teacher:** Okay. By the way, that's all what I wanted to cover as part of ID generation. Implement every single thing, [unclear: "that begins easy"] to implement. It's nothing fancy over here, but you can very easily implement and see these things working in action. It's really easy, but do that. You'll have fun implementing all of this, and trust me, because I implemented, I got much deeper understanding of how they are doing what they are doing, what advantages, what disadvantages, logical partition that we discussed, logical databases, why do they need export and dump and load and shard and whatnot. [unclear: "not do that one life"] engineering is all we have, would help us thrive in our careers, [unclear: "but not good"].

## [02:18:14] Questions - monotonic IDs, gossip, queue-based ID ranges

**[02:18:14] Teacher:** Any other questions, anyone? Yeah, rajin [check: name spelling - Rajiv?].

> **Student Question [~02:18:14] - Student 1 (Rajiv):** One more, I just talked, I mean, bit earlier that if we want to number the, number the IDs, we have some logic in which, I know networks are unreliable, the time we insert in database is time we get, right, where the entry call got in. But with this approach, Snowflake and all those things, do we guarantee that the inserts in DB will always be monotonic? I mean, if we have a business case where we want to serve that project.

**[02:18:48] Teacher (answer):** What do you mean monotonic? Snowflake is not monotonically increasing. It does not guarantee strict monotonic. If you need strict monotonic, auto-increment is the way to go. And you can still see something's out of order. That's okay. Social media app like Instagram and all, does it, do you really care about it? Not much, but a financial application where you're listing the transactions. Imagine bank, would bank use Snowflake ID? No. Right. You need strict order in which the transactions have happened. Auto increment is the way to go for them.

**[02:19:22] Student 10:** Okay.

**[02:19:25] Teacher:** Yeah.

> **Student Question [02:19:27] - Student 6:** But I wanted to clarify my understanding of this, which is Insta5.table ID sequence. model. So my understanding is that for every table, we have a sequence ID that is generated

> **Student Question [02:19:43] - Student?:** when we create that table and then we are.

**[02:19:46] Teacher (answer):** No, that is done when you have an auto increment ID column. Then otherwise you can explicitly create any sequencer that you want with any name. With any name.

> **Student Question [02:19:56] - Student 6:** And that sequencer is doing this responsibility of.

**[02:20:01] Teacher (answer):** Atomically increment. It's, it's responsibility. When you invoke [?nextval | asr: "next well"], it atomically increments it and returns with the value.

<!-- chunk_13 02:20:10-02:29:54 -->

**[02:20:10] Teacher:** When you create a table with an ID column with auto incrementing, this is implicitly getting created, but here we don't have that. We explicitly create one with the name that I just use, table ID sequence. It's a name that I do. And by that, this is exactly the name that Instagram also has given. So that's why I just stick to that. But the thing is that you can name it anything that you want. Sequences as you want. It's just not that you can limit it to just one per table. You can have as many as you want. You can have other columns which are auto increment. It's not a hard limit where it says only ID can be auto increment, FYI. You can create another column. You can have three columns with auto increments in your table. You can have that. But the idea is you create a sequencer whose job is to atomically increment and give it to you, which is exactly what a static counter did back in that other logic. Right? So we just leverage that because we need thread safety. We need that because of this.

> **Student Question [~02:21:02] - Student 7:** Yeah, I understand now. Thank you, Akshay. Yeah, for the gossip part that we had in the distributor, for the gossip, do they use Lamport clock implementation usually, they [check: speaker boundary - "they" may open the Teacher's answer]

**[02:21:22] Teacher (answer):** did not specify anything what they are using. But Lamport clock is very different, for it is not used for gossip as far as I know. And gossip is normal protocol that you are using, which one I used. I used one, forgot the name, what did I use for gossip? It has very fancy name. I forgot about it, shit. It's very gossipy name. Like, if I remember I'll tell you. I need to Google search for that.

[02:21:55] So what they do, it's just they abstracted, like they just told in an abstract way that they need to do gossip. How you do gossip is up to you. It can be as simple as making network calls to check what the greatest IDs and then agree upon something and add some buffer to that, which both of them agrees on. Right? It may not be an explicit algorithm per se. You can write your own simple gossip thing that works fine. But I'm not sure what Flickr actually did to implement that particular gossip, [unclear: "not bigger that other logic that need to complete a gossip"], because it's just a normal thing to say you'd have gossip protocol, pick your favorite, write your own. But [unclear: "attend"] the idea for that is, at the end of the gossip that you are doing, you need to know, and you both need to have a consensus on the value that the other one would be picking. Right? So long as that is there, [unclear: "it's whole screw for"]

> **Student Question [02:22:47] - Student 7:** Okay. And also in the Amazon implementation, if we could like go to that stage. Go on. [check: speaker - "go on" may be the Teacher] Yeah, in here, like, can't we like, can't the servers read from a queue that the [?ID generator | asr: "API generator"] actually publishes to?

**[02:23:10] Teacher (answer):** Why not? You can do that. Keep generating the range, keep pushing it into the queue. Let's server read from the queue, but not one ID at a time, but batch of IDs at a time.

**[02:23:19] Student 7:** And we can guarantee like something like exactly-once delivery.

**[02:23:24] Teacher:** You are offloading the atomicity to queue readness [check: "queue readness"]. So when you are reading from the queue, that is atomic in nature. Right. And then the core property you are still playing with is atomic reads. Correct. You get it from the database. You get it from the queue. Anywhere it's fine. Okay. It's not just at end result as you're focusing on the core property that you read. Queue gives you atomicity. Well, works for you. Right. Database gives you that atomicity. Well, works for you. I can replace this with DynamoDB. Atomic instruction. With Redis also. That's not a problem. At that core property, what you need, if you get from any system out there, it's good enough.

**[02:24:01] Student 7:** Got it. Okay.

> **Student Question [02:24:03] - Student 2:** [?Arpit, in | asr: "I'll fit in"] your blogs graph that you showed, the value shoots up in first when the result is equal to 6,000 number of records in such a, it is equal to 6,000 and then comes down. Why is it, shouldn't it be higher only?

**[02:24:22] Teacher (answer):** It depends on what other, what other processes are running on my machine. I did it on my local machine. I did not use my employer's machine. Did on my local machine. There are tons of other processes which are running. You don't know what all things are contending for that resource. That's why you see those spikes. Okay.

> **Student Question [02:24:39] - Student 2:** And for the Instagram implementation, which you showed the last slide, table ID sequence variable, I think it should be stored in cache, right? Not disks, which means not in the table.

**[02:24:51] Teacher (answer):** What cache? Cache as in [unclear: "local eat"] rather than making a call to disk. Database, it's database implementation. We don't really have to, by the way, it has to be persistent. If not, if not, what if your database reboots? It would start from zero. That's wrong. Okay. Yeah. Right. Let it be persistent. Right. And it's database. So database would optimize it. It would do a periodic flush and what not. Let database take care of that. We just create a sequencer and ask it to generate values for us. Thanks.

## [02:25:27] Wrap-up and next week *(admin)*

**[02:25:27] Teacher:** *(admin)* Great. Any other question anyone? No? Brilliant. Next week is all about social networks. I'll upload the recordings and share the questions by the end of the day. Mostly by 3 or 5 today, I need to go out somewhere. But next week is all about social networks. We'll go in depth of, don't spoil the fun man. Wait, I'll pull you in. Wait, wait. What am I saying? I'll upload the recordings by evening. Do read the pre-reads.

[02:26:00] Next week, we'll go in depth of CDNs, how they are used, what they are used. We'll build a bunch of social network services, which are essential in it. I'll now talk about, now that three weeks are got, we have built enough context. Now we'll think from senior engineer's perspective. Start putting your folks into situation where you have to wear multiple hats in order to implement different systems instead of just now. Systems will become more and more ambiguous, that you have to come up with requirements, you have to come up with design, you have to do a bunch of fancy stuff there. So a lot of interesting things planned for fourth, fifth, sixth week. You'll have quite, quite bit of fun next week. Right? Thanks, folks. See you next week. Go on, Harsh.

## [02:26:36] Q&A

> **Student Question [~02:26:36] - Student 5 (Harsh):** Yeah, actually I thought just we are... So in one of the sentence, you said that [?pagination | asr: "the nation"] works fine. When that column is comparable. So does it mean that our columns are primary key, especially those IDs should be [?numeric | asr: "numerate"]?

**[02:27:07] Teacher (answer):** No, it's not comparable. Lexicographical strings.

**[02:27:11] Student 5 (Harsh):** Okay.

**[02:27:12] Teacher:** If an ID is a string, then your database would be stored in terms of lexicographical ordering of the strings.

**[02:27:18] Student 5 (Harsh):** Yeah. It's still also comparable. So, okay. Both are fine.

**[02:27:23] Teacher:** All right.

**[02:27:24] Student 5 (Harsh):** Yeah. That's it. Thank you.

**[02:27:25] Teacher:** Yeah.

> **Student Question [02:27:25] - Student 8 (Simranath):** So I have a question from last class. Shall I ask now? Yeah. [check: speaker - "Yeah." may be the Teacher] Regarding the CDC. So yesterday...

**[02:27:40] Teacher (answer):** Yet to talk about it. CDC yet to talk about it. [?Fifth week | asr: "Fifth thing"] will go in depth. Meanwhile, read. Read about it. Because others would miss it. That's why. I'm yet to cover CDC. I just sprinkled it. If I talk something about it, people will get confused. I just don't want that to happen. Right? We'll talk about CDC in depth. I'm yet to give you even an introduction to what CDC is. That will happen in [?fifth week | asr: "fifth thing"]. I would highly request you to wait for your question for until [?fifth week | asr: "fifth thing"]. More than happy to answer it when I cover CDC. It's just that discussion will digress. I'll start spitting out terms. People will get confused. I'm just trying to minimize the [?confusion | asr: "conclusion"] that might happen. Thanks.

[02:28:21] Anupam?

> **Student Question [02:28:23] - Student 6 (Anupam):** I had a question about Twitter's Snowflake implementation. If my understanding is correct, the request must be round robin to increase.

**[02:28:34] Teacher (answer):** Not necessarily. Why? You're not guaranteeing atomicity.

**[02:28:37] Student 6 (Anupam):** [check: speaker boundary - "not guarantee monotonicity are you?" may be the Teacher] Not guarantee monotonicity, are you? Yeah, that was my follow up. If we want to guarantee monotonicity,

**[~02:28:42] Teacher:** you cannot. Clocks can go out of sync. Yeah. You cannot guarantee monotonicity in distributed setup. That's the thing. That's holy grail. That's, that's, that's written in stone, right? Because it becomes extremely inefficient for you to guarantee monotonicity when it's in distributed setup. Right? So you give up on those constraints. But you still get roughly sorted. So you try to get the max that you can with rough sortability. Right?

**[02:29:14] Student 6 (Anupam):** Got it. And we talked about banks and all where we have use cases for strict monotonicity. Then we have to reduce our throughput requirements a bit. And then... Correct. [check: speaker - "Correct." may be the Teacher]

**[02:29:26] Teacher:** That's what you do.

**[02:29:28] Student 6 (Anupam):** Got it.

**[02:29:29] Teacher:** Yeah. Brilliant. Thanks. Again, Simranath, I'll definitely take a question on CDC. It's not that I'm not taking it up right now. It's more about I don't want to have people to be confused about new terms that I spit out. That's right. More than happy to do it when I actually formally cover CDC. Thanks, folks, for tuning in. See you, folks, next week.

<!-- BODY END -->
