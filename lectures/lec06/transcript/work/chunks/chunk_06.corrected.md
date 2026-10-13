> **Student Question [00:56:51] - Student 1:** Any hint for, are you talking about the first part of query? Okay.

<!-- topic-candidate [00:56:55]: Query to pick the active photo of a user -->

**[00:56:55] Teacher (answer):** Let's write a query to pick an active photo of a user because that's what would happen when you hit this URL. When you hit this URL, you have to pick the active photo of the user. What your query would look like?

**[00:57:09] Student 1:** So select a star from photos where hash what we have provided as the user ID and join on user ID from photos table.

**[00:57:30] Teacher:** So exactly this query but just with one more [?where clause | asr: "word class"]. Yes. Okay, let me just copy this for

**[00:57:40] Student 1:** So where user hash is this. Yes. And user, user photos.id. Yeah, photos ID.

**[00:57:50] Teacher:** And one more. No, no, no, not photos ID but photos dot is active. Photos dot is active true. Correct. Okay, correct. This is your query. This would give you for all the one photo because photo active true only one, we ensure the correctness over here. User hash, and we join on this user table. Okay? Can we optimize on something in this query? Very micro optimization, I'm literally nitpicking, but just it.

[00:58:23] Are you talking about left right join? No, no, that's okay. Inner join would work exactly the same performance as left left in that. So it's fine. Okay.

**[00:58:36] Student 1:** [unclear: "UJR has equal."] I can see only [unclear: "as I evolve"] part first is the join thing. And then the conditional filtering filtering once we join on user ID, we got all the rows for user matching user ID and then [?user hash | asr: "user has"]. So I think eval should work not on that. But first user hash equal to user ID. So it will figure it out. What are the rows with the [?user hash | asr: "user has"], which will go one row from user's table. And then I got the row. So I got the user ID. Now that user ID will do the join on photos, which will give a number of, let's say rows, which are there for each user, for that user. And on that you are saying, which one is true? It seems very but

**[00:59:44] Teacher:** I'm extremely nitpicking over here. In practical use cases you might see very minimal performance difference, very minimal, but I just wanted to highlight that. Like just it's a very, it's a stretch, but I still want you to highlight that optimization, that's why. Okay. Yeah, Sitesh. Oh, sorry, sorry, go on, go on, go on.

**[01:00:09] Student 1:** Okay, so the only thing is the only extra work that we have to do is on [?is active true | asr: "ejective two"].

**[01:00:21] Teacher:** So is there any ordering or something which it's anyway indexed because you would be anyway narrowing down on that one row that would be indexed. So it will be an index lookup, very fast. So that's not a problem.

**[01:00:35] Student 1:** Okay, so I was, I was able to think that only. Yeah, maybe I'm giving up, but again, got it.

**[~01:00:40] Teacher:** Yeah, Sitesh. Go, what would you optimize?

**[~01:00:43] Student 2 (Sitesh):** Yeah, I can't optimize something on right hand side but left hand side one optimization I can think is don't update if it is it's active it's true and so you're saying [unclear: "one one one describe there"]. Yeah. And one more thing is, if I just zoom out, I would store active photo ID in the users table because it would be a heavy system. So writing this whole transaction would get us out.

**[~01:01:09] Teacher:** Which one? This entire one?

**[~01:01:10] Student 2 (Sitesh):** I'm saying in the users table, I would like to store active photo ID.

**[~01:01:20] Teacher:** Ah, gotcha. So now what would it do?

**[~01:01:22] Student 2 (Sitesh):** So basically, like, see, on a high level, this is a read-heavy system. The whole transaction thing, the whole photo scan table, everything would... Like this is a single scan in the photos table. So we are saving everything. All of these transaction queries, all of this will be nullified.

**[01:01:43] Teacher:** Correct. You can very well know, but you would still need this transaction. You would still need this because now you would want to update on that other thing. You would still need this transaction. Your queries would change. But in this case, for this query, you are avoiding that join.

**[01:01:59] Student 14:** Yes. No, but my question was.

**[01:02:02] Teacher:** Updating. Yeah, but now when you're updating, you would also need to update in that same transaction. Update users table. Set active photo ID. Equal to the one that you get from the above. So select from this and update over here. Where user ID equal to this. Where user ID equal to this.

