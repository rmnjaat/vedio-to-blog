**[01:43:08] Student 1:** Yeah, maybe the first question I will try to figure it out. What should be the schema of storing tags?

**[01:43:19] Teacher:** Nothing around engineering. Nothing around engineering. Don't think on engineering at all. Because all you are given is this one line briefing. Just one line briefing. Allow people to tag other people in photos. That's it. Think on the product side here.

**[01:43:37] Student 1:** Okay. Then maybe the most important thing will be around who can tag and is there a way that I can mark tagging to be correct? Who can tag is one thing.

**[01:43:54] Teacher:** No, who can tag? So what is the significance of who can tag? What would it allow? What would it enable you to do?

**[01:44:05] Student 1:** That I'm the owner of, let's say, a photo, then only I can tag. I should, so nobody else can kind of [?tag | asr: "attack"] the wrong thing, wrong people, wrong object or something like this.

**[01:44:19] Teacher:** No, but someone else can tag you or not. That is also important, right?

**[01:44:25] Student 1:** I mean, that that is okay, but we also need to think about if it goes through a check. Let's say [unclear: "some icons and"] not part of, not, not owner of a image and tries to tag somebody in a wrong way, and normally there are repercussions around that. No, no, no, you are not the owner of the image.

**[~01:44:50] Teacher:** Still you are doing, that is different problem, but you are tagging someone else in your photo, that's different. So what you should more focus on is authorization part, where who can tag me in their photo. Obviously that's a check, that you can only tag people in your photos, right? Don't go into the correctness of it. Think about [unclear: "r"] is other person allowing you to tag himself or herself in your photo or not. That is more important. Yes, [unclear: "that's that's amenity"], right? [check: "yes, that's ... right" may be the student's interjection] I know that's [?what you meant | asr: "what you made it"], but you put it in a different way, a different way. Got it. But here it's more important that it should be in your control, that do you want to have this feature dictating who can tag you in their photos. Yes. Right.

[01:45:34] Which means that now you have to have a separate authorization layer, which keeps track of things that, hey, am I allowed to tag? Like who is allowed to tag me in their photos? So you will see this feature day in and day out on Instagram, where you are not, or even on Twitter, where you are not allowed to tag people in their posts, in their photos and whatnot. So that is an important part. Okay. Anubhav, what other part?

<!-- topic-candidate [01:45:59]: Max number of people tagged in a photo (storage schema) -->

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

<!-- topic-candidate [01:49:13]: Tag notifications - notification team, product-level throttling -->

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

<!-- topic-candidate [01:53:41]: Tag suggestions - ML team dependency, SLA, fallback -->

**[01:53:41] Student 5 (Anubhav):** Yeah, I was thinking from user experience perspective, whether the tagging would be self-driven, tag someone knowing them, or whether we would have suggestions, okay, this photo looks like this person from your friends list, something that Facebook does, I think. So with, for this we will have some recognition and recommendation machine learning systems that provide us these inputs. We would need that.

**[~01:54:05] Teacher:** So now what would this entail, like how would this affect your design and peripheral teams?

**[01:54:14] Student 5:** With my design, I have, with taking inputs from these peripheral teams. Whenever a photo upload event is triggered, I have to get these inputs from the, both for the face recognition and suggestion inputs, from these systems, from the periphery teams, and display them to the user.

**[01:54:36] Teacher:** So, which means that, okay, so then front-end changes for you to display that. And more importantly, when you're displaying them, the response time of that service needs to be slow, should be fast enough. If they are not fast enough, then your user, then sometimes user sees it, sometimes user doesn't, gives user a very poor experience. Yes. So you need to ensure that whenever you are rolling this out, that ML team, ML algorithm, whatever they are running, it's very fast. It maintains a certain SLA.

[01:55:08] So what this brings to the point is notion of SLA, because you have a synchronous, now you have a synchronous dependency on the team, because as soon as user clicked photos, started tagging, you have to immediately show them the suggestions. So given that the ML teams API, which is suggesting you things on the [?image | asr: "email"], they need to have a very strict SLA and they need to adhere to that, because you have a synchronous dependency on that. And now you also need to create a fallback plan. What if that API does not respond in time? What would you do? Will you not allow user to tag or will you allow user to manually tag? It's still a [?product | asr: "protocol"] call, it sounds straightforward, but it's still a product call, because it might be possible in some cases that you don't even allow people to tag unless it's coming from your ML team for some reason, for some reason you want to do that. But it's important to think on those [?sides | asr: "slides"]. Okay. One more point before I cover one other aspect of it. Alok sir, go on. What's that one feature you want, like what things that you'd want to consider?

**[01:56:08] Student 5:** One question, should we update the user's activity page or where the user can see what happened? [check: teacher called "Alok sir" just before; this label answered to "Anubhav" earlier]

**[01:56:16] Teacher:** Profile service activity. Now, how would this affect your system?
