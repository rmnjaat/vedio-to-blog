# Lecture 06 - How images are served, designing Gravatar, on-demand image optimization, tagging people in photos and the newly unread message indicator

| | |
|---|---|
| **Source** | lec06.merged.json |
| **Duration** | 02:55:50 |
| **Speakers** | Teacher (TEACHER, addressed as Arpit; some teacher name-calls and prompts under STUDENT_2 / STUDENT_4 / STUDENT_7 / STUDENT_8 labels split or relabelled, logged); Student N (STUDENT_N, N = 1-9, 14; names only on turns right after the teacher calls them: Student 1 (Sunil), Student 2 (Chandan / DK / Sitesh), Student 4 (Mohit / Vishal / Rahul / Pankaj), Student 5 (Jyothi / Anubhav), Student 6 (Vikram), Student 7 (Shriya / Priyanka), Student 8 (Harsh)); STUDENT_11 / STUDENT_13 back-channel -> `Student?`; `Student?` / `Teacher?` = uncertain. Diarization labels STUDENT_2, STUDENT_4 and STUDENT_7 appear to mix several students. |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 231 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 161 (TERM? 74, UNCLEAR 43, CHECK 29, SPEAKER? 15) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS, retention 99.63%, additions 0.22% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:02] Agenda for today *(admin)*
   - [00:02:52] Notification system video - Kafka with SQS for fan-out
2. [00:05:38] How images are served
   - [00:16:16] Images generated on the fly - GitHub social image
   - [00:18:09] Open Graph and the OG image
3. [00:27:22] Designing Gravatar
   - [~00:31:17] Gravatar requirements
   - [00:32:08] Gravatar database schema
   - [00:36:12] Queries - all photos of a user, hash column
   - [00:44:56] Marking a photo as active - update query in a transaction
   - [00:56:15] Minor optimization - query to pick the active photo of a user
   - [01:03:48] Is active in photos table vs active photo ID in users table
4. [01:07:29] Gravatar architecture - photo upload service and CDN
   - [01:08:25] Serving Gravatar photos via CDN
   - [01:11:52] CDN invalidation on photo update - Kafka, consumers
5. [01:14:03] Questions - transaction fallback, CDN mapping, hashing
   - [01:19:14] Runtime hashing, join criteria, predicate pushdown
   - [01:22:15] CDN cache invalidation on image update
6. [01:23:08] On-demand image optimization
   - [01:30:43] Questions - active photo ID query, Boolean vs enum, membership table
7. [01:34:52] Break *(admin)*
8. [01:40:40] Tagging people in photos
   - [01:41:39] Senior engineer wears three hats - requirements
   - [01:45:59] Max number of people tagged in a photo
   - [01:49:13] Tag notifications - notification team, throttling
   - [01:53:41] Tag suggestions - ML team dependency, SLA, fallback
   - [~01:58:42] Tag position - relative coordinates, LTRB
9. [02:02:56] Newly unread message indicator
   - [02:05:58] Requirements - unique people with unread messages
   - [02:07:24] Read flag, last read time, unique users count
   - [02:19:28] Optimizing the unread count - non-relational store
   - [02:23:39] Source of truth vs pre-computed
   - [02:25:32] Redis set per user
   - [02:27:52] Updating Redis - input from the messaging service
10. [02:37:16] Auxiliary database - auxiliary Redis
11. [02:40:48] Next week - storage engines *(admin)*
12. [02:42:10] Q&A
   - [~02:43:21] Auxiliary Redis entries and clear status
   - [02:46:42] Transactional update of both databases, read before write
   - [02:48:52] Why no user ID in the Gravatar hash
   - [02:49:57] What on message unsent means
   - [02:51:05] Closing *(admin)*
   - [02:51:39] Resources for query and database optimization
   - [02:55:27] Auxiliary Redis cluster

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

<!-- chunk_01 00:00:02-00:12:45 -->

## [00:00:02] Agenda for today *(admin)*

**[00:00:02] Teacher:** Great, week four day second, after this will be completed 50% of the course. Interesting. Okay. So we'll continue our discussion on social networks, but like how we [?digressed a bit | asr: "digress the big"] yesterday on CDN side, but that's important. That's very essential for us to know. Today, what we'll do is we'll digress a little bit more in some other direction to touch upon something really interesting. Yesterday, we [?forked | asr: "fogged"] a discussion around, hey, Instagram private images are not really private. What if we want to make one? Right? We'll talk about that. We'll talk about how to make a purely private image sharing platform, for example. You'll get the gist of it. Right. Yesterday, we just spoke about, hey, CDN gives us image optimization. Why to build one? Today we'll build one and we'll see how it is actually, it's hardly going to be 10 minute discussion, but we'll see how simple it becomes to implement an on-demand image and on-demand image optimization.

[00:01:07] Then we take a break and then we discuss then from now on, given that we are almost 50% done, and with the course from now on, I'll start throwing you all into different situations on typically what senior engineers are supposed to, how they are supposed to wear multiple hats, participate in multiple discussions, take care of multiple things at once, right? Think of extensibility of the system. Think about cross-stream collaboration. Those sort of factors will take care today. We will understand how should we even approach this. So you will see across three or four different systems that we discussed, I am forcing you all to think in different lines. So that is where we would pick up our discussion with tagging photos. Seems like a really simple statement, but when we ask those critical questions, we realize that it is not as simple. It touches upon a lot of interesting factors.

[00:02:09] Right, that, and we'll end our session for today with a very interesting system that we use every day, but we don't give it enough credit, which is newly unread message indicator. I could not come up with a better name, really sorry for that, but newly unread message indicator is how we use our social network every single day, or social media every single day, and we just fail to acknowledge that, hey, this system or this one small button can be so complex, right? But again, through this what I would like to do is I'd like to touch upon a very interesting high level pattern that you can use or that a lot of company uses in production to prevent major outages. So these are the four things that we'll discuss today.

### [00:02:52] Notification system video - Kafka with SQS for fan-out

[00:02:52] But apart from that, I covered this one system just once, designing notification for Instagram on my first ever [?cohort | asr: "quote"]. I never covered it again because it was out there on YouTube. But do watch it in case you haven't, because there is one thing, one key takeaway from the lens of very naive is that you would realize how naive I was when I was explaining that. But even people found it amazing, which shows the massive gap that exists. One key thing from this discussion notification system is how we bridge the gap of Kafka. Yesterday also we saw that how the parallelization or the parallelism of Kafka is limited partitions in Kafka. How do you get past that? Because you may have to send a million notifications or notification to a million users. Let's say Justin Bieber posted something. You want to send notification to 10 or 15 however many million followers he has. You have to send notification to those many folks. How do you do that? Because if you use Kafka, it's pathetically slow. If you have limited number of partitions, adding large number of partitions becomes a problem. So what do you do? Which is where I spoke about a very interesting high level pattern where you club Kafka with SQS. So message stream with message broker to get very high degree of fan-out. That's an interesting concept.

[00:04:16] You should definitely watch that just for that one bit. Everything else you can now design on your own. But that one bit on why are we making that decision? And basically that's how notification systems are built. If you just draw and I'll have a message broker on which [unclear: "send message input broadcast."] No, that's not what happens at scale. That's not how you manage or handle scale. To build such systems you need, because I had to do it. There was no option for me to send notifications to, not even talking about million, I'm just talking about few 50, 60,000, but in the span of five seconds, we had to do it. So in that case, when we are being this aggressive in marketing, we had to pull that off, right? So this is what we did. This is how we stitched our system together, a message stream with a message broker to get a high degree fan-out. So watch that video in case you haven't. It's the first ever video I posted on YouTube. So watch that. If you sort it by oldest video first, you'll get it as the first. So that's why I don't cover it again. But watch that video to get how we club Kinesis or Kafka with SQS or RabbitMQ to get high degree fan-out. First ever cohort, March 20, goes back two years, two years, two years back. I covered it. Right. Okay. So this is the agenda for today.

## [00:05:38] How images are served

[00:05:38] Let's start with the first one. But before we jump to designing Gravatar, let's spend a bit of time to understand how images are served. Now, serving images is really important. We all do it on a day-to-day basis. But how are these images actually served? Because we just say images are served. How? When I ask this question, the first thing you people say, without even thinking about it, [unclear: "will you see it into service?"] But someone has wrote that [?code | asr: "quote"]. Someone has to read image and serve it. What, how do we serve a static file? Right. Let's start with that, because that's what would help you build a shit ton of features, and not even exaggerating on that. We'll see a real practical demo where this comes in handy, because I don't [check: sentence cut off, words possibly lost] of it, right? You'll understand how beautiful this thing is. You can understand how companies mind blowing, like mind blowing, awesomely use this particular feature. Okay.

[00:06:43] So whenever you hit a particular URL, your browser does not know it's an image URL. Let's say you have this URL and you've hit it. Your browser has no idea what's happening. What browser would do. Let's say it's for some reason, four or five [?weeks | asr: "words"] back, some people thought that it's because of this extension, the browser knows it's an image. No, browser does not have a clue. Browser is a dumb, stupid piece of software. It has nothing in it. What you give. So browser has a fixed defined behavior for everything. And when I say browser, also applicable to apps. Right, so always remember, whenever something is a platform, browser is a platform, app, Android app, iOS app is a platform, right? So sorry, the Android OS, iOS thing, the SDK that you can, they're all platform, they're all building block, so they cannot be very smart, they have to be basic enough so that you can use it with hundreds of other things.

[00:07:44] So for you to render an image, what you typically do, you take some URL and you put it in an IMG tag, IMG SRC, and you put the image URL there. What happens when you send this HTML to browser and browser renders it? So browser starts rendering the XML, the HTML that you sent, it stumbled upon IMG SRC tag. What browser simply does, whatever you provide in IMG SRC tag, it makes an HTTP GET request. If you provide this URL, it would make HTTP GET to this. If you provide some other URL, it would make HTTP GET to that. Browser does not have any idea what it would get in return. It is expecting an image. So what it does, it makes HTTP GET request to whatever URL you specify in the IMG tag. Whatever you get in the response, it tries to interpret it as an image. How do you do that? It's set up.

[00:08:46] Yesterday we saw when GitHub sent, when we uploaded the image on GitHub issues, happened, we saw how that PNG files bytes were sent, in that, that header PNG and some RDF data and whatnot was shared. That is the file format. The header of the PNG file tells you that it's a PNG file. JPG has a header, bitmap has a header, TIFF has a header, every single format in the world has a header. So what it does, whatever bytes you get in return, if it's a 2xx response, whatever bytes you to get in the response, it checks the header. It sees, okay, this is a PNG image. So it would interpret those bytes as PNG. So every browser ships with image encoders and decoders, but rather mostly decoders, not really encoders, but decoders for every type of format, PNG, JPG, [?TIFF | asr: "TAPE"], SVG and whatnot. Whatever you get something as a response and it looks at header and says, hey, what kind of format is this? So it would invoke the PNG decoder or basic PNG decoder code and it would decode that and render it as a pixelated image on your browser. That's what is happening.

[00:09:58] So given that, we know now that IMG tag makes an HTTP GET call to get it. So when HTTP GET call is made on this URL, what would happen? The request would come to server pointed by this, [?arpitbhayani.me | asr: "arvizhany.me"]. It's a web server. What it would do is it would see what's the handler of this path. You may have a handler. Let's say you, typically what you do is you map your static folder. This is my static folder, right? As one of the parts. So slash static maps to this particular static folder. You configure this on nginx. Configure this on Spring Boot. Configure this on Flask, Django, whichever framework you are using. Every framework supports a static folder path. What happens when you say that, hey, slash static maps to this folder, local disk? It means that whenever a path like slash static slash something is hit, interpret whatever is there after slash static as a relative file path, go to my static folder on the disk, read this path, read the file present in this path and send it as a response. That's it. It does not care if it's image or text or whatever. Literally whatever is there.

[00:11:16] So for example, slash static slash IMG slash appy.jpg. Let's map this static folder to this static URL. So what I'll do is whatever I get after this is what a piece of code is written. It's not automatically does that. There's a piece of code written in your web server so that you don't have to re-implement it again and again. What it would do, that slash IMG slash appy.jpg would try to hunt that same path in the static folder mapped on your directory. It would find this file. It would read this file, read the bytes of it and send it as a response as part of this HTTP request. Once this response is received by the browser, the browser interprets it as an image because you put it in the IMG tag and it renders it. So this is how render happens.

[00:12:04] So here we spoke about how static folders are mapped. So slash static path map to slash static folder on your directory. Where your code is different, where your static site is different. So this is what happens. Now, what does this tells us? That this is what is happening as part of your code. It reads the URL. This is part of a backend code. It reads the URL. It extracts the path after slash static. It goes to that corresponding folder, like that corresponding relative path in your static

<!-- chunk_02 00:12:45-00:23:42 -->

**[00:12:45] Teacher:** directory reads the content of in bytes and sends it back. Which means that I instead of relying on slash static, I can do anything there. I can write my own handler that instead of reading file from local disk, it reads file from S3. For example, I can very well do that. So let's say hypothetically, what I want to do is we saw how static path are exposed, but let's say I want to expose a path slash raw, right? So slash raw slash path, anything I gave over here as a path, what I want to do is whatever path is over here. I want to go to this S3 bucket at this path, read the file and [?return | asr: "written"] that as a response. That's it. [unclear: "to this is exact."]

[00:13:40] This is very similar to slash static, but slash static reads that same relative path from local disk. What we just did is we read that same thing from S3. So which means that we don't have to configure for every single file on S3. I'll configure one URL over here. We just take a generic path over here. Whatever is given over here, we're literally using that as a key of S3 present in this bucket, reading the file and sending it to the user. So with this three, four lines of code, what we just built is we built a proxy for S3. So we provide, we make any HTTP requests like this, HTTP call a slash, slash localhost 5000 slash raw. And whatever is there after that, it would use this as this path, read this path from S3 present in the configured bucket, whichever bucket you have, and serve this file.

