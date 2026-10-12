**[01:14:09] Teacher:** Created at and whatnot. You can iterate through this and go historical messages. Store membership information over here. Channel information over here [unclear: "is an information"] over there.

<!-- topic-candidate [01:14:19]: Membership as a noun - checkpoint -->

[01:14:19] And now the beauty of this design. Why I named it membership because it's a noun. It doesn't restrict us. Like if you hear the term user channel for this, I'm talking about this. If you think of user channel, you may think I would only just store a mapping of user and the channel. But now when you hear membership, now what you can do is you can actually store the checkpoint over here. What is this checkpoint? For example, a user is part of a channel. Now this checkpoint can store that I can, I have read messages till this point on the UI. You see the unread message count. You see you last read until here. And then like when you click on a channel, if there are a hundred messages, it takes you to that point. Right. That's a checkpoint that you last you read was still this point.

[01:15:16] With this, what you can do is you can implement checkpoint because you named it membership. It automatically wires your brain. It automatically triggers your brain to think that I can add more attributes to that. Now, what here you can do is in this user channel information, you can actually store that this user on this channel has read till this point, is active for this time and whatnot. You can add a ton of attributes over here, how a user is behaving or is interacting with the channel. Now this channel can be a channel or a user or a DM or anything, but this gives you a scope of extension. Checkpoint is just one placeholder that I kept it that I read till this timestamp. I need all the messages are now I can start reading from that. It shows you in a very nice way. So that is a checkpoint at last timestamp on this channel. I read till this part, right? Something on those lines. And whenever you open a channel, the checkpoint moves to the bottom of it. So the last message read might be there. So you can store timestamp, you can store message ID, anything over here depends on your implementation. Right.

[01:16:21] Which granularity you would want to, you either want to operate on the time level granularity that I read till this time, or you want to operate on message level granularity that I operate, I read till this message. So this checkpoint could be in it. But now with this membership as a noun, you can naturally see it extending into how a relationship of a user is with the channel. How active. Now, if let's say user muted a channel, add it over here. User favorited a channel, add it over here. No need to have another table to store favorites. That's the beauty of this design that you are keeping it really simple and giving entities like the entity of the table name. You are giving them identities, membership. Now it helps you go on those.

[01:17:09] Interaction that a user has with the channel, you can put it over here: checkpoint, favorites, read till, whatnot, like muted, these type of notification, that type of notification, what not. You can do all of that over here. That's why this table becomes that key thing in the system, right? Okay, done. Now this is done. Now let's go into high level part. Now this was like some key points that I wanted to throw out that you should always keep in mind. One key takeaways, noun-based stuff. How you are piggybacking and not having ifs and else's. Two big key takeaways from this.

<!-- topic-candidate [01:17:47]: High-level design - picking the database for messages -->

[01:17:47] Okay, now let's go into the high-level design of it. Now, how would Slack's real-time communication actually work? Now, obviously, let me make things simple for you. Let's say, hypothetically, we are storing the data, the messages in a relational database which is sharded. You can also store it in non-relational. You don't typically need to store it in non-relational over here because the frequency of messages is not very high. A simple sharded relational database would work. You can also choose to store it on a non-relational database like MongoDB or Cassandra. No one's stopping that from you because all you need is a way to store all the messages that are getting ingested, scroll through them, nothing more, nothing less. Even relational database would do a very good job over here, obviously given that it is partitioned and sharded. Non-relational database like Cassandra would also do. Cassandra like databases, where it is very ingestion heavy, you can use it to build very high ingestion system, for example real-time chat messages like WhatsApp or Instagram or Tinder or whatnot. Those kind of use cases suit very well for non-relational databases at scale.

[01:19:03] An enterprise application, for enterprise application the use case would be a little different because there is no huge amount of messages being exchanged. Once a while you don't chit chat, like people chit chat, but not everyone chit chats, sends hundreds and thousands of messages to everyone, because they are there to work. That's why picking a database depends on the product and the requirement, not your affinity to a particular stack. So which is where it's not customary for you to pick a non-relational database, but you would definitely need sharding and partitioning over here. So we can go for a simple MySQL or we can go for, as well as we can go for Cassandra, we can go for Mongo, we can go for any database. There is no hard and fast rule over here at all, because the scale is not huge. You can add more partitions, put a bunch of enterprise customers on a particular database and whatnot. You can get it done on a relational [?DB | asr: "degree"]. You don't need fancy NoSQL database to hold all of them. That's the beauty of this.

[01:20:04] So whenever you are picking something, understand where you are picking it from. What's the use case that you are solving? There is no big reason for you to pick Cassandra over here. But if you are building Instagram Messenger, I would have gone for Cassandra. Because there everyone is chit-chatting. All the data, all the users is present in this one database. Enterprise customers have different requirements. Normal users have different requirements. So I would have gone for high ingestion rate database. That's why Cassandra for Instagram use case. But for enterprise application, where this is not a real-time chit chat, you can do chit chat, but it's not, everyone is not doing chit chat. It's very formal messaging that is happening there. So even MySQL would work. I can still choose Cassandra, but even MySQL would work. So long as I'm partitioning and sharding, right? So there is no hard and fast rule over here. What you want, all good. Right? Okay.

