**[02:45:27] Teacher (answer):** So when you clicked on the message icon, when you clicked on the message icon, this set got deleted. These entries got deleted. Okay. When another message was sent, then the entry would be created again. What is the edge case that you're talking about? Help me understand that.

**[02:45:45] Student 2:** No, as long as both are getting synced, there is no issue. So I was...

**[02:45:50] Teacher:** And obviously there is a problem. Yeah, as you very rightly said. In case, let's say you wrote over here, but this [?write failed | asr: "right field"], or rather this [?write | asr: "right"] succeeded in this [?write failed | asr: "right field"], then there is a problem. Not even denying that. Right? Not even denying that. Yeah. Right? Yeah. But it's not the end of the world. And it's very likely, very likely that the [?worst | asr: "WhatsApp was"] that would happen. In the [?count | asr: "account"], you would see two. But in reality, you would have 300 messages.

**[02:46:19] Teacher?:** Right? Yeah.

**[02:46:20] Teacher:** And that's okay. It's still okay. Right? Because it's not dealing with a financial system or really critical things. Some inconsistency where one write succeeds, other write fails. That is a problem. But introducing that complexity of doing distributed transaction is not worth it. Right. You just accept a bit of inconsistency. Right. Yeah.

**[02:46:40] Student 2:** Thanks.

> **Student Question [02:46:42] - Student 2:** So should we build it, build this functionality where we're doing the status check API as a transactional base, like updating both the databases, like the auxiliary and the Redis cluster at the same time?

**[~02:46:51] Teacher (answer):** Not required. You take up some inconsistency responses in favor of high throughput [check: "take up some inconsistency responses" may be misheard], not worth it because it's not very significant. See, what's the worst that would happen? You see two messages count of two, but in reality, you have three new messages. You're anyway, clicking on it, going on that screen, you would see a hundred messages. If that person has another thing and you did not respond and it was something about it that would send another message to you. That's okay. Right. So given how humans work, it's okay to, in this case, it's okay to have a bit of inconsistency, but why to add that unnecessary complications of distributed transactions? You really don't need that.

**[02:47:36] Student 4:** Yeah.

**[02:47:37] Teacher:** And this is again, that one thing that as engineer, you think you feel that you are cheating or by not having this real transaction, making a data going in inconsistent state, but in real world, it really does not matter. You think from user experiences perspective, what's the worst that would happen? Would it be an end of the world for them? Right. Not that.

