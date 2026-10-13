**[02:09:26] Student 3:** Now, yeah, so now whenever, so I'm, so I, you want me to talk about how the messages would be read and all that stuff, or that is already everything, everything? So what, so obviously, because this is a messaging thing, right, so there will be a messaging queue and this user will be subscribed to that queue. And based on the number of, and the partitioning would be on the from user, that would, okay, let's

**[02:09:50] Teacher:** Let's go step back. What is the input to the system? Are you storing all the messages that your user received in this table? Am I in this messages table? Are you storing all the messages that a user ever received?

**[02:10:10] Student 3:** I can store. There's no harm in storing, but I think that would not be a scalable solution.

**[02:10:16] Teacher:** Because then what are you storing in this? What is this messages table?

**[02:10:24] Student 3:** Okay. So I was just thinking one snippet of a message, like, you know, one message, one, like, hi, how are you? If I send it to you. So that message unit, I was thinking in that way, how will you store that?

**[02:10:36] Teacher:** How will you figure out what that unit is? What, what, what exactly are you storing? Let's say user B sent a message to user A. Okay. So then this table needs to store either all the messages or part of messages.

**[~02:10:50] Teacher:** are storing over here? That's the question now.

**[~02:10:50] Student 3:** So I would be storing pretty much all the, so this data model, like for, will store all the messages that a user that has sent to me. So for example, it could be like, I have sent hi messages ever. Correct. Yeah. [check: possible teacher interjection - Correct, Yeah] I think there's no harm in that way. Yeah. So this is our messages table. Yeah. Yeah. It is a messaging table. Yes. [check: possible teacher interjection - who says which]

**[02:11:15] Teacher:** So this is all your messages that is shared over here, right? So the text part from this to this and times. Okay. You have that messaging table. So now the scale of this is pretty huge, but that's we'll, we'll, we'll touch upon that later. That's fine. Okay. Now in your other thing, what is your, this data model called, that other one, where you're storing the last read at?

**[02:11:40] Student 3:** This, this can, this is basically for, for me to get the latest message up, right? So this can be a latest message, like some kind of a metadata information.

**[02:11:53] Teacher:** So probably you need to have something substantial over here because you might want to store something more. So let's say right now I'm calling it messages or other, let's, let's just store it in a user activity. It's basically one-on-one mapping with user. So every user will have this one entry over here where you are storing that last read at and other details around it. This is your user activity table. Now what you are doing over here? What's your query to get the unique users count part?

**[02:12:33] Student 3:** Okay. So now the unique user part would be like, you know, select messages, select from messages where timestamp is greater than last read at. So that is okay. And then I need to order them by the, I need to order them.

**[02:12:56] Teacher:** You are not, you don't want to send a message. You just want to render the count. Why order?

**[02:13:01] Student 3:** Yeah, but you want the unique users counter. You don't want the message count. [check: possible teacher interjection] So if I do this way, then I would be getting all the number of messages, right?

**[02:13:09] Teacher:** You're doing select star from messages. Yeah. Where to is equal to your user and timestamp is greater than last read at. Assume join one is there. What is the problem in this query?

**[02:13:30] Student 3:** See, the problem is, for example, I have sent, so this messaging table will store three rows. If I send three messages to you, hi, Arpit, how are you? So I've sent three messages. So three rows, it will store. Now, in the previous requirement, you said you want from unique users, how many users have messaged? Now, if I go with this approach, I would be getting three rows as my input, right? But I don't want three rows as input. I just want one. So basically, I'm mixing. I am accumulating all those three message rows into one. So that's the reason I said,

**[02:14:07] Teacher:** I, how are you doing that? Count count [unclear: "from direct to this now"] count of unique of from, correct. Yes. Select count unique from from messages where to is equal to your ID and. Okay. What's the problem in this?

**[02:14:36] Student 3:** I think the indexing would be the problem because I think we need to index it properly. Otherwise, it's like one of the time-consuming queries because you're pretty much getting all the messages. So what I would do is basically we can index from messages, right? So maybe we can index it using a key that has from and message both, a message, no, not message actually, but maybe from, the from, from the from field I can index it, or no, not even that actually. From timestamp, timestamp would be a good indexing factor because we want all the messages after time this time, right? So yeah, I think we can index it on the timestamp, that's what I'm thinking, just on