[00:14:37] Not a feature. I'm not designing a new CDN. I'm just telling you the possibility of how you can return images as part of a normal HTTP response. A lot of people for some reason think that we can only send JSON responses from Web server. No, you can do a lot more than that. One of the key things that you can do over here is to send the images from your HTTP handlers that you have needed. So I just literally just exposed a path, exposed a URL, sorry, exposed a route on my web server, which literally just reading files from S3 and serving it to the user. It's like, why are you doing it? It's more about understanding what you can possibly do. Now we'll see practical applications. Okay.

[00:15:30] So given that now it's in our control, whatever input is, it is not just that the image already. What does this tells us? It tells us that it is not really needed that your image already exists for it to read and serve. We are just making a network call to S3 and reading it. I can have my own custom logic over here. And then what matters is the bytes we send to the end user. That's it. If we are sending a properly structured image in the response, byte serialized version of it, the browser would be rendering it.

### [00:16:16] Images generated on the fly - GitHub social image

[00:16:16] Now, where do we see this in action? I'm sure you would have seen a lot of images on social platforms where people share about their GitHub repositories or people share their GitHub repositories. Now, let's take a look at how that works. There's a very interesting side effect of understanding this. I'm just sharing my complete screen. I'll show you them. So I have this project DiceDB. Now, if I share this project on social platforms, I'd want very interesting things about this project. Because when you share it on Twitter or LinkedIn or Facebook, you see a very nice way of representing it. Do we have any people who have shared? I think I have only done that. I'll show you.

[00:17:11] DiceDB. See, this is... No, not this. This is the one I'm talking about. So I shared the link. DiceDB slash Dice. GitHub.com slash Dice. Dice. What it rendered? It rendered a social snippet of it. It has ways to render a link. It [?fetches | asr: "patches"] the information, the title, the site name, the description that you provide and the image. Now this image is not some generic image. This image is specific to DiceDB. DiceDB slash Dice. This is the description, number of contributors, number of issues, number of discussion, number of stars and number of forks. This image. This image is generated on the fly by GitHub, not every time, but on the fly by GitHub. So let's take a look. And I'm happy that I have five notifications. Okay.

### [00:18:09] Open Graph and the OG image

[00:18:09] So when I share this thing, if you go and by the way, how is this image rendered? This is part of Open Graph protocol called OG. So you in the HTML that you serve, you have to specify OG colon image, whatever the URL you provide in OG colon image, that URL is rendered as an image over here. That's what happens. So if I go through the code of this and I do view page source and I search for OG image, you see this content, this thing. And now if I do paste, you see this exact same image. Now what is this? What is this particular path? If you look carefully, it does not end with .jpg, .png, anything like that.

[00:18:57] But what it is indeed returning is it is indeed returning a valid image as a byte response, like reading the bytes of the image and sending it back. But now this does not mean that this image is stored on S3 somewhere by GitHub. Imagine GitHub unnecessarily creating images on the fly because if you look carefully, the data that you see in the image, it's very customized to what the current state of information of my repository. If you look carefully [unclear: "for car"] 74 to 75 contributors and whatnot, right? This is very recent. If in a day it changes, this would change again. If you let's say become a contributor and DiceDB, the count will change to 11. Maybe it would take one day or two days to reflect, but it's very recent. It's not that it is pre-generated by GitHub.

[00:19:54] A lot of people think everything is pre-generated. No, it is not. Because imagine GitHub has millions and millions and millions of repositories. Why would GitHub spend computation power generating one for each every single day? So what happens is you generate image on the fly, on demand, whenever it is requested. And this is what you do. So here what is happening is if you look careful at the path, this path shows us that for you to, if I did just take this image and put in the IMG tag, it would render this image in my browser without any hiccup. So what is happening is this is literally the route handler that we wrote, the one that we wrote slash raw slash raw slash path. This is kind of that. And it is put behind CDN.

[00:20:48] This is another CDN that it has opengraph.githubassets.com. This is another CDN that they hosted similar to how we saw [?edge.arpitbhayani.me | asr: "edge.arbitpending.me"] yesterday. This is one more CDN on the GitHub side. We saw one on the GitHub as well, user assets, GitHub something, githubusercontent.com. This is another CDN that they've configured. So here this CDN looks very specific to Open Graph. Open Graph, OG that I was talking about, that is Open Graph. So this is what you are invoking.

[00:21:22] How this is built is simple. You have this key would remain constant for a repository or something. You can generate it on the fly as well. But the idea is pretty simple that when this URL is sent from the backend to the frontend, frontend renders it in the IMG tag. This request goes to CDN hosted at opengraph.githubassets.com. CDN says if it has the file or not. If it has cached the file, which is image file, good enough. It would serve it back to the user, which is what is now happening. See how quickly it gets loaded. This means that it does not have to go to there every time. It doesn't have to go to backend server every time. Right? If CDN does not have this file, what CDN would do? It would make call to origin. What is origin? Origin is the API server of GitHub, which handles this request, which is generating this image on the fly.

[00:22:16] That, hey, this is where my title should be. My title, this is where my repository icon should be. This is what I would have fetched the key statistics about repository and put it over here. This is a template, no matter which image you, which repository you pick, you would see this exact same format. It is a template I used to watch it. [check: phrase unclear, very fast segment] So what is happening over here is the API server of GitHub, when that particular API call is made by the CDN, it is generating that image on the fly using ImageMagick for any library or like there is a library called PIL, there is a library called ImageMagick around tons of libraries out there to generate images on the fly. It generates image on the fly and responds back to whom CDN met a request. It sends response to CDN. CDN gets the response. CDN caches the file. And then with some TTL, it keeps it there and serves it to the user.

[00:23:04] The subsequent requests are served on the CDN. After a day, when that thing exhausts, when the file expires, the next request that comes in, there is a cache miss on CDN, goes to backend. A new image is generated [?on the fly | asr: "on the right"], it is generated on demand. So it's not that GitHub is creating and storing this image for every repository out there. It is doing it on demand as it is distributed because the image itself contains the recent information, which is why GitHub cannot pre-generate those images and store it. And now you can see this feature at hundreds of places.

<!-- chunk_03 00:23:42-00:35:15 -->

**[00:23:42] Teacher:** Bannerbear, always specializing in doing this. This is how you make the social sharing stuff really easy, really interactive, really real time. For example, just imagine if Twitter tomorrow wants to do this. I'll give an example. If Twitter tomorrow wants to do this, would you see LinkedIn quote unquote influencers taking a screenshot of their Twitter and poet.so and creating a very nice beautiful image and sharing it on LinkedIn. Then imagine that as a native feature of Twitter, where when you share a Twitter URL, the OG image that is generates, it looks very beautiful like this. What it could do is when that request comes into CDN, CDN does not have the data, it goes to backend. Twitter's API server would generate that image on the fly using that same template or using the templatized version of it. It captures the tweet, puts it in it, nicely formats it and sends it to the response.

[00:24:37] Right, cache on the CDNs up to the user. Twitter can build this [unclear: "as a name"], so when you share your Twitter link it can automatically render your tweet in a very nice looking image as a social, in a very social image, right? And that's very powerful when it comes to experience, when it comes to designing great user experience, because user sees personalized things, user sees something which is very recent. It just does not see, ah, this is static rep of GitHub and something something, where it is like what's the current likes and shares and comments and retweets and reposts and all those things that matter, right there in the image which is shared.

[00:25:17] And you can literally build this in hardly one hour. Hardly one hour. [unclear: "We lost"] a local prototype. Highly recommend you to do this. Highly, highly, highly recommend you to do this. It's not difficult. Install Python. I've worked with Python for in order to build this. Java also might have something or whatever language you're using would have something. But pick a library that helps you generate images on the fly. Typically PIL, Python image library is the best out there. It internally uses ImageMagick. It has a C++ binding to that. But it just gives you native Python interface to create images on the fly. And just do it. Expose an API endpoint that does this. You can generate the same thing for any GitHub repo in the world. This exact same thing. Just make a call to GitHub. That information out, create image on the fly and serve it via your local host.

[00:26:10] You learn so much from doing that. And this is how images are actually like these sort of dynamic images are generated and so giving user a great experience. Earlier, if you remember, when you shared images, GitHub used to render a very pathetic avatar of that user. So if I shared images, so my ugly image would just come there on the screen, big flashy image. That's a very, that was a very poor experience. So GitHub implemented this to make a sharing of repositories on social media very pleasant, right? And through this you could see that how whatever we discussed up until now, whatever we discuss across these many weeks, every single thing you can see it in production used by some of the other companies.

[00:27:05] Nothing is theoretical as I always say. You can prototype literally every single thing we discuss. There is no such thing that I need 50,000 servers to do that. No, you don't. You can, you just want your local machine, spin it up and try it out. Right. Nothing beats practical structure. Right. Okay.

## [00:27:22] Designing Gravatar

[00:27:22] Given we have built enough context on this. Talk about Gravatar. Now this becomes an easy problem. After this, after we design, after we discuss this, we'll take questions. Okay. So what is Gravatar? So Gravatar is a very interesting concept. On Gravatar, what happens is you would have seen that on some websites, even though you do not sign up with your Twitter or Gmail or Microsoft or whatever account you are using, it is still able to render your image somehow. And which is where Gravatar comes in. You might have logged into Gravatar in order to enable that. But the idea of Gravatar is pretty neat. So what Gravatar does is it creates your single embeddable URL for your profile picture.

[00:28:12] For example, if let's say your email ID, let's say my email ID is rp.gmail.com. Let's say it is arpit.gmail.com. So what I could do is I could go to gravatar.com, login me arpit.gmail.com and I can upload a bunch of profile pictures there. I can mark one of them as active. Right. Now my URL, what it would generate, it would not generate. It's basically very simple. It's an MD5 hash of my email ID. So it pretty much is constant. Pretty much it is definitely constant. Hashing. If you pass the value, [unclear: "I repeat, I direct gmail.com"] to the same hash function, you get the same output always. So it's gravatar.com slash hash of my email ID.

[00:28:56] So when I go to this URL, this URL actually renders my current profile photo, which I can literally put in any IMG tag, something like this. So https colon slash gravatar.com slash... Let's say this is the hash of my email ID. I think it's something like, this is something very similar to this. So, https colon slash slash gravatar dot com slash zero EAFD 172. When this is put in IMG SRC, it actually renders the image in the browser. It's not that this takes me to somewhere and that renders the email. This is actually returning the image as bytes over here. What we just looked at when we are [unclear: "reading from a message and survey data"], similar. It is literally this single URL to render your profile photo.

[00:29:51] Now what happens is, let's say every company in the world adopts it, which means that whenever you sign up on any platform or any social platform of the world, what you get is, what they could do is they have your email ID. They can pass that email ID to the hash function and use this to render your profile photo wherever they want to. So in the post and the profile page and wherever, they could just use this one URL to render it. Right? If every company starts supporting this, now what would happen? If tomorrow you want to change your profile photo, you don't have to go and upload on every social platform. What you can do is you can just go to gravatar.com, upload your new photo, mark that other one is active. When you mark that other one is active, the next request comes in for this URL. Go to Gravatar backend. It will find that other photo is active. Pick that up, send it out. Everywhere your profile photo is changed without any social network have to do anything. You don't have to go to any website and do that.

[00:30:54] But they don't obviously do that. But it's a very novel concept. What we'll do today is we'll build this [unclear: "very safe"]. What we want to do is support this efficiently. We are building around gravatar.com. It's a really simple system that you can very well build in three or four hours. Not really, [unclear: "good scan is"] difficult, building a prototype is not. So that's why I recommend build prototypes as many as you can, right?

### [~00:31:17] Gravatar requirements

[~00:31:17] So what are our requirements? Our requirements from Gravatar, what we are designing, is: first, user can upload multiple pictures on Gravatar; second, user can mark one of them as active; the one which is active, whenever the API is requested, when one of them is active, it returns the active one in the response. This is what we have, right? So let's kick off our brainstorming, then let's see how we should approach this problem. I want, and given that we built so much of context, let's directly kick off [unclear: "grades"]. How would you start? How would you approach this problem? Raise your hands or [unclear: "pull you in"].

### [00:32:08] Gravatar database schema

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

<!-- chunk_04 00:35:15-00:45:56 -->

**[00:35:15] Student 2:** The parts of the images, photos.

**[00:35:19] Teacher:** Do we really need to do that? Recall yesterday's discussion. Can you not derive it?

**[00:35:25] Student 2:** You can. Right. But there would be multiple. I did think of the yesterday's discussion, but there would be multiple photos.

**[00:35:33] Teacher:** So there would be multiple rows over here. What's the problem with it? And obviously you need to [?store | asr: "start"] multiple photos, right? Because user can upload multiple pictures on it and mark one of them as active. So you need to render all of them. Let's say you uploaded 10 photos. You need to render 10 photos. So all the photos uploaded by the user will go over here. Right? ID, user ID. And what else would you store? The photo, which is active.

**[00:36:04] Student 9:** Okay.

**[00:36:04] Teacher:** So let's call it is active. Anything else?

**[00:36:10] Student 9:** I think that's it.

### [00:36:12] Queries - all photos of a user, hash column

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

### [00:44:56] Marking a photo as active - update query in a transaction

[00:44:56] So we talked about rendering all the photos of a person. Now let's talk about marking someone or marking a photo as active. Sunil, what would be the query to mark a particular photo as active?

