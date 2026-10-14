**[02:00:01] Student 2:** Like, advantages compared to board, because I didn't think about any second method. Right. So that's the problem, right?

**[02:00:08] Teacher:** That's the problem. That's what we have to think. Right. If we don't think of all possibilities, whatever I think seems optimal, but it might not be. What's the advantage of storing post ID over here?

**[02:00:23] Student 1:** So the advantage that I can think of is like, it is like, it is a data that we can derive from or derive anything from. Okay. Including the URL and all of those things. Second thing is like the amount of data we are storing in this table, in this non-relationable table, which is like a non-relationable table or already takes so much space. So this, this way we can reduce the amount of space, that amount of space required to store this one document.

**[02:00:52] Teacher:** Right. What's the other approach? If you don't store the post ID, what else can we do?

**[02:00:57] Student 1:** So if we, like, the one, one thing, one thing that he told was like store the URL, but that is a pretty terrible thing. Other way we can store is basically have actual post, actual post, right? Image ID and whatnot.

**[02:01:17] Teacher:** So you can either store the actual post, the JSON response, the actual row, the actual here, or you can store the post ID.

**[02:01:26] Student 1:** But there would be a problem with that, because like if we store image ID, we will have to like, we will have to like specify which user's image ID is this. Like, like, right.

**[02:01:39] Teacher:** Post ID solves that problem.

**[02:01:41] Student 1:** Yeah, exactly.

**[02:01:42] Teacher:** Like that's why you can actually store, you can actually, so the actual post object here. Okay. Okay. ID, caption, whatever we're storing in the post table, that same can be copied over, a denormalized way of storing things. Correct.

**[02:01:57] Student 1:** But that will increase the amount of storage.

**[02:02:00] Teacher:** Correct. That's it. But what's the advantage of doing that? What is the advantage of doing this over this?

**[02:02:05] Student?:** Less data to fetch.

**[02:02:08] Student 1:** I guess like, I mean, in the sense, in the sense, like I don't have to like go again and again to get all these things, ID and caption. I will just get it in one go.

**[02:02:17] Teacher:** You can just read this one document and send it to the user. So that's what, these are the critical pros and cons, because it's not just one way to do things. And depending on what guarantees we are providing to our users, depending on what experience we are providing our users, we have to know if we need the SLAs or not. So let me formally cover this.

**[~02:02:34] Student 1:** That also one more thing, gone, so also one more thing, like if I like click on any hash in the Instagram, it has the ability to show all the photos there are for that hash.

**[~02:02:51] Teacher:** That's not just our top. We are just doing top 100. Don't add new requirements to the system, because that requires different design, right? We're sticking to our constraints, right? Okay. Okay.

<!-- topic-candidate [02:03:02]: Top 100 photos - store post IDs vs the actual post (denormalized) -->

[~02:03:02] So top 100, there are two ways to store this information. First way of storing this information is where we choose to only store the post IDs that are there. So post ID 1, post ID 2 and so on and so forth. The advantage of this approach is that we require less space to store the data. This information. Second advantage is that because it requires less space, it's easy to cache. Not really this thing. It will be very lightweight to cache. But a disadvantage of this is that every time you want to render this, you have to first go to this database, read this, then go to post service or post database and read the actual information and then render it to the user. So you need to talk to post DB to get that information as well.

[02:04:01] Like the details, because on the UI, you have to render the likes and the comments and the shares and the caption and whatnot along with the photo URL. So either if by doing this, you are reducing the space to store over here, but you are making another call to a database, the post database, to get the detailed information about the post. [unclear: "Roller"] number one. [unclear: "Roller"] number two is the advantage of doing this is that you get the latest data, which means let's say you are storing this information. You go to the post table every time you're making a call, which means that whatever the, which is going to the source of truth, you are always rendering that.

[02:04:42] Other way of doing this is, instead of doing this, you can actually store the actual post information with actual ID, caption and whatnot over here. This would bloat up this database. But given that there are only 100 entries, it might be just fine to do so. The disadvantage of doing this, it would require large space, that exact same advantage. You get very fast retrieval times, because you just have to go to this one DB, this one DB, read everything and return. You don't have to make another call to post DB to read the actual data, because you have it right here. Store. Right.

[02:05:27] But another disadvantage of that is that if you do it, what about consistency? So when user, let's say, changes something on the post, let's likes added, what would happen? You have to update the entries over here. That might become a pain point. So depending on what guarantees you are providing to your end user, in some cases, you might not just provide, you might choose not to provide that like count and comment count over here. You might just want to show the list of photos, tapping on which you go to the post page. Very much possible. So in that case, you can just go with this approach and not just worry about consistency at all. You can just go with a simplistic approach, hey, given that I don't care about consistency, when a photo URL is there, it's good enough for me to proceed.

