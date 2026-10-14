**[02:03:28] Student 1 (Hemant):** Okay. I mean, whatever the requirement you have given, it looks like fitting in the way that structure of a memtable or SSTable works, you have something in memory as a sorted map.

**[02:03:47] Teacher:** No, no, immediately. I want to persist immediately. When I say put it, it is to immediately flush to the disk.

**[02:03:54] Student 1:** Oh, okay. Then if you have to immediately flush it. Okay. So let me understand. Maybe we are saying that as soon as the request comes, we will be able to persist it on the disk. Persist it at the disk for each put call. Yeah. Okay. I mean, then the best thing is like you create a ledger, where you start adding each and every, but it has its own challenge in terms of when you have to delete.

**[02:04:43] Teacher:** Wait, wait, let's stop. Let's stop. Step by step. You're saying write-ahead. What is write-ahead?

**[02:04:48] Student 1:** Like you have a file which has like each and every change that you are doing, you are like inserting as like appending in the, in place of going to figure it out where it has to go, adding at the end so that the [unclear: "magnet is discard best"] for that. I'm thinking why [unclear: "magnet is discard best"] for append only thing? Because you are, you, you, so when, when, when you know on this sector where your head was last, okay, you have to add more blocks on top of it. So you have not to look for your cylinder. I mean, your heads to go and seek it. A seek time, neither you need that your cylinder has to spin and reach to the right sector. So both the movement of like moving your all is gone. I'm at the right exact point where I have to add more blocks. That's the best I can do to get the benefit out of the characteristic of the disk.

**[02:06:01] Teacher:** Perfect.

**[02:06:03] Student 1:** So, so, so that is, and now what I'm worried about is the cons of it. When I have to delete it.

**[02:06:12] Teacher:** No, no. I mean, first let's convert on put [check: "convert on put" - converge/cover?], what happens when you put something to this? So let's say this is that append only file. So this is the file that you opened up. Right now let's say I got a request. It says put K1 V1. What will happen? What, what, what will you do?

**[02:06:30] Student 1:** So put K1 V1, K1 is a key, which is I need to add it. So I will add that key and corresponding value. I will add. So that much data is written in the disk and I need to have K1 and wherever the K1 is started, that sector address in somewhere in my memory table or somewhere else.

**[02:06:59] Teacher:** So then we'll basically come to that. We'll come to that. Let's first get the max performance out of it. When we hit get, right? First, let's focus on put, right? Are we doing the best when we are putting? Then we come to get and then we come to delete, right? So you'll cover the entire thing around put. Then I'll move to the next one. Then we'll cover get. Then we'll cover delete and then we'll cover get. Okay.

[02:07:19] So to cover the put part, you said that every time I'm issuing or I'm getting a put operation. Yes. I will just create new entries into this file. K2 V2 and then K3 V3. And then let's say if I get another request, let's say now one changes. Someone issued a put on K1 with V1 dash.

**[02:07:40] Student 1:** Now, I'm coming to that. So that's the next thing where we have to think about, because we cannot go and figure it out where K1 was and change the value. So we will append it. We will continue append it only. We need to figure out another process which [unclear: "goals and market is"] like obsolete data or [?marked | asr: "market"] for deletion or something like what they say, a [?tombstone | asr: "stone"] process or whatever [?tombstone | asr: "to stone"] process. We have to do it. But idea is always any put comes, you go and add no matter what.

**[02:08:24] Teacher:** No matter what. That's the best way. Perfect. So this is how you get the max performance out of put operation on a cheap magnetic disk storage. So put operation is [?sorted | asr: "started"].

<!-- topic-candidate [02:08:37]: Delete in an append-only file -->

[02:08:37] You had your hands raised. I was going to pull you in. But let me go to Pankaj. Pankaj, how will you do deletes? Let's say I got a delete request and I want to delete a particular key. How will you delete? Let's say I say delete K2. What will you do now?

**[02:08:54] Student 5 (Pankaj):** Yeah. So, I mean, what I was thinking is somewhere from our previous discussion, again, that we can go to this key and set the value to be something which will never occur. Like if all the values are always positive, we can set it to minus one.

**[02:09:10] Teacher:** So you are going back to that key. You're going over here and then deleting this and basically setting this to 0000 some special value.

**[02:09:19] Student?:** Yeah.