[01:02:29] ID was there. This is what happens is if you maintain an active photo ID over here, you are more frequent query. The most frequent query on your platform would be this, right? Getting the active photo ID and then rendering it on the UI. Even this is the most active query. Here you can avoid this join. Although that's what I said, I'm very nitpicking, extreme nitpicking business because it's not going to be a massive performance difference, but we can still avoid this very small join that we are incurring. By just replacing this to be select star from photos, select star from users where ID is equal to this. That's it. Because in star you get active photo ID, active photo ID and user ID computation. You can create a S3 path, read the file and send it to the user. As simple as that. So you don't need to complicate at all.

> **Student Question [01:03:21] - Student 2:** One question, Arpit. Why do you need to, like, is there any another query that we are supporting? Why do we need to store is active in the photos table?

**[01:03:30] Teacher (answer):** No, it's just that we have multiple photos. You have to mark one of them as active, right? That's right.

**[01:03:35] Student 2:** I mean, if you are supporting a query that is given a photo ID, tell me it's active or not, you can join with the user, right? But that's not a frequent query.

**[01:03:42] Teacher:** Now we can do that. Now we can do that, right? Yeah. Now that we are storing it over here.

<!-- topic-candidate [01:03:48]: Two designs - is active in photos table vs active photo ID in users table -->

[01:03:48] So there are two designs. Either you store it as active in the photos table or you store active photo ID in the users table, right? This is what happens is your most frequent query in your system does not have to go and join two tables. It is literally a primary key lookup. As simple as that. And now when you are marking a photo as active, you don't need to mark others as inactive, current one as active. You can simply do this. And it just simplifies your entire thing.

[01:04:20] But it is very counterintuitive because you think is active is a property of photo, not a user. This is another thing that I want to always bring out, that we typically think like whenever we are doing class design or rather low level design, the basic class design, or when we are designing schema of it, we tend to think in terms of attributes of a particular entity. Think in a normal human way, you think that is active is property of photos, which is where in most cases we typically read is active in photos table. But it again, as I said, extreme nitpicking, but if you think a little out of the box, you realize that if you store active photo ID over here, it just oversimplifies it because now we don't need this. Now we don't need this. All you need is this with that, with those two additional checks. Right?

[01:05:18] Update or marking a photos active becomes just single query. No need to have two or three queries put in a transaction at all. If you have auto commit, a single query is a transaction in itself. That would solve it. Single query would do the job. This query becomes really simple because all you are doing is just doing a normal select over your select star from users where ID is equal to this. You get a user ID, you get photo ID, you can create S3 path, read the image, serve it to the user, and you're just oversimplifying a lot of stuff. A little counter-intuitive, but it works, right?

[01:05:53] So I am purely highlighting these points purely from the perspective that what seems very simple, it's not as simple as it seems when you go into those details. When you go into those details, a lot of things can be challenged. There is no one way to build the system, right? Or is active as a property of photo to being a property of user, which is showing the is active or active photo ID. Right. We are taking away, we just chopped up the complexities of the system by doing this. But instead of directly jumping to this, we went because it's a natural progression. It is 15th cohort [unclear: "of bike"] in every single cohort. Since the time when I started taking this question, every single cohort, people start with is active over here because we are trained to do so. We are trained to think in a certain way, but that might not be the most optimal. And I'm not saying this is like, that is like my approach is like humongously more optimal. I'm just proving you folks into thinking that, hey, some other solution, which might be a little more optimized can exist, right? So always be handy in challenging your own beliefs, unlearn, relearn and become a better, right?

[01:07:10] Okay, so these are the key things that I wanted to cover. Let me formally cover it before we take questions. And it's already one or 10 minutes that we didn't cover on-demand image optimization yet. Okay, nothing to worry about. We have enough.

> **Student Question [01:07:24] - Student 9:** I have one question to this. Wait, wait, wait.

**[01:07:25] Teacher:** We'll come back, we'll come back, we'll come back, right? Okay.

<!-- topic-candidate [01:07:29]: Gravatar architecture - photo upload service, CDN -->

[01:07:29] So for our gravatar.com, given that we dive very deep into the SQL query side of things, how we think about performance, how we think about architecting, like, think about other implementation details. Let's talk about how will you design it in general? So we take the photo upload service that we designed yesterday, plug and play as it over here. No changes at all. Like your photo upload service, pre-signed URL and whatnot remains as is. Right. But now when user is publishing the photo, you just make an entry into the photos table that we just designed. Right. That's how your photos upload would work. Then when you are, when user puts that even here, usually.
