**[01:47:21] Teacher:** *(admin)* We'll take a break till 10.55 and when we'll come back, we'll talk about again a very interesting service. We'll go down the details called hashtag service. I'll lay out the problem statement. We'll have brainstorming, very interesting low-level details to explore. We'll talk about this in depth and we'll wrap by 11.30 today. We are on track. Great. See you folks at 10.55, 7, 8, 8, 8 minutes from now. Right. Sure. Thanks folks.

[break ~01:47:51-01:54:29]

**[01:54:50] Teacher:** *(admin)* Let's start with the second half, just confirming if mic and speaker are correct. Yeah, okay.

<!-- topic-candidate [01:54:59]: Hashtag service - problem statement -->

[01:54:59] The second system that we designed today is hashtag service. I have called it hashtag service, but the idea is that on Instagram, when you click on a particular hashtag, what you see is you see a screen which is dedicated to that hashtag, which contains the hashtag, the number of photos, and hypothetically, hypothetically, let's say we show exactly top 100 photos tagged with that particular hashtag. Right. That's what we do. Let's say we want to give user a best experience when the user clicks on a particular hashtag. Now assume that there are millions of hashtags out there and assume that there is a service by data science team, how they bring up, but they notifies us whenever they generate top 100 photos for a particular hashtag, somehow, somehow, right? So we don't build a data science service. It's their responsibility, trending hashtag and this and trending photos and likes and comment and share and whatnot. It's their [?headache | asr: "heading"]. We don't worry about it. For us, that is a black box. What we are here to do is, and here to give the best user experience when the user clicks on a particular hashtag by rendering this page.

<!-- topic-candidate [01:56:20]: Hashtag service - brainstorming storage -->

[01:56:20] So let's kick off brainstorming, and we talk about things on brainstorming. We talk about storage. We talk about counting, large volume counting. We talk about inter-service communication and, more importantly, super fast response time. Right. Okay. So how should we go about this? Raise your hands. I'll pull you in. How would you store data? Where would you store data? How would you retrieve and what of it? Let's start with storage first. Data, how would you store this data? Assuming you need to give the best user experience.

**[01:57:04] Student 2:** So like [unclear: "carpet"], we can have one [?tags | asr: "text"] table to first store like all the relevant [?tags | asr: "text"] with their tag ID and the name. And then we can like in the photos table, we can store those [?tags | asr: "texts"] there.

**[01:57:20] Teacher:** Photos table is out of question, right? You want to render this page. Think on those lines. What are you doing over here? And on photos table, you don't have special hashtag column. It's part of your caption, FYI, right? So there is a special column where you're storing hashtags there.

[01:57:38] So here, this is what, this is the page that you have to render. Now think on those lines. What are you storing in order to render this page?

**[01:57:47] Student 2:** So in that case, like we will have a table where we are storing tag ID with the name, and then we will have one more like a key-value store of type of thing.

**[01:57:56] Teacher:** There are two tables, there are two databases there.

**[01:58:03] Student 2:** We can have one only then, like where we can store what is the tag key, and then we can store like values or the metadata associated with it, like what, look at this, whenever somebody post a photo which has this relevant tag, we can like, let's say, increase the count there, the count of the photo has increased. So let's say you have total photos over here

**[01:58:28] Teacher?:** and by the way, why do you need it? Because that's exactly what you want to render.

**[01:58:32] Teacher:** Yes, so tag, hashtag, photos, and then this 100, top 100 photos, how are you getting it?

**[01:58:38] Student 2:** So that we can maintain in a separate [?array | asr: "area"], like the latest photos or the... So whenever somebody uploads a photo and we find out that, okay, it's like its popularity has increased, so we can like pop

**[~01:58:52] Teacher:** We don't have to care. That's what I said. Why are you assuming? We said, we established the boundary, data science team is doing it for us, right?

**[~01:58:57] Student 2:** So we can just store it in a like top 100 array in the [?same store | asr: "same stories"].

**[01:59:08] Teacher:** What will you store in this array?

**[01:59:13] Student 2:** The photo URLs again or the post ID.

**[01:59:19] Teacher:** Right? Why photo URL? Post ID one, post ID two and so on and so forth. You store this information. Okay. What's the advantage of storing post ID over here?

**[01:59:37] Student 2:** Advantage in the sense you mean, like we can retrieve the post whichever we want, like by joining it with the post table.

**[01:59:45] Teacher:** What's the advantage? You are describing how you retrieve the data. What's the advantage of storing post ID over here?