[01:20:58] So we pick a database to store this. Now, in any case, you pick MongoDB, MySQL, Cassandra, any, the overall schema would look something very similar to this. Like, no major [unclear: "devils"] there. Right? Okay. Now, what next? We have users that are there in the system.

<!-- topic-candidate [01:21:17]: Sending a message - API server vs WebSocket -->

[01:21:17] Now, comes a really interesting point. Imagine Slack. Right? Only, so when a user sends a message, how should that message be persisted in this database? So raise your hands, I'll pull you in. Meanwhile I'll just draw a couple of stuff that we need. Okay. Now I have drawn just one API servers. These are API servers over here. Now, how would the message sent by a particular user be for a particular channel go and be stored in the database? What would you do? Yeah.

**[01:22:15] Student 1:** So what I'm currently thinking Arpit is like, first of all, there would be like some socket connection between the users and the API server. So that like we have a WebSocket connection and,

**[~01:22:24] Teacher:** Why do you need a socket connection? Why do you need a WebSocket connection?

**[01:22:32] Student 1:** So basically a point is like when a user sends a message, somebody would be replying to it and it would be like happening very on instant basis. So we need to like communicate from server to client also. Like we need to tell server to like inform all the clients of that channel that we have received a message.

**[01:22:53] Teacher:** But this does not mean that sending also needs to be done on [?WebSocket | asr: "best topic"]. Does it? Receiving? Okay. So that people don't have to refresh. Right. But sending.

**[01:23:06] Student 1:** So when we are sending the notification from server to, like we'll send the notification from server to client, right? That you have received a message.

**[01:23:15] Teacher:** That is WebSocket. But sending a message. You said sending a message will happen over WebSocket. Why? Why should it happen over WebSocket?

**[01:23:22] Student 1:** Okay. So like I thought of because we need server to client also. So anyways, I'll be using WebSocket. So I can use it for sending also.

**[01:23:32] Teacher:** Why there has to be a [unclear: "proper ISD"], right? Just because you have it does not mean you have to use it. Think about the guarantees that you get or things that you lose when you use WebSockets. So let's say I have a bunch of WebSockets server. I agree that user would have connections with normal API servers also. And WebSockets servers also. Right now, when you are sending a message, you can send it via API also, you can send it via WebSocket also. Now, why did you pick to send it over WebSocket?

[01:24:10] Just because you have it, was that the only reason behind it? Or do you get any other benefits?

**[01:24:18] Student 1:** So initially, like my thought process was just this only that since I am anyways using WebSocket, I can leverage it to send the messages also.

**[01:24:26] Teacher:** Okay. Okay. Let me pull in Sunil. Sunil, what would you have done? API or a special WebSocket server to send message? Special WebSocket. [check: diarization seam - "special web socket" at the end may be Sunil answering]

**[01:24:37] Student 4 (Sunil):** So the reason is overhead for each message.

**[01:24:42] Teacher:** Okay. Are you just trying to save overhead for each message, but why are you

**[01:24:45] Student 4 (Sunil):** [check: diarization seam - "trying to save that overhead?" continues the teacher's question] trying to save that overhead? So compared to like no REST API communication, the overhead it requires to send to like, no backend it is low.

**[01:24:57] Teacher:** And again, why the entire world is not using WebSocket for every... Why does the REST even exist?

**[01:25:03] Student 4 (Sunil):** This use case is frequent communication, right? Because users like to server, very frequently.

**[01:25:13] Teacher:** You're saying frequent, is Slack really as frequent as your Instagram Messenger? Think about it. How many messages do you receive on Slack slash Teams? Not many. Do you really need to save that? But what is more critical for enterprise? Think on those lines. Is persistence of message more important? Right. What is like, it's an enterprise user, right? Slack's user base is an enterprise. Like basically Slack customer is an enterprise customer. What is more important for them? Right. That is one way to think about it. Second way to think about it. Do you really need everything to be done in an instant? Then the [unclear: "normally pass of us"] would not have even existed because everything has an overhead. Let me just use WebSocket for everything. Right. But that's not happening. So there has to be a better reasoning for you to pick either these or this.

[01:26:08] Now, again, I'm just stretching it out. Just think on Slack's line, that what kind of behavior. Now, enough that we talked about this part. Now, recall when you send a message on Slack, what happens? What happens when you send a message on Slack? What kind of behavior you see on Slack or Teams or any such tool?

**[01:26:32] Student 4 (Sunil):** So the expectation is it should be shown immediately to other users.

**[01:26:37] Teacher:** Not expectation. What do you see as a user? You don't see message immediately getting posted. Think about it. Try to recall. Or if you have a Slack open, just send yourself a Slack message and see what happens. Let me pull in Summit, Summit [check: name spelling]. What would you do?
