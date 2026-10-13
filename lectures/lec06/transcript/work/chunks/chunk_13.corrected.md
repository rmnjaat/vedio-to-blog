**[02:20:33] Student 4:** And not not not this, not this. Right. Just just just count with a number.

**[02:20:44] Teacher:** Count with a number. What do you mean count with a number?

**[02:20:46] Student 4:** I mean count count variable.

**[02:20:49] Teacher:** Then is this even a hash table?

**[02:20:53] Student 4:** No, no, no, no. Count. It's the name of the, it's the name of the key. That's what I was saying. It's the name of the key. And yeah.

**[02:21:08] Teacher:** These are actually, instead of saying count [unclear: "be purpose"], right? It's actually total, or rather [?newly unread | asr: "duly and read"] count.

**[02:21:18] Student 4:** Yeah. Something like that. It's just a nomenclature. And in this hash map also we are also having one other hash map, that is unique users. It's kind of like a set actually, this is like a set.

**[02:21:43] Student?:** Okay.

**[02:21:44] Student 4:** Now whenever there is a new message, okay, first, first, like, first, what, what will happen is like, the API will try to fetch this,

**[~02:21:55] Teacher:** just, just one question. Just one question. What is the difference between this and this?

**[02:22:03] Student 4:** Okay. So basically like a newly unread count, like how will you know, a unique user is messaging you. Okay.

**[02:22:11] Teacher:** Correct. Isn't that what set was supposed to be?

**[02:22:16] Student 4:** Yeah. So basically like, basically like, there are two ways we can do this. Basically we can have a, just a unique user set. Okay. And it will have like a list of unique, unique users and we can, we can just get, get the length of this unique user set and show it on the notification.

**[02:22:37] Teacher:** Do you really need this?

**[02:22:39] Student 4:** I was actually thinking like, like, it was kind of like, an... So I was thinking like, no, no, no, no.

**[02:22:50] Teacher:** [unclear: "Set length is not doing."] Everyone keeps, every set gives a track of the length of the set. It's [?O(1) | asr: "over"]. Don't worry. Okay.

**[02:22:57] Student 4:** Okay. Okay. Sure. And so when, whenever any user, user, like, messages this user ID, it will just, it will just put the user in that set. Okay.

**[02:23:11] Teacher:** Correct.

**[02:23:12] Student 4:** Now, whenever user click that button, like in the Instagram, whenever you user click that button, we can just delete this thing. At that point of time. And that deletion will be [?O(1) | asr: "over and over"]. So I think this system is much more efficient.

**[02:23:32] Teacher?:** Correct.

**[02:23:35] Student 4:** Yeah, that's about it. That's what we will need in this.

<!-- topic-candidate [02:23:39]: Query the source of truth vs keep things pre-computed -->

**[02:23:39] Teacher:** So what you went with, I'll just talk about it a bit. Delete set when user clicks the messages icon. Okay. So what you did is, here, this is a classic case. And again, you would see this more. Everyone, I'm basically talking to everyone. So this is what you would see almost in every single system when you are implementing. You either can query the source of truth, or you can keep things pre-computed. A classic way to build any system. Either you directly fire source of truth when you need strong consistency, or you may build, or to get more efficiency, you may pre-compute the data or store it in a way which is consumable directly.

[02:24:25] Because here, if you look carefully here, you can directly get the length of this set and see the number of unique users that sent you the message. Here you had to fire an expensive query, SQL, NoSQL implementation, anything, that does not matter. But with this, you get this very nice optimization, if I may call it, because now much more, but obviously now it's our responsibility to keep this updated. Here it was by nature, it was updated because it is actually the source of truth. All the messages ingested into this table, we pick out, we index and then fire the query and get down. But here we have to have another flow in which we are also putting this data in this other approach that we are building. Okay.

[02:25:10] And again, as I said, neither this is wrong, neither this is wrong. It depends on what you are prioritizing, what your scale is, right? As a startup, this would work just fine for you folks. But as your company grows, when millions and millions of people are concurrently active on your system, you might be tempted to go with this approach, right? Okay.

<!-- topic-candidate [02:25:32]: Which database for the unique-user set (Redis) -->

[02:25:32] Let's elaborate on this a bit more. Hey man [check: "Hey man" may be a student's name being called], which database would you pick to store this?

