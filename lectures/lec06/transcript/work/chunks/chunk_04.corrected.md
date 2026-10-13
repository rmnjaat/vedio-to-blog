**[00:35:15] Student 2:** The parts of the images, photos.

**[00:35:19] Teacher:** Do we really need to do that? Recall yesterday's discussion. Can you not derive it?

**[00:35:25] Student 2:** You can. Right. But there would be multiple. I did think of the yesterday's discussion, but there would be multiple photos.

**[00:35:33] Teacher:** So there would be multiple rows over here. What's the problem with it? And obviously you need to [?store | asr: "start"] multiple photos, right? Because user can upload multiple pictures on it and mark one of them as active. So you need to render all of them. Let's say you uploaded 10 photos. You need to render 10 photos. So all the photos uploaded by the user will go over here. Right? ID, user ID. And what else would you store? The photo, which is active.

**[00:36:04] Student 9:** Okay.

**[00:36:04] Teacher:** So let's call it is active. Anything else?

**[00:36:10] Student 9:** I think that's it.

<!-- topic-candidate [00:36:12]: Gravatar queries - all photos of a user, hash column -->

**[00:36:12] Teacher:** Got it. [unclear: "Heyman"], let's write queries. Let's write queries with which you would want to find all photos of a user. What would that query look like? Because on the UI, you would have to render all the photos of a user. What would that query look like?

**[00:36:31] Student 1:** So maybe select star from photos table where user ID equal to given user. We may need to filter it via is active. We want to sort the active one.

**[00:36:46] Teacher:** No, no, we'll show all of them because only one of them is active, right? Yeah. User ID is equal to something. Okay.

**[00:36:53] Student 1:** Not sure. Star is needed if we need only the ID because we are looking for.

**[00:36:59] Teacher:** Fact, right? Okay. Here, do we have the user ID of the user? Look at this. No, we, we need to kind of join it from the user table because we do not have. So let's try, so select star from photos where... Where select star from photos, you join it on users on photos.userid equal to user.id something. Users.id where userid equal to this. Correct. Okay. But you still don't have userid. Right. Right? Because what you are getting over here is a hash of email ID.

**[00:37:48] Student 1:** Yeah. So that we need to kind of reverse hash and get the ID because we are not storing the hashes which are derived. So that derived part will come in computation.

**[00:37:59] Teacher:** So what will you do? So what's your query now? You tell me the query, exact query.

**[00:38:04] Student 1:** Okay. Select your star from photos this, where we can write a decrypt of input, which is coming as hash equal to.

**[00:38:15] Teacher:** You cannot get email from the hash. It's not encryption. It's hashing. So it's lossy. You cannot get the actual email ID back.

**[00:38:22] Student 1:** Actually, in that case, I think, yes, got it. Because there will be a collision. Two different things can go. So we have to have a hash stored because in it, we cannot go in a reverse way from email.

**[00:38:37] Teacher:** But can you not just do pass the hash function where hash of email is equal to the one that you provided?

**[00:38:45] Student 1:** Yes, that we can do hash of email equal to user.

**[00:38:49] Teacher:** Whatever your input is. [?Hash | asr: "Has"] ID. That can work. But what's anything wrong with this?

**[00:38:58] Student 1:** The wrong thing, it can be like two different email ID if they generate the same hash.

**[00:39:05] Teacher:** That we have accepted. We have to accept that. That two people having same hash would not work because that's what we are going with. If two people are the same, how will you disambiguate anyway? Assume that hashes are unique.

**[00:39:21] Student 1:** Actually, it's a bit of more computation added in the query. You are doing hash of email every time. Each query you are adding this computation. We can try to avoid that. Very lightweight. Yeah. I mean, it's lightweight, so we can say it or not, but at least I see this as a one problem that it's not a simple query. We are adding some computation on top of it.

**[00:39:45] Teacher:** Okay. Let's say I have 10,000 rows. How many rows would this scan? This query scan?