**[00:45:09] Student 1 (Sunil):** So in photos table, we can keep like no, [?is active | asr: "is that two"] column is already there, right? So we can keep like no flag true or false.

**[~00:45:18] Teacher:** Okay. So that's okay. That's a boolean. So what would your query look like?

**[~00:45:24] Student 1:** Oh, okay. So this is just to pull only active photo, right? That's your

**[00:45:29] Teacher:** It's marking a photo as active marking.

**[00:45:33] Student 1:** Yeah. Okay. Then it's an update query. Update photos. Set is active equal to true where user ID equal to.

<!-- chunk_05 00:45:56-00:56:51 -->

**[00:45:56] Student 1:** And photo ID also we have to pass, where, on which photo, like, no, user click to make it active.

**[00:46:01] Teacher:** That is also, do you really need? Because if ID is the primary, do you need to pass user ID over here? No, not required. Okay, not, so you're passing this, okay, yes. What's the disadvantage of this query? What could go wrong? You were asking me, you gave this query. What could go wrong over here? See, this is what I love. This is such a simple query. You could see what's wrong in this query. There is a big problem in this way, a big problem. So they'll try to spot that.

**[00:46:51] Student 1:** Okay. So if you give user ID also, then the scan will be like, no, less on the table.

**[00:46:58] Teacher:** No, ID is primary key, scan would anyway be [?log n | asr: "login"]. So that's very efficient anyways. Okay.

[00:47:12] Three line query, one of the most simplest query that you could write, almost hello world. And that is where like need to think about all this stuff and we implement. And this is one aspect that almost every engineer, everyone seen it, which you should not never. Let me pull in Jyothi. Jyothi, go on. What's wrong in this query?

**[00:47:37] Student 5 (Jyothi):** So you don't mark the previously active image as inactive. That is, I think, one issue. Okay.

**[00:47:42] Teacher:** So how do you do that? So let's start with that. That's a good point. You're not marking the other previous one as active. So what's your query now?

**[00:47:50] Student 5:** So a very simple, I think naive way would be just to like, get the currently active thing and mark it as inactive, or just do something like that. But I feel that is like adding.

**[00:48:04] Teacher:** Getting active, marking that as inactive and marking others active. Yes. Can you simplify it?

**[00:48:11] Student 5:** I mean, I can think of sort of like a hack to do this. Just have a counter, sort of like a counter, or like the update, I like some, just stay with me for a minute, just have like a counter on the photo with on each row and increment, in, no, that's not possible.

**[00:48:36] Teacher:** Try writing an update query for that in order to mark the current one, the current active one as inactive.

**[~00:48:40] Student 5:** Yeah, yeah, initially I was thinking it might be possible to do it in one query, but I'm not sure if I'm able to get that right now. It would not be, that's not possible. So yeah, you, you'll probably want to make, like, I think the, the, the naive approach would be to have three queries then.

**[00:49:04] Teacher:** Why three?

**[00:49:06] Student 5:** You, okay. Actually you can do two queries. You can just mark all as false and then mark one as true.

**[00:49:12] Teacher:** Like, correct.

**[00:49:14] Student 5:** Yeah. So two queries.

**[00:49:15] Teacher:** What's wrong in this? So we did exactly what you said. We marked all of them as false and then we marked one as true. What can go wrong? Shreya [check: name spelling - "Shriya" at 00:51:39], what can go wrong?

**[00:49:44] Student 7 (Shriya):** I mean, I had a solution that we shouldn't mark everything as false. Just add "and" in the where clause and say is active is true. So it will only pick up the row which is currently active.

**[00:49:56] Teacher:** Okay, so you are saying [?where | asr: "bad"] user ID is this and is active is true. Okay, what is wrong in this?

**[00:50:07] Student?:** What could go wrong in this?

**[00:50:19] Teacher:** It seems obvious, but I want all of you to basically explicitly tell that.

**[00:50:27] Student 7:** I mean, the other query should, should basically run only when the first one is completed. Correct.

**[00:50:34] Teacher:** Correct. Correct. So what do you do?

**[00:50:38] Student 7:** So, there's a dependency. So basically what we can do is when we get a response from the first query that this has been executed, then you send another, or we can make it as a transaction, something like that.

**[00:50:54] Teacher:** Transaction.

**[00:50:55] Student 7:** Yeah.

**[00:50:57] Teacher:** It sounds obvious, but we don't call it out explicitly. And that's the problem, because what if you update this and your process crashed, then every photo is marked as active and you don't have any active photo. Facebook is trying to render a profile photo and there is 404 not found coming up. So this needs to explicitly be wrapped in a transaction. Very simple thing, but people skip it. We should be very focused on every intricate detail, especially in the simple systems, because it seems very obvious, but it is not. Okay. Thanks, Shriya, for spelling our transactions for that.

[00:51:44] Chandan, what's wrong in this? What can go wrong? Now we also had a transaction.

**[00:51:54] Student 2 (Chandan):** Once we have added transaction, it becomes atomic in nature, right? So I don't see that we will fail in concurrent request. So if you don't.

**[00:52:10] Teacher:** So concurrency taken care of, what other factors can go wrong? Look at the query very carefully, very carefully, especially the second query. That's a hint. This is the simplest update query. I could have written, what's wrong with this. There is a big problem in this way. Big problem.

**[00:52:52] Student 2:** I'm not able to.

**[00:52:54] Teacher:** That's right. That's right. See, it's very hard to spot, because you see, it's like literally wrote one print tab and you say why my program is not running. It's literally that, it's literally that, like figuring out what's wrong with this. Okay. Yes Priyanka. What could go wrong in the second query?

**[~00:53:12] Student 7 (Priyanka):** So in the first query we said, you know, we are setting the active flag to true. Whatever is existing active, we are already setting it to a false. Yes. And so now we have to set another one to [?true | asr: "two"], but again, you have to figure out which photo ID is that you have

**[00:53:33] Teacher:** your, you are already passing it. That's fine. But what is missing over here? There's a big piece missing over here.

**[00:53:44] Student 7:** User ID.

**[00:53:46] Teacher:** Why? If you have the photo ID, why do you need to pass user ID? Photo ID is the primary. This is the primary key.

**[00:53:54] Student 7:** Okay. Yeah.

**[00:54:02] Teacher:** I'll move to Mohit. Mohit, go on.

**[00:54:05] Student 4 (Mohit):** Yeah, I think user ID is required because a user should be allowed to change only his or her photos, not everyone.

**[00:54:12] Teacher:** Brilliant. This is why. You need this. You need this. Imagine someone from the front end passing a very random photo ID. If you don't have this check, you are marking someone else's photo as active. You are upgrading your own photos as inactive, but someone else's photos active. So your photo is still an active, like you're like, basically none of the photos active, but you're marking someone else's another photo is active. So creates a problem. So you should be, you as a user should be allowed to update or mark a photo as active only yours, only your photos active, not someone else's. Security. Correctness of the system.

[00:54:55] It seems, and this is why I love covering this problem segment, because this tells you that when you think of implementation, how a very simple use case, really simple use case, has so many hidden intricacies. This is what makes you a better engine. Going into these details, like understanding why do we need a certain field, a certain attribute, ensuring correctness of the system in all cases, that in all possible cases.

[00:55:27] Now with this wrapped in a transaction, with this thing in place, with having to store redundant value over here, we are ensuring our system is efficient and correct. No matter what. It's such a simple use case, but I just wanted to highlight that part through this design. That it seems very simple at first. When you go into those details, you realize something's fishy. Great. Okay.

[00:55:57] One more thing. See, that's why it's, it's, this is exactly like code reviews. When you write five lines of code, you'll get 50 comments. When you write 500 lines of code, you'll get looks good to me. Same thing. When you have a simple system at hand, that's where people would try to basically nitpick every single thing. Okay.

### [00:56:15] Minor optimization - query to pick the active photo of a user

[00:56:15] There is one small minor, very minor optimization that you can do, very minor. Can anyone spot it? Very minor. Like it's literally insignificant, but still if you do it, it's slightly better. Hey, man.

**[00:56:36] Student 1:** Actually, I'm not able to say, let me see it, but I have another question also. And that's no question after a question.

**[00:56:43] Teacher:** Let's follow that optimization. More than happy to take questions.

<!-- chunk_06 00:56:51-01:08:10 -->

> **Student Question [00:56:51] - Student 1:** Any hint for, are you talking about the first part of query? Okay.

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

### [01:03:48] Is active in photos table vs active photo ID in users table

[01:03:48] So there are two designs. Either you store it as active in the photos table or you store active photo ID in the users table, right? This is what happens is your most frequent query in your system does not have to go and join two tables. It is literally a primary key lookup. As simple as that. And now when you are marking a photo as active, you don't need to mark others as inactive, current one as active. You can simply do this. And it just simplifies your entire thing.

[01:04:20] But it is very counterintuitive because you think is active is a property of photo, not a user. This is another thing that I want to always bring out, that we typically think like whenever we are doing class design or rather low level design, the basic class design, or when we are designing schema of it, we tend to think in terms of attributes of a particular entity. Think in a normal human way, you think that is active is property of photos, which is where in most cases we typically read is active in photos table. But it again, as I said, extreme nitpicking, but if you think a little out of the box, you realize that if you store active photo ID over here, it just oversimplifies it because now we don't need this. Now we don't need this. All you need is this with that, with those two additional checks. Right?

[01:05:18] Update or marking a photos active becomes just single query. No need to have two or three queries put in a transaction at all. If you have auto commit, a single query is a transaction in itself. That would solve it. Single query would do the job. This query becomes really simple because all you are doing is just doing a normal select over your select star from users where ID is equal to this. You get a user ID, you get photo ID, you can create S3 path, read the image, serve it to the user, and you're just oversimplifying a lot of stuff. A little counter-intuitive, but it works, right?

[01:05:53] So I am purely highlighting these points purely from the perspective that what seems very simple, it's not as simple as it seems when you go into those details. When you go into those details, a lot of things can be challenged. There is no one way to build the system, right? Or is active as a property of photo to being a property of user, which is showing the is active or active photo ID. Right. We are taking away, we just chopped up the complexities of the system by doing this. But instead of directly jumping to this, we went because it's a natural progression. It is 15th cohort [unclear: "of bike"] in every single cohort. Since the time when I started taking this question, every single cohort, people start with is active over here because we are trained to do so. We are trained to think in a certain way, but that might not be the most optimal. And I'm not saying this is like, that is like my approach is like humongously more optimal. I'm just proving you folks into thinking that, hey, some other solution, which might be a little more optimized can exist, right? So always be handy in challenging your own beliefs, unlearn, relearn and become a better, right?

[01:07:10] Okay, so these are the key things that I wanted to cover. Let me formally cover it before we take questions. And it's already one or 10 minutes that we didn't cover on-demand image optimization yet. Okay, nothing to worry about. We have enough.

> **Student Question [01:07:24] - Student 9:** I have one question to this. Wait, wait, wait.

**[01:07:25] Teacher:** We'll come back, we'll come back, we'll come back, right? Okay.

## [01:07:29] Gravatar architecture - photo upload service and CDN

[01:07:29] So for our gravatar.com, given that we dive very deep into the SQL query side of things, how we think about performance, how we think about architecting, like, think about other implementation details. Let's talk about how will you design it in general? So we take the photo upload service that we designed yesterday, plug and play as it over here. No changes at all. Like your photo upload service, pre-signed URL and whatnot remains as is. Right. But now when user is publishing the photo, you just make an entry into the photos table that we just designed. Right. That's how your photos upload would work. Then when you are, when user puts that even here, usually.

<!-- chunk_07 01:08:10-01:19:14 -->

**[01:08:10] Teacher:** User ID, is active as true. Schema, users, you store email and the hash. Storing derived value, contrary to what we studied yesterday, here we are storing the derived value because it makes index look up faster, right? That's why we are doing it.

### [01:08:25] Serving Gravatar photos via CDN

[01:08:25] Rendering the photo is really simple. Whatever you have now here, just walking you through the actual thing, because now we do not want to serve photos from our backend servers. We want to [?serve via | asr: "survey a"] CDN. Imagine at the scale of Facebook, at the scale of Instagram, if they start using Gravatar, right? They're doing millions and millions and millions of hits coming in. If that's the case, then how will you handle the traffic, right? All so much of traffic coming to our backend servers, which in turn gets pushed onto S3, that would create chaos. Your AWS will go to shoot up. So what do you do? You have to use CDN for that to give a better user experience.

[01:09:07] So now what we are doing is we are writing api.gravatar.com and then we put everything behind the CDN. So now observe this, how CDN comes into the picture, making things efficient. So we expose an API endpoint called api.gravatar.com slash photo slash hash. Whatever the hash we provide over here, we get the active photo. We read the file from S3 and we return the response. Standard procedure. So we derive the S3 path on the fly because we know the user ID and we know the photos ID. We take that and we generate this path and we send it over here. Sorry, basically whenever they do that, it would fetch the photo from S3 and send it. This way the photo is entered.

[01:09:48] But now what we have to do is we want CDN to serve the photos. So what we do is we configure a CDN and in CDN configuration, we create a property called gravatar.com. Behind the CDN collection gravatar.com. Gravatar.com points to this as my origin. api.gravatar.com slash photos. Because what we implemented just as the API endpoint which serves the photo reading from [?S3 | asr: "a stream"] and serving it back looks something like this. api.gravatar.com slash photos slash hash. So what we do is we configure gravatar.com and origin to that is api.gravatar.com slash photos.

