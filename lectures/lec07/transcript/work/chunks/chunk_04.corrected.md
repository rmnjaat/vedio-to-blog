**[00:36:15] Student 1:** Okay, now we are looking for like a memory area which we, where we can put anything in general, like that or list or anything. Normally, if you think about from any hash table implementation, it tries to put values [unclear: "via time"]. So if we talk about, let's say, Java 1, I know...

**[00:36:39] Teacher:** No, no, that is good. No, Java is good.

**[00:36:42] Student 1:** Okay, so it takes like a value as a data type, which value may be a general object. It may be like [?a wrapper | asr: "a wrap"] or primitives, integer, string. And then based on whatever the object is, it's takes the pointer of that object. And that object goes in heap, but we save the object. So same thing we can do here also. Either we can create pointers for that, or if it is like a primitive values, as we said, we can store in place, in place of pointers.

**[00:37:20] Teacher:** I'm so loving how you are using the right term, primitive values, at this. Brilliant. Okay. So this is what you are storing. So now if you were to wrap it now, for example, when someone gives you a command, for example, you can add to a set, but you have to push to a list. So when someone says, if it's a set, I need to support add command. If it's a list, I need to support push command. How do you know what type your value is? Because then depending on the command that is fired, you have to check if that value is of that particular type or not. Correct. How will you know what type the value is?

**[00:38:08] Student 1:** Then somewhere in the key itself, we have to add something which will give me that, because in memory, everything is like an address.

**[00:38:18] Teacher:** Perfect.

**[00:38:18] Student 1:** How you represent internally in a memory representation is a different thing. What we are worried about is via key. I just need [?a way | asr: "to wave"] to figure it out. In one case, it is an add. In another case, it is a push.

**[00:38:33] Student 8:** Hmm.

**[00:38:34] Student 1:** So we need to have definitely with the key some metadata, which talks about this key represents a data type, which is, let's say, a set, or which is, that's a list in another case.

**[00:38:46] Teacher:** [unclear: "Pay to represent."] But why key? Why not value?

**[00:38:53] Student 1:** What I'm thinking, it will make things easy because via key only you will access everything.

**[00:39:00] Teacher:** But then imagine how will you store that when you try to implement it, key is a string.

**[00:39:06] Student 1:** Yes. Right.

**[00:39:06] Teacher:** Now in string, if you're prefixing it with something or you're making it into an object, that would make your lookups very complicated, every time you have to dereference and whatnot, that will be a challenge. So a better way to do this, just to add to that point, a better way to do this over here is you store key as a normal key and in the value, you create your own custom type. Let's say it's called my value, and my value, you have value, which is pointing to like, it's a void pointer or an object type, which literally can refer to anything, and a type, which is an integer that refers to, zero is, then it's string. One is integer, [?two is set | asr: "to a set"], three is list, right? This way, whenever you are doing a certain operation, let's say someone fired add on a key called my set. Right? So it's an allowed operation. So when you do this, you check if the key, you get the value, you get the type of it. You see if this, the type that you have supports this operation or not. If yes, you use this object and you then typecast it and then you put that operation.

**[00:40:25] Student 1:** Yeah, I thought that way. But before that, I thought maybe a bit optimization will be possible if we do via key, because we may not need too many data types. Mostly, let's say 5-10 data types. If I take two bytes on top of two bits, even on top of a key, that will give me like four options. If I add three, I will get nine options. Maybe just representing half of a byte, four bits, will give me 16 different data types possible. I can, if I ever think about future, I can take a byte and even say like I will have two to power eight possible data types supported next 10, 20 years in my implementation that I can do. So that's why I thought, I think adding a wrapper on top of a value will be a bit more processing compared to adding on. That's why I did it.

**[00:41:21] Teacher:** Brilliant point. Which is why Redis does this. It uses four bits to store it because it does, it cannot go beyond a certain number of data types ever. So they are basically capping it down. So this is very important point, folks. Thanks so much for bringing this up. This shows you when you're designing something in memory, you have to be very cautious on every single byte, every single bit that you're using, get the max out of it, because RAM is very costly. Try to take as less of a space as possible. Right.

[00:41:58] Thanks so much for bringing this up because this is up until now. We never discussed this, but this optimization Redis does exactly this. Redis stores a lot of other meta information also along with this. That's why we wrapped it in a object over here. In Redis it's struct, it built in C. But it adds other meta information over here, making it extensible. We'll talk about it when we go into other features of it, [unclear: "cashflow"], eviction and [?whatnot | asr: "what part"]. But this is very important that whenever you're designing something in memory, always think of saving every single bit of data, every single byte at your using. If not, reduce to the bare minimum that you can work. Right? Okay. So this is good. This is storage.

