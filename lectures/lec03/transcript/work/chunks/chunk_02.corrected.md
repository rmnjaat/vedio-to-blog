**[00:12:58] Teacher:** ...have, because the increment is atomic, it would always be 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 and so on and so forth. So time is really not playing any part. So can we remove that? For sure can. Because now what would happen is our IDs would become shorter. So our another ID generation logic might look something like this. We have a global counter variable. getid function does a concatenation of machine ID and counter, that's it. So whenever the request goes to a particular machine, it is handled by one of the threads, and because the count plus plus is atomic, like, we will make it atomic, you don't, like, it's not by default atomic, you wrap it in locks and whatnot, or do an atom or use a native atomic library to do that. But the idea is, assume an atomic increment of [?count plus plus | asr: "countless"] of the variable [?count | asr: "cow"], and you get IDs like m101, m102, m103 and so on and so forth.

[00:13:57] This kind of solves the problem, but what it has a limitation of, that when it hits the integer limit, that's a 4 billion, or if it's 2 raised to 64, that's a massive number. You might never hit that particular limit, but still it is ending up. You would still write a good ID generation because of this. wanted, you get it. Machine ID concatenated with a static counter, which is atomically increment. This solves the problem. But okay, what next? This is good. So we saw multiple ways of, or multiple common ways to build this ID generation, or to implement this ID generation. Now what's next?

<!-- topic-candidate [00:14:41]: Static counter lost on reboot - persisting the counter to disk -->

[00:14:41] Now here we look at one very interesting factor, which is this static counter. Int counter, this is a globally allocated variable. Now what is happening is you have a static counter. This is what your logic is, ID generation logic. The problem with this is, what if your machine reboots? As soon as your machine reboots, what would happen? This counter would again be reset to zero, because that's what would happen. There is no layer of persistence at all over here. thing. So when my process reboots or when my machine reboots, my counter will again start from zero, and when the request comes in, it would again start generating m101, m102, m103, m104, which means that my ID generation logic is not unique, because when my machine reboots, it starts regenerating the IDs that it did after the previous reboot. So how do you solve it? The root cause of this problem is that the place at which we are storing the counter is actually a volatile memory. So how do you solve it? Very great answer. Alok?

**[00:16:02] Student 9 (Alok):** Back it up with the file locally.

**[00:16:04] Teacher:** Okay. You write it to the file locally, right? Because volatility is the problem. So you start writing it to the file. So it looks something like this. So what we are doing over here is we store the counter to the disk every time. And when my process starts, I load it from the disk, which means my code would look something like this. So here what we have is, our counter is equal to a load function. We basically assume that it loads from the disk. My getid function [unclear: "5 first"] to count plus plus. I save the counter to the disk. I concatenate with machine ID and counter. it is, we started storing the counter on the disk and not in some volatile memory. So here, whenever my program starts, I first load the counter like this. Whenever a function is invoked, I do count++ and immediately save the counter to the disk. Maybe in a text file, I'm just dumping the counter every time, opening the file, writing it there. And my [?business logic | asr: "business project"] remains the same.

<!-- topic-candidate [00:17:06]: Disk IO on every ID generation -->

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

<!-- topic-candidate [00:21:51]: Flush frequency -->

[00:21:51] Okay. So what we do is, instead of, we, let's say, we, let's say define a flush frequency. Now this flush frequency would be something like this, that instead of writing, instead of saving counter every single time, what we do is we define a flush frequency. Let's say every thousand times, every thousand times we write, like, after generating every thousand IDs, I'll write it to the disk. I'll write my counter to the disk. So we are literally slashing on disk IO by a factor of 1000, which is a massive performance. But what we just have to take care of, that instead of just loading from the last point, I have to just add the flush frequency over here, so that we don't get any collision at up. [check: "collision at up" - words may be missing] So our logic now becomes counter equal to load plus the flush frequency. Let's say every 1000 IDs we are writing: do count plus plus, counter mod equal to 1000 equal to zero, then you do write on the disk. So we are not doing every time we are writing to the disk, but every thousandth time we are writing to the disk.

[00:22:51] Now this way, now just to give you how this would look like, just to explain how this looks like. Let's say hypothetically, my flush frequency is 3.

[00:23:01] So every third value I flush to the disk. What? My counter. So my machine ID is M1. My counter is 1, 2, [unclear: "it's our one"] 2, 3, 4, 5, 6, 7 [unclear: "at night time"]. So M1 happened [check: "M1 happened" - possibly "M1 hyphen"] when it created this, generated this, generated this. When it generated this, your this invoke, 3 mod 3 equal to 0, yes. So I save the counter, so it flushes the counter to the disk. So 0 3 got written on the disk. Then the next iteration, now, rather, next time the function call happened, 4, 5, 6, [unclear: "6 8 also saw"] it wrote it to the disk, right? Then 7, 8, and then the machine crashed. When the machine crashed, the last value that was written was 6. The ID that was generated was already 8. So now when my machine reboots, if I start from 6, if I see that, hey, 6 is written, if I start from this place, I would be generating 7, 8 again, which is wrong, because it was already used by something, right? So the safest value that
