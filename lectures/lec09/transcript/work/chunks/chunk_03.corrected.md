**[00:23:34] Teacher?:** Don't jump.

**[00:23:35] Teacher:** First try out CDN. First try out CDN. [check: possible ASR duplicate] We'll touch upon making things private in the image upload design that we talked about. There few things will get clear, but play around with CDN. Play around with CDN before you ask these questions. Get your hands dirty because tomorrow you have entire day of today to play around with that. Tomorrow we'll have another discussion part of CDN. I would recommend you to get your hands dirty today and ask the same question.

[00:24:03] What happens when you have private content? See the kind of configuration that CDN provides. CDN needs to interface with let's say AWS private buckets to ensure that even though that content is private, you're still able to serve it. You have to configure AWS keys here and there and in order to have that seamless access. So that there are additional features. This is a simplified process and not all CDN would support AWS. There is specific, these are plugins that CDN, like some CDN choose to support AWS, some CDN will go for other cloud provider, right? But then they need to implement this logic that, hey, this is how, if it is private, is how we would make call to that. But as an oversimplified process, this is how thinking of publicly exposed things makes it very simple.

[00:24:43] Sure. Anamal.

> **Student Question [00:24:50] - Student 6:** Yeah. Hi Arpit. So I had this [?doubt | asr: "out"], how would the user know about the CDN URL?

**[00:24:56] Teacher (answer):** We'll send it from the backend, right? You are serving the HTML page, the image URL that you pass, it goes that in API response from backend servers, servers and rendered pages, you provide this URL. User does not know it's CDN or not, but user is a URL. And when I say user, [unclear: "it's what does it keep?"] Whatever the browser sees in browser you send, what did I send in my website? I said, edge.arpitbhayani.me slash [?img | asr: "imd"] slash arpeg.png. [check: demo file name] It's coming from my backend, user made a request to my index.html. I served that in which I specified the CDN URL. Image URL is the CDN URL.

**[00:25:30] Student 6:** Okay. So you're saying like the first request would go to backend and it would pass the URL of the CDN when you are serving it.

**[00:25:39] Teacher:** Configure a CDN once. That's, you don't know how web works yet. If you're asking this question, that's not how web works, right? When you are loading something, the URL that you saw, this URL is just a URL that you send anything from the backend to the browser to render in IMG tag. Correct? Yes. It's your responsibility to send that URL. Whatever you pass in the IMG tag, that is what it would render. Correct?

**[00:26:05] Student 6:** Okay. No.

**[00:26:07] Teacher:** Play that around. If this is where you are lacking, understand how web works. What you send from the backend. You are not sending the CDN configuration on the frontend. compiling this URL and sending it to the front end. So for the front end, normally like how it renders the image, it renders it. Spend some time, build a deeper understanding and not even deeper, but build an understanding of this.

> **Student Question [00:26:30] - Student?:** Yeah. So maybe my question is related to what he has asked. We normally see that there is a famous site which said, let's say abc.com and user hits that. And then we start seeing that image and other contents coming from different regions. It means at abc.com, the owner of abc.com, let's say talks to Akamai and gets the URL of [unclear: "wattage"] map to ABC.

**[00:27:01] Teacher (answer):** Correct. It does not make call to Akamai. Who is calling? Who is making call to Akamai?

**[00:27:06] Student?:** No, when I say call means in the configuration, whatever the Cloudflare or cloud provides, you go and say abc.com is my origin. CloudFront or will provide me, let's say, a.cdn.com something. Now it is my responsibility to go whatever the content I want to serve it from my origin and all those pages go and replace that with the, in the HTML pages you have to replace that, as an oversimplification. So everywhere that, is there a way that can we do it like at mass level because you may have a [check: speaker boundaries 00:27:06-00:28:11 - student and teacher alternate under one label]

**[00:27:53] Teacher:** No, you cannot, otherwise how would that request automatically go there?

**[00:27:59] Student?:** Is there a way of doing this thing automatically or I have to just directly do that?

**[00:28:03] Teacher:** No, you have to do it explicit, and that's not a big deal because you would have those low level practices implemented, right? That's okay, I'm not saying... No, no, no. And then that CDN URL is what you have to send to your front end. So that added it's an image URL for front end. Front end is utterly stupid. Front end websites are utterly stupid. What they have is they have this URL with them. They just render. If I send this URL from backend, it would try to go and render this image. If I send this URL, it would go and render this image, as simple as that. Right. So it's your responsibility to change those URLs and send it there to the user for it to render.

> **Student Question [00:28:47] - Student?:** A follow up question on that is, so let's say I had initially given one image which was being cached in CDN. Now I changed the origin URL. So whatever the, let's say, image that you are showing in logo.png, changed it. How the change will be passed by CDN?