<!-- topic-candidate [00:42:45]: Heap exhaustion and segmentation fault -->

[00:42:45] Now let me talk about a pitfall. I'll throw a question. Nitin, I'll throw a question at you. Let's say we have a heap. So let's say, oh, I have a square draw. Now let's say this is our heap memory, right? Where we know whenever we do malloc, wherever we are allocating the objects, new, malloc, whatever you are using, it allocates the object in this heap. And this is the heap that you have. Now what happens, Nitin, can you like, you may know it already, but what happens when you exhaust the heap? What happens then?

> **Student Question [00:43:23] - Student 2 (Nitin):** Eviction policy runs.

**[00:43:24] Teacher:** No, no, no. That cache runs eviction policy. But in the program heap that you have, let's say you are doing continuous malloc forever in an infinite loop. What would happen at the end of it? Because you're allocating, let's say, one MB chunk every time, you have one GB RAM, after 1024 iterations, you're exhausting everything. What happens in the 1025 iteration?

**[00:43:48] Student 2:** I guess to allocate some space, it moves the data from a memory to a disk.

**[00:43:56] Teacher:** No, you have to write it, but what does operating system do in that case when you try to allocate beyond the maximum limit? I'll give you nostalgia. Segmentation fault. Right? Your program crashes. So this is what happens when we get segmentation fault. C, C, when we used to code in C, first and second engineering. That time we all suffered from segmentation fault because we tried to access memory allocated by someone. And this is also what happens when you go beyond your heap, beyond your allocated heap. When you go beyond your allocated heap, what happens is you are entering into someone else's territory and then your program crashes. So this is one of the main reasons why you don't want to go beyond the heap that you have, beyond the memory that is assigned to you.

<!-- topic-candidate [00:44:51]: Capping memory usage: how much memory the cache is using -->

[00:44:51] So now my question is, given that we have to restrict the access beyond a certain point. [check: sentence starts mid-way; words may be missing before "responsibility"] Responsibility that the cache that we are building continuously runs no matter what. It does not, it should not go down anytime. It should not crash anytime, which means we have to cap the memory usage. So first question, how do you find that you are using how much memory, how much memory your cache is using? How will you find how much memory your cache is using? Gaurav, what will you do to find how much memory your cache is using?

**[00:45:53] Student?:** Just a [?wild thought | asr: "while thought"] that there should be a command for this.

**[00:45:58] Teacher:** Okay, suggesting a command. Okay, there is a command that tells you how much memory a process is using. 100% there is a command for that, but that is very expensive because every time you are doing it, you are making an OS interrupt, because it would lead to a system call, which gets that information, because the amount of memory a process consumes is with kernel. For your program to access it from the kernel, it needs to make a system call. System call causes an interrupt. It would slow down your entire system. So command is not a way to do it. Not denying it, but not performant enough. Can we do better? Let's write our own size function. Correct. Let's write our own size function. So what would we do for this? We know how many keys have we stored until [check: speaker boundary - "We know how many keys..." may be Student 6 (Gaurav) speaking; teacher later credits Gaurav for "size plus equal to"]

**[00:46:41] Student 6 (Gaurav):** now, or they have expired, and we know the size of each key-value pair.

**[00:46:48] Teacher:** Let's multiply those numbers with the key-value size. Instead of that, let's just do size is plus equal to n every time we are adding a key or a value.

**[00:47:00] Teacher?:** Yes.

**[00:47:00] Teacher:** Right. Okay. But by how much will you add?

**[00:47:04] Student 6:** Yeah. That is an [unclear: "obligation"] because this value in my value is. Correct. It's a structure, right? Yeah. Whatever we can. Go on. We can find the size of this key-value pair. However, we cannot find the size of this value. Actually, it would be hard to determine. Right.

**[00:47:22] Teacher:** Correct. Now that's what the challenge is, right? Because not everything is deterministic. You can just, you cannot just say, I'll do size of this and I'll get everything, because when you do size of this structure, this would spit out for four bytes. Right. But in reality, this might be taking up a lot more than that. So there has to be a better way to do this. Which just solves this problem beautifully for everyone. Like literally once and for all.

[00:47:49] So just to provide a hint before I move to Jyotinder [check: name spelling], just to provide a hint. Thanks Gaurav for bringing that up, that you probe that size plus equal to something. We have to maintain our own size. This is exactly what every single cache does, because using command is very expensive. So everyone just implements or keeps track of the size that they are consumed. So let me start with a hint so that we converge a little faster on this, around how do we allocate memory. Assume you are writing code in C. It holds true for Java, Python, whichever language you are using. But I'm just referring to C because it just, like, they're all so used to it.
