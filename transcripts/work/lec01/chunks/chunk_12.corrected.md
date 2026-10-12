**[02:14:14] Student 2:** Okay. There can't be anything else.

**[02:14:17] Teacher:** No, because TCP connection breaks, right? As a server went down. Okay. But acknowledge the request. Acknowledgement will be sent at that time only when the request is sent, but the response is specific. That's your use case. What you're building depends on that. Right? Let's say we are only fetching the next, if you're just fetching the live cricket score. [unclear: "bold"], you would not get a response. Right. So [unclear: "if I didn't middle"], if the, if the connection breaks, you send a request, I can get the latest commentary. You'll get the response. But the next one is gold. Okay. Right. But if you're talking about payments, that's a different problem. You're talking about e-commerce is a different problem. Right. So depending on what you are building, you can have this retriable or not. It depends on that. And so it's very use case specific. Think of a use case and then model it with long polling. So first write a hello world with long polling. Pick a use case and implement it for that. Okay. Yeah.

> **Student Question [~02:15:10] - Student 4:** Hi. So we talked about the WebSocket example in case of stock trading, that tickers. So for, for any client, those tickers will be sent only for the watch list script which a client has added. So on the server side we are sending these updates to this client. So are we, how are we trying to, you know, send them all?

**[02:15:44] Teacher (answer):** It's not that huge of a data. How many markets, how many companies are listed? 10,000? One integer for each, 10,000. 10,000 integers. One integer is [?4 bytes | asr: "4 by 2"]. 10,000 into 4, 40,000. 40 KB every second. Nothing much. Right? Okay.

**[02:15:59] Student 4:** Yeah, thanks. Right?

**[02:16:01] Teacher:** So over complication, like, I stay away from over complication. Like, I like to build simple systems. Why to do filtering on the server side? Send all the data, let it be filtered on the client's, right? Because that's not huge amount of data that you are transferring here and there.

**[02:16:18] Student 4:** You anyway have to do that, right? Yeah, thanks. Thanks everybody. Yeah, I wish.

**[02:16:26] Student 1:** Here. So you can, you can set up this [?SSE | asr: "ssc"] over a LB as well, right? So that, that way your backup servers can be scaled. Yes. Okay, okay. [check: "Yes" may be the Teacher answering] [unclear: "and above"]

> **Student Question [02:16:41] - Student 3:** So I wanted to understand, could we implement an push notifications using server [unclear: "site so send you"]

**[~02:16:48] Teacher (answer):** And post notifications is very different. Push notifications are extremely different way to talk to this. So the way it works is very different from either WebSocket or... You can mimic a push notification. I'm using very strong words. You can mimic a push notification through server-sent events. But push notifications in itself are totally different. And so the Google Cloud Messaging or Apple push notifications or APNs, they work in a very different way than WebSockets and server-sent events, because they have to have different guarantees. This needs to have different guarantees. So this is under your control. That is typically not under your control. But you can still mimic push notifications by this, where you make a call periodically to check if there are any notifications. Then you mimic a push notification. Like from app itself, you create a push notification for yourself. For example, how your basically calendar app does. That if you have a meeting, even if you don't have internet, you still get a push notification. How? The reason for that is that your app itself is generating push notification for your app, can do that. So it's mimicking the fact that you are getting a push notification, but internally, it's your app who has raised a push notification for itself, giving you a seamless user experience. So you can mimic, but you cannot implement.

**[02:18:14] Student 3:** And the guarantee issues could arise because our server-sent event could be lost in a network due to congestion or anything.

**[02:18:22] Teacher:** Even push notification can get lost. But the protocol specification of a push notification is different from server-sent events. That's the problem, because cloud messaging works on different guarantees. They have different specifications, which is optimized for, because push notifications can come to you anytime. Imagine having a persistent connection open one with GCM always. Very inefficient, right? So there has to be a more optimal way to do it. That's why they need a different protocol to do it altogether, work on very different. That's why GCM has different specifications than APNs. Hmm.

**[02:19:00] Student 3:** That makes sense. Thank you.

**[02:19:02] Teacher:** Yeah. Sandeep. By the way, just, just, just a basic, just a mention. How do I know this? I, it was like dreaded. I hated that one month when I was implementing push notifications using native. At that time I was, I'm talking back in 2015, just a fresher out of, like, I just completed, [unclear: "a joint tractor"] at that time, and we were building a push notification service at that time. Services that, like, SNS did not support good push notifications. They had very, very terrible delivery rates. OneSignal had just started. So we could not find any managed solution for push notification. What do we do? We integrated natively with GCM and APNs and build that infrastructure to do it. That's why I know how painfully hard it was to do it, and that's why companies like OneSignal, Twilio and all of this, they have abstracted it out. So now for you it's just an API call and they take care of push notifications, right? But it was fun. So in case you'd want, anyone would want to explore on that, just try integrating with GCM once natively, and you would understand what specification, how to send message, how it gets it. They have a brilliant documentation. GCM, GCM stands for Google Cloud Messaging. They have a brilliant documentation on what they are, how they do it and how to integrate. It's just one document. It's a big one, but you'll find it. So try integrating it in your native app and see how beautiful and how ugly it can get, both at the same time. Sandeep, yeah.

> **Student Question [~02:20:36] - Student 6:** So I just want to ask one question here. So basically you have WebSockets, one protocol, HTTP, under the protocol, but under the hood it's TCP connection. One is a persistent, the other one is not a persistent one.

**[~02:20:50] Teacher:** No, that is also persistent, but you explicitly break it.

**[~02:20:54] Student 6:** Yeah, you break it once you get the response.

**[~02:20:54] Teacher:** Correct, correct.