[01:10:34] So which means that now when the request for gravatar.com slash hash comes in, this request would go where? CDN. Because in CDN we configured, like how I configured [?edge.arpitbhayani.me | asr: "edge.arpeedbhany.me"]. Here I'm giving gravatar.com as my CDN property directly. My root domain itself is my property on CDN. So this way when I make a request like this, gravatar.com slash hash, the request will go to CDN. If CDN has the data, it would serve it. If it does not have the data, it would go to origin. What's the origin? api.gravatar.com. So what it would do? It would do api.gravatar.com. Which is exactly what we have handled up until now. Because this is what we have handled, it would return the photo. It would go to S3, read the photo, send it to the CDN. CDN will cache it and serve to the user. The subsequent request would be all served from the CDN.

[01:11:32] So now this is what our flow would look like. A very basic flow, nothing super complicated about it. So we have a standard photo upload service. You upload a photo using pre-signed URL on S3. Once that is done, you make a call to API server and add a photo over here, which registers it in your MySQL server. Pick your favorite database. That's fine.

### [01:11:52] CDN invalidation on photo update - Kafka, consumers

[01:11:52] Now, when the photo is published, or let's say when a photo is marked updated, what we do? We update it in the DB and push an event to Kafka. Right, now why Kafka? Because we want to invalidate the cache, because your CDN, where you configure gravatar.com to api.gravatar.com. Let's say user B, user 2 opened a profile of user 1 and it rendered photo, something like this, this URL, it rendered this photo. This request is served via CDN to all the users out there. Right. But now when you as user 1 updated your photo, you want it to be updated right. So what do you do? In order to do this, you have to invalidate the CDN cache. So because photos don't change that often, you might have a TTL of let's say one day or two day or something like that. But now because you change it, as to give a good user experience, you want to invalidate that photo right there and then, so that the new photo is rendered.

[01:12:47] So what you do? When the photo is updated, you push an event to Kafka, the photo updated, it goes to a bunch of consumers whose job is to invalidate the CDN. That's it. By these workers, they make API call to CDN. CDN gives you those API so invalidate a particular path. So you would invalidate a path slash h1 from here, so that file is deleted from CDN. Next request that comes in, CDN does not have the file, it would go where? It would go to the API server. API server will talk to DB, get the S3 path. API server will go to S3, read the file and send it to CDN. CDN will cache that file and serve it to the user. Subsequent request will just serve from the CDN.

[01:13:29] And this is how you can efficiently serve photos at scale. And this is how you can design your own Gravatar. Really simple, but covering those details is the key. How we leverage CDN, how we leverage database transactions, how we evolved our database schema over time, asking those critical questions, how we thought about security and correctness of the data, no matter what. These are the details that I want all of you to remember, no matter what. It's a very simple system, but these details make it very interesting. Right. Okay.

## [01:14:03] Questions - transaction fallback, CDN mapping, hashing

[01:14:03] Any question on this? We'll take for five minutes question and then we have covered on demand image optimization, then we take some more questions and then we go on a break. Okay. Go on, Heman [check: name spelling].

**[01:14:13] Student 1:** Yeah.

> **Student Question [01:14:14] - Student 1:** Can you please go back to the screen where we have written the transaction three queries? Hmm. Hmm. Yeah. So when we were writing the transaction before we added this query, there was the second query, which says [?where | asr: "their"] ID equal to something for which we have to get the photo. I was thinking at that time, if let's say somebody passes a wrong photo ID.

**[01:14:43] Teacher (answer):** So that's why we have this user ID to prevent that, right? So no rows update, it would happen.

**[01:14:48] Student 1:** That's okay. That user ID came a bit late when we start initially thinking, and then we added this. So let's say the user ID is not there. I'm just talking about maybe a bit general problem. I'm writing in a transaction some query and here I'm passing one parameter, which has to be used to find the identifier row. Now, due to any reason, it may be by mistake or something, I passed the wrong value. Now that inside the transaction one query is not successfully handled. Should we worry about writing something as a fallback here inside the transaction? Or should we leave it? What should be the right practice?

**[01:15:28] Teacher (answer):** Ideally, if you were expecting something to be updated, but it was not. So let's say a general behavior is something gets updated, but you saw that nothing got updated. That is an alarm for you. In most cases, in most cases, which means that there might be a bug in the front end, because here what you said is correct. In that case, if let's say this does not match anything, what would happen for that user? All the rows are false. Like another photo is active, right? And this does not make anything active.

**[01:15:59] Student 1:** Yes. That's a problem.

**[01:16:00] Teacher:** That's a, that's a 404. That's a 404 for user. Correct. So if that is your intended behavior, then no matter what, a user should have exactly one row as active. Exactly one row as active. If that is what your need is, then you have to have that check in this transaction that at least one is active or not. If this does not change anything, then you don't do anything. Statement, or you first do selects and ensure that everything is there. And then you do update either. So what you can do is you can select it. This, this user have at least one photo is active. [unclear: "It with Matt meets that day"], you update an update that would solve your problem. Right. So the photo and this user, so you first do a get off the same thing. Select is active true. Sorry. Select is active false. [unclear: "That use"] where photo ID is this and user ID is this. If that row exists, then only you do [?these two | asr: "this to them"]. Otherwise you don't.

**[01:17:03] Student 1:** Okay, because that's normally a requirement that you should have one active ID. Yeah. And if we are not taking care of this thing, then I mean, it will be too late when you got to know that client is going to be taking care of at the first place itself.

**[01:17:22] Teacher:** So it is always better to just validate that whatever changes that you are doing will not let your data go in inconsistent state. So you first check and then you do these two.

**[01:17:32] Student 1:** Yeah, maybe there only we can say if the row, zero rows return, then application logic take care of saying that ID was not one at all, not find active one. But I mean, the logic has to be divided in two parts. Checking the result is coming as zero row, so we have application layer. And this transaction not going through, I mean, rollbacking itself should be taking care itself here. I think that's all. Yes, yes, yeah.

> **Student Question [~01:17:56] - Student 5:** Could you explain the CDN mapping that we were doing there?

**[~01:18:03] Teacher (answer):** Because like we did yesterday, right? We saw yesterday how that CDN is mapped. That same thing, what we are doing is we're configuring a CDN, yeah, and the specific property is gravatar.com, like how I specified [?edge.arpitbhayani.me | asr: "edge.arkipani.me"]. So any request for [?edge.arpitbhayani.me | asr: "edge.arkipani.me"] goes to CDN. Correct? Here, any request to gravatar.com goes where? To CDN. API.com. [check: "API.com." may be a student's answer - teacher replies "No, no."]

**[01:18:25] Student 5:** Yeah.

**[01:18:26] Teacher:** No, no. So it goes to CDN and CDN's origin is configured to API to gravatar.com. So if it does not have it, what it is doing, it's going to API. And because only API server knows here. One common question that ask is why CDN not pointing to S3 directly? Because S3 is not public. Only my database knows which photo is active. S3 doesn't know which photo is active. Right? Only database is a source of truth for it to know which photo is active. So which is why what we have to do is CDN falls back to [?api.gravatar.com | asr: "apatradar.com"], reads the database, find active photo, goes to S3, gets the image and sends it to the [?CDN | asr: "CD"].

**[01:19:02] Student 5:** Right. Makes sense. I was sort of confused. Like I was taking it in the reverse order, the mapping that was there. Okay.

**[01:19:10] Teacher:** DK.

<!-- chunk_08 01:19:14-01:31:54 -->

### [01:19:14] Runtime hashing, join criteria, predicate pushdown

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

### [01:22:15] CDN cache invalidation on image update

> **Student Question [01:22:15] - Student 2:** Got it. And second question would be, so in the CDN, if you can go to the CDN diagram, there, how you are invalidating the cache when the image is updating?

**[01:22:26] Teacher (answer):** By making an API call to CDN. So CDN has APIs exposed. Cloudflare, Akamai, every CDN has APIs exposed to invalidate the cache.

**[01:22:36] Student 2:** Got it. So whenever the new image is uploaded, you are invalidating the cache directly by calling the CDN.

**[01:22:42] Teacher:** Correct. Synchronous. Yes.

**[01:22:45] Student 2:** It's like when user is, so we are not depending on the TTL here. We are just invalidating the cache beforehand.

**[01:22:52] Teacher:** Because user experience really matters over here that when the photo is changed, I want to immediately see the uploaded photo everywhere.

**[01:23:00] Student 4:** Got it. Got it. That's right.

**[01:23:01] Student?:** Thank you.

**[01:23:02] Teacher:** For richer user experience. Chandran Anubha [check: name spelling], I'll take your question in some time.

## [01:23:08] On-demand image optimization

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

### [01:30:43] Questions - active photo ID query, Boolean vs enum, membership table

[01:30:43] Any questions in general around anything that we covered from 9 a.m. to 10.30 a.m.? We'll take questions for five minutes and then we go on a break. You had a question.

> **Student Question [01:30:56] - Student 5:** Here. Can you please go back to the page where we had those three update statements in a transaction? And we did an optimization with active photo ID. So my verification is that the new query after this active photo ID optimization, we get the active photo. So it should be select star from users where hash is equal to hash of email, right?

**[01:31:22] Teacher (answer):** Yeah, so that's the exact. So let me do that. Update users set active photo ID equal to something where hash is equal to something. Yes.

**[01:31:47] Student 5:** Yeah. What I wanted to clarify. Thank you.

<!-- chunk_09 01:31:54-01:43:08 -->

> **Student Question [01:31:54] - Student 4:** Yeah, I just wanted to check like whenever we have like requirements like this, should we have like Boolean variables like is active or should we generally store them as a type and enum as active because that gives us like more flexibility in terms of, you know, changing if something comes up in the future, right?

**[01:32:15] Teacher (answer):** So long as you're doing it with tiny int it's fine. So 8 byte integer if you are taking because Boolean anyway takes 8 bytes to store the data. And 8 bytes is 1 byte, 8 bits, 8 bits, I wanted to say 8 bits. So you can go for enum and integer based enum that does it for you. There's also fine. And that gives you, as you said, that gives you flexibility on the fact that you can then add one more state. So active and active, you can add a third state if you want to. So that gives you that flexibility. But just go with a tiny int rather than a big one. Don't store string as is in the database.

**[01:32:54] Student?:** Yeah. Thanks.

**[01:32:56] Teacher:** Harsh.

> **Student Question [01:32:58] - Student 8 (Harsh):** I was just thinking, should we improve this third update statements with some join on the other table that, that at least that ID is correct.

**[01:33:09] Teacher (answer):** Yeah. Those, those checks are there. Like I have to rewrite a lot of stuff there. Right. But you can check that if that photo is there or not and those parts. So you can do a get and then set. So get an update, you can check in that part.

**[01:33:23] Student 8:** Yeah, I wanted to check that photo ID belong to this.

**[01:33:27] Teacher:** Yeah, 100% you should do that. Like if we take care of security over here and we lapse over here, that would not work, right? But then it would have required me to write a lot of queries again and again. But you get the gist, right? I'm so happy that you folks are thinking on those lines. But think on those granular details, right? We first do get and check and then update in any case.

**[01:33:48] Student 8:** Right. Okay. Yeah.

**[01:33:50] Teacher:** [unclear: "Chalda."]

> **Student Question [01:33:52] - Student 2:** Hi, so it's like, my question is, related to this schema as well as, real text messaging. We discussed in Slack, right? So we had the user table and we had a channel table, but there we didn't make any foreign key primary key. We created a relationship membership table.

**[01:34:15] Student?:** Membership table, yeah.

**[01:34:16] Student 2:** Right. But here we didn't go with that concept. Is it because of one-to-one and one-to-many concept?

**[01:34:23] Teacher (answer):** Brilliant. You gave the answer. But here also it's one-to-many. But there we were storing other details as well on that. In case of membership, you could store last checkpoint up until this you write a message, this channel is marked as star for a particular user. Here you don't have that complex of a user. That's fine.

**[01:34:50] Student 9:** Thank you. Yeah.

## [01:34:52] Break *(admin)*

**[01:34:52] Teacher:** *(admin)* Gaurav, I'll take a question at the end. It's 10.35. We'll take a quick break. We'll take a break for five minutes. We'll come back at 10.41 and then we'll have discussion around tagged people in photos. And we'll wear a different hat. [unclear: "install one"] requirements. We will not design system. Designing system is easy. This system is very easy. What I want to highlight through this system is how this simple system affects so many other systems, right? Because as senior engineers, we should be thrown into, we are thrown into situations where we are not just responsible for building this one system today, but rather seeing how it affects, how it interacts with other system, how it could affect other systems and all. So we'll be wearing that hat to understand how this simple thing and obviously we'll go to the implementation details of it a bit but more importantly understanding like thinking around the requirements itself will be the part of this, right? And then we cover newly unread message indicator post that, right? See you folks in five minutes at 10 41, we resume our discussion on tagging people. Thanks folks.

[break ~01:35:57-01:40:40]

## [01:40:40] Tagging people in photos

**[01:40:40] Teacher:** Let's start with the second for today and we'll discuss tagging in photos, right? So let's say what typically happens in a startup. One day someone from the [unclear: "senior environment sub"] typically a CXO comes to you and says, hey, let's build, let's allow people to tag people in photos. That's all, that's your product briefing. You have to go ahead and implement, right? So now a senior engineer, you need to think of senior management has not thought of. Unfortunately, that's true. More common than you think. So now it's your responsibility because they trust your instinct. They just give you a problem statement. Now you have to figure out what all things to do. It's not just high level. High level is still easy. It's more about understanding how it fits into the scheme of things, how it fits into that entire puzzle of yours.

### [01:41:39] Senior engineer wears three hats - requirements

