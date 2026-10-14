**[01:02:35] Teacher:** So let's say we pass it as a configuration. This is a configuration. This is the path where it is stored on S3. Given that API server starts with that, what it would do, it from this path, it would read the first 16 bytes. It would read the first 16 bytes, interpret it as header. It would understand it is a dictionary file, like whatever our format is. From where it would know the index size. It would read, then it would make another S3 call to read those many bytes and create a hash table, in-memory hash table over here.

[01:03:05] What we would have, we would have an in-memory hash table, in-memory hash table, in-memory hash table over here. Then it would start serving the request. Whenever a get request comes in, goes to any API server, it would refer to this in-memory hash table. If the word exists, good enough. If it does not exist, 404, right? If it exists in the in-memory hash table, it would have that this word is present at this offset. So what it would do, it would take this, know the offset, go to that particular offset on S3 and read this file. How would it go? S3 API gives you that. In the S3 documentation, you can do a random read and it looks on this file, at this offset, read these many bytes. You can issue a command like this. But in case you are replacing S3 with, let's say, HDFS, has the exact same semantics. Network hard disk has the exact same semantics.

[01:04:00] Right? So you can seamlessly read the bytes that you are interested in and nothing before that, nothing after that. So you're doing the bare minimum over here. And this is how your normal gets would look like. But if you look the beauty of the system, the beauty of the system up right now is what you were just being able to do was to have pointed reads on S3. Very efficient reads. If you look carefully, what we just built is we are now able to read on a specific record from S3, just that much, without reading the entire file. So we are just built our database, because what a database is? Key-value store, right? We just build a key-value store that supports huge amount of gets on S3.

[01:04:56] So we got this ability to fire pointed queries on S3 without us having to read this entire file. And that is magical. It has a ton of applications. And we'll talk about them. We'll talk about how to extend this part into building various applications out of it.

<!-- topic-candidate [01:05:16]: Weekly updates -->

[01:05:16] Now this is still not done. There is still a big chunk remaining. Updates. Now for us to have seamless updates. I'll just copy this diagram because we are still not discussed on updates. So we discussed on storage, we discussed on query, we discussed on high level infra that like, but now what about updates? Now the updates that we are having, they are weekly updates, right? Updates are weekly, which means every week I'll get a file from Oxford which has the words that have changed and the new meaning for that. Apple change, let's say ball change, and let's say zoo change. These three words changed, right? Now what would we do? We have to apply these changes to the file that we have on S3, how would we go about it? Vikram?

**[01:06:15] Student 1 (Vikram):** Yeah, so as this is a weekly update, so we can have a batch job. So what it will do is it will add those newly words to the end.

**[01:06:24] Teacher:** Did you mean cron job, batch job?

**[01:06:28] Student 1:** Yeah, we can have a cron job also.

**[01:06:31] Teacher:** See, batch job is batch processing. Job is periodic updates. [check: a word before "job" may be missing (cron?)]

**[01:06:37] Student 1:** Yeah, periodic job. Whenever there is update from Oxford, we can trigger that job or we can also have the job also. And what it will do is it will update the dictionary and at the same time it will update the index, and so it will repackage the whole file, upload it to the S3 and where it would update what? [check: "where ... it would update what?" may be the teacher probing] Yeah, so we can have on another machine.

**[01:07:07] Teacher?:** Now we are talking.

**[01:07:08] Teacher:** Okay. You're spinning up another server. Yeah.

**[01:07:11] Student 1:** Now. And in that file, whenever we receive a new update, so we can recompute this whole file.

**[01:07:18] Teacher:** Do you have changelog on this server? Correct.

**[01:07:21] Student 1:** I will add these changelog files to the dictionary. So where is dictionary? Dictionary means we have to pull it from S3.

**[01:07:29] Teacher:** Correct. You'll download it from S3.

**[01:07:32] Student 1:** Then update the version of it. How? Because we know that in the header file, we have the version stored, right? At the initial byte.

**[01:07:42] Teacher:** That's okay. That's the last thing that we'll do. But how are you updating the dictionary? This file, how are you updating?

> **Student Question [01:07:49] - Student 1:** So are we getting only changelog or the whole?

**[01:07:53] Teacher (answer):** Only changelog.

**[01:07:54] Student 1:** Only changelog, right? So we can append it at the end because our dictionary is not sorted.

**[01:08:05] Teacher:** But then in that case, what would happen is the dictionary would be ever increasing, plus it would have duplicate entries. And I just added that you cannot have repetitive entries in the dictionary that you are serving.