> **Student Question [02:47:58] - Student 2:** Yeah, but I'm just weighing with why you like, instead of building auxiliary Redis, why don't we do a read before write in the write path here, read before write over here? No, in the [?write | asr: "right"], even read is okay? You're saying we don't even want to want to read on the database, on this database, right? [check: label boundaries mixed here, some phrases may be the teacher's]

**[~02:48:21] Teacher (answer):** No, no, no, I, what I'm saying is I don't even want to read here. Okay, you don't even want to get, because see, every instruction you fire on this DB, CPU consumes maybe even a slight bit of it, it consumes that. I'm just protecting this. This is like that, that Beauty and the Beast [unclear: "car"] rose that you are placed in this glass jar, no matter what you don't want it to crumble.

<!-- topic-candidate [02:48:52]: Q&A - why no user ID in the Gravatar hash -->

**[02:48:50] Student 2:** Got it. Got it. Yeah. Makes sense.

> **Student Question [02:48:52] - Student 2:** And, uh, one detail I might have missed in the Gravatar thing, uh, was there like, why did not we provide a user ID in the graph? Like that is privacy or that's by design. [unclear: "How grow that is like, I."]

**[02:49:06] Teacher (answer):** Okay. You are saying over here why we don't have user ID.

**[02:49:12] Student 2:** Yeah. Like, or whenever you generate something, generate even in the hash or like just scramble it with user ID, right? That will save a lot.

**[02:49:20] Teacher (answer):** No. Oh. Okay. So you are saying that, okay, somehow I inject user ID over here. But then the problem is that this hash is universal function. MD5 hash. Right? Now Facebook, let's say Facebook wants to integrate your Gravatar. It does not need to know your Gravatar [?user ID | asr: "visitor ID"].

**[02:49:39] Student 2:** Got it. Yeah. That's what I was trying to do.

**[02:49:42] Teacher:** All it just has. If it has your email ID, it can just try to see if you have Gravatar or not, it can start directly rendering it.

**[02:49:48] Student 2:** Yeah. Yeah. That's okay. Yeah. That's a simple requirement that people will feel easy.

**[02:49:54] Student?:** Yeah. Yeah.

<!-- topic-candidate [02:49:57]: Q&A - what "on message unsent" means -->

> **Student Question [02:49:57] - Student 5:** I had a question about on message unsent. I think I did not. If a user is active and then they receive messages from any of the [?chats | asr: "charts"], we don't want to trigger that event. Only if the user is inactive, whether we have an active WebSocket connection or online offline service, only then we want to trigger that on the unsent event. I want to understand what unsent means. I'm not able to.

**[02:50:28] Teacher (answer):** It's an umbrella that I created when I was not able to send a message to this user in real time.

**[02:50:35] Student?:** That's it.

**[02:50:38] Teacher (answer):** Now, implementation of it depends on if user is on other tab, then also it is considered to be unsent. Or if user is completely offline, then only it is considered to be unsent. That is your product call. But the idea is whatever flows into this on message unsent, it's like on message unsent in real time, you have to update the [?count | asr: "account"].

**[02:51:01] Student 5:** Right? Yep. Yep. Thank you.

<!-- topic-candidate [02:51:05]: Wrap-up and next week (admin) -->

**[02:51:05] Teacher:** *(admin)* Any other question? Anyone? No. Tick, tick. One, two, three, four. Fine. Done. Okay. Thanks, folks. For tuning in. I'll update. I'll upload a recording in sometime by three as well. See you folks next week. It's all about storage engines. Quite fun. We'll dive into database details and implement a couple of other systems. Thanks folks for tuning in. It was a great session. Great questions.

<!-- topic-candidate [02:51:39]: Q&A - resources to get good at query and database optimization -->

**[02:51:39] Student 2:** I have a small query here. Sorry.

**[02:51:45] Teacher:** So

> **Student Question [02:51:47] - Student 2:** See, initially we talked about the query optimizations and database optimizations for MySQL or let's say any relational database. [check: words possibly lost before "to improvise"] To improvise on this because I personally feel that, you know, I'm really not good at this. So what are the resources I can follow?

**[02:52:05] Teacher (answer):** So what I would do, what I would recommend is I actually, to be honest, how I became good at it is I focused very well during my college days on that subject very deeply. Right. So that is one that is my solid [?foundation | asr: "condition"], but I cannot obviously recommend you to read that entire textbook. So what you should do is understand how database works, how relational database works, how data is structured, right? Those things you need to go really deep into it, right? And how you do that? I am right now running a series on my YouTube members only thing around database internals. In case you are interested, go through those videos and see if you are interested into that, right? I cannot claim that I will cover all of that, but it is definitely going to be a big value add, right? Because I'm distilling the information from the textbooks, from the courses that I did, going into those nitty gritties of databases, not really internals into it, into the page structures and all, but more importantly, what you use in your day-to-day life, what you should definitely know in your day-to-day life about it. That is what I'm covering.

[02:53:07] I'm literally going through my college textbook. I'm not even exaggerating. I'm literally going through my college textbooks, three of them to just ensure that I've covered all the key details. Very soon, I'll be putting out videos on phantom reads is obviously coming next week. After that, it will be SQL query optimization. After that, indexing evaluation and whatnot. It's all going to be around databases in general, right? Because that's my strong quota [check: "strong quota" - possibly "strong forte"]. That's what I realized. So that's one.

[02:53:34] But in case you still want to explore, log into your production console, whatever your production console is, log into your production console, your MySQL thing, and start firing explain statements. E-X-P-L-A-I-N. In case you are unaware, Google explain statements, MySQL. It gives you the query plan of it, right? Every single word of it, Google that word of it, right? What it does, how the query plan is created, right? And refer to actual MySQL document. And I'm just using MySQL as an example. Pick your favorite database. Go through the official documentation of it and not some blogs or videos about it. Go through the official documentation. You would see how dense those documentations are because that would give you those nitty gritties that typically videos overlook, that typically blogs overlook. Do that right.

[02:54:26] But pick one query at a time, run the explain statement, get those terms, look out in the official documentation and re-iterate. And over time, three or four months will be well-versed in that. Now, when you are doing this, if you spot any optimization [unclear: "company's workflow suggest"], right? On your staging environment, run those, make those changes and see how it behaves. See if it improves something or not. Or in any case, you don't have to change in production or change in staging. You can just dump that database into other table, fire that exact same query with your changes and see what kind of improvement you've got. Companies is a very good, is a very good playground for us. In any case, if we improve, it's better for organization and you learn stuff as well, right? More than I would want to add. So that's how I became good at it. I should create a video on this. It's a good topic. Yeah. Thanks, J.K. [check: name spelling - same student as "DK"?]

<!-- topic-candidate [02:55:27]: Q&A - auxiliary Redis cluster -->

**[02:55:27] Teacher:** Yeah, Chandan, go on.

> **Student Question [02:55:29] - Student 2 (Chandan):** Arpit, like a Redis cluster is there. Do we need auxiliary Redis cluster also?

**[02:55:35] Teacher (answer):** It will be cluster. It will be cluster. One single node will not be able to handle. You need a cluster for that. It just became too dense over here. Yeah. So thanks. Great. Thanks folks for doing and see you folks next week. Bye-bye.
