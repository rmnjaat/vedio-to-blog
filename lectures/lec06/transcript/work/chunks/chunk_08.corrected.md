<!-- topic-candidate [01:19:14]: Q&A - runtime hashing in the query, join criteria, predicate pushdown -->

**[01:19:14] Student 2 (DK):** Yeah. Hi Arpit.

> **Student Question [01:19:15] - Student 2 (DK):** So first question is related to the hashing. So for hashing, you have said that, you know, we cannot do, we should not do the runtime hashing. I was not able to understand why it was.

**[01:19:28] Teacher (answer):** There we are there. We cannot do it because if your query looks like this, select star from users where hash of email ID equal to something.

**[01:19:36] Student 1:** Right.

**[01:19:37] Teacher:** Now for your database to evaluate, which email ID it matches to, it would have to literally go through every single row, compute the hash of the email ID, see if it matches with the thing that you passed. That is a full table scan.

> **Student Question [01:19:52] - Student 2:** Got it. Got it. And in the, in those queries also, when you are joining, you are joining on the user's ID. And then you are putting a where clause of hash is equals to this. So when we are joining on the user ID, why can't we just search basis on the user ID itself? Why do we need to do it?

**[01:20:10] Teacher (answer):** You can do it [check: "can" vs "can't" - meaning flips] because the input that we are getting from the URL is the hash. That's the input that we are getting. Correct. But still we are not aware about the user ID [check: possibly Student 2 speaking] then user ID is because the user is locked in is the join key. Right. So that's what you are joining the two tables on.

**[01:20:27] Student 2:** So that is our problem. We are getting the user ID. We are not aware about the user ID here or we don't need to get a user ID.

**[01:20:33] Teacher:** Right. We don't need user ID. We just a join criteria because it's a foreign key. This is just a join criteria. Okay.

**[01:20:42] Student 4:** Okay. Got it.

**[01:20:43] Teacher:** This is not filtering. We are not filtering on the basis of this. It's just a join criteria. Here what is happening is we are filtering on this. So the first set of filter would be applied on this. Then the join would happen. It would filter, it would just narrow down. So it will be keep on narrowing down. First, a [unclear: "huge terror"] would happen on the hash of the user, from which you'll get just one row as candidate match from the users table, which would be joined on that one user ID to this photos table. From the photos table, it will match 10 photos uploaded, it will match 10 rows out of which, [unclear: "the buttons,"] it would return all the 10 rows here because we are making one is active out of the 10, it would filter out where which is active. So active photo, this is how your flow would happen.

[01:21:24] And your SQL query or in most cases, your database query optimizer takes care of which one to evaluate first. Here it would do because it would find there is a unique key on user hash. This is the first thing that your SQL query evaluation. What is that? That evaluation tree that it creates, to be done as evaluate this. Then it would define the join criteria. Then it would do that. This is basically called as [?predicate | asr: "predict"]. This is called as [?predicate pushdown | asr: "predicate pushed up"]. If you just Google that [?predicate pushdown | asr: "predicate pushed up"] is how a SQL query of SQL engines optimizes queries. So whatever you need at the bottom of the tree, because a tree evaluates from the bottom to the top. So this is what would be evaluated. The first thing it would be at the bottom node, at the leaf node of your evaluation tree, and then the join and then it goes up.

<!-- topic-candidate [01:22:15]: Q&A - CDN cache invalidation on image update -->

> **Student Question [01:22:15] - Student 2:** Got it. And second question would be, so in the CDN, if you can go to the CDN diagram, there, how you are invalidating the cache when the image is updating?

**[01:22:26] Teacher (answer):** By making an API call to CDN. So CDN has APIs exposed. Cloudflare, Akamai, every CDN has APIs exposed to invalidate the cache.

**[01:22:36] Student 2:** Got it. So whenever the new image is uploaded, you are invalidating the cache directly by calling the CDN.

**[01:22:42] Teacher:** Correct. Synchronous. Yes.

**[01:22:45] Student 2:** It's like when user is, so we are not depending on the TTL here. We are just invalidating the cache beforehand.

**[01:22:52] Teacher:** Because user experience really matters over here that when the photo is changed, I want to immediately see the uploaded photo everywhere.

**[01:23:00] Student 4:** Got it. Got it. That's right.

**[01:23:01] Student?:** Thank you.

**[01:23:02] Teacher:** For richer user experience. Chandran Anubha [check: name spelling], I'll take your question in some time.

<!-- topic-candidate [01:23:08]: On-demand image optimization -->

[01:23:08] Let's cover a few parts of, by the way, this is what the next part was. Possible optimizations, adding active photo ID over here is covered anyways. What we'll do is we'll talk a bit about on-demand image optimization and then we take questions and then we go on a break.

[01:23:23] So on-demand image optimization as a problem statement is very interesting and very simple. Now that you know how CDN works, you know how Gravatar works, on-demand image optimization becomes a piece of cake. Now let's assume that you have to optimize the images. [unclear: "SSHedon"] does not give you that feature. And you have to optimize the images, which means that on typical your Facebook, you see profile photo rendered this tiny, teeny dot, 16 cross section, 32 cross 32 pixels. But on other page, it is like 256 by 256. On some other page, it would be 512 by 512, something like that. So user can upload image in any resolution, the small one or the large one depending on what is requested.

[01:24:10] So now you want to build your own on-demand image optimization. This does not mean, what we are not talking about is a, I'll upload the image, I'll post it as a message and have a bunch of servers optimizing it and creating multiple variants of it. No, we are talking about on-demand image optimization. So now in case of on-demand image optimization, just like how CDN accepts query parameters, we would also accept query parameters like w equal to 32. It means that transform the image to a 32 plus 32 pixel, not 32, but 32 width image over here.

