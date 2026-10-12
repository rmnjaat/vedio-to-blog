**[01:03:30] Student 1 (Pankaj):** Then there would be like a messages table, which will have like, which like two user, like basically the channel ID in which the user sent the message and.

**[01:03:43] Student?:** Okay.

**[01:03:44] Teacher:** Before that, before that, before that, how do you know which user are part of which channel? You need to store it somewhere, right?

**[01:03:52] Student 1:** Yeah. So there would be like, what we can call it, membership table or something like that, which will store which user is part of which channel.

**[01:04:03] Teacher:** How did you come up with this name? Membership? Looking over here?

**[01:04:10] Student 1:** No, I didn't see that.

<!-- topic-candidate [01:04:12]: Naming entities as nouns (membership vs user channel) -->

**[01:04:12] Teacher:** That's good. That's good. Right? If you did not, but you still came up with this word, that's brilliant. Why I say this? This, they say that, hey, that table would be in a user's channel table. A lot of people would name it like this. And I'm a little against this. Why? Because this is the easy way to name stuff, user channel. But what is user channel? If, if, if tomorrow you are storing mapping of three things, will you use [?user | asr: "our"] channel message table? No. Right.

[01:04:39] So which is where, what I believe a good schema, whenever you're designing a good schema, everything has to be an entity, has to be a noun. So try to name wherever possible, try to name things as nouns, because it would help you give them a different persona. So I'll give you an example. So that's where membership is a great name, which stores the membership information, which means that, for example, this user is part of this channel. So this becomes a membership [?table | asr: "team"]. A lot of people would have named it user channel, but don't do it.

[01:05:19] As membership, because now it gives you this natural way of looking at it, where you can extend membership if you want to, you can add more columns. As soon as you name a table or name an entity as user channel, you cannot think of adding another [?attribute | asr: "article"], but as soon as you give it a noun, let's say membership, it becomes very natural to add new columns to that, right? Okay, so you added that. And in messages, what would you store? So the user [check: diarization seam - the student's answer may start here]

**[01:05:49] Student 1:** sent the message and like the message text, which was it. And yeah. So what I'm thinking right now is like message can be direct to user also, and it could be in channel also. So channel ID will be there, but it might be present. It might not be present.

**[01:06:13] Teacher:** So here you'll have channel ID also and the receiver ID also.

**[01:06:17] Student 1:** Yeah. Receiving user ID also. Yes.

<!-- topic-candidate [01:06:23]: Modelling direct vs channel messages -->

**[01:06:23] Teacher:** Okay. So if you do this, what is the disadvantage of having this? Because either one can be null.

**[01:06:30] Student 1:** Yeah. I mean, one of them would be null always.

**[01:06:34] Teacher:** But then, so what is the disadvantage of doing this? Is this the best way to model things? Think on those lines.

**[01:06:51] Student 1:** Maybe we can have like two separate tables for channel messages and one for direct messages.

**[01:06:57] Teacher:** But then your migrations would be difficult. Let's say you want to add a new attribute to messages. You have to add it on this table also, on this table also. That's a challenge. You should not do that.

[01:07:17] Because, and also the problem with this is, if you are allowing either one to be null, which means you are also allowing to enter, your allowing to insert a row where both the columns can be null due to some glitch. So which means that would become an orphan row problem.

**[01:07:35] Student 1:** Yeah, I also thought of, you know, having a receiver ID as a array of all the receiver users, but then if we like add users to the channel, then it will become a problem again to add those users

**[01:07:50] Teacher:** again to this ID. [check: diarization seam - "again to this ID" may be Student 1's] So there has to be a better way. Okay, let me pull in round draw will go on [check: garbled, possibly a student's name being called]

**[01:08:10] Student 1:** So basically, what we can do is we can have from, to, and message basically, from, from will be the, like, from will be the user ID. And to will be, to can be anything, channel ID or user ID [unclear: "books"], but then how would you know if it's a channel or a user? So basically, like, for channel ID we can have something like, like CH and then, CH and then ID, and for user we can have you, usr dash, but then

**[01:08:46] Teacher:** Then how would you query? Because now for you to fire a query and get the detailed information about it, you need to do string processing and see if it is this or not. Then you join it with channel, otherwise you join it with user. That's a poor implementation. You cannot write efficient queries with [?this | asr: "us"].

