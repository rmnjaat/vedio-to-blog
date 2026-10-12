# chunk_16  OWNS 03:07:44 -> 03:15:28  (segments #3205-#3365, 1348 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:06:47] STUDENT_5: So our WebSocket need to push the public key for all the other persons which are present in that group.   {#3185}
CTX| [03:06:57] STUDENT_5: So it needs to get these public key from the database.   {#3186}
CTX| [03:07:01] STUDENT_5: So how are we?   {#3187}
CTX| [03:07:02] STUDENT_5: So in this case, we have to access the database.   {#3188}
CTX| [03:07:05] TEACHER: I don't have any experience around public key encryption.   {#3189}
CTX| [03:07:08] TEACHER: I don't know signal protocol well, so I cannot commit on it.   {#3190}
CTX| [03:07:12] TEACHER: I have no idea how that works.   {#3191}
CTX| [03:07:14] TEACHER: what keys it needs to decrypt it, how it gets old messages.   {#3192}
CTX| [03:07:17] TEACHER: I have no idea, no idea because end-to-end encryption,   {#3193}
CTX| [03:07:21] TEACHER: I know protocol of it.   {#3194}
CTX| [03:07:23] TEACHER: I know signal protocol a bit.   {#3195}
CTX| [03:07:25] TEACHER: WhatsApp uses a variant of it, 100%,   {#3196}
CTX| [03:07:27] TEACHER: but I don't know what all information it needs,   {#3197}
CTX| [03:07:30] TEACHER: how it processes that, no idea about it.   {#3198}
CTX| [03:07:33] TEACHER: So not in a position to comment on it at all.   {#3199}
CTX| [03:07:36] TEACHER: Whatever I say would be 100%.   {#3200}
CTX| [03:07:38] TEACHER: Okay.   {#3201}
CTX| [03:07:39] STUDENT_14: Thanks.   {#3202}
CTX| [03:07:40] STUDENT_14: Thanks.   {#3203}
CTX| [03:07:41] TEACHER: Sampat.   {#3204}

---- OWNED SEGMENTS START ----
[03:07:44] STUDENT_2: So my question is about the DB schema where we were designing the channel DB schema.   {#3205}
[03:07:51] STUDENT_2: So what was the reason we are storing the type of the channel?   {#3206}
[03:07:57] STUDENT_2: Explicitly like,   {#3207}
[03:07:58] STUDENT_2: Revisit your recording.   {#3208}
[03:08:00] STUDENT_2: Revisit.   {#3209}
[03:08:00] STUDENT_2: Let me, sorry, my question didn't come from.   {#3210}
[03:08:03] STUDENT_2: So why did we choose to store the type of the channel?   {#3211}
[03:08:07] STUDENT_2: Like whether it's a DM or it's like a channel channel?   {#3212}
[03:08:10] TEACHER: You can render it on the UI.   {#3213}
[03:08:11] TEACHER: That's what I said, right?   {#3214}
[03:08:12] TEACHER: You could render it on the UI accordingly.   {#3215}
[03:08:15] STUDENT_2: Rather, we could have just stored it, whether it's a private or public and then everything   {#3216}
[03:08:21] STUDENT_2: since it's a channel.   {#3217}
[03:08:22] STUDENT_2: So it can have multiple members, whether it's two or more, or if it's private, then it's   {#3218}
[03:08:28] STUDENT_2: basically a DM.   {#3219}
[03:08:29] STUDENT_2: If it's a private channel or it's a public channel, it's a public.   {#3220}
[03:08:33] TEACHER: How will you differentiate between a channel with two people and a DM?   {#3221}
[03:08:38] STUDENT_2: Okay.   {#3222}
[03:08:39] STUDENT_2: So everything is a channel and our channel consists of two members, but if it's a public,   {#3223}
[03:08:46] STUDENT_2: then it's a channel.   {#3224}
[03:08:47] STUDENT_2: If I can also create a private channel with two people contact, you can create a private   {#3225}
[03:08:54] TEACHER: channel with, yes, the same whole, and then add more people to that.   {#3226}
[03:08:58] TEACHER: But in DM, I cannot add more people to that.   {#3227}
[03:09:00] TEACHER: Correct.   {#3228}
[03:09:01] TEACHER: I need different ways to render it on the UI.   {#3229}
[03:09:04] TEACHER: That's what I said.   {#3230}
[03:09:06] TEACHER: Right.   {#3231}
[03:09:07] STUDENT_17: Okay.   {#3232}
[03:09:09] TEACHER: were going, I knew where you were going. I knew where the confusion was. That's exactly   {#3233}
[03:09:12] TEACHER: what I said. I covered it already. Right. To render it on the UI private channel with   {#3234}
[03:09:18] TEACHER: two people also exist. DM with two people also exist private channel, two people, public   {#3235}
[03:09:23] TEACHER: channel, two people, DM, two people, DM can also be made private or can also be made public   {#3236}
[03:09:28] TEACHER: tomorrow if they want to. Right. You just want to keep things extensible. That's why   {#3237}
[03:09:32] STUDENT_4: you are type two. Okay. Okay. I understand.   {#3238}
[03:09:38] TEACHER: I have this tendency because I know I'll just work on that point taken.   {#3239}
[03:09:44] TEACHER: Sorry.   {#3240}
[03:09:44] TEACHER: Sorry for that.   {#3241}
[03:09:45] TEACHER: No issues.   {#3242}
[03:09:46] TEACHER: Yeah.   {#3243}
[03:09:51] STUDENT_10: So, uh, why when we're talking about web sockets, you talked about the client has a limit   {#3244}
[03:09:57] STUDENT_10: of six concurrent connections.   {#3245}
[03:10:00] STUDENT_10: So is it shared among the tabs?   {#3246}
[03:10:02] STUDENT_10: Yeah.   {#3247}
[03:10:04] STUDENT_10: So, so like, for example, uh, like Google is there.   {#3248}
[03:10:08] STUDENT_10: So it, uh, it has lots of applications in sub domain.   {#3249}
[03:10:13] STUDENT_10: Like maps.google.com.   {#3250}
[03:10:15] TEACHER: Sub domain is the one.   {#3251}
[03:10:16] TEACHER: So mail.com chat.com.   {#3252}
[03:10:19] TEACHER: Oh, sorry.   {#3253}
[03:10:19] TEACHER: Basically chat.google.com.   {#3254}
[03:10:20] TEACHER: So it's at the domain level.   {#3255}
[03:10:22] TEACHER: So when I said, when people say domain, it's the entire domain, the host name of it.   {#3256}
[03:10:26] TEACHER: So it may include multiple levels of sub domain dot main tld, uh, main domain dot TLD.   {#3257}
[03:10:33] TEACHER: thing that has to be so six connection for gmail six connection for chat six connection for meet   {#3258}
[03:10:39] TEACHER: six connection for something right the host name matters okay got it got it thanks   {#3259}
[03:10:51] STUDENT_2: yeah hi i wrote a message to you so i just raised my hand so that you don't miss my message   {#3260}
[03:10:58] STUDENT_2: I need some time for you with you for 10 minutes after session.   {#3261}
[03:11:04] TEACHER: Okay, fine.   {#3262}
[03:11:05] TEACHER: But I'll have to shut the session off.   {#3263}
[03:11:07] TEACHER: We'll do it afterwards.   {#3264}
[03:11:08] TEACHER: Just really compile all the questions and basically block one-on-one.   {#3265}
[03:11:11] TEACHER: That's easy.   {#3266}
[03:11:12] TEACHER: I have to put it part of recording.   {#3267}
[03:11:17] TEACHER: I have to start it as soon as possible.   {#3268}
[03:11:18] TEACHER: Because if my laptop crashes, it's gone.   {#3269}
[03:11:20] TEACHER: I cannot do that.   {#3270}
[03:11:22] TEACHER: So just block a one-on-one for that.   {#3271}
[03:11:24] STUDENT_2: Just right after the session?   {#3272}
[03:11:26] TEACHER: no one has fixed time right monday to uh uh monday to friday evening time that time you   {#3273}
[03:11:32] TEACHER: you basically compile a list of questions otherwise just drop me a message on uh discord   {#3274}
[03:11:36] TEACHER: or something i'll drop your message that's that's the easiest that's the easiest because i have to   {#3275}
[03:11:40] TEACHER: trigger the recording in case my laptop crashes the entire thing is gone let's not write this   {#3276}
[03:11:45] TEACHER: question for the recording then no no that's why because this entire thing is gone which is what i   {#3277}
[03:11:50] TEACHER: am worried about, right? More than   {#3278}
[03:11:52] TEACHER: not. I   {#3279}
[03:11:53] TEACHER: cannot lose this. That's why.   {#3280}
[03:11:56] TEACHER: Abhishek? No problem.   {#3281}
[03:11:59] STUDENT_10: Hey Abhishek, just one   {#3282}
[03:12:00] STUDENT_10: last thing. So I think we discussed a lot about   {#3283}
[03:12:03] STUDENT_10: web software, but   {#3284}
[03:12:04] STUDENT_7: I have read that there is also a web   {#3285}
[03:12:06] STUDENT_7: transport specification coming up,   {#3286}
[03:12:09] STUDENT_7: right? Where they're trying to address   {#3287}
[03:12:11] STUDENT_7: as an alternative to web software.   {#3288}
[03:12:13] TEACHER: I'm not sure about it, but   {#3289}
[03:12:14] TEACHER: thanks for adding. I'll   {#3290}
[03:12:16] TEACHER: look onto it. Web transport   {#3291}
[03:12:22] TEACHER: But in case I find something I'll definitely share.   {#3292}
[03:12:24] TEACHER: Uh, maybe in.   {#3293}
[03:12:27] TEACHER: Let me just read about it.   {#3294}
[03:12:28] TEACHER: I'm not at all.   {#3295}
[03:12:29] TEACHER: I've heard it for the first time, to be honest.   {#3296}
[03:12:31] TEACHER: I'll look into it.   {#3297}
[03:12:32] TEACHER: Thanks.   {#3298}
[03:12:34] STUDENT_8: Uh, yeah, I actually wanted to compare two, uh, things here.   {#3299}
[03:12:41] STUDENT_8: I mean, if I see here, it's a, it's a, it's basically used for real-time communication   {#3300}
[03:12:44] STUDENT_8: here and I want to, to compare a slack and WhatsApp meet my implementation in order to   {#3301}
[03:12:49] STUDENT_8: load the data.   {#3302}
[03:12:50] STUDENT_8: which, for example, if a user is coming online,   {#3303}
[03:12:53] STUDENT_8: there must be some sort of data that we have to share it with the user   {#3304}
[03:12:57] STUDENT_8: as soon as it comes up.   {#3305}
[03:12:59] STUDENT_8: So let's say for the WhatsApp, it makes sense that,   {#3306}
[03:13:02] STUDENT_8: let's say a user comes online, the WebSocket connection is made,   {#3307}
[03:13:05] STUDENT_8: it fires an event, and then for that particular user,   {#3308}
[03:13:10] STUDENT_8: the old data is being relayed and channeled by a server,   {#3309}
[03:13:13] STUDENT_8: and the server data is being refreshed.   {#3310}
[03:13:15] STUDENT_8: But for Slack, it is different.   {#3311}
[03:13:16] STUDENT_8: And the reason being WhatsApp stores data in the client app.   {#3312}
[03:13:21] STUDENT_8: It's user device.   {#3313}
[03:13:22] STUDENT_13: Yes.   {#3314}
[03:13:22] STUDENT_8: User device.   {#3315}
[03:13:23] STUDENT_8: While the Slack stores in the database that is in the backend.   {#3316}
[03:13:26] STUDENT_8: Correct.   {#3317}
[03:13:27] STUDENT_8: Then I'm just thinking that in that way,   {#3318}
[03:13:29] STUDENT_8: the way or the communication channel to refresh the data should be API   {#3319}
[03:13:34] STUDENT_8: rather than doing it via web servers.   {#3320}
[03:13:37] TEACHER: Correct.   {#3321}
[03:13:38] TEACHER: You would never see, by the way,   {#3322}
[03:13:40] TEACHER: on Slack, do you ever see old messages relate to you?   {#3323}
[03:13:43] TEACHER: No, you just see these are unread messages.   {#3324}
[03:13:47] TEACHER: Right. That's not coming over WebSocket.   {#3325}
[03:13:49] TEACHER: So WhatsApp has to get those messages delivered to you on your device, because it is stored as you, as you very rightly said.   {#3326}
[03:13:56] TEACHER: But on Slack, if you log in, let's say you went on a vacation, you came back, you logged in, you just see, oh my God, there are 200 unread messages.   {#3327}
[03:14:02] TEACHER: I have to go through. It doesn't send you those messages.   {#3328}
[03:14:06] TEACHER: It's just there.   {#3329}
[03:14:07] TEACHER: Which is where the checkpoint that we added in the membership that would help.   {#3330}
[03:14:13] STUDENT_8: Yeah.   {#3331}
[03:14:13] STUDENT_8: I actually was just thinking that how the difference would be in both the implementations   {#3332}
[03:14:18] TEACHER: for all the way we were discussing slacks, real-time cover, but we covered so much around   {#3333}
[03:14:24] TEACHER: it.   {#3334}
[03:14:24] TEACHER: And you see how all of the systems are interconnected.   {#3335}
[03:14:27] TEACHER: It just that few changes here and there.   {#3336}
[03:14:30] TEACHER: And you get a brand new system out of it.   {#3337}
[03:14:35] TEACHER: This is one pattern fits everywhere.   {#3338}
[03:14:39] STUDENT_13: Thank you.   {#3339}
[03:14:40] TEACHER: Superb.   {#3340}
[03:14:45] TEACHER: Great.   {#3341}
[03:14:47] TEACHER: Alok sir, just stay back on the call.   {#3342}
[03:14:48] TEACHER: I'll just do it right away.   {#3343}
[03:14:49] TEACHER: You would be five minutes.   {#3344}
[03:14:50] TEACHER: Thanks folks for tuning in.   {#3345}
[03:14:54] TEACHER: I'll upload the recording by evening.   {#3346}
[03:14:56] TEACHER: Next week distributed systems and ID generators will be shared today to go through them and   {#3347}
[03:15:01] TEACHER: more importantly, implement, implement everything that is a small hello world.   {#3348}
[03:15:06] TEACHER: Just small.   {#3349}
[03:15:08] TEACHER: Especially for redis pops up.   {#3350}
[03:15:09] TEACHER: Use that once.   {#3351}
[03:15:11] TEACHER: Use that one.   {#3352}
[03:15:11] TEACHER: It's not really difficult.   {#3353}
[03:15:12] TEACHER: After 10 minutes of your time, you'll learn much more.   {#3354}
[03:15:15] TEACHER: You'll see where it does not give you persistence, how it sends, pushes and whatnot.   {#3355}
[03:15:20] TEACHER: Right.   {#3356}
[03:15:21] TEACHER: Okay.   {#3357}
[03:15:21] TEACHER: Thanks folks for tuning.   {#3358}
[03:15:22] TEACHER: It was fabulous session.   {#3359}
[03:15:23] TEACHER: One of my best.   {#3360}
[03:15:24] TEACHER: Thanks.   {#3361}
[03:15:25] TEACHER: Thanks so much for great questions.   {#3362}
[03:15:26] TEACHER: See you folks next week.   {#3363}
[03:15:28] TEACHER: Bye.   {#3364}
[03:15:28] TEACHER: Bye.   {#3365}