[01:41:39] So now what we do is we think around requirements. We will not talk about solution. Not talk about solution at all. We will talk about the requirements of them. Wear the hat of a product manager. As an engineer, you have to. As senior engineer, so I always say this. I will also repeat it next week. Next to next week. The senior engineer wears three hats. It does not really wear one hat of each. Senior engineer always wears three hats. First is a hat of a product manager. Requirements, things that others have not thought about, bringing in that clarity. Second is a hat of an architect where you're supposed to architect a system considering extensibility of it in the future. And third, the hat of an engineer, which goes into those low level nitty gritty details of it and ensures that it is optimal across all the layers. And this is what makes a good synergy.

[01:42:34] You have to wear three hats. Today will [?wear the first hat | asr: "bear the first hand"] around thinking around requirements where we are just given a briefing, a one-line briefing of the statement. Hey, let's allow people to tag people in for this. Okay. What questions would you ask not to manager but to yourself, to your team or how would you brainstorm about it? Raise your hands. I'll pull you in. One question, one person and then we move to the next one. Okay.

<!-- chunk_10 01:43:08-01:56:24 -->

**[01:43:08] Student 1:** Yeah, maybe the first question I will try to figure it out. What should be the schema of storing tags?

**[01:43:19] Teacher:** Nothing around engineering. Nothing around engineering. Don't think on engineering at all. Because all you are given is this one line briefing. Just one line briefing. Allow people to tag other people in photos. That's it. Think on the product side here.

**[01:43:37] Student 1:** Okay. Then maybe the most important thing will be around who can tag and is there a way that I can mark tagging to be correct? Who can tag is one thing.

**[01:43:54] Teacher:** No, who can tag? So what is the significance of who can tag? What would it allow? What would it enable you to do?

**[01:44:05] Student 1:** That I'm the owner of, let's say, a photo, then only I can tag. I should, so nobody else can kind of [?tag | asr: "attack"] the wrong thing, wrong people, wrong object or something like this.

**[01:44:19] Teacher:** No, but someone else can tag you or not. That is also important, right?

**[01:44:25] Student 1:** I mean, that that is okay, but we also need to think about if it goes through a check. Let's say [unclear: "some icons and"] not part of, not, not owner of a image and tries to tag somebody in a wrong way, and normally there are repercussions around that. No, no, no, you are not the owner of the image.

**[~01:44:50] Teacher:** Still you are doing, that is different problem, but you are tagging someone else in your photo, that's different. So what you should more focus on is authorization part, where who can tag me in their photo. Obviously that's a check, that you can only tag people in your photos, right? Don't go into the correctness of it. Think about [unclear: "r"] is other person allowing you to tag himself or herself in your photo or not. That is more important. Yes, [unclear: "that's that's amenity"], right? [check: "yes, that's ... right" may be the student's interjection] I know that's [?what you meant | asr: "what you made it"], but you put it in a different way, a different way. Got it. But here it's more important that it should be in your control, that do you want to have this feature dictating who can tag you in their photos. Yes. Right.

[01:45:34] Which means that now you have to have a separate authorization layer, which keeps track of things that, hey, am I allowed to tag? Like who is allowed to tag me in their photos? So you will see this feature day in and day out on Instagram, where you are not, or even on Twitter, where you are not allowed to tag people in their posts, in their photos and whatnot. So that is an important part. Okay. Anubhav, what other part?

### [01:45:59] Max number of people tagged in a photo

**[01:45:59] Student 5 (Anubhav):** Yep. Lot of other considerations around how many people can be tagged in a photo, can they remove their tags themselves or

**[~01:46:06] Teacher:** One, one. Okay, and then I'll, and then I'll circle back you in. That's right, but one, which one would you want to play?

**[~01:46:11] Student 5:** I would prefer how many people can be tagged in a photo.

**[~01:46:17] Teacher:** So you are setting, you're going for the max limit, like the max number of people, max limit of people tag in a photo.

**[01:46:29] Student 5:** Also, whether it is a photo level or at a broader, like maybe at an album level or at a collection level.

**[01:46:37] Teacher:** Photo, photo, let's keep it photo. But how, how would it define your system? What, what would you have? Like what changes can you make depending on this? If, let's say, the max limit is five versus 10 versus 100 versus infinite.

**[01:46:57] Student 5:** Okay. Five, 10, 100, infinite. So we would need some sort of a mechanism to limit the number, and given how, like, who can tag, we would also need to manage a concurrency a bit. So maybe if we have a limit of, a limit of five, we want to concurrently update tags. If I'm updating or if someone else is updating, we also might want to update in your photo.

**[01:47:23] Teacher:** You are the one who are tagging in your photo. Someone else cannot come and tag you, like, tagging your photo. Correct.

**[01:47:29] Student 3:** Okay. Yeah. That makes sense.

**[01:47:32] Teacher:** So concurrency is not a challenge here. But how would this define, what aspect of the system would this determine, the max limit? Let's say, let me simplify. 5 versus 10,000. Let me go to extreme, 5 versus 10,000. How would your system change? If you are, if your max limit is 5, how would the system change? If your max limit is 10,000.

[01:48:12] I'll tell you. If it is just five people, you can go and keep them in an array directly. Right. But if it is 10,000, you would need to have separate entries for them, because you cannot keep that entire thing chunk together in that one document. Like what we discussed yesterday. Right. Yeah. This is what it would affect, because if you're allowing 10,000 people, then your document size grows out to be really big. And then you [?would have to | asr: "won't have to"] do pagination, because no one will give you 10,000 in one shot, unnecessary, because no one's going to going through 10,000 in one shot. So you would have paginated endpoints. So you would not store everything in one document. This is what determines your storage schema. That this max limit of people, like max limit of people who can be tagged in a photo. Right? This is what I want to probe. Right? Every single question that we ask leads to a change, affects or rather should positively influence our design. Right? That's right. Okay. Vikram, one point from your side.

### [01:49:13] Tag notifications - notification team, throttling

**[01:49:13] Student 6 (Vikram):** Yeah. Should we allow to send notifications to the tag?

**[~01:49:15] Teacher:** Great.

**[~01:49:15] Student 6:** If I say yes, then, then, then we should also consider the above point at max limit, that if notification should go to everyone who are tagged, isn't it? [check: "If I say yes, then" may be the teacher]

**[~01:49:32] Teacher:** Yeah. Otherwise, otherwise just imagine someone tagging you in a very shitty photo and you don't even know about it. Right? That should not happen. So what does this mean? That you have to interface with notification team that, hey, we are rolling out this feature. You would see a huge spike on your traffic as soon as people start to use this feature, because it's very likely for people to tag other people in their photos. So get ready to scale up your systems.

**[01:50:04] Student?:** Yeah.

**[01:50:05] Teacher:** Right? Because if they are not ready, if they're not ready with scaling of the systems and you push notifications on their end, the system gets overburdened. Other critical notifications might get affected. So you have to interface with the notification. As senior engineers, you have to interface with the notification team. If it's a yes on sending notification to people, which in most cases would be. You have to interface with the team and say, and just ensure that they're prepared for us to handle, to see a step, to see a rise in the notifications that are being sent.

[01:50:40] This would also lead to the fact that there is a throttling. Now this throttling is different. This is basically product level throttling. So typically people don't love products or the people don't like when apps send them turn off notifications. People hate it. People, good apps only send three notifications a week or five notifications. If someone, if some app is sending you a notification every single day, it's a big turn off. People are very likely to unlock or to basically uninstall your app. So if this is a new type of notification that is sent and let's say you are being tagged. Getting notifications for every single post you are tagged in is a bad user experience.

[01:51:25] So now you also have to talk to the interfacing team, the notifications team that, hey, how are you handling this? Are you having any kind of throttling? If not, let's have that. You need to ensure that you are not bombarding other users with notifications for every photo that they are tagged in. Club them. Do some, like, make product better on that side. Give them a rich notification experience.

**[01:51:49] Student 6:** Yeah. Also happened that, let's say, very famous celebrity posted one photo and other people are tag, tagging [unclear: "the him that just"] you would get lots of notifications.

**[~01:51:56] Teacher:** Correct. Correct. Correct. So all these things, because it is very much possible that a senior management has not thought this through that. They are just saying one line statement to you. Now it's your responsibility to dissect it and go into those details and point them. Right. Okay. What else? Vishal. One point from your side.

**[01:52:23] Student 4 (Vishal):** Yeah. Maybe user level setting, whether anyone can tagging or did that first point, first [check: "did that first point, first" may be the teacher interjecting]

**[01:52:29] Teacher:** Point, [?who can tag | asr: "who can that"].

**[01:52:36] Student 4:** No, I meant like a whether. I am a user, so I should have like a profile, in the like profile settings, whether anyone can tag me or not.

**[01:52:45] Teacher:** Like if I have disabled, that's covered on the first one. Any other.

**[01:52:51] Student 4:** No. Okay.

**[01:52:52] Teacher:** Rahul?

**[01:52:54] Student 4 (Rahul):** Self removal of tag.

**[01:52:57] Teacher?:** Correct.

**[01:52:59] Student 4:** Anyone tag me and I don't want to.

**[01:53:02] Teacher:** In a random photo. Let's say in some obscene photo people tagged you. You should have an option to remove yourself from that. So now this makes authorization really interesting. Because now authorization is not just about who can tag you, but even more [?granular | asr: "calendar"] level, that you, all the photo is of user one, but you are allowed to remove yourself from that photo. A little more complex than we anticipated, but now this requires you to build a very robust authorization layer. Very important feature, right? Thanks for bringing that up. Anubhav, which other feature?

### [01:53:41] Tag suggestions - ML team dependency, SLA, fallback

**[01:53:41] Student 5 (Anubhav):** Yeah, I was thinking from user experience perspective, whether the tagging would be self-driven, tag someone knowing them, or whether we would have suggestions, okay, this photo looks like this person from your friends list, something that Facebook does, I think. So with, for this we will have some recognition and recommendation machine learning systems that provide us these inputs. We would need that.

**[~01:54:05] Teacher:** So now what would this entail, like how would this affect your design and peripheral teams?

**[01:54:14] Student 5:** With my design, I have, with taking inputs from these peripheral teams. Whenever a photo upload event is triggered, I have to get these inputs from the, both for the face recognition and suggestion inputs, from these systems, from the periphery teams, and display them to the user.

**[01:54:36] Teacher:** So, which means that, okay, so then front-end changes for you to display that. And more importantly, when you're displaying them, the response time of that service needs to be slow, should be fast enough. If they are not fast enough, then your user, then sometimes user sees it, sometimes user doesn't, gives user a very poor experience. Yes. So you need to ensure that whenever you are rolling this out, that ML team, ML algorithm, whatever they are running, it's very fast. It maintains a certain SLA.

[01:55:08] So what this brings to the point is notion of SLA, because you have a synchronous, now you have a synchronous dependency on the team, because as soon as user clicked photos, started tagging, you have to immediately show them the suggestions. So given that the ML teams API, which is suggesting you things on the [?image | asr: "email"], they need to have a very strict SLA and they need to adhere to that, because you have a synchronous dependency on that. And now you also need to create a fallback plan. What if that API does not respond in time? What would you do? Will you not allow user to tag or will you allow user to manually tag? It's still a [?product | asr: "protocol"] call, it sounds straightforward, but it's still a product call, because it might be possible in some cases that you don't even allow people to tag unless it's coming from your ML team for some reason, for some reason you want to do that. But it's important to think on those [?sides | asr: "slides"]. Okay. One more point before I cover one other aspect of it. Alok sir, go on. What's that one feature you want, like what things that you'd want to consider?

**[01:56:08] Student 5:** One question, should we update the user's activity page or where the user can see what happened? [check: teacher called "Alok sir" just before; this label answered to "Anubhav" earlier]

**[01:56:16] Teacher:** Profile service activity. Now, how would this affect your system?

<!-- chunk_11 01:56:24-02:09:26 -->

**[01:56:24] Teacher:** If I say yes to this, what does this [unclear: "end"]?

**[01:56:28] Student 5:** We would be maintaining this information somewhere that what happened, what happens to user profile. So we have to actually start pushing this information. They're also asynchronously.

**[01:56:37] Teacher:** Correct. That's fine.

**[01:56:42] Student 5:** And also who can see this activity, but then that is probably the users itself will be

**[01:56:49] Teacher:** will be seeing that activity, that's fine. But now I'll just add to that, what does this affect? This affects one very interesting part, that this, the way you are storing this information, that in this photo these people are tagged, they need to be indexed somehow. You need to store this information in a database where you can, now you should be able to query that. Now you cannot just have just things stored in an array, which is unindexable. You have to store it in a database like the tagging in this photo. These people are tagged in a way that you should be able to query that who all, or rather in which photos is this particular user tagged, which means the database that we pick has to support that query. You just cannot pick any random database here. You need to be very particular about the database that supports this kind of queries very efficiently.

[01:57:46] Very seemingly simple problem statement. But this is what happens typically in startups and mid-scale companies where senior management has not thought it through. But when we start brainstorming on it, when we start diving deep, we realize that it affects so many things, interface with so many other systems. Some honorable mentions are feed. For example, do you want to send or to like, let's say someone tagged Arpit in a photo. Do you want Arpit's follower to get that event right in their feed? If yes, then product call, feed team needs to gear up for that scale, because every time someone tags, you push it into a feed. To happen on feed that you don't show this kind of post every time. Only to few users you show and whatnot. And those kinds of things would come up.

### [~01:58:42] Tag position - relative coordinates, LTRB

[~01:58:42] Now on a bit of mathematical details of it, what I want to bring out is this point that in most cases, when people are tagging in photo, there are two ways to tag it. First is you just say, hey, I just do X and Y. But if you look X and Y of the sort of, of the coordinate where you are tagging it, but rather what if you do X and Y, let's say your image is 720 by 720 pixel. And let's say user tagged at this particular location. Let's say this is 320, 320 comma 120. Right. Now, when you do this, you cannot store 320 comma 120 in the database. Why? Because image resizing. What if on a low end device, the image is 360 cross 360. And then if you tag at this location, X, Y, 320, it would come somewhere over here, which is incorrect. Right?

