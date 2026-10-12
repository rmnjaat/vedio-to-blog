> **Student Question [00:48:36] - Student 3 (DK):** Yeah, so when you were discussing the last point, right, about auto incrementing by one, two, three, four in both the servers, so can't be like auto increment by like the number of servers we have, basically? If you have two, then zero, two, four, and one will disparate, like one, three, five.

**[~00:48:53] Teacher (answer):** Yeah, we can do that, but there is a slight disadvantage to that, we'll discuss in the second time. [unclear: "i have it covered f5 right"] Okay DK, yeah. [check: speaker boundary - "time i have it covered f5 right okay dk yeah" is labelled Student 3; "okay dk" sounds like the teacher]

> **Student Question [~00:48:59] - Student 3 (DK):** So instead of static counter, why can't we use a random ID generator here and append it to the

**[~00:49:12] Teacher (answer):** We'll talk about it, random. But great, great that you folks are already thinking about this. I am so loving this much. You folks are continuously thinking, but which is where the static counter would pick, because we wanted monotonicity. That's why we went for that. Random ID does not give you monotonicity. That's why I said that if you need monotonicity, like, you may not always need monotonicity. You may think you need monotonicity, but in reality, you can relax those constraints and say, hey, what if I don't have monotonicity? Then you can go for a random ID like UUID. Right, right.

> **Student Question [00:49:45] - Student 3 (DK):** So that is my second question. Why can't you use a UUID instead of all this complexity?

**[00:49:50] Teacher (answer):** We can, that's what I said. Relax the constraint. If it's okay for you to relax the constraint, then use UUID. Don't rely on strict monotonicity, because not everyone needs that.

**[00:49:59] Student?:** Got it. But in that case, I think we will not be able to, you know, give that ordering, if you are using UUID. Got it.

**[00:50:05] Teacher:** You get some, you lose some. Got it. Got it. [check: speaker - "Got it. Got it." may be Student 3] But we'll talk about UUID. We'll talk about MongoDB IDs, UUIDs and whatnot. We'll see where you can use it, disadvantages of it, how monotonicity would help you, all of that, like, real practical situations where ID generation, you really need need kind of thing. We'll go in there after that. I've got it. Yeah. [check: speaker - "I've got it." may be a student]

> **Student Question [00:50:30] - Student 2:** So basically my question is about the central ID generation. So what I was thinking is like a center server, which generates ID, you told us about the distributed, distributed thing also, just a second.

**[00:50:49] Student 3:** [check: speaker - may be Student 2 continuing after "just a second"] You also told us about the distributed ID server also. So what we can basically do is, basically we can have like a particular ID, like ID for each server that we have, like, in the distributed system, in the ID servers, and just like they can have their own logic for like creating, creating, and they append, they just append their own ID server to that logic which is generating IDs.

**[00:51:25] Teacher (answer):** But you are losing on monotonicity. That's fine. That's fine. That's okay. There is nothing wrong in it. That's what I'm saying. There is no one right way to do it. For some, it works in one way. For some, it works for other ways. But your approach is also correct. You get some, you lose some. I'm just discussing on the core idea behind ID generation. And now when we go into the specific examples, you'll see that, hey, if you're getting advantages on a certain part, you'd be losing on certain part, but at the end, it's a trade-off that you would have to make, what you want and what you can give up, by maximizing the throughput and performance and efficiency of your system. Sure.

> **Student Question [00:52:12] - Student 4:** I wanted to propose one more solution for the part where we wanted to reduce the disk IOs. So, can we do something like, when the server restarts, we read from the database, get the last counter saved in the database, and then start incrementing ahead? So we wouldn't need those periodical saves as well.

**[00:52:35] Student?:** So then you are writing to database every time? [check: speaker - teacher-style challenge]

**[00:52:39] Student 4:** No, so we'll have some last row which was saved to database.

**[00:52:44] Teacher:** That's what I'm saying. This is not where we are using it and storing it in database.

**[00:52:47] Student 4:** No, no, no. Not the IDs. Let's say we are saving messages to database. Now that message ID, certain row has a message ID which was last saved to the database.

**[~00:52:58] Teacher (answer):** That's exactly what this load is actually doing. This load is actually doing that itself. Writing it to the database, one and the same thing. You are starting from that particular point. Correct. But then how are you, but here you are assuming that you are writing this, this, whatever you're doing using this get ID for, you are writing it back to database. That row is getting inserted. I'm not even assuming that. Got it. You are assuming that an entry is getting created in the database for every single thing. And then you are picking the max row and then starting from that.

[00:53:35] I'm not even assuming that you're using this, like, in this approach, I'm not even assuming that you are writing back to the database, because that is anyway expensive. Right. I'm just focusing on this ID generation logic, but then what you're proposing, max row ID, and then you start from the, that's exactly what this load function is all about. Here I'm [?talking | asr: "tracking"] about loading from the disk, but with this, you're assuming that when you get an ID, then you are doing something and then you're storing things into database. And then that's an expensive call that you're making. I'm not even assuming that you're [unclear: "student"] back to the database. You're just attaching something in this, basically pushing it forward. Let's say request ID kind of thing. Right? Yeah. Okay. Yeah.

<!-- topic-candidate [00:54:17]: Break (admin) -->

**[00:54:17] Teacher:** *(admin)* Let's take a quick break for five minutes. Once we come back, what we'll talk about is, we'll talk about how Amazon does it using central ID generation service and then other use cases. I'll show you a very nice demo of why people, why people go for a certain way and not the other way, and how to make those particular trade-off decisions. So we'll take a quick break for five minutes. We'll [unclear: "sing back"] at 10. And we'll talk about Amazon, Flickr, Twitter, Instagram, and pagination. A very interesting side effect of having a good ID generation system. We'll talk about it. See you folks in five minutes.

[break ~00:54:56-00:59:55]

**[00:58:50] Teacher:** *(admin)* Thank you. [check: possibly hallucinated in silence]
