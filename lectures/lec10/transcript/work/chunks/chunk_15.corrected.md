> **Student Question [02:52:08] - Student 2:** So like what we are saying here is writing the whole value is not atomic, but writing the checksum and the header is. Yes.

**[02:52:19] Teacher (answer):** Writing this is atomic.

> **Student Question [02:52:23] - Student 2:** Yeah, my question is coming from, so like one is what, so different file systems and kernels now will give you different guarantees, right? I just want to understand a pattern here. So is the pattern that like let us suppose we are assuming that this is under the block size. So it is guaranteed by the kernel to us. So we write that first and then write the rest of the things later. Because this value can be 1 MB.

**[02:52:50] Teacher (answer):** Now, your kernel might not give that guarantee. Right.

**[02:52:54] Student 2:** That's right. Yeah. That is what I was trying to understand because now when you try to install this software on different kernels, behaviors may be different, but we have to be, and that's how this whole WAL thing goes. Right.

**[02:53:06] Teacher:** So, but in any case, if you look carefully, this is eight bytes, four bytes, four bytes, four bytes, which means roughly four, four, five or 20, 20 bytes, 20 bytes, no matter. It will definitely be there. Got it.

**[02:53:22] Student 2:** Because see, generally there are also more paranoid systems where kernels don't guarantee this. So you do have a separate WAL system, but I get the design. That's why I was trying to understand the pattern here. This seems to be a very interesting pattern because this is more performant.

**[02:53:43] Teacher:** But this is exactly where these interesting nitty gritty come in. Right? Like we just tend to say, I will write it in a WAL file, but how exactly. Right. This is what makes us better every day because a lot of people just skip this. No one in almost any system design you pick up or any system, any overview will be covered. That's why they are called overview. No one talks about integrity at all. No one talks about security and integrity. These are like lone wolves out there. Just someone, one passionate engineer thinks about integrity, right? Otherwise it's all gone for a toss. Work just fine. But in reality, it does not. But when you go into databases details, you would see all this.

[02:54:24] And by the way, folks, Hussain Nasir [check: name spelling] is on fire. He is posting Postgres internals like anything, like going into record level format and whatnot. My God, I don't know what happened to him. He is just going through the Postgres source code. So go through his Medium blogs. They are very fascinating. And you understand the things that we just discussed, integrity and all. That this is a Postgres record format. This is how page is there. He found that one very interesting comment and that blew my mind. The number of pages Postgres takes up to store meta information versus actual data. That just blew my mind. So read that. He's on fire for some reason. He's very obsessed with Postgres now. Diving really deep into it. Every day he's putting out videos, not sure he gave up on job or what, he is on fire.

[02:55:21] So once you have a bit of understanding, like implementing Bitcask, once you have this bit of understanding of how file IO works, highly recommend you to check out Hussain Nasir. He's not created videos on it, but on Medium blog post, he has posted a ton of amazing stuff on Postgres internals, right? But very into implementation detail, like actual source code snippet. This is where this is happening. Page is getting created. [unclear: "The artist"] is getting flushed. This is what the format is. Those part, right. It's really deep into Postgres. So highly recommended to check that out. Once you have this understanding, if you have this understanding already, what's that, read that fascinating stuff is doing then.

<!-- topic-candidate [02:56:05]: Q&A - 1 TB dictionary size, S3 cost -->

> **Student Question [02:56:05] - Student 2:** Thanks for that. So one, one more question. Can we go back to the initial design of the S3 thing? So there is one question that I have. Maybe I'm not, I'm not aware of that. Yeah. So this S3 thing, right? So, well, one is the calculation part. I am still not able to get how come, even if you get 200 K words, right. This one terabyte to me, like sound. Yeah, because I was checking per entry. It is like an MBs of record. I, I was blown by that. So I don't know what's going on there, but.

**[02:56:42] Teacher (answer):** You know, great. Like you should ask this critical question. So I just added one terabyte, but now I'll just justify this size, right?

**[02:56:51] Student?:** Okay, yeah.

**[02:56:52] Teacher:** So this one terabyte I added so that it becomes impossible, like so that I bring up this point of cost that you cannot just copy this dictionary on every API server, right? That's why I wanted to add it. Otherwise, like you'd say, it's so small, I can just copy it over all the things.

**[02:57:08] Student 2:** That's what I was going to say.

