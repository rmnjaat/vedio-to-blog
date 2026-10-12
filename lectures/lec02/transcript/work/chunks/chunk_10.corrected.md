**[01:52:08] Teacher:** So whichever channel is a part of it tells the WebSocket server one that I am part of this channel one. Let's say A is part of channel one. A is part of, basically membership information, let me write it this way. So A tells the membership information that I am part of channel C1, channel C2 and channel C3 over here. Anytime any user A, B, C or D, any user joins any WebSocket server, it tells the WebSocket server that, hey, I am part of these, these, these channels. WebSocket server keeps this information in memory, or maybe storing it in disk, whatever, it's okay, right? It keeps this information with itself, so it knows that which all users are connected to me and which all channels are they part of, right? Similarly, on this WebSocket server 2, it would know that E is part of WebSocket server 2, knows that E is part of channel 2. So WS1, WebSocket server 1 would know A is part of channel 1, B is part of channel 1, C is part of channel 1, D is part of channel 1. This is what would be stored on WebSocket server 1 and this is what would be stored on WebSocket server 2.

[01:53:36] Right, okay, we have this information. Now again, the protocol was, when a user connects to a edge server, the first information is sent to the WebSocket server is what, which channels is it part of, right? So WebSocket server one would know that anytime a user joins or removes a channel, the information is sent to the WebSocket server. Also, WebSocket server is kept in eventually consistent state with the membership information. How user tells it? User periodically sends this meta information to the WebSocket server one, that which all channels are am I part of and whatnot. This, this just information, just membership information, it tells it, right? Okay.

[~01:54:09] Now when user A sends a message, so what user would, A would send, this message is intended for this channel, right? So the message would come to WebSocket server one. WebSocket server would say, okay, this message is intended channel 1. Which all users are part of channel 1? A, B, C, D. So A sent a message, I would not send it back. I want to send message to B, C, D. So it sends this same message to B, C and D. This is how A's message is sent to B, C and D. Right? But now E is also part of the channel. How would he receive the message? How would he receive the same message that was meant for channel A, just because he is in some other... It's like literally humans, you, you all group of friends are in one room, in one hotel room, two of your friends are in another hotel room. You folks are having all the fun. How would they be part of that fun? How would they know what you folks are doing? Like, they also want to be part of, like, they also want to have fun. Right.

<!-- topic-candidate [01:55:21]: Sending the message to a user on another WebSocket server -->

[01:55:21] But so then you have to do something such that this message reaches E. How will you do that? Raise your hands.

**[01:55:35] Student 3:** Probably through the API server that connected both of the WebSockets, as in the last time, but then that would be slow, right?

**[01:55:41] Teacher:** [unclear: "Doing my API server"] and this and that. How do you do it? You have this, these items here. WebSocket one, WebSocket two, two WebSocket servers. You want message, this message to reach there. How would it reach over here? From WebSocket server one to WebSocket server two.

**[01:56:07] Student 3:** Caching some of the information of users on each WebSocket.

**[01:56:11] Teacher:** You already have that information over here, that all the people connected to this WebSocket. You have this information over here. What else are you caching? Where are you caching? Okay, so we cannot cache that. E is connected to WS2. Let's say you have that. Let's say you have that information. Then now what will you do? Let's say you know E is connected over here. Now what would you do? We would somehow signal. How? Right, let's go into those details. How? How this message would reach over here? No idea. No idea. Okay. We'll go into the first principles of it. Like, how do we even approach an unknown situation like this? Right? Like, how do we even think about a solution like this? Okay. Let me put in Amrik [check: name spelling]. Amrik, how would this message reach WS2?

**[01:57:00] Student 3:** Some messaging service, maybe Kafka or one more.

**[01:57:05] Teacher:** Why are you picking a messaging service? Can there not be any other way to do so? The messaging service slows down. You need to have bunch of consumers running. How, like, this server would be consuming so much of stuff from there. So problem, problem. Start simple. Start simple.

**[01:57:24] Student 3:** What do you do? [check: "What do you do?" may be Teacher - diarization seam] We can send the replica of that message to some another. There can be some, [?server | asr: "so let's"] just connecting these two WebSockets also.

<!-- topic-candidate [01:57:35]: TCP connection between WebSocket servers -->

**[01:57:35] Teacher:** Why do you need another server to connect? Why can't these two machine talk to each other? You create TCP connections all the time.

**[01:57:41] Student 10:** Oh, okay. That means the, [unclear: "both of the poor"] can communicate to you.

**[01:57:46] Teacher:** Why not? Why not? You just establish one connection with this one WS2 server. Isn't it? Hmm. Right. You just create a normal TCP server, may not be, it doesn't have the WebSocket connection, normal TCP connection. And what you do is just take this message and send it to this, would get this, or would receive the message, would see, okay, this message is for channel one. It would see which user is subscribed to channel one or wants message for channel one. It says E, it sends data to E. Okay. Right. This can be just a simple TCP connection, a real simple TCP connection. Right. Why do you want to introduce some more complexities on that? Right. So this is a bare, bare minimum that you have to do when you want two machines to talk to each other. Correct. Yeah. It's a bare minimum. Have a TCP connection established between them.

