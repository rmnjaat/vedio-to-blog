# chunk_03  OWNS 00:23:34 -> 00:35:16  (segments #392-#624, 1943 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:22:34] TEACHER: it's all okay. Gain that practical experience.   {#364}
CTX| [00:22:38] TEACHER: Okay.   {#365}
CTX| [00:22:39] TEACHER: So this is all about CDN. Any questions   {#366}
CTX| [00:22:41] TEACHER: on this? I'll switch back.   {#367}
CTX| [00:22:43] TEACHER: Go on, Rahul.   {#368}
CTX| [00:22:44] STUDENT_1: So my question is basically   {#369}
CTX| [00:22:46] STUDENT_1: like from what   {#370}
CTX| [00:22:48] STUDENT_1: I am able to understand of CDN   {#371}
CTX| [00:22:51] STUDENT_1: from what you had just told me and   {#372}
CTX| [00:22:52] STUDENT_1: what I have understood as a whole   {#373}
CTX| [00:22:54] STUDENT_1: is that it only works for   {#374}
CTX| [00:22:57] STUDENT_1: public resources.   {#375}
CTX| [00:23:00] TEACHER: I started   {#376}
CTX| [00:23:01] TEACHER: with saying that it is not the case.   {#377}
CTX| [00:23:03] TEACHER: There are private things that you can work on.   {#378}
CTX| [00:23:05] TEACHER: That depends on the CDN that you are using.   {#379}
CTX| [00:23:07] STUDENT_1: So yeah, that's what I was   {#380}
CTX| [00:23:09] STUDENT_1: thinking. Netflix also uses   {#381}
CTX| [00:23:10] STUDENT_1: CDN and all of those things.   {#382}
CTX| [00:23:12] STUDENT_1: And like   {#383}
CTX| [00:23:14] STUDENT_1: Netflix also uses CDN.   {#384}
CTX| [00:23:16] STUDENT_1: Most of their traffic   {#385}
CTX| [00:23:18] STUDENT_1: is being served via CDN.   {#386}
CTX| [00:23:21] STUDENT_1: So like   {#387}
CTX| [00:23:22] STUDENT_1: in that case,   {#388}
CTX| [00:23:24] STUDENT_1: when we are serving private content,   {#389}
CTX| [00:23:27] STUDENT_1: There are all sorts of things like tokens,   {#390}
CTX| [00:23:30] STUDENT_1: authentication and all of those things.   {#391}

---- OWNED SEGMENTS START ----
[00:23:34] STUDENT_5: Don't jump.   {#392}
[00:23:35] TEACHER: First try out CDN.   {#393}
[00:23:37] TEACHER: First try out CDN.   {#394}
[00:23:38] TEACHER: We'll touch upon making things private   {#395}
[00:23:39] TEACHER: in the image upload design that we talked about.   {#396}
[00:23:43] TEACHER: There few things will get clear,   {#397}
[00:23:44] TEACHER: but play around with CDN.   {#398}
[00:23:46] TEACHER: Play around with CDN before you ask these questions.   {#399}
[00:23:50] TEACHER: Get your hands dirty   {#400}
[00:23:51] TEACHER: because tomorrow you have entire day of today   {#401}
[00:23:53] TEACHER: to play around with that.   {#402}
[00:23:54] TEACHER: Tomorrow we'll have another discussion   {#403}
[00:23:57] TEACHER: part of CDN. I would recommend you to get your hands dirty today and ask the same question.   {#404}
[00:24:03] TEACHER: What happens when you have private content? See the kind of configuration that CDN provides. CDN   {#405}
[00:24:06] TEACHER: needs to interface with let's say AWS private buckets to ensure that even though that content   {#406}
[00:24:12] TEACHER: is private, you're still able to serve it. You have to configure AWS keys here and there and in order   {#407}
[00:24:16] TEACHER: to have that seamless access. So that there are additional features. This is a simplified process   {#408}
[00:24:22] TEACHER: and not all CDN would support AWS.   {#409}
[00:24:24] TEACHER: There is specific, these are plugins that CDN, like some CDN choose to support AWS, some   {#410}
[00:24:29] TEACHER: CDN will go for other cloud provider, right?   {#411}
[00:24:31] TEACHER: But then they need to implement this logic that, Hey, this is how, if it is private,   {#412}
[00:24:35] TEACHER: is how we would make call to that.   {#413}
[00:24:36] TEACHER: But as an oversimplified process, this is how thinking of publicly exposed things makes   {#414}
[00:24:42] TEACHER: it very simple.   {#415}
[00:24:43] TEACHER: Sure.   {#416}
[00:24:45] TEACHER: Anamal.   {#417}
[00:24:50] STUDENT_6: Yeah.   {#418}
[00:24:50] STUDENT_6: Hi Arpit.   {#419}
[00:24:51] STUDENT_6: So I had this out, how would the user know about the CDN URL?   {#420}
[00:24:56] TEACHER: We'll send it from the backend, right?   {#421}
[00:24:59] TEACHER: You are serving the HTML page, the image URL that you pass, it goes that in API response   {#422}
[00:25:04] TEACHER: from backend servers, servers and rendered pages, you provide this URL.   {#423}
[00:25:08] TEACHER: User does not know it's CDN or not, but user is a URL.   {#424}
[00:25:11] TEACHER: And when I say user, it's what does it keep?   {#425}
[00:25:13] TEACHER: Whatever the browser sees in browser you send, what did I send in my website?   {#426}
[00:25:17] TEACHER: I said, edge.arpegbari.me slash imd slash arpeg.png.   {#427}
[00:25:21] TEACHER: It's coming from my backend user made a request to my index.html.   {#428}
[00:25:24] TEACHER: I served that in which I specified the CDN URL.   {#429}
[00:25:28] TEACHER: Image URL is the CDN URL.   {#430}
[00:25:30] STUDENT_6: Okay.   {#431}
[00:25:31] STUDENT_6: So you're saying like the first request would go to backend and it would pass the   {#432}
[00:25:34] STUDENT_6: URL of the CDN when you are serving it.   {#433}
[00:25:39] TEACHER: Configure a CDN once.   {#434}
[00:25:40] TEACHER: That's you don't know how web works yet.   {#435}
[00:25:42] TEACHER: If you're asking this question, that's not how web works, right?   {#436}
[00:25:47] TEACHER: When you are loading something, the URL that you saw, this URL is just a URL that you send   {#437}
[00:25:53] TEACHER: anything from the backend to the browser to render in IMG tag.   {#438}
[00:25:57] TEACHER: Correct?   {#439}
[00:25:58] TEACHER: Yes.   {#440}
[00:25:59] TEACHER: It's your responsibility to send that URL.   {#441}
[00:26:01] TEACHER: Whatever you pass in the IMG tag, that is what it would render.   {#442}
[00:26:04] TEACHER: Correct?   {#443}
[00:26:05] STUDENT_6: Okay.   {#444}
[00:26:06] STUDENT_6: No.   {#445}
[00:26:07] TEACHER: Play that around.   {#446}
[00:26:08] TEACHER: If this is where you are lacking, understand how web works.   {#447}
[00:26:11] TEACHER: What you send from the backend.   {#448}
[00:26:12] TEACHER: You are not sending the CDN configuration on the frontend.   {#449}
[00:26:17] TEACHER: compiling this URL and sending it to the front end.   {#450}
[00:26:20] TEACHER: So for the front end, normally like how it renders the image, it renders it.   {#451}
[00:26:24] TEACHER: Spend some time, build a deeper understanding and not even deeper,   {#452}
[00:26:27] TEACHER: but build an understanding of this.   {#453}
[00:26:30] TEACHER: Yeah. So maybe my question is related to what he has asked.   {#454}
[00:26:36] TEACHER: We normally see that there is a famous site which said, let's say abc.com   {#455}
[00:26:41] TEACHER: and user hits that. And then we start seeing that image and other contents   {#456}
[00:26:47] TEACHER: coming from different regions.   {#457}
[00:26:49] TEACHER: It means at abc.com, the owner of abc.com, let's say talks to Akamai and gets the URL of   {#458}
[00:26:59] TEACHER: wattage map to ABC.   {#459}
[00:27:01] TEACHER: Correct.   {#460}
[00:27:02] TEACHER: It does not make call to Akamai.   {#461}
[00:27:03] TEACHER: Who is calling?   {#462}
[00:27:04] TEACHER: Who is making call to Akamai?   {#463}
[00:27:06] TEACHER: No, when I say call means in the configuration, whatever the cloud fair or cloud provides,   {#464}
[00:27:13] TEACHER: you go and say abc.com is my origin.   {#465}
[00:27:17] TEACHER: Cloud front or   {#466}
[00:27:22] TEACHER: will provide me   {#467}
[00:27:23] TEACHER: let's say a.cdn.com   {#468}
[00:27:25] TEACHER: something.   {#469}
[00:27:27] TEACHER: Now it is my responsibility   {#470}
[00:27:29] TEACHER: to go whatever the   {#471}
[00:27:31] TEACHER: content I want to serve it from my   {#472}
[00:27:33] TEACHER: origin and all   {#473}
[00:27:35] TEACHER: those pages go and replace that   {#474}
[00:27:37] TEACHER: with the   {#475}
[00:27:39] TEACHER: in the HTML pages you have to replace that   {#476}
[00:27:41] TEACHER: as an oversimplification.   {#477}
[00:27:43] TEACHER: So everywhere that   {#478}
[00:27:45] TEACHER: is there a way that   {#479}
[00:27:48] TEACHER: can we do it   {#480}
[00:27:49] TEACHER: like at mass level because   {#481}
[00:27:51] TEACHER: you may have a   {#482}
[00:27:53] TEACHER: no you cannot   {#483}
[00:27:56] TEACHER: otherwise how would that request automatically   {#484}
[00:27:58] TEACHER: go there   {#485}
[00:27:59] TEACHER: is there a way of doing this thing automatically   {#486}
[00:28:01] TEACHER: or I have to just directly do that   {#487}
[00:28:03] TEACHER: no you have to do it explicit   {#488}
[00:28:05] TEACHER: and that's not a big deal because   {#489}
[00:28:08] TEACHER: you would have those low level practices   {#490}
[00:28:10] TEACHER: implemented right   {#491}
[00:28:11] TEACHER: that's okay I'm not saying   {#492}
[00:28:15] TEACHER: No, no, no, no.   {#493}
[00:28:17] TEACHER: And then that CDN URL is what you have to send to your front end.   {#494}
[00:28:22] TEACHER: So that added it's an image URL for front end.   {#495}
[00:28:24] TEACHER: Front end is utterly stupid.   {#496}
[00:28:25] TEACHER: Front end websites are utterly stupid.   {#497}
[00:28:28] TEACHER: What they have is they have this URL with them.   {#498}
[00:28:30] TEACHER: They just render.   {#499}
[00:28:31] TEACHER: If I send this URL from backend, it would try to go and render this image.   {#500}
[00:28:34] TEACHER: If I send this URL, it would go and render this image as simple as that.   {#501}
[00:28:39] TEACHER: Right.   {#502}
[00:28:40] TEACHER: So it's your responsibility to change those URLs and send it there to the user for it to render.   {#503}
[00:28:47] TEACHER: A follow up question on that is, so let's say I had initially given one image which was being   {#504}
[00:28:54] TEACHER: cast in CDN.   {#505}
[00:28:55] TEACHER: Now I changed the origin URL.   {#506}
[00:28:58] TEACHER: So whatever the let's say image that you are showing in logo.png changed it.   {#507}
[00:29:02] TEACHER: How the change will be passed by CDN?   {#508}
[00:29:08] TEACHER: It would not.   {#509}
[00:29:10] TEACHER: Okay.   {#510}
[00:29:11] TEACHER: It would not unless the TTL happens or CDNs also provide APIs for you to explicitly   {#511}
[00:29:16] TEACHER: invalidate the cache for a particular path.   {#512}
[00:29:18] TEACHER: If you can do that, do that.   {#513}
[00:29:20] TEACHER: So that's once again, either you based on TTL or based on pushing the content again   {#514}
[00:29:25] TEACHER: to inform CDN that you don't push the CDN.   {#515}
[00:29:28] TEACHER: You just make an API call to the CDN saying that invalidate this path.   {#516}
[00:29:32] TEACHER: You don't push the image to CDN.   {#517}
[00:29:34] TEACHER: Yeah.   {#518}
[00:29:35] TEACHER: I mean, push the change that there is a change there in this path.   {#519}
[00:29:38] TEACHER: No, wrong way to put it.   {#520}
[00:29:40] TEACHER: You can simply invalidate the path by making an API call.   {#521}
[00:29:43] TEACHER: That's it.   {#522}
[00:29:44] TEACHER: Okay.   {#523}
[00:29:44] TEACHER: So you don't push image to CDN.   {#524}
[00:29:46] TEACHER: You don't push something to CDN.   {#525}
[00:29:48] TEACHER: Okay.   {#526}
[00:29:48] TEACHER: So just tell CDN that whatever this path is invalidated.   {#527}
[00:29:53] TEACHER: Next time the request comes, it has a cache miss.   {#528}
[00:29:56] TEACHER: It goes to origin, patches it back.   {#529}
[00:29:58] STUDENT_11: Okay.   {#530}
[00:29:59] STUDENT_11: Got it.   {#531}
[00:29:59] STUDENT_11: Thank you.   {#532}
[00:30:01] TEACHER: Last question before you move forward.   {#533}
[00:30:02] TEACHER: Go on Gaurav.   {#534}
[00:30:04] TEACHER: Arpit, can CDN cache live content like something we watch live matches on hot stuff?   {#535}
[00:30:09] TEACHER: Yeah.   {#536}
[00:30:10] TEACHER: We'll talk about it 7.3.   {#537}
[00:30:12] TEACHER: 6.3.   {#538}
[00:30:13] TEACHER: Okay.   {#539}
[00:30:17] TEACHER: Now we'll move to the first system.   {#540}
[00:30:19] TEACHER: Given that we now have understanding of CDN,   {#541}
[00:30:21] TEACHER: let's talk about image upload service.   {#542}
[00:30:23] TEACHER: Now here, we'll talk about things,   {#543}
[00:30:26] TEACHER: again, things that matter.   {#544}
[00:30:28] TEACHER: So storage, data flow,   {#545}
[00:30:30] TEACHER: this is really important one,   {#546}
[00:30:32] TEACHER: separation of concepts, we'll talk about it.   {#547}
[00:30:34] TEACHER: Privacy, how Instagram keeps images private.   {#548}
[00:30:37] TEACHER: And it's not what you think it is.   {#549}
[00:30:40] TEACHER: extensibility and optimization, all sorts of things.   {#550}
[00:30:44] TEACHER: Because of this, because I wanted to go deep into image,   {#551}
[00:30:47] TEACHER: just this image upload and image service part of it,   {#552}
[00:30:49] TEACHER: we spent 30 minutes talking about CDMs,   {#553}
[00:30:52] TEACHER: or rather 20 minutes talking about CDMs,   {#554}
[00:30:54] TEACHER: because this forms the foundation for us to build a very good image upload service   {#555}
[00:30:59] TEACHER: and understand how those things really work.   {#556}
[00:31:03] TEACHER: Okay, so let's start with the first step.   {#557}
[00:31:06] TEACHER: We'll have brainstorm on this five, six parameters,   {#558}
[00:31:10] TEACHER: Let me start asking this very simple question and then we touch upon those other parts.   {#559}
[00:31:16] TEACHER: First, given that it's an image upload service, which means that we need to store a bulk of   {#560}
[00:31:21] TEACHER: images.   {#561}
[00:31:22] TEACHER: Where would you store these images?   {#562}
[00:31:24] TEACHER: Raise your hands.   {#563}
[00:31:25] TEACHER: I'll pull you in.   {#564}
[00:31:27] TEACHER: Where would you store these images and why?   {#565}
[00:31:30] STUDENT_5: Sandeep?   {#566}
[00:31:31] STUDENT_1: In a blob storage.   {#567}
[00:31:37] STUDENT_1: I'm not able to   {#568}
[00:31:39] STUDENT_1: get the name of a cloud provider, but yeah, S3, that could be one solution.   {#569}
[00:31:43] TEACHER: S3 GCS, right? Why this?   {#570}
[00:31:46] STUDENT_1: Because it's cheaper and I can also compress it and push it in there, right?   {#571}
[00:31:53] TEACHER: You can also do it on other places, but why this? Because it's dirt cheap.   {#572}
[00:31:59] STUDENT_1: And easy to implement because we have a lot of online support.   {#573}
[00:32:03] TEACHER: Great, great.   {#574}
[00:32:04] TEACHER: So we store this images over here.   {#575}
[00:32:06] TEACHER: But now how would this image be uploaded?   {#576}
[00:32:10] TEACHER: So here, now the problem starts to creep in   {#577}
[00:32:12] TEACHER: is that we have a user who wants to upload an image in the backend.   {#578}
[00:32:18] TEACHER: So now when user is trying to upload an image to the backend,   {#579}
[00:32:23] TEACHER: obviously we would have a set of API servers   {#580}
[00:32:25] TEACHER: which are listening to this.   {#581}
[00:32:28] TEACHER: User would have to send image somewhere.   {#582}
[00:32:33] TEACHER: How does this entire communication happen?   {#583}
[00:32:37] STUDENT_1: It has to happen through a persistent connection.   {#584}
[00:32:40] STUDENT_1: It cannot happen in a request response model because you are,   {#585}
[00:32:44] STUDENT_1: it's a huge amount of data that we are sending, right?   {#586}
[00:32:48] STUDENT_1: So I would, if I have to design it,   {#587}
[00:32:51] STUDENT_1: I would go with some kind of a persistent connection   {#588}
[00:32:53] STUDENT_1: and probably I'll send chunks of data to my API server.   {#589}
[00:32:57] STUDENT_1: How big is your image?   {#590}
[00:33:00] STUDENT_1: if it's a hd image then uh like if i if i have an iphone with a high definition camera then it's   {#591}
[00:33:06] TEACHER: gonna how big 5mb yeah probably yeah 5mb why would you want to chunk it in one http request you can   {#592}
[00:33:17] TEACHER: send 5mb of data okay why overkill why overkill why sending it in chunks why unnecessary why   {#593}
[00:33:25] TEACHER: unnecessary complications. Okay. Yeah. Right. So normal, right. Keep things simple. It's easy.   {#594}
[00:33:35] TEACHER: Always remember, it's easy to build complex systems. It's exponentially difficult to build   {#595}
[00:33:40] TEACHER: simple systems because we, as engineers are trained to think in a complex way, but no,   {#596}
[00:33:46] TEACHER: it has to be an extremely simple solution. 5 MB is peanuts for an HTTP server to handle.   {#597}
[00:33:52] TEACHER: You can very easily send 5MB of data in one HTTP request without any problem.   {#598}
[00:33:58] TEACHER: You don't need to chunk and send.   {#599}
[00:33:59] TEACHER: It's just images.   {#600}
[00:34:01] TEACHER: Right.   {#601}
[00:34:01] TEACHER: But now what will you do?   {#602}
[00:34:03] TEACHER: Will you send image like this?   {#603}
[00:34:06] TEACHER: Let's say I have this image that I want to send.   {#604}
[00:34:09] TEACHER: Now user first makes an API call to the API server and then API server copies it to S3.   {#605}
[00:34:16] STUDENT_1: No, I wouldn't do that because I would rather, I will just, I will do it in asynchronous fashion.   {#606}
[00:34:23] STUDENT_1: And then from there I can do my own async job and I can send it to S3 instead of just   {#607}
[00:34:29] TEACHER: imagine you uploading.   {#608}
[00:34:30] TEACHER: Imagine you using Instagram.   {#609}
[00:34:32] TEACHER: It says, huh, image posted, but it takes one hour to do that asynchronous processing   {#610}
[00:34:37] TEACHER: to really show that image.   {#611}
[00:34:40] TEACHER: Poor user experience.   {#612}
[00:34:42] TEACHER: Correct?   {#613}
[00:34:43] STUDENT_10: Yes, that's correct.   {#614}
[00:34:46] TEACHER: So think of Instagram.   {#615}
[00:34:47] TEACHER: When you're uploading the image, you want to see that image right there, right now.   {#616}
[00:34:50] TEACHER: You want to send it to your followers right there and then.   {#617}
[00:34:54] TEACHER: You have to upload, right?   {#618}
[00:34:56] TEACHER: So now, will you do this?   {#619}
[00:35:01] STUDENT_1: Yeah, if it has to be instant, then I have to do that route.   {#620}
[00:35:05] STUDENT_1: You know, from my API to S3, it has to go immediately.   {#621}
[00:35:08] STUDENT_1: And it needs to get reflected.   {#622}
[00:35:10] STUDENT_5: Okay, great.   {#623}
[00:35:12] STUDENT_5: Anubav, what's the problem in this approach?   {#624}
---- OWNED SEGMENTS END ----

CTX| [00:35:16] STUDENT_1: One of the API or whichever API server we are uploading the image to,   {#625}
CTX| [00:35:20] STUDENT_1: it can fail in middle of the process and then we'll, we'll lose the user's image.   {#626}
CTX| [00:35:28] STUDENT_1: Uh, unless we have persisted it somewhere, which we can't do in this   {#627}
CTX| [00:35:31] TEACHER: small time, you will send 500, five access to user, user will do a retry.   {#628}
CTX| [00:35:35] TEACHER: Simple.   {#629}
CTX| [00:35:35] STUDENT_1: Yep.   {#630}
CTX| [00:35:36] STUDENT_1: User will do a retry.   {#631}
CTX| [00:35:37] TEACHER: That's not a problem anymore.   {#632}
CTX| [00:35:39] STUDENT_1: Um, another problem could be that for an API server, the constant, uh, like   {#633}
CTX| [00:35:47] STUDENT_1: these 5MB requests will take up a lot of network bandwidth,   {#634}
CTX| [00:35:51] STUDENT_1: which could be used for other smaller responses,   {#635}
CTX| [00:35:56] STUDENT_1: but it's not being used for uploading these heavy images.   {#636}
CTX| [00:35:59] STUDENT_1: And we can sort of optimize this a bit.   {#637}
CTX| [00:36:02] TEACHER: But then what's the solution?   {#638}
CTX| [00:36:04] TEACHER: You say that, hey, if my bandwidth consumption is high on the API side,   {#639}
CTX| [00:36:09] TEACHER: 5MB is a huge amount of data that you're transferring.   {#640}
CTX| [00:36:11] TEACHER: Every network card has a physical limit of the amount of data   {#641}
CTX| [00:36:13] TEACHER: that you can transfer over it,   {#642}
