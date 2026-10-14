**[01:00:44] Teacher:** two in Northeast, three in West and four in South. Yeah, four in South. So they are much more geographically closer. So you don't even have to go to Bangalore to read it. You can literally serve it right there and then.

**[01:00:59] Student?:** Got it.

**[01:01:00] Teacher:** So geographical reason is one of the biggest reasons. Apart from that, the way it is storing the data, the way S3 is handling it, S3 has some guarantees. S3 gives you nine nines guarantee, something like that. Right. CDN gives you different guarantees. They give you better response time. It can store it. I don't know where they are storing. They are storing it on local disks. They might be storing it on the SSDs. S3 doesn't store on SSDs. Right. So a lot of factors. But if you are so keen on [unclear: "announcing"] out performance out of it, do a benchmark and see what works the best for you. If CDN does not work best for you, that's okay. Right. But then you will have to pay for S3's egress cost. You should be okay for that.

**[01:01:36] Student?:** Got it.

**[01:01:38] Teacher:** This question always keeps me wondering why CDN are faster than S3 also? Is it only the location? No, no. There are a lot of factors. S3 does not read from SSDs. CDN might have a bunch of SSDs. We don't know. Right. Talk to other ones. Just schedule the call with Android. [check: aside - "Talk to other ones. Just schedule the call with Android." context unclear] CDN uses SSD. But S3, given that it's an ocean of data, it does not use SSD. It would become very costly for them to do so. Right. So that's one more reason.

> **Student Question [01:02:09] - Student 2:** Yeah, so we talked about how CDN will fetch the data from S3, right? So it won't be a direct path because generally when we are fetching from S3, we have to again generate a signed URL and that is also valid for only some amount of time and then we can fetch it.

**[01:02:26] Teacher (answer):** No, if it's a private image, then you need a signed URL to do that. Otherwise you can directly access. So that's where I said, right? CDN has this special integration with AWS where you have to upload a AWS private key and secret key on CDN so that it can access private images from your private S3 bucket.

**[01:02:44] Student 2:** Okay. Okay. So it is doing the same flow. Like it is generating that signed URL.

**[01:02:50] Teacher:** No, it does not. It has AWS access keys and secret keys. It can directly make an S3 call to read it.

**[01:02:56] Student 2:** Okay.

**[01:02:58] Teacher:** Normal S3 read, not using URL, using normal AWS SDK on it. It has the [?keys | asr: "skis"] with it, right, and directly make a call and read it. And that's one of the ways, that might not be the only case, because now given that the popularity of CDN is very high and almost everyone uses it in front of S3, CDN has native integrations on S3 and S3 also by default supports seamless integration with CDN, whether you don't have to do this kind of every time authenticated request and whatnot. There is very seamless between CDNs and S3s.

**[01:03:29] Student 2:** Okay. Yeah, thanks.

**[01:03:31] Teacher:** Just sign up on Akamai or Cloudflare and configure it. Create an AWS account. Take out $100 from a salary. It's nothing, just 7,000 rupees or 8,000 rupees. Take it out. Play around with CDN. Play around with S3. Play around with AWS and experience this. Right? Okay. Prashant Raji, I'll take your questions in some time. [check: names - "Prashant Raji" (Prashant, Rajiv?)] There's still a huge set of things to cover. We'll also cover. I want to touch upon privacy. That's really interesting. Hey, where's my Insta account? Demo. Do I have public? I'll need to check. I'll do that. Where are we? I'll share my iPad. Because I want to show you Insta images are not the private, Insta images are not private. That's a big myth. We'll understand how privacy is implemented in social media. We'll also talk about that. And that's where it's the magic of CDN. Again, CDN cocks up. [check: "cocks up" - CDN kicks in?] Okay. So we discussed storage, we discuss how the data would flow.

<!-- topic-candidate [01:04:29]: Separation of concerns - post table -->

[01:04:29] Separation of concern is what I want to discuss next. Now, this is a very interesting concept. Now, a lot of folks, if I ask you, let me ask you this question. User imagine Instagram. What would your post table look like? What would be the [?schema | asr: "scheme"] of that? Raise your hands. One raise your hand. What would be the [?schema | asr: "scheme"] of your post table? What all would you store?

**[01:04:58] Student 2:** Yeah, so it will have a user ID posted. Then it will have the post content like the text, post text, caption.

**[01:05:11] Teacher:** Yeah.

**[01:05:12] Student 2:** And it might have some tags also. So we can store it.

**[01:05:17] Teacher:** It's not explicit tags. It's part of the caption. Okay. Yeah, and then when it was created, [?created at | asr: "created it"], that's fine. And photos, what photos, what will you store in photos?

**[~01:05:31] Student 2:** So it will be like the URL of the photo which you got, the pre-signed URL.

**[~01:05:37] Teacher:** This is what I want to talk about. Not pre-signed URL, the actual CDN URL. Yeah, basically, yeah. [check: speaker - "Yeah, basically, yeah" may be Student 2] Okay, now this is what I want to bring to the notice that, please go on, this is what I want to bring to. Every single one thinks of building it like this. Every single cohort, every single person thinks of it building. But no, this is wrong. Why? This is suboptimal. Wrong would be a strong word. This is suboptimal. I'll tell you why.

[01:06:05] Always remember. Always, always, always, always remember that if something is derivable, don't store it. For example, this is what I want to talk about. Almost every single one of you would have thought, hey, it's simple. Now post, I'll have a post ID. I'll have user who created a post and I'll have image URL. Instagram, I'll have image URL. Now imagine what URL would you store in case you are storing the URL. Will you store S3 URL? Will you store CDN URL? Because I'm serving their CDN, I'll store CDN URL in S3.