**[~02:20:54] Student 6:** So my question is, between the application and the DB, that is also persistent tp, that is also [?persistent | asr: "personal"] TCP connection. Yeah. But what is a protocol that they use there? They use some kind of WebSockets there, or...

**[~02:21:06] Teacher (answer):** No, no, no, no. No, for example, if you're connecting with MySQL, so MySQL has its own protocol as a TCP, but how does your server communicate a SQL query to the database? There has to be a way in which is okay. First byte is this, next four byte is this, next hundred byte is SQL query, next five bytes is this, right? That is a specification. So that is typically called as a dialect, MySQL dialect. So you might have heard this term. If you're using Golang, you would see you're putting SQL dialects.

**[02:21:41] Student 4:** Yes.

**[02:21:42] Teacher:** Your server uses a SQL dialect, which is compatible to the database. So MySQL has its own dialect. Postgres has its own dialect. MongoDB has its own dialect. At the end it's all TCP, but the way it sends the SQL query or any command that you are firing and your server understands it, it's very different. And it depends on the database that you're using, but under the hood, persistent TCP connection. And then the data that you're sending, 1KB, 2KB data as a SQL query, the way you structure it is the specification. With HTTP messages, in third week, we'll go through HTTP specification to understand why you should not use it at a certain place. We'll go through that. We'll understand how that works. But in a gist, the way you are sending a SQL command to the server to understand that dialect, that's what this specific, like HTTP is a format, WebSocket is also format, server-sent event has its own format, right? Now those specifications are the one that, that tells you how to bundle your message or your event and send it across, so that both the devices can understand it.

**[~02:22:56] Student 6:** Yeah. So basically, even though it's a persistent TCP connection between the app server and the DB, but the, the communication specification is very, it depends on the DB with which you're connecting to.

**[~02:23:06] Teacher:** That, which is correct. So just say, for example, Redis has RESP, which is its own specification. So anyone who wants to talk to Redis would have to send in messages in that specific format, right? MySQL has its own, Postgres has its own, WebSocket has its own, HTTP has its own.

**[~02:23:22] Student 6:** Okay, cool. Thank you very much, sir.

<!-- topic-candidate [~02:23:22]: Wrap-up and plan for next week (admin) -->

**[~02:23:22] Teacher:** *(admin)* Great. Any other question, anyone, across the session? By the way, this is all what I wanted to cover, all the six components. I'll share the pre-reads today for the next week. And by the way, before I take other questions, folks who would want to drop off, next week is all about databases. Saturday, we'll take a look at relational databases. Now we'll have brainstorming. Now we'll dive deep into implementation specifics. Saturday will be very interesting. I'll show you an actual demonstration of SQL transactions, blocking, concurrency, throughput, all of that, like, live here. Like, I literally run the code and show it to you and get the max out of our database. On Sunday, we will go through NoSQL databases, understand different types of databases for first one hour. And then one and a half hour to two hours, we'll have an extremely detailed discussion around building Slack's real-time communication. While we do that, we will not only build Slack's real-time communication, but also three different kinds of messaging apps along those lines. So you will see how the underlying architecture remains the same, while all we change is the guarantees that our system provides. So we'll see that, we'll see those in action there. So that's the plan for next week, Saturday and Sunday.

[02:24:52] So I'll upload the video. I'll send an email, shoot an email. Please don't use Hotmail. Hotmail is crap. For somehow it just masks the login emails as spam. Everything else goes through, for some reason. And they have shipped something recently because of which it is happening. If you have Gmail address, shoot me an email. I'll update your email to Gmail and remove that Hotmail from it. Earlier Gmail used to do it, but now Gmail is sorted. Hotmail is utter crap. So pick your battles. If you try to find, file a complaint with them, why it is not working, it should work. If it is not working, it's Hotmail's issue. I cannot, I'm not filtering anything out from my packet, right? So talk around those lines with the Hotmail team, raise a concern with it, right? Okay. So that's all I'm going to cover. Folks who want to drop a filter, drop off, I'll take some questions now.

<!-- topic-candidate [02:25:43]: Q&A -->

> **Student Question [02:25:43] - Student 1:** Yeah, do you think, go on. [check: "go on" may be the Teacher] So mostly the communication which we talked about yesterday, today, so basically we are focusing on the TCP only. So I would really like to have a discussion on the UDP side, and...

**[~02:25:58] Teacher (answer):** Too early, too early. Wait for week four, wait for week four. After that you will have, you may already have the answer for that. But wait, wait till week four, right? It will be too early. A lot of people will get scared. That's why I'm not going deep into it. I've used UDP twice, so I know where it thrives, where it does not. So I'll, I'll, I'll give you an idea in case you don't have, ask this question. It is that I'm avoiding to create that confusion. People would get overwhelmed by that.

> **Student Question [02:26:27] - Student 1:** And also, specifically, I'm intrigued about learning about the video streaming. Like how the video

**[02:26:36] Teacher (answer):** streams... Sixth week. I have it covered. It's there in the category. I have it covered. Don't worry about it. It's very easy. It's all CDN. It's all CDN. You don't have to worry about anything at all. I'll talk about how that happens. You pointers will not show you how to actually do it, but we'll give you pointers, which you can look up to and implement it on. It's not that difficult in our days. So yeah.

> **Student Question [02:27:03] - Student 6:** Yeah. So you talked about queue versus stream, right? Like typically wait SNS fall into these two, whether it falls.

**[02:27:11] Teacher (answer):** SNS is totally different.

**[02:27:13] Student 6:** Okay.

**[02:27:13] Teacher:** SNS is totally, SNS is neither a queue nor a stream. SQS is a queue. Kinesis is a stream, right? SNS is just a notification thing. You send a data, all ever who is subscribed to it, it just broadcast it to them. Simple. That's what SNS is all about.

**[02:27:29] Student 14:** So can SNS has no persistence.
