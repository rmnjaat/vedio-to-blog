**[02:21:32] Teacher:** Take one. I'll count it. Hi. Hi. Got. I'm going to raise your hand. [check: high speaking rate, possibly garbled] Okay. Go on. Okay. Sorry. Yeah. [check: "Hi", "Sorry. Yeah." may be the student]

> **Student Question [~02:21:44] - Student?:** So basically in the client side, when we use local storage, so that is, that also comes in caching means to store something.

**[02:21:52] Teacher (answer):** Let's, let's, let's have those discussions tomorrow around that. Like, because we'll have, because this is what I would want to come from you on. Right. What are different places where you can cache it? Okay. So tomorrow we'll have exhaustive discussions on that. Like what is cache? What is not? What are we caching? How did you, because everyone would be there. Everyone would be prepared and then it would just spark those things in their head. Right. And I want everyone to experience that. That's it.

**[02:22:18] Student?:** Okay.

<!-- topic-candidate [02:22:19]: Q&A - soft delete cleanup, GDPR right to be forgotten -->

**[02:22:19] Teacher:** Yeah. Ajay.

> **Student Question [~02:22:21] - Student (Ajay):** Hey, hi. So I had one question related to the database and where we are using soft delete. So if you're marking like a lot of recall records to the soft delete, so it, it will like increase the database size. Right.

**[02:22:35] Teacher (answer):** So. Correct. So you would do periodic hard delete stuff from that. Let's say once a day you pick up all the soft deletes and you do hard delete on it.

**[02:22:44] Student (Ajay):** Okay.

**[02:22:44] Teacher:** Or, or move it to somewhere else. Like that's archival. You move it to somewhere else. Okay. Thank you. Got it. [check: "Thank you. Got it." may be the student]

[02:22:53] For soft deletes, when can you move an item which is soft deleted to hard deleted? Because it's very subjective. Let's talk about Facebook. The users, when you want to hard delete them, does it have to comply with the guidelines, or is it Facebook? GDPR compliance, right to be forgotten. GDPR says right to be forgotten. So if user files a case, with not a police case, but if it files a ticket with Facebook saying that I want to exercise my right to be forgot and please delete everything that you have for me, Facebook has to do hard delete of it in one month's time. So they would do physical hard deletes of everything that a user has ever created on the [unclear: "truck"]. What if that user had harassed someone? What if that user? Had harassed someone.

[02:23:40] So then, no. So it's not that they have to do it immediately. Right? Facebook has that time. One month, two month time to delete all. It gives you the breathing space to cover this use case, and if someone has [unclear: "had a so immediately pull this company"], but in any case [unclear: "fii"], uh, logs have everything, right? So from there you can extract the data. So the PIIs would be deleted immediately, but there are hacks to, uh, recover something. So for example, Atlassian has this mega outage where they deleted the data and it took them 14 days to recover, right? If someone has physically hard deleted the data, how were they able to recover it? As per GDPR compliance, right to be forgotten is right to be forgotten. If you hard delete, you hard delete. But it's still, Atlassian was able to recover it, which means that no company is hard deleting all the data that was ever created on the platform, right? They are just hard deleting for the sake of compliance from a specific places which are tracked. Logs may everything is there. They're just replaying in snapshots.

[02:24:43] So for example, if you take daily snapshots of your database and if a user says I want right to be forgotten, will you go and update all of your snapshots? No one does that. So your data is anyway there in historical snapshots of the database. No one is deleting them. But from your transaction system, there would not be any trace of that. Thanks. See, these are all hacks. Legal team helps you with this to navigate through this compliance part, to maximize what you can. And I build GDPR, so I know all these hacks. It took me two months to make the entire [?org | asr: "or"] GDPR compliant on this. So I implemented all this infrastructure level thing. So that's why it's not fake. And I'm not making this up. I had to do it. That's why I know it's in these details.

[02:25:31] So what is GDPR? GDPR is the compliance that tells you this, that if user can exercise right to be forgotten. So I can go and ask Instagram that I want to delete everything from your system. I want to be forgotten from your system, that if a user like Arpit ever existed. So they have to hard delete all of your data. So GDPR enforces that on every single organization. Every single.

<!-- topic-candidate [02:26:02]: Q&A - compression in cache -->

[02:26:02] Rahul?

> **Student Question [02:26:04] - Student (Rahul):** So my question, simple one. So do we implement compression on the caching side of things, like to reduce the amount of data that we are caching?

**[02:26:17] Teacher (answer):** Depends. Because then you are, then you would, then your trade-off comes in. Decompression. Decompression is a trade-off, right? So if you, what you are caching is gigantic, let's say blob, massive text blobs, right? And the time for you to decompress and read is less than time for you to and is less than the time that you spend in just reading it and basically requiring that extra amount of memory to store that, right? So you do the trade-off analysis and see if you want to compress or not. But then compression, cache will not do compression for you. You have to do it on the application. Most caches are just key value, right? So you'd have to compress and store and read and decompress and send.

> **Student Question [02:27:04] - Student (Rahul):** So like, is there any, like, is there any cache which you like does compression by storing the data itself?

**[02:27:11] Teacher (answer):** I think there would be plugins for most of the caches out there that does compression, but not sure of any. I've never used, I never found a genuine use case where I'm storing massive data in cache, like massive data as in a data with massive, because for a small field, like let's say email ID, I would not get performance boost. If I do decompress, I would actually lose performance. But if I'm storing entire [?blog | asr: "block"] body in cache, it might be helpful, because if let's say data itself is 10 KB, which is not very unusual, then compressing it and storing it in let's say one KB would be a huge benefit for me. So those are the use cases where I can go for compression. I've never used it personally, but there might be something.