[01:06:42] What if tomorrow you change your CDN provider? Real world use case. Imagine Instagram. Most probably Cloudflare as a CDN. Most probably they were using Cloudflare as a CDN. Facebook came and acquired them, but now they cannot use Cloudflare CDN. They have to use Facebook CDN. Now imagine changing, going through your entire database, changing your image URL at every single post on Instagram. Imagine the amount of work that needs to be done.

[01:07:17] Worse, worse thing. Way to do it. You may say, oh, why should I store [?CDN URL | asr: "serial"]? What if I store S3 URL? What if you change your cloud provider? You say, I don't need to change cloud provider. Let's say Amazon shoots up their pricing by [?4x | asr: "Forex"]. You can't do much. Microsoft just did that. Microsoft changed their billing of Bing APIs, right? Because everyone now started using Bing. They said, ah, they should make it four to 10x every single API call. It's now four to 10x costly. World works on money, my friend. So, you always have to ensure the way you are structuring your system, you are not binding yourself to something.

[01:07:55] So, what do you do? Always anything that is derivable, don't store the derived information. For example, in the post table, whatever URL you want to generate, keep that as part of business logic. But what you store is the crux of the information. Again, in the image upload service that we had. So let's say we have a flow, something like this. You have a prepare upload where you talk to your image upload service. It talks to S3, generates a pre-signed URL. You make an upload, upload goes through S3. Now in this image service, what do you get? This image service is where you are getting, which is generating this random ID, this random image ID. What if you just store the random image ID over here? URL, just the random image ID.

[01:08:46] Now what you do is you structure the way you are storing the images on S3 such that you can create the path on the fly. For example, on GitHub image upload URL that we saw, we saw there was key equal to 47 something and then that ID, that random ID. What was that 47 something? That was my GitHub user ID. So what typically happens is you would not just dump all images on the root folder of. You would have it categorized as part of users. For example, instaimages.com slash userid slash random photo ID. Something like that. So all the photos of a user are contained in one folder. Similarly, for each user, you would have folders. Honest, right?

[01:09:30] So given this, if I give you this three information, like user ID, sorry, this two information, user ID and image ID, will you not be able to generate this part? You would be able to generate this part. So why do you want to store this bulky part again over here? Can you not generate it on the fly? You can and that's what you should. Because now what it gives you flexibility is when you are reading the post, you get these parameters and now you can generate any path and return in the response. You can generate raw S3 path, you can generate CDN path, you can change your CDN, you can do AB testing on CDN, you can play around with two CDNs.

[01:10:08] For example, it's a very common practice that once every two years, your senior management would wake up and say, oh my God, our CDN costs are very high. Let's switch the CDN. Let's put 20% traffic on other CDN. How will you implement putting 20% traffic on CDN? Because you have to provide that URL. It's not possible. That's why anything that is derivable, you do not store the derived value.

[01:10:36] So what you do is, and actually that happens. You become senior engineer. Your senior management will smoke weed one day and come up with this idea. Let's switch CDN and let's switch cloud provider. And you have to work with that. So given that, what happens is instaimages.com slash user ID. Insta images slash user ID slash [unclear: "standup"] photo. This is S3 URL. You anyway cannot serve S3 URL. You have to create CDN URL on the fly. How will you create CDN URL? You don't have this information, you have to extract the URL, do string manipulation and then set and then send. It's always better, always better to store the cruxed information rather than the actual URL.

[01:11:18] Generate the URL on the fly, which means in the API server, when you're reading the post, you read the post, you read the row, you get these columns, you create signed URL as part of the API handler and send it in the JSON response that you have. This way in the handle that you return, you say, you pick a random number between 0 and 0.2. Sorry, if your random number lies between 0, 0.2 or 20% of the times you generate, you use CDN A, otherwise you use CDN B. This way you actually transfer 20% requests through other CDN and see what their performance is. And you can do a lot of fancy stuff there.

[01:11:54] This is how Instagram, when they would have migrated from Cloudflare to Facebook CDN, they would have done something similar. If they were actually storing the photo URL here, they would have to change literally every place and handle how new photos are uploaded because they don't know where it would be served from. So it's always better to store the crux information over here rather than storing the actual URL. This way you have the flexibility. You can do whatever you want.

[01:12:23] Let's say you want to delete the image of a user. You would use a server to delete the image. If you would not have stored this and you would have stored image URL. You don't know S3 path. How will you delete something from S3 where you don't know the path? I have the URL and trim off the CDN part and do this and that. Worst way to build a system. Store the correct information. You can easily using user ID and image ID generate this path and make an API call to S3 and delete the image once and for all. Very simple.

[01:12:50] So again, [?reiterating | asr: "rehydrating"] this. Whenever something is derivable, don't store the derived value. I should put it in my t-shirt. Always remember. Always, always, always. Because it gives you the necessary flexibility that you want to just switch the CDN whenever you want or directly pinpoint to S3 and whatnot. It just makes your life so, so, so, so simple. Right? Okay. This is what I wanted to bring up. This is a really important point.

<!-- topic-candidate [01:13:20]: Post service -->

[01:13:20] This tells us this adds up another interesting thing, a post service. Post service is where your API call to create a post, submit a post, read a post, that part would come over here. But this is where your flow now looks something like this. You have your user, user wants to upload an image, talks to image service, it prepares for upload by creating a signed URL on S3. We get a signed URL, user uploads it to S3. Once that upload is complete, it makes an API call to post service and post service creates an entry into this database.