[01:59:44] So that is where whenever you are tagging, a bit of granular detail is that you have to tag the relative positioning of it rather than the absolute one. And it's a relative positioning. It means that you store, instead of storing 320, 120, you store 320 divided by 720 and 120 divided by 720. This way it's relative, which means no matter how this image is resized, so long as the aspect ratio is maintained, your tag position will be perfect. No matter how small the device is, no matter how large the device is. So storing relative positioning is a very important implementation decision over here. Okay.

[02:00:23] Apart from that, what you stored is, instead of just storing this one point, because in - so you are not just literally, your mouse is not hovered on exactly this point for it to show who is tagged over here. It's typically a bounding box, which means that instead of just storing X, Y relative position of it, you store the X, Y of this point and this point, or X, Y of this and width and height. So these are called bounding box that you would store. So you would store either left top, right bottom, or X, Y, width, height. LTRB is left top and right bottom coordinates of these two points, the relative coordinates. One way to store it. Second way to store it is to store the coordinate of this and relative width and relative height over here. Either way, whatever your front end is more comfortable.

[02:01:16] But these are really important when you are storing this information, because this way you would be able to properly place your mapping. And when mouse is hovered, you show it, even when your screen is like shrinking or growing and you resize and whatnot. Right? Okay. And just using things that you're interfacing with, search, [?face detection | asr: "page detection"], location, notification, role-based access control, RBAC, role-based access control, the authorization that we spoke about. And anything that you're interfacing with, you will put it in Kafka no matter what. So search, notification, analytics, profile, feed, activity and whatnot. Right? So some things that senior management typically has not thought about, we have to think on that behalf and figure those details out, because devil lies in the details. Always remember. Right? Okay.

[~02:02:03] So this is just a quick brainstorming that I wanted to do around this system, because it tells you that a very simple statement, allowing people to tag in photos, leads to so many interesting things out there. And you can extend it in many ways. And it is not that engineer cannot propose product ideas. Engineers can. It's just that about it because we don't have product experience, but we can still pitch in ideas and make them and ask them the critical questions which they typically would not have thought of, very possible. So whenever you're working with product team, whenever you're working on something that is user interfacing, think as an end user, put them, put yourself into their shoes and think and propose. That's how you create a cross-team influence and a positive impact in the organization, leading you to have a good career. Right. Okay.

## [02:02:56] Newly unread message indicator

[02:02:56] Now the final system for today is with design, newly unread indicator. Listen to the problem statement really well. Right. So the problem statement is that you see this day in and day out on LinkedIn, Twitter, Facebook, every, even Instagram, every social platform out there. So it is possible that you are offline. You receive a message and when you log in the next time, you see the counter of it. I think I can show you a demo. Let me quickly check if I received any messages on LinkedIn or Twitter. If yes, I will show it to you. No message on LinkedIn and no message on Twitter. Okay. On Instagram. Do I have a message? Oh yeah, I have messages. I'll show you demo. It would clear out the requirements. Because it's something that we see every day. But we typically take it for granted. Okay.

[02:04:03] So the statement is that this message is three. I don't know when I last checked it. But these three messages that you see. These are three messages. These are not three unread messages. These are three newly unread messages. Because it is possible that now when I click on this, the count becomes zero. It does not mean that I have read the messages. You can still see unread messages over here. Right. It does not mean that I have read the messages. It just means that I am acknowledging that I have messages. This is not behaving the way I wanted to, but you get the idea. This count should reduce to zero. Right.

[02:04:43] So what we are doing is if I would have received any message over here, I can just click on it. Flying taxi. Okay. I have one message, but when I click on it, that count disappears, but you could still see that there are a lot of messages which are unread. Unread messages are there, but this does not mean that here I would say 99 or 10,000 or 50,000. What I'm actually looking at over here is I have so many hundred messages, but count there was zero because these are not acknowledged by me. It's just that the presence of it is gone. So this is newly unread. So you can choose not to read the message, but it indicates that there are new unread messages. This is what we have built. So let me clear out. Now the problem statement is a bit more clear. Let me walk you through the requirements and then we brainstorm. There is a very interesting high level pattern that I want to introduce through the system. Let me share. Okay.

### [02:05:58] Requirements - unique people with unread messages

[02:05:58] So the statement is very simple, that we need to inform the user about presence of new messages. Terminology, like the words that are used very carefully, presence of new messages, not unread, not unacknowledged. So on the message icon, when you see this three, this implies that you have three newly unread messages. It does not mean you have three total unread messages. So you click on this and this counter goes to zero. It does not matter if you read the messages or not. This is what we are building. Now I'm just twisting it, twisting the problem statement, and I just add a pseudo constraint where this three does not indicate that you have three newly unread messages, but it indicates that you have messages from three unique people. Right, so if I say three over here, it means I might have gotten 300 messages, but from three unique people, so I'll show three only. Right, so this is what a requirement is, right? And when someone clicks on the messages, this icon, irrespective the user read all those messages or not, the count would disappear. That's what we have to do. Right? Okay. Requirements: near real-time update, message when received, newly [?unread | asr: "new and reads"] equal to [?the number | asr: "demover"] of unique people from which you received the messages. [unclear: "valuable"] How would you approach this problem? Let's brainstorm.

### [02:07:24] Read flag, last read time, unique users count

**[02:07:24] Teacher?:** Yeah, [unclear: "something"], go on.

**[~02:07:26] Student 3:** So first and foremost, when we say newly, right, I think I would like to say

**[02:07:31] Teacher:** [check: first clause may be Student 3 (diarization lag)] newly means less than 24 hours, that is last time when I clicked on the message icon, since then. Okay.

**[02:07:39] Student 3:** Okay, so then what we need to do is, okay, first, first and foremost, the messages that we are getting, right, we need to have an indication whether they are read or not. That is the first, first indication, just to know how many messages I have read and how many messages have not been read. And then there should be a way in which I can also know when was my last read time, when I last [?tapped | asr: "that"] the message icon. So these are the two indicators, and the third indicator is, once I have that, there should be a kind of a filtering mechanism based on the last read time, so that I can get the number of unique users that have messaged me, and using that I can populate that count on that, on that icon. These are the three aspects that I would focus on. So the first thing would be, so first I want to start with a data model, like the message data model, that is received from the message itself, and the time stamp, because time stamp is very critical here.

**[02:08:49] Teacher:** [check: crosstalk with Student 3] Received, sorry, you have your message, yeah, you have from which user, yeah, and you can also put [?to users | asr: "two users"] that could, yeah, that's that, that's that. [?To users | asr: "two users"] also, let's put. So from and to. Yeah.

**[02:09:08] Student 3:** And a time stamp, and then there should be another data model which would be like last read time. So that is very important for me because I need the count. Last read time.

<!-- chunk_12 02:09:26-02:20:33 -->

**[02:09:26] Student 3:** Now, yeah, so now whenever, so I'm, so I, you want me to talk about how the messages would be read and all that stuff, or that is already everything, everything? So what, so obviously, because this is a messaging thing, right, so there will be a messaging queue and this user will be subscribed to that queue. And based on the number of, and the partitioning would be on the from user, that would, okay, let's

**[02:09:50] Teacher:** Let's go step back. What is the input to the system? Are you storing all the messages that your user received in this table? Am I in this messages table? Are you storing all the messages that a user ever received?

**[02:10:10] Student 3:** I can store. There's no harm in storing, but I think that would not be a scalable solution.

**[02:10:16] Teacher:** Because then what are you storing in this? What is this messages table?

**[02:10:24] Student 3:** Okay. So I was just thinking one snippet of a message, like, you know, one message, one, like, hi, how are you? If I send it to you. So that message unit, I was thinking in that way, how will you store that?

**[02:10:36] Teacher:** How will you figure out what that unit is? What, what, what exactly are you storing? Let's say user B sent a message to user A. Okay. So then this table needs to store either all the messages or part of messages.

**[~02:10:50] Teacher:** are storing over here? That's the question now.

**[~02:10:50] Student 3:** So I would be storing pretty much all the, so this data model, like for, will store all the messages that a user that has sent to me. So for example, it could be like, I have sent hi messages ever. Correct. Yeah. [check: possible teacher interjection - Correct, Yeah] I think there's no harm in that way. Yeah. So this is our messages table. Yeah. Yeah. It is a messaging table. Yes. [check: possible teacher interjection - who says which]

**[02:11:15] Teacher:** So this is all your messages that is shared over here, right? So the text part from this to this and times. Okay. You have that messaging table. So now the scale of this is pretty huge, but that's we'll, we'll, we'll touch upon that later. That's fine. Okay. Now in your other thing, what is your, this data model called, that other one, where you're storing the last read at?

**[02:11:40] Student 3:** This, this can, this is basically for, for me to get the latest message up, right? So this can be a latest message, like some kind of a metadata information.

**[02:11:53] Teacher:** So probably you need to have something substantial over here because you might want to store something more. So let's say right now I'm calling it messages or other, let's, let's just store it in a user activity. It's basically one-on-one mapping with user. So every user will have this one entry over here where you are storing that last read at and other details around it. This is your user activity table. Now what you are doing over here? What's your query to get the unique users count part?

**[02:12:33] Student 3:** Okay. So now the unique user part would be like, you know, select messages, select from messages where timestamp is greater than last read at. So that is okay. And then I need to order them by the, I need to order them.

**[02:12:56] Teacher:** You are not, you don't want to send a message. You just want to render the count. Why order?

**[02:13:01] Student 3:** Yeah, but you want the unique users counter. You don't want the message count. [check: possible teacher interjection] So if I do this way, then I would be getting all the number of messages, right?

**[02:13:09] Teacher:** You're doing select star from messages. Yeah. Where to is equal to your user and timestamp is greater than last read at. Assume join one is there. What is the problem in this query?

**[02:13:30] Student 3:** See, the problem is, for example, I have sent, so this messaging table will store three rows. If I send three messages to you, hi, Arpit, how are you? So I've sent three messages. So three rows, it will store. Now, in the previous requirement, you said you want from unique users, how many users have messaged? Now, if I go with this approach, I would be getting three rows as my input, right? But I don't want three rows as input. I just want one. So basically, I'm mixing. I am accumulating all those three message rows into one. So that's the reason I said,

**[02:14:07] Teacher:** I, how are you doing that? Count count [unclear: "from direct to this now"] count of unique of from, correct. Yes. Select count unique from from messages where to is equal to your ID and. Okay. What's the problem in this?

**[02:14:36] Student 3:** I think the indexing would be the problem because I think we need to index it properly. Otherwise, it's like one of the time-consuming queries because you're pretty much getting all the messages. So what I would do is basically we can index from messages, right? So maybe we can index it using a key that has from and message both, a message, no, not message actually, but maybe from, the from, from the from field I can index it, or no, not even that actually. From timestamp, timestamp would be a good indexing factor because we want all the messages after time this time, right? So yeah, I think we can index it on the timestamp, that's what I'm thinking, just on

**[02:15:28] Teacher:** So it will be like across all users, all data is sorted by timestamp.

**[02:15:37] Student 3:** Yeah, that is what I'm thinking.

**[02:15:39] Teacher:** But this is still an expensive query because if let's say you have received 1000 or rather 10,000 messages for a particular user, you are going through 10,000 rows of your table and then doing a [?unique of it | asr: "unique offer"]. Now imagine doing it every time the page loads. Very expensive. Correct? Yeah. Yes. Very expensive. I am not doubting the correctness of the system. System would work, but at millions of people, there are millions of users currently active on this platform at this very moment, doing this, firing this query is super expensive.

[02:16:15] And FYI, just to clear out, you will create an index on from and timestamp, or composite index on from and timestamp, so that all the entries of a particular from, a particular, sorry, from, to and timestamp, a composite index on this, so for an entry for, and it will be ordered by index on to, from and timestamp in this particular order. So all the entries of to will be clubbed together, then grouped by from and then ordered by timestamp. So this way, when you're sorting, when you're filtering it out, you are directly going to that location where to of your interest starts, within which two timestamp and from two timestamp and from two from timestamp. [check: "two" may be the column "to"]

**[02:17:06] Student 3:** I think it should be to, timestamp and from, right?

**[02:17:09] Teacher:** Because yes.

**[02:17:11] Student 3:** Yeah.

**[02:17:12] Teacher:** Because if you do, then you can very easily cut short. So it will be to, timestamp.

**[02:17:17] Student 3:** Yeah. Yeah.

**[02:17:18] Teacher:** So to, time stamp and from, right. But although it, you are trying to, you know, [unclear: "ounce out"] every single performance from this by rearranging this field, but the worst case is imagine you having to iterate through these many index entries to just get the count of it. Right. And in case, let's say a user, hypothetical example, worst case, 10,000 messages are there. You have to go through 10,000 entries of it and then do a unique entry to answer the count is just one. Right. Let's hypothetically one user sent you 10,000 messages. You're going to 10,000 index entries to eventually figure out that the unique count is just one or two or three or something like that. Right. That is expensive.

**[02:18:01] Student 3:** Yeah. Actually I'm just thinking instead of going messages, we can have another column, or not another column. We can have another table that tells how many messages have been sent. Just a count. Correct. Care what messages are being sent, right? All I care is, are messages being sent.

