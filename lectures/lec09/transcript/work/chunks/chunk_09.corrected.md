**[01:36:44] Teacher:** You can leverage CDN to do image processing as well. Now you can do a lot more with this. Image resizing, image coloring, grayscaling, transpose, rotation. Some services also provide recognitions [?as well | asr: "as all"]. Far too many things. Pick your favorite CDN, see the kind of image processing capabilities that it provides. So you don't really, in today's [unclear: "day in it"], you don't really have to build your own image uploading service or image optimization service. Gives you those tools out of the box. You just pay that bit of money. Problem solved. Right. This is how you build real systems. Drawing boxes, again, as I say, is the easiest thing to do. Build things how they're supposed to be. How real world builds them. Not just theoretical jargon. Right. Okay. Okay.

<!-- topic-candidate [01:37:33]: Recap of image upload service -->

[01:37:33] And this is what I wanted to cover. Everything about image upload service that I feel is important. How we and what we covered. We covered quite a few things in detail. We first talked about, just to summarize, question and we go on a break. Just to summarize, we first build an understanding of what CDN does. We saw that demo of how I've configured it on my website. Then we started talking about image upload service. In that we first converge on storage, why we went for that, because it was cheap. Then we talk about data flow. We saw one concern about doing double copy of data requiring 2x the bandwidth. Then we thought of directly uploading to S3. That's what we understood pre-signed URL. While understanding pre-signed URL, we saw a demo of how GitHub does it. Recommend you to do try it on your own. All of you will have GitHub account to do that.

[01:38:19] When we did that, then we talked about separation of concerns, how we separated the post and the image so that our systems are extensible, and not storing the derived value so that we can change the CDN on the fly and do any experimentations we need. Then we talked about privacy, how privacy works in real world and how you can make things 100% private by letting everything go through image, through the API servers, CDN. That's how you make it 100% private. Then we talk about extensibility a bit, where we said that when the post is published, you put a message on Kafka [unclear: "store as"] other services to consume. And then we talk about optimization through CDN, where we saw how we can leverage CDN, pass in a bunch of parameters, depending on the CDN that you provide, that you use, go through the documentation and see the image processing capabilities that it provides.

[01:39:08] And this completes a very real world image upload service. We showed you the actual, that you saw it, you saw it first time, right? And this is how you think about implementation at every single step. I could have just drawn this box and you all would be happy or not. Let me make it a little more complex. I would have drawn this box and you would be happy. But that's not what real engineers do. Think about implementation. Think about the specifics. That's what makes you better, better than the most. Right? Okay.

<!-- topic-candidate [01:39:40]: Questions before the break -->

[01:39:40] I will take questions till 10, 15, and then we're going to break. Okay. Yes, Amrit.

> **Student Question [01:39:52] - Student 1 (Amrit):** We saw that if anyone has the URL for the CDN, then they can access it. Those things become private, right? So OTT must have done the authorization thing first and then they give the access to CDN? Or how is that?

**[01:40:09] Teacher (answer):** OTT will talk later. We'll talk later. Sixth week. Sixth week we'll talk about it.

> **Student Question [01:40:17] - Student 1 (Amrit):** So basically what I was thinking is like there was some sort of like a proprietary format for these images that only Instagram app is able to open. This problem can be resolved, right?

**[01:40:36] Teacher (answer):** Why would that be the case? Because for your Instagram to render it, they would have to ship it in the Android code. Once it is out there in the APK, anyone can decompile and extract it. There is no rocket science.

**[01:40:51] Student 8:** Okay.

> **Student Question [01:40:52] - Student 1 (Amrit):** So like, if we see like Udemy, Udemy also like handles videos in DRM context, right?

**[01:41:05] Teacher (answer):** DRM is different. Proprietary format is different.

**[01:41:08] Student 1 (Amrit):** Okay. Okay, so like it was kind of like, like I was thinking on those [?lines | asr: "lights"] actually.

**[01:41:15] Teacher:** So there is nothing called proprietary format, because once you ship your code, ship your jar, you can, anyone can decompile and look at the source code.

**[01:41:23] Student?:** Okay.

**[01:41:25] Teacher:** It's easy to reverse engineer your format. That's not secure. Once you ship it out in the public, it's out in the public. And what you're talking about, DRM is very different. I use DRM, as I know. I have quite implemented DRM. So DRM is very different than proprietary format.

**[01:41:44] Student 1 (Amrit):** Okay. I will have to research about DRM. Yeah.

**[01:41:48] Teacher:** Read more about DRM. It's very interesting. There are a lot of interesting hacks even I've applied. Now I can catch who is doing mischief on my platform because it's my platform. I can do that. While implementing, while building entire relog, I got to know all this fancy stuff and which. And then I found a lot of loopholes. I wore the hacker's hat and tried to hack my own system, find out and kept on fixing it. I did that iteration for 10 days straight. So that's why I went really deep into DRM protection and whatnot. Just ensure that I have it fully covered. But I'm very interested to go through that.

