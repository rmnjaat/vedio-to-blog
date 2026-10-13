# chunk_01  OWNS 00:00:02 -> 00:12:45  (segments #0-#196, 2142 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: Great week four day second after this will be completed 50% of the course. Interesting. Okay.   {#0}
[00:00:11] TEACHER: So we'll continue our discussion on social networks, but like how we digress the big yesterday on CDN side, but that's important. That's very essential for us to know.   {#1}
[00:00:24] TEACHER: Today, what we'll do is we'll digress a little bit more in some other direction to touch   {#2}
[00:00:29] TEACHER: upon something really interesting.   {#3}
[00:00:31] TEACHER: Yesterday, we fogged a discussion around, hey, Instagram private images are not really   {#4}
[00:00:38] TEACHER: private.   {#5}
[00:00:38] TEACHER: What if we want to make one?   {#6}
[00:00:40] TEACHER: Right?   {#7}
[00:00:40] TEACHER: We'll talk about that.   {#8}
[00:00:42] TEACHER: We'll talk about how to make a purely private image sharing platform, for example.   {#9}
[00:00:48] TEACHER: You'll get the gist of it.   {#10}
[00:00:49] TEACHER: Right. Yesterday, we just spoke about, Hey, CDN gives us image optimization.   {#11}
[00:00:55] TEACHER: Why to build one?   {#12}
[00:00:55] TEACHER: Today we'll build one and we'll see how it is actually, it's hardly going to be 10   {#13}
[00:01:00] TEACHER: minute discussion, but we'll see how simple it becomes to implement an on-demand image   {#14}
[00:01:04] TEACHER: and on-demand image optimization.   {#15}
[00:01:07] TEACHER: Then we take a break and then we discuss then from now on, given that we are almost 50% done   {#16}
[00:01:16] TEACHER: And with the course from now on, I'll start throwing you all into different situations   {#17}
[00:01:21] TEACHER: on typically what senior engineers are supposed to, how they are supposed to wear multiple   {#18}
[00:01:30] TEACHER: hats, participate in multiple discussions, take care of multiple things at once, right?   {#19}
[00:01:36] TEACHER: Think of extensibility of the system.   {#20}
[00:01:38] TEACHER: Think about cross-stream collaboration.   {#21}
[00:01:40] TEACHER: Those sort of factors will take care today.   {#22}
[00:01:42] TEACHER: We will understand how should we even approach this.   {#23}
[00:01:48] TEACHER: So you will see across three or four different systems that we discussed, I am forcing you   {#24}
[00:01:52] TEACHER: all to think in different lines.   {#25}
[00:01:55] TEACHER: So that is where we would pick up our discussion with tagging photos.   {#26}
[00:01:58] TEACHER: Seems like a really simple statement, but when we ask those critical questions, we realize   {#27}
[00:02:03] TEACHER: that it is not as simple.   {#28}
[00:02:06] TEACHER: It touches upon a lot of interesting factors.   {#29}
[00:02:09] TEACHER: right that and we'll end our session for today with a very interesting system that we use every   {#30}
[00:02:15] TEACHER: day but we don't give it enough credit which is newly unread message indicator i could not come   {#31}
[00:02:21] TEACHER: up with a better name really sorry for that but newly unread message indicator is how we use our   {#32}
[00:02:26] TEACHER: social network every single day or social media every single day and we just fail to acknowledge   {#33}
[00:02:32] TEACHER: that hey this system or this one small button can be so complex right but again through this   {#34}
[00:02:38] TEACHER: what I would like to do is I'd like to touch upon a very interesting high level pattern   {#35}
[00:02:42] TEACHER: that you can use or that a lot of company uses in production to prevent major outages.   {#36}
[00:02:50] TEACHER: So these are the four things that we'll discuss today.   {#37}
[00:02:52] TEACHER: But apart from that, I covered this one system just once,   {#38}
[00:02:57] TEACHER: designing notification for Instagram on my first ever quote.   {#39}
[00:03:00] TEACHER: I never covered it again because it was out there on YouTube.   {#40}
[00:03:04] TEACHER: But do watch it in case you haven't.   {#41}
[00:03:08] TEACHER: because there is one thing,   {#42}
[00:03:10] TEACHER: one key takeaway from the lens of very naive   {#43}
[00:03:12] TEACHER: is that you would realize how naive I was   {#44}
[00:03:13] TEACHER: when I was explaining that.   {#45}
[00:03:15] TEACHER: But even people found it amazing,   {#46}
[00:03:17] TEACHER: which shows the massive gap that exists.   {#47}
[00:03:22] TEACHER: One key thing from this discussion notification system   {#48}
[00:03:25] TEACHER: is how we bridge the gap of Kafka.   {#49}
[00:03:31] TEACHER: Yesterday also we saw that how the parallelization   {#50}
[00:03:35] TEACHER: or the parallelism of Kafka is limited   {#51}
[00:03:38] TEACHER: partitions in Kafka. How do you get past that? Because you may have to send a million notifications   {#52}
[00:03:44] TEACHER: or notification to a million users. Let's say Justin Bieber posted something. You want to send   {#53}
[00:03:49] TEACHER: notification to 10 or 15 however many million followers he has. You have to send notification   {#54}
[00:03:55] TEACHER: to those many folks. How do you do that? Because if you use Kafka, it's pathetically slow. If you   {#55}
[00:04:00] TEACHER: have limited number of partitions, adding large number of partitions becomes a problem. So what   {#56}
[00:04:05] TEACHER: do you do? Which is where I spoke about a very interesting high level pattern where you club Kafka   {#57}
[00:04:10] TEACHER: with SQS. So message stream with message broker to get very high degree of fan out. That's an   {#58}
[00:04:16] TEACHER: interesting concept. You should definitely watch that just for that one bit. Everything else you   {#59}
[00:04:20] TEACHER: can now design on your own. But that one bit on why are we making that decision? And basically   {#60}
[00:04:26] TEACHER: that's how notification systems are built. If you just draw and I'll have a message broker on which   {#61}
[00:04:31] TEACHER: send message input broadcast.   {#62}
[00:04:32] TEACHER: No, that's not what happens at scale.   {#63}
[00:04:35] TEACHER: That's not how you manage or handle scale.   {#64}
[00:04:37] TEACHER: To build such systems you need because I had to do it.   {#65}
[00:04:41] TEACHER: There was no option for me to send notifications to,   {#66}
[00:04:43] TEACHER: not even talking about million,   {#67}
[00:04:45] TEACHER: I'm just talking about few 50, 60,000,   {#68}
[00:04:47] TEACHER: but in the span of five seconds, we had to do it.   {#69}
[00:04:50] TEACHER: So in that case, when we are being this aggressive in marketing,   {#70}
[00:04:54] TEACHER: we had to pull that off, right?   {#71}
[00:04:56] TEACHER: So this is what we did.   {#72}
[00:04:57] TEACHER: This is how we stitched our system together.   {#73}
[00:05:01] TEACHER: a message stream with a message broker to get a high degree fan out.   {#74}
[00:05:05] TEACHER: So watch that video in case you haven't.   {#75}
[00:05:07] TEACHER: It's the first ever video I posted on YouTube.   {#76}
[00:05:09] TEACHER: So watch that.   {#77}
[00:05:10] TEACHER: If you sort it by oldest video first, you'll get it as the first.   {#78}
[00:05:15] TEACHER: So that's why I don't cover it again.   {#79}
[00:05:17] TEACHER: But watch that video to get how we club kindnesses or Kafka with SQS or EBITMQ to get high degree fan out.   {#80}
[00:05:28] TEACHER: First ever cohort, March 20, goes back two years.   {#81}
[00:05:31] TEACHER: two years, two years back.   {#82}
[00:05:33] TEACHER: I covered it.   {#83}
[00:05:34] TEACHER: Right.   {#84}
[00:05:35] TEACHER: Okay.   {#85}
[00:05:36] TEACHER: So this is the agenda for today.   {#86}
[00:05:38] TEACHER: Let's start with the first one.   {#87}
[00:05:38] TEACHER: But before we jump to designing gravatar, let's spend a bit of time to understand how images   {#88}
[00:05:46] TEACHER: are served.   {#89}
[00:05:46] TEACHER: Now, serving images is really important.   {#90}
[00:05:49] TEACHER: We all do it on a day-to-day basis.   {#91}
[00:05:52] TEACHER: But how are these images actually served?   {#92}
[00:05:56] TEACHER: Because we just say images are served.   {#93}
[00:06:00] TEACHER: How?   {#94}
[00:06:01] TEACHER: When I ask this question, the first thing you people say,   {#95}
[00:06:04] TEACHER: without even thinking about it, will you see it into service?   {#96}
[00:06:07] TEACHER: But someone has wrote that quote.   {#97}
[00:06:09] TEACHER: Someone has to read image and serve it.   {#98}
[00:06:11] TEACHER: What, how do we serve a static file?   {#99}
[00:06:15] TEACHER: Right.   {#100}
[00:06:16] TEACHER: Let's start with that because that's what would help you build a shit ton of   {#101}
[00:06:21] TEACHER: features and not even exaggerating on that.   {#102}
[00:06:24] TEACHER: We'll see a real practical demo where this comes in handy, because I don't   {#103}
[00:06:31] TEACHER: of it, right?   {#104}
[00:06:32] TEACHER: You'll understand how beautiful this thing is.   {#105}
[00:06:34] TEACHER: You can understand how companies mind blowing, like mind blowing,   {#106}
[00:06:39] TEACHER: awesomely use this particular feature.   {#107}
[00:06:41] TEACHER: Okay.   {#108}
[00:06:43] TEACHER: So whenever you hit a particular URL, your browser does not know it's an image URL.   {#109}
[00:06:49] TEACHER: Let's say you have this URL and you've hit it.   {#110}
[00:06:52] TEACHER: Your browser has no idea what's happening.   {#111}
[00:06:55] TEACHER: What browser would do.   {#112}
[00:06:56] TEACHER: Let's say it's for some reason, four or five words back, some people thought that it's   {#113}
[00:07:05] TEACHER: because of this extension, the browser knows it's an image.   {#114}
[00:07:08] TEACHER: No, browser does not have a clue.   {#115}
[00:07:11] TEACHER: Browser is a dumb, stupid piece of software.   {#116}
[00:07:13] TEACHER: It has nothing in it.   {#117}
[00:07:16] TEACHER: What you give.   {#118}
[00:07:18] TEACHER: So browser has a fixed defined behavior for everything.   {#119}
[00:07:21] TEACHER: And when I say browser also applicable to apps.   {#120}
[00:07:24] TEACHER: right so always remember whenever something is a platform browser is a platform app android app   {#121}
[00:07:31] TEACHER: ios app is a platform right so sorry the android os ios thing the sdk that you can they're all   {#122}
[00:07:38] TEACHER: platform they're all building block so they cannot be very smart they have to be basic enough so that   {#123}
[00:07:44] TEACHER: you can use it with hundreds of other things so for you to render an image what you typically do   {#124}
[00:07:51] TEACHER: You take some URL and you put it in an IMG tag, IMG SRC and you put the image URL there.   {#125}
[00:07:59] TEACHER: What happens when you send this HTML to browser and browser renders it?   {#126}
[00:08:04] TEACHER: So browser starts rendering the XML, the HTML that you sent, it stumbled upon IMG SRC tag.   {#127}
[00:08:12] TEACHER: What browser simply does, whatever you provide in IMG SRC tag, it makes an HTTP GET request   {#128}
[00:08:21] TEACHER: If you provide this URL, it would make HTTP get to this.   {#129}
[00:08:25] TEACHER: If you provide some other URL, it would make HTTP get to that.   {#130}
[00:08:28] TEACHER: Browser does not have any idea what it would get in return.   {#131}
[00:08:31] TEACHER: It is expecting an image.   {#132}
[00:08:33] TEACHER: So what it does, it makes HTTP GET request to whatever URL you specify in the AMG tag.   {#133}
[00:08:39] TEACHER: Whatever you get in the response, it tries to interpret it as an image.   {#134}
[00:08:44] TEACHER: How do you do that?   {#135}
[00:08:45] TEACHER: It's set up.   {#136}
[00:08:46] TEACHER: Yesterday we saw when GitHub sent, when we uploaded the image on GitHub issues.   {#137}
[00:08:51] TEACHER: happened we saw how that png files bytes were sent in that that header png and some rdf data   {#138}
[00:08:59] TEACHER: and whatnot was shared that is the file format the header of the png file tells you that it's a png   {#139}
[00:09:05] TEACHER: file jpg has a header bitmap has a header tiff has a header every single format in the world has a   {#140}
[00:09:11] TEACHER: header so what it does whatever bytes you get in return if it's a 2xx response whatever bytes you   {#141}
[00:09:16] TEACHER: to get in the response, it checks the header.   {#142}
[00:09:19] TEACHER: It sees, okay, this is a PNG image.   {#143}
[00:09:23] TEACHER: So it would interpret those bytes as PNG.   {#144}
[00:09:25] TEACHER: So every browser shifts with image encoders and decoders,   {#145}
[00:09:30] TEACHER: but rather mostly decoders, not really encoders,   {#146}
[00:09:32] TEACHER: but decoders for every type of format, PNG, JPG, TAPE, SVG and whatnot.   {#147}
[00:09:39] TEACHER: Whatever you get something as a response and it looks at header and says,   {#148}
[00:09:44] TEACHER: Hey, what kind of format is this?   {#149}
[00:09:46] TEACHER: So it would invoke the PNG decoder or basic PNG decoder code and it would decode that   {#150}
[00:09:52] TEACHER: and render it as a pixelated image on your browser.   {#151}
[00:09:56] TEACHER: That's what is happening.   {#152}
[00:09:58] TEACHER: So given that, we know now that IMG tag makes an HTTP GET call to get it.   {#153}
[00:10:07] TEACHER: So when HTTP GET call is made on this URL, what would happen?   {#154}
[00:10:11] TEACHER: The request would come to server pointed by this, arvizhany.me.   {#155}
[00:10:16] TEACHER: It's a web server.   {#156}
[00:10:18] TEACHER: What it would do is it would see what's the handler of this path.   {#157}
[00:10:23] TEACHER: You may have a handler.   {#158}
[00:10:24] TEACHER: Let's say you typically what you do is you map your static folder.   {#159}
[00:10:28] TEACHER: This is my static folder, right?   {#160}
[00:10:30] TEACHER: As one of the parts.   {#161}
[00:10:31] TEACHER: So slash static maps to this particular static folder.   {#162}
[00:10:33] TEACHER: You configure this on NGINX.   {#163}
[00:10:35] TEACHER: Configure this on Springboard.   {#164}
[00:10:37] TEACHER: Configure this on Flask, Django, whichever framework you are using.   {#165}
[00:10:40] TEACHER: Every framework supports a static folder path.   {#166}
[00:10:42] TEACHER: What happens when you say that, hey, slash static maps to this folder   {#167}
[00:10:46] TEACHER: local disk. It means that whenever a path like slash static slash something is hit,   {#168}
[00:10:56] TEACHER: interpret whatever is there after slash static as a relative file path, go to my static folder   {#169}
[00:11:04] TEACHER: on the disk, read this path, read the file present in this path and send it as a response.   {#170}
[00:11:10] TEACHER: That's it. It does not care if it's image or text or whatever. Literally whatever is there   {#171}
[00:11:16] TEACHER: So for example, slash static slash IMG slash appy.jpg.   {#172}
[00:11:20] TEACHER: Let's map this static folder to this static URL.   {#173}
[00:11:24] TEACHER: So what I'll do is whatever I get after this is what a piece of code is written.   {#174}
[00:11:27] TEACHER: It's not automatically does that.   {#175}
[00:11:29] TEACHER: There's a piece of code written in your web server so that you don't have to re-implement   {#176}
[00:11:34] TEACHER: it again and again.   {#177}
[00:11:35] TEACHER: What it would do that slash IMG slash appy.jpg would try to hunt that same path in the static   {#178}
[00:11:43] TEACHER: folder mapped on your directory.   {#179}
[00:11:44] TEACHER: It would find this file.   {#180}
[00:11:46] TEACHER: It would read this file, read the bytes of it and send it as a response as part of this   {#181}
[00:11:51] TEACHER: HTTP request.   {#182}
[00:11:53] TEACHER: Once this response is received by the browser, the browser interprets it as an email because   {#183}
[00:11:58] TEACHER: you put it in the IMG tag and it renders it.   {#184}
[00:12:02] TEACHER: So this is how render happens.   {#185}
[00:12:04] TEACHER: So here we spoke about how static folders are mapped.   {#186}
[00:12:09] TEACHER: So slash static path map to slash static folder on your directory.   {#187}
[00:12:14] TEACHER: Where your code is different, where your static site is different.   {#188}
[00:12:19] TEACHER: So this is what happens.   {#189}
[00:12:22] TEACHER: Now, what does this tells us?   {#190}
[00:12:25] TEACHER: That this is what is happening as part of your code.   {#191}
[00:12:29] TEACHER: It reads the URL.   {#192}
[00:12:31] TEACHER: This is part of a backend code.   {#193}
[00:12:32] TEACHER: It reads the URL.   {#194}
[00:12:34] TEACHER: It extracts the path after slash static.   {#195}
[00:12:38] TEACHER: It goes to that corresponding folder, like that corresponding relative path in your static   {#196}
---- OWNED SEGMENTS END ----

CTX| [00:12:45] TEACHER: directory reads the content of in bytes and sends it back.   {#197}
CTX| [00:12:49] TEACHER: Which means that I instead of relying on slash static, I can do anything there.   {#198}
CTX| [00:12:56] TEACHER: I can write my own handler that instead of reading file from local test, it reads file   {#199}
CTX| [00:13:04] TEACHER: from S3.   {#200}
CTX| [00:13:05] TEACHER: For example, I can very well do that.   {#201}
CTX| [00:13:07] TEACHER: So let's say hypothetically, what I want to do is we saw how static path are exposed,   {#202}
CTX| [00:13:15] TEACHER: but let's say I want to expose a path slash raw, right?   {#203}
CTX| [00:13:20] TEACHER: So slash raw slash path, anything I gave over here as a path, what I want to do is whatever   {#204}
CTX| [00:13:27] TEACHER: path is over here.   {#205}
CTX| [00:13:28] TEACHER: I want to go to this S3 bucket at this path, read the file and written that as a response.   {#206}
CTX| [00:13:34] TEACHER: That's it.   {#207}
CTX| [00:13:37] TEACHER: to this is exact.   {#208}
CTX| [00:13:40] TEACHER: This is very similar to slash static, but slash static reads that same relative path   {#209}