**[~02:18:14] Teacher:** Correct. So you don't care about the actual messages. So now we are coming to a more efficient implementation of it, right? Okay. So this is a crude way, and this is not an incorrect way. Again I'm saying, this is not an incorrect way, this is a crude way of building things, which gives you, which is not very efficient but very correct. When you fire this, because this message is, again, again, this goes for everyone, this is your source of truth for messages, this is your source of, this is your source of truth to say when you last click the message icon. Doing this will exactly tell you how many people from which you got those messages, exactly. It will be 100 correct no matter what. But the problem is it is just a little, a little, not a little, but rather inefficient. That's the problem. Right. It's just inefficient because do we really need to iterate through all the messages of a user that it received and then figure out, okay, these are the unique ones? Can we do better? Right. Okay.

### [02:19:28] Optimizing the unread count - non-relational store

[02:19:28] Should I continue with Sandy [check: name spelling]? Your hands raised, I'll just do it so that I don't forget. I'll just do it because you, you added some brilliant points there. I just want to pick others' brains and see where we can go with this, right? Yeah, but just basically keep your hands raised. Okay. Rahul, how will you optimize this actually?

**[02:19:51] Student 4 (Rahul):** Like, I will not go with this system. Instead of this, I will try to go with non-relational database

**[02:19:57] Teacher?:** database because like similar query you'll fire there.

**[02:20:02] Student 4:** Yeah. So basically the system would, that's the system that I'm thinking is like, in the non-relational, non-relational database, there is a user key. Basically there is a user key and it has sub hash maps in it. Like it has more hash maps in it. Okay. So user key. And in this we have total, total count basically. Just just a count.

<!-- chunk_13 02:20:33-02:32:06 -->

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

### [02:23:39] Source of truth vs pre-computed

**[02:23:39] Teacher:** So what you went with, I'll just talk about it a bit. Delete set when user clicks the messages icon. Okay. So what you did is, here, this is a classic case. And again, you would see this more. Everyone, I'm basically talking to everyone. So this is what you would see almost in every single system when you are implementing. You either can query the source of truth, or you can keep things pre-computed. A classic way to build any system. Either you directly fire source of truth when you need strong consistency, or you may build, or to get more efficiency, you may pre-compute the data or store it in a way which is consumable directly.

[02:24:25] Because here, if you look carefully here, you can directly get the length of this set and see the number of unique users that sent you the message. Here you had to fire an expensive query, SQL, NoSQL implementation, anything, that does not matter. But with this, you get this very nice optimization, if I may call it, because now much more, but obviously now it's our responsibility to keep this updated. Here it was by nature, it was updated because it is actually the source of truth. All the messages ingested into this table, we pick out, we index and then fire the query and get down. But here we have to have another flow in which we are also putting this data in this other approach that we are building. Okay.

[02:25:10] And again, as I said, neither this is wrong, neither this is wrong. It depends on what you are prioritizing, what your scale is, right? As a startup, this would work just fine for you folks. But as your company grows, when millions and millions of people are concurrently active on your system, you might be tempted to go with this approach, right? Okay.

### [02:25:32] Redis set per user

[02:25:32] Let's elaborate on this a bit more. Hey man [check: "Hey man" may be a student's name being called], which database would you pick to store this?

**[02:25:42] Student 1:** I think it should be a NoSQL system, because what I'm trying to put a variable length data against the user ID. So one user ID, against one user ID I need to store, let's say, 5, 100 or any number of user IDs. So having a document, key-value, store your value in a set, maybe MongoDB kind of a database, where key is the user ID and value is a set where each element is a user ID. That's it. That should be sufficient.

**[02:26:20] Teacher:** Let's use Redis purpose. And I'm just oversimplifying it for Redis because almost everyone is aware of Redis and its functionality. But you can pick any that gives you set functionality. That's what the key highlight is. Right. Any key-value store that gives you set functionality in the value so that you don't have to check and set and whatnot, just reuse what database already gives. Right. Okay. So we use Redis to store this data. Okay.

[02:26:45] Now we, I'll just draw a few elements over here. Okay. Now when your user tries to get the message. So how would, first let's talk about rendering the number that we are showing to the user. It might be a get status API, which what it would do is it would talk to this Redis and count the elements and return the response. So get is done. And similarly, when we are deleting from Redis, we can have a clear API that goes to Redis and clears things off. So we have clear API. It goes to Redis and it deletes the key that we just said. So get done, clear done. Right. And if you look carefully, read path is done, a very trivial write path is done. Right.

### [02:27:52] Updating Redis - input from the messaging service

[02:27:52] Now comes the interesting part, that how will you update this Redis with this data that you need. This one, this unique set, because someone has to put the data in, that these are the unique from which you received the message while you were offline. So what, how would that work on, Pankaj?

**[02:28:16] Student 4 (Pankaj):** Yeah. So two things here. Like, what I was thinking is the client also needs to be smart, because if the user is already on the messaging tab, even though he is reading some other users message and he is getting the message at the same time, it still will not be counted as, you know, newly unread, because he is already on the tab, right? So we don't need to show him that notification at that time. Correct, correct. So the client also is offline, yeah. [check: "Correct, correct. So the client also is offline, yeah." may be a teacher interjection] So yeah, so the second thing what I was talking about is like, if we have a WebSocket connection for messaging, so that backend can check that if the socket connection with the client is off, then I can update the Redis. But the client also needs to be smarter, that when it is on it, it should not send it when the user is already on that tab. So if I am browsing through Instagram or watching some reels, then if somebody sends me a message, then I can trigger that update API. But if, if I am already on the tab, then the backend should take care that, yeah, okay, if the socket connection is off, then yeah, I should update the Redis.

**[~02:29:22] Teacher:** Okay. So the input to your system, brilliantly put, input to this system, which updates things in Redis, looks something like this. Okay. Now that the cat is out of the bag, I can directly cover this, right? And we'll talk about a high level pattern that I wanted to, right? Because it's not just one database that we would have, we would have a few more databases to support it. We'll just talk about it. Okay.

[02:29:44] So the input to the system will be our messaging, messaging service, because our messaging service knows when a message is not sent to the user, right? And here I'm simplifying it by saying that when user is offline, they only do it. In real world you see [unclear: "very other use case as a very well explained"], where you are on some other tab, you still receive a message, so your count increases. Those cases are there, but I'm just simplifying it. You can add other cases where you would want to pop up that notification, but here the idea is very, user is offline, when the message is unsent. Now whatever your definition of unsent is, user not on the tab, user offline or user doing something else, right? Whatever your definition is of unsent, that comes from your messaging service.

[02:30:36] Why messaging service? Because messaging service would know if the message is delivered to you or not, if you are on that tab or not, if your WebSocket connection is on or not. In either case, this is the source of trust, your messaging service, right? [check: sentence may start mid-way, words before "help of" possibly lost] Help of online, offline indicator service to see if you are online or not, or it might own, on its own have this information, because it has the all the connections, persistent connections are with that edge server. So that edge server is the one that would know if you're online or offline or connected or not, or on which tab.

[02:31:10] So in either case that becomes our source of trust, that, hey, if my message is sent or... Whenever messages is unsent, I'm creating an umbrella of everything that I want to pop notification on into this message called on message unsent. Right. Depending on ifs and else's, where you are, what you are doing, you just implement those logics over here from the front end. Right. Okay.

[02:31:34] Now this, all of this comes to this Kafka on message unsent, which becomes the input to our system. And in that, what we do is we do this, like from this user, this user, this message was sent, because we want to store the number of unique users. We store it in a set. And what we do is we typically store it in Redis. You can pick any key-value database, which is partitionable by default. All of them are, and provide set as value, any database.

<!-- chunk_14 02:32:06-02:45:27 -->

**[02:32:06] Teacher:** So get status straight forward, clear status straight forward. So when a user clicks on the message button, you delete the entry from the set. The number of unread messages count, you make a call to this count, count the length of the set and you return, right? Okay. For you to update things into Redis, your write path, put to something this on message unsent coming from your messaging service, leveraging online offline and whatnot, your consumers consume it and writes to this Redis cluster that, hey, new user, new user, user, you received a new message, you received a new message. So all of that goes into this Redis cluster.

[02:32:45] Lot of people would stop designing over this stage. You'd say only this much is in there, right? You have a read path. You have a write path. You are almost converged onto the design, but no, this is not good. Why?

[02:33:01] Because imagine the situation, this database, and now this is the high level pattern that I want to talk about in next 10 minutes. This, this is one thing. This Redis cluster that you have is serving a huge number of reads. Imagine millions of users on your platform, constantly refreshing the page or going from one page to other, you making an API call to get the unread messages. Right? So this database is anyway handling large number of reads. Plus whenever user clicks on the message icon, you see large number of writes happening over here as well. Plus anytime there is message unsend, you are updating into this database. This database is overburdened. When this database is overburdened, as I always say, database is the most brittle component of an infrastructure. See if you are doing some unnecessary operations on this database. Are you doing any unnecessary operations? Let's take a look.

[02:33:55] Get status. No option. You have to go to the database because that is a source of truth. You have to go to the database, read it, read replica. You don't need it. It's an in-memory DB anyway. So get status. [?Bare minimum | asr: "Fair minimum"]. Clear status. You have to go and delete the key over here. You can't do much over there. You are not doing any [?undue | asr: "undo"] operation, any unnecessary operation in this path that you are making the call. Okay. Let's talk about this path. Are you doing any unnecessary operation?

[02:34:23] You might think that, hey, every time I'm seeing an, every time I receive a message unsent event, I'm just updating this database. I'm doing the bare minimum it seems, but no, given that in this Redis cluster, the value is a set. If I receive one message from user B or 10,000 message from user B, my message, the state of my database is not changing for 9,999 times, right? Because for the first message itself, the entry is being added into the set. For everything else, there is no change happening in the database. So can we reduce that?

[02:35:05] And if you look carefully, look, go through your messages, see all of your, all of your friends. When you are offline, they don't send you just one message. They send you 5, 10, 15, 20, 30. Hey, what are you doing? Come here. We are going for this. You a lot of short messages, right? Especially when you're [unclear: "off my habitat"], right? Given that first, on the first thing you are writing it into the DB, DB state changes. For all other N minus one times, there is no changes happening in the DB, but you would still make a call to DB trying to write to the set. Set does not exist. Oh, sorry, set already exists and there is no changes happening in the DB anyway. So you are wasting a lot of network IO happening over here, and not as network IO, but while making, by letting this database handle that request.

[02:36:03] Now, how would this database handle the request? It would get the request. It would read the set, see if the entry exists in the set. It would discard. If it does not exist, it would add this. Too much of work going into this DB doing nothing for those N minus one things. So this cluster is in most cases doing nothing, but unnecessarily handling operations leading to no state changes in the database. This is what I want you to focus on.

[02:36:33] That whenever you are looking at a database, again, one more high level pattern, here is what I'm talking about, that whenever you find a database that is doing a lot of unnecessary operations leading to no state changes in database, try to minimize them because database is the most brittle component of your infrastructure. No matter which cloud provider you pick, if a database is done, everything is done. Protect it, right? It's like [?Voldemort | asr: "world emote"] and it's basically [?Deathly Hallows | asr: "deathly halos"]. Keep it protected no matter what. Keep it like well protected by all the magical charms, a really good mood for some reason. Okay. So protected, protected, however you can. Right.

## [02:37:16] Auxiliary database - auxiliary Redis

[02:37:16] And given that we are doing a large number of unnecessary operations over here, how do we minimize it by using an auxiliary database? This is what I want to talk about. Having an auxiliary database whose sole job. So here, what you are doing is this is your primary database. You want to protect it. Network cost is not much in this case. Preventing your main database from going down by adding a bit of network cost is a good trade-off to make. Always remember this. It's all about trade-off. So you are incurring one more network IO. But if you can reduce the load on your database, it's worth it. It's worth it. Every single time it's worth it.

[02:38:02] So what we do is we add an auxiliary Redis into the scheme of things. The job of this Redis is very simple. Whenever the write happens, the write first happens into this Redis and it checks if the entry exists or not. If the entry exists, good enough, I would not make a write to this database. If entry does not exist over here, then I'll write to this database. This way for n-1 times, you are not even calling this main DB, reducing the load on this database. But all of this load is [?handled | asr: "hunted"] by this, everything, checking if I've already, which means it's basically checking if I've already have an unread message from this particular user or not. Right. That's what it is all done. This way what happens is this takes a bulk of the, bulk of the n minus one queries are firing over here. Right. While one query goes over this way, this database is protected while this takes all the hitting. Right.

[02:39:07] Now, what's the worst case? This database goes down. See, you are protecting this database. If this goes down, then everything is done in any case. Worst case is what if this goes down? If this goes down, what would happen? No write would happen over here. All the writes would go over here. So it would have to handle all n-1 writes that anyway it was anyway doing. So by adding this auxiliary database, you are just trying to shed the load that was there on this main database.

[02:39:36] This is the high-level pattern I want to talk about. Is really important that whenever you have a very brittle component in your infrastructure, just typically your database, and if it is doing a lot of unnecessary operations leading to no state changes in the database, try to add an auxiliary database and reduce the load on the main. This way, the service will be up and running. Everything will be happy. Right? So now just few changes by adding this thing, your status check API, when you clear the status, it not only has to delete from here, but also delete from here. That's it.

[02:40:07] Some here and there glitches and consistency would come, but not much to worry about because it's not transactional. It's not something that deals with money and all, it just unread messages. No one even gives anything about it. Right. So don't worry much in case it goes into slightly inconsistency. It's not an end of the world for your product. So you can do that. But if that entire system is done, that is end of your product because it's, it's very bad experience. Right. So you need to pick your battles, what you are trading off for what. And this is what I wanted to cover as part of this design, this high level pattern and how we are approaching this situation.

## [02:40:48] Next week - storage engines *(admin)*

