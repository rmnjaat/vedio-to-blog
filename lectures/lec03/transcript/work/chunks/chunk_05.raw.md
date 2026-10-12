# chunk_05  OWNS 00:48:36 -> 00:59:55  (segments #739-#869, 1117 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:47:40] STUDENT_2: to generate the IDs, instead of a shared service,   {#717}
CTX| [00:47:43] STUDENT_2: if we just have a common database and we take logs on it, would that work?   {#718}
CTX| [00:47:48] TEACHER: That's exactly shared service.   {#719}
CTX| [00:47:50] TEACHER: Your database is a shared service there, correct?   {#720}
CTX| [00:47:52] STUDENT_2: Yeah, but if we take logs on it, wouldn't it be unique then?   {#721}
CTX| [00:47:57] TEACHER: No, it will be unique, but that is still a single machine, right?   {#722}
CTX| [00:47:59] TEACHER: That is that database itself becomes a service, right?   {#723}
CTX| [00:48:02] STUDENT_2: Yeah.   {#724}
CTX| [00:48:03] STUDENT_2: Right.   {#725}
CTX| [00:48:04] STUDENT_2: Okay.   {#726}
CTX| [00:48:04] STUDENT_2: Okay.   {#727}
CTX| [00:48:05] STUDENT_2: Yeah.   {#728}
CTX| [00:48:05] TEACHER: That's the same thing.   {#729}
CTX| [00:48:06] TEACHER: That's one and the same thing.   {#730}
CTX| [00:48:07] TEACHER: Right.   {#731}
CTX| [00:48:09] STUDENT_1: Rajiv.   {#732}
CTX| [00:48:11] STUDENT_1: Orpid, the places where we want to resolve conflicts based on IDs now, since we tell   {#733}
CTX| [00:48:16] STUDENT_1: that, I mean, we are not sure whether the IDs on distributed system would be unique.   {#734}
CTX| [00:48:21] STUDENT_1: So how do we tackle that problem?   {#735}
CTX| [00:48:22] TEACHER: We'll talk about that.   {#736}
CTX| [00:48:23] TEACHER: there are still like we are still only uh basically 30 percent done and we'll talk about that right   {#737}
CTX| [00:48:29] TEACHER: how do we resolve what happens how should we approach that we'll talk about   {#738}

---- OWNED SEGMENTS START ----
[00:48:36] STUDENT_3: yeah so when you were discussing the last point right about auto incrementing by   {#739}
[00:48:42] STUDENT_3: one two three four in both the servers so can't be like auto increment by like the number of   {#740}
[00:48:48] STUDENT_3: servers we have basically if you have two then zero two four and one will disparate like one three   {#741}
[00:48:53] TEACHER: five yeah we can do that but there is a slight disadvantage to that we'll discuss in the second   {#742}
[00:48:59] STUDENT_3: time i have it covered f5 right okay dk yeah so instead of static counter why can't we use a   {#743}
[00:49:12] TEACHER: random id generator here and append it to the uh we'll talk about it random but great great   {#744}
[00:49:16] TEACHER: that you folks are already thinking about this.   {#745}
[00:49:18] TEACHER: I am so loving this much.   {#746}
[00:49:20] TEACHER: You folks are continuously thinking,   {#747}
[00:49:21] TEACHER: but which is where the static counter would pick   {#748}
[00:49:23] TEACHER: because we wanted monotonicity.   {#749}
[00:49:25] TEACHER: That's why we went for that.   {#750}
[00:49:27] TEACHER: Random ID does not give you monotonicity.   {#751}
[00:49:29] TEACHER: That's why I said that if you need monotonicity,   {#752}
[00:49:31] TEACHER: like you may not always need monotonicity.   {#753}
[00:49:33] TEACHER: You may think you need monotonicity,   {#754}
[00:49:35] TEACHER: but in reality, you can relax those constraints   {#755}
[00:49:37] TEACHER: and say, hey, what if I don't have monotonicity?   {#756}
[00:49:41] TEACHER: Then you can go for a random ID like UUID.   {#757}
[00:49:44] TEACHER: Right, right.   {#758}
[00:49:45] STUDENT_3: So that is my second question.   {#759}
[00:49:47] STUDENT_3: Why can't you use a UUID instead of all this complexity?   {#760}
[00:49:50] TEACHER: We can, that's what I said.   {#761}
[00:49:52] TEACHER: Relax the constraint.   {#762}
[00:49:53] TEACHER: If it's okay for you to relax the constraint, then use UUID.   {#763}
[00:49:55] TEACHER: Don't rely on strict monotonicity because not everyone needs that.   {#764}
[00:49:59] TEACHER: Got it.   {#765}
[00:50:00] TEACHER: But in that case, I think we will not be able to, you know, give that ordering.   {#766}
[00:50:03] TEACHER: If you are using UUID.   {#767}
[00:50:05] TEACHER: Got it.   {#768}
[00:50:05] TEACHER: You get some, you lose some.   {#769}
[00:50:07] TEACHER: Got it.   {#770}
[00:50:08] TEACHER: Got it.   {#771}
[00:50:09] TEACHER: But we'll talk about UUID.   {#772}
[00:50:10] TEACHER: We'll talk about MongoDB IDs, UUIDs and whatnot.   {#773}
[00:50:13] TEACHER: We'll see where you can use it.   {#774}
[00:50:16] TEACHER: disadvantages of it, how monotonicity would help you all of that, like real practical   {#775}
[00:50:22] TEACHER: situations where ID generation, you really need need kind of thing.   {#776}
[00:50:26] TEACHER: We'll go in there after that.   {#777}
[00:50:27] TEACHER: I've got it.   {#778}
[00:50:28] TEACHER: Yeah.   {#779}
[00:50:30] STUDENT_2: So basically my question is about the central ID generation.   {#780}
[00:50:34] STUDENT_2: So what I was thinking is like a center server, which generates ID, you told us about the   {#781}
[00:50:41] STUDENT_2: distributed uh uh distributed uh thing also just a second   {#782}
[00:50:49] STUDENT_3: you also told us about the distributed id server also so what we can basically do is basically we   {#783}
[00:50:56] STUDENT_3: can have like a particular id uh like id for each server that we have like in the distributed system   {#784}
[00:51:02] STUDENT_3: in the id servers and just like they can have their own logic for like creating uh creating   {#785}
[00:51:11] STUDENT_3: and they append   {#786}
[00:51:12] STUDENT_3: they just append   {#787}
[00:51:16] STUDENT_3: their own   {#788}
[00:51:17] STUDENT_3: ID server   {#789}
[00:51:18] STUDENT_3: to that   {#790}
[00:51:21] STUDENT_3: logic which is generating   {#791}
[00:51:23] STUDENT_3: IDs.   {#792}
[00:51:25] TEACHER: But you are losing on monotonicity.   {#793}
[00:51:27] TEACHER: That's fine.   {#794}
[00:51:27] TEACHER: That's fine.   {#795}
[00:51:28] TEACHER: That's okay.   {#796}
[00:51:31] TEACHER: There is nothing wrong in it.   {#797}
[00:51:32] TEACHER: That's what I'm saying.   {#798}
[00:51:32] TEACHER: There is no one right way to do it.   {#799}
[00:51:35] TEACHER: For some, it works in one way.   {#800}
[00:51:37] TEACHER: For some, it works for other ways.   {#801}
[00:51:39] TEACHER: But your approach is also correct.   {#802}
[00:51:41] TEACHER: You get some, you lose some.   {#803}
[00:51:44] TEACHER: I'm just discussing on the core idea behind IT generation.   {#804}
[00:51:48] TEACHER: And now when we go into the specific examples, you'll see that, Hey, if you're.   {#805}
[00:51:54] TEACHER: Getting advantages on a certain part, you'd be losing on certain part, but at the end,   {#806}
[00:51:58] TEACHER: it's a trade off that you would have to make what you want and what you can give up.   {#807}
[00:52:03] TEACHER: By maximizing the throughput and performance and efficiency of your system.   {#808}
[00:52:08] TEACHER: Sure.   {#809}
[00:52:12] STUDENT_4: I wanted to propose one more solution for the part where we wanted to reduce the disk   {#810}
[00:52:19] STUDENT_4: IOS.   {#811}
[00:52:20] STUDENT_4: So, can we do something like when the server restarts, we read from the database, get the   {#812}
[00:52:25] STUDENT_4: last counter saved in the database, and then start incrementing ahead.   {#813}
[00:52:30] STUDENT_4: So we wouldn't need those periodical saves as well.   {#814}
[00:52:35] STUDENT_9: So then you are writing to database every time?   {#815}
[00:52:39] STUDENT_4: No, so we'll have some   {#816}
[00:52:40] STUDENT_4: last row which was   {#817}
[00:52:43] STUDENT_4: saved to database.   {#818}
[00:52:44] TEACHER: That's what I'm saying. This is not where we are using it and storing it in database.   {#819}
[00:52:47] STUDENT_4: No, no, no.   {#820}
[00:52:48] STUDENT_4: Not the IDs. Let's say   {#821}
[00:52:51] STUDENT_4: we are saving   {#822}
[00:52:52] STUDENT_4: messages to database. Now   {#823}
[00:52:54] STUDENT_4: that message ID, certain   {#824}
[00:52:56] STUDENT_4: row has a message ID which was last saved   {#825}
[00:52:58] TEACHER: to the database. That's exactly what this load   {#826}
[00:53:00] TEACHER: is actually doing. This load is   {#827}
[00:53:02] TEACHER: actually doing that itself. Writing it   {#828}
[00:53:04] TEACHER: to the database, one and the same thing.   {#829}
[00:53:08] TEACHER: You are starting from that particular point.   {#830}
[00:53:11] TEACHER: Correct.   {#831}
[00:53:13] TEACHER: But then how are you, but here you are assuming that you are writing this, this, whatever you're   {#832}
[00:53:18] TEACHER: doing using this get ID for, you are writing it back to database.   {#833}
[00:53:22] TEACHER: That row is getting inserted.   {#834}
[00:53:23] TEACHER: I'm not even assuming that.   {#835}
[00:53:25] TEACHER: Got it.   {#836}
[00:53:27] TEACHER: You are assuming that an entry is getting created in the database for every single thing.   {#837}
[00:53:32] TEACHER: And then you are picking the max row and then starting from that.   {#838}
[00:53:35] TEACHER: I'm not even assuming that you're using this, like in this approach, I'm not even assuming   {#839}
[00:53:39] TEACHER: that you are writing back to the database because that is anyway expensive.   {#840}
[00:53:42] TEACHER: Right.   {#841}
[00:53:43] TEACHER: I'm just focusing on this ID generation logic, but then what you're proposing max row ID.   {#842}
[00:53:50] TEACHER: And then you start from the, that's exactly what this load function is all about.   {#843}
[00:53:52] TEACHER: Here I'm tracking about loading from the disk, but with this, you're assuming that when you   {#844}
[00:53:57] TEACHER: get an ID, then you are doing something and then you're storing things into database.   {#845}
[00:54:01] TEACHER: And then that's an expensive call that you're making.   {#846}
[00:54:05] TEACHER: I'm not even assuming that you're   {#847}
[00:54:06] TEACHER: student back to the database.   {#848}
[00:54:07] TEACHER: You're just attaching something in this,   {#849}
[00:54:10] TEACHER: basically pushing it forward.   {#850}
[00:54:11] TEACHER: Let's say request ID kind of thing.   {#851}
[00:54:13] TEACHER: Right?   {#852}
[00:54:14] TEACHER: Yeah.   {#853}
[00:54:16] TEACHER: Okay.   {#854}
[00:54:16] TEACHER: Yeah.   {#855}
[00:54:17] TEACHER: Let's take a quick break for five minutes.   {#856}
[00:54:19] TEACHER: Once we come back, what we'll talk about is,   {#857}
[00:54:21] TEACHER: we'll talk about how Amazon does it using   {#858}
[00:54:24] TEACHER: central ID generation service and then other use cases.   {#859}
[00:54:26] TEACHER: I'll show you a very nice demo of why people   {#860}
[00:54:32] TEACHER: Why people go for a certain way and not the other way   {#861}
[00:54:35] TEACHER: and how to make those particular trade-off decisions.   {#862}
[00:54:39] TEACHER: So we'll take a quick break for five minutes.   {#863}
[00:54:41] TEACHER: We'll sing back at 10.   {#864}
[00:54:42] TEACHER: And we'll talk about Amazon, Flickr, Twitter, Instagram, and Pagination.   {#865}
[00:54:50] TEACHER: A very interesting side effect of having a good ID generation system.   {#866}
[00:54:55] TEACHER: We'll talk about it.   {#867}
[00:54:56] TEACHER: See you folks in five minutes.   {#868}
[00:58:50] TEACHER: Thank you.   {#869}
---- OWNED SEGMENTS END ----

CTX| [00:59:55] TEACHER: Let's start with the   {#870}
CTX| [00:59:56] TEACHER: the second half so now what we'll talk about is we'll talk about how amazon does it uh fii i know   {#871}
CTX| [01:00:03] TEACHER: this because the team that did it sat right next to me so i used to attend a bunch of tech talks   {#872}
CTX| [01:00:09] TEACHER: there but uh i had a bunch of questions to them and kept on asking it clear how do folks do that   {#873}
CTX| [01:00:14] TEACHER: and they were kind enough to explain it in a in a public tech talk so okay so what amazon does   {#874}
CTX| [01:00:21] TEACHER: is for every order that you place is they assign a global ID to that order and that is unique.   {#875}
CTX| [01:00:29] TEACHER: Given the high throughputness of the system and plus not just this that they provide ID to a lot   {#876}
CTX| [01:00:36] TEACHER: of other internal services. One of them happens to be order which we all use on a day-to-day basis.   {#877}
CTX| [01:00:43] TEACHER: So that had to be unique. So what they had is they you leverage batching. Batching is one of the most   {#878}
CTX| [01:00:51] TEACHER: performance out of any system FII.   {#879}
CTX| [01:00:53] TEACHER: So what they do is they have something like this.   {#880}