[02:06:13] So depending on what user experience you are providing, you have to change. You have to pick either this or this. It totally depends. There is no one way to build this system. It depends on the kind of things that you're providing. Okay. This solves, at least we have to approach this depending on the kind of converged on one.

<!-- topic-candidate [02:06:35]: Counting - updating total number of photos per hashtag -->

[02:06:35] Now let's talk about counting. So this is straightforward. Every hashtag that we have, we create an entry over here, but how do we update the total number of photos? How would this happen? Raise your hand. I'll tell you. How would you update a total number of photos? Every time the user post a photo with a particular hashtag, you have to update this. You do [?count | asr: "call"] plus plus over here. How will you do that?

**[02:07:03] Student 6:** I think it does not need to be real time. Correct. So we can have like the update to the service, like being added in batches. Like every time someone adds a new thing.

**[02:07:19] Teacher:** So this is your post service where the post is made. You push it to Kafka.

**[02:07:24] Student 6:** Yeah. And then there will probably be like a consumer, which first of all takes in all the hashtags, like extracts all the hashtags from that particular post and updates like a DB, like probably together, like not for every single post that comes, but probably for some time, hold some posts in memory that, okay, in this batch of, let's say, a 1000 posts, I saw 10 posts with hashtag A, 10 posts with hashtag B, 20 post with hashtag C, and then commit them on the database.

<!-- topic-candidate [02:08:00]: Partitioning key of the Kafka topic - hashtag vs user ID -->

**[02:08:00] Teacher:** Okay. On what would be the partitioning key of this Kafka?

**[02:08:07] Student 6:** The partitioning key. I guess it could be. It's, I'm not sure if hashtag is a good partitioning key. The hashtag itself is not a good partitioning, because there's so many of them. Yeah, I'm not sure.

**[02:08:29] Teacher:** Why? Why are you not so? Think about it. Think about what would be the partitioning key of this Kafka. Hashtag, you said hashtag would be one. Why is that not a good [?partitioning key | asr: "party"]? Even if there are multiple values, then it's just, so it will pass to the hash function and pick one. Yeah, that's okay. Right. Yeah. Okay. So if you're taking hashtag as a partitioning key, there are multiple hashtags in the photos, in the post that you're publishing.

**[02:08:58] Student 6:** Then we'll, I'm not sure.

**[02:09:05] Teacher:** Correct. So that's problem number one. Plus this is the same Kafka. Sorry. This is the exact same Kafka that we just drew over here. That when a post is published, we're putting a message out to Kafka. So every time one post is published, we're putting message out to this Kafka. So this Kafka and that Kafka has to be the same. Otherwise, this post service has to write to two different Kafka's and that distributed consistency problem creeps in. What will be the partitioning key of this Kafka? Either user ID or post ID.

**[02:09:43] Student 6:** User ID. Probably user ID. Correct.

**[02:09:45] Teacher:** So for all the users, they're going at one place or in one partition. Right? So this Kafka and the one that we are drawing right now, these two are same, which means that this is partitioned by, let's say, user ID. Okay. Yeah.

<!-- topic-candidate [02:10:05]: Batching needs all posts of a hashtag on one server -->

[02:10:05] Now you talked about batching. Now for you to batch it, what do you need? All the posts of a particular hashtag should come to one server. Otherwise you will not efficiently batch. What if hashtag sunset goes to three different servers? Now, what would be the problem? Let's say there are three posts published by hashtag sunset. Now first goes over here, second goes over here, third goes over here. So although you wanted to do batch, but there is not enough things to batch. So you're eventually writing one at a time. So it's not reducing the load. How would this work? This is very inefficient, because this has to be parted by user ID, but this needs to be batched by hashtags.

[02:10:59] Okay. Let me pull in Mohit. Mohit got. [check: "Mohit got" - "Mohit, go on"?]

> **Student Question [02:11:04] - Student 1 (Mohit):** Can we use something on the lines of Redis Pub/Sub, where we make each of the hashtag as a channel? And like...

**[02:11:13] Teacher (answer):** There are millions and millions of hashtags. Each one cannot be a channel. You are overkilling the infra. Massive infra requirement plus potential data loss.

**[02:11:24] Student 1 (Mohit):** By channel, I mean the channel in Redis terms. That's what I said.

**[02:11:30] Teacher:** Expensive. Millions of millions, millions, millions of hashtags are there. Plus, what if that Redis goes down? There is data loss, because Redis does not persist anything. It's real-time Pub/Sub.

**[02:11:46] Student 9:** Right.