**[02:25:42] Student 1:** I think it should be a NoSQL system, because what I'm trying to put a variable length data against the user ID. So one user ID, against one user ID I need to store, let's say, 5, 100 or any number of user IDs. So having a document, key-value, store your value in a set, maybe MongoDB kind of a database, where key is the user ID and value is a set where each element is a user ID. That's it. That should be sufficient.

**[02:26:20] Teacher:** Let's use Redis purpose. And I'm just oversimplifying it for Redis because almost everyone is aware of Redis and its functionality. But you can pick any that gives you set functionality. That's what the key highlight is. Right. Any key-value store that gives you set functionality in the value so that you don't have to check and set and whatnot, just reuse what database already gives. Right. Okay. So we use Redis to store this data. Okay.

[02:26:45] Now we, I'll just draw a few elements over here. Okay. Now when your user tries to get the message. So how would, first let's talk about rendering the number that we are showing to the user. It might be a get status API, which what it would do is it would talk to this Redis and count the elements and return the response. So get is done. And similarly, when we are deleting from Redis, we can have a clear API that goes to Redis and clears things off. So we have clear API. It goes to Redis and it deletes the key that we just said. So get done, clear done. Right. And if you look carefully, read path is done, a very trivial write path is done. Right.

<!-- topic-candidate [02:27:52]: Updating Redis - input from the messaging service -->

[02:27:52] Now comes the interesting part, that how will you update this Redis with this data that you need. This one, this unique set, because someone has to put the data in, that these are the unique from which you received the message while you were offline. So what, how would that work on, Pankaj?

**[02:28:16] Student 4 (Pankaj):** Yeah. So two things here. Like, what I was thinking is the client also needs to be smart, because if the user is already on the messaging tab, even though he is reading some other users message and he is getting the message at the same time, it still will not be counted as, you know, newly unread, because he is already on the tab, right? So we don't need to show him that notification at that time. Correct, correct. So the client also is offline, yeah. [check: "Correct, correct. So the client also is offline, yeah." may be a teacher interjection] So yeah, so the second thing what I was talking about is like, if we have a WebSocket connection for messaging, so that backend can check that if the socket connection with the client is off, then I can update the Redis. But the client also needs to be smarter, that when it is on it, it should not send it when the user is already on that tab. So if I am browsing through Instagram or watching some reels, then if somebody sends me a message, then I can trigger that update API. But if, if I am already on the tab, then the backend should take care that, yeah, okay, if the socket connection is off, then yeah, I should update the Redis.

**[~02:29:22] Teacher:** Okay. So the input to your system, brilliantly put, input to this system, which updates things in Redis, looks something like this. Okay. Now that the cat is out of the bag, I can directly cover this, right? And we'll talk about a high level pattern that I wanted to, right? Because it's not just one database that we would have, we would have a few more databases to support it. We'll just talk about it. Okay.

[02:29:44] So the input to the system will be our messaging, messaging service, because our messaging service knows when a message is not sent to the user, right? And here I'm simplifying it by saying that when user is offline, they only do it. In real world you see [unclear: "very other use case as a very well explained"], where you are on some other tab, you still receive a message, so your count increases. Those cases are there, but I'm just simplifying it. You can add other cases where you would want to pop up that notification, but here the idea is very, user is offline, when the message is unsent. Now whatever your definition of unsent is, user not on the tab, user offline or user doing something else, right? Whatever your definition is of unsent, that comes from your messaging service.

[02:30:36] Why messaging service? Because messaging service would know if the message is delivered to you or not, if you are on that tab or not, if your WebSocket connection is on or not. In either case, this is the source of trust, your messaging service, right? [check: sentence may start mid-way, words before "help of" possibly lost] Help of online, offline indicator service to see if you are online or not, or it might own, on its own have this information, because it has the all the connections, persistent connections are with that edge server. So that edge server is the one that would know if you're online or offline or connected or not, or on which tab.

[02:31:10] So in either case that becomes our source of trust, that, hey, if my message is sent or... Whenever messages is unsent, I'm creating an umbrella of everything that I want to pop notification on into this message called on message unsent. Right. Depending on ifs and else's, where you are, what you are doing, you just implement those logics over here from the front end. Right. Okay.

[02:31:34] Now this, all of this comes to this Kafka on message unsent, which becomes the input to our system. And in that, what we do is we do this, like from this user, this user, this message was sent, because we want to store the number of unique users. We store it in a set. And what we do is we typically store it in Redis. You can pick any key-value database, which is partitionable by default. All of them are, and provide set as value, any database.