**[02:15:28] Teacher:** So it will be like across all users, all data is sorted by timestamp.

**[02:15:37] Student 3:** Yeah, that is what I'm thinking.

**[02:15:39] Teacher:** But this is still an expensive query because if let's say you have received 1000 or rather 10,000 messages for a particular user, you are going through 10,000 rows of your table and then doing a [?unique of it | asr: "unique offer"]. Now imagine doing it every time the page loads. Very expensive. Correct? Yeah. Yes. Very expensive. I am not doubting the correctness of the system. System would work, but at millions of people, there are millions of users currently active on this platform at this very moment, doing this, firing this query is super expensive.

[02:16:15] And FYI, just to clear out, you will create an index on from and timestamp, or composite index on from and timestamp, so that all the entries of a particular from, a particular, sorry, from, to and timestamp, a composite index on this, so for an entry for, and it will be ordered by index on to, from and timestamp in this particular order. So all the entries of to will be clubbed together, then grouped by from and then ordered by timestamp. So this way, when you're sorting, when you're filtering it out, you are directly going to that location where to of your interest starts, within which two timestamp and from two timestamp and from two from timestamp. [check: "two" may be the column "to"]

**[02:17:06] Student 3:** I think it should be to, timestamp and from, right?

**[02:17:09] Teacher:** Because yes.

**[02:17:11] Student 3:** Yeah.

**[02:17:12] Teacher:** Because if you do, then you can very easily cut short. So it will be to, timestamp.

**[02:17:17] Student 3:** Yeah. Yeah.

**[02:17:18] Teacher:** So to, time stamp and from, right. But although it, you are trying to, you know, [unclear: "ounce out"] every single performance from this by rearranging this field, but the worst case is imagine you having to iterate through these many index entries to just get the count of it. Right. And in case, let's say a user, hypothetical example, worst case, 10,000 messages are there. You have to go through 10,000 entries of it and then do a unique entry to answer the count is just one. Right. Let's hypothetically one user sent you 10,000 messages. You're going to 10,000 index entries to eventually figure out that the unique count is just one or two or three or something like that. Right. That is expensive.

**[02:18:01] Student 3:** Yeah. Actually I'm just thinking instead of going messages, we can have another column, or not another column. We can have another table that tells how many messages have been sent. Just a count. Correct. Care what messages are being sent, right? All I care is, are messages being sent.

**[~02:18:14] Teacher:** Correct. So you don't care about the actual messages. So now we are coming to a more efficient implementation of it, right? Okay. So this is a crude way, and this is not an incorrect way. Again I'm saying, this is not an incorrect way, this is a crude way of building things, which gives you, which is not very efficient but very correct. When you fire this, because this message is, again, again, this goes for everyone, this is your source of truth for messages, this is your source of, this is your source of truth to say when you last click the message icon. Doing this will exactly tell you how many people from which you got those messages, exactly. It will be 100 correct no matter what. But the problem is it is just a little, a little, not a little, but rather inefficient. That's the problem. Right. It's just inefficient because do we really need to iterate through all the messages of a user that it received and then figure out, okay, these are the unique ones? Can we do better? Right. Okay.

<!-- topic-candidate [02:19:28]: Optimizing the unread count - non-relational store -->

[02:19:28] Should I continue with Sandy [check: name spelling]? Your hands raised, I'll just do it so that I don't forget. I'll just do it because you, you added some brilliant points there. I just want to pick others' brains and see where we can go with this, right? Yeah, but just basically keep your hands raised. Okay. Rahul, how will you optimize this actually?

**[02:19:51] Student 4 (Rahul):** Like, I will not go with this system. Instead of this, I will try to go with non-relational database

**[02:19:57] Teacher?:** database because like similar query you'll fire there.

**[02:20:02] Student 4:** Yeah. So basically the system would, that's the system that I'm thinking is like, in the non-relational, non-relational database, there is a user key. Basically there is a user key and it has sub hash maps in it. Like it has more hash maps in it. Okay. So user key. And in this we have total, total count basically. Just just a count.
