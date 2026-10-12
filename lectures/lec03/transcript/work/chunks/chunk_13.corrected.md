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

<!-- topic-candidate [02:25:27]: Wrap-up and next week *(admin)* -->

**[02:25:27] Teacher:** *(admin)* Great. Any other question anyone? No? Brilliant. Next week is all about social networks. I'll upload the recordings and share the questions by the end of the day. Mostly by 3 or 5 today, I need to go out somewhere. But next week is all about social networks. We'll go in depth of, don't spoil the fun man. Wait, I'll pull you in. Wait, wait. What am I saying? I'll upload the recordings by evening. Do read the pre-reads.

[02:26:00] Next week, we'll go in depth of CDNs, how they are used, what they are used. We'll build a bunch of social network services, which are essential in it. I'll now talk about, now that three weeks are got, we have built enough context. Now we'll think from senior engineer's perspective. Start putting your folks into situation where you have to wear multiple hats in order to implement different systems instead of just now. Systems will become more and more ambiguous, that you have to come up with requirements, you have to come up with design, you have to do a bunch of fancy stuff there. So a lot of interesting things planned for fourth, fifth, sixth week. You'll have quite, quite bit of fun next week. Right? Thanks, folks. See you next week. Go on, Harsh.

<!-- topic-candidate [~02:26:36]: Q&A -->

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
