**[01:26:19] Teacher:** I'll take a question at the end. We'll take a quick break because we spent hour and a half talking about it. Now, I hope I made you fall in love with relational databases. Explore them. Explore them. And next time, whenever someone asks relational databases, don't scale. And I'll just show them relational databases scale. You just need to know how to do it, as simple as. Right? Never believe any generic string, right? Relation databases don't scale, non-relational database scale, relation database you can't do partitioning, or you can do partitioning, sharding, everything on relational data, right?

<!-- topic-candidate [01:26:52]: Break *(admin)* -->

[01:26:52] *(admin)* Okay, great. So we'll take a quick break, we'll take a quick break for five minutes, we'll come back at 10 33, and next one are we'll discuss distributed key values, right? We'll go in depth on the implementation side of it, we'll build a distributed key-value store databases. That's it. So this would again help us understand the core of a relational database, few interesting things about it, some things that we'd never think about when we designing, we never think about implementation. Here we'll pick up those nitty gritties on performance improvement of relational database, how to write, like how to do what and when and why, and more importantly, how, right? We'll go all of that. And a lot of interesting detours around how Redis does it, I just sprinkling it over here, right? We'll go, we'll touch upon a lot of stuff. We'll take a break till 10 33, in next five minutes we'll come back and we'll talk about distribute key-value store. Thanks folks, see you folks in five minutes.

[break ~01:27:55-01:33:13]

<!-- topic-candidate [01:33:31]: Distributed key-value store on a relational database -->

**[01:33:31] Teacher:** Now, on the second half, now we'll have nice brainstorming. We did discuss that, but now from now almost for every system that we covered, we'll have a detailed brainstorming rather than me just rambling about solution. We'll go into why we are making those decisions. Okay. So now what we'll do is we'll build a distributed key-value store on relational database. First let's, whenever you hear, I've deliberately added the term distributed over here because folks love it. Number one. Number two, that I want to emphasize on this fact that when you are thrown into a situation where you want to design something distributed and it's okay on day zero, you don't design it to be distributed. The way you should approach is just first implement a single node thing and then think about distributed. A lot of people like directly jump into, yeah, leader election and this and Paxos and Raft and whatnot. No, don't confuse. Don't get confused at all. Start simple and then scale out. Okay.

[01:34:39] So the requirement for this is we need infinitely scalable. By default, everything needs to be infinitely scalable. And the core operations that we support are get, put, delete and TTL. Getting a key, putting a key, deleting a key and TTL, expiration on it, auto expiration. And this is not some made up statement or some made up design. Apache Ignite, one of the most popular key-value store built on top of relational DB. It uses this, supports this, and for me to understand the system in depth, went through their source code. As simple as that. But the best part of this is we'll not just restrain ourselves, will also take small detours onto understanding how Redis also do few of these things, right? That will be quite interesting for you to know. Okay, the brainstorming that we'll do, we'll do it in five parts: storage, optimization of storage, inserts, update and TTL, [unclear: "this what will bring someone"].

<!-- topic-candidate [01:35:40]: Storage - schema of the key-value store -->

[01:35:40] So let's start with storage. How would you store the data? Raise your hands, I'll pull you in. How will you store this data? [?Single node | asr: "Single load"]? What would be the schema? Sandeep?

**[01:35:58] Student 1:** I would store it in an array. That would be my first option. Array of some...

**[01:36:03] Student?:** Sandeep, inaudible. [check: possibly the Teacher telling Sandeep he is inaudible]

**[01:36:05] Student 1:** *(admin)* Hello? Are you able to hear me now, Arpit? Hello?

**[01:36:10] Teacher:** *(admin)* I'll move on. Rahul, go on.

**[01:36:14] Student 12:** *(admin)* Hey, are you able to hear me now?

**[01:36:16] Teacher:** *(admin)* Okay. Oh, sorry. It's my headphone or something. Wait, wait, wait, wait. No.

**[~01:36:21] Student 1:** My headset is working, let me quickly test. Sorry, I'm, I'm able to hear here then, no? Yeah, right, it's working fine, I've gone. Sorry. Yeah, yeah, so basically the schema would be a primary key, which would be our key, and there for the value part we can have some array or like some kind of our dynamic structure basically. Relational data is what? Ahre? Okay. [check: "Relational data is what? Ahre?" may be a Teacher interjection] So I guess string would be the better choice if that's the case. Like key is basically primary key, which will be, which will be indexed, and values will be strings, I guess. Yeah. So key is a string or an integer or what he can be, let's just say like, key can be string also. Like we are like, if we are not concerned about, like if we are not concerned about

**[01:37:25] Teacher:** [check: "storage size" may end Student 1's sentence] storage size, why we should not be, it's a database. We should always be concerned about it. Right. So always you would see, key, primary key is fine, but picking the right type for any database is really important. So you have, when you're designing a key-value store, and let's say you design it, let's say you pick key to be a primary key. But when you're designing a type, you cannot just have any type, because this is what would determine what kind of keys are you supporting in the system. Like if you would only want to support integer keys, then well, you can have a key as integer. If you're saying that, hey, I would support strings, then how big of a string would that be? So as a database engineer or as a database designer, you need to know how big your key would be. So let's say you pick [?varchar | asr: "where can"] I say 16. I'm picking a smaller size. You might go for 24, 30 to 60. [check: "30 to 60" may be "32, 64"]

**[01:38:21] Student 1:** Based on the requirements. Based on the requirements. [check: possible ASR duplicate, or Teacher echoing]

**[01:38:23] Teacher:** But once you fix it, you cannot change it. So ensure that you are, you like, whenever you are designing a database, you know your requirements really well. Okay. What's the type of the value? You said string.

**[01:38:36] Student 1:** Yeah. The string, like if we are storing JSON in that, it depends like what we are storing. Okay. If we are like storing some values, simple values, then we can, we can use integer. But like, if you are storing JSON objects or something like that, we will need a bigger, bigger string, more than 200, 300 words, maybe. So yeah, it actually depends on the use case.

**[01:39:00] Teacher:** No, but then you have to pick something that works for all.
