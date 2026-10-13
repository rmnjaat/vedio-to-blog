**[00:23:42] Teacher:** Bannerbear, always specializing in doing this. This is how you make the social sharing stuff really easy, really interactive, really real time. For example, just imagine if Twitter tomorrow wants to do this. I'll give an example. If Twitter tomorrow wants to do this, would you see LinkedIn quote unquote influencers taking a screenshot of their Twitter and poet.so and creating a very nice beautiful image and sharing it on LinkedIn. Then imagine that as a native feature of Twitter, where when you share a Twitter URL, the OG image that is generates, it looks very beautiful like this. What it could do is when that request comes into CDN, CDN does not have the data, it goes to backend. Twitter's API server would generate that image on the fly using that same template or using the templatized version of it. It captures the tweet, puts it in it, nicely formats it and sends it to the response.

[00:24:37] Right, cache on the CDNs up to the user. Twitter can build this [unclear: "as a name"], so when you share your Twitter link it can automatically render your tweet in a very nice looking image as a social, in a very social image, right? And that's very powerful when it comes to experience, when it comes to designing great user experience, because user sees personalized things, user sees something which is very recent. It just does not see, ah, this is static rep of GitHub and something something, where it is like what's the current likes and shares and comments and retweets and reposts and all those things that matter, right there in the image which is shared.

[00:25:17] And you can literally build this in hardly one hour. Hardly one hour. [unclear: "We lost"] a local prototype. Highly recommend you to do this. Highly, highly, highly recommend you to do this. It's not difficult. Install Python. I've worked with Python for in order to build this. Java also might have something or whatever language you're using would have something. But pick a library that helps you generate images on the fly. Typically PIL, Python image library is the best out there. It internally uses ImageMagick. It has a C++ binding to that. But it just gives you native Python interface to create images on the fly. And just do it. Expose an API endpoint that does this. You can generate the same thing for any GitHub repo in the world. This exact same thing. Just make a call to GitHub. That information out, create image on the fly and serve it via your local host.

[00:26:10] You learn so much from doing that. And this is how images are actually like these sort of dynamic images are generated and so giving user a great experience. Earlier, if you remember, when you shared images, GitHub used to render a very pathetic avatar of that user. So if I shared images, so my ugly image would just come there on the screen, big flashy image. That's a very, that was a very poor experience. So GitHub implemented this to make a sharing of repositories on social media very pleasant, right? And through this you could see that how whatever we discussed up until now, whatever we discuss across these many weeks, every single thing you can see it in production used by some of the other companies.

[00:27:05] Nothing is theoretical as I always say. You can prototype literally every single thing we discuss. There is no such thing that I need 50,000 servers to do that. No, you don't. You can, you just want your local machine, spin it up and try it out. Right. Nothing beats practical structure. Right. Okay.

<!-- topic-candidate [00:27:22]: Designing Gravatar -->

[00:27:22] Given we have built enough context on this. Talk about Gravatar. Now this becomes an easy problem. After this, after we design, after we discuss this, we'll take questions. Okay. So what is Gravatar? So Gravatar is a very interesting concept. On Gravatar, what happens is you would have seen that on some websites, even though you do not sign up with your Twitter or Gmail or Microsoft or whatever account you are using, it is still able to render your image somehow. And which is where Gravatar comes in. You might have logged into Gravatar in order to enable that. But the idea of Gravatar is pretty neat. So what Gravatar does is it creates your single embeddable URL for your profile picture.

[00:28:12] For example, if let's say your email ID, let's say my email ID is rp.gmail.com. Let's say it is arpit.gmail.com. So what I could do is I could go to gravatar.com, login me arpit.gmail.com and I can upload a bunch of profile pictures there. I can mark one of them as active. Right. Now my URL, what it would generate, it would not generate. It's basically very simple. It's an MD5 hash of my email ID. So it pretty much is constant. Pretty much it is definitely constant. Hashing. If you pass the value, [unclear: "I repeat, I direct gmail.com"] to the same hash function, you get the same output always. So it's gravatar.com slash hash of my email ID.

[00:28:56] So when I go to this URL, this URL actually renders my current profile photo, which I can literally put in any IMG tag, something like this. So https colon slash gravatar.com slash... Let's say this is the hash of my email ID. I think it's something like, this is something very similar to this. So, https colon slash slash gravatar dot com slash zero EAFD 172. When this is put in IMG SRC, it actually renders the image in the browser. It's not that this takes me to somewhere and that renders the email. This is actually returning the image as bytes over here. What we just looked at when we are [unclear: "reading from a message and survey data"], similar. It is literally this single URL to render your profile photo.

