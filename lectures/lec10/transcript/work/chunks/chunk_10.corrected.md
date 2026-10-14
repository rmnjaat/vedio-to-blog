**[01:50:07] Student 1:** creating a new VM, doing the whole redeployment. Is there a better way we can do it?

**[01:50:12] Teacher:** I, maybe I am like, no, there are, there are, I can imagine three ways to do it, but it's just, just make things little more complicated. For example, I'll give an example.

**[01:50:20] Student?:** Sure.

**[01:50:21] Teacher:** What you can do is instead of doing redeployment of it, have like what I think Sitesh [check: name spelling] mentioned that just have API endpoints that would trigger reload of the API servers or trigger API servers, make it reactive instead of doing redeployment. Seems big enough, just have [unclear: "API inputs experts"] that you invoke, which tells them to now go and pick the new file from S3. That's right. That is one way to do it. But I'm just making things simple because this is an out of the box approach. Thinking of triggering a deployment as part of an [?API server | asr: "all server"] reload is an out of the box approach, which a lot of engineers just don't think about. So it's just that I'm proving you all to think in that direction that can we come up with something as simple [unclear: "I just triggered a problem"] because it's anyway, the cost remains exactly the same, but not having to have pull the metadata and file or do reactive or have reactive Pub/Sub again. Now those sorts of complexities you can totally avoid. Right. And just that I chose this to prove you in the direction that we can, we control our own infrastructure so we can do something with it if we want. That's it. That's the only thing. Okay.

[01:51:32] But, but it can be done in a hundred percent. I'll tell you one more thing. Why should API servers read index from S3? What if in the updates that we are sending to API servers, what if we send the actual index data? It's just 1.7 MB, right? No need to reload, the problem solved. You can change a lot of stuff. It's just that I pick one so that I can make a point on utilizing our infrastructure calls to get something done.

**[01:52:01] Student 1:** Okay. Got it. Thank you. Now I'm clear.

**[01:52:03] Teacher:** Yeah. Okay.

<!-- topic-candidate [01:52:05]: Break *(admin)* -->

[01:52:05] *(admin)* Let's folks, we'll go on a break. Break till 11. It's 10 52 already. We'll take a break till 11 and then we come back, we'll discuss super fast DB. Again very similar to what we discussed on word dictionary, but we'll build a super fast DB, a very practical example, everyone uses it unknowingly, and we'll make order one reads, order one writes, order one deletes with persistence. Right? And this is where we'll go a little more deeper into what the file format should be, because right now we just work with simple CSVs, but that's not how this is actually stored. Right? We'll go deeper into it and build another database which is lightning fast database that gets the max performance out of your hard disk, and that's the highlight of it, and we all are using it unknowingly. Right? So we'll talk about it in depth when we come back from the break. We'll resume at 11 of now, right, seven minutes from them. Right? Thanks folks, see you folks at 11.

[break ~01:53:04-01:59:52]

<!-- topic-candidate [01:59:52]: Super fast key-value store on magnetic disk -->

**[01:59:52] Teacher:** Okay, let's start with the second half, for second, second part for today is we'll now talk about building a super fast key-value store on top of very commodity hardware, cheap magnetic hard disk. Right? We want best of everything: read, write, [?update | asr: "upgrade"], delete, persistence, everything we want.

<!-- topic-candidate [02:00:12]: How magnetic disk works -->

[02:00:12] So first, before we start our brainstorming, what we, what I would want to talk about is how magnetic disk works. So first of all, if you were to use, we are all, we all are so used to using SSDs, fast and all, but they are very costly. So if I were to put cache, like your CPU cache, your L1 cache, your SSDs, your magnetic disk storage, your tape storage, right? So if this is your memory, this is your magnetic disk storage, this is where your SSD lies. So SSDs are more closer to memory as compared to hard disk with respect to speed and with respect to cost. So getting an SSD is very costly as compared to getting a magnetic disk storage.

[02:01:08] So which is where you are storing huge amount of data. You don't store it on SSDs. You store it on magnetic disk storage. Now magnetic disk storage, what are they? It's that classic disk based storage where you have a head, head rotates like this in this motion while your disk spins. So when you issue a read of something, like read of a particular byte offset, that thing gets translated to a particular disk, on that particular disk, a particular sector, in that particular sector, a possible offset.

[02:01:50] Right? So you say on this file at this byte this exists, it then translates into on this disk, in this sector, at this offset it lies in. Right? So this is how it works. So now when your disk is moving and you are issuing a read command, let's say read from this, from this sector, from this, right, from this particular thing, what happens is your magnetic head movement, so this moves to that location, magnetic head comes to that point, read that particular part and sends it to the device driver, and then it goes to the user space and you consume it. So there is this actual physical movement which is happening for you to read this part over there. Right? So the head needs to be moved, the disk needs to rotate, you read that, then some other read comes in, so it moves. Mechanical movement that happens on the disk is the most time-consuming process. Right?

<!-- topic-candidate [02:02:52]: Building the key-value store - put, get, delete -->

[02:02:52] So this is how magnetic disk works. Now we are building a super fast key-value store that works on these cheap magnetic disk storage. Right? So now how would you build it? Right? Let's start with, and given what we want to do is we want to support operations like put, get, delete. That's it. Right. But the key thing is we don't want to miss out on persistence. So we have to persist everything. So how would a put look like? Hemant.
