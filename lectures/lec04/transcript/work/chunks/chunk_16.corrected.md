**[02:59:03] Teacher:** Think on those slides.

**[02:59:06] Student 6:** Yeah.

> **Student Question [02:59:07] - Student 2:** If just small follow up with, if the average time to query a particular table for a particular record, let's say for a particular variable, it goes up. Then if we have a very frequent use case for that, we should think about expanding our connection pool for that DB.

**[02:59:24] Student 2:** Correct. [check: "Correct." may be the teacher answering] Yeah. Thank you. That was very insightful. Yeah.

**[02:59:29] Teacher?:** Great. Deepak.

> **Student Question [02:59:31] - Student 4 (Deepak):** So I wanted to know like in case of a database server, we have multiple, we have fixed number of codes and each TCP connection is two codes. [check: "codes" - cores or ports?] So how we maintain more than 30,000 connections?

**[02:59:44] Teacher (answer):** Yeah, just a Google search. Just a Google search. See something that can be [unclear: "Google search to ECD"]. I would recommend do that. Do a Google search, in case you still don't find an answer, more than happy to answer it, but spend some time because you will stumble upon something very interesting. So, Hussain Nasser has a great video on that. You'll find a couple of Stack Overflow answers on it. Like, how that happens. There is a hardware specification that you would stumble upon. Google search. Google search. Right? In case you still don't get an answer, by third week, I'll be more than happy to answer. Because that's when it would be much more relevant. Right? More than happy to answer that.

[03:00:19] Sure. Husha?

**[03:00:20] Student 15:** Can you hear me now?

> **Student Question [03:00:22] - Student 6:** Yeah. So, yeah. I was asking key when we use TTL to save space, we are increasing computation power on Redis side. So how to do that trade-off.

**[03:00:34] Teacher (answer):** [unclear: "How did it is"] that the space was important. That's why we did that.

**[03:00:38] Student 6:** Yeah.

**[03:00:39] Teacher:** In case space is not important. You skip that. Okay. You just keep those entries handy there.

**[03:00:43] Student 6:** Okay. So that computation power won't slow down the system that much, not

**[03:00:48] Teacher:** much because it's in-memory deletion. It's peanuts for Redis. [unclear: "speedups"] Oh, thank you. Yeah, great questions. Quite, quite interesting, loved every one of them. Nice. I have a couple of notes to make on this point because these are excellent questions. I loved it. Thanks, thanks so much. Any other question, anyone, before I wrap? Yeah, anything?

> **Student Question [03:01:12] - Student?:** So, so today I mean I quite learned like, like how to do like, you said, right, the gain something, we have to lose something. Right. So, you know, how to build that intuition that we are making the right choice, we are making the right trade-offs.

**[03:01:32] Teacher (answer):** So at the end of eight weeks, second era, you'll have this intuition. [unclear: "Bill"], every single decision, every single system will design. We'll do this. We'll spend hours talking about those trade-offs over time. Intuition will be the hundred percent. Right. Of this course

**[~03:01:51] Student?:** which I understand now that it just pro I'll and today we didn't have any brainstorming

**[03:01:56] Teacher:** Right, but next week on what, when we'll have those brainstorming, right, we'll not move forward unless and until we have answers that why are we making a certain decision, what are the trade-offs for that, and then only we'll be moving forward. So over time it will be done, don't worry.

> **Student Question [~03:02:07] - Student?:** And also you mentioned about not to overthink and just go with a certain solution and just try it on. Yeah, so learn about that? Like, at what stage we need to just stop it and just go with the solution.

**[03:02:26] Teacher (answer):** That would be, it will happen. Sixth week, we'll wear three hats. Six week. We in one of the discussion, like it's not, and obviously this is not just an engineering course. So what we will do is we'll think from different perspectives, same system from a management perspective, from managers, from product managers perspective, from senior engineer perspective, from junior engineer understand where to draw that line. So all of that is covered. Six weeks, second day, we'll discuss that.

**[03:02:56] Student 6:** Great. Thanks. Thanks.

**[03:02:59] Teacher:** Gaurav?

> **Student Question [03:03:01] - Student (Gaurav):** So this is very, very basic question. You mentioned in the very beginning that HTTP is a stateless and the connections are not always on.

**[03:03:10] Teacher (answer):** No. So, so HTTP is designed to be stateless people like, but you can still have a persistent HTTP connection where you can pass in that, basically keep. Your web server understands that I've got this keep-alive header. So I'll not terminate it, but HTTP in itself is a stateless thing. Okay. Which means that it's one request. You send a request, you get a response, deal done, but there are ways to keep the connection support. HTTP/2 keeps the persistent connections. WebSocket keeps up. WebSocket is not HTTP, but it keeps the persistent connection. So there is no rule which says that you cannot, or you have to always terminate the connection. Right.

[03:03:49] But what happens is the web servers have made those hacks by passing in a specific header. The web server would not terminate because what happens is your client sends a request, your server sends a response and server terminates the connection. So if your server doesn't terminate a connection, client does not terminate the connection. The connection will always remain open. Which is what this keep-alive header that you pass in to keep the connection open does for you.

[03:04:16] But [unclear: "motor motor"] overall understand that HTTP, think of it as a stateless. It would simplify your design much because making it stateful, you would find other better options. Like for the WebSockets, MQTT that would come in very handy when you'd want to make HTTP state. Right. But that's a simplistic way, overly simplistic way to do it at one, in one of the systems in the future, we'll use [?HTTP/2 | asr: "HTTP to"] specifically and we'll keep it stateful. Right. We'll also talk about that. But where to use it, how to use it, we'll go into depth of it and then make that same decision. Why are we going on those routes and not making a statement? So we'll talk about it. So a lot of things will be covered. So fifth week, second day.

> **Student Question [03:05:00] - Student?:** And also in one of the resources that you shared previously, it was mentioned that HTTP cannot be used on top of TCP. Is it true?

**[03:05:08] Teacher (answer):** HTTP is on top of TCP. Which resource was that, Baba?

**[03:05:11] Student?:** Okay, I might have misunderstood it.

**[03:05:15] Teacher:** Share it with me, share it with me. Just, just drop me a DM. I read through all three. I don't think there is any, but in case there is something I'll just shoot a clarification. HTTP is TC. [check: cut off] HTTP is a protocol. HTTP is a specification. And TCP is the [?layer 4 | asr: "layer for"] protocol. So no relation. So you can run, you can send HTTP message on top of UDP also. No one's stopping you from doing that.

**[03:05:37] Student?:** Right. So that's fine. Thank you. Sure.

**[03:05:40] Teacher:** Sankal. [check: name spelling]

**[03:05:47] Teacher:** *(admin)* So [unclear: "I got gone"]. So I can be inaudible. So shoot me a DM with your question because morning also your voice was not that. So check the mic, shoot me a DM, more than happy to answer your question. Right. Great. Any other question? Anyone?

<!-- topic-candidate [03:06:12]: Wrap-up (admin) -->

[03:06:12] *(admin)* Super. Thanks folks for tuning in. Upload the recording by tonight. I'll shoot a message. I'll shoot an email when that's done. Sometimes it's happened by two also. But I cannot commit to that. I can commit to end of the day. So we'll upload the recording, upload the notes, what we just shared. You'll have access to that. You'll get an email on that. See you folks tomorrow morning. Remember that fun exercise. Do that. We'll discover something very interesting tomorrow. Right? Sure. Thanks folks for tuning and have a great day. Bye-bye.

**[03:06:43] Student 8:** Thank you. Bye. Thank you.