[01:58:38] So I need one TCP connection. So one TCP connection for each web server, each WebSocket server. I have one WebSocket connection for all the users connected and one TCP connection to talk to another WebSocket server. But now this solves our problem. This solves our problem, that message from A, which was meant to be sent for channel 1, is now properly sent to B, C, D and this TCP connection. This message is received by WS2. It says, okay, this message is for channel one, which user is part of channel one. It got E and this message is sent to E. So all the people are now getting the messages of this particular channel that was sent for this channel 1.

[~01:59:34] Now let's spice it up a bit. Now let's say I have one more server here. Let's say this is WS3 and I have a user F which has now joined this channel, and this user F has now joined channel 1. You added that person is now joined channel 1, and now F, when F established the connection, F established a WebSocket connection with WS3 for some reason. And now what you need to do is this message. Now let's say A sent another message. A sent another message. This message was again sent for channel 1. The message sent for channel 1 came over here, sent to B, C, D, over this TCP connection to over here, and now it's sent to E, right? E received it. But now, similar to how and the connection was established over here, you say, hey, let's build a TCP connection over here, right?

[~02:00:42] So now what would happen is the, the message that is sent over here goes to this, sends to BCD, over this TCP connection message comes over here. Over this TCP connection message comes over here from here. It says, okay, I have C1, for C1 I have to send message to user E. Some messages sent over here from here. It says, for C1, I have to send it to F. The message goes over here. Problem solved. Right, here what you can see is the same message that was intended for all the people part of channel C1, everyone gets the message, right? Okay. What is a disadvantage of this architecture?

**[02:01:32] Student 3:** Amrit [check: diarization seam - "Amrit" and "okay, right, but it's happening in real time, that's fine, okay" may be Teacher], maybe E and F will receive the message after some time it will take. Okay, right, but it's happening in real time, that's fine. Okay. And just WebSocket one server has to maintain too...

**[02:01:45] Teacher:** What do you mean by too many connections?

**[02:01:47] Student 3:** It means this TCP is also an overload to TCP and to ABC and D also.

**[02:01:56] Teacher:** But then you have to do it. There is no other way. You have to do it. Otherwise, how would you communicate? Okay.

**[02:02:05] Student 10:** I can currently think of this.

**[02:02:07] Teacher:** That's fine. That's fine. We'll come. Now we'll see how we started with a problem. We started with basic fundamentals, solved it. Now, now we are thinking of making it better, and that's how we should approach any problem in there.

[~02:02:19] Right. Okay. Yes, Jodhinder [check: name spelling], what would you do over here?

**[~02:02:19] Student 6:** So yeah, like, we could have like these TCP connections between all the servers, like it will sort of form a mesh, but then each server is responsible for making sure that all those connections stay alive. If any of those connections die, you have to establish those connections, and I think that itself adds a lot of overhead, or something like that. So maybe... But why? [check: "But why?" may be Teacher - diarization seam]

<!-- topic-candidate [02:02:45]: Mesh of WebSocket servers - overhead -->

**[02:02:45] Teacher:** Why? Why is that an overhead? So now what you said is you are typically creating a mesh, that every WebSocket server one, or every WebSocket server has to be connected to every other WebSocket server. Right? Which means literally everyone is connected to every other one, no matter how many servers are there. So what's the problem with this? Why is it an overhead?

**[02:03:05] Student 6:** One issue, like, other than like, one issue could be, if some server goes down, connection is not there. It could, it would basically just miss that message or any.

**[02:03:17] Teacher:** So that's okay. That's okay. But what else is the issue? You, you, you talked about overhead. What kind of overhead are you seeing over here?

**[02:03:24] Student 6:** Sorry. You're sort of like, sending one message to like every single server, which might not actually need it.

**[02:03:34] Teacher:** No, you can minimize that, optimize that by having a global state. So let's do that. If, even if you do that, what's the overhead? There's a much bigger overhead, much bigger enemy staring. It's like literally there is a dinosaur behind you which is staring at you, but you are just worried about a small mice.

**[~02:03:48] Student?:** Yeah, I'm not able to think of it.

**[~02:03:48] Teacher:** That's fine, that's fine. That's why I'm here, right? I'm just, I'm just [?prodding | asr: "proving"] you folks to think on those, like, see what overhead would come, how would you make it better. I'm just picking people who have not spoken much. Harsh gone [check: name], just trying to be fair to everyone.

**[~02:04:04] Student 9:** Yeah, so I think I'm not sure what this communication looks like, more synchronous communication, and we should have some asynchronous mechanism here.

**[02:04:21] Teacher:** Okay. First let's talk about what's the overhead that you are solving. Like, what is the problem that you're solving with that asynchronous thing?

**[02:04:29] Student 9:** If any server is down, whenever it is available. That's not a problem.

**[02:04:33] Teacher:** You're talking overhead. What's the overhead? Down is basically fault tolerance. Right. What's the overhead?