**[01:08:18] Student?:** Correct.

**[01:08:19] Teacher:** Okay.

**[01:08:20] Student 1:** So now, so we can iterate the whole dictionary once and check that if the file, if the changelog has duplicate, what else keep it. Or if the meaning or the, if the meaning of the word is changed, then replace that thing like that.

**[01:08:38] Teacher:** Is it really that simple? Think of it. Think, go into a little more details of it.

**[01:08:46] Student 1:** Yeah, we can also have a hash of it and compare the hash with two, the existing one and the new one.

**[01:08:53] Teacher:** You are directly have them. See, changelog, anything has what needs to be changed. Simple. So you don't need hash sort of comparison. Like see, again, as I always say, it's easy to build complex systems. It's very difficult to build simple systems. Right? Think all the things that you really need. Hash, you don't need it, because changelog directly contains the changes that are, that on the dictionary, right? So how will you apply the changes that you have with the changelog in this file? What are the challenges that would come in?

**[01:09:27] Student?:** Challenges is to generate the diff actually.

**[01:09:31] Teacher:** Why do you want to generate a diff? Changelog already has this, right? You just want to apply this changes over here. What do you mean when you say to apply these changes?

**[01:09:39] Student 1:** Yeah, so correct. So we already have an index right here. already had it.

**[01:09:46] Teacher?:** Okay. Correct.

**[01:09:47] Student 1:** And we have a changelog. So what we can do is, so let's say the change of meaning of apple. Right? So we can use that index file and use the index and apply those changes or replace that the whole line of the CSV.

**[01:10:05] Teacher:** Okay. You're saying that if I have this file and let's say I have the word apple over here and and then let's say I have ball and I have a round object. Right. Okay. Now let's say my changelog contains. I should have drawn it. Let's say my changelog contains that apple, and now the new meaning is a round fruit. Now, how will these changes be applied over here? You say that using index, let's say you know the offset when it needs to be changed. Now, what will you do? by this? Yes. [check: start of "...by this? Yes." may be missing or a student's answer] Okay. What happens when you replace this by this? Will this entry move down?

**[01:10:53] Student?:** Yeah, we have to.

**[01:10:55] Student?:** Yeah. Correct.

<!-- topic-candidate [01:10:56]: Limitation of how disk works (file IO) -->

**[01:10:56] Teacher:** We have to do that happen in file IO. [check: "We have to do that happen in file IO." may be a student] No. What happens in file IO? Let's say if I write around fruit, what would happen? It would look something like this. So this is how, this is the limitation of how disk works. So when you go to a particular location and start writing, it would blindfoldedly write the bytes. Like in the IDE, when we add, we can hit enter and move other lines down. Because it is in memory. In memory, you can do that. On disk, you cannot. So when you go to this particular offset and start writing, apple, round, fruit. You are overriding the existing one. So you cannot just say I would replace it because it's not as trivial.

> **Student Question [01:11:52] - Student 2:** So how do we go?

**[01:12:06] Teacher:** Thanks, but thanks for making this. [check: phrase after a 14 s pause, may be garbled] So this is, see, these are the details that I want all of you to focus on. Right? Because this is what makes us better engineers, because it's easy to just say, I would replace it. But when you are going to write the code, that's what I always say. An engineer, a good engineer or a senior engineer always wear three hats. Product manager, architect, and an engineer. This is what an engineer hat looks like. You go, because imagine you are the one implementing it. What code will you write to implement it? And when you think of implementation, you realize the things that would break. Right. Okay. Let me pull in someone who has not spoken today. Yeah. Jodhinda, how would you solve this problem? [check: name spelling]

**[01:12:53] Student 3 (Jodhinda):** Can we have sort of like graveyard entries, which sort of replace the currently existing entries there? For example, if we have a new meaning for Apple, we append it to the end of the file and the previous.

**[01:13:04] Teacher:** No repetitive entries.

**[01:13:07] Student 3:** Okay. Well, okay. So I was thinking like you just sort of waste, waste that space for some time and later run some sort of compaction process after.

**[01:13:19] Teacher:** No, but we don't see it would work well when you are doing live updates. This is an even weekly update. So have it very clean up it directly. Right.

**[01:13:27] Student 2:** Yeah.

**[01:13:29] Teacher:** Shreya.

**[01:13:33] Student 9 (Shreya):** Hello. Yeah. Yeah. Approach would be to just, a very naive approach would be to look for every word.