[02:40:48] *(admin)* And this is what I wanted to cover for today. Folks who may want to drop off, I'll take questions around anything as part of the system and then across all the systems that we covered today. I'll update a recording by 3 slash 4 today. I will share the pre-reads for the next week. Next week is all about, it's my personal favorite week, storage engines, where we'll build our own storage engines. It will clear a ton of concepts about databases, not just how to use it, but internals of it. It would build that intuition around writing your own database.

[02:41:19] And I'm not just talking about just for the sake of engineering, but more importantly, knowing those internals would build you that intuition on how systems like Kafka work, because I don't, I didn't know internals of Kafka. I guessed it and it was exactly how it was implemented. Right. I want you all to form that same kind of intuition, that exact same intuition so that whenever you come across a new system, it's very easy to guess, and you can guess anything, but in this case, once your intuition is built, 99% time your guess would be correct, which is what we want to do. So next week is all about storage engines where we build three interesting storage engines, two of them will 100% blow your mind away because we'll go into those granular details, which I think everyone should. Right. Okay. So that's what we'll cover next week.

## [02:42:10] Q&A

[02:42:10] So folks who want to drop off, I'll take questions. Go on, Vikram.

> **Student Question [02:42:15] - Student 6 (Vikram):** Yeah. So I would like to add one more optimization to this system. Like, so let's say on, on, on the front end. So let's say there are thousands of messages and let's say 10,000 messages, then instead of showing 10,000 messages, we should display more than, let's say, 100 plus messages. And at a point that user is not, don't care that he had 10,000 sub messages. So let's say on the front end, if we have hundreds of 100 messages, then we only show that 100 plus. And in next steps, we don't write to the database itself, Redis cluster itself, because we know that it does not matter.

**[02:42:54] Teacher (answer):** It does not matter.

[02:42:55] Yeah. [02:42:56] Yeah. [02:42:56] True. [02:42:57] True. [02:42:57] True. [02:42:57] True.

[02:42:58] That's a good optimization. So that's where you can also leverage this. That it's not that every time you have a unique entry, you do this. If this length is more than, let's say, 100, that's a threshold. You don't even write a first entry to this. We even [?save | asr: "say"] that one extra [?write | asr: "right"] that is happening over there.

**[02:43:12] Student 6:** Okay.

**[02:43:12] Teacher:** Yeah. Thanks. Thanks for adding that. Okay. Anything else? Any question? Anyone? Was it really that clear? DK.

### [~02:43:21] Auxiliary Redis entries and clear status

> **Student Question [~02:43:21] - Student 2 (DK):** Yeah. So in the case of auxiliary Redis, what, how you are making the entries? Because see, in the case of Redis cluster, we are storing a set like B, we can, you know, we have CDEFG, but in the auxiliary Redis, you are storing it as separate entries, like B maps to C.

**[02:43:41] Teacher (answer):** Anything. [check: "anything." may be the end of Student 2's question] I picked this so that we have a very clear different key models set up. I would pick this like, for example, B received message from C, B received message from D as a key and value is just true. I am just reducing the overhead of storing an extra set, comparing if the key exists or not. You can do that way also. You can do this way also. Either way is fine.

> **Student Question [~02:44:03] - Student 2:** And when you are going to, so let's say at the nth moment, till n-1 you are storing the values here in, you know, auxiliary Redis.

**[~02:44:11] Teacher (answer):** Not storing, I am just checking, checking, just checking, not storing. Just checking. Let's say a user B sent a, let's say user B sent a 10,000 messages. I'll be writing one time over here and other 99 checks would happen over here. So one time [?write | asr: "right"] over here, one time [?write | asr: "right"] over here, for everything else I'm just checking it over here. Correct. Because if it exists already, so let's say I take this example. If B sent a message to [?C | asr: "see"], if this entry already exists, why should I write it over here? Right, right. So here I'll just check, I don't have to create 99999 entries over here. Correct?

**[02:44:52] Student 2:** Got it. Yeah, there was a gap in my understanding. I was thinking you are just incrementing the count here also.

**[02:44:56] Teacher:** No, no, there is no count, there is no count over here. This is just existence.

**[02:45:00] Student 2:** Just existence, got it, got it. Yeah, thank you.

> **Student Question [~02:45:00] - Student?:** I had question related to clear status because somewhere when we always keep B to C true, right? I read the message by clicking and then again B to C happens.

<!-- chunk_15 02:45:27-02:55:52 -->

**[02:45:27] Teacher (answer):** So when you clicked on the message icon, when you clicked on the message icon, this set got deleted. These entries got deleted. Okay. When another message was sent, then the entry would be created again. What is the edge case that you're talking about? Help me understand that.

**[02:45:45] Student 2:** No, as long as both are getting synced, there is no issue. So I was...

**[02:45:50] Teacher:** And obviously there is a problem. Yeah, as you very rightly said. In case, let's say you wrote over here, but this [?write failed | asr: "right field"], or rather this [?write | asr: "right"] succeeded in this [?write failed | asr: "right field"], then there is a problem. Not even denying that. Right? Not even denying that. Yeah. Right? Yeah. But it's not the end of the world. And it's very likely, very likely that the [?worst | asr: "WhatsApp was"] that would happen. In the [?count | asr: "account"], you would see two. But in reality, you would have 300 messages.

**[02:46:19] Teacher?:** Right? Yeah.

**[02:46:20] Teacher:** And that's okay. It's still okay. Right? Because it's not dealing with a financial system or really critical things. Some inconsistency where one write succeeds, other write fails. That is a problem. But introducing that complexity of doing distributed transaction is not worth it. Right. You just accept a bit of inconsistency. Right. Yeah.

**[02:46:40] Student 2:** Thanks.

### [02:46:42] Transactional update of both databases, read before write

> **Student Question [02:46:42] - Student 2:** So should we build it, build this functionality where we're doing the status check API as a transactional base, like updating both the databases, like the auxiliary and the Redis cluster at the same time?

**[~02:46:51] Teacher (answer):** Not required. You take up some inconsistency responses in favor of high throughput [check: "take up some inconsistency responses" may be misheard], not worth it because it's not very significant. See, what's the worst that would happen? You see two messages count of two, but in reality, you have three new messages. You're anyway, clicking on it, going on that screen, you would see a hundred messages. If that person has another thing and you did not respond and it was something about it that would send another message to you. That's okay. Right. So given how humans work, it's okay to, in this case, it's okay to have a bit of inconsistency, but why to add that unnecessary complications of distributed transactions? You really don't need that.

**[02:47:36] Student 4:** Yeah.

**[02:47:37] Teacher:** And this is again, that one thing that as engineer, you think you feel that you are cheating or by not having this real transaction, making a data going in inconsistent state, but in real world, it really does not matter. You think from user experiences perspective, what's the worst that would happen? Would it be an end of the world for them? Right. Not that.

> **Student Question [02:47:58] - Student 2:** Yeah, but I'm just weighing with why you like, instead of building auxiliary Redis, why don't we do a read before write in the write path here, read before write over here? No, in the [?write | asr: "right"], even read is okay? You're saying we don't even want to want to read on the database, on this database, right? [check: label boundaries mixed here, some phrases may be the teacher's]

**[~02:48:21] Teacher (answer):** No, no, no, I, what I'm saying is I don't even want to read here. Okay, you don't even want to get, because see, every instruction you fire on this DB, CPU consumes maybe even a slight bit of it, it consumes that. I'm just protecting this. This is like that, that Beauty and the Beast [unclear: "car"] rose that you are placed in this glass jar, no matter what you don't want it to crumble.

**[02:48:50] Student 2:** Got it. Got it. Yeah. Makes sense.

### [02:48:52] Why no user ID in the Gravatar hash

> **Student Question [02:48:52] - Student 2:** And, uh, one detail I might have missed in the Gravatar thing, uh, was there like, why did not we provide a user ID in the graph? Like that is privacy or that's by design. [unclear: "How grow that is like, I."]

**[02:49:06] Teacher (answer):** Okay. You are saying over here why we don't have user ID.

**[02:49:12] Student 2:** Yeah. Like, or whenever you generate something, generate even in the hash or like just scramble it with user ID, right? That will save a lot.

**[02:49:20] Teacher (answer):** No. Oh. Okay. So you are saying that, okay, somehow I inject user ID over here. But then the problem is that this hash is universal function. MD5 hash. Right? Now Facebook, let's say Facebook wants to integrate your Gravatar. It does not need to know your Gravatar [?user ID | asr: "visitor ID"].

**[02:49:39] Student 2:** Got it. Yeah. That's what I was trying to do.

**[02:49:42] Teacher:** All it just has. If it has your email ID, it can just try to see if you have Gravatar or not, it can start directly rendering it.

**[02:49:48] Student 2:** Yeah. Yeah. That's okay. Yeah. That's a simple requirement that people will feel easy.

**[02:49:54] Student?:** Yeah. Yeah.

### [02:49:57] What on message unsent means

> **Student Question [02:49:57] - Student 5:** I had a question about on message unsent. I think I did not. If a user is active and then they receive messages from any of the [?chats | asr: "charts"], we don't want to trigger that event. Only if the user is inactive, whether we have an active WebSocket connection or online offline service, only then we want to trigger that on the unsent event. I want to understand what unsent means. I'm not able to.

**[02:50:28] Teacher (answer):** It's an umbrella that I created when I was not able to send a message to this user in real time.

**[02:50:35] Student?:** That's it.

**[02:50:38] Teacher (answer):** Now, implementation of it depends on if user is on other tab, then also it is considered to be unsent. Or if user is completely offline, then only it is considered to be unsent. That is your product call. But the idea is whatever flows into this on message unsent, it's like on message unsent in real time, you have to update the [?count | asr: "account"].

**[02:51:01] Student 5:** Right? Yep. Yep. Thank you.

### [02:51:05] Closing *(admin)*

**[02:51:05] Teacher:** *(admin)* Any other question? Anyone? No. Tick, tick. One, two, three, four. Fine. Done. Okay. Thanks, folks. For tuning in. I'll update. I'll upload a recording in sometime by three as well. See you folks next week. It's all about storage engines. Quite fun. We'll dive into database details and implement a couple of other systems. Thanks folks for tuning in. It was a great session. Great questions.

### [02:51:39] Resources for query and database optimization

**[02:51:39] Student 2:** I have a small query here. Sorry.

**[02:51:45] Teacher:** So

> **Student Question [02:51:47] - Student 2:** See, initially we talked about the query optimizations and database optimizations for MySQL or let's say any relational database. [check: words possibly lost before "to improvise"] To improvise on this because I personally feel that, you know, I'm really not good at this. So what are the resources I can follow?

**[02:52:05] Teacher (answer):** So what I would do, what I would recommend is I actually, to be honest, how I became good at it is I focused very well during my college days on that subject very deeply. Right. So that is one that is my solid [?foundation | asr: "condition"], but I cannot obviously recommend you to read that entire textbook. So what you should do is understand how database works, how relational database works, how data is structured, right? Those things you need to go really deep into it, right? And how you do that? I am right now running a series on my YouTube members only thing around database internals. In case you are interested, go through those videos and see if you are interested into that, right? I cannot claim that I will cover all of that, but it is definitely going to be a big value add, right? Because I'm distilling the information from the textbooks, from the courses that I did, going into those nitty gritties of databases, not really internals into it, into the page structures and all, but more importantly, what you use in your day-to-day life, what you should definitely know in your day-to-day life about it. That is what I'm covering.

[02:53:07] I'm literally going through my college textbook. I'm not even exaggerating. I'm literally going through my college textbooks, three of them to just ensure that I've covered all the key details. Very soon, I'll be putting out videos on phantom reads is obviously coming next week. After that, it will be SQL query optimization. After that, indexing evaluation and whatnot. It's all going to be around databases in general, right? Because that's my strong quota [check: "strong quota" - possibly "strong forte"]. That's what I realized. So that's one.

[02:53:34] But in case you still want to explore, log into your production console, whatever your production console is, log into your production console, your MySQL thing, and start firing explain statements. E-X-P-L-A-I-N. In case you are unaware, Google explain statements, MySQL. It gives you the query plan of it, right? Every single word of it, Google that word of it, right? What it does, how the query plan is created, right? And refer to actual MySQL document. And I'm just using MySQL as an example. Pick your favorite database. Go through the official documentation of it and not some blogs or videos about it. Go through the official documentation. You would see how dense those documentations are because that would give you those nitty gritties that typically videos overlook, that typically blogs overlook. Do that right.

[02:54:26] But pick one query at a time, run the explain statement, get those terms, look out in the official documentation and re-iterate. And over time, three or four months will be well-versed in that. Now, when you are doing this, if you spot any optimization [unclear: "company's workflow suggest"], right? On your staging environment, run those, make those changes and see how it behaves. See if it improves something or not. Or in any case, you don't have to change in production or change in staging. You can just dump that database into other table, fire that exact same query with your changes and see what kind of improvement you've got. Companies is a very good, is a very good playground for us. In any case, if we improve, it's better for organization and you learn stuff as well, right? More than I would want to add. So that's how I became good at it. I should create a video on this. It's a good topic. Yeah. Thanks, J.K. [check: name spelling - same student as "DK"?]

### [02:55:27] Auxiliary Redis cluster

**[02:55:27] Teacher:** Yeah, Chandan, go on.

> **Student Question [02:55:29] - Student 2 (Chandan):** Arpit, like a Redis cluster is there. Do we need auxiliary Redis cluster also?

**[02:55:35] Teacher (answer):** It will be cluster. It will be cluster. One single node will not be able to handle. You need a cluster for that. It just became too dense over here. Yeah. So thanks. Great. Thanks folks for doing and see you folks next week. Bye-bye.

<!-- BODY END -->