[01:24:45] For us to implement it in our Gravatar use case, just extending the discussion. It is now very simple. What we do is just do this. We were anyway reading the URL. We check if the file exists on this or not. [unclear: "would be by bad."] This is how your CDN flow would be, where it reads the URL. If it has the file, it returns it. If not, it reads the file from the origin. In the origin, when this request comes to origin, this request comes to origin, what origin would do? Origin would go to S3, read the image. In that, it would then [unclear: "apply.transformation.pass"] as the query parameter and send it.

[01:25:27] This is where your libraries come in. Your image manipulation or image processing libraries come, like ImageMagick. This is the world's most popular image processing library out there. Python image library PIL has two bindings. One is native Python binding. Second is ImageMagick. ImageMagick is purely written in C++. Because it is written in C++ and almost every single language in the world has C++ bindings, which means that you can natively invoke C++ code in your preferred language. What you can do is you can actually just use ImageMagick APIs to manipulate the image. For example, resizing. It has a native resize function. Image.resize and you pass the new size. It would resize and create and give you an in-memory bytes of it. Just send it to the user. So that's the only thing that you have to do. That's the only thing that changes in the flow.

[01:26:21] So now, because you are writing your on-demand image optimization, whatever path you get in the query parameter, pass the transformation, whatever you would want to support, grayscale, resizing and whatnot. By the explanation, the request would come to our origin server with those exact query parameters. From that, you see, if you have the image, if not, you go to S3, read the image, right? From that you then use ImageMagick as a library to resize the image and apply the transformations. And then you send it as a response. This is exactly what CDN also does. When we talk, when we spoke about it yesterday, CDN also does this. It gives a transformation as logic or transformation is query parameters. We are re-implementing the same thing.

[01:27:05] How do you scale the system? This one thing always remember: image processing, encryption, video processing, these are all very heavy CPU based, it's very CPU intensive workloads, right? So what you need is you need very large amount of CPU to get things done, so. So you throw money at your cloud provider, get bulky machines with large number of CPUs and done. This is what you do. Whenever you're doing on-demand, it's not asynchronous processing, it is on-demand processing. Whenever you're doing on-demand processing, you need to have bulky machines to do that because large number of CPUs, you can parallelize a lot of stuff and get things done very quickly. And this is purely how every single on-demand image optimization or on-demand XYZ processing is built. Nothing fancy over there.

[01:28:00] And because just to highlight it, one thing, it cannot be made async because this is a synchronous request. Where in right now, when you're given this URL, you're given this query parameter, you can say I'll do it processing async and send it to image. It's not like that. In when this URL is loaded, you have to write there and then send the response with 240 pixels image. So you cannot do it async. So what you do is when the request comes to your origin server, you the image and send it. And here I'm assuming CDN does not give you this feature. So if you are building your own CDN, this is exactly how you do it. Cloudflare, Cloudflare or Cloudinary, one of them has a blog on it, right? They did exactly the same thing. It's literally the shortest blog, like one of the shortest blog I've read. It literally said we use ImageMagick library, this, and run on massive servers, 30, 32 cores or 64 cores or something like that, right? We just run on massive servers with this, this, this, and that, and we just scale the fleet depending on the requests that are coming in. Right. And we just scale it to a large amount. That's it. I read it like six or seven years back. I just recalled it. Right. That's it. That's all it's all about.

[01:29:09] So handling scale in today's day and age, especially in case of synchronous thing, that's no, no brain. It's just that you need large servers to handle that particular part. There is nothing magic when it comes to on-demand image optimization. [?Asynchronous | asr: "Our synchronous"] processing will talk seven, we'll talk in six weeks when we discuss video streaming a bit of it, right? You understand when you do [?async | asr: "a sync"], this is what we talk about image processing synchronous, on-demand image optimization, right?

[01:29:36] So what you can do, trust me on this, build this. It's not really difficult. It's not very difficult. So the sequence in which we spoke until long from 9 AM to 10 30 AM, the sequence in which is exactly how, take two days of your time and implement those exact same things, the exact same way, step by step, just one local prototype, just one local prototype, and you will learn everything that you have to. You will never have any questions about CDNs, about image processing, about building this synchronous things, piece of thing, right? Just one, you're just one implementation. Right? Okay.

[01:30:18] There's nothing much to cover, to be honest, in image optimization, because it's all about having bulky servers to do that and autoscaling them depending on the requests that are coming in. Cloud providers give you those facilities anywhere out of the box. Very few chances that you and I would be working on a team that manages its own app. Typically, it is all abstracted out. So we typically don't worry about it in day and age. We focus more on things that matter. Okay.

<!-- topic-candidate [01:30:43]: Q&A - active photo ID query -->

[01:30:43] Any questions in general around anything that we covered from 9 a.m. to 10.30 a.m.? We'll take questions for five minutes and then we go on a break. You had a question.

> **Student Question [01:30:56] - Student 5:** Here. Can you please go back to the page where we had those three update statements in a transaction? And we did an optimization with active photo ID. So my verification is that the new query after this active photo ID optimization, we get the active photo. So it should be select star from users where hash is equal to hash of email, right?

**[01:31:22] Teacher (answer):** Yeah, so that's the exact. So let me do that. Update users set active photo ID equal to something where hash is equal to something. Yes.

**[01:31:47] Student 5:** Yeah. What I wanted to clarify. Thank you.