**[00:39:55] Student 1:** Actually scanning is pretty bad because you have to do a cross join of both the tables where the user IDs matches. You will, if you have index on user IDs, then you would have, you have index on user ID, so you get index of photos, you get index of user, and then you do a scan. Actually it is pretty bad in evaluation because we do not know the user ID, so eval function first try to figure it out the user ID. Oh no, no, it will not, it has to do the whole whole scan of... Looks like if we have the exact user ID, that would have reduced the scan part of table up to those user ID. In this case, since we do not have that handy, we have to go and figure it out. This value, do the whole scan and then do the join and then get those filter. That's how you can think of.

**[00:40:51] Teacher:** But why does it have to do that entire scan?

**[00:40:55] Student 1:** Because of this hash. Yeah, for each email ID, we have to create that hashing and evaluate that. Now you got the email ID for that. You have, so once you do the whole scan, you read each and every row of the table for each email, get that the hash now out of those hash you will do the search or like filter it, which email ID we are talking. Now, once we have that, then you can do the join only for those rows, which are in the where clause.

**[00:41:32] Teacher:** Yeah. Yeah. Brilliant. This is what the pain point is. Okay. Let me contradict. Thanks so much for putting that in such a very, in, in, in a really nice way. Yesterday we discussed, now today I will contradict that yesterday. We discussed that, hey, whatever is derivable, we should not store that. Over here this query is very very very inefficient because the where clause itself contains a computation, which means that it cannot leverage indexes over here, because unless it goes through every single email it cannot say that, it would have to compute the hash of it and then find which matches with your given value.

[00:42:24] So it would have to literally, because there is no way for your relational database to know, okay, this is the email ID that is pointing to, that would evaluate to this hash. You cannot leverage indexes over here. This will result in a full table scan every single time. This is why you need hash column over here, because then you can index it and say, where users.hash is equal to the one that is passed. This makes a query order one, almost order. Because now it's very pointy. It's very pointy, very, because now what it can do is it can literally just do the user that hash equal to something. It would filter out that one row from it and then join, get the user ID, join it over here. It's very quick, very, very, very, very quick.

[00:43:15] So it's not always true that what is derivable, you should not store it, depends, because if it is slowing things down for you, you have to store that redundant part. This is where we are adding this one redundant column. We are actually, whenever a user is getting created, we are not only storing the email ID of the user, but we are also computing the hash of the email ID and storing it and creating an index on literally every single column. Email is a unique key, hash is a unique key. But we have to do it. We have to do it. Otherwise this query, which is more, which is very common of a query, that would be very expensive because there is no one efficient way for your database to figure out which all rows it would need to converge on, because there was an evaluation in the where clause itself, hash of email.

[00:44:11] This implementation detail, I want all of you to focus on. Again, as I say, drawing boxes is easy. This is where the magic happens. This is what makes you like, when you scratch the surface, you see the ugliness of the system. Right? So devil, sorry, the devil lies in the details, that we all have heard it. This is a classic example of that. Unless you write that query, unless you figure out how that would execute, you would see, we don't need this, but then you realize that your query is not really performant enough. Then you add, right? Okay. So this is what I wanted to very key point. I wanted to highlight that, right? This is why that column, hash column is really important. Okay.

<!-- topic-candidate [00:44:56]: Marking a photo as active (update query) -->

[00:44:56] So we talked about rendering all the photos of a person. Now let's talk about marking someone or marking a photo as active. Sunil, what would be the query to mark a particular photo as active?

**[00:45:09] Student 1 (Sunil):** So in photos table, we can keep like no, [?is active | asr: "is that two"] column is already there, right? So we can keep like no flag true or false.

**[~00:45:18] Teacher:** Okay. So that's okay. That's a boolean. So what would your query look like?

**[~00:45:24] Student 1:** Oh, okay. So this is just to pull only active photo, right? That's your

**[00:45:29] Teacher:** It's marking a photo as active marking.

**[00:45:33] Student 1:** Yeah. Okay. Then it's an update query. Update photos. Set is active equal to true where user ID equal to.
