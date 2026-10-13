**[00:45:56] Student 1:** And photo ID also we have to pass, where, on which photo, like, no, user click to make it active.

**[00:46:01] Teacher:** That is also, do you really need? Because if ID is the primary, do you need to pass user ID over here? No, not required. Okay, not, so you're passing this, okay, yes. What's the disadvantage of this query? What could go wrong? You were asking me, you gave this query. What could go wrong over here? See, this is what I love. This is such a simple query. You could see what's wrong in this query. There is a big problem in this way, a big problem. So they'll try to spot that.

**[00:46:51] Student 1:** Okay. So if you give user ID also, then the scan will be like, no, less on the table.

**[00:46:58] Teacher:** No, ID is primary key, scan would anyway be [?log n | asr: "login"]. So that's very efficient anyways. Okay.

[00:47:12] Three line query, one of the most simplest query that you could write, almost hello world. And that is where like need to think about all this stuff and we implement. And this is one aspect that almost every engineer, everyone seen it, which you should not never. Let me pull in Jyothi. Jyothi, go on. What's wrong in this query?

**[00:47:37] Student 5 (Jyothi):** So you don't mark the previously active image as inactive. That is, I think, one issue. Okay.

**[00:47:42] Teacher:** So how do you do that? So let's start with that. That's a good point. You're not marking the other previous one as active. So what's your query now?

**[00:47:50] Student 5:** So a very simple, I think naive way would be just to like, get the currently active thing and mark it as inactive, or just do something like that. But I feel that is like adding.

**[00:48:04] Teacher:** Getting active, marking that as inactive and marking others active. Yes. Can you simplify it?

**[00:48:11] Student 5:** I mean, I can think of sort of like a hack to do this. Just have a counter, sort of like a counter, or like the update, I like some, just stay with me for a minute, just have like a counter on the photo with on each row and increment, in, no, that's not possible.

**[00:48:36] Teacher:** Try writing an update query for that in order to mark the current one, the current active one as inactive.

**[~00:48:40] Student 5:** Yeah, yeah, initially I was thinking it might be possible to do it in one query, but I'm not sure if I'm able to get that right now. It would not be, that's not possible. So yeah, you, you'll probably want to make, like, I think the, the, the naive approach would be to have three queries then.

**[00:49:04] Teacher:** Why three?

**[00:49:06] Student 5:** You, okay. Actually you can do two queries. You can just mark all as false and then mark one as true.

**[00:49:12] Teacher:** Like, correct.

**[00:49:14] Student 5:** Yeah. So two queries.

**[00:49:15] Teacher:** What's wrong in this? So we did exactly what you said. We marked all of them as false and then we marked one as true. What can go wrong? Shreya [check: name spelling - "Shriya" at 00:51:39], what can go wrong?

**[00:49:44] Student 7 (Shriya):** I mean, I had a solution that we shouldn't mark everything as false. Just add "and" in the where clause and say is active is true. So it will only pick up the row which is currently active.

**[00:49:56] Teacher:** Okay, so you are saying [?where | asr: "bad"] user ID is this and is active is true. Okay, what is wrong in this?

**[00:50:07] Student?:** What could go wrong in this?

**[00:50:19] Teacher:** It seems obvious, but I want all of you to basically explicitly tell that.

**[00:50:27] Student 7:** I mean, the other query should, should basically run only when the first one is completed. Correct.

**[00:50:34] Teacher:** Correct. Correct. So what do you do?

**[00:50:38] Student 7:** So, there's a dependency. So basically what we can do is when we get a response from the first query that this has been executed, then you send another, or we can make it as a transaction, something like that.

**[00:50:54] Teacher:** Transaction.

**[00:50:55] Student 7:** Yeah.