**[02:09:20] Teacher:** But this is append only file. You cannot write to any other location. Because it's append only file. You cannot go back and do something. Like you can only read from the previous stuff, but you cannot write to a previous stuff. That's what append only file does. So you're not allowed to go back and write anything over here.

**[02:09:44] Student 5:** So okay, I mean, in that case we will have to maintain some version sort of thing saying that K2 has been deleted now, so what can you do?

**[02:10:02] Teacher:** So which means now, now let's think from the first principles, we know how put works for us to delete. It's an append only file, but we have to write something that tells that K2 is deleted. So all we can do is append.

**[02:10:16] Student 5:** Yes. Correct. So I mean, we can append something like K2 with minus one that, that shows it's been deleted.

**[02:10:26] Teacher:** So effectively your delete operation is equal to put operation with some special value. Correct? Yes. Because put was order one like bare minimum, delete also becomes super efficient. Yes. Correct? So this is sorted. So we get the max out of our put, we get the best out of our delete. These two are sorted. Right? Okay.

<!-- topic-candidate [02:10:52]: Get - in-memory hash table of key to offset -->

[02:10:52] Now comes the next part. How would you [?perform | asr: "power"] get now that in this file structure that we have, we have multiple entries of the same key. Now for us to perform get, what is the naive way of doing it?

**[02:11:08] Student 3:** Just start looking at all the entries and return the latest one.

**[02:11:12] Teacher:** Return the latest one that seems very poor, but you want the best performance out of get as well. So what will you do when your reads are slow? You make. Okay, so let's do that. So how will you make it faster then? How will it get work?

**[02:11:38] Student 3:** Yeah, so my mind like overall is still going towards what Hemant had mentioned earlier, like around having an SSTable sort of structure here.

**[02:11:47] Teacher:** Simple hash table, right? SSTable is very different, hash table is very different, right?

**[02:11:51] Student 3:** Yeah, so for a hash table, like we can, like once we have put something into a write-ahead log, we maintain a hash table on the, like as soon as it's appended to the WAL, we update the hash table as well, so the offset of it, correct, not the actual value. Yeah. And whenever a read comes, we simply go to the offset in the WAL. And return that value.

**[02:12:18] Teacher:** Read it because in append only file you're allowed to do random reads, but you're not allowed to do random writes.

**[02:12:23] Student 3:** Yeah.

**[02:12:23] Teacher:** Okay. So just to cover it end to end, what would happen is let's say I got put K1 V1. I first write it to the disk over here and note with the offset, and then I update my in-memory hash table such that K1 points at O1. Then I received K2 V2. I update my in-memory with K2 O2 over here and let's say K3 goes to O3 over here and then let's say I got put K1 V1 dash. Now what will I do? I'll first write K1 V1 dash over here, then go to my hash table and I update it [?O4 | asr: "k4"] over here. So it goes over here and [unclear: "the first metric removes"] over here.

[02:13:03] Now let's say K2 is deleted. Now how, what, what deletes would look like? If I delete K2, I'll not point it over here. I just remove the entry from my memory hash table. If the entry does not exist, it does not exist. Yeah. Now it's really simple. Now what if given that we have the structure first, let's look at how get works, if you'd want to converge or if you just want to consult on how gets. What would be the flow? You get the request then.

**[02:13:35] Student 3:** So you get the request. You look it up in the in-memory hash table. If the entry is not there, you simply return 404 or something. If it is present, you go to the WAL and you go to the offset and read that value.

**[02:13:51] Teacher:** Perfect. Right? Okay.

<!-- topic-candidate [02:13:52]: Rebuilding the index after a crash -->

[02:13:52] Now what if your machine died and because this is in-memory, it is gone. Now what?

**[02:13:58] Student 3:** So you'll probably have to rebuild the indexes when you restart the server, [unclear: "video"] for a very long time.

**[02:14:04] Teacher:** That's fine. When you restart, you just go through this entire file and rebuild this index. Yeah. Straight forward. So get order one, you are doing the bare minimum in get, you are doing bare minimum in put. You are doing bare minimum in delete.

**[02:14:19] Student 3:** Yeah.

**[02:14:20] Teacher:** So it's the max that we could get out of this on a cheap magnetic disk storage. Right. So we just did read, write, update, read, write, update, delete, everything with full persistence. Right.

<!-- topic-candidate [02:14:35]: What could go wrong - limitations -->

[02:14:35] But what else? What could go wrong over here, Siddesh [check: name spelling]? We have this one [?file | asr: "pile"]. We're putting these entries. What could go wrong?
