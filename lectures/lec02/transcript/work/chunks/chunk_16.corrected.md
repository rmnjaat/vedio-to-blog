> **Student Question [03:07:44] - Student 2 (Sampat):** So my question is about the DB schema where we were designing the channel DB schema. So what was the reason we are storing the type of the channel? Explicitly like, Revisit your recording. Revisit. Let me, sorry, my question didn't come from. [check: "Revisit your recording. Revisit." may be the Teacher speaking (diarization)] So why did we choose to store the type of the channel? Like whether it's a DM or it's like a channel channel?

**[03:08:10] Teacher (answer):** You can render it on the UI. That's what I said, right? You could render it on the UI accordingly.

**[03:08:15] Student 2:** Rather, we could have just stored it, whether it's a private or public and then everything since it's a channel. So it can have multiple members, whether it's two or more, or if it's private, then it's basically a DM. If it's a private channel or it's a public channel, it's a public.

**[03:08:33] Teacher:** How will you differentiate between a channel with two people and a DM?

**[03:08:38] Student 2:** Okay. So everything is a channel and our channel consists of two members, but if it's a public, then it's a channel. If I can also create a private channel with two people contact, you can create a private [check: diarization seam - sentence continues in the Teacher's turn]

**[03:08:54] Teacher:** channel with, yes, [unclear: "the same whole"], and then add more people to that. But in DM, I cannot add more people to that. Correct. I need different ways to render it on the UI. That's what I said. Right.

**[03:09:07] Student 17:** Okay.

**[03:09:09] Teacher:** were going, I knew where you were going. I knew where the confusion was. That's exactly what I said. I covered it already. Right. To render it on the UI private channel with two people also exist. DM with two people also exist private channel, two people, public channel, two people, DM, two people, DM can also be made private or can also be made public tomorrow if they want to. Right. You just want to keep things extensible. That's why

**[03:09:32] Student 4:** [unclear: "you are type two."] [check: diarization seam - "you are type two" may end the Teacher's sentence] Okay. Okay. I understand.

**[03:09:38] Teacher:** I have this tendency because I know I'll just work on that point taken. Sorry. Sorry for that. No issues. Yeah. [check: speaker - "I have this tendency ... Sorry for that." may be the student]

> **Student Question [03:09:51] - Student 10:** So, why when we're talking about WebSockets, you talked about the client has a limit of six concurrent connections. So is it shared among the tabs? Yeah. So, so like, for example, like Google is there. So it, it has lots of applications in sub domain. Like maps.google.com.

**[03:10:15] Teacher (answer):** Sub domain is the one. So mail.com chat.com. Oh, sorry. Basically chat.google.com. So it's at the domain level. So when I said, when people say domain, it's the entire domain, the host name of it. So it may include multiple levels of sub domain dot main TLD, main domain dot TLD. Thing that has to be so six connection for Gmail, six connection for chat, six connection for Meet, six connection for something, right? The host name matters. Okay.

**[~03:10:39] Student?:** Got it, got it, thanks.

<!-- topic-candidate [03:10:51]: One-on-one request and recording *(admin)* -->

**[03:10:51] Student 2:** *(admin)* Yeah, hi, I wrote a message to you, so I just raised my hand so that you don't miss my message. I need some time for you with you for 10 minutes after session.

**[03:11:04] Teacher:** *(admin)* Okay, fine. But I'll have to shut the session off. We'll do it afterwards. Just really compile all the questions and basically block one-on-one. That's easy. I have to put it part of recording. I have to start it as soon as possible. Because if my laptop crashes, it's gone. I cannot do that. So just block a one-on-one for that.

**[03:11:24] Student 2:** *(admin)* Just right after the session?

**[03:11:26] Teacher:** *(admin)* No one has fixed time, right? Monday to, Monday to Friday evening time, that time you, you basically compile a list of questions, otherwise just drop me a message on Discord or something, I'll drop your message. That's, that's the easiest, that's the easiest, because I have to trigger the recording in case my laptop crashes, the entire thing is gone. Let's not write this question for the recording then. [check: diarization seam - "Let's not write this question for the recording then" may be Student 2] No, no, that's why, because this entire thing is gone, which is what I am worried about, right? More than not. I cannot lose this. That's why.

[03:11:56] Abhishek? No problem. [check: speaker - "Abhishek? No problem." may be Student 2 addressing the Teacher by name]

<!-- topic-candidate [03:11:59]: Q&A - WebTransport, Slack vs WhatsApp data loading -->

> **Student Question [03:11:59] - Student 10:** Hey Abhishek, just one last thing. So I think we discussed a lot about [?WebSocket | asr: "web software"], but

> **Student Question [03:12:04] - Student 7:** I have read that there is also a web transport specification coming up, right? Where they're trying to address as an alternative to [?WebSocket | asr: "web software"]. [check: diarization seam - Student 10's sentence continues here, possibly the same student]

**[03:12:13] Teacher (answer):** I'm not sure about it, but thanks for adding. I'll look onto it. Web transport. But in case I find something I'll definitely share. Maybe in. Let me just read about it. I'm not at all. I've heard it for the first time, to be honest. I'll look into it. Thanks.

> **Student Question [03:12:34] - Student 8:** Yeah, I actually wanted to compare two things here. I mean, if I see here, it's a, it's a, it's basically used for real-time communication here and I want to, to compare a Slack and WhatsApp [unclear: "meet my"] implementation in order to load the data. Which, for example, if a user is coming online, there must be some sort of data that we have to share it with the user as soon as it comes up. So let's say for the WhatsApp, it makes sense that, let's say a user comes online, the WebSocket connection is made, it fires an event, and then for that particular user, the old data is being relayed and channeled by a server, and the server data is being refreshed. But for Slack, it is different. And the reason being WhatsApp stores data in the client app. It's user device.

**[03:13:22] Student 13:** Yes.

**[03:13:22] Student 8:** User device. While the Slack stores in the database that is in the backend. Correct. Then I'm just thinking that in that way, the way or the communication channel to refresh the data should be API rather than doing it via [?WebSockets | asr: "web servers"].

**[03:13:37] Teacher (answer):** Correct. You would never see, by the way, on Slack, do you ever see old messages [?relayed | asr: "relate"] to you? No, you just see these are unread messages. Right. That's not coming over WebSocket. So WhatsApp has to get those messages delivered to you on your device, because it is stored as you, as you very rightly said. But on Slack, if you log in, let's say you went on a vacation, you came back, you logged in, you just see, oh my God, there are 200 unread messages. I have to go through. It doesn't send you those messages. It's just there. Which is where the checkpoint that we added in the membership that would help.

**[03:14:13] Student 8:** Yeah. I actually was just thinking that how the difference would be in both the implementations

**[03:14:18] Teacher:** for all the way we were discussing Slack's real-time [unclear: "cover"], but we covered so much around it. And you see how all of the systems are interconnected. It just that few changes here and there. And you get a brand new system out of it. This is one pattern fits everywhere.

**[03:14:39] Student 13:** Thank you.

<!-- topic-candidate [03:14:40]: Class close *(admin)* -->

**[03:14:40] Teacher:** *(admin)* Superb. Great. Alok sir, just stay back on the call. I'll just do it right away. You would be five minutes. Thanks folks for tuning in. I'll upload the recording by evening. Next week distributed systems and ID generators will be shared today to go through them and more importantly, implement, implement everything that is a small hello world. Just small. Especially for Redis Pub/Sub. Use that once. Use that one. It's not really difficult. After 10 minutes of your time, you'll learn much more. You'll see where it does not give you persistence, how it sends, pushes and whatnot. Right. Okay. Thanks folks for tuning. It was fabulous session. One of my best. Thanks. Thanks so much for great questions. See you folks next week. Bye. Bye.
