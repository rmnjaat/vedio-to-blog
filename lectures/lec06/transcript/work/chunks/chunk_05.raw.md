# chunk_05  OWNS 00:45:56 -> 00:56:51  (segments #804-#983, 1474 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:44:59] TEACHER: Now let's talk about marking someone or marking a photo as active.   {#793}
CTX| [00:45:02] TEACHER: Sunil, what would be the query to mark a particular photo as active?   {#794}
CTX| [00:45:09] STUDENT_1: So in photos table, we can keep like no, is that two column is already there, right?   {#795}
CTX| [00:45:16] TEACHER: So we can keep like no flag true or false. Okay. So that's okay. That's a boolean. So what would   {#796}
CTX| [00:45:23] STUDENT_1: your query look like? Oh, okay. So this is just to pull only active photo, right? That's your   {#797}
CTX| [00:45:29] TEACHER: It's marking a photo as active marking.   {#798}
CTX| [00:45:33] STUDENT_1: Yeah.   {#799}
CTX| [00:45:34] STUDENT_1: Okay.   {#800}
CTX| [00:45:35] STUDENT_1: Then it's an update query.   {#801}
CTX| [00:45:37] STUDENT_1: Update photos.   {#802}
CTX| [00:45:41] STUDENT_1: Set is active equal to true where user ID equal to.   {#803}

---- OWNED SEGMENTS START ----
[00:45:56] STUDENT_1: and photo ID also we have to pass where on which photo like no user click to make it active   {#804}
[00:46:01] TEACHER: that is also do you really need because if ID is the primary do you need to pass user ID over here   {#805}
[00:46:06] TEACHER: no not required okay not so you're passing this okay yes what's the disadvantage of this query   {#806}
[00:46:16] TEACHER: what could go wrong   {#807}
[00:46:21] TEACHER: You were asking me, you gave this query.   {#808}
[00:46:25] TEACHER: What could go wrong over here?   {#809}
[00:46:32] TEACHER: See, this is what I love.   {#810}
[00:46:34] TEACHER: This is such a simple query.   {#811}
[00:46:36] TEACHER: You could see what's wrong in this query.   {#812}
[00:46:38] TEACHER: There is a big problem in this way, a big problem.   {#813}
[00:46:43] TEACHER: So they'll try to spot that.   {#814}
[00:46:51] STUDENT_1: Okay.   {#815}
[00:46:52] STUDENT_1: So if you give user ID also, then the scan will be like no less on the table.   {#816}
[00:46:58] TEACHER: No, ID is primary key scan would anyway be login.   {#817}
[00:47:01] TEACHER: So that's very efficient anyways.   {#818}
[00:47:04] TEACHER: Okay.   {#819}
[00:47:12] TEACHER: Three line query, one of the most simplest query that you could write almost hello world   {#820}
[00:47:19] TEACHER: And that is where like need to think about all this stuff and we implement.   {#821}
[00:47:23] TEACHER: And this is one aspect that almost every engineer,   {#822}
[00:47:26] TEACHER: everyone seen it, which you should not never.   {#823}
[00:47:32] TEACHER: Let me pull in Jyothi.   {#824}
[00:47:34] TEACHER: Jyothi, go on.   {#825}
[00:47:35] TEACHER: What's wrong in this query?   {#826}
[00:47:37] STUDENT_5: So you don't mark the previously active image as inactive.   {#827}
[00:47:40] STUDENT_5: That is, I think one issue.   {#828}
[00:47:42] STUDENT_5: Okay.   {#829}
[00:47:42] TEACHER: So how do you do that?   {#830}
[00:47:44] TEACHER: So let's start with that.   {#831}
[00:47:45] TEACHER: That's a good point.   {#832}
[00:47:46] TEACHER: You're not marking the other previous one as active.   {#833}
[00:47:49] TEACHER: So what's your query now?   {#834}
[00:47:50] STUDENT_5: So a very simple, I think naive way would be just to like,   {#835}
[00:47:54] STUDENT_5: get the currently active thing and mark it as inactive   {#836}
[00:47:58] STUDENT_5: or just do something like that.   {#837}
[00:48:02] STUDENT_5: But I feel that is like adding.   {#838}
[00:48:04] TEACHER: Getting active, marking that as inactive and marking others active.   {#839}
[00:48:08] TEACHER: Yes.   {#840}
[00:48:08] TEACHER: Can you simplify it?   {#841}
[00:48:11] STUDENT_5: I mean, I can think of sort of like a hack to do this.   {#842}
[00:48:16] STUDENT_5: just have a counter sort of like a counter or like the update I like some just stay with me for a   {#843}
[00:48:23] STUDENT_5: minute just have like a counter on the photo with on each row and increment in no that's not possible   {#844}
[00:48:36] TEACHER: try writing an update query for that in order to mark the current one the current active one as   {#845}
[00:48:40] STUDENT_5: inactive yeah uh yeah initially i was thinking it might be possible to do it in one query but   {#846}
[00:48:49] STUDENT_5: i'm not sure if i'm able to get that right now it would not be that's not possible so yeah you   {#847}
[00:48:56] STUDENT_5: You'll probably want to make like, I think the, the, the naive approach would be to have   {#848}
[00:49:02] STUDENT_5: three queries then.   {#849}
[00:49:04] TEACHER: Why three?   {#850}
[00:49:06] STUDENT_5: You okay.   {#851}
[00:49:07] STUDENT_5: Actually you can do two queries.   {#852}
[00:49:09] STUDENT_5: You can just mark all as false and then mark one as true.   {#853}
[00:49:12] TEACHER: Like correct.   {#854}
[00:49:14] STUDENT_5: Yeah.   {#855}
[00:49:14] STUDENT_5: So two queries.   {#856}
[00:49:15] TEACHER: What's wrong in this?   {#857}
[00:49:19] TEACHER: So we did exactly what you said.   {#858}
[00:49:21] TEACHER: We marked all of them as false and then we marked one as true.   {#859}
[00:49:26] TEACHER: what can go wrong?   {#860}
[00:49:38] TEACHER: Shreya, what can go wrong?   {#861}
[00:49:44] STUDENT_7: I mean, I had a solution that   {#862}
[00:49:46] STUDENT_7: we shouldn't mark everything as false.   {#863}
[00:49:47] STUDENT_7: Just add and in the where clause   {#864}
[00:49:49] STUDENT_7: and say is active is true.   {#865}
[00:49:51] STUDENT_7: So it will only pick up the row   {#866}
[00:49:52] STUDENT_7: which is currently active   {#867}
[00:49:56] TEACHER: Okay, so you are saying bad user ID is this and is activist true.   {#868}
[00:50:02] TEACHER: Okay, what is wrong in this?   {#869}
[00:50:07] STUDENT_7: What could go wrong in this?   {#870}
[00:50:19] TEACHER: It seems obvious, but I want all of you to basically explicitly tell that.   {#871}
[00:50:27] STUDENT_7: I mean, the other query should, should basically run only when the first one is completed.   {#872}
[00:50:34] STUDENT_7: Correct.   {#873}
[00:50:34] TEACHER: Correct.   {#874}
[00:50:35] TEACHER: Correct.   {#875}
[00:50:35] TEACHER: So what do you do?   {#876}
[00:50:38] STUDENT_7: So, uh, there's a dependency.   {#877}
[00:50:43] STUDENT_7: Um, so basically what we can do is when we get a response from the first   {#878}
[00:50:46] STUDENT_7: query that this has been executed, then you send another, or we can make it   {#879}
[00:50:51] STUDENT_7: as a transaction, something like that.   {#880}
[00:50:54] TEACHER: Transaction.   {#881}
[00:50:55] STUDENT_7: Yeah.   {#882}
[00:50:57] TEACHER: It sounds obvious, but we don't call it out explicitly.   {#883}
[00:51:01] TEACHER: And that's the problem because what if you update this and your process   {#884}
[00:51:04] TEACHER: crashed, then every photo is marked as.   {#885}
[00:51:08] TEACHER: active and you don't have any active photo.   {#886}
[00:51:11] TEACHER: Facebook is trying to render a profile photo and there is 404 not found coming up.   {#887}
[00:51:17] TEACHER: So this needs to explicitly be wrapped in a transaction.   {#888}
[00:51:26] TEACHER: Very simple thing, but people skip it.   {#889}
[00:51:30] TEACHER: We should be very focused on every intricate detail, especially in the simple systems because   {#890}
[00:51:35] TEACHER: It seems very obvious, but it is not.   {#891}
[00:51:39] TEACHER: Okay.   {#892}
[00:51:39] TEACHER: Thanks, Shriya, for spelling our transactions for that.   {#893}
[00:51:44] TEACHER: Chantan, what's wrong in this?   {#894}
[00:51:48] TEACHER: What can go wrong?   {#895}
[00:51:50] TEACHER: Now we also had a transaction.   {#896}
[00:51:54] STUDENT_2: Once we have added transaction, it becomes atomic in nature, right?   {#897}
[00:52:02] STUDENT_2: So I don't see that we will fail in concurrent request.   {#898}
[00:52:09] STUDENT_2: So if you don't.   {#899}
[00:52:10] TEACHER: So concurrency taken care of what other factors can go wrong?   {#900}
[00:52:20] TEACHER: Look at the query very carefully, very carefully, especially the second query.   {#901}
[00:52:27] TEACHER: That's a hint.   {#902}
[00:52:38] TEACHER: This is the simplest update query.   {#903}
[00:52:40] TEACHER: I could have written what's wrong with this.   {#904}
[00:52:42] TEACHER: There is a big problem in this way.   {#905}
[00:52:44] TEACHER: Big problem.   {#906}
[00:52:52] STUDENT_2: I'm not able to.   {#907}
[00:52:54] TEACHER: That's right.   {#908}
[00:52:55] TEACHER: That's right.   {#909}
[00:52:55] TEACHER: See, it's very hard to spot because you see it's like literally   {#910}
[00:52:59] TEACHER: wrote one print tab and you say why my program is not running. It's literally that it's literally   {#911}
[00:53:05] TEACHER: that like figuring out what's wrong with this. Okay. Yes Priyanka. What could go wrong in the   {#912}
[00:53:12] STUDENT_7: second query? So in the first query we said, you know, we are setting the active flag to true.   {#913}
[00:53:19] STUDENT_7: Whatever is existing active, we are already setting it to a false. Yes. And so now we have to set   {#914}
[00:53:29] STUDENT_7: another one to two, but again, you have to figure out which photo ID is that you have   {#915}
[00:53:33] TEACHER: your, you are already passing it.   {#916}
[00:53:35] TEACHER: That's fine.   {#917}
[00:53:37] TEACHER: But what is missing over here?   {#918}
[00:53:40] TEACHER: There's a big piece missing over here.   {#919}
[00:53:44] STUDENT_7: User ID.   {#920}
[00:53:46] TEACHER: Why?   {#921}
[00:53:49] TEACHER: If you have the photo ID, why do you need to pass user ID photo ID is the primary.   {#922}
[00:53:52] TEACHER: This is the primary key.   {#923}
[00:53:54] STUDENT_7: Okay.   {#924}
[00:53:55] STUDENT_7: Yeah.   {#925}
[00:54:02] STUDENT_4: I'll move to Mohit.   {#926}
[00:54:03] STUDENT_4: Mohit gone.   {#927}
[00:54:05] STUDENT_4: Yeah, I think user ID is required   {#928}
[00:54:07] STUDENT_4: because a user should be   {#929}
[00:54:09] STUDENT_4: allowed to change only his or her photos   {#930}
[00:54:11] STUDENT_4: not everyone.   {#931}
[00:54:12] STUDENT_4: Brilliant.   {#932}
[00:54:14] TEACHER: This is why.   {#933}
[00:54:16] TEACHER: You need this.   {#934}
[00:54:17] TEACHER: You need this.   {#935}
[00:54:19] TEACHER: Imagine someone from the front end   {#936}
[00:54:21] TEACHER: passing a very random photo ID.   {#937}
[00:54:23] TEACHER: If you don't have this check,   {#938}
[00:54:25] TEACHER: You are marking someone else's photo as active.   {#939}
[00:54:28] TEACHER: You are upgrading your own photos as inactive, but someone else's photos active.   {#940}
[00:54:33] TEACHER: So your photo is still an active, like you're like, basically none of the photos   {#941}
[00:54:37] TEACHER: active, but you're marking someone else's another photo is active.   {#942}
[00:54:40] TEACHER: So creates a problem.   {#943}
[00:54:41] TEACHER: So you should be, you as a user should be allowed to update or mark a photo as   {#944}
[00:54:47] TEACHER: active only yours, only your photos active, not someone else's security.   {#945}
[00:54:53] TEACHER: Correctness of the system.   {#946}
[00:54:55] TEACHER: It seems and this is why I love covering this problem segment   {#947}
[00:54:58] TEACHER: because this tells you that when you think of implementation,   {#948}
[00:55:02] TEACHER: how a very simple use case, really simple use case   {#949}
[00:55:07] TEACHER: has so many hidden intricacies.   {#950}
[00:55:10] TEACHER: This is what makes you a better engine.   {#951}
[00:55:14] TEACHER: Going into these details, like understanding   {#952}
[00:55:17] TEACHER: why do we need a certain field, a certain attribute,   {#953}
[00:55:21] TEACHER: ensuring correctness of the system in all cases.   {#954}
[00:55:25] TEACHER: that in all possible cases.   {#955}
[00:55:27] TEACHER: Now with this wrapped in a transaction,   {#956}
[00:55:29] TEACHER: with this thing in place,   {#957}
[00:55:32] TEACHER: with having to store redundant value over here,   {#958}
[00:55:35] TEACHER: we are ensuring our system is efficient and correct.   {#959}
[00:55:40] TEACHER: No matter what.   {#960}
[00:55:41] TEACHER: It's such a simple use case,   {#961}
[00:55:43] TEACHER: but I just wanted to highlight that part through this design.   {#962}
[00:55:46] TEACHER: That it seems very simple at first.   {#963}
[00:55:50] TEACHER: When you go into those details, you realize something's fishy.   {#964}
[00:55:55] TEACHER: Great.   {#965}
[00:55:56] TEACHER: Okay.   {#966}
[00:55:57] TEACHER: One more thing.   {#967}
[00:55:58] TEACHER: See, that's why it's, it's, this is exactly like code reviews.   {#968}
[00:56:01] TEACHER: When you write five lines of code, you'll get 50 comments.   {#969}
[00:56:04] TEACHER: When you write 500 lines of code, you'll get looks good to me.   {#970}
[00:56:07] TEACHER: Same thing.   {#971}
[00:56:08] TEACHER: When you have a simple system at hand, that's where people would try to basically nitpick   {#972}
[00:56:13] TEACHER: every single thing.   {#973}
[00:56:14] TEACHER: Okay.   {#974}
[00:56:15] TEACHER: There is one small minor, very minor optimization that you can do very minor.   {#975}
[00:56:25] TEACHER: Can anyone spot it?   {#976}
[00:56:26] TEACHER: Very minor.   {#977}
[00:56:27] TEACHER: Like it's literally insignificant, but still if you do it, it's slightly better.   {#978}
[00:56:32] TEACHER: Hey, man.   {#979}
[00:56:36] STUDENT_1: Actually, I'm not able to say, let me see it, but I have another question also.   {#980}
[00:56:41] STUDENT_1: And that's no question after a question.   {#981}
[00:56:43] TEACHER: Let's follow that optimization.   {#982}
[00:56:44] TEACHER: More than happy to take questions.   {#983}
---- OWNED SEGMENTS END ----

CTX| [00:56:51] STUDENT_1: Any hint for, are you talking about the first part of query?   {#984}
CTX| [00:56:54] STUDENT_1: Okay.   {#985}
CTX| [00:56:55] TEACHER: Let's write a query to pick an active photo of a user because that's what would happen when you hit this URL.   {#986}
CTX| [00:57:03] TEACHER: When you hit this URL, you have to pick the active photo of the user.   {#987}
CTX| [00:57:06] TEACHER: What your query would look like?   {#988}
CTX| [00:57:09] STUDENT_1: So select a star from photos where has what we have provided as the user ID and join on   {#989}
CTX| [00:57:25] STUDENT_1: user id from photos table   {#990}
CTX| [00:57:30] TEACHER: so exactly this query but just with one more word class yes okay let me just copy this for   {#991}
CTX| [00:57:40] STUDENT_1: so where user has is this yes and user uh user photos.id yeah photos id   {#992}
CTX| [00:57:50] TEACHER: and one more no no no no no no no no not photos id but photos dot is active photos dot is active true   {#993}