[01:09:05] DP [check: name], what would you do? Oh, you just.

**[01:09:10] Student 3:** I was thinking that in addition to along the lines, what Rahul was saying, so we can have another column, which is more like type, right? Like the receiver type. Maybe I can have an enumerator there saying channel or user.

**[01:09:30] Teacher:** So these are all variation of that same thing, either you apply channel ID, user ID, or that, or

**[01:09:37] Student 3:** in the sense that, I was thinking that, yeah, I mean, it's a variation, but at least it can be a little more better filtering compared to like if I start processing. But now what would happen is now you [check: diarization seam - "but now what would happen is now you" may be the Teacher's]

**[01:09:49] Teacher:** cannot have a foreign key check on to, which says that it's a foreign relationship to channel, right? Because now it can also point to user. Yeah, that's another problem. Yeah, so there has to be a better way. And now what this would also lead to is, in our business logic we have to have so many ifs and else's, that if this then this, is that and that. So your business logic becomes complicated. So there has to be a better... I'll pull one more. If this, if Alex doesn't, if Alexa doesn't answer [check: name]

**[01:10:15] Student 2:** then I'll say Alexa, go on. [check: diarization seam - "then I'll say Alexa, go on" is likely the Teacher's] No, no, so I don't have a complete answer, but I'm thinking that this messages that from where it is coming to where it is going. So this looks like some kind of controlling information. And I'm not sure if it should be in DB or shouldn't be managing the code. So I am actually thinking on this, on these lines.

**[01:10:42] Teacher:** No, but then what attribute would you have over here? Let's say call it to, from this user to this. Now to can be channel or a user.

**[01:10:54] Student 2:** I was thinking more that the message doesn't know anything about where it is going into, it is going.

**[01:11:00] Teacher:** How will you render all the channels or all the messages of a channel, if you don't store to information over here, right? Because you still want to render all the messages of a channel.

**[01:11:13] Student 2:** Okay. So then that means that, yeah. Okay. I was, I'm not sure.

**[01:11:18] Teacher:** Right. Let me pull it. [?Unmute | asr: "Unmult"].

**[01:11:21] Teacher?:** What would you do?

**[01:11:23] Student 2:** I would just add a channel ID actually. I mean, suppose if two users are communicating, they can have a common channel, even though they just DM. Yeah, but we can keep that as a topic name. I mean, something like that of a publisher subscriber model where you just started [check: Student 2 label here may be a different student from 01:10:15]

**[01:11:43] Teacher:** So good, and then you just added publisher subscriber, unnecessary complication. Focus, focus on the first part, focus on the first part. Yeah. So you are suggesting two users, [?direct | asr: "tarik"] messages also channel. Yeah.

**[01:11:56] Student 2:** So the advantage that we'll be having is, when we have messages, I mean, whichever user has sent it, apart from that, the other users were present in the channel. We'll get those messages.

<!-- topic-candidate [01:12:12]: DMs as channels with two people (Slack API) -->

**[01:12:12] Teacher:** I mean, hmm. Something like this. Right, so this is a good way to design this database schema. Why? Because now what you are doing is you are just piggybacking on existing stuff. So, and by the way, this is not made up, this is there on Slack's API. If you ever use Slack API and you want to DM a particular user, you first have to create a channel with that user, and then on that channel you write that. So it is a direct message on the UI, rendered as direct message, but behind the scene, it is a channel.

[01:12:54] So what you do as part of a step, what you first do, because at the end it's just a message. There is a sender and a receiver. Receiver, the rendering part is different on the UI side, but the way you are storing it, always see if you can have a generalized way of storing things, not specific cases. If this then go here, if that then go here. Ifs and elses are the worst when it comes to databases.

[01:13:20] So the way we model this is, your DMs are channeled with two people, and you can add a type over here in channel, which says if it is a group or a user or a channel, something like this, right?

[01:13:36] You can have a regular channel, something like this, right? You may have type with this, because now what you can have seamlessly is this channel ID pointing to here, right? So direct message still not a problem, because now with this type you can render it on the top half or on the bottom half, because direct messages are on the bottom half. Channels are on the top half. You can very easily render it. Using the channel you can iterate through historical messages because you have all of them. You would have a timestamp field on when it was created, message created at or something.