[00:29:51] Now what happens is, let's say every company in the world adopts it, which means that whenever you sign up on any platform or any social platform of the world, what you get is, what they could do is they have your email ID. They can pass that email ID to the hash function and use this to render your profile photo wherever they want to. So in the post and the profile page and wherever, they could just use this one URL to render it. Right? If every company starts supporting this, now what would happen? If tomorrow you want to change your profile photo, you don't have to go and upload on every social platform. What you can do is you can just go to gravatar.com, upload your new photo, mark that other one is active. When you mark that other one is active, the next request comes in for this URL. Go to Gravatar backend. It will find that other photo is active. Pick that up, send it out. Everywhere your profile photo is changed without any social network have to do anything. You don't have to go to any website and do that.

[00:30:54] But they don't obviously do that. But it's a very novel concept. What we'll do today is we'll build this [unclear: "very safe"]. What we want to do is support this efficiently. We are building around gravatar.com. It's a really simple system that you can very well build in three or four hours. Not really, [unclear: "good scan is"] difficult, building a prototype is not. So that's why I recommend build prototypes as many as you can, right?

<!-- topic-candidate [~00:31:17]: Gravatar requirements -->

[~00:31:17] So what are our requirements? Our requirements from Gravatar, what we are designing, is: first, user can upload multiple pictures on Gravatar; second, user can mark one of them as active; the one which is active, whenever the API is requested, when one of them is active, it returns the active one in the response. This is what we have, right? So let's kick off our brainstorming, then let's see how we should approach this problem. I want, and given that we built so much of context, let's directly kick off [unclear: "grades"]. How would you start? How would you approach this problem? Raise your hands or [unclear: "pull you in"].

<!-- topic-candidate [00:32:08]: Gravatar database schema -->

[00:32:08] Okay. Let's start with database. Let's start with database. [check: possible ASR duplicate] What kind of table you have? What kind of schema would you have? What would you store?

**[00:32:20] Student 2:** The hash of the email ID of the user.

**[00:32:23] Teacher:** What, which tables would you have? Let's start with each table that you have, right?

**[00:32:29] Student 2:** With the user table where user gives his email ID and we store the hash for it.

**[00:32:35] Teacher:** Will you store email ID or not? The actual email ID.

**[00:32:41] Student 3:** We should.

**[00:32:45] Teacher:** Why? If you are just using hash, why to store actual email ID?

**[00:32:49] Student?:** Yeah, right.

**[00:32:51] Teacher:** No, it's not right. How would they log into Gravatar?

**[00:32:57] Student 2:** Correct. We can directly hash their email ID. Because see, ID is a derivable attribute. So storing one of them makes sense. And since you have...

**[00:33:13] Teacher:** Why, why all social platforms take your email ID and not, and store your actual email ID instead of storing the hash of it?

**[00:33:23] Student 2:** No, they can also do that, that would save them a lot of space. I think the use case there is a little different because you might need to display that email ID somewhere, but at Gravatar we don't need to display.

**[00:33:34] Teacher:** Why not? If you open Gravatar, you go to the profile page, you want to see your email ID, don't you? How are you authenticating people there? Right. While authentication people pass it because in case of hash collision, you are locked in some others account. Also problem. Correct. It's always better to store email ID. Right. Okay. So ID, email ID. What else?

[00:34:02] Not hash probably because hash is a derivable attribute. Okay. Hash is derivable attribute. So I'll just write hash and cross it off. You're not, you're deliberately not storing hash because it is derivable. Okay. Any other thing that you would add to user, that's what users table is fine. Which other table?

**[00:34:24] Student 2:** I think that, just one, I don't know whether it should be a different table or within the same one to store the image paths, not the active one, but just the image paths.

**[00:34:37] Teacher:** How would you store multiple paths in a single column of relational DB?

**[00:34:42] Student 2:** Yeah, we won't be able to. That is why I said.

**[00:34:45] Teacher:** So let's say you have a photos table. Yep. In which what do you store?

**[00:34:52] Student 2:** The email ID of the user ID. Obviously the photos ID.

**[00:35:04] Teacher:** What is photos ID?

**[00:35:06] Student?:** The, the primary key of the photos table.

**[00:35:08] Teacher:** The primary key. Okay. Okay. And what else?