**[02:27:53] Student (Rahul):** Actually, I asked this question because like, there are sometimes like people store videos or a part of videos or like some kind of images in cache, like depends on the service that we are using. Let's just say Instagram, for example. Okay. They, they would have caches around the world for the data to be like, transferred to the

**[02:28:18] Teacher:** CDN said they would be distributing it, but you can compress this. [check: "CDN" may end the student's sentence] So there is nothing that is stopping you from not doing compression. You can do it. You cannot do it. It's there, but there would be plugins. I'm not sure any cache out of the box supports that. Not really sure. Because most caches that you see are in memory. So not sure if they do this or not, but then definitely has a cache does not support that. There has to be a plugin that does that, or it's as simple that because you are the one who are storing it, just do compression on your end. Why should cache offer it out of the box? Because, because, now that I think of it, cache should not give you that option.

[02:28:58] Because you are wasting network bandwidth to transfer 10 KB of data, which is eventually getting stored in 1 KB. If you do compression on your end, you're just transferring 1 KB of data. Much more beneficial. Got it. So, caches should never offer you compression out of the box. It should be your responsibility, logic that would do that. So you're thinking of saving space in memory, but the amount of data that you would transfer that you transfer over the network would be huge. Right. So save that directly now. So compress on your end, send it, [?store it | asr: "story"], receive it, decompress it and return.

**[02:29:35] Student?:** Got it.

**[02:29:37] Teacher:** See, that's why I love this question, right? It just made me think on those lines. Thanks.

[02:29:43] Thanks. Thanks for asking this super question. And yeah, folks, keep things in mind like these, which is why I love these questions, right? If this question was not asked, I would not have been, like, it would be hard for me to even cover all these use cases, right? Even I don't know, it's just from experience that when someone asks, I have answers to that, right? So keep asking questions, it just helps everyone, right? But a great, great, great, great question. Amrita.

<!-- topic-candidate [~02:30:05]: Q&A - soft delete cron job and downtime -->

> **Student Question [~02:30:05] - Student (Amrita):** Yeah, so my question is around the soft delete. So if we have a service to be highly available and we have a cron job, which will delete the soft deleted entries. So what would be the alternative instead of maintaining a cron job? The service is supposed to be highly available.

**[02:30:30] Teacher (answer):** Cron job has nothing to do with availability. So are you saying your cron job needs to be highly available?

**[02:30:36] Student (Amrita):** So basically, like I was cross question, this is in an interview where I told the interview that I can run a background service which will delete the soft marked entries. He said, but there will be a downtime when you delete the soft deleted entries. So how will you handle that?

**[02:30:54] Teacher (answer):** Why would there be a downtime when you delete a soft deleted entry? Why? There would not be any downtime in your service when you're deleting, when you're just doing hard deletes, why would there be a downtime? There is no reason that because of your delete, it's a hard service can intermittently go down. That's a different problem. Job, your main service cannot go down. Why would it go down? You do stagger deletions. You would do it at a linear pace. Why? Why would that go down?

**[02:31:23] Student (Amrita):** Like he mentioned something around locking the table entry.

**[02:31:28] Teacher (answer):** That's not going down. That's just about being strongly consistent. That's strong consistency you're talking about. When you're deleting, you need to lock and delete rather than directly deleting. Because then you don't want stale reads to happen on your database. That entry is deleted but you are still reading it, that should not happen. So basically that strong consistency you're talking about, and not availability. Okay, we'll talk about strong consistency next week, uh, next week, uh, Saturday, when we talk about databases. We talk about strong consistency there, a bunch of things will be covered there. Rajiv.

<!-- topic-candidate [~02:32:01]: Q&A - Redis cache vs DB table for pre-computed results -->

> **Student Question [~02:32:01] - Student 6 (Rajiv):** Uh, Arpit, going back to the, which I asked, right, to, to put the cache results in DB. So from QPS perspective, let's say I don't, I have, might have a wrong notion about this. So let's say we have a Redis, Redis cache. We have deployed where we hold results. And then we have a DB table, which holds the result. From QPS perspective, reading both of both from them is same. Is it, or any one of them is course better than that. That's the reason we put Redis or as a,

**[~02:32:33] Teacher (answer):** Let's approach this from first principle, great question. Caches, let's say you store the exact same information on your Redis, and like the pre-computed result on your Redis and in your database, right? Now from an application server, both have persistent connections, Redis also and your relational database also, so that is negated. So equal, equal, you, you, you don't get any. Next is when you are getting a value from memory, when the request comes to your Redis and Redis wants to read it, it's there in the memory, right? Here, when it comes to your database, it goes to disk and reads it, right? Would store that information on the disk. So when it reads from memory, here it reads from the disk.

[02:33:17] Now, depending on how much of data are you reading, right? You would know that if reading from the memory is fast enough or not versus reading from the disk. If it's very small read, it might be very in, uh, it might be very significant difference, because the time to read from the disk, uh, let's say less than 10 or 15 bytes of data to read from the disk versus 10 or 15, uh, 10 or 15 bytes of memory will be much faster, because this guy is humongously slow when you are reading small reads. But if your reads are large, let's say one KB RAM and one KB disk, when you do this, then your time spent on reading it is not that huge. So you would get minimal difference. Like there would still be, this would be like a Redis would still be a little faster than this, but not humongous. Like you would not see massive difference.

[02:34:08] Next part, how your database is actually reading. Your disk based databases stores it in terms of B plus tree. It would have to do the traversal, the disk traversal to reach till that point and then read it. Right. So it's not just one disk read that is happening. It is one, two, three, depending on the number of rows that you're putting in, log of n would be the reads that it would have to do. Right. So that is the additional [?cost | asr: "cause"] that you are bearing, but with in memory, you get it in one shot because it's hashed in memory. Next part.
