<!-- topic-candidate [00:00:01]: Agenda - storage engines, two problem statements -->

**[00:00:01] Teacher:** Great. Week 5, day 2nd and we'll continue our discussion on storage engines. The agenda for today are two very interesting problem set points that would not only be interesting but will also solidify a lot of core understanding that you need. When you're trying to build an interesting system or you're trying to get the maximum out of existing systems. So there are a lot of building blocks, a lot of foundational concepts that would help you think in a very different way. And both of them are actively used in production. It's not something that's just theoretical. You will find practical use of both of the systems to a huge extent. Okay.

<!-- topic-candidate [00:00:49]: Problem statement - word dictionary without a traditional database -->

[00:00:49] So let's start with the first one. The problem statement itself, and we'll directly start with the brainstorm. The problem statement in itself is very quote-unquote tricky. What we will do is we will build a word dictionary without using any traditional database. Like no MySQL, no Postgres, no MongoDB, no Redis, nothing. You have to be creative. You cannot use any traditional database. Sorry. You cannot use any traditional database to build this word dictionary. So you have to be creative into thinking, how will you do this? This thing needs to be scalable, which means you should not be worrying about scale, but then obviously some constraints would be there, but it needs to be quote-unquote scalable. And on both the sides.

[00:01:38] So typically when you design any system, you can bifurcate into two, one is storage, other is compute. Compute basically your API servers and storage means your database. Here you cannot use your database. So that's an interesting problem to solve, but it needs to be scalable with respect to both storage and API servers. It's okay to have high response time because that's not what we are trying to solve over here. Getting performance is different trick. We have done it in past at lot of systems. What we are more focusing on is this constraint that you cannot use a traditional database. So we are okay to have a little high response because we know hundreds of ways to improve it, like caching, [?batching | asr: "matching"] and all what we can improve. But let's not focus on that. Let's focus on the core part of it that it's okay for us to have a little high response time, but what we want is we want portability. Now portability, how come when we kick off our brainstorming, I would explicitly point out, hey, this is not making our system portable enough, and you'll understand the importance of portability the next system and next week. So I just compiled this problem statement in order to cover a lot of critical building blocks in day in and day out in real world.

[00:02:54] So we want portability. Our response time can be high. Okay. So you cannot use a traditional database. You have to be creative. Now here, one key point. In the dictionary, it's a standard English dictionary. You have English words. You have English meanings. When you do this, or when you're serving this dictionary, it's mostly read-only. You are not going to update. Imagine how frequently Oxford dictionary gets updated. Not much. Right. So what we are doing is we don't want to support continuous update. What we are doing is the words and the meanings will be updated weekly. It's not that it will be updated anytime you want. Weekly, you will be given a changelog file. In this changelog file, you will have the updated words and the updated meanings. Right. You would have this information. You have to take this changelog file and apply it to whatever storage engine or whatever database you are building. So you don't have to support pointed updates right there and there, like live pointed updates. These will be given to you weekly basis. Let's say every Sunday. Every Sunday you are given this new changelog file over email. You have to apply those changes over here.

[00:04:08] The lookup in this dictionary will always be a singular word. You don't have to think about autocomplete or not. Given a word, give me the meaning. That's it. If the word does not exist, return 404. The entire size of the dictionary is one terabyte. And the dictionary in total has 170,000 words. So total dictionary size is one terabyte. 170,000 words you have in the dictionary. So you have to build a system like this. Build a word dictionary without using any database. So no MySQL, no MongoDB, no Elasticsearch, no Redis, no Memcache, nothing, nothing, nothing. Be creative in your approach. Think about it. How would you go about it? And things that we would brainstorm on is around storage query, portability and seamless updates.

<!-- topic-candidate [00:05:00]: Storage - text file vs JSON file -->

[00:05:00] So let's start with the storage one. Go on, Raghun. [check: name spelling]

**[00:05:05] Student 4:** So basically there are two ways that I can think of. We can store this. One is a text file and other is a JSON format basically.

**[00:05:16] Teacher:** And one terabyte dictionary, JSON format.

**[00:05:20] Student 4:** Yeah, that's a bad way to go, but like just as a reference,

**[~00:05:20] Teacher:** how do you, how do you query a JSON format?

**[00:05:26] Student 4:** So basically it would be like [?unmarshaling | asr: "marshaling"] and marshaling, and that would be a very expensive process. Exactly. [check: "Exactly." may be the Teacher] That's why I'm like more inclined towards text file. So basically, is it okay if I like tell about updates also?