**[02:57:10] Teacher:** I wanted to do that so that I touch upon network attached storage, this, I touch upon portability, right. But now in order to justify it, now this meaning, assume it's multimedia baked in audio, video visualization of it. Right. That's why I just wanted to enforce that, but that you cannot possibly copy it on every API server.

**[02:57:37] Student?:** [unclear: "So that's why my team."]

**[02:57:38] Student 2:** Right. No, no. Yeah. Thanks. No, no, no. Just like wondering what happened there, because I was thinking I'll just... And that's what I was thinking, oh man, like this per MB records, maybe I'm missing something.

> **Student Question [~02:57:50] - Student 2:** But the question that I had was, so the way what we have designed here, let us suppose I actually want to expose it. Okay. Now per API, I am doing one S3 call. So how costly is it? That is what I wanted to understand from you. Like a point call. And okay, I understand I can add caching and then my, all of those stuff will come down. But then when I was thinking alternatively, I was trying to think that, okay, I can have some kind of frequency and then eventually what will happen is I will store my frequency-based words and all of that. But I just wanted to understand is that over-optimization if I'm hosting a real service or is like how costly is S3?

**[02:58:29] Teacher (answer):** In real world, you have to do that. This is where I'm like directly querying the S3 to get it. So my intention for that was I wanted to point out that it is possible to make pointed reads on S3. Got it. This way you can build a lot of others AWS S3 Athena will build a multi-tiered storage, a cost efficient auto solution for Amazon next week. [check: garbled list of next-week designs] All of that would fall into place there because we are able to now literally do a pointed read on S3 of a particular order ID. You can now move your partial cold, like this is a classic cold storage mechanism. They're moving data from hot tier to cold tier to save cost. But when you move to cold tier, you're not just archiving, but still giving a seamless ability to query the data on S3. This enables us to do that.

[02:59:16] And given it is infrequent, it's okay to have higher latency. Cost would be there, right? S3 is not cheap. Network IO is not cheap. S3 will take its own sweet time. It's not very performant as well, but it is very cheap. So if you're having infrequent reads, you can make it on S3. I use word dictionary as an example because it's easy to understand. If I say key values will be filled with key values. I just use word dictionary so that I can pinpoint this, how small the indexes can be and not get overwhelmed by this number. So 170,000 seems a huge word, like a huge set of words, but in reality, when you multiply it by your index size, like the per index entry turns out to be MB. So we take MBs very lightly, but M stands for a million, a million bytes. Right. So we just take million and billion for like, we'll take it very lightly. They are not very lightweight. And it is still contain a huge amount of information. Those were my motivations to do it so that I set it up for other parts which becomes very easy to understand.

> **Student Question [03:00:19] - Student 2:** And last question on the, like the same part where we said that we will just trigger redeployment. Just want to understand one detail there. So when you say redeployment, basically you are spinning up new machines, the load balancer will be intact, you will just add API servers.

**[03:00:37] Teacher (answer):** You remove one. By default, cloud provider gives you this out of the box. Rolling deployment is out of the box.

**[03:00:44] Student 2:** Yeah, this is a super one. I think this is coming from more experience because as engineers, we would write some code, but there is already a way without even writing a single line of code.

**[03:00:54] Teacher:** So this is what I actually did for a couple of my services. I thought of adding Redis Pub/Sub and whatnot and have [?APIs exposed | asr: "APIs Expos"] and whatnot. We are so accustomed to write code to solve a problem. [check: words before "the box" may be lost] The box. I wanted to just cover this part that infrastructure is ours. We can do whatever we want with it. So just make a call, trigger a deployment.

**[03:01:19] Student 2:** This was a great idea. I mean, like without writing a code and then you don't have all those have a call then maintaining and all that stuff. You just use what you have done.

**[03:01:27] Teacher:** Thanks sir. Superb. Anyone else? Any other question? No, Dan, no pop-up allowed. [check: name "Dan" / "Thanks sir"]

<!-- topic-candidate [03:01:39]: Q&A - offsets, index size in header, sorted merge -->

> **Student Question [03:01:39] - Student 1:** So just a basic one. So we are storing the offsets. So offsets are the line numbers or the actual byte from where that, you know, record is starting that offset. Right. Okay. Sure. And what was the other question? I actually forgot. One was offset. Offset. Sorry, can you please go to that page? We were discussing about the offset and the, the word dictionary.

