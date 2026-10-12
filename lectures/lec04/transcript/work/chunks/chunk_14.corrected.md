**[02:34:42] Teacher:** Now here, given that the data is in memory, you are immediately just reading and serving it. Here, that is not the case, but because you're storing in memory, the cost that you would require is high. The amount you can store is limited by the RAM and not by the disk. With database, the data is limited by the disk and not the RAM. So you will have larger cache on disk versus a smaller cache in memory. Decide.

[02:35:13] So it's very subjective. So what you're reading, how much are you reading? How your data is stored? How many IOs would happen? What are you actually getting as an advantage? How much of data are you storing? These factors you would have to think about when you make this decision, but overall not much difference. Yeah.

**[02:35:33] Student?:** As it is, right? Given that a pre, that, given that your computation that you are saving is humongous.

**[02:35:39] Teacher:** Right.

**[02:35:40] Student?:** Right.

**[02:35:42] Teacher:** [unclear: "gates"] Yeah. And yeah, RAM is more expensive than disk, so that is the biggest factor.

> **Student Question [~02:35:48] - Student 6:** Uh, one more thing before. So there is some cost we, we pay to, to, uh, Redis cluster, to mean, I mean, we are taking as a service. I mean, I know we thought that Redis is an in-house, I mean, you have to maintain Redis over there. So I read somewhere that you have to pay some cost. I have no experience with Redis basically, but do you have to pay some cost for them to maintain or just you...

**[~02:36:07] Teacher (answer):** Yeah, if you're having to then put up, then the entire management is done by the cloud. So they have their own pricing and billings and whatnot.

**[02:36:17] Student 6:** So costing also you have to take care of.

**[02:36:21] Teacher:** Plus, if you're piggybacking on the same database, in the database, you are firing this thing on the database, the database will also spend time processing this, so existing requests will take an effect. That is also there. Right. Lot of things, lot of things. It's all trade-off. Our entire domain is filled with trade-offs. There is no one right answer to anything. Even 2 plus 2, plus, there is no one right answer. I can tweak it, change the formulation and basically suggest something else. So be always open to trade-offs. Asking such questions really helps out everything.

[02:36:55] Nitin, go on.

