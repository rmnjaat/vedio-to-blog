# chunk_04  OWNS 00:36:15 -> 00:48:29  (segments #672-#889, 1946 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:35:16] TEACHER: They have already solved that problem for you, right?   {#655}
CTX| [00:35:21] STUDENT_1: Yeah.   {#656}
CTX| [00:35:21] STUDENT_1: I mean, if you ask me a single system, I mean, single node, a has map is made for that with   {#657}
CTX| [00:35:30] STUDENT_1: all those things.   {#658}
CTX| [00:35:31] STUDENT_1: Correct.   {#659}
CTX| [00:35:32] STUDENT_1: We have to maybe think about how we can do this.   {#660}
CTX| [00:35:38] STUDENT_1: We have more than one machines are connected.   {#661}
CTX| [00:35:40] TEACHER: No, no, no.   {#662}
CTX| [00:35:40] TEACHER: We're still talking about single node implementation.   {#663}
CTX| [00:35:42] TEACHER: Distribute machine, you can think of sharding.   {#664}
CTX| [00:35:44] STUDENT_1: Right?   {#665}
CTX| [00:35:45] STUDENT_1: That's a simple has map.   {#666}
CTX| [00:35:48] STUDENT_1: has map which can be used as a storage.   {#667}
CTX| [00:35:53] STUDENT_1: Now let me change the requirement a bit, just a bit.   {#668}
CTX| [00:35:56] TEACHER: Now imagine in the value we could store set list bloom filter and hyperlog blog and whatnot.   {#669}
CTX| [00:36:08] TEACHER: I have multiple types that I'm supporting in value.   {#670}
CTX| [00:36:11] TEACHER: So how will your value be represented?   {#671}

---- OWNED SEGMENTS START ----
[00:36:15] STUDENT_1: Okay, now we are looking for like a memory area which we where we can put anything in general,   {#672}
[00:36:26] STUDENT_1: like that or list or anything. Normally, if you think about from any hash table implementation,   {#673}
[00:36:32] STUDENT_1: it tries to put values via time. So if we talk about let's say Java 1, I know   {#674}
[00:36:39] STUDENT_9: No, no, that is good.   {#675}
[00:36:41] STUDENT_9: No, Java is good.   {#676}
[00:36:42] STUDENT_1: Okay, so it takes like a value as a data type, which value may be a general object.   {#677}
[00:36:48] STUDENT_1: It may be like a wrap or primitives integer string.   {#678}
[00:36:52] STUDENT_1: And then based on whatever the object is, it's takes the pointer of that object.   {#679}
[00:37:01] STUDENT_1: And that object goes in heap, but we save the object.   {#680}
[00:37:05] STUDENT_1: So same thing we can do here also.   {#681}
[00:37:09] STUDENT_1: Either we can create pointers for that,   {#682}
[00:37:13] STUDENT_1: or if it is like a primitive values,   {#683}
[00:37:16] STUDENT_1: as we said, we can store in place, in place of pointers.   {#684}
[00:37:20] STUDENT_1: I'm so loving how you are using the right term primitive values at this.   {#685}
[00:37:24] TEACHER: Brilliant. Okay.   {#686}
[00:37:26] TEACHER: So this is what you are storing.   {#687}
[00:37:28] TEACHER: So now if you were to wrap it now, for example,   {#688}
[00:37:33] TEACHER: when someone gives you a command, for example, you can   {#689}
[00:37:38] TEACHER: add to a set, but you have to push to a list.   {#690}
[00:37:45] TEACHER: So when someone says, if it's a set, I need to support add command.   {#691}
[00:37:50] TEACHER: If it's a list, I need to support push command.   {#692}
[00:37:52] TEACHER: How do you know what type your value is?   {#693}
[00:37:55] TEACHER: Because then depending on the command that is fired, you have to check if that value   {#694}
[00:38:00] TEACHER: is of that particular type or not.   {#695}
[00:38:02] TEACHER: Correct.   {#696}
[00:38:04] STUDENT_1: How will you know what type the value is?   {#697}
[00:38:08] STUDENT_1: Then somewhere in the key itself, we have to add something which will give me that because   {#698}
[00:38:15] STUDENT_1: in memory, everything is like an address.   {#699}
[00:38:18] STUDENT_1: Perfect.   {#700}
[00:38:18] STUDENT_1: How you represent internally in a memory representation is a different thing.   {#701}
[00:38:23] STUDENT_1: What we are worried about is via key.   {#702}
[00:38:26] STUDENT_1: I just need to wave to figure it out.   {#703}
[00:38:28] STUDENT_1: In one case, it is an add.   {#704}
[00:38:31] STUDENT_1: In another case, it is a push.   {#705}
[00:38:33] STUDENT_8: Hmm.   {#706}
[00:38:34] STUDENT_1: So we need to have definitely with the key some metadata, which talks about this key represents   {#707}
[00:38:41] STUDENT_1: a data type, which is let's say a set or which is that's a list in another case.   {#708}
[00:38:46] TEACHER: Pay to represent.   {#709}
[00:38:48] STUDENT_1: But why key?   {#710}
[00:38:49] STUDENT_1: Why not value?   {#711}
[00:38:53] STUDENT_1: What I'm thinking it will make things easy because via key only you will access everything.   {#712}
[00:39:00] STUDENT_1: But then imagine how will you store that when you try to implement it, key is a string.   {#713}
[00:39:06] STUDENT_1: Yes.   {#714}
[00:39:06] STUDENT_1: Right.   {#715}
[00:39:06] TEACHER: Now in string, if you're prefixing it with something or you're making it into an object   {#716}
[00:39:11] TEACHER: that would make your lookups very complicated every time you have to dereference and whatnot,   {#717}
[00:39:16] TEACHER: that will be a challenge.   {#718}
[00:39:17] TEACHER: So a better way to do this, just to add to that point, a better way to do this over here   {#719}
[00:39:23] TEACHER: is you store key as a normal key and in the value, you create your own custom type.   {#720}
[00:39:30] TEACHER: Let's say it's called my value and my value, you have value, which is pointing to like   {#721}
[00:39:38] TEACHER: it's a void pointer or an object type, which literally can refer to anything and a type,   {#722}
[00:39:45] TEACHER: which is an integer that refers to zero is then it's string.   {#723}
[00:39:49] TEACHER: One is integer to a set three is list, right?   {#724}
[00:39:52] TEACHER: This way, whenever you are doing a certain operation,   {#725}
[00:39:55] TEACHER: let's say someone fired add on a key called my set.   {#726}
[00:40:00] TEACHER: Right?   {#727}
[00:40:01] TEACHER: So it's an allowed operation.   {#728}
[00:40:03] TEACHER: So when you do this, you check if the key, you get the value,   {#729}
[00:40:07] TEACHER: you get the type of it.   {#730}
[00:40:09] TEACHER: You see if this, the type that you have supports this operation or not.   {#731}
[00:40:12] TEACHER: If yes, you use this object and you then typecast it   {#732}
[00:40:21] TEACHER: and then you put that operation.   {#733}
[00:40:25] STUDENT_1: Yeah, I thought that way.   {#734}
[00:40:27] STUDENT_1: But before that, I thought maybe a bit optimization will be possible   {#735}
[00:40:31] STUDENT_1: if we do via key because we may not need too many data types.   {#736}
[00:40:37] STUDENT_1: Mostly, let's say 5-10 data types.   {#737}
[00:40:39] STUDENT_1: If I take two bytes on top of two bits, even on top of a key,   {#738}
[00:40:45] STUDENT_1: that will give me like four options.   {#739}
[00:40:48] STUDENT_1: If I add three, I will get nine options.   {#740}
[00:40:51] STUDENT_1: Maybe just representing half of a byte, four bits,   {#741}
[00:40:56] STUDENT_1: will give me 16 different data types possible.   {#742}
[00:40:59] STUDENT_1: I can, if I ever think about future, I can take a byte   {#743}
[00:41:02] STUDENT_1: and even say like I will have two to power eight possible data types   {#744}
[00:41:07] STUDENT_1: supported next 10, 20 years in my implementation that I can do.   {#745}
[00:41:12] STUDENT_1: So that's why I thought I think adding a wrapper on top of a value will be a bit more processing   {#746}
[00:41:18] STUDENT_1: compared to adding on.   {#747}
[00:41:19] STUDENT_1: That's why I did it.   {#748}
[00:41:21] STUDENT_1: Brilliant point.   {#749}
[00:41:22] TEACHER: Which is why Redis does this.   {#750}
[00:41:24] TEACHER: It uses four bits to store it because it does it cannot go beyond a certain number of data   {#751}
[00:41:29] TEACHER: types ever.   {#752}
[00:41:30] TEACHER: So they are basically capping it down.   {#753}
[00:41:32] TEACHER: So this is very important point, folks.   {#754}
[00:41:35] TEACHER: Thanks so much for bringing this up.   {#755}
[00:41:37] TEACHER: This shows you when you're designing something in memory,   {#756}
[00:41:42] TEACHER: you have to be very cautious on every single bite,   {#757}
[00:41:48] TEACHER: every single bit that you're using, get the max out of it   {#758}
[00:41:52] TEACHER: because RAM is very costly.   {#759}
[00:41:54] TEACHER: Try to take as less of a space as possible.   {#760}
[00:41:57] TEACHER: Right.   {#761}
[00:41:58] TEACHER: Thanks so much for bringing this up because this is up until now.   {#762}
[00:42:03] TEACHER: We never discussed this, but this optimization   {#763}
[00:42:07] TEACHER: Redis does exactly this.   {#764}
[00:42:09] TEACHER: Redis stores a lot of other meta information also along with this.   {#765}
[00:42:13] TEACHER: That's why we wrapped it in a object over here.   {#766}
[00:42:16] TEACHER: In Redis it's struct, it built in C.   {#767}
[00:42:20] TEACHER: But it adds other meta information over here making it extensible.   {#768}
[00:42:23] TEACHER: We'll talk about it when we go into other features of it,   {#769}
[00:42:25] TEACHER: cashflow, eviction and what part.   {#770}
[00:42:27] TEACHER: But this is very important that whenever you're designing something in memory,   {#771}
[00:42:31] TEACHER: always think of saving every single bit of data,   {#772}
[00:42:34] TEACHER: every single byte at your using.   {#773}
[00:42:37] TEACHER: If not, reduce to the bare minimum that you can work.   {#774}
[00:42:41] TEACHER: Right?   {#775}
[00:42:42] TEACHER: Okay.   {#776}
[00:42:42] TEACHER: So this is good.   {#777}
[00:42:44] TEACHER: This is storage.   {#778}
[00:42:45] TEACHER: Now let me talk about a pitfall.   {#779}
[00:42:48] TEACHER: I'll throw a question.   {#780}
[00:42:49] TEACHER: Nitin, I'll throw a question at you.   {#781}
[00:42:51] TEACHER: Let's say we have a heap.   {#782}
[00:42:54] TEACHER: So let's say, oh, I have a square draw.   {#783}
[00:42:56] TEACHER: Now let's say this is our heap memory, right?   {#784}
[00:42:59] TEACHER: Where we know whenever we do malloc, wherever we are allocating the objects, new malloc,   {#785}
[00:43:04] TEACHER: whatever you are using, it allocates   {#786}
[00:43:07] TEACHER: the object in this   {#787}
[00:43:08] TEACHER: heap. And this is the heap that   {#788}
[00:43:10] TEACHER: you have. Now what happens   {#789}
[00:43:12] TEACHER: Nitin, can you like, you may know   {#790}
[00:43:14] TEACHER: it already, but what happens when you   {#791}
[00:43:17] TEACHER: exhaust   {#792}
[00:43:18] TEACHER: the heap? What happens then?   {#793}
[00:43:23] STUDENT_2: Eviction policy runs.   {#794}
[00:43:24] TEACHER: No, no, no. That cache runs   {#795}
[00:43:26] TEACHER: eviction policy. But in the   {#796}
[00:43:28] TEACHER: program heap that you have, let's say you are doing   {#797}
[00:43:30] TEACHER: continuous malloc forever in an   {#798}
[00:43:32] TEACHER: infinite loop. What would happen at the end of it?   {#799}
[00:43:35] TEACHER: Because you're allocating, let's say one MP chunk every time you have one GB RAM after   {#800}
[00:43:40] TEACHER: 1024 iterations, you're exhausting everything.   {#801}
[00:43:43] TEACHER: What happens in the 1025 iteration?   {#802}
[00:43:48] STUDENT_2: I guess to allocate some space, it moves the data from a memory to a disk.   {#803}
[00:43:56] TEACHER: No, you have to write it, but what does operating system do in that case when you try to allocate   {#804}
[00:44:00] TEACHER: beyond the maximum limit?   {#805}
[00:44:06] TEACHER: I'll give you   {#806}
[00:44:08] TEACHER: nostalgia.   {#807}
[00:44:14] TEACHER: Segmentation fault.   {#808}
[00:44:16] TEACHER: Right? Your program   {#809}
[00:44:17] TEACHER: crashes.   {#810}
[00:44:19] TEACHER: So this is what happens when we get   {#811}
[00:44:21] TEACHER: segmentation fault C, C, when we used to code   {#812}
[00:44:23] TEACHER: in C, first and second engineering.   {#813}
[00:44:26] TEACHER: That time we all suffered   {#814}
[00:44:27] TEACHER: from segmentation fault because we tried to   {#815}
[00:44:29] TEACHER: access memory allocated by someone   {#816}
[00:44:31] TEACHER: And this is also what happens when you go beyond your heap, beyond your allocated heap.   {#817}
[00:44:37] TEACHER: When you go beyond your allocated heap, what happens is you are entering into someone else's   {#818}
[00:44:41] TEACHER: territory and then your program crashes.   {#819}
[00:44:43] TEACHER: So this is one of the main reasons why you don't want to go beyond the heap that you have,   {#820}
[00:44:49] TEACHER: beyond the memory that is assigned to you.   {#821}
[00:44:51] TEACHER: So now my question is given that we have to restrict the access beyond a certain point.   {#822}
[00:45:01] TEACHER: responsibility that the cache that we are building continuously runs no matter what.   {#823}
[00:45:06] TEACHER: It does not, it should not go down anytime.   {#824}
[00:45:09] TEACHER: It should not crash anytime, which means we have to cap the memory usage.   {#825}
[00:45:22] TEACHER: So first question, how do you find that you are using how much memory, how much memory   {#826}
[00:45:28] TEACHER: your cache is using?   {#827}
[00:45:37] TEACHER: How will you find how much memory your cache is using?   {#828}
[00:45:47] TEACHER: Gaurav, what will you do to find how much memory your cache is using?   {#829}
[00:45:53] TEACHER: Just a while thought that there should be a command for this.   {#830}
[00:45:58] TEACHER: Okay, suggesting a command.   {#831}
[00:45:59] TEACHER: Okay, there is a command that tells you how much memory a process is using.   {#832}
[00:46:04] TEACHER: 100% there is a command for that, but that is very expensive because every time you are   {#833}
[00:46:07] TEACHER: doing it, you are making an OS interrupt because it would lead to a system call, which gets   {#834}
[00:46:12] TEACHER: that information because the amount of memory a process consumes is with kernel.   {#835}
[00:46:17] TEACHER: For your program to access it from the kernel, it needs to make a system call.   {#836}
[00:46:21] TEACHER: System call causes an interrupt.   {#837}
[00:46:23] TEACHER: It would slow down your entire system.   {#838}
[00:46:24] TEACHER: So command is not a way to do it.   {#839}
[00:46:27] TEACHER: not denying it but not performant enough   {#840}
[00:46:29] TEACHER: can we do better? Let's write   {#841}
[00:46:31] TEACHER: our own size function   {#842}
[00:46:33] TEACHER: Correct. Let's write   {#843}
[00:46:35] TEACHER: our own size function. So what would we do   {#844}
[00:46:37] TEACHER: for this? We know   {#845}
[00:46:39] TEACHER: how many keys have we stored until   {#846}
[00:46:41] STUDENT_6: now or they have expired   {#847}
[00:46:44] STUDENT_6: and we know   {#848}
[00:46:45] STUDENT_6: the size of each key value pair   {#849}
[00:46:48] TEACHER: let's multiply those numbers   {#850}
[00:46:49] TEACHER: with the key value size. Instead   {#851}
[00:46:51] TEACHER: of that let's just do   {#852}
[00:46:54] TEACHER: size   {#853}
[00:46:55] TEACHER: is plus equal to n every time we are adding a key or a value.   {#854}
[00:47:00] STUDENT_9: Yes.   {#855}
[00:47:00] TEACHER: Right.   {#856}
[00:47:01] TEACHER: Okay.   {#857}
[00:47:01] TEACHER: But by how much will you add?   {#858}
[00:47:04] STUDENT_6: Yeah.   {#859}
[00:47:05] STUDENT_6: That is an obligation because this value in my value is.   {#860}
[00:47:09] STUDENT_6: Correct.   {#861}
[00:47:10] STUDENT_6: It's a structure, right?   {#862}
[00:47:12] STUDENT_6: Yeah.   {#863}
[00:47:12] STUDENT_6: Whatever we can.   {#864}
[00:47:13] STUDENT_6: Go on.   {#865}
[00:47:14] STUDENT_6: We can find the size of this key value pair.   {#866}
[00:47:16] STUDENT_6: However, we cannot find the size of this value.   {#867}
[00:47:18] STUDENT_6: Actually, it would be hard to determine.   {#868}
[00:47:21] STUDENT_6: Right.   {#869}
[00:47:22] TEACHER: Correct.   {#870}
[00:47:23] TEACHER: Now that's what the challenge is, right?   {#871}
[00:47:25] TEACHER: Because not everything is deterministic.   {#872}
[00:47:27] TEACHER: You can just, you cannot just say, I'll do size of this and I'll get everything because   {#873}
[00:47:30] TEACHER: when you do size of this structure, this would spit out for four bites.   {#874}
[00:47:35] TEACHER: Right.   {#875}
[00:47:35] TEACHER: But in reality, this might be taking up a lot more than that.   {#876}
[00:47:39] TEACHER: So there has to be a better way to do this.   {#877}
[00:47:42] TEACHER: Which just solves this problem beautifully for everyone.   {#878}
[00:47:47] TEACHER: Like literally once and for all.   {#879}
[00:47:49] TEACHER: So just to provide a hint before I move to Jyotinder, just to provide a hint.   {#880}
[00:47:55] TEACHER: Thanks Gaurav for bringing that up, that you probe that size plus equal to something.   {#881}
[00:47:58] TEACHER: We have to maintain our own size.   {#882}
[00:48:00] TEACHER: This is exactly what every single cache does because using command is very expensive.   {#883}
[00:48:04] TEACHER: So everyone just implements or keeps track of the size that they are consumed.   {#884}
[00:48:10] TEACHER: So let me start with a hint so that we converge a little faster on this around how do we   {#885}
[00:48:18] TEACHER: allocate memory.   {#886}
[00:48:19] TEACHER: Assume you are writing code in C.   {#887}
[00:48:21] TEACHER: It holds true for Java, Python, whichever language you are using.   {#888}
[00:48:24] TEACHER: But I'm just referring to C because it just like they're all so used to it.   {#889}
---- OWNED SEGMENTS END ----

CTX| [00:48:29] TEACHER: So when we talk about allocating a memory on the heap, we use a function called malloc.   {#890}
CTX| [00:48:37] TEACHER: And maybe one we want to free it.   {#891}
CTX| [00:48:39] TEACHER: We use the function free to allocate or free to deallocate.   {#892}
CTX| [00:48:43] TEACHER: in malloc we pass the size that we want to allocate we want to allocate right and malloc   {#893}
CTX| [00:48:54] TEACHER: internally fire system call it grabs the memory in your ram and returns an address that you can   {#894}
CTX| [00:49:00] TEACHER: now start using right so that's what malloc does that's what free does uh free basically marks that   {#895}
CTX| [00:49:06] TEACHER: location as free for your operating system to say okay now this is free now i can do whatever i want   {#896}
CTX| [00:49:13] TEACHER: Now OS can choose to allocate that same chunk to other folks,   {#897}
CTX| [00:49:16] TEACHER: to other process, to other thing was sharing that same thing.   {#898}
CTX| [00:49:19] TEACHER: So given that we are using malloc and free to allocate and deallocate an object.   {#899}
CTX| [00:49:24] TEACHER: Now, just to, before we, before I ask that question.   {#900}
CTX| [00:49:26] TEACHER: Now, even when you are allocating this, my value, let's say someone is adding a new key in the system.   {#901}