**[00:05:46] Teacher:** And let's cover this one part in depth. Okay. You mentioned text file. You mentioned JSON file. So when you said JSON file, you would want to store all the words and all the meanings in this one JSON file. Right. Yeah. Given that you brought up this topic, it's, it's, first of all, thank you for [?bringing | asr: "breaking"] this topic up, but now what would happen? A lot of us put a lot of data in JSON files. Now the disadvantage of storing data in JSON files, especially in this, in this use case, is that for you to check if a word exists in this JSON file or not, you anyway have to read the entire JSON file, deserialize it, create this in-memory object and then check, like, in-memory hash map or something, and then check. That becomes really costly. Size of the dictionary is one terabyte big. There is no direct way to access a particular thing in this JSON without reading the entire JSON file, because that's what the format says. Is why we cannot go with JSON file, a singular JSON file containing all the data, which means that what we can pick is we can pick a simple text file. Rahul, what will be the format of the text file?

**[00:06:57] Student 4 (Rahul):** So basically it would be like, it will be something like write-ahead log, which will have like, which will create some logs. Like this word is updated. This word is, like, this word is updated with this meaning dictionary.

**[00:07:08] Teacher:** How are you storing?

**[00:07:09] Student 4:** Yeah, so that's, that's that's how, like basically like this word equals to meaning equals to anything, kind of CSV. Yeah, you can

**[00:07:21] Teacher:** say that, right? [check: speaker boundary - "yeah you can say that" may be one speaker] So let's say I [?store | asr: "score"] apple comma fruit and then new line and then let's say you have Amazon

**[00:07:32] Student 4:** and it can have repetitive columns, like it can have like columns with the same name

**[00:07:39] Teacher:** There are no columns. You only have words and meanings.

**[00:07:41] Student 4:** Like rows with the same, same words.

**[00:07:47] Teacher:** No, no, no. We don't want same words in the dictionary. Imagine this file opened in any text editor. People would find it difficult. You want portability. You cannot have duplicate things over here.

**[00:08:02] Student 4:** It is related to the updates that I thought. But that's not

**[00:08:06] Teacher:** now I'm adding. [check: speaker boundary unclear around "But that's not now I'm adding"] Out of the box, right? Yeah. I know where you're going with this. Right. Now then you'll create an index and what not on top of it.

**[00:08:16] Student 4:** No, I was actually thinking about dirty reads and something like that in that context. But let's keep it simple

**[00:08:23] Teacher:** because this one constraint that I'm adding, that you cannot have repetitive things in this file, will make things very, let me add it. No repetitive entries. Okay. Okay. So now what will you do? Is this format according to you okay enough to start with? Yeah. For starters, it is okay. Okay. Just one question before I move to Hemant. Will you keep this file sorted in some fashion?

**[00:08:59] Student 4:** Okay. If there is a sorting constraint, then there will be like...

**[00:09:03] Teacher?:** No, there is no constraint. Will you keep it sorted?

**[00:09:07] Student 4:** No, I don't think so. Don't have any, like, like I, we don't have any restrictions on the response time, right, as of now. Like we are not bound to just give the answer quickly, so I will not prefer sorting here. Okay, so words can come and fit in any order here. Okay, yeah, okay, fine, okay.

**[~00:09:24] Teacher:** Hemant,

**[~00:09:24] Student 4:** else, else I will go with [?B-trees | asr: "the trees"] or something like that.

**[~00:09:32] Teacher:** Wait, wait, wait, we'll come to that, we'll come to that. That's how, because it's fun to discover it step by step, right? Because that, that solidifies the understanding for him. That's right, right. Okay. So Hemant, yeah, anything that you would want to change in this file format?

**[~00:09:52] Student 1 (Hemant):** Yeah, I maybe I would like to start from scratch, the way I have to think it. So if I say the biggest requirement, it is first searchable dictionary, the first, most important and the heavy thing is it's a, it should be a searchable via key. Let's say, I consider this thing as a key-value store, where key is a word, [?value can | asr: "well, you can"] be a two line, three line for an explanation of that word, searchable via key, plus it's a read-heavy operation. This dictionary is always maybe have a thousand to one ratio of read and write, or maybe something too skewed. Much more than that, to be honest. It's much more than thousand to one. So read-heavy searchable system is one thing. The only third thing which I have to take care when I'm going to add or modify a word, I should not kind of boil the ocean for changing a small thing. That's a second thought I am having.

**[00:11:00] Teacher:** What did you say about the last thing, when you are modifying something?

**[~00:11:02] Student 1:** So I'm saying it should not kind of disturb my whole system by doing a very small change. I should be able to update or add. So that's the third thing I have to keep in my mind when I'm designing it. If I design in a way