> **Student Question [02:36:58] - Student (Nitin):** Yes, regarding [?Amrita's | asr: "Mirita's"] question. So maybe the interviewer was trying to say like whenever your cron job is trying to hard delete, and let's say there are thousands of records, 100k records, okay, which needs to be hard deleted. So maybe the performance impact would be there. So at that time, the DB's availability might be reduced. Let's say during that cron job is running, maybe there's a high traffic incoming. So will the DB be able to perform the hard delete also to serve the request from coming.

**[02:37:39] Teacher (answer):** That's what I said. We have to do staggered deletion. You cannot delete all 100,000 rows in one shot. Split it across your entire day. One hour page job you run and you delete only 1,000 rows at a time. Do staggered deletions to reduce the impact. That's a garbage collection. So do it across the time. So instead of deleting 100,000 rows in one shot, split it into, let's say, half an hour you run job, amount of rows, let's say 10,000 rows, split across 10 hours, sorry, sorry, 10,000 rows every hour you delete. That would minimize the impact, right? Who said you want to delete thousand rows or 100,000 rows in one shot? Okay.

> **Student Question [~02:38:19] - Student (Nitin):** Uh, okay, then, uh, the follow-up thing would be like, uh, if the cron job is running in every like one hour or so, then, then also that particular cron job service, uh, would, uh, take up the connection pool, one or two connections. So then you have, then you, if you don't edit and your data would grow.

**[~02:38:37] Teacher (answer):** Okay, you'll gain some, you lose some, right? If you're saving this, then you're [unclear: "losing out office"]. There is nothing like you don't win it all. Never. You win something, you lose something.

**[02:38:57] Student?:** Got it. Okay.

**[~02:38:57] Teacher:** Yeah. Vishan. [check: name spelling]

> **Student Question [02:39:02] - Student 4 (Vishan):** Hey, hi. So it's just simple question. So regarding soft delete, if we have like soft delete in the database, like for particular table, sometimes it happens like we also have like uniqueness index index on that particular field. So sometimes like, uh, for like email, user deleted it and wants to like create a new account with same email ID. So it would block that. Use.

**[02:39:31] Teacher (answer):** So then there has to be hard in this use case. It has to be hard deleted.

**[02:39:35] Student 4 (Vishan):** Yeah. Okay. Got it. Got.

**[02:39:39] Teacher:** Anwar. Go on.

<!-- topic-candidate [02:39:53]: Q&A -->

[02:39:53] Any other question across the entire session?

**[02:40:02] Student 7:** Can you hear me?

**[02:40:03] Teacher:** Yeah, now I can hear you. Got it.

> **Student Question [02:40:05] - Student 7:** Yeah. So maybe it all always depends upon the use case, right? So when you're talking about running cron jobs and all these extra services [?to delete | asr: "to believe"], we can also set up the retention policy in the DB itself, right?

**[02:40:21] Teacher (answer):** Someone has to do it. So then DB would be having thread that is doing it. So DB is doing the cron job for you, right? So you're offloading it to database.

> **Student Question [02:40:30] - Student 7:** Yeah. So in this case, I wanted to know if someone has done this from their experience, what, you know, which of the approaches in general, where you have to make a lot of these, uh, interval, regular interval of delete, which one is better, compared, comparatively, for the DB performance?

**[~02:40:49] Teacher (answer):** Offload it to database, do it in a staggered way. Yeah, always works. Okay. Okay.

**[02:41:07] Student?:** Hello. Go ahead.

> **Student Question [02:41:08] - Student?:** Am I audible? Yeah. Yeah. Just a follow up question. So in one point you mentioned that why is, suppose, let's say we are caching on. And it is as well as some database, let's say we are considering here Postgres or MySQL, and we are, you know, caching something on these two databases. So why did you say that every time we have to read from the disk? Because if, let's say, we index that field, then it automatically comes to the RAM. I mean, that is my understanding. I'm thinking in the right direction.

**[02:41:38] Teacher (answer):** Worst case is reading from the disk, right? Worst case is what? Reading from the disk, right? [check: possible ASR duplicate] We go in the worst case. The best case is that the table is so small that it fits in the RAM and database is keeping it in the RAM. Then there is no difference.

**[02:41:51] Student?:** Correct. But, but the worst case is, but when we index something, index.

**[02:41:59] Teacher (answer):** If you don't have enough RAM to fit in that index, then, okay, you always go for the worst case. It will always, in the worst case, it will be a disk read.

> **Student Question [~02:42:11] - Student?:** Okay, got it, got it. All right. Yeah. So after we talked about vendor lock-in, let's say I work for Google, so I'm bound to use GCP, right? In that case,

**[~02:42:20] Teacher (answer):** Yeah, then you, then you, you yourself are the vendor. You would never be moving out, right?

**[~02:42:31] Student?:** Yeah, so there is no point of comparison.

**[02:42:35] Teacher:** Correct. So then vendor lock-in is out of option, right? And for a lot of companies, if I know that I'll always be on AWS no matter what, I would not care, right? So then I don't worry about vendor lock-in at all in that case. Okay, but then one more question comes. If I think from, if I wear the hat of a manager, I would think that, hey, is it easy for me to find talent who knows this particular technology that only this particular vendor offers versus an open source technology that everyone uses? That is another thing. For example, Aerospike is a pro, or rather let's say a TigerGraph is a proprietary graph database, and I have, let's say, uh, Neo4j. I would find hundreds of developers who know Neo4j, but few who knows TigerGraph, right? So how easy it is for me to find talent who knows that particular stuff. That could be another thing that me as a manager would. So that is another reason where I might not want to, like, I might be tempted to go for an open source technology versus a proprietary stuff.

> **Student Question [02:43:40] - Student?:** And when we were also comparing the differences between DDB and Redis, we didn't talk about availability. Is it because they both provide us similar kind of.

**[02:43:49] Teacher (answer):** Assuming that. Assuming that. [check: possible ASR duplicate] Availability because there is nothing much in that. I'm assuming that you need team to maintain availability. And because it's all about having that engineering expertise to have that availability, that AWS is giving availability here. Your engineers would have to ensure that availability. So keeping availability same because availability is a property of engineers and not database.

> **Student Question [02:44:11] - Student?:** Yeah. Correct. And also for designing online offline indicator, we didn't talk about how do we tell the last seen? Was it out of scope for this?

**[02:44:20] Teacher (answer):** Scope, out of the, we just draw this green and gray, right? That was out of scope. But if you need that, then you cannot delete the rows. Then you keep the rows. Okay. And you get like the last heartbeat you got is the last thing that you have.

**[02:44:34] Student?:** Got it. Thanks.

> **Student Question [02:44:38] - Student 3:** So my question is about Redis actually, uh, so basically what I wanted to ask is about like, uh, there is a function, uh, and that is that automatically managed, manages keys after a certain period of time. Okay. So my question is about, uh, about the implementation of that. Like, how is it, is it doing?

**[02:45:00] Teacher (answer):** We will discuss this. We'll discuss this in third week. When we design cache, we'll have this discussion on this. How, how, how, how TTL happens. We'll have this discussion third week.

**[02:45:09] Student?:** Sure.

**[02:45:12] Teacher:** Surya.

> **Student Question [02:45:13] - Student 5 (Surya):** Yeah. Uh, I have a question around, uh, um, around the index, how database index length. Does it, I was under the impression that it always stores on the disk and it, I mean, yes, does it ever store on RAM as well permanently?

**[02:45:30] Teacher (answer):** RAM? No. Permanent is always [?disk | asr: "this"], always, always, always, always. I have a video on it on my YouTube. What's that? How database, how indexes make database read faster. It will come in pre-reads for the next week also. So [?watch that | asr: "what's that"] video. You'll understand what, how it happens. Okay.