**[00:29:08] Teacher (answer):** It would not. Okay. It would not unless the TTL happens, or CDNs also provide APIs for you to explicitly invalidate the cache for a particular path. If you can do that, do that. So that's once again, either you based on TTL or based on pushing the content again to inform CDN that, you don't push the CDN. You just make an API call to the CDN saying that invalidate this path. You don't push the image to CDN. Yeah. I mean, push the change that there is a change there in this path. No, wrong way to put it. You can simply invalidate the path by making an API call. That's it. Okay. So you don't push image to CDN. You don't push something to CDN. Okay. So just tell CDN that whatever this path is invalidated. Next time the request comes, it has a cache miss. It goes to origin, [?fetches | asr: "patches"] it back.

**[00:29:58] Student?:** Okay. Got it. Thank you.

**[00:30:01] Teacher:** Last question before you move forward. Go on Gaurav.

> **Student Question [00:30:04] - Student? (Gaurav):** Arpit, can CDN cache live content like something we watch, live matches on Hotstar?

**[00:30:09] Teacher (answer):** Yeah. We'll talk about it 7.3. 6.3. Okay.

<!-- topic-candidate [00:30:17]: Image upload service -->

[00:30:17] Now we'll move to the first system. Given that we now have understanding of CDN, let's talk about image upload service. Now here, we'll talk about things, again, things that matter. So storage, data flow, this is really important one, [?separation of concerns | asr: "separation of concepts"], we'll talk about it. Privacy, how Instagram keeps images private. And it's not what you think it is. Extensibility and optimization, all sorts of things. Because of this, because I wanted to go deep into image, just this image upload and image service part of it, we spent 30 minutes talking about CDNs, or rather 20 minutes talking about CDNs, because this forms the foundation for us to build a very good image upload service and understand how those things really work.

<!-- topic-candidate [00:31:03]: Where to store images -->

[00:31:03] Okay, so let's start with the first step. We'll have brainstorm on this five, six parameters. Let me start asking this very simple question and then we touch upon those other parts. First, given that it's an image upload service, which means that we need to store a bulk of images. Where would you store these images? Raise your hands. I'll pull you in. Where would you store these images and why? Sandeep?

**[00:31:31] Student 1 (Sandeep):** In a blob storage. I'm not able to get the name of a cloud provider, but yeah, S3, that could be one solution.

**[00:31:43] Teacher:** S3, GCS, right? Why this?

**[00:31:46] Student 1:** Because it's cheaper and I can also compress it and push it in there, right?

**[00:31:53] Teacher:** You can also do it on other places, but why this? Because it's dirt cheap.

**[00:31:59] Student 1:** And easy to implement because we have a lot of online support.

<!-- topic-candidate [00:32:03]: Uploading the image via API servers -->

**[00:32:03] Teacher:** Great, great. So we store this images over here. But now how would this image be uploaded? So here, now the problem starts to creep in, is that we have a user who wants to upload an image in the backend. So now when user is trying to upload an image to the backend, obviously we would have a set of API servers which are listening to this. User would have to send image somewhere. How does this entire communication happen?

**[00:32:37] Student 1:** It has to happen through a persistent connection. It cannot happen in a request response model because you are, it's a huge amount of data that we are sending, right? So I would, if I have to design it, I would go with some kind of a persistent connection and probably I'll send chunks of data to my API server.

**[00:32:57] Teacher:** How big is your image?

**[00:33:00] Student 1:** If it's a HD image, then, uh, like, if I, if I have an iPhone with a high definition camera, then it's gonna

**[~00:33:06] Teacher:** How big? 5MB? Yeah, probably. Yeah, 5MB. [check: speaker boundary 00:33:00-00:33:10] Why would you want to chunk it? In one HTTP request you can send 5MB of data. Okay? Why overkill? Why overkill? Why sending it in chunks? Why unnecessary? Why unnecessary complications? Okay. Yeah. Right. So normal, right. Keep things simple. It's easy. Always remember, it's easy to build complex systems. It's exponentially difficult to build simple systems because we, as engineers are trained to think in a complex way, but no, it has to be an extremely simple solution. 5 MB is peanuts for an HTTP server to handle. You can very easily send 5MB of data in one HTTP request without any problem. You don't need to chunk and send. It's just images. Right.

[00:34:01] But now what will you do? Will you send image like this? Let's say I have this image that I want to send. Now user first makes an API call to the API server and then API server copies it to S3.

**[00:34:16] Student 1:** No, I wouldn't do that because I would rather, I will just, I will do it in asynchronous fashion. And then from there I can do my own async job and I can send it to S3 instead of just

**[00:34:29] Teacher:** Imagine you uploading. Imagine you using Instagram. It says, huh, image posted, but it takes one hour to do that asynchronous processing to really show that image. Poor user experience. Correct?

**[00:34:43] Student?:** Yes, that's correct.

**[00:34:46] Teacher:** So think of Instagram. When you're uploading the image, you want to see that image right there, right now. You want to send it to your followers right there and then. You have to upload, right? So now, will you do this?

**[00:35:01] Student 1:** Yeah, if it has to be instant, then I have to do that route. You know, from my API to S3, it has to go immediately. And it needs to get reflected.

**[00:35:10] Teacher:** Okay, great. Anubhav, what's the problem in this approach?