**[00:50:57] Teacher:** It sounds obvious, but we don't call it out explicitly. And that's the problem, because what if you update this and your process crashed, then every photo is marked as active and you don't have any active photo. Facebook is trying to render a profile photo and there is 404 not found coming up. So this needs to explicitly be wrapped in a transaction. Very simple thing, but people skip it. We should be very focused on every intricate detail, especially in the simple systems, because it seems very obvious, but it is not. Okay. Thanks, Shriya, for spelling our transactions for that.

[00:51:44] Chandan, what's wrong in this? What can go wrong? Now we also had a transaction.

**[00:51:54] Student 2 (Chandan):** Once we have added transaction, it becomes atomic in nature, right? So I don't see that we will fail in concurrent request. So if you don't.

**[00:52:10] Teacher:** So concurrency taken care of, what other factors can go wrong? Look at the query very carefully, very carefully, especially the second query. That's a hint. This is the simplest update query. I could have written, what's wrong with this. There is a big problem in this way. Big problem.

**[00:52:52] Student 2:** I'm not able to.

**[00:52:54] Teacher:** That's right. That's right. See, it's very hard to spot, because you see, it's like literally wrote one print tab and you say why my program is not running. It's literally that, it's literally that, like figuring out what's wrong with this. Okay. Yes Priyanka. What could go wrong in the second query?

**[~00:53:12] Student 7 (Priyanka):** So in the first query we said, you know, we are setting the active flag to true. Whatever is existing active, we are already setting it to a false. Yes. And so now we have to set another one to [?true | asr: "two"], but again, you have to figure out which photo ID is that you have

**[00:53:33] Teacher:** your, you are already passing it. That's fine. But what is missing over here? There's a big piece missing over here.

**[00:53:44] Student 7:** User ID.

**[00:53:46] Teacher:** Why? If you have the photo ID, why do you need to pass user ID? Photo ID is the primary. This is the primary key.

**[00:53:54] Student 7:** Okay. Yeah.

**[00:54:02] Teacher:** I'll move to Mohit. Mohit, go on.

**[00:54:05] Student 4 (Mohit):** Yeah, I think user ID is required because a user should be allowed to change only his or her photos, not everyone.

**[00:54:12] Teacher:** Brilliant. This is why. You need this. You need this. Imagine someone from the front end passing a very random photo ID. If you don't have this check, you are marking someone else's photo as active. You are upgrading your own photos as inactive, but someone else's photos active. So your photo is still an active, like you're like, basically none of the photos active, but you're marking someone else's another photo is active. So creates a problem. So you should be, you as a user should be allowed to update or mark a photo as active only yours, only your photos active, not someone else's. Security. Correctness of the system.

[00:54:55] It seems, and this is why I love covering this problem segment, because this tells you that when you think of implementation, how a very simple use case, really simple use case, has so many hidden intricacies. This is what makes you a better engine. Going into these details, like understanding why do we need a certain field, a certain attribute, ensuring correctness of the system in all cases, that in all possible cases.

[00:55:27] Now with this wrapped in a transaction, with this thing in place, with having to store redundant value over here, we are ensuring our system is efficient and correct. No matter what. It's such a simple use case, but I just wanted to highlight that part through this design. That it seems very simple at first. When you go into those details, you realize something's fishy. Great. Okay.

[00:55:57] One more thing. See, that's why it's, it's, this is exactly like code reviews. When you write five lines of code, you'll get 50 comments. When you write 500 lines of code, you'll get looks good to me. Same thing. When you have a simple system at hand, that's where people would try to basically nitpick every single thing. Okay.

<!-- topic-candidate [00:56:15]: Minor optimization -->

[00:56:15] There is one small minor, very minor optimization that you can do, very minor. Can anyone spot it? Very minor. Like it's literally insignificant, but still if you do it, it's slightly better. Hey, man.

**[00:56:36] Student 1:** Actually, I'm not able to say, let me see it, but I have another question also. And that's no question after a question.

**[00:56:43] Teacher:** Let's follow that optimization. More than happy to take questions.
