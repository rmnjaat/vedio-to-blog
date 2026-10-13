**[03:03:21] Teacher (answer):** In PHP, I've not worked very deep on PHP. So I'm not sure if it supports or not, but connection pooling is property of database, not of language. Okay. Right. So like the way it's, until you are just setting up multiple TCP connections, you might find a library that does this pool management for you. And then what you're doing is establishing multiple TCP connections with the database and having a queue to manage it. That's it. That's what a connection pool is. You can just spend a day, write your own connection pool. It's that simple. And you just need a blocking queue to implement it. Right.

[03:03:58] So it should be a relationship between my server and the database. Not yes. Yes. Property of language. [check: 03:03:58-03:04:03 may be a student interjection] It's not even property of database, to be honest. It's just property of their application logic or the [?library | asr: "liability"] that you are writing. That's what connection [?pool is | asr: "puts"]. So long as the database is willing to keep the connection open, that's the only requirement that you have. That's the only requirement that you have, that your database should not terminate the connection unless you ask it to terminate. That's it. If your database [?adheres | asr: "adios"] to that, you can build your own connection. Thanks. Shreya?

> **Student Question [03:04:33] - Student 7 (Shreya):** Yeah, I just wanted to ask that if CDC can push to multiple things like Elasticsearch, Redshift, like one CDC can do that, right? We don't need.

**[03:04:45] Teacher (answer):** It does that. I drew it separately so that it's very visual. Otherwise, it would look like star and like some magic is happening, but it's just very visual so that you understand, because the data source of one might not be so. But if you'd want to just fan out to multiple things, you can do that.

[03:05:03] High memory utilization, because depending on the database it needs to do multiple transformations, because let's say you're doing [unclear: "an elastics that"] you'll pass JSON. If I'm storing it in MySQL, you would convert it in a separate format. If I'm storing it in third database or third kind of sink, it would do something different. So CDCs would need to scale up of it. That's it. It would have high memory utilization.

**[03:05:25] Student?:** Okay. Thank you.

**[03:05:27] Teacher:** Okay. Any other question anyone?

<!-- topic-candidate [03:05:34]: Wrap-up and post-class chat (admin) -->

[03:05:34] *(admin)* Okay, fine. Thanks folks for [?joining | asr: "doing"], and I'll upload the recordings by three. See you folks tomorrow. Very fun discussion. Will build two databases tomorrow on our own, our two storage engines on our own. Very interesting, on digital building blocks we'll talk about. Right, thanks so much, but you can see you folks tomorrow morning. Bye-bye.

**[03:05:57] Student 2:** *(admin)* Just a suggestion, that if you could, along with recordings, if you could upload the chats also, because there are a lot of...

**[~03:06:06] Teacher (answer):** I tried that. I saw that Zoom folder that gets exported. There are no chats in it. So I'm still checking if I can do it. But where do I upload chats? That is another problem. Because if I do it on Google Drive, how do I share it? There are quite a few challenges there, but I'll copy the chats right now. You can do it. I'll keep the link open. There is, that should be a button to download the chat directly. Okay. Save chat option is there when you click on save chat, but the three dots, hit on save chat and you can download it, but I'll still check. I'll still check. I'm not discarding that option, but I still need to figure out a way to share it and all. All right, okay, thanks, thanks.

[gap 03:06:54-03:07:14 - no speech in recording]

[03:07:14] So you can [?book | asr: "lock"] it till June.

**[03:07:16] Student?:** Thank you.

**[03:07:19] Teacher:** Rajiv.

> **Student Question [03:07:19] - Student 3 (Rajiv):** I saw your some kind of LinkedIn message that you have opened up a new course for new engineers, so wanted to understand what is the depth, I mean, we cover few things.

**[03:07:34] Teacher (answer):** That is [unclear: "busy"] beginners. This is after that. This is an intermediate level course. That is for absolute beginners, like having zero knowledge of system design.

**[03:07:46] Student 3:** ...go in depth of Kafka's and message queues.

**[03:07:48] Teacher (answer):** Why would I go there? It's more about using it. Here we talk about depth. There it's all about, like, there I'll still cover depth, but someone, like, something that an early engineer can comprehend. Here we are all experienced folks, right? I can assume you know, bit of system design, then we take it from there, right? While the beginner is for absolute beginners and product managers, having no knowledge, will literally start from what is database, client-server model, microservice architecture, event driven.

[03:08:18] Here I can spit out stuff immediately. Then I would take it very slow. Starting from absolute scratch to this. And the systems that will cover, it will be mostly blocks, blocks, blocks. Like for example, today when I talk about distributed cache, we spent two hours talking about implementation detail. Then I would not be covering that. Problem statements are mutually exclusive. So the problem statements I cover there will not be covered over here. But if you have done this part, you'd be able to build those systems with ease. Yeah.

**[03:08:46] Student 3:** I saw the contents. Yeah.

**[03:08:48] Teacher:** So that's the difference. It was very strong bias for action. I just got an idea like, then now I had an outline prepared. I had notes prepared for very long time. I said, let me put it out once and for all. So I did have got very overwhelming response. I could not believe the amount of enrollments I got. I'm like, God, people wanted it so much. So like, so [unclear: "from putting on myself"], I'll start recording those videos. Yeah.

**[03:09:13] Student 3:** [unclear: "You watch"] this unique course, basically. I mean, hard to find such course.

**[03:09:17] Teacher:** I just poured in everything I knew throughout my life, whatever I studied, all in this course. I just think happy people are resonating with it. But yeah, in any case there would not be, it's not that things that I covered over here will be covered over there. It will be almost mutually exclusive two topics. I have to overlap like data, like the types of databases I cover. Cover it with both, because you folks also need to know when not to use a particular database, but then I'll cover it in a little more basic manner. So it's a tiered offering now. That's how it is going to be. Thanks. Thanks folks for tuning in.

> **Student Question [03:09:57] - Student 4:** I'll start with one thing regarding the, regarding the, sorry, sorry about that, regarding the [?one-on-ones | asr: "one, two ones"] with you. So you just mentioned that it can be booked in the time slot of June, but one month, within this one month only book, right?

**[03:10:12] Teacher (answer):** Ha ha, max limit. Two months after the cohort ends, up until then you can leverage on one on one. Okay. But within this month only. [check: 03:10:19-03:10:22 may be Student 4 confirming] Yeah. That's not a problem. It's a maximum validity for that. It's not that up there. If let's say you're part of February cohort, you cannot book a time in December. I have to handle those folks as well, right? That's right. So like, I see, find a slot of [unclear: "three 111"].

**[03:10:47] Student 4:** That's idea, right? Okay. Okay. So. Okay.

**[03:11:02] Teacher:** Sure, sure, sure. Got it, got it. Yeah, thank you very much. Thanks for this.