**[01:42:28] Student?:** Basically, you became white hat hacker.

**[01:42:32] Teacher:** Kind of, yes. I'm glad you didn't say white hat. [check: "white hat" - repeats the student's phrase; maybe "black hat"] But yes, exactly. I try to hack my own system. I had to do it, I had to do it. But do read into DRM, there is a lot of fascinating things out there, how people, and the most interesting part of that is how people capture the one who did that, and that acts as a formal proof. I can launch, literally I can launch a police complaint and the person will be behind bars for three years. That's the statement from Indian government, FYI. So if you pirate any content and they have a proof, a DRM proof that you did it, you are in jail for three years, no questions asked. You're not given a bail at any cost. That's how strict the laws are now. So beware before you think of pirating anything nowadays, because everything is traceable.

[01:43:26] I ensure that I have three formal complaints registered. Three formal complaints. In last one month, I registered three complaints. Those three folks are going down 100%. So beware before you take any steps. And not just my course, any course. You don't know what is DRM protected. Laws are really strict nowadays. Google is taking very serious actions. A lot of things are going berserk. But it's good that people are now doing this. Yes, Harsh?

> **Student Question [01:43:57] - Student 9 (Harsh):** So in this approach, I just think that for example, if you upload something, but did not post, so our storage is wasted.

**[01:44:07] Teacher (answer):** That's why we said dirt cheap. Yeah.

**[01:44:09] Student 9 (Harsh):** It's very cheap. Yeah. But we need to think on this clean up or something. It's if it's a big concern.

**[01:44:16] Teacher:** Correct. If it's a concern, then you anyway have a database in which you are storing the images. It's may not be published, because unless you make an entry in the post, it is not really published. You can see the entries which are there but not posted, and you can clean it up. But if that is difficult enough, you leave it. It's anyway dirt cheap. So it's okay.

> **Student Question [01:44:33] - Student 9 (Harsh):** And why exactly we are using Kafka here? It is just for that notification or other notification.

**[01:44:39] Teacher (answer):** And you need to tell those service, right? A new post is published.

**[01:44:43] Student 9 (Harsh):** Okay.

**[01:44:44] Teacher:** How would you tell them?

**[01:44:46] Student 9 (Harsh):** Right. All right. Yeah. Thank you.

**[01:44:49] Teacher:** Last question before we go on a break. Go on Rajiv.

> **Student Question [01:44:53] - Student? (Rajiv):** How does the image service know that what is the nearest CDN to a user?

**[01:44:57] Teacher (answer):** I mean, that's CDN internal. That's CDN internal. You look up, that's where BGP protocol comes in. It's not, user service would not know. Image service would not know. User would not know. User would fire a simple DNS resolution request, which is where the DNS resolver would resolve it to the nearest one. And how it does it is with the BGP protocol. A few would, but that's how your CDN resolves to the near, sorry, the domain name resolves [unclear: "CRS"] CDN's IP address.

[01:45:24] Cloudflare has a blog on it, and they have very conveniently said it's something proprietary or like they route a request somehow. But you can skim through it. You'll find some stuff on those lines, but none has released the actual way to do it. But people have tried to, like, you know, superficially people explain it to say, oh, it would automatically do that. No one knows the actual details. Only Akamai, Cloudflare, the actual CDN providers know those details, how they're actually doing it. And Akamai was the first to start it. Cloudflare hired a few folks from Akamai to do it, but something around that has happened. So you'll find a blog by Cloudflare on this very topic, but they have not disclosed any details, but you'll get a rough idea on how that happens.

> **Student Question [01:46:13] - Student 2:** On the same note, only the image ID, which you [unclear: "sold it"], the image ID, which service has generated, we store it in the SQL table now. But we don't know the exact URL. I mean, I mean, Amazon would store, S3 will store it somewhere, but we don't know the exact URL or the place where they're stored. We just pass the, or we just create the path and then send out. Right.

**[01:46:36] Teacher:** So why would we need to know the disk where S3 is storing it?

**[01:46:39] Student 2:** No, no, that's not the question. The question is, there's the first few bytes where what is the, what is the public IP of the S3. We just send it over there. Then S3 actually has to locate where the image ID was, right? And then it reaches out. Is that the way it goes?

**[01:46:56] Teacher (answer):** That's exactly. That's the black box for us. Why would we know which server to go to? For us is SDK. AWS SDK. Why should we care? Correct? Why should we care how S3 is doing it? S3 is black box for us. For this system, S3 is black box. For this system, CDN is black box. Right? So that's the API contract that we are working.