**[03:02:14] Teacher:** Sorry. Offset. We're discussing offsets over here. Yeah.

> **Student Question [03:02:20] - Student 1:** Yeah. So here the, the, the index where you are mentioning the index. So initially you are storing the header where, you know, by, by offset of the data, basically the bytes or the versions or all that information. The size of the index is basically the complete index file, which we are storing in this file, right? Correct.

**[03:02:41] Teacher (answer):** This is the size of the index. Yes, the size of the index.

**[03:02:44] Student 1:** Initially, my understanding was, it is just the location of that file stored and not the actual file stored.

**[03:02:51] Teacher:** This is the actual size of the number of bytes that you are storing in the index that gets stored there. Right, right. So you first read the header, you get the index size. Then you read these many bytes here, you get the index. Then you start serving this data.

> **Student Question [03:03:07] - Student 1:** But Arpit now, whenever, whenever, so let's say whenever we are doing any updates, so this size might be, you know, changing every time. So every time we are updating this header, right?

**[03:03:18] Teacher (answer):** Yeah. We are recreating this header. So when you're doing this merge and compaction, where did it go? We're doing this merger, you're creating this dictionary, you're creating index also, you're creating header also. This new file, this entire new file that you are creating.

> **Student Question [03:03:31] - Student 1:** Right. Right. Now the question is, because initially we have never discussed this thing that, you know, this file has to be sorted. Only when we started discussion discussion about the merger, then only we discussed that, you know, it has to be sorted. So what is the idea of sorting there? Because we never discussed that file. Yeah, we are not.

**[03:03:55] Teacher (answer):** We did not touch upon that because we did not have a need when we went into intricate details. We realized that keeping it sorted makes our merging very easy. Like merging changelog into actual dictionary, the original dictionary becomes very easy, very efficient.

> **Student Question [03:04:11] - Student 1:** But, but, but the thing is that now keeping the file is sorted in, I mean, keeping this file sorted will, would create another level of complexity. So how would we approach that?

**[03:04:24] Teacher (answer):** Why is that complex?

**[03:04:26] Student 1:** Because he's storing 170,000 records. And now you're trying to insert into every time you have to do what, binary search or a linear search, but you don't have to search anything. Right. It's direct lookup.

**[03:04:39] Teacher:** You have index, index has offset to directly go to this offset reader.

**[03:04:42] Student 1:** Like, right. But inserting a new entry, how would you decide that? Where do I need to insert? So let's say, right. Here it is. This is what, how you're creating this new dictionary, right? Change. Okay. Got it. Got it. Got it. Okay. So this idea only will [unclear: "keep on the keeper"]. Keep this thing sorted every time.

**[03:05:04] Teacher:** Correct. This is sorted. This is sorted. This is sorted. This is sorted. [check: possible ASR duplicate]

**[03:05:07] Student 1:** Right, right. Got it, got it, got it. I thought that it should be sorted before. Now, changelog.

**[03:05:12] Teacher:** So, we are just ensuring that original dictionary is sorted. Changelog is sorted. The new one would be sorted. Now, this would become the old for the next updates. Next week updates. Right, right. It will always be sorted. But because of the sortedness of the words that we have, merging of dictionary and changelog becomes [?order n | asr: "order and"] operation. That's it. Just one iteration over this file or both the files and you have this new file created. You don't have to do n square complexity.

**[03:05:38] Student 1:** Actually, I started looking into this complete record but I forgot that from the very first record we are sorting this thing. So yeah.

**[03:05:45] Student?:** So yeah, that's good.

**[03:05:47] Teacher:** These are the details I want. Thanks for asking this question. These are the things that, you know, brings that clarity, like sparks that interest. This is the optimization that we were talking about. Like why things needs to be sorted and which is why the entire domain of computer science is obsessed with sorted data. This is why it just makes life so simple. It makes processes so simple. Right. Thanks.

<!-- topic-candidate [03:06:09]: Class close (admin) -->

**[03:06:09] Teacher:** *(admin)* Thanks. Great. Any other question? Anyone? No? Done? That's it? No for what? Okay. That's it. Thanks folks for tuning in. I'll upload the recordings by end of the day. See you folks next week. We'll also share the pre-read. So do both. Thanks folks. See you next week. Bye-bye. Thank you. [check: possibly hallucinated in silence]
